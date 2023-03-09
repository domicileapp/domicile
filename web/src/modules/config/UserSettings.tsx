import Add from '@mui/icons-material/Add'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import { Button, IconButton, TextField, Tooltip } from '@mui/material'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import Table, { TableColumn, TableRecord } from '@/common/display/Table'
import { useDialog } from '@/common/feedback/Dialog'
import { useSnackbar } from '@/common/feedback/Snackbar'

interface User extends TableRecord {
  name: string
  username?: string
  email: string
}

const fakeUsers: User[] = [
  { id: '1', name: 'Patrick Black', email: 'info@patrickblackjr.com', username: 'patrickblackjr' },
  { id: '2', name: 'Jeff Bezzos', email: 'jeffb@amazon.com' },
]

interface UserFormProps {
  id?: string
  name?: string
  email?: string
}

const UserForm = forwardRef((props: UserFormProps, ref) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setName((props.name as string) ?? '')
    setEmail((props.email as string) ?? '')
  }, [props])

  useImperativeHandle(
    ref,
    () => ({
      clearData: () => {
        setName('')
        setEmail('')
      },
      getData: () => ({ id: props.id, name, email }),
    }),
    [props, name, email]
  )

  return (
    <div className='flex flex-col space-y-3'>
      <TextField label='Name' onChange={(ev) => setName(ev.target.value)} required value={name} />
      <TextField
        label='Email'
        onChange={(ev) => setEmail(ev.target.value)}
        required
        type='email'
        value={email}
      />
    </div>
  )
})

UserForm.displayName = 'UserForm'

export default function UserSettings() {
  const [users, setUsers] = useState(fakeUsers)
  const dialog = useDialog()
  const snackbar = useSnackbar()
  const columns = useMemo<TableColumn<User>[]>(() => {
    const deleteUser = (user: User) => {
      setUsers((list) => list.filter((u) => u.id !== user.id))
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      snackbar.open({ message: `User ${user.name} deleted`, severity: 'success' })
    }

    const editUser = (user: User) => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      dialog.open({
        content: <UserForm {...user} />,
        title: 'Edit user',
        cancelOptions: {
          label: 'Back',
        },
        submitOptions: {
          label: 'Edit',
          onClick: (data: unknown) => {
            const user = data as User
            setUsers((list) => {
              const index = list.findIndex((u) => u.id === user.id)
              // eslint-disable-next-line security/detect-object-injection
              list[index].email = user.email
              // eslint-disable-next-line security/detect-object-injection
              list[index].name = user.name
              return [...list]
            })
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            snackbar.open({ message: `User ${user.name} edited`, severity: 'success' })
          },
        },
      })
    }

    return [
      { title: 'Name', key: 'name' },
      { title: 'Username', key: 'username' },
      { title: 'Email', key: 'email' },
      {
        align: 'center',
        title: 'Actions',
        width: 2,
        render: (user) => (
          <div className='flex space-x-1.5'>
            <Tooltip title='Edit'>
              <IconButton onClick={() => editUser(user)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton color='error' onClick={() => deleteUser(user)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ]
  }, [dialog, snackbar])
  const actions = useMemo(() => {
    const handleClick = () => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      dialog.open({
        content: <UserForm />,
        title: 'New user',
        submitOptions: {
          onClick: (data: unknown) => {
            setUsers((list) => {
              const newUser = data as User
              newUser.id = (list.length + 1).toString()

              return [...list, newUser]
            })
          },
          label: 'Create',
        },
        cancelOptions: {
          label: 'Back',
        },
      })
    }

    return (
      <div className='flex space-x-1.5'>
        <Button onClick={handleClick} startIcon={<Add />} variant='outlined'>
          Add user
        </Button>
      </div>
    )
  }, [dialog])

  return <Table actions={actions} columns={columns} data={users} title='Users' />
}

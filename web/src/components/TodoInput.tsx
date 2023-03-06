import { Button, TextField, Typography } from '@mui/material'

const TodoInput = ({ todo, setTodo, addTodo }) => {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant='h3'>Tasks</Typography>
      <TextField
        value={todo}
        fullWidth
        onChange={(e) => {
          setTodo(e.target.value)
        }}
        label='New task'
        variant='filled'
      />
      <Button onClick={addTodo}>Add</Button>
    </div>
  )
}

export default TodoInput

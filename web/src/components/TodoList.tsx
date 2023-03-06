import { Button, Typography } from '@mui/material'

const TodoList = ({ list, remove }) => {
  return (
    <>
      {list?.length > 0 ? (
        <ul className='todo-list'>
          {list.map((entry, index) => (
            <div className='todo'>
              <li key={index}> {entry} </li>

              <Button
                className='delete-button'
                onClick={() => {
                  remove(entry)
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </ul>
      ) : (
        <Typography className='empty'>No tasks found</Typography>
      )}
    </>
  )
}

export default TodoList

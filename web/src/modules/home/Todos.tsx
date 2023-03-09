import { Card, Checkbox, FormControlLabel, FormGroup, Paper } from '@mui/material'
import { Container } from '@mui/system'
import { useTodos } from './hooks/useTodos'

export default function Todos() {
  const todos = useTodos()
  return (
    <Paper variant='elevation'>
      <Container className='px-5'>
        <h1>Total todos: {todos?.length}</h1>
        {todos?.map((todo) => (
          <FormGroup>
            <FormControlLabel
              sx={{
                textDecoration: `${todo.completed ? 'line-through' : 'none'}`,
              }}
              control={<Checkbox checked={todo.completed} disabled={todo.completed} />}
              label={todo.title}
            />
          </FormGroup>
        ))}
      </Container>
    </Paper>
  )
}

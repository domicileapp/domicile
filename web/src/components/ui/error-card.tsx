import { Alert, Grid } from '@mantine/core'

interface ErrorCardProps {
  title: string
  error: unknown
}

export function ErrorCard({ title, error }: ErrorCardProps) {
  let message = 'An unknown error occurred.'

  if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  }

  return (
    <Grid>
      <Grid.Col span={12}>
        <Alert variant="light" color="red" title={title}>
          {message}
        </Alert>
      </Grid.Col>
    </Grid>
  )
}

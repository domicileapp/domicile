import { Alert, Grid } from '@mantine/core'

interface ErrorCardProps {
  title: string
  error: Error | unknown
}

export function ErrorCard(props: ErrorCardProps) {
  const message = props.error instanceof Error ? props.error.message : 'An unknown error occured.'
  return (
    <Grid>
      <Grid.Col span={12}>
        <Alert variant="light" color="red" title={props.title}>
          {message}
        </Alert>
      </Grid.Col>
    </Grid>
  )
}

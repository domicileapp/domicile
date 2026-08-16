import { Grid, Skeleton } from '@mantine/core'

export function RecipesGridLoader() {
  return (
    <>
      <Grid.Col span={3}>
        <Skeleton height={200} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={200} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={200} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={200} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={200} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={200} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={200} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={200} />
      </Grid.Col>
    </>
  )
}

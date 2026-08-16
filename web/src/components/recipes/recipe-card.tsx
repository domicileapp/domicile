import { Card, Grid, Group, Text } from '@mantine/core'

import type { GithubComDomicileappDomicileInternalDbRecipe } from '@/api/schemas'

interface RecipeCardProps {
  recipe: GithubComDomicileappDomicileInternalDbRecipe
}

export function RecipeCard(props: RecipeCardProps) {
  return (
    <Grid.Col key={props.recipe.id} span={3}>
      <Card shadow="md" padding="xl">
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{props.recipe.name}</Text>
        </Group>
        <Text size="sm" c="dimmed">
          {props.recipe.short_description}
        </Text>
      </Card>
    </Grid.Col>
  )
}

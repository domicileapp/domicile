import { Group, Title } from '@mantine/core'

interface RecipeTitleProps {
  // Need to adjust this on the backend to make this required.
  name?: string
}

export function RecipeTitle({ name }: RecipeTitleProps) {
  return (
    <Group variant="default" mb="sm">
      <Title order={1}>{name}</Title>
    </Group>
  )
}

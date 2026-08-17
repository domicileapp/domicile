import { Text } from '@mantine/core'

interface RecipeDescriptionProps {
  description?: string
}

export function RecipeDescription({ description }: RecipeDescriptionProps) {
  if (!description) {
    return
  }

  return <Text mb="sm">{description}</Text>
}

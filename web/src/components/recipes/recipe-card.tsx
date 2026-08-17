import { BackgroundImage, Box, Card, Grid, Overlay, Title } from '@mantine/core'

import type { GithubComDomicileappDomicileInternalDbRecipe } from '@/api/schemas'

interface RecipeCardProps {
  recipe: GithubComDomicileappDomicileInternalDbRecipe
}

export function RecipeCard(props: RecipeCardProps) {
  return (
    <Grid.Col key={props.recipe.id} span={{ base: 12, md: 6, lg: 3 }}>
      <Card padding="md" shadow="sm" component="a" href={`/recipes/${props.recipe.id}`} withBorder>
        <Card.Section h={200} pos="relative">
          {props.recipe.photo_url ? (
            <BackgroundImage src={props.recipe.photo_url} h={200} pos="relative">
              <Overlay
                gradient="linear-gradient(0deg,rgba(0, 0, 0, 0.5) 10%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 70%)"
                zIndex={1}
              />
              <Box pos="relative" style={{ zIndex: 2 }} p="sm">
                <Title order={2} size="h4" c="white" lineClamp={2}>
                  {props.recipe.name}
                </Title>
              </Box>
            </BackgroundImage>
          ) : (
            <Box p="sm">
              <Title order={2} size="h4" lineClamp={2}>
                {props.recipe.name}
              </Title>
            </Box>
          )}
        </Card.Section>
      </Card>
    </Grid.Col>
  )
}

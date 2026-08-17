import { Button, Card, Container, Grid, List, Text, Title } from '@mantine/core'
import { ArrowSquareOutIcon } from '@phosphor-icons/react'

import type { RecipesRecipeResponse } from '@/api/schemas'

import { RecipeDescription } from './recipe-description'
import { RecipeMeta } from './recipe-meta'
import { RecipePhotoCard } from './recipe-photo-card'
import { RecipeTitle } from './recipe-title'

interface RecipePageProps {
  recipe: RecipesRecipeResponse
}
export function RecipePage({ recipe }: RecipePageProps) {
  return (
    <div>
      <RecipePhotoCard photoUrl={recipe.photo_url} />
      <Container px="sm" py="sm">
        <RecipeTitle name={recipe.name} />
        <RecipeDescription description={recipe.short_description} />
        <Grid>
          <RecipeMeta
            items={[
              { key: 'Prep time', value: recipe.prep_time },
              { key: 'Cook time', value: recipe.cook_time },
              { key: 'Servings', value: recipe.servings },
            ]}
          />
        </Grid>
        <Grid mt="md">
          <Title order={2} size="h4">
            Ingredients
          </Title>
          <Grid.Col span={12}>
            <Card>
              <List>
                {recipe.ingredients?.map((ingredient) => (
                  <List.Item key={ingredient.id}>{ingredient.raw_text}</List.Item>
                ))}
              </List>
            </Card>
          </Grid.Col>
        </Grid>
        <Grid mt="md">
          <Title order={2} size="h4">
            Instructions
          </Title>
          <Grid.Col span={12}>
            <Card>
              <List type="ordered">
                {recipe.instructions?.map((instruction) => (
                  <List.Item key={instruction.id}>{instruction.content}</List.Item>
                ))}
              </List>
            </Card>
          </Grid.Col>
        </Grid>
        <Grid mt="md">
          <Title order={2} size="h4">
            Nutrition
          </Title>
          <Grid.Col span={12}>
            <Card>
              <List type="ordered">
                {recipe.instructions?.map((instruction) => (
                  <List.Item key={instruction.id}>{instruction.content}</List.Item>
                ))}
              </List>
            </Card>
          </Grid.Col>
        </Grid>
        {recipe.notes && (
          <Grid mt="md">
            <Title order={2} size="h4">
              Notes
            </Title>
            <Grid.Col span={12}>
              <Card>
                <Text>{recipe.notes}</Text>
              </Card>
            </Grid.Col>
          </Grid>
        )}
        {recipe.source && (
          <Grid mt="md">
            <Grid.Col span={12}>
              <Button
                size="sm"
                variant="transparent"
                onClick={() => window.open(recipe.source, '_blank')}
                rightSection={<ArrowSquareOutIcon />}
              >
                Source
              </Button>
            </Grid.Col>
          </Grid>
        )}
      </Container>
    </div>
  )
}

import { Card, DataList, Grid } from '@mantine/core'

interface RecipeMetaItem {
  key: string
  value: string | number | undefined
}

interface RecipeMetaProps {
  items?: RecipeMetaItem[]
}

export function RecipeMeta({ items }: RecipeMetaProps) {
  const visibleItems = items?.filter(
    (item): item is RecipeMetaItem & { value: string | number } =>
      item.value !== undefined && item.value !== null && item.value !== ''
  )

  if (!visibleItems?.length) {
    return null
  }

  return (
    <Grid.Col span={12}>
      <Card>
        <DataList orientation="horizontal">
          {visibleItems.map((item) => (
            <DataList.Item key={item.key}>
              <DataList.ItemLabel>{item.key}</DataList.ItemLabel>
              <DataList.ItemValue>{item.value}</DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList>
      </Card>
    </Grid.Col>
  )
}

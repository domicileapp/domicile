import { Container, Image } from '@mantine/core'

interface RecipePhotoCardProps {
  photoUrl?: string
}

export function RecipePhotoCard({ photoUrl }: RecipePhotoCardProps) {
  if (!photoUrl) {
    return
  }

  return (
    <Container>
      <Image src={photoUrl} height={250} radius="md" />
    </Container>
  )
}

import { queryClient } from '@/providers/ReactQuery'
import { IRecipe } from '@domicile/contracts'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateRecipeFn, getRecipe } from './hooks/recipes.api'
import { useEffect } from 'react'
import { pickBy } from 'lodash'
import { LoadingButton } from '@mui/lab'

export default function EditRecipe() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipe(id),
  })

  const updateRecipeSchema = object({
    title: string(),
    directions: string(),
    ingredients: string(),
  }).partial()

  type IUpdateRecipe = TypeOf<typeof updateRecipeSchema>

  const { mutate: updateRecipe } = useMutation(
    ({ id, recipeData }: { id: string; recipeData: Partial<IRecipe> }) =>
      updateRecipeFn(id, recipeData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['recipes'])
        queryClient.invalidateQueries(['recipe', id])
        navigate(`/recipes/${id}`)
        // show success toast
      },
      onError: (error: any) => {},
    }
  )

  const methods = useForm<IUpdateRecipe>({
    resolver: zodResolver(updateRecipeSchema),
  })

  const {
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    if (isSubmitting) {
      methods.reset()
    }
  }, [isSubmitting])

  useEffect(() => {
    if (recipe) {
      methods.reset({
        title: recipe.title,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
      })
    }
  }, [recipe])

  const onSubmitHandler: SubmitHandler<IUpdateRecipe> = (values) => {
    const formData = new FormData()
    const filteredFormData = pickBy(values, (value) => value !== '' && value !== undefined)
    const { ...otherFormData } = filteredFormData
    formData.append('data', JSON.stringify(otherFormData))
    console.log(otherFormData)
    updateRecipe({ id: recipe?.id!, recipeData: otherFormData })
  }

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <div>
      <Paper sx={{ p: 3, m: 3 }} elevation={2}>
        <FormProvider {...methods}>
          <Box component='form' noValidate onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant='filled'
                  label='Title'
                  {...methods.register('title')}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant='filled'
                  label='Prep Time'
                  type='number'
                  helperText='in minutes'
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant='filled'
                  label='Cook Time'
                  helperText='in minutes'
                  type='number'
                />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth variant='filled' label='Serving Size' />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant='filled'
                  label='Ingredients'
                  multiline
                  {...methods.register('ingredients')}
                  helperText="Press 'Enter' to add new lines"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant='filled'
                  label='Directions'
                  {...methods.register('directions')}
                  multiline
                  helperText="Press 'Enter' to add new lines"
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  loading={isLoading}
                  sx={{ float: 'right' }}
                  color='primary'
                  variant='contained'
                  type='submit'
                >
                  Create
                </LoadingButton>
                <Button
                  sx={{ float: 'right', mr: 1 }}
                  color='inherit'
                  variant='text'
                  href='/recipes'
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Paper>
    </div>
  )
  // return <RecipeForm initialValue={recipe} />
}

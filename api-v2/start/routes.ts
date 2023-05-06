import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/users', 'UsersController.index')

  Route.get('recipes', 'RecipesController.index')
  Route.get('/recipes/:id', 'RecipesController.view')
  Route.post('recipes', 'RecipesController.create')
  Route.patch('/recipes/:id', 'RecipesController.update')
  Route.delete('/recipes/:id', 'RecipesController.delete')
}).middleware('auth')

Route.post('/users', 'UsersController.create')
Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch {
    return response.unauthorized({ message: 'Invalid credentials' })
  }
})

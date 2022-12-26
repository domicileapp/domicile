import { test } from '@japa/runner'

test('return welcome response', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertBodyContains({ hello: 'world' })
})

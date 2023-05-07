import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import RecipeFactory from './RecipeFactory'

export default Factory.define(User, ({ faker }) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    firstName: firstName,
    lastName: lastName,
    email: faker.internet.email(firstName, lastName),
    password: 'P@ssw0rd',
  }
})
  .relation('recipes', () => RecipeFactory)
  .build()

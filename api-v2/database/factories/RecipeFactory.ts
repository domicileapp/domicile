import Factory from '@ioc:Adonis/Lucid/Factory'
import Recipe from 'App/Models/Recipe'
import CategoryFactory from './CategoryFactory'

export default Factory.define(Recipe, ({ faker }) => {
  return {
    title: faker.company.catchPhrase(),
    description: faker.lorem.lines(2),
    ingredients: faker.lorem.lines(10),
    instructions: faker.lorem.lines(),
    prepTime: faker.datatype.number().toString(),
    cookTime: faker.datatype.number().toString(),
  }
})
  .relation('categories', () => CategoryFactory)
  .build()

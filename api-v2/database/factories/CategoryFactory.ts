import Factory from '@ioc:Adonis/Lucid/Factory'
import Category from 'App/Models/Category'
import RecipeFactory from './RecipeFactory'

export default Factory.define(Category, ({ faker }) => {
  return {
    name: faker.lorem.words(2),
  }
})
  .relation('recipes', () => RecipeFactory)
  .build()

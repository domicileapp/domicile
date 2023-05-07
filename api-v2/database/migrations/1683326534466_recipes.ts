import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'recipes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.text('ingredients').notNullable()
      table.text('instructions').notNullable()
      table.string('title').notNullable()
      table.string('description').nullable()
      table.string('prep_time').nullable()
      table.string('cook_time').nullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('NO ACTION')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

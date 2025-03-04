'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassesSchema extends Schema {
  up () {
    this.create('classes', (table) => {
      table.increments()
    
      table.string('subject').notNullable();
      table.decimal('cost');
  
      table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('classes')
  }
}

module.exports = ClassesSchema

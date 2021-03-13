'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelationSchema extends Schema {
  up () {
    this.create('relations', (table) => {
      table.increments()
      table.boolean("favorito").notNullable();
      table
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

        table
        .integer("class_id")
        .notNullable()
        .references("id")
        .inTable("classes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamps()
    })
  }

  down () {
    this.drop('relations')
  }
}

module.exports = RelationSchema

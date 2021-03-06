'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('profile', 2).notNullable()
      table.string('bio', 254)
      table.string('whatsapp', 254).notNullable()
      table.timestamps('cost', 10)
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

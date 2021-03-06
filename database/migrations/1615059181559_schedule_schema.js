'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up () {
    this.create('schedules', (table) => {
      table.increments('id').primary();

      table.integer('week_day').notNullable();
      table.integer('from').notNullable();
      table.integer('to').notNullable();
  
      table.integer('class_id')
        .notNullable()
        .references('id')
        .inTable('classes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamps();
 
    })
  }

  down () {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema

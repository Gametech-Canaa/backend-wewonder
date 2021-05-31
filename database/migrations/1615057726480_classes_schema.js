"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClassesSchema extends Schema {
  up() {
    this.create("classes", (table) => {
      table.increments();
      table
        .integer("subject")
        .notNullable()
        .references("id")
        .inTable("modalities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("bio").notNullable();
      table.string("limite").notNullable();
      table.decimal("cost");

      table
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("classes");
  }
}

module.exports = ClassesSchema;

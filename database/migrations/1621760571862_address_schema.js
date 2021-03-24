"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", (table) => {
      table.increments();
      table
        .integer("class_id")
        .notNullable()
        .references("id")
        .inTable("classes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("cep").nullable();
      table.string("latitude").nullable();
      table.string("longitude").nullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressSchema;

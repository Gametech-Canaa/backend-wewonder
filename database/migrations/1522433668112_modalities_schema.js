"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ModalitiesSchema extends Schema {
  up() {
    this.create("modalities", (table) => {
      table.increments();
      table.string("description");
      table.timestamps();
    });
  }

  down() {
    this.drop("modalities");
  }
}

module.exports = ModalitiesSchema;

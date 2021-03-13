"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Relations extends Model {
  user() {
    this.hasOne("App/Models/User");
  }
  class() {
    this.hasOne("App/Models/Classes");
  }
}

module.exports = Relations;

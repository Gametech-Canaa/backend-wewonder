"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Classes extends Model {
  user() {
    this.hasOne("App/Models/User");
  }
  modality() {
    this.hasOne("App/Models/Modality");
  }
}

module.exports = Classes;

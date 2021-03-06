"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Schedule extends Model {
  classes() {
    this.hasOne("App/Models/Classes");
  }
}

module.exports = Schedule;

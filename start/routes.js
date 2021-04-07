"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("authenticate", "UserController.authenticate");
Route.post("register", "UserController.store");
Route.get("user/:id", "UserController.show").middleware(["auth"]);
Route.put("user/:id", "UserController.update").middleware(["auth"]);

Route.post("classes", "ClassesController.create").middleware(["auth"]);
Route.get("classes", "ClassesController.index").middleware(["auth"]);
Route.get("classes/:id", "ClassesController.show").middleware(["auth"]);

Route.get("addresses", "AddressController.index").middleware(["auth"]);

Route.post("relations", "RelationsController.create").middleware(["auth"]);
Route.get(
  "relations/:classId",
  "RelationsController.showUsersByGroup"
).middleware(["auth"]);

Route.get("relations", "RelationsController.showGroupsByUser").middleware([
  "auth",
]);

Route.delete("relations/:id", "RelationsController.delete").middleware([
  "auth",
]);
Route.put("relations/:id", "RelationsController.favorite").middleware(["auth"]);
Route.get("filter", "FiltersController.index").middleware(["auth"]);
Route.get("/", (response) => {
  response.json({ message: "Working..." });
});

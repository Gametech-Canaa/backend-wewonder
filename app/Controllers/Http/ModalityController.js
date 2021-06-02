"use strict";

const Modality = use("App/Models/Modality");
const Database = use("Database");

class ModalityController {
  async create({ request, response }) {
    const data = request.only(["description"]);

    const modality = await Modality.create(data);

    return response.json(modality);
  }

  async list({ request, response }) {
    const modalities = await Modality.all();
    return response.json(modalities);
  }
  async delete({ request, response, auth, params }) {
    const relation = await Database.table("modalities")
      .where({ id: params.id })
      .delete();
    return response.status(200).json(relation);
  }
}

module.exports = ModalityController;

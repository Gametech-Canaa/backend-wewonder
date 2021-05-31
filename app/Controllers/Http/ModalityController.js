"use strict";

const Modality = use("App/Models/Modality");

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
}

module.exports = ModalityController;

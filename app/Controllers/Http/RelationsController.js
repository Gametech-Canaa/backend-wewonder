const Relations = use("App/Models/Relations");
const Database = use("Database");

class RelationsController {
  async create({ request, response, auth }) {
    const data = request.only(["class_id"]);
    const { class_id } = data;
    const user_id = auth.user.id;
    const relation = await Relations.create({
      user_id,
      class_id,
      favorito: false,
    });

    return response.status(200).json(relation);
  }

  async showUsersByGroup({ request, response, auth, params }) {
    const data = params.classId;
    const relation = await Database.table("relations").where("class_id", data);
    return response.status(200).json(relation);
  }

  async showGroupsByUser({ request, response, auth }) {
    const user_id = auth.user.id;
    const relation = await Database.table("relations").where(
      "user_id",
      user_id
    );
    return response.status(200).json(relation);
  }
  async delete({ request, response, auth, params }) {
    const user_id = auth.user.id;
    const relation = await Database.table("relations")
      .where({ id: params.id, user_id: user_id })
      .delete();
    return response.status(200).json(relation);
  }
  async favorite({ request, response, auth, params }) {
    const data = request.only(["favorito"]);
    const { favorito } = data;
    const user_id = auth.user.id;
    const relation = await Database.table("relations")
      .where({ id: params.id, user_id: user_id })
      .update("favorito", favorito);
    return response.status(200).json(relation);
  }
}

module.exports = RelationsController;

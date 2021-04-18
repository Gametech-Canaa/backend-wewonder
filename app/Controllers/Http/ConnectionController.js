const Database = use("Database");

class ConnectionController {
  async index({ response }) {
    const db = await Database.beginTransaction();

    const totalConnections = await db("users").count("* as total");
    const { total } = totalConnections[0];
    return response.status(200).send({ total });
  }
}

module.exports = ConnectionController;

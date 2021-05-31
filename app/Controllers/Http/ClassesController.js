const convertHourToMinutes = require("../../utils/convertHourToMinute");
const Classes = use("App/Models/Classes");
const Schedule = use("App/Models/Schedule");
const Users = use("App/Models/User");
const Address = use("App/Models/Address");
const Database = use("Database");

class ClassesController {
  async index({ request, response, auth }) {
    const data = request.only([]);
  }

  async show({ request, response, auth, params }) {
    const cl = await Classes.find(params.id);
    const teacher = await Users.find(cl.user_id);
    return response.status(200).send([cl, teacher]);
  }

  async create({ request, response, auth }) {
    const data = request.only([
      "subject",
      "cost",
      "schedule",
      "cep",
      "latitude",
      "longitude",
      "limite",
      "bio",
    ]);

    const {
      subject,
      cost,
      schedule,
      cep,
      latitude,
      longitude,
      bio,
      limite,
    } = data;

    const trx = await Database.beginTransaction();
    const user_id = auth.user.id;
    try {
      const insertedClassesIds = await Classes.create({
        subject,
        cost,
        user_id,
        limite,
        bio,
      });
      const class_id = insertedClassesIds.id;
      const address = await Address.create({
        class_id,
        cep,
        latitude: String(latitude),
        longitude: String(longitude),
      });
      const classSchedule = schedule.map((scheduleItem) => {
        return {
          class_id,
          week_day: Number(scheduleItem.week_day),
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          created_at: new Date(),
          updated_at: new Date(),
        };
      });

      const schedules = await trx("schedules").insert(classSchedule);

      await trx.commit();
      return response.status(201).send(class_id, schedules, address);
    } catch (err) {
      await trx.rollback();
      return response.status(400).json({
        error: err.message,
      });
    }
  }

  async delete({ request, response, params }) {
    try {
      const trx = await Database.beginTransaction();
      const group = await Database.table("classes")
        .where({ id: params.id })
        .delete();
      await trx.commit();
      return response.status(200).json(group);
    } catch (err) {
      await trx.rollback();
      return response.status(400).json({
        error: err,
      });
    }
  }
}

module.exports = ClassesController;

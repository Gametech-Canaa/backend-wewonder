const convertHourToMinutes = require("../../utils/convertHourToMinute");
const Classes = use("App/Models/Classes");
const Schedule = use("App/Models/Schedule");
const Address = use("App/Models/Address");
const Database = use("Database");

class ClassesController {
  async index({ request, response, auth }) {
    const data = request.only(["classId"]);
  }

  async create({ request, response, auth }) {
    const data = request.only(["subject", "cost", "schedule", "cep"]);

    const { subject, cost, schedule, cep } = data;

    const trx = await Database.beginTransaction();
    const user_id = auth.user.id;
    try {
      const insertedClassesIds = await Classes.create({
        subject,
        cost,
        user_id,
      });
      const class_id = insertedClassesIds.id;
      const address = await Address.create({
        class_id,
        cep,
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
      console.log(err);
      return response.status(400).json({
        error: err,
      });
    }
  }
}

module.exports = ClassesController;

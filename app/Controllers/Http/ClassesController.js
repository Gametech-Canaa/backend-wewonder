const convertHourToMinutes = require("../../utils/convertHourToMinute");
const Classes = use("App/Models/Classes");
const Schedule = use("App/Models/Schedule");
const Database = use("Database");

class ClassesController {
  async create({ request, response }) {
    const data = request.only(["id", "subject", "cost", "schedule"]);

    const { id, subject, cost, schedule } = data;

    const trx = await Database.beginTransaction();

    try {
      const insertedClassesIds = await Classes.create({
        subject,
        cost,
        user_id: id,
      });
      const class_id = insertedClassesIds.id;
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
      return response.status(201).send(schedules);
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

const convertHourToMinutes = require("../../utils/convertHourToMinute");
const Database = use("Database");

class FiltersController {
  async index({ request, response, auth, params }) {
    const db = await Database.beginTransaction();

    const filters = request.all();

    const subject = filters.subject;
    const week_day = filters.week_day;
    const time = filters.time;
    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: "Missing filters to search classes",
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const id = await Database.select("id")
      .from("classes")
      .whereExists(function () {
        this.from("schedules")
          .whereRaw("schedules.class_id = classes.id")
          .whereRaw("schedules.week_day = ??", [Number(week_day)])
          .whereRaw("schedules.from <= ??", [Number(timeInMinutes)])
          .whereRaw("schedules.to > ??", [Number(timeInMinutes)]);
      })
      .whereRaw("classes.subject = '??' ", [Number(subject)]);
    const ids = id.map((i) => i.id);
    const addresses = await Database.from("addresses").whereIn(
      "addresses.class_id",
      ids
    );

    return response.status(200).send(addresses);
  }
}

module.exports = FiltersController;

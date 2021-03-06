const convertHourToMinutes = require('../../utils/convertHourToMinute');
const Classes = use("App/Models/Classes");
const Schedule = use("App/Models/Schedule");


 class ClassesController {
  async create ({request, response}) {
    
 
      const data = request.only(["id", "subject", "cost", "schedule"]);

      const {id, subject, cost, schedule} = data;
        console.log({id, subject, cost, schedule});
    try {
        
      const insertedClassesIds = await Classes.create({
        subject,
        cost,
        user_id:id,
      });
      const class_id = insertedClassesIds.id;
      const classSchedule = schedule.map((scheduleItem) => {
       return { 
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to)
       }
      })
      const test = classSchedule.map((dado) => {
          console.log(dado)
          const a = await Schedule.create(dado)
        });
  
      return response.status(201);
    } catch (err) {
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}

module.exports = ClassesController;

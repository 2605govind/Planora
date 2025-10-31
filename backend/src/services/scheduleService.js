import cron from 'node-cron';
import Sequelize, { Op, fn, col, where } from 'sequelize';
import User from '../Model/User.js';
import Plan from '../Model/Plan.js';


// 0 0 * * * → Minute: 0, Hour: 0, Day of month: * (har din), Month: * (har month), Weekday: * (har week day)
cron.schedule('0 0 * * *', async () => {
  // will run every day at midnight
  console.log('Updating daily credits...');

  // find all users have plan basic, business enterprise wahi free wala nhi lena
  const users = await User.findAll({
    where: where(
      fn('LOWER', col('plan')),
      {
        [Op.in]: ['basic', 'business', 'enterprise']
      }
    )
  });


  for (let user of users) {
    const plan = await Plan.findOne({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('name')),
        { [Op.eq]: user.plan.toLowerCase() }
      )
    });

    if (plan) {
      user.balance = plan.creditsPerMonth;
      user.plan_start_date = new Date();
      await user.save();
      console.log(`Updated credits for ${user.name} to ${plan.monthly_credits}`);
    }
  }
});



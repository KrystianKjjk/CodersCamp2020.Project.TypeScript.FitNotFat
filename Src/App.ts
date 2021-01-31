console.log('hello');
import { createHistoricalWeeklyGoalsTable } from './UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable';
import{generateWeeklyGoalComponent}from './UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';
document.body.appendChild(generateWeeklyGoalComponent('1'));
document.body.appendChild(
  createHistoricalWeeklyGoalsTable([
    {
      date: '12.06.2021',
      weeklyGoal: '+5kg',
      startWeight: '70kg',
      endWeight: '80kg',
      achievedIn: '150%',
    },
    {
      date: '10.01.2021',
      weeklyGoal: '-3kg',
      startWeight: '60kg',
      endWeight: '50kg',
      achievedIn: '10%',
    },
    {
        date: '10.01.2021',
        weeklyGoal: '-3kg',
        startWeight: '60kg',
        endWeight: '50kg',
        achievedIn: '10%',
      },
      {
        date: '10.01.2021',
        weeklyGoal: '-3kg',
        startWeight: '60kg',
        endWeight: '50kg',
        achievedIn: '10%',
      },
  ]),
);

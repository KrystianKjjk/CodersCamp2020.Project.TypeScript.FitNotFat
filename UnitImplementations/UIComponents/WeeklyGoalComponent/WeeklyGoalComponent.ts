import{generateWeeklyGoalComponent}from '../../../Src/UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';

document.body.appendChild(generateWeeklyGoalComponent('1', (wg) => {
  console.log(wg)
}));

import { WeeklyGoal } from '../Models/WeeklyGoal.model';
import {createHistoricalWeeklyGoalsTable} from '../Src/UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable'


describe('Tests for createHistoricalWeeklyGoalsTable',()=>{
    test('Should render only headers', ()=>{
       const table=createHistoricalWeeklyGoalsTable([]);
       expect(table).toMatchSnapshot();
    })

    test('Should render table with rows', ()=>{
        const table=createHistoricalWeeklyGoalsTable([{
            date: new Date(1995,11,17),
            weeklyGoal: WeeklyGoal.Gain,
            startWeight: 70,
            endWeight: 80,
            achieved: 'Yes',
          },
          {
            date: new Date(1994,12,18),
            weeklyGoal: WeeklyGoal.Lose,
            startWeight: 60,
            endWeight: 61,
            achieved: 'No',
          }]);
        expect(table).toMatchSnapshot();
    })
})
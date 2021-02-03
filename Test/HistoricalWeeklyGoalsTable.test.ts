import {createHistoricalWeeklyGoalsTable} from '../Src/UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable'

describe('Tests for createHistoricalWeeklyGoalsTable',()=>{
    test('Should render only headers', ()=>{
       const table=createHistoricalWeeklyGoalsTable([]);
       expect(table).toMatchSnapshot();
    })

    test('Should render table with rows', ()=>{
        const table=createHistoricalWeeklyGoalsTable([{
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
          }]);
        expect(table).toMatchSnapshot();
    })
})
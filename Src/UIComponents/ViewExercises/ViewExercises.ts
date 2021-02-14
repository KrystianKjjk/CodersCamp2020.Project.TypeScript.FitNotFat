import { createMyDiaryExercisesDashboard } from '../Exercises/ExercisesDashboard'
import dashboardView from "../DashboardView/DashboardView";
import { createElement, getLoggedInUser } from '../utils/utils';
import { VIEW_NAME } from '../../../Constants/consts';

export function ViewExercises(): HTMLElement {
    let exercisesComponent;
    let exercisesView;
    
    const userName = getLoggedInUser();
    if (userName) {
        exercisesComponent = createMyDiaryExercisesDashboard();
        exercisesView = dashboardView(VIEW_NAME.Exercises, exercisesComponent);
    }
    else {
        exercisesView = dashboardView(VIEW_NAME.Exercises, (createElement('div', 'error-view', 'Something went wrong') as HTMLDivElement));
    }

    return exercisesView;
}

import generateFirstStepForm from '../../UIComponents/FormComponent/FormComponent';
import {User} from '../../../Models/User.model';
import {ActivityLevel} from '../../../Models/ActivityLevel.model';
export default function generateRegistrationForm(onRegistrationSuccess:Function):HTMLElement {
   
    let name: string;
    let gender: 'Male' | 'Female';
    let dateOfBirth: Date;
    let height: number;
    let currentWeight: number;
    let goalWeight: number;
    let activityLevel: ActivityLevel;
    
    const firstStepForm=generateFirstStepForm();
    return firstStepForm;
}

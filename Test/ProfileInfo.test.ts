import {profileInfo} from '../Src/UIComponents/ProfileInfo/ProfileInfo';
import { ActivityLevel } from '../Models/ActivityLevel.model';
import { WeeklyGoal } from '../Models/WeeklyGoal.model';

const username = 'User123';
const gender: 'Male' | 'Female' = 'Male';
const dateOfBirth = new Date('2011-04-11T10:20:30Z');
const height = 170;
const weight = 60;
const activityLevel: ActivityLevel = ActivityLevel.Active;
const weeklyGoal = WeeklyGoal.Gain;
const goalWeight = 70;

const userData = {
    username,
    gender,
    dateOfBirth,
    height,
    weight,
    activityLevel,
    weeklyGoal,
    goalWeight,
}
const component = profileInfo(userData);

describe('Profile info', () => {
    test('returns HTMLElement', () => {
        expect(component).toBeInstanceOf(HTMLElement);
    });
    test('includes username', () => {
        expect(component.innerHTML.includes(username)).toBe(true);
    });
    test('includes gender', () => {
        expect(component.innerHTML.includes(gender)).toBe(true);
    });
    test('includes date of birth', () => {
        expect(component.innerHTML.includes("11/04/2011")).toBe(true);
    });
    test('includes height', () => {
        expect(component.innerHTML.includes(`${height}cm`)).toBe(true);
    });
    test('includes weight', () => {
        expect(component.innerHTML.includes(`${weight}kg`)).toBe(true);
    });
    test('includes activity level', () => {
        expect(component.innerHTML.includes(activityLevel)).toBe(true);
    });
    test('includes weekly goal', () => {
        expect(component.innerHTML.includes(`${weeklyGoal}`)).toBe(true);
    });
    test('includes goal weight', () => {
        expect(component.innerHTML.includes(`${goalWeight}kg`)).toBe(true);
    });
});
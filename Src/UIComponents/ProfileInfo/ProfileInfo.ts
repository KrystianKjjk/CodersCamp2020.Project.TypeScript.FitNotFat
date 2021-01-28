import * as moment from 'moment';
function profileInfo(profileData: {
    username: string,
    gender: 'Male' | 'Female',
    dateOfBirth: Date,
    height: number, // cm
    weight: number, // kg
    activityLevel: 'Low' | 'Regular' | 'Active' | 'Very Active',
    weeklyGoal: number, // kg
    goalWeight: number, // kg
}){
    const component = document.createElement('div');
    
    // profileData['dateOfBirth'] = moment(profileData['dateOfBirth']).format('YYYY MM DD'); !important
    component.innerHTML = 
                `
                <h3>User profile</h3>
                <div>
                    <span>Gender:</span> ${profileData['gender']}
                </div>
                <div>
                    <span>Gender:</span> ${profileData['gender']}
                </div>
                <h3>User profile</h3>
                <div>
                    <span>Gender:</span> ${profileData['gender']}
                </div>
                <div>
                    <span>Gender:</span> ${profileData['gender']}
                </div>
                `;
    return component;
}

export {profileInfo};
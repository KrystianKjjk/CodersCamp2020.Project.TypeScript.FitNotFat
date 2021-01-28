function profileInfo(profileData: {
    username: string,
    gender: 'male'|'female',
    dateOfBirth: Date,
    height: number, // cm
    weight: number, // kg
    activityLevel: 'Active' | 'Normal' | 'None',
    weeklyGoal: number, // kg
    goalWeight: number, // kg
}){
    const component = document.createElement('ul');
    component.innerHTML = Object.keys(profileData).map((key) => {
        return `<li>
                    ${key}: ${profileData[key]}
                </li>`
    }).join('');
    return component;
}

export {profileInfo};
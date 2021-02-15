import { User } from '../../../Models/User.model';
import { readFromLocalStorage, saveInLocalStorage } from '../LocalStorage/LocalStorage';
import { refreshRemainingCalories } from '../SetRemainingCalories/SetRemainingCalories';
import { generateGaugesContent } from '../../UIComponents/Overview/Overview';
import { refreshMyWeightsComponent } from '../../UIComponents/MyWeights/MyWeights';
import { RefreshProfileInfo } from '../SetProfileInfo/SetProfileInfo';

export function saveWeightInLocalStorage(weight: number, date: Date, user:User){
  user = readFromLocalStorage(user.name);
  user.weights.unshift({
    date: date,
    weight: weight
  });

  generateGaugesContent(user);
  saveInLocalStorage(user.name, user);
  refreshRemainingCalories();
  refreshMyWeightsComponent(user);
  RefreshProfileInfo(user);
}

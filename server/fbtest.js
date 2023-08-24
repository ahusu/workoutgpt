import {db, postFitnessPlan} from './firebase.js'

const newFitnessPlan = {
  name: "Ahu",
  exercises: 'some long string of exercises',
  //... any other properties related to the fitness plan
};

postFitnessPlan(newFitnessPlan);
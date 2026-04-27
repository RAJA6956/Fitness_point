const USER_KEY = 'fitness_user';
const WORKOUTS_KEY = 'fitness_workouts';
const NUTRITION_KEY = 'fitness_nutrition';
const PROGRESS_KEY = 'fitness_progress';
const GOALS_KEY = 'fitness_goals';

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export const saveStoredUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const getStoredData = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

export const saveStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getWorkoutData = () => getStoredData(WORKOUTS_KEY);
export const saveWorkoutData = (value) => saveStoredData(WORKOUTS_KEY, value);
export const getNutritionData = () => getStoredData(NUTRITION_KEY);
export const saveNutritionData = (value) => saveStoredData(NUTRITION_KEY, value);
export const getProgressData = () => getStoredData(PROGRESS_KEY);
export const saveProgressData = (value) => saveStoredData(PROGRESS_KEY, value);
export const getGoalsData = () => getStoredData(GOALS_KEY);
export const saveGoalsData = (value) => saveStoredData(GOALS_KEY, value);

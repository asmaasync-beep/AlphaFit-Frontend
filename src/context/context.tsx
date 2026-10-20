import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Meal = {
  id: string;
  name: string;
  calories: number;
  date: string;
};

type FitnessContextType = {
  weightLogs: number[];
  currentWeight: number;
  meals: Meal[];
  addMeal: (name: string, calories: number) => void;
  logWeight: (weight: number) => void;
  totalCaloriesToday: number;
};

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weightLogs, setWeightLogs] = useState<number[]>([68]);
  const [meals, setMeals] = useState<Meal[]>([]);

  // App launch hoto tevha data load kara
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedMeals = await AsyncStorage.getItem('@meals');
      const savedWeight = await AsyncStorage.getItem('@weight_logs');
      if (savedMeals) setMeals(JSON.parse(savedMeals));
      if (savedWeight) setWeightLogs(JSON.parse(savedWeight));
    } catch (e) {
      console.log('Failed to load storage data', e);
    }
  };

  const addMeal = async (name: string, calories: number) => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name,
      calories,
      date: new Date().toISOString(),
    };
    const updatedMeals = [newMeal, ...meals];
    setMeals(updatedMeals);
    await AsyncStorage.setItem('@meals', JSON.stringify(updatedMeals));
  };

  const logWeight = async (weight: number) => {
    const updatedLogs = [weight, ...weightLogs];
    setWeightLogs(updatedLogs);
    await AsyncStorage.setItem('@weight_logs', JSON.stringify(updatedLogs));
  };

  const currentWeight = weightLogs[0] || 68;

  const totalCaloriesToday = meals.reduce((sum, item) => sum + item.calories, 0);

  return (
    <FitnessContext.Provider
      value={{
        weightLogs,
        currentWeight,
        meals,
        addMeal,
        logWeight,
        totalCaloriesToday,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
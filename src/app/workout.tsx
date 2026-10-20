import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Exercise = {
  id: string;
  title: string;
  category: string;
  duration: string;
  calories: string;
  completed: boolean;
};

const INITIAL_EXERCISES: Exercise[] = [
  { id: '1', title: 'Push-ups Standard', category: 'Strength', duration: '3 Sets x 15 Reps', calories: '45 kcal', completed: false },
  { id: '2', title: 'Incline Dumbbell Press', category: 'Strength', duration: '4 Sets x 12 Reps', calories: '120 kcal', completed: false },
  { id: '3', title: 'Treadmill Running', category: 'Cardio', duration: '20 Mins', calories: '200 kcal', completed: false },
  { id: '4', title: 'Core Plank Hold', category: 'HIIT', duration: '3 Sets x 60 Secs', calories: '35 kcal', completed: false },
];

export const STORAGE_KEY = '@alphafit_workout_data_v2';

export default function WorkoutScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Modal State for adding new exercise
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Strength');
  const [newDuration, setNewDuration] = useState<string>('');
  const [newCalories, setNewCalories] = useState<string>('');

  const categories = ['All', 'Strength', 'Cardio', 'HIIT', 'Flexibility'];

  useEffect(() => {
    loadSavedExercises();
  }, []);

  const loadSavedExercises = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData !== null) {
        setExercises(JSON.parse(savedData));
      }
    } catch (e) {
      console.log('Failed to load exercises data', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveExercises = async (updatedExercises: Exercise[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExercises));
    } catch (e) {
      console.log('Failed to save exercises data', e);
    }
  };

  const toggleComplete = (id: string) => {
    if (!isLoaded) return;
    const updated = exercises.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setExercises(updated);
    saveExercises(updated);
  };

  const handleAddExercise = () => {
    if (!newTitle.trim()) {
      Alert.alert('Error', 'Please enter exercise name');
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      duration: newDuration.trim() || '3 Sets',
      calories: newCalories.trim() ? `${newCalories.trim()} kcal` : '50 kcal',
      completed: false,
    };

    const updatedList = [...exercises, newExercise];
    setExercises(updatedList);
    saveExercises(updatedList);

    // Reset Form
    setNewTitle('');
    setNewDuration('');
    setNewCalories('');
    setModalVisible(false);
  };

  const deleteExercise = (id: string) => {
    Alert.alert(
      'Delete Exercise',
      'Are you sure you want to remove this exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updated = exercises.filter((ex) => ex.id !== id);
            setExercises(updated);
            saveExercises(updated);
          },
        },
      ]
    );
  };

  const resetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all exercises for today?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            const resetData = exercises.map((ex) => ({ ...ex, completed: false }));
            setExercises(resetData);
            saveExercises(resetData);
          },
        },
      ]
    );
  };

  const filteredExercises = selectedCategory === 'All'
    ? exercises
    : exercises.filter((ex) => ex.category === selectedCategory);

  const completedCount = exercises.filter((ex) => ex.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Workout Routine</Text>
            <Text style={styles.subtitle}>Track and hit your daily goals</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressCount}>{completedCount} of {exercises.length} Completed</Text>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>
              {exercises.length > 0 ? Math.round((completedCount / exercises.length) * 100) : 0}%
            </Text>
          </View>
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exercises List Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>Today's Plan</Text>
          {completedCount > 0 && (
            <TouchableOpacity onPress={resetProgress}>
              <Text style={styles.resetButtonText}>Reset All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Exercises List */}
        {filteredExercises.map((item) => (
          <View key={item.id} style={styles.exerciseCard}>
            <TouchableOpacity
              style={styles.exerciseDetails}
              onLongPress={() => deleteExercise(item.id)}
            >
              <Text style={[styles.exerciseTitle, item.completed && styles.completedText]}>
                {item.title}
              </Text>
              <Text style={styles.exerciseMeta}>{item.duration} • {item.calories}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={[styles.iconText, item.completed && styles.iconActive]}>
                {item.completed ? '✓' : '○'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>

      {/* Add Exercise Modal Popup */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Exercise</Text>

            <TextInput
              style={styles.input}
              placeholder="Exercise Name (e.g. Squats)"
              placeholderTextColor="#6B7280"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Duration / Reps (e.g. 3 Sets x 12 Reps)"
              placeholderTextColor="#6B7280"
              value={newDuration}
              onChangeText={setNewDuration}
            />

            <TextInput
              style={styles.input}
              placeholder="Calories (e.g. 80)"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              value={newCalories}
              onChangeText={setNewCalories}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={handleAddExercise}
              >
                <Text style={styles.saveBtnText}>Save Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0A',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressCard: {
    backgroundColor: '#121417',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressCount: {
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 4,
  },
  badgeContainer: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#121417',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  activeChip: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  categoryText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  activeCategoryText: {
    color: '#000000',
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resetButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  exerciseCard: {
    backgroundColor: '#121417',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#4B5563',
  },
  exerciseMeta: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  iconText: {
    fontSize: 22,
    color: '#4B5563',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  iconActive: {
    color: '#10B981',
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#121417',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#374151',
    marginRight: 8,
  },
  saveBtn: {
    backgroundColor: '#10B981',
    marginLeft: 8,
  },
  cancelBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  saveBtnText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
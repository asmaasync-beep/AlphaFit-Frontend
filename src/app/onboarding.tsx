import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Goal = 'Weight Loss' | 'Muscle Gain' | 'Stay Fit';

export default function OnboardingScreen() {
  const router = useRouter();

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const goals: Goal[] = ['Weight Loss', 'Muscle Gain', 'Stay Fit'];

  const handleContinue = () => {
    router.replace('/(tabs)' as any);
  };

  const isFormValid = age !== '' && height !== '' && weight !== '' && selectedGoal !== null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subtitle}>
          This helps us calculate your daily calorie goals.
        </Text>

        {/* Age Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            placeholder="e.g., 22"
            placeholderTextColor="#888"
          />
        </View>

        {/* Height Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            placeholder="e.g., 175"
            placeholderTextColor="#888"
          />
        </View>

        {/* Weight Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholder="e.g., 70"
            placeholderTextColor="#888"
          />
        </View>

        {/* Goal Selector */}
        <Text style={styles.label}>Select Your Goal</Text>
        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.goalCard,
                selectedGoal === goal && styles.selectedGoalCard,
              ]}
              onPress={() => setSelectedGoal(goal)}
            >
              <Text
                style={[
                  styles.goalText,
                  selectedGoal === goal && styles.selectedGoalText,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#07100C',
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#121A16',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1E2D24',
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginTop: 8,
  },
  goalCard: {
    flex: 1,
    backgroundColor: '#121A16',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#1E2D24',
  },
  selectedGoalCard: {
    borderColor: '#20E040',
    backgroundColor: '#16291D',
  },
  goalText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedGoalText: {
    color: '#20E040',
  },
  button: {
    backgroundColor: '#20E040',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#1C3D24',
    opacity: 0.6,
  },
  buttonText: {
    color: '#07100C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

  
           
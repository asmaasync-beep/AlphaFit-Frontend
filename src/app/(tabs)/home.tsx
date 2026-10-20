import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.userName}>Ahmad</Text>
          </View>
          <TouchableOpacity style={styles.profileBadge}>
            <Text style={styles.profileBadgeText}>A</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Stats Cards */}
        <Text style={styles.sectionTitle}>Daily Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>480</Text>
            <Text style={styles.statLabel}>Kcal Burned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⏱️</Text>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Active Mins</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🏃</Text>
            <Text style={styles.statValue}>6,200</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
        </View>

        {/* Featured Today's Workout Card */}
        <Text style={styles.sectionTitle}>Today's Routine</Text>
        <View style={styles.workoutCard}>
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutTag}>RECOMMENDED</Text>
            <Text style={styles.workoutDuration}>35 min</Text>
          </View>
          <Text style={styles.workoutTitle}>Full Body Starter</Text>
          <Text style={styles.workoutSubtitle}>4 Exercises • Beginner Level</Text>

          <TouchableOpacity 
            style={styles.startWorkoutButton}
            onPress={() => router.push('/workout')}
              // Partner 2 ke workout flow se connect hoga
            
          >
            <Text style={styles.startWorkoutButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>

        {/* Weekly Goals Summary */}
        <Text style={styles.sectionTitle}>Weekly Activity</Text>
        <View style={styles.weeklyCard}>
          <View style={styles.weeklyRow}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <View key={index} style={styles.dayCol}>
                <View style={[styles.dayBar, index < 4 && styles.activeBar]} />
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#121A16',
    borderWidth: 1,
    borderColor: '#20E040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBadgeText: {
    color: '#20E040',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#121A16',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#1E2D24',
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: '#A0A0A0',
    marginTop: 2,
  },
  workoutCard: {
    backgroundColor: '#121A16',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1E2D24',
    marginBottom: 24,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutTag: {
    color: '#20E040',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  workoutDuration: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  workoutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  workoutSubtitle: {
    fontSize: 13,
    color: '#A0A0A0',
    marginBottom: 16,
  },
  startWorkoutButton: {
    backgroundColor: '#20E040',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startWorkoutButtonText: {
    color: '#07100C',
    fontSize: 15,
    fontWeight: 'bold',
  },
  weeklyCard: {
    backgroundColor: '#121A16',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E2D24',
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
  },
  dayCol: {
    alignItems: 'center',
    flex: 1,
  },
  dayBar: {
    width: 8,
    height: 45,
    backgroundColor: '#1E2D24',
    borderRadius: 4,
    marginBottom: 8,
  },
  activeBar: {
    backgroundColor: '#20E040',
    height: 60,
  },
  dayText: {
    color: '#A0A0A0',
    fontSize: 12,
  },
});
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  DimensionValue,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnalyticsScreen() {
  const weeklyReport = [
    { day: 'Mon', calories: 320 },
    { day: 'Tue', calories: 250 },
    { day: 'Wed', calories: 400 },
    { day: 'Thu', calories: 180 },
    { day: 'Fri', calories: 310 },
    { day: 'Sat', calories: 450 },
    { day: 'Sun', calories: 200 },
  ];

  const maxCalories = 500;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <TouchableOpacity style={styles.badge}>
            <Text style={styles.badgeText}>This Week</Text>
          </TouchableOpacity>
        </View>

        {/* Highlight Card */}
        <View style={styles.highlightCard}>
          <View>
            <Text style={styles.highlightLabel}>Total Calories Burned</Text>
            <Text style={styles.highlightValue}>2,110 <Text style={styles.highlightUnit}>kcal</Text></Text>
          </View>
          <View style={styles.percentBadge}>
            <Text style={styles.percentText}>+12% vs last week</Text>
          </View>
        </View>

        {/* Weekly Bar Chart */}
        <Text style={styles.sectionTitle}>Calorie Consumption Chart</Text>
        <View style={styles.chartCard}>
          <View style={styles.chartRow}>
            {weeklyReport.map((item, index) => {
              const heightPercent: DimensionValue = `${Math.round((item.calories / maxCalories) * 100)}%`;
              return (
                <View key={index} style={styles.barColumn}>
                  <Text style={styles.barLabel}>{item.calories}</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { height: heightPercent }]} />
                  </View>
                  <Text style={styles.dayLabel}>{item.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Summary Breakdown */}
        <Text style={styles.sectionTitle}>Summary Breakdown</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryEmoji}>🔥</Text>
            <Text style={styles.summaryNum}>301 kcal</Text>
            <Text style={styles.summarySub}>Avg Daily Calories</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryEmoji}>⚡</Text>
            <Text style={styles.summaryNum}>12 Sessions</Text>
            <Text style={styles.summarySub}>Workouts Done</Text>
          </View>
        </View>

        {/* Motivation Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Fitness Insight</Text>
          <Text style={styles.tipText}>
            You burn most calories on Saturday! Keep consistency throughout weekdays for optimal muscle recovery.
          </Text>
        </View>

      </ScrollView>
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
  badge: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
  },
  highlightCard: {
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
  highlightLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  highlightUnit: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: 'normal',
  },
  percentBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  chartCard: {
    backgroundColor: '#121417',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barLabel: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4,
  },
  barTrack: {
    width: 12,
    height: 110,
    backgroundColor: '#1F2937',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 6,
  },
  dayLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#121417',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
  },
  summaryEmoji: {
    fontSize: 22,
    marginBottom: 6,
  },
  summaryNum: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  summarySub: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  tipCard: {
    backgroundColor: '#121417',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 13,
    color: '#D1D5DB',
    lineHeight: 18,
  },
});
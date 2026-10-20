import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  // Active Modal State ('meal' | 'ai' | 'weight' | null)
  const [activeModal, setActiveModal] = useState<'meal' | 'ai' | 'weight' | null>(null);

  // Form States
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [weight, setWeight] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [aiResponses, setAiResponses] = useState([
    { sender: 'ai', text: 'Hello Ahmed! How can I help you reach your fitness goals today?' },
  ]);

  const handleSendMessage = () => {
    if (!aiMessage.trim()) return;
    setAiResponses((prev) => [
      ...prev,
      { sender: 'user', text: aiMessage },
      { sender: 'ai', text: 'That sounds like a great plan! Make sure to stay hydrated and get enough protein.' },
    ]);
    setAiMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#090A0A" />

      {/* Main Content ScrollView */}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.headerIconText}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.headerIconText}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text style={styles.greetingText}>Good Morning, Ahmed 👋</Text>

        {/* Motivational Quote Card */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteMarkLeft}>“</Text>
          <Text style={styles.quoteText}>Discipline today,{'\n'}strength tomorrow.</Text>
          <Text style={styles.quoteMarkRight}>”</Text>
        </View>

        {/* AI Insight Card */}
        <View style={styles.aiInsightCard}>
          <View style={styles.aiInsightLeft}>
            <Text style={styles.aiInsightTitle}>AI Insight</Text>
            <Text style={styles.aiInsightSubText}>
              You improved your consistency by 20% this week! 🔥
            </Text>
          </View>
          
          <View style={styles.circleBadge}>
            <Text style={styles.circleBadgeText}>80%</Text>
          </View>
        </View>

        {/* Today's Plan */}
        <View style={styles.todaysPlanCard}>
          <View style={styles.planInfoContainer}>
            <Text style={styles.planTag}>Today's Plan</Text>
            <Text style={styles.planTitle}>Upper Body Strength</Text>
            <Text style={styles.planMetrics}>30 min  •  Medium  •  220 kcal</Text>
            
            <TouchableOpacity 
              style={styles.startWorkoutBtn}
              onPress={() => router.push('/workout' as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.startWorkoutBtnText}>Start Workout</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80' }}
            style={styles.workoutImage}
            resizeMode="cover"
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          
          {/* Log Meal Button */}
          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => setActiveModal('meal')}
            activeOpacity={0.5}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#2E1065' }]} pointerEvents="none">
              <Text style={{ fontSize: 18 }}>🍽️</Text>
            </View>
            <Text style={styles.actionText} pointerEvents="none">Log Meal</Text>
          </TouchableOpacity>

          {/* AI Coach Button */}
          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => setActiveModal('ai')}
            activeOpacity={0.5}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#3B0764' }]} pointerEvents="none">
              <Text style={{ fontSize: 18 }}>✨</Text>
            </View>
            <Text style={styles.actionText} pointerEvents="none">AI Coach</Text>
          </TouchableOpacity>

          {/* Track Weight Button */}
          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => setActiveModal('weight')}
            activeOpacity={0.5}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#064E3B' }]} pointerEvents="none">
              <Text style={{ fontSize: 18 }}>⚖️</Text>
            </View>
            <Text style={styles.actionText} pointerEvents="none">Track Weight</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={{ fontSize: 18 }}>🏠</Text>
          <Text style={[styles.tabLabel, { color: '#10B981' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/workout' as any)}
        >
          <Text style={{ fontSize: 18 }}>🏋️</Text>
          <Text style={styles.tabLabel}>Workouts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={{ fontSize: 18 }}>🥗</Text>
          <Text style={styles.tabLabel}>Nutrition</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/analytics' as any)}
        >
          <Text style={{ fontSize: 18 }}>📊</Text>
          <Text style={styles.tabLabel}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/profile' as any)}
        >
          <Text style={{ fontSize: 18 }}>👤</Text>
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MODALS ================= */}

      {/* 1. Log Meal Modal */}
      <Modal
        visible={activeModal === 'meal'}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setActiveModal(null)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>🍽️ Log Meal</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)} style={{ padding: 5 }}>
                  <Text style={styles.closeBtn}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Meal Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Oatmeal & Eggs"
                placeholderTextColor="#6B7280"
                value={mealName}
                onChangeText={setMealName}
              />

              <Text style={styles.inputLabel}>Calories (kcal)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 450"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
              />

              <TouchableOpacity 
                style={styles.modalSubmitBtn}
                onPress={() => {
                  Alert.alert('Success', 'Meal logged successfully!');
                  setMealName('');
                  setCalories('');
                  setActiveModal(null);
                }}
              >
                <Text style={styles.modalSubmitBtnText}>Save Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 2. AI Coach Modal */}
      <Modal
        visible={activeModal === 'ai'}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { height: '70%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>✨ AI Coach</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)} style={{ padding: 5 }}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, marginVertical: 10 }}>
              {aiResponses.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.chatBubble,
                    item.sender === 'user' ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text style={styles.chatText}>{item.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.chatInputRow}>
              <TextInput
                style={[styles.textInput, { flex: 1, marginBottom: 0 }]}
                placeholder="Ask AI Coach..."
                placeholderTextColor="#6B7280"
                value={aiMessage}
                onChangeText={setAiMessage}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 3. Track Weight Modal */}
      <Modal
        visible={activeModal === 'weight'}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setActiveModal(null)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>⚖️ Track Weight</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)} style={{ padding: 5 }}>
                  <Text style={styles.closeBtn}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Current Weight (kg)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 68.5"
                placeholderTextColor="#6B7280"
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />

              <TouchableOpacity 
                style={styles.modalSubmitBtn}
                onPress={() => {
                  Alert.alert('Success', 'Weight updated!');
                  setWeight('');
                  setActiveModal(null);
                }}
              >
                <Text style={styles.modalSubmitBtnText}>Log Weight</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090A0A',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerIconText: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  iconBtn: {
    padding: 4,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 18,
  },
  quoteCard: {
    backgroundColor: '#121417',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  quoteMarkLeft: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    lineHeight: 30,
  },
  quoteMarkRight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    lineHeight: 30,
  },
  quoteText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    flex: 1,
  },
  aiInsightCard: {
    backgroundColor: '#121417',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  aiInsightLeft: {
    flex: 1,
    paddingRight: 10,
  },
  aiInsightTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  aiInsightSubText: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 18,
  },
  circleBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#064E3B',
  },
  circleBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  todaysPlanCard: {
    backgroundColor: '#0F5132',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 170,
  },
  planInfoContainer: {
    width: '60%',
    zIndex: 2,
  },
  planTag: {
    color: '#A7F3D0',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  planTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  planMetrics: {
    color: '#D1D5DB',
    fontSize: 11,
    marginBottom: 16,
  },
  startWorkoutBtn: {
    backgroundColor: '#090A0A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  startWorkoutBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  workoutImage: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 160,
    height: 180,
    borderRadius: 20,
    opacity: 0.9,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#121417',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  actionIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#090A0A',
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    marginTop: 3,
  },

  /* ===== Modal Styles ===== */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#121417',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeBtn: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  inputLabel: {
    color: '#D1D5DB',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,
  },
  modalSubmitBtn: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  modalSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  chatBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#10B981',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#1F2937',
    alignSelf: 'flex-start',
  },
  chatText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  sendBtn: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
  export default function SignInScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSignIn = () => {
    // TODO: Implement actual sign-in logic
    console.log('Signing in with:', email, password);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>ALPHAFIT</Text>
      <Text style={styles.title}>Welcome back.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.68)"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}/>        
  
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="rgba(255, 255, 255, 0.68)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

     <TouchableOpacity onPress={() => console.log('Forgot password')} style={styles.forgotPasswordButton}>
  <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
</TouchableOpacity>

    <TouchableOpacity onPress={handleSignIn} style={styles.button}>
  <Text style={styles.buttonText}>Sign In</Text>
</TouchableOpacity>


<TouchableOpacity onPress={() => router.replace('/sign-up')} style={styles.createAccountButton}>
  <Text style={styles.createAccountText}>Create account</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#07100c',
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },
  eyebrow: {
    color: '#b7f34a',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 20, // Added margin for spacing
  },
  title: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '800',
    marginBottom: 30, // Added margin for spacing
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    borderRadius: 8,
    padding: 18,
    fontSize: 16,
    marginBottom: 15,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#b7f34a',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#b7f34a',
    borderRadius: 16,
    padding: 18,
  },
  buttonText: {
    color: '#101b0c',
    fontWeight: '800',
    fontSize: 16,
  },
  createAccountButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  createAccountText: {
    color: '#b7f34a',
    fontSize: 14,
    fontWeight: '600',
  },
});
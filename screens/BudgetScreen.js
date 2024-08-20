import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function SuggestBudget({ navigation }) {
  const [budget, setBudget] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/tp.png')}
        style={styles.logo}
      />
      <Text style={styles.step}>STEP 4/4</Text>
      <Text style={styles.title}>Suggest your budget</Text>
      <Text style={styles.subtitle}>What is your budget?</Text>
      <Text style={styles.description}>
        You can always negotiate the final price.
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Kshs. 0.00"
        value={budget}
        onChangeText={setBudget}
      />
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Completed')}>
          <Text style={styles.buttonTextNext}>Place Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  step: {
    fontSize: 12,
    color: 'grey',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  buttonTextNext: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskLocation = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('inPerson');
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/tp.png')}
        style={styles.logo}
      />

      <Text style={styles.stepIndicator}>STEP 2/4</Text>

      <Text style={styles.title}>Tell us where</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'inPerson' ? styles.optionButtonSelected : null
          ]}
          onPress={() => setSelectedOption('inPerson')}
        >
          <Ionicons name="location-outline" size={24} color={selectedOption === 'inPerson' ? 'white' : 'black'} />
          <Text style={[
            styles.optionText,
            selectedOption === 'inPerson' ? styles.optionTextSelected : null
          ]}>In-person</Text>
          <Text style={[
            styles.optionSubText,
            selectedOption === 'inPerson' ? styles.optionSubTextSelected : null
          ]}>Select this if you need the Tasker physically there</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'online' ? styles.optionButtonSelected : null
          ]}
          onPress={() => setSelectedOption('online')}
        >
          <Ionicons name="phone-portrait-outline" size={24} color={selectedOption === 'online' ? 'white' : 'black'} />
          <Text style={[
            styles.optionText,
            selectedOption === 'online' ? styles.optionTextSelected : null
          ]}>Online</Text>
          <Text style={[
            styles.optionSubText,
            selectedOption === 'online' ? styles.optionSubTextSelected : null
          ]}>Select this if the Tasker can do it from home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationInputContainer}>
        <Ionicons name="location-sharp" size={24} color="grey" />
        <TextInput
          style={styles.locationInput}
          placeholder="Bombolulu Estate, Mombasa"
          placeholderTextColor="#000"
        />
        <TouchableOpacity>
          <Ionicons name="close-outline" size={24} color="grey" />
        </TouchableOpacity>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Details')}>
          <Text style={styles.buttonTextNext}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  stepIndicator: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#001c6b',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#007BFF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  optionTextSelected: {
    color: '#fff',
  },
  optionSubText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  optionSubTextSelected: {
    color: '#fff',
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
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

export default TaskLocation;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PostScreen({navigation}) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    { label: 'Morning', icon: 'sunny', time: 'Before 10am' },
    { label: 'Midday', icon: 'partly-sunny', time: '10am - 2pm' },
    { label: 'Afternoon', icon: 'cloudy', time: '2pm - 6pm' },
    { label: 'Evening', icon: 'moon', time: 'After 6pm' },
  ];

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/tp.png')}
        style={styles.logo}
      />
      <Text style={styles.stepIndicator}>STEP 1/4</Text>
      <Text style={styles.title}>Let's start with the basics</Text>
      <Text style={styles.label}>When do you need this done?</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g Help move my furniture"
        placeholderTextColor="#8f8f8f"
      />
      
      <Text style={styles.label}>When do you need this done?</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>Select Date: {date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      
      <Text style={styles.label}>Select a time:</Text>
      <View style={styles.timeContainer}>
        {timeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlot,
              selectedTime === slot.label ? styles.selected : null,
            ]}
            onPress={() => setSelectedTime(slot.label)}
          >
            <Icon name={slot.icon} size={40} color={selectedTime === slot.label ? '#007BFF' : 'gray'} />
            <Text style={styles.timeText}>{slot.label}</Text>
            <Text style={styles.timeTextSlot}>{slot.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('TaskLocation')}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  timeSlot: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    
  },
  selected: {
    borderColor: '#007BFF',
    backgroundColor: '#e0f7ff',
  },
  timeText: {
    marginTop: 5,
    fontSize: 10,
  },
  timeTextSlot: {
    fontSize: 10,
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
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  nextButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TaskDetailsScreen({ route, navigation }) {
  const { task } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{task.title}</Text>
      <Text style={{ marginVertical: 20 }}>{task.description}</Text>
      <Button title="Back to Tasks" onPress={() => navigation.goBack()} />
    </View>
  );
}

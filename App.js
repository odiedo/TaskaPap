import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PostTaskScreen from './screens/PostTaskScreen';
import TaskLocationScreen from './screens/TaskLocationScreen';
import DetailsSreen from './screens/DetailsScreen';
import SuggestBudget from './screens/BudgetScreen';
import TaskCompleted from './screens/TaskCompletedScreen';
import GroceriesScreen from './screens/GroceriesScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TaskLocation" component={TaskLocationScreen} options={{ title: 'Task Details' }} />
        <Stack.Screen name="PostTask" component={PostTaskScreen} options={{ title: 'Post a Task' }} />
        <Stack.Screen name="Details" component={DetailsSreen} options={{ title: 'More details' }} />
        <Stack.Screen name="Budget" component={SuggestBudget} options={{ title: 'Suggest budget' }} />
        <Stack.Screen name="Completed" component={TaskCompleted} options={{ headerShown: false }} />
        <Stack.Screen name="Groceries" component={GroceriesScreen} options={{ title: 'Groceries delivery' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

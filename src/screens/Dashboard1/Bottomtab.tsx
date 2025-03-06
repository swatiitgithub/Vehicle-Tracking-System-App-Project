import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard1 from '../Dashboard1/DashBoard1';
import KudaghrLocation from '../Dashboard1/KudaghrLocation';
import VehicleTravelled from '../Dashboard1/VehicleTravelled';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard1') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'KudaghrLocation') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'VehicleTravelled') {
            iconName = focused ? 'car' : 'car-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff' },
      })}
    >
      <Tab.Screen
        name="Dashboard1"
        component={Dashboard1}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="KudaghrLocation"
        component={KudaghrLocation}
        options={{ title: 'Kudaghr Location' }}
      />
      <Tab.Screen
        name="VehicleTravelled"
        component={VehicleTravelled}
        options={{ title: 'Vehicle Travelled' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
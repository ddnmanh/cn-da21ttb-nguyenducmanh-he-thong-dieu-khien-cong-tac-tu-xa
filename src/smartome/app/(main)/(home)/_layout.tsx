import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // Import StackNavigator
import House from './index';
import Area from './area';

const Stack = createStackNavigator(); // Tạo Stack Navigator

export default function HomeLayout() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="index" component={House} options={{ title: 'Nhà Của Tôi', headerShown: false }} />
            <Stack.Screen name="area" component={Area} options={{ title: 'Phòng Của Tôi', headerShown: false}} />
        </Stack.Navigator>
    );
}

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CitySelectionScreen from "../screens/home/CitySelectionScreen";
import BarSelectionScreen from "../screens/home/BarSelectionScreen";
import {RootStackParamList} from "../types/navigation";
import MenuScreen from "../screens/menu/MenuScreen";
import {COLORS} from "../constants/colors";
import {STRINGS} from "../constants/strings";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerBackTitle: "", // нужно, чтобы на ios не было дефолтного отображения названия экранов
                headerTintColor: COLORS.font_color_primary,
                headerTitleStyle: {color: COLORS.font_color_primary},
                headerShadowVisible: false,
                headerTitleAlign: "center",
            }}>
                <Stack.Screen name="CitySelection" component={CitySelectionScreen} options={{headerShown: false}} />
                <Stack.Screen name="BarSelection" component={BarSelectionScreen} options={{ title: STRINGS.choose_bar, headerTitleStyle: {fontSize: 15}, headerStyle: { backgroundColor: COLORS.primary_yellow }  }} />
                <Stack.Screen name="Menu" component={MenuScreen} options={{ title: STRINGS.menu, headerTitleStyle: {fontSize: 15}, headerStyle: { backgroundColor: COLORS.primary_yellow }  }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

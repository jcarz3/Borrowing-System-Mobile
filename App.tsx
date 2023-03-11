import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BorrowListScreen from "./screens/BorrowListScreen";
import BottomView from "./screens/BottomView";

import HomeScreen from "./screens/HomeScreen";

export type RootStackParamList = {
  Home: undefined;
  ItemList: undefined;
  BorrowList: undefined;
  BottomView: undefined;
  BottomContent: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="BorrowList"
              component={BorrowListScreen}
            />
            <Stack.Screen
              name="BottomView"
              component={BottomView}
              options={{ headerShown: false, presentation: "modal" }}
            />
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

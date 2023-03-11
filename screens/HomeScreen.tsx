import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "white" }}>
      <View className="w-full flex items-center mt-[10]">
        <Image
          source={require("../images/hand.png")}
          style={{ width: 400, height: 400 }}
          className="ml-10 mt-15"
        />
      </View>
      <Text className="text-5xl mt-10 mx-5 text-gray-600 font-bold z-50">
        For your every
      </Text>
      <Text className="text-6xl mx-5 mt-2 text-orange-400 font-bold z-50">
        needs.
      </Text>
      <View className="w-full h-full rounded-t-3xl flex items-center p-1 mt-[10]">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BorrowList");
          }}
          className="w-[320] flex justify-center items-center bg-orange-400 rounded-lg drop-shadow-lg"
        >
          <Text className="m-3 text-white font-bold text-base tracking-wide">
            Borrow
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

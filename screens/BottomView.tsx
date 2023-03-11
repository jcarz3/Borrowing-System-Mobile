import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/core";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BottomView",
  "BottomContent"
>;
const BottomView = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      {/* Add BlurView component to the underlying content */}
      <BlurView style={{ flex: 1 }} intensity={100} tint="dark">
        {/* your underlying content here */}
        <Text>Underlying content</Text>
      </BlurView>
      {/* Add semi-transparent background to the modal */}
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
      </TouchableWithoutFeedback>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: "50%",
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 20,
        }}
      >
        {/* your half-screen content here */}
        <Text>Modal content</Text>
        <TouchableOpacity>
          <Ionicons
            name="add-outline"
            style={{ fontWeight: "bold" }}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BottomView;

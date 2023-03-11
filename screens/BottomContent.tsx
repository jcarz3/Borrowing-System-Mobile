import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { NavigationProp } from "./BottomView";
import Ionicons from "@expo/vector-icons/Ionicons";

const BottomContent = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BottomView");
          }}
          className="flex justify-center items-center p-1 rounded-lg bg-[#F1F6F8]"
        >
          <Ionicons
            name="arrow-back"
            style={{ fontWeight: "bold" }}
            size={24}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <Text>BottomContent</Text>
    </View>
  );
};

export default BottomContent;

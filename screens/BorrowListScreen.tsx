import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";

import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import AddItemModal from "../components/AddItemModal";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BorrowList"
>;

interface Items {
  id: number;
  item_Name: string;
  quantity: number;
}

const Stack = createStackNavigator();

const BorrowListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [items, setItems] = useState<Items[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // get all items
  useEffect(() => {
    axios
      .get("https://48ab-180-190-160-86.ap.ngrok.io/api/Item_Management")
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, [items]);

  //para filter sa items nya maoy ipagawas sa search
  const filteredItems = items.filter((item) =>
    item.item_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // modal for add items
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // fonts
  const [loaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    // Add other font weights and styles as needed
  });
  if (!loaded) {
    return null; // Render a placeholder or loading component while the font is being loaded
  }

  return (
    <View className="flex-1  px-7 ">
      <View className="h-full">
        <View className="flex-row  mt-[50] items-center">
          {/* Back arrow button */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className=" w-[40] h-[40] flex justify-center items-center  p-1 rounded-lg bg-[#F1F6F8]"
          >
            <Ionicons
              name="arrow-back"
              style={{ fontWeight: "bold" }}
              size={24}
            />
          </TouchableOpacity>

          {/* Title of the Page */}
          <Text
            style={{ fontFamily: "PoppinsRegular" }}
            className="text-2xl text-gray-700 ml-10 font-semi-bold tracking-wide"
          >
            Items
          </Text>

          {/* Add items Button */}
          <TouchableOpacity
            style={{
              borderRadius: 1,
              elevation: 5, // Add elevation property for box shadow
              shadowColor: "black", // Set shadow color to black
              shadowOpacity: 0.9, // Set shadow opacity
              shadowRadius: 8, // Set shadow radius
              shadowOffset: {
                width: 1,
                height: 1,
              },
            }}
            onPress={toggleModal}
            className="absolute right-0 top-0 w-[40] h-[40] flex justify-center items-center  bg-red-100 p-1 rounded-lg bg-white"
          >
            <Ionicons
              name="add-outline"
              style={{ fontWeight: "bold" }}
              size={24}
            />
          </TouchableOpacity>
        </View>

        {/* Search Container */}
        <View
          className="flex flex-row rounded-2xl my-10 px-2 py-1 items-center mb-5"
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderColor: "gray",
          }}
        >
          <Ionicons
            name="search-sharp"
            size={24}
            color="gray"
            style={{ marginTop: 4 }}
          />
          <TextInput
            placeholder="Search.."
            placeholderTextColor="gray"
            className="text-base ml-1 w-full"
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
        </View>

        {/* Items Container */}
        <View>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                className="bg-white flex px-4 py-4 mb-3 rounded-md"
                style={{
                  borderRadius: 1,
                  elevation: 1, // Add elevation property for box shadow
                  shadowColor: "black", // Set shadow color to black
                  shadowOpacity: 0.5, // Set shadow opacity
                  shadowRadius: 2, // Set shadow radius
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                }}
              >
                <View className="w-6 h-6 absolute top-5 right-5">
                  <Ionicons name="close-outline" size={24} color="gray" />
                </View>

                <View className="flex flex-row  h-[15] items-center">
                  <Text
                    className="text-normal text-gray-500 mt-[-2]"
                    style={{ fontFamily: "PoppinsRegular" }}
                  >
                    Item Id:{" "}
                  </Text>
                  <Text className="text-normal text-gray-500 mt-[-2]">
                    {item.id}
                  </Text>
                </View>
                <View className="flex flex-row  h-[15] items-center">
                  <Text
                    className="text-normal text-gray-500 mt-[-2]"
                    style={{ fontFamily: "PoppinsRegular" }}
                  >
                    Item Name:{" "}
                  </Text>
                  <Text className="text-normal text-gray-500 mt-[-2]">
                    {item.item_Name}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <AddItemModal isVisible={isModalVisible} toggleModal={toggleModal} />

      {/* <View className="h-1/2 bg-blue-200">
        <Stack.Navigator>
          
          <Stack.Screen
            name="BottomContent"
            component={BottomContent}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View> */}
    </View>
  );
};

export default BorrowListScreen;

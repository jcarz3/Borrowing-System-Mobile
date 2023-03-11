import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import axios from "axios";

import Ionicons from "@expo/vector-icons/Ionicons";

type HalfModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
};

interface Item {
  Item_Name: string;
}

const AddItemModal = ({ isVisible, toggleModal }: HalfModalProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
    setError(" ");
  };

  //   add Items

  const handleBlur = () => {
    if (!itemName) {
      setError("This field is required.");
    }
    setIsFocused(false);
  };

  const handleSubmit = () => {
    if (!itemName) {
      setError("This field is required.");
      return;
    }
    const payload: Item = {
      Item_Name: itemName,
    };

    axios
      .post(
        "https://48ab-180-190-160-86.ap.ngrok.io/api/Item_Management",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("success");
        toggleModal();
        setItemName("");
      });
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      style={{ margin: 0 }}
      backdropOpacity={0.4}
      backdropColor="black"
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <BlurView
          intensity={100}
          tint="dark"
          style={{ flex: 1 }}
          className="rounded-t-3xl"
        >
          <View className="bg-white flex-1 w-full h-[220] rounded-t-3xl p-7">
            <Text className="text-lg">Add Items</Text>

            <View className="flex mt-5">
              <Text className="mb-1 text-xs">Item Name</Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder="Eg. Laptop"
                className="text-base w-full rounded-lg p-1 px-2"
                style={{
                  borderColor: error
                    ? "red"
                    : isFocused
                    ? "skyblue"
                    : "#CCC8C8",
                  borderWidth: 1,
                  fontSize: 13,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={itemName}
                onChangeText={setItemName}
              />
              {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

              {/* Button Container */}
              <View
                style={{ display: "flex" }}
                className="flex justify-center items-end mt-4"
              >
                <TouchableOpacity
                  onPress={handleSubmit}
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
                  className="flex-row justify-center items-center bg-[#5C5FC7] px-3 py-2 rounded-lg "
                >
                  <Ionicons
                    name="ios-checkmark-circle-outline"
                    size={14}
                    color="white"
                  ></Ionicons>
                  <Text className="text-white">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

export default AddItemModal;

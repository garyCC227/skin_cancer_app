import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { log } from "react-native-reanimated";
import { Card, ListItem, Button, Icon } from "react-native-elements";

// https://github.com/exponent/image-upload-example.

export default pickImage = async (accessCamera, setImage) => {
  // grant permission
  (async () => {
    if (Platform.OS !== "web") {
      if (accessCamera == false) {
        let {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();

        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      } else {
        let { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    }
  })()
  

  const option = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    // aspect: [6, 16],
    quality: 0,
    base64: true,
  };

  let result = null;
  if (accessCamera == false) {
    result = await ImagePicker.launchImageLibraryAsync(option);
  } else {
    result = await ImagePicker.launchCameraAsync(option);
  }
  if (result && !result.cancelled) {
    // setImage(result.uri);
    setImage(result);
  }
};
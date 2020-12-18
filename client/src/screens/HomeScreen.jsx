import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Touchable, TextBase
} from "react-native";
import { get } from "lodash";
import {
  Cards as paperCard,
  withTheme,
  Title,
  Caption,
  Divider,
  Avatar,
  Surface,
  Button,
  DarkTheme,
  DefaultTheme,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import App from "../../App";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { Card, Block } from "galio-framework";
import theme from "../styles/theme";
import { ListItem, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");
const homeimage = require("../images/logo_img.png");

const HomeScreen = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  var items = [
    {
      title: "Weather",
      subtitle: "Check the weather of your current location",
      icon: (
        <MaterialCommunityIcons name="weather-hazy" size={24} color="#5287fa" />
      ),
      func: () => navigation.navigate("Weather", { loca: location }),
    },
    {
      title: "Malenoma Introduction",
      subtitle: "Why should you keep an eye on Malenoma?",
      icon: <FontAwesome5 name="readme" size={24} color="#5287fa" />,
      func: () => navigation.navigate("Info"),
    },
    {
      title: "Skin Risk",
      subtitle: "What skin cancer risk factor shoud you be ware of?",
      icon: <FontAwesome name="file-text-o" size={24} color="#5287fa" />,
      func: () => navigation.navigate("Article"),
    },
  ];

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        let loca = await Location.getCurrentPositionAsync({});
        setLocation(loca);
      })();
    }
  }, [location]);

  return (
    <View style={[styles.container]}>
      <Image
      source={require("../images/logo_img.png")}
      style={styles.Homelogo}
      />
      {location ? (
        <ScrollView  >
          <Block>
            {items.map((item, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={item.func}
                style={styles.List}
              >
                {/* <Icon name={item.icon} /> */}
                {item.icon}
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                  <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </Block>
        </ScrollView>
      ) : 
      (<View style={{    flex: 1,
        justifyContent: "center"}}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  List: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: theme.SIZES.BASE * 0.3,
  },
  flatListContainer: {
    width: "100%",
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  Homelogo: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContent: {
    margin: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
  },
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  full: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: "absolute",
    overflow: "hidden",
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});

export default HomeScreen;

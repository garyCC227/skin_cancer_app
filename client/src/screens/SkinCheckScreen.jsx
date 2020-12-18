import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Card as CardTwo, Icon, Tile } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { FloatingAction } from "react-native-floating-action";
import pickImage from "../components/pickImage";
import { Button, Card, Block, Text } from "galio-framework";

import theme from "../styles/theme";

import Axios from "axios";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("window").height;

var actions = [
  {
    text: "Album",
    icon: <FontAwesome name="image" size={20} color="white" />,
    name: "photo",
    position: 1,
  },
  {
    text: "Camera",
    icon: <FontAwesome name="camera" size={20} color="white" />,
    name: "camera",
    position: 2,
  },
];

export default function SkinCheckScreen(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      if (actions.length == 2) {
        actions.push({
          text: "Send",
          icon: (
            <FontAwesome name="send-o" size={20} color="black" color="white" />
          ),
          name: "send",
          position: 3,
        });
      }
    }
  }, [image]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {!image && (
          // place a place holding image here
          <View>
            <View style={styles.guide}>
              <CardTwo>
                <CardTwo.Title>
                  <Text>Guide</Text>
                </CardTwo.Title>
                <CardTwo.Divider />
                <Text style={{ marginBottom: 10 }}>
                  1. Use the{" "}
                  <Icon name="add-circle" type="material" color="#517fa4" />{" "}
                  button to upload a image
                </Text>

                <Text style={{ marginBottom: 10 }}>
                  2. After a successfully uploaded, the image would be shown
                  above!
                </Text>

                <Text style={{ marginBottom: 10 }}>
                  3. Use the{" "}
                  <Icon name="add-circle" type="material" color="#517fa4" />{" "}
                  button again to send the image, then do a quick skin check!!
                </Text>
              </CardTwo>
            </View>
            <AntDesign name="clouduploado" size={350} color="#5287fa" />
          </View>
        )}
        {image && (
          // display the image in the card
          <View style={{ alignItems: "center" }}>
            {/* <Card style={styles.card} title={'title'}/> */}
            <Card
              // flex
              borderless
              shadowColor={theme.COLORS.BLACK}
              style={styles.card}
              // title='Aquaman'
              // caption='1 minutes ago'
              // location='Wollongong'
              titleColor={theme.COLORS.WHITE}
              // avatar='https://img.theweek.in/content/dam/week/review/movies/images/2018/12/14/aquaman-movie-poster.jpg'
              image={image.uri}
              footerStyle={styles.cardFull}
              imageStyle={{ height: 16 * 25 }}
              // imageStyle={styles.cardImageRadius}
            />
            <Text h4 style={styles.text}>
              Great!! <FontAwesome name="thumbs-o-up" size={24} color="black" />
            </Text>
            <Text style={styles.text}>
              Lets try push{" "}
              <AntDesign name="pluscircleo" size={24} color="black" /> Again
            </Text>
            <Text style={styles.text}>
              Then click the send icon to send your image to our AI.
            </Text>
          </View>
        )}
        <FloatingAction
          actions={actions}
          position="right"
          onPressItem={(name) => {
            // call camera
            if (name == "camera") pickImage(true, setImage);
            else if (name == "photo") pickImage(false, setImage);
            else {
              // send image to backend
              props.navigation.navigate("Result", { image: image });
            }
          }}
          color={"#1253bc"}
          actionsPaddingTopBottom={1}
        />
      </View>
    </SafeAreaView>
  );
}

// specify info here
SkinCheckScreen.navigationOptions = {
  title: "SkinCheck",
  tabBarIcon: <AntDesign name="camera" size={20} color="black" />,
};

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    marginVertical: theme.SIZES.BASE * 1,
  },
  container: {
    // flex: 1,
    padding: 14,
    // justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    width: width,
    height: "100%",
    // margin: 20,
    // marginBottom: 200,
    alignItems: "center",
    // justifyContent: "center",
  },
  button: {
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: height,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    borderWidth: 0,
    backgroundColor: "#FFFFFF",
    width: width - 16 * 2,
    height: 16 * 25,
    marginVertical: 16 * 0.875,
  },
  cardFooter: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 16 / 2,
    paddingHorizontal: 16,
    paddingVertical: 16 / 2,
    backgroundColor: "transparent",
  },
  cardNoRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardAvatar: {
    width: 16 * 2.5,
    height: 16 * 2.5,
    borderRadius: 16 * 1.25,
  },
  cardTitle: {
    justifyContent: "center",
    paddingLeft: 16 / 2,
  },
  cardImageContainer: {
    borderWidth: 0,
    overflow: "hidden",
  },
  cardImageRadius: {
    borderRadius: 16 * 0.1875,
    width: "auto",
    height: 16 * 25,
  },
  cardImage: {
    width: "auto",
    height: 16 * 12.5,
  },
  cardRounded: {
    borderRadius: 16 * 0.5,
  },
  cardFull: {
    position: "absolute",
    // top: 100,
    bottom: 0,
    right: 0,
    left: 0,
  },
  cardGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: "absolute",
    overflow: "hidden",
    borderBottomRightRadius: 16 * 0.5,
    borderBottomLeftRadius: 16 * 0.5,
  },
  guide: {
    // backgroundColor:'red',
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    display: "flex",
  },
  innerCard: {
    width: 16 * 5,
  },
});

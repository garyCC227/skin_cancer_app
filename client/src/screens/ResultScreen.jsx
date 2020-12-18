import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import { FontAwesome, AntDesign } from "@expo/vector-icons";

// galio components
import { Text, Button, Block, NavBar, Icon } from "galio-framework";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import theme from "../styles/theme";
import firebase from "../api/firebase";
import { View } from "native-base";
import { Permissions } from "expo";

const { height } = Dimensions.get("window");
// const orderConfirmedImage = require("../../assets/order_confirmed.png");

export default function ResultScreen({ navigation }) {
  // const { image } = route.params;
  // console.log(navigation.state.params.params.image.base64);
  const image = navigation.state.params.image;
  const [result, setResult] = useState(null);
  // const [record, setRecord] = useState(null);
  const [id, setId] = useState(0);
  const date = moment().utcOffset("+10:30").format("YYYY-MM-DD hh:mm a");
  var index = 0;

  useEffect(() => {
    if (image) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: "temp",
          src: image.base64,
        }),
      };
      fetch("http://192.168.0.5:5000/image", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          let result = Math.round(res.result * 1000) / 1000;
          console.log(result == 1);
          setResult(result);

          /* update firebase */
          var updatedUserData = {};
          const num = Math.floor(Math.random() * Math.floor(100));
          console.log(num);
          updatedUserData[num] = {
            id: num,
            image: image.uri,
            avatar:
              "https://img.theweek.in/content/dam/week/review/movies/images/2018/12/14/aquaman-movie-poster.jpg",
            title: "Aquaman",
            caption: date,
            location: "Wollongong",
            result: result,
          };

          // index = index == 0 ? 1 : 0;
          // console.log(index);

          firebase
            .database()
            .ref("/")
            .update(updatedUserData, function (error) {
              if (error) {
                console.log("Error updating data:", error);
              }
            });
        })
        .catch((error) => {
          console.log("What happened? " + error);
        });
    }
  }, []);

  return (
    <Block safe flex>
      <Block flex center space="around" style={styles.container}>
        <Block center flex={2}>
          <Block center style={{ marginBottom: theme.SIZES.BASE * 2 }}>
            {/* <Image
                source={orderConfirmedImage}
                style={{ marginBottom: theme.SIZES.BASE * 2 }}
              /> */}
            {result <= 0.5 ? (
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="eye-check-outline"
                  size={100}
                  color="green"
                  style={{ margin: theme.SIZES.BASE * 2 }}
                />
                <Text h4 color={theme.COLORS.BLACK}>
                  Well done!
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <FontAwesome
                  name="warning"
                  size={100}
                  color="red"
                  style={{ margin: theme.SIZES.BASE * 2 }}
                />
                <Text h5 color={theme.COLORS.BLACK}>
                  See a doctor now!!
                </Text>
              </View>
            )}
          </Block>
          <Text
            color={theme.COLORS.BLACK}
            style={{ marginBottom: theme.SIZES.BASE }}
          >
            <Text size={theme.SIZES.FONT * 1.675} bold>
              {result}&nbsp;
            </Text>
            <Text>is your probability score</Text>
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Record", {
                params: { date: date },
              })
            }
          >
            <Text color={theme.COLORS.INFO}>Track your Record</Text>
          </TouchableOpacity>
        </Block>
        <Button
          size="large"
          color="info"
          round
          onPress={() => navigation.navigate("SkinCheck")}
        >
          Go to Home
        </Button>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    marginTop: theme.SIZES.BASE * 1.875,
    marginBottom: height * 0.1,
  },
});

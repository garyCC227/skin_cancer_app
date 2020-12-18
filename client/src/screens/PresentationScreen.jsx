import React from "react";
import { Dimensions, StyleSheet, StatusBar, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
// galio components
import { Text, Button, Block, NavBar } from "galio-framework";
import theme from "../styles/theme";

const { width } = Dimensions.get("screen");
const phone = require("../../assets/iphone.png");

const PresentationScreen = (props) => (
  <Block flex>
    <StatusBar hidden={false} barStyle="light-content" />
    <LinearGradient
      colors={["#6368ff", "#80fffb"]}
      end={[0.2, 0.9]}
      style={styles.backgroundGradient}
    />
    <Block flex center style={styles.container}>
      <Block
        flex
        middle
        style={{
          justifyContent: "flex-end",
          marginBottom: theme.SIZES.BASE * 2.5,
        }}
      >
        <Text
          center
          size={theme.SIZES.FONT * 2.375}
          color={theme.COLORS.WHITE}
          style={{ marginBottom: theme.SIZES.BASE }}
        >
          SunSafe
        </Text>
        <Text
          center
          size={theme.SIZES.FONT * 0.875}
          color={theme.COLORS.WHITE}
          style={{
            marginBottom: theme.SIZES.BASE * 1.875,
            paddingHorizontal: theme.SIZES.BASE * 2,
          }}
        >
          You should totally take care of your skin right?
        </Text>
        <Button
          size="large"
          color="transparent"
          round
          onPress={() => props.navigation.navigate("Home")}
        >
          Get Started
        </Button>
      </Block>
      <Block flex style={{ marginBottom: -Constants.statusBarHeight * 2 }}>
        <Image source={phone} style={{ width }} />
      </Block>
    </Block>
  </Block>
);

const styles = StyleSheet.create({
  backgroundGradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 0,
  },
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  navbar: {
    top: Constants.statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: "absolute",
  },
});

PresentationScreen.navigationOptions = {
  title: "Presentation",
  //   tabBarIcon: <FontAwesome name="home" size={20} />,
  headerShown: false,
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
};

export default PresentationScreen;

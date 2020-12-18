import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";

const { statusBarHeight } = Constants;

// galio components
import { Block, Card, Text, Icon, Accordion } from "galio-framework";
import theme from "../theme";

const { width, height } = Dimensions.get("screen");

const data = [
//   {
//     title: "First Chapter",
//     content: "Lorem ipsum dolor sit amet",
//     icon: {
//       name: "keyboard-arrow-up",
//       family: "material",
//       size: 20,
//     },
//   },
  { title: "1. tip", content: "have a large number of moles on their skin" },
  { title: "2. skin type", content: "have a skin type that is easily damaged by UV radiation" },
  { title: "3. patient history", content: "have a history of bad sunburns" },
  { title: "4. work outdoors", content: "have a history of bad sunburns" },
  { title: "5. Skin Unprotected", content: "spend lots of time outdoors, unprotected" },
  { title: "etc...", content: "etc..." },
];

const bgImage =
  "https://www.avera.org/app/files/public/71034/9-Ways-to-Protect-Your-Skin-Infographic.jpg";
const ArticleScreen = (props) => (
  <Block>
    <Image
      source={{ uri: bgImage }}
      resizeMode="cover"
      style={{
        width,
        height: height * 0.55,
      }}
    />

    <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>
      <Block flex style={styles.header}>
        <Block>
          <Text h5>Be aware of skin cancer !!</Text>
          {/* <Text
            muted
            t
            size={theme.SIZES.BASE * 0.875}
            style={{ marginTop: theme.SIZES.BASE, fontWeight: "500" }}
          >
            InterBlocking this super star
          </Text> */}
        </Block>

        <Block center>
          <Card
            borderless
            style={styles.stats}
            title="Snorlax"
            caption="11 minutes ago"
            avatar="https://i.pinimg.com/originals/12/8d/e8/128de8ce51ee0c498a4dfa67610f5843.jpg"
            location={
              <Block row right>
                <Block
                  row
                  middle
                  style={{ marginHorizontal: theme.SIZES.BASE }}
                >
                  <Icon
                    name="eye"
                    family="font-awesome"
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                  />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    3.6k
                  </Text>
                </Block>
                <Block row middle>
                  <Icon
                    name="heart"
                    family="font-awesome"
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                  />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    369
                  </Text>
                </Block>
              </Block>
            }
          />
        </Block>
        <ScrollView>
          <Block style={styles.block}>
            <Accordion dataArray={data} />
          </Block>
        </ScrollView>
        {/* <ScrollView h3>
          <Text style={styles.text}>
            1. Take create
          </Text>
          <Text h3>
            1. Take create
          </Text>
          <Text h3 >
            1. Take create
          </Text>
        </ScrollView> */}
      </Block>
    </Block>
  </Block>
);

const styles = StyleSheet.create({
  block: { height: height, justifyContent: "center" },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: "absolute",
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 3,
    marginVertical: theme.SIZES.BASE * 0.5,
  },
  title: {
    justifyContent: "center",
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: "center",
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

ArticleScreen.navigationOptions = {
  // title: "",
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

export default ArticleScreen;

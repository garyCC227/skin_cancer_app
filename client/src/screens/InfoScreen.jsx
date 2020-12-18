import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";

import { FontAwesome } from "@expo/vector-icons";
// Galio components
import { Button, Block, Card, Text, Icon, NavBar } from "galio-framework";
import theme from "../styles/theme";

const Author = (props) => (
  <Block row shadow middle space="between" style={styles.author}>
    <Block flex={0.25}>
      <Image source={{ uri: props.avatar }} style={styles.avatar} />
    </Block>
    <Block flex={0.7} style={styles.middle}>
      <Text style={{ fontWeight: "500" }}>{props.title}</Text>
      <Text p muted>
        {props.caption}
      </Text>
    </Block>
    <Block flex={0.5} row middle space="around">
      <Block row middle>
        <Icon
          name="eye"
          family="material-community"
          color={theme.COLORS.MUTED}
          size={theme.SIZES.FONT * 0.8}
        />
        <Text
          size={theme.SIZES.FONT * 0.7}
          p
          muted
          style={{ marginLeft: theme.SIZES.FONT * 0.25 }}
        >
          25.6k
        </Text>
      </Block>
      <Block row middle>
        <Icon
          name="heart-outline"
          family="material-community"
          color={theme.COLORS.MUTED}
          size={theme.SIZES.FONT * 0.8}
        />
        <Text
          size={theme.SIZES.FONT * 0.7}
          p
          muted
          style={{ marginLeft: theme.SIZES.FONT * 0.25 }}
        >
          936
        </Text>
      </Block>
    </Block>
  </Block>
);

Author.defaultProps = {
  author: null,
  title: null,
  caption: null,
};

Author.propsTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  caption: PropTypes.string,
};

const InfoScreen = (props) => (
  <Block safe flex>
    <ScrollView style={{ flex: 1 }}>
      <Block flex style={styles.news}>
        <Image
          source={{
            uri:
              "https://careinthesun.org/wp-content/uploads/2017/03/NI4Kids-Be-UV-ware-Ad-160x250-1-1.png",
          }}
          style={styles.articleImage}
        />
        <Block style={styles.article}>
          <Text h4>Melanoma: Introduction</Text>
          <Text
            muted
            style={[styles.text, { marginVertical: theme.SIZES.BASE * 1.3 }]}
          >
            InterBlocking is super star
          </Text>
          <Text style={styles.text}>
            You should totally read this sutuff, like seriously all yo homies
            love sneak dissing but at least u’re true, right?
          </Text>
          <Text muted style={styles.text}>
            There are 3 main types of skin cancer. Basal cell carcinoma and
            squamous cell carcinoma come from the skin's structural cells
            (keratinocytes). These skin cancers are more common. But they are
            less dangerous. Melanoma comes from the skin's pigment cells
            (melanocytes). Melanoma is much less common. But
          </Text>
          <Text muted style={styles.text}>
            Cancer is when cells in the body change and grow out of control. To
            help you understand what happens when you have cancer, let’s look at
            how your body works normally. Your body is made up of tiny building
            blocks called cells. Normal cells grow when your body needs them,
            and die when your body does not need them any longer. Cancer is made
            up of abnormal cells that grow even though your body doesn’t need
            them. In most cancers, the abnormal cells grow to form a lump or
            mass called a tumor. If cancer cells are in the body long enough,
            they can grow into (invade) nearby areas. They can even spread to
            other parts of the body (metastasis).
          </Text>
        </Block>
      </Block>
    </ScrollView>

    <Card
      flex
      borderless
      shadowColor={theme.COLORS.BLACK}
      style={styles.author}
      title="Snorlax"
      caption="1 minutes ago"
      avatar="https://i.pinimg.com/originals/12/8d/e8/128de8ce51ee0c498a4dfa67610f5843.jpg"
      location={
        <Block row right>
          <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
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
              25.6k
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
              936
            </Text>
          </Block>
        </Block>
      }
    />
  </Block>
);

const styles = StyleSheet.create({
  article: {
    marginTop: theme.SIZES.BASE * 1.75,
  },
  articleImage: {
    borderRadius: theme.SIZES.BASE / 2,
    height: theme.SIZES.BASE * 13.75,
  },
  news: {
    marginTop: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE / 2,
    justifyContent: "flex-start",
    paddingHorizontal: theme.SIZES.BASE,
  },
  button: {
    width: theme.SIZES.BASE * 2,
    borderColor: "transparent",
  },
  author: {
    position: "absolute",
    right: theme.SIZES.BASE,
    left: theme.SIZES.BASE,
    bottom: Constants.statusBarHeight,
    backgroundColor: theme.COLORS.WHITE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: theme.SIZES.BASE / 2,
  },
  text: {
    fontWeight: "400",
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.BASE * 1.25,
    letterSpacing: 0.3,
    marginBottom: theme.SIZES.BASE,
  },
});

// InfoScreen.navigationOptions = {
//     title: "Info",
//     tabBarIcon: <FontAwesome name="info" size={24} color="black" />
//   };

export default InfoScreen;

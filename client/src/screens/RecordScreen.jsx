import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, withNavigationFocus } from "react-navigation";

import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Galio components
import { Card, Block, NavBar, Icon } from "galio-framework";
import theme from "../styles/theme";

import firebase from "../api/firebase";

const { width } = Dimensions.get("screen");

const RecordScreen = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=840&q=300",
      avatar: "https://i.pinimg.com/originals/12/8d/e8/128de8ce51ee0c498a4dfa67610f5843.jpg",
      title: "Sample Record",
      caption: "2020-11-13 04:11 pm",
      location: "Sydney, NSW",
      result: 0.33,
    },
  ]);
  
  useEffect(() => {
    firebase
      .database()
      .ref("/")
      .on("value", (snap) => {
        let newCards = [...cards];
        let items = snap.val();
        for ( const [key, val] of Object.entries(items)){
          // console.log("===============================", val);
          newCards.push(val);
        }
        // console.log("Checke me ==========================",newCards);
        setCards(newCards);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.cards}>
        <Block flex space="between">
          {cards.length > 0 &&
            cards.map((card, id) => (
              <Card
                key={`card-${card.image}`}
                flex
                borderless
                shadowColor={theme.COLORS.BLACK}
                titleColor={card.full ? theme.COLORS.WHITE : null}
                style={styles.card}
                title={card.title}
                caption={card.caption + " " +card.result}
                location={card.location}
                avatar={`${card.avatar}?${id}`}
                image={card.image}
                imageStyle={[card.padded ? styles.rounded : null]}
                imageBlockStyle={[
                  card.padded ? { padding: theme.SIZES.BASE / 2 } : null,
                  card.full ? null : styles.noRadius,
                ]}
                footerStyle={card.full ? styles.full : null}
              >
                {card.full ? (
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0, 0.8)"]}
                    style={styles.gradient}
                  />
                ) : null}
              </Card>
            ))}
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withNavigationFocus(RecordScreen);

const styles = StyleSheet.create({
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

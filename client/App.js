/*
navigation gudie
https://www.reactnativeschool.com/complex-navigation-example-with-react-navigation
*/

/* Components and helpers */
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
// import MenuIcon from "./src/components/MenuIcon"
/* config file */
import { setNavigator } from "./src/navigationRef";
import theme from "./src/styles/theme";

/* screens */
import HomeScreen from "./src/screens/HomeScreen";
import SkinCheckScreen from "./src/screens/SkinCheckScreen";
import RecordScreen from "./src/screens/RecordScreen";
import WeatherScreen from "./src/screens/WeatherScreen";
import MapScreen from "./src/screens/MapScreen";
import InfoScreen from "./src/screens/InfoScreen";
import ArticleScreen from "./src/screens/ArticleScreen";
import PresentationScreen from "./src/screens/PresentationScreen";
import ResultScreen from "./src/screens/ResultScreen";

/* Others */
import useCachedResources from "./src/hooks/useCachedResources";
/* UI */
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavBar } from "galio-framework";

// customized stype for a screen
const Home = createStackNavigator({
  Home: HomeScreen,
});
Home.navigationOptions = {
  title: "Home",
  tabBarIcon: <FontAwesome name="home" size={20} />,
};

const SkinCheck = createStackNavigator({
  SkinCheck: SkinCheckScreen,
  Result: ResultScreen,
});
SkinCheck.navigationOptions = {
  title: "SkinCheck",
  tabBarIcon: <AntDesign name="camera" size={20} color="black" />,
};

const Record = createStackNavigator({
  Record: RecordScreen,
});
Record.navigationOptions = {
  title: "Record",
  tabBarIcon: <FontAwesome name="th-list" size={20} color="black" />,
};

const switchNavigator = createSwitchNavigator({
  // first appeared
  Presentation: PresentationScreen,
  mainFlow: createBottomTabNavigator({
    Home,
    SkinCheck,
    Record,
  }),
});
switchNavigator.navigationOptions = {
  headerShown: false,
};

const RootNavigator = createStackNavigator({
  switchNavigator,
  Weather: WeatherScreen,
  Info: InfoScreen,
  Article: ArticleScreen,
});
const AppContainer = createAppContainer(RootNavigator);

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View>
          <StatusBar style="auto" />
        </View>
        <AppContainer
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </SafeAreaProvider>
    );
  }
}

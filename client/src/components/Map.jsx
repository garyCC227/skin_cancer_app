import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, UrlTile } from "react-native-maps";
import { SearchBar, Card} from "react-native-elements";

const points = [
  { latitude: -33.94600829, longitude: 151.68525368, weight: 90 },
  { latitude: -33.99918823, longitude: 151.80834259, weight: 10 },
  { latitude: -34.36386584, longitude: 150.59273083, weight: 20 },
  { latitude: -33.96359459, longitude: 150.33725048, weight: 5 },
  { latitude: -33.36655801, longitude: 151.99735605, weight: 2 },
];

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = -33.86;
const LONGITUDE = 151.2;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

const MapScreen = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        customMapStyle={customStyle}
        // showsUserLocation={true}
        // showsBuildings={true}
      >
        {/* <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zIndex={-1}
        /> */}
        <MapView.Heatmap
          points={points}
          opacity={1}
          onZoomRadiusChange={{
            zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            radius: [
              100,
              100,
              150,
              200,
              300,
              600,
              80,
              100,
              120,
              150,
              180,
              200,
              250,
              250,
            ],
          }}
          gradient={{
            colors: ["#d1fc9d", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
            // colors: ["rgb(0,0,0", "rgb(24,53,103", "rgb(46, 100, 158)", "rgb(23, 173, 203)", 'rgb(0, 250, 250)'],
            startPoints: [0.01, 0.25, 0.5, 0.75, 1],
            colorMapSize: 500,
          }}
          maxIntensity={100}
          gradientSmoothing={1000}
          heatmapMode={"POINTS_WEIGHT"}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        {/* <View style={styles.bubble}> */}
          <SearchBar
            placeholder="Type Here..."
            // onChangeText={this.updateSearch}
            // value={search}
          />
        {/* </View> */}
      </View>
    </View>
  );
};

// dark mode themes https://github.com/react-native-maps/react-native-maps/blob/master/example/examples/MapStyle.js
const customStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];
export default MapScreen;

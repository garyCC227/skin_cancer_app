import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet, ScrollView, Platform, Image
} from 'react-native';
// import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import moment from 'moment';
// galio components
import {
  Button, Block, Icon, Text, NavBar,
} from 'galio-framework';
import theme from '../styles/theme';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';

// mock data
const mockWeahter = require('./weather.json');
const statsTitles = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const weatherIcon = { "01d": require("../images/01d.png"),
                      "01n": require("../images/01n.png"),
                      "02d": require("../images/02d.png"),
                      "02n": require("../images/02n.png"),
                      "03d": require("../images/03d.png"),
                      "03n": require("../images/03n.png"),
                      "04d": require("../images/04d.png"),
                      "04n": require("../images/04n.png"),
                      "09d": require("../images/09d.png"),
                      "09n": require("../images/09n.png"),
                      "10d": require("../images/10d.png"),
                      "10n": require("../images/10n.png"),
                      "11d": require("../images/11d.png"),
                      "11n": require("../images/11n.png"),
                      "13d": require("../images/13d.png"),
                      "13n": require("../images/13n.png"),
                      "50d": require("../images/50d.png"),
                      "50n": require("../images/50n.png"),
                    }



const WeatherScreen = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const [call, setCall] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState(mockWeahter);
  const arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  const API_KEY = "2c12e682e32044aa77c25761cd0eb67d";
  // const API_KEY = "285af129414608882e804d2b70c38dae"; // plan b api key
  // const API_KEY = "a795e73e35a61d346e80e5d5cbc1854e"; // plan c api key
  const location = navigation.state.params.loca//navigation.getParam('loca')
  // const dumpWeather = require('./weather.json');
  useEffect(() => {
    // setCount(count+1);
    if (call == true) {
      
      fetch(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude=hourly,minutely&APPID=${API_KEY}&units=metric`
      )
      .then(res => res.json())
      .then(json => {
        setWeatherInfo(json);
        setCall(false); 
        
        // console.log(json);
      });
      setCall(false);
      setCount("do");
    } else {
      // setCall(false)
      setCount("done");
    }
  },[call,count])
  // let w = JSON.stringify(weatherinfo);
  const renderCardBody = (props) => {
    return (<Block><Text>ahhahaha</Text></Block>);
  }
  const renderHeader = () => (
    <NavBar
      title="Dashboard"
      onLeftPress={() => this.props.navigation.openDrawer()}
      leftIconColor={theme.COLORS.MUTED}
      right={(
        <Button
          color="transparent"
          style={styles.settings}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Icon size={BASE_SIZE} name="heart" family="font-awesome" color={theme.COLORS.MUTED} />
        </Button>
      )}
      style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
    />
  )

  
  const renderStats = () => {
    const GradientStats = () => (
        <Defs key='gradient'>
          <LinearGradient id='gradient' x1='0' y1='0' x2='1' y2='0'>
            <Stop offset='0%' stopColor={theme.COLORS.THEME} />
            <Stop offset='100%' stopColor={theme.COLORS.INFO} />
          </LinearGradient>
        </Defs>
    );

    const statsActive = []; //Array.from({ length: 20 }, () => parseFloat((Math.random() * 0.8 + 1).toFixed(3)));
    const statsInactive = []; //Array.from({ length: 12 }, () => parseFloat((Math.random() * 0.7 + 1).toFixed(3)));
    weatherInfo.daily.map((day, index) => {
      statsActive.push(day.uvi);
      statsInactive.push(weatherInfo.current.uvi);
    });
    return (
      <Block style={{ marginBottom: BASE_SIZE * 3 }}>
        <AreaChart
          yMin={9}
          yMax={Math.max(...statsActive) + 1}
          data={statsInactive}
          curve={shape.curveNatural}
          style={[StyleSheet.absoluteFill]}
          contentInset={{
            bottom: -BASE_SIZE * 0.15,
            right: -BASE_SIZE * 0.15,
            left: -BASE_SIZE * 0.15,
          }}
          svg={{
            strokeWidth: 1,
            stroke: "rgba(0,0,0,0.2)",
            strokeDasharray: 4,
          }}
        >
          <GradientStats />
        </AreaChart>
        <AreaChart
          yMin={9}
          yMax={Math.max(...statsActive) + 1}
          data={statsActive}
          curve={shape.curveNatural}
          style={{ height: BASE_SIZE * 10 }}
          contentInset={{
            bottom: -BASE_SIZE * 0.21,
            right: -BASE_SIZE * 0.21,
            left: -BASE_SIZE * 0.21,
          }}
          svg={{ strokeWidth: BASE_SIZE * 0.1875, stroke: "url(#gradient)" }}
        >
          <GradientStats />
        </AreaChart>
        <Block row space='evenly' style={{ marginTop: BASE_SIZE }}>
          {statsTitles.map((title) => (
            <Text key={title} size={theme.SIZES.FONT * 0.85} muted>
              {title}
            </Text>
          ))}
        </Block>
      </Block>
    );
  };

  const renderCard = (props, index) => {
    const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

    return (
      <Block row center card shadow space="between" style={styles.card} key={props.dt}>


        <Block flex>
          <Text size={BASE_SIZE * 1.125}>{moment(new Date(props.dt * 1000)).format('dddd')}</Text>
          <Text size={BASE_SIZE * 1.125}>{moment(new Date(props.dt * 1000)).format('MMM Do YY')}</Text>
        </Block>
        <Block flex>
          <Text size={BASE_SIZE * 1.125}>Min:{props.temp.min+"\u2103"}</Text>
          <Text size={BASE_SIZE * 1.125}>Max:{props.temp.max+"\u2103"}</Text>
        </Block>
        <Block>
          {/* <Text>{JSON.stringify(props.weather[0].icon)}</Text> */}
        <Image source={weatherIcon[props.weather[0].icon]} />
        </Block>
        
      </Block>
    );
  }
  const renderTodayInfo = () => {
    return (
      <Block row center card shadow space="between" style={styles.card}>
        {/* <Text>{JSON.stringify(weatherInfo)}</Text> */}
        {/* <Text>{JSON.stringify(location)}</Text> */}
        {/* <Text>{count}</Text> */}
        <Block flex>
          <Text size={BASE_SIZE * 1.125}>Current: {weatherInfo.current.weather[0].description}, with {Math.round(weatherInfo.current.wind_speed * 3.6)} km/h winds out of the {arr[Math.round((weatherInfo.current.wind_deg/22.5)+0.5 % 16)]}.</Text>
        </Block>
      </Block>
    )
  }
  const renderExtraInfo = () => {
    return (
      <Block row center card shadow space="between" style={styles.card}>
       <Block flex>
          <Text size={BASE_SIZE * 1.125} muted>SUNRISE</Text>
          <Text size={BASE_SIZE * 1.125}>{moment(new Date(weatherInfo.current.sunrise * 1000)).format('LT')}</Text>
          <Text size={BASE_SIZE * 1.125} muted>SUNSET</Text>
          <Text size={BASE_SIZE * 1.125}>{moment(new Date(weatherInfo.current.sunset * 1000)).format('LT')}</Text>
          <Text size={BASE_SIZE * 1.125} muted>TEMPERATURE</Text>
          <Text size={BASE_SIZE * 1.125}>{weatherInfo.current.temp+"\u2103"}</Text>
          <Text size={BASE_SIZE * 1.125} muted>FEELS LIKE</Text>
          <Text size={BASE_SIZE * 1.125}>{weatherInfo.current.feels_like+"\u2103"}</Text>
          <Text size={BASE_SIZE * 1.125} muted>MIDDAY UV INDEX</Text>
          <Text size={BASE_SIZE * 1.125}>{weatherInfo.current.uvi}</Text>
        </Block>
        <Block flex>
          <Text size={BASE_SIZE * 1.125} muted>PRESSURE</Text>
          <Text size={BASE_SIZE * 1.125}>{weatherInfo.current.pressure} hpa</Text>
          <Text size={BASE_SIZE * 1.125} muted>HUMIDITY</Text>
          <Text size={BASE_SIZE * 1.125}>{weatherInfo.current.humidity}%</Text>
          <Text size={BASE_SIZE * 1.125} muted>CLOUDS</Text>
          <Text size={BASE_SIZE * 1.125}>{weatherInfo.current.clouds}%</Text>
          <Text size={BASE_SIZE * 1.125} muted>WIND SPEED</Text>
          <Text size={BASE_SIZE * 1.125}>{weatherInfo.current.wind_speed}m/s</Text>
          <Text size={BASE_SIZE * 1.125} muted>WIND DEGREE</Text>
          <Text size={BASE_SIZE * 1.125}>{arr[Math.round((weatherInfo.current.wind_deg/22.5)+0.5 % 16)]}</Text>
        </Block>
      </Block>
    )
  }

  const renderCards = () => weatherInfo.daily.map((day, index) => renderCard(day, index)) 
  // if (call) {
    return (
      <Block safe flex>
        {/* header */}
        {/* {renderHeader()} */}
        {/* {getWeather()} */}
        {/* stats */}
        {renderStats()}

        {/* cards */}
        <ScrollView style={{ flex: 1 }}>
          {renderCards()}                                                                                                                                                                                                                                   
          {renderTodayInfo()}
          {renderExtraInfo()}
        </ScrollView>
      </Block>
    );
  // }
}

const styles = StyleSheet.create({
  card: {
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    backgroundColor: COLOR_WHITE,
    shadowOpacity: 0.40,
  },
  menu: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  settings: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  left: {
    marginRight: BASE_SIZE,
  },
  right: {
    width: BASE_SIZE * 2,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  gradient: {
    width: BASE_SIZE * 3.25,
    height: BASE_SIZE * 3.25,
    borderRadius: BASE_SIZE * 3.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WeatherScreen;

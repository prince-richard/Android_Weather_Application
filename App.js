global.self = global;
import React from "react";

// Firebase
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCta0jybxqKMdxWy10lr42NkbqGTaWemQo",
  authDomain: "noaaweatherapp.firebaseapp.com",
  databaseURL: "https://noaaweatherapp.firebaseio.com",
  projectId: "noaaweatherapp",
  storageBucket: "noaaweatherapp.appspot.com",
  messagingSenderId: "134278356029"
};

firebase.initializeApp(firebaseConfig);

// Yellow-Box Error Handling
// import { YellowBox } from "react-native";
// import _ from "lodash";

// YellowBox.ignoreWarnings(["Setting a timer"]);
// const _console = _.clone(console);
// console.warn = message => {
//   if (message.indexOf("Setting a timer") <= -1) {
//     _console.warn(message);
//   }
// };
console.disableYellowBox = true;

// Store
import { createStore } from "redux";

const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
  isNewUser: false,
  tempLow: null,
  tempHigh: null,
  isSignUp: false,
  mapType: "standard",
  layerOn: false,
  layerType: "temp_new",
  weatherDetails: {
    main: {
      temp: null
    },
    name: null,
    sys: {
      country: null
    },
    weather: [
      {
        main: null,
        icon: null
      }
    ]
  },
  rangeColor: "green",
  view: "map",
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, ...action.state };
  }
};

const store = createStore(reducer, {});

// Components
import { Provider, connect } from "react-redux";
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Slider
} from "react-native";

const mapStateToProps = state => {
  return { ...state };
};

import styles from "./styles";

import LoginScreen from "./screens/LoginScreen";
import MainAppScreen from "./screens/MainAppScreen";
import TempRangeScreen from "./screens/TempRangeScreen";

const ConnectedMainAppScreen = connect(mapStateToProps)(MainAppScreen);
const ConnectedLoginScreen = connect(mapStateToProps)(LoginScreen);
const ConnectedTempRangeScreen = connect(mapStateToProps)(TempRangeScreen);

class AppScreen extends React.Component {
  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'UPDATE_STATE',
  //     state: { isLoggedIn: false }
  //   });
  // }

  render() {
    if (!this.props.isLoggedIn) {
      return <ConnectedLoginScreen />;
    } else {
      if (!this.props.isSignUp) {
        return <ConnectedMainAppScreen />;
      } else {
        return <ConnectedTempRangeScreen />;
      }
    }
  }
}

// Root
const ConnectedAppScreen = connect(mapStateToProps)(AppScreen);

export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedAppScreen />
      </Provider>
    );
  }
}

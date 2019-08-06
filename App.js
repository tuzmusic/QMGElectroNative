import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AppRegistry
} from "react-native";
import AppContainer from "./src/navigators/AppContainer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import stationsReducer from "./src/redux/reducers/stationsReducer";
import authReducer from "./src/redux/reducers/authReducer";
import locationReducer from "./src/redux/reducers/locationReducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import locationSaga from "./src/redux/actions/locationActions";
import authSaga from "./src/redux/actions/authActions";
import stationSaga, { sendEmailApi } from "./src/redux/actions/stationActions";
import GlobalFont from "react-native-global-font";
import AppStyles from "./src/constants/Styles";
import { startMockAdapter } from "./tests/__mocks__/axiosMocks";
import sendEmail from "./src/redux/actions/stationActions";

const combinedReducer = combineReducers({
  main: stationsReducer,
  auth: authReducer,
  location: locationReducer
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combinedReducer,
  {},
  applyMiddleware(thunk, sagaMiddleware)
);

function* rootSaga() {
  sagaMiddleware.run(locationSaga);
  sagaMiddleware.run(stationSaga);
  sagaMiddleware.run(authSaga);
}

sagaMiddleware.run(rootSaga);

if (__DEV__) startMockAdapter({ auth: true, stations: true });
// if (__DEV__) startMockAdapter({ auth: false, stations: true });

console.disableYellowBox = true;

export default class App extends React.Component {
  componentDidMount() {
    // if (__DEV__) testMailgun();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

// AppRegistry.registerComponent("main", () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

function testMailgun() {
  console.log("hello from testMailgun");

  sendEmailApi({
    to: "tuzmusic@gmail.com",
    from: "messages@joinelectro.com",
    subject: "test email",
    text: "a test email from the app",
    "h:Reply-To": "tuzmusic@gmail.com"
  }).catch(err => {
    console.error(err);
    debugger;
  });
}

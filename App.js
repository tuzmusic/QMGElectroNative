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
import mainReducer from "./src/redux/reducers/mainReducer";
import authReducer from "./src/redux/reducers/authReducer";
import locationReducer from "./src/redux/reducers/locationReducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import locationSaga from "./src/redux/actions/locationActions";
import authSaga from "./src/redux/actions/authActions";
import GlobalFont from "react-native-global-font";
import AppStyles from "./src/constants/Styles";
import { startMockAdapter } from "./tests/__mocks__/axiosMocks";

const combinedReducer = combineReducers({
  main: mainReducer,
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
  sagaMiddleware.run(authSaga);
}

sagaMiddleware.run(rootSaga);

// if (__DEV__) startMockAdapter({ auth: true, stations: true });

console.disableYellowBox = true;

export default class App extends React.Component {
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

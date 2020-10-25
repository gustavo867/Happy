import { StatusBar } from "expo-status-bar";
import React from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import themeReducer from "./src/Redux/themeReducer";

import { useFonts } from "expo-font";
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import { AppLoading } from "expo";
import Routes from "./src/routes";

const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);

export interface Themes {
  Primary: string;
  Secondary: string;
  TextColor: string;
  FooterText: string;
  TitleColor: string;
  StatusBarStyle: "auto" | "inverted" | "light" | "dark" | undefined;
  MapBorder: string;
  Background: string;
  mode: "light" | "dark" | undefined;
}

export interface Theme {
  theme: Themes;
}

export interface State {
  themeReducer: Theme;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Routes />
    </Provider>
  );
}

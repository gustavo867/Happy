import React, { useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { State } from "../../../../App";
import { ThemeProvider } from "styled-components";

import { useNavigation, useRoute } from "@react-navigation/native";
import { MapEvent, Marker } from "react-native-maps";

import darkStyle from "../../OrphanageMap/darkMapStyle.json";

import mapMarkerImg from "../../../images/map-marker.png";

import * as S from "./styles";
import { LocationProps } from "../../OrphanageMap";
import ButtonNext from "../../../components/ButtonNext";

interface RouteProps {
  location: LocationProps;
}

export default function SelectMapPosition() {
  const route = useRoute();
  const navigation = useNavigation();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { location } = route.params as RouteProps;

  const theme = useSelector((state: State) => state.themeReducer.theme);

  function onChangePosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    if ((position.latitude as any) !== 0) {
      navigation.navigate("OrphanageData", { position });
    } else {
      Alert.alert("Por favor selecione a posição");
      return;
    }
  }

  const lightStyle: any = [];

  return (
    <ThemeProvider theme={theme}>
      <S.Container>
        <S.Map
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          onPress={onChangePosition}
          customMapStyle={theme.mode === "dark" ? darkStyle : lightStyle}
        >
          {position.latitude !== 0 && (
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}
            />
          )}
        </S.Map>

        <ButtonNext title="Próximo" onPress={handleNextStep} absolute />
      </S.Container>
    </ThemeProvider>
  );
}

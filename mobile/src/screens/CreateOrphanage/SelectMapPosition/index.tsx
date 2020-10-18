import React, { useState } from "react";
import { View, Alert } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { MapEvent, Marker } from "react-native-maps";

import mapMarkerImg from "../../../images/map-marker.png";

import styles from "./styles";
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

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={onChangePosition}
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
      </MapView>

      <ButtonNext title="Próximo" onPress={handleNextStep} absolute />
    </View>
  );
}

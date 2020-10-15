import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import * as Location from "expo-location";
import darkStyle from "./darkMapStyle.json";
import api from "../../services/api";

import styles from "./styles";
import mapMarker from "../../images/map-marker.png";

interface Images {
  url: string;
  id: number;
}

export interface Orphanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Images[];
}

const Home: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [dark, setDark] = useState(false);
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

  const lightStyle: any = [];

  const SwitchTheme = useCallback(async () => {
    setDark((state) => !state);
    if (dark) {
      await AsyncStorage.setItem("theme", "dark");
    } else {
      await AsyncStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    async function loadThemes() {
      await AsyncStorage.getItem('theme').then((response) => {
        if (response) {
          if (response === 'dark') {
            setDark(true)
          } else {
            setDark(false)
          }
        }
      });
    }
    loadThemes();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switchThemeButton}
        onPress={SwitchTheme}
        delayPressIn={1}
      >
        <Feather
          name={dark ? "moon" : "sun"}
          size={32}
          color={dark ? "#121212" : "#ffd666"}
        />
      </TouchableOpacity>

      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location ? location.coords.latitude : -25.0833855,
          longitude: location ? location.coords.longitude : -50.217374,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.map}
        customMapStyle={dark ? darkStyle : lightStyle}
      >
        {orphanages.map((item: Orphanages) => {
          return (
            <Marker
              key={item.id}
              icon={mapMarker}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
            >
              <Callout tooltip={true}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{item.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <TouchableOpacity style={styles.createOrphanageButton} delayPressIn={1}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

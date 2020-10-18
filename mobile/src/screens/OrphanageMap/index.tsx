import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import darkStyle from "./darkMapStyle.json";
import api from "../../services/api";

import styles from "./styles";
import mapMarker from "../../images/map-marker.png";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

interface Images {
  url: string;
  id: number;
}

export interface Orphanages {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Images[];
}

export interface LocationProps {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageMap: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [dark, setDark] = useState(false);
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

  const { navigate } = useNavigation();

  const lightStyle: any = [];

  const SwitchTheme = useCallback(async () => {
    setDark((state) => !state);
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

  useFocusEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  });

  function handleNavigateToCreateOrphanage(location: any) {
    if (location) {
      navigate("SelectMapPosition", { location });
    }
    return;
  }

  function handleNavigateToOrphanage(id: number) {
    navigate("OrphanageDetails", { id });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switchThemeButton}
        onPress={SwitchTheme}
        delayPressIn={1}
      >
        <Feather
          name={dark === true ? "moon" : "sun"}
          size={32}
          color={dark === true ? "#121212" : "#ffd666"}
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
        customMapStyle={dark === true ? darkStyle : lightStyle}
      >
        {!orphanages ? (
          <View />
        ) : (
          orphanages.map((item: Orphanages) => {
            return (
              <Marker
                key={item.id}
                icon={mapMarker}
                coordinate={{
                  latitude: Number(item.latitude),
                  longitude: Number(item.longitude),
                }}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8,
                }}
              >
                <Callout
                  onPress={() => handleNavigateToOrphanage(item.id)}
                  tooltip={true}
                >
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{item.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })
        )}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          onPress={() => handleNavigateToCreateOrphanage(location)}
          style={styles.createOrphanageButton}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
};

export default OrphanageMap;

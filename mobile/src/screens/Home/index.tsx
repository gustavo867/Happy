import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";

import mapMarker from "../../images/map-marker.png";

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -25.0833855,
          longitude: -50.217374,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.map}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -25.0833855,
            longitude: -50.217374,
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
        >
          <Callout tooltip={true}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>
        <TouchableOpacity style={styles.createOrphanageButton} delayPressIn={1}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

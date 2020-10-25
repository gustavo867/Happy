import React, { useCallback, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../../Redux/themeActions";
import { lightTheme, darkTheme } from "../../Themes/theme";

import { Feather } from "@expo/vector-icons";
import { State } from "../../../App";
import * as Location from "expo-location";
import api from "../../services/api";

import * as S from "./styles";
import darkStyle from "./darkMapStyle.json";
import mapMarker from "../../images/map-marker.png";
import AsyncStorage from "@react-native-community/async-storage";
import { StatusBar } from "expo-status-bar";
import Loading from "../OrphanageDetails/Loading";

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
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

  const theme = useSelector((state: State) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const { navigate } = useNavigation();

  const lightStyle: any = [];

  const SwitchThemeToDark = useCallback(async () => {
    dispatch(switchTheme(darkTheme));
    await AsyncStorage.setItem("theme", "dark");
  }, []);

  const SwitchThemeToLight = useCallback(async () => {
    dispatch(switchTheme(lightTheme));
    await AsyncStorage.setItem("theme", "light");
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
    async function loadThemes() {
      await AsyncStorage.getItem("theme").then((response) => {
        if (response) {
          if (response === "dark") {
            dispatch(switchTheme(darkTheme));
          } else {
            dispatch(switchTheme(lightTheme));
          }
        }
      });
    }
    loadThemes();
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
    <ThemeProvider theme={theme}>
      <StatusBar style={theme.StatusBarStyle} />
      <S.Container>
        {theme.mode === "dark" ? (
          <S.SwitchThemeButton delayPressIn={1} onPress={SwitchThemeToLight}>
            <Feather name="sun" size={32} color="#ffd666" />
          </S.SwitchThemeButton>
        ) : (
          <S.SwitchThemeButton delayPressIn={1} onPress={SwitchThemeToDark}>
            <Feather name="moon" size={32} color="#121212" />
          </S.SwitchThemeButton>
        )}

        <S.Map
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location ? location.coords.latitude : -25.0833855,
            longitude: location ? location.coords.longitude : -50.217374,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          customMapStyle={theme.mode === "dark" ? darkStyle : lightStyle}
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
                    <S.CalloutContainer>
                      <S.CalloutText>{item.name}</S.CalloutText>
                    </S.CalloutContainer>
                  </Callout>
                </Marker>
              );
            })
          )}
        </S.Map>

        <S.Footer>
          <S.FooterText>{orphanages.length} orfanatos encontrados</S.FooterText>
          <S.CreateOrphanageButton
            onPress={() => handleNavigateToCreateOrphanage(location)}
          >
            <Feather name="plus" size={20} color="#FFF" />
          </S.CreateOrphanageButton>
        </S.Footer>
      </S.Container>
    </ThemeProvider>
  );
};

export default OrphanageMap;

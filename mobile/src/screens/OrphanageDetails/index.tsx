import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Marker } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import darkStyle from "../OrphanageMap/darkMapStyle.json";

import mapMarkerImg from "../../images/map-marker.png";

import * as S from "./styles";
import { Orphanages } from "../OrphanageMap";
import api from "../../services/api";
import { State } from "../../../App";
import Loading from "./Loading";

interface RouteProps {
  id: number;
}

export default function OrphanageDetails() {
  const route = useRoute();
  const [orphanage, setOrphanage] = useState<Orphanages>();

  const theme = useSelector((state: State) => state.themeReducer.theme);

  const lightStyle: any = [];

  const { id } = route.params as RouteProps;

  useEffect(() => {
    api.get(`orphanages/${id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [id]);

  if (!orphanage) {
    return <Loading theme={theme} />;
  }

  function handleToGoogleMaps() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <S.Container>
        <S.ImagesContainer>
          <S.ImageList pagingEnabled showsHorizontalScrollIndicator={false}>
            {orphanage.images.map((image) => {
              return (
                <S.StyledImage key={image.id} source={{ uri: image.url }} />
              );
            })}
          </S.ImageList>
        </S.ImagesContainer>

        <S.DetailsContainer>
          <S.Title>{orphanage.name}</S.Title>
          <S.Description>{orphanage.about}</S.Description>

          <S.MapContainer>
            <S.Map
              initialRegion={{
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude),
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              customMapStyle={theme.mode === "dark" ? darkStyle : lightStyle}
            >
              <Marker
                icon={mapMarkerImg}
                coordinate={{
                  latitude: Number(orphanage.latitude),
                  longitude: Number(orphanage.longitude),
                }}
              />
            </S.Map>

            <S.RoutesContainer onPress={() => handleToGoogleMaps()}>
              <S.RoutesText>Ver rotas no Google Maps</S.RoutesText>
            </S.RoutesContainer>
          </S.MapContainer>

          <S.Separator />

          <S.Title>Instruções para visita</S.Title>
          <S.Description>{orphanage.instructions}</S.Description>

          <S.ScheduleContainer>
            <S.ScheduleItemBlue>
              <Feather name="clock" size={40} color="#2AB5D1" />
              <S.ScheduleTextBlue>{orphanage.opening_hours}</S.ScheduleTextBlue>
            </S.ScheduleItemBlue>

            {orphanage.open_on_weekends ? (
              <S.ScheduleItemGreen>
                <Feather name="info" size={40} color="#39CC83" />
                <S.ScheduleTextGreen>
                  Atendemos fim de semana
                </S.ScheduleTextGreen>
              </S.ScheduleItemGreen>
            ) : (
              <S.ScheduleItemRed>
                <Feather name="info" size={40} color="#FF669D" />
                <S.ScheduleTextRed>
                  Não atendemos fim de semana
                </S.ScheduleTextRed>
              </S.ScheduleItemRed>
            )}
          </S.ScheduleContainer>

          <S.ContactButton onPress={() => {}}>
            <FontAwesome name="whatsapp" size={24} color="#FFF" />
            <S.ContactButtonText>Entrar em contato</S.ContactButtonText>
          </S.ContactButton>
        </S.DetailsContainer>
      </S.Container>
    </ThemeProvider>
  );
}

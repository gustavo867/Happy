import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import styled from "styled-components/native";
import { Theme } from "../../../App";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props: Theme) => props.theme.Background};
`;

export const ImagesContainer = styled.View`
  height: 240px;
`;

export const ImageList = styled.ScrollView.attrs({
  horizontal: true,
})``;

export const StyledImage = styled.Image.attrs({
  resizeMode: "cover",
})`
  width: ${Dimensions.get("window").width}px;
  height: 240px;
`;

export const DetailsContainer = styled.View`
  padding: 24px;
`;

export const Title = styled.Text`
  color: ${(props: Theme) => props.theme.TitleColor};
  font-size: 30px;
  font-family: Nunito_700Bold;
`;

export const Description = styled.Text`
  font-family: Nunito_600SemiBold;
  color: ${(props: Theme) => props.theme.TextColor};
  line-height: 24px;
  margin-top: 16px;
`;

export const MapContainer = styled.View`
  border-radius: 20px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${(props: Theme) => props.theme.MapBorder};
  margin-top: 40px;
  background-color: ${(props: Theme) => props.theme.Secondary};
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 150px;
`;

export const RoutesContainer = styled(RectButton)`
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const RoutesText = styled.Text`
  font-family: Nunito_700Bold;
  color: #0089a5;
`;

export const Separator = styled.View`
  height: 0.8px;
  width: 100%;
  background-color: #d3e2e6;
  margin-vertical: 40px;
`;

export const ScheduleContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ScheduleItemBlue = styled.View`
  width: 48%;
  padding: 20px;
  background-color: #e6f7fb;
  border-width: 1px;
  border-color: #b3dae2;
  border-radius: 20px;
`;

export const ScheduleItemGreen = styled.View`
  width: 48%;
  padding: 20px;
  background-color: #edfff6;
  border-width: 1px;
  border-color: #a1e9c5;
  border-radius: 20px;
`;

export const ScheduleItemRed = styled.View`
  width: 48%;
  padding: 20px;
  background-color: #fdf1f5;
  border-width: 1px;
  border-color: #fed6e4;
  border-radius: 20px;
`;

export const ScheduleTextBlue = styled.Text`
  font-family: Nunito_600SemiBold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
  color: #5c8599;
`;

export const ScheduleTextGreen = styled.Text`
  font-family: Nunito_600SemiBold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
  color: #37c77f;
`;

export const ScheduleTextRed = styled.Text`
  font-family: Nunito_600SemiBold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
  color: #ff669d;
`;

export const ContactButton = styled(RectButton)`
  background-color: #3cdc8c;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-top: 40px;
`;

export const ContactButtonText = styled.Text`
  font-family: "Nunito_800ExtraBold";
  color: #fff;
  font-size: 16px;
  margin-left: 16px;
`;

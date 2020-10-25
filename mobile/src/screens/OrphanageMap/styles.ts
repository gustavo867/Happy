import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { Theme } from "../../../App";

const { width, height } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: Theme) => props.theme.Background};
`;

export const SwitchThemeButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 2;
  right: 10px;
  top: 34px;
  background-color: #15c3d6;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px;

  background-color: ${(props: Theme) => props.theme.Secondary};
  border-radius: 20px;
  height: 56px;
  padding-left: 24px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  elevation: 3;
`;

export const FooterText = styled.Text`
  color: #8fa7b3;
  font-family: Nunito_700Bold;
`;

export const CalloutContainer = styled.View`
  width: 160px;
  height: 46px;
  padding-horizontal: 16px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 16px;

  align-items: center;
  justify-content: center;
`;

export const CalloutText = styled.Text`
  color: #0089a5;
  font-size: 14px;
  font-family: Nunito_700Bold;
`;

export const CreateOrphanageButton = styled(RectButton)`
  width: 56px;
  height: 56px;
  background-color: #15c3d6;
  border-radius: 16px;

  justify-content: center;
  align-items: center;
`;

export const Map = styled(MapView)`
  flex: 1;
  width: ${width}px;
  height: ${height}px;
`;

import { StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const Map = styled(MapView)`
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;
  flex: 1;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,

    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});

export default styles;

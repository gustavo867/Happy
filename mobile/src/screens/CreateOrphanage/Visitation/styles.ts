import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Theme } from "../../../../App";

const { width } = Dimensions.get("window");

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props: Theme) => props.theme.Background};
`;

export const Line = styled.View`
  border-width: 0.75px;
  border-color: #d3e2e6;
  height: 0.75px;
  width: 100%;
  align-self: center;
  margin-top: 22px;
  margin-bottom: 32px;
`;

export const SwitchContainer = styled.View`
  margin-top: 16px;
`;

export const Label = styled.Text`
  color: #8fa7b3;
  font-family: Nunito_600SemiBold;
  margin-bottom: 8px;
  padding-left: 8px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  width: ${width}px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
  },

  line: {
    borderWidth: 0.75,
    borderColor: "#D3E2E6",
    height: 0.75,
    width: "100%",
    alignSelf: "center",
    marginTop: 22,
    marginBottom: 32,
  },

  number: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
    color: "#8FA7B2",
  },

  numberActive: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
    color: "#5C8599",
  },

  label: {
    color: "#8fa7b3",
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 8,
    paddingLeft: 8,
  },

  comment: {
    fontSize: 11,
    color: "#8fa7b3",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },

  uploadedImagesContainer: {
    flexDirection: "row",
  },

  uploadedImage: {
    height: 64,
    width: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#96D2F0",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  switchContainer: {
    marginTop: 16,
  },

  buttonsContainer: {
    flexDirection: "row",
    width: width,
  },

  buttonActive: {
    backgroundColor: "#EDFFF6",
    borderColor: "#A1E9C5",
    borderWidth: 1.4,
  },

  buttonActiveRed: {
    backgroundColor: "#FBF0F4",
    borderColor: "#E9B9BD",
    borderWidth: 1.4,
  },

  button: {
    backgroundColor: "#FFF",
    borderColor: "#DFE4F1",
    borderWidth: 1.4,
    width: width * 0.44,
    alignItems: "center",
    justifyContent: "center",
    height: 65,
  },

  buttonLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  buttonRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  buttonText: {
    color: "#5C8599",
    fontSize: 15,
    fontFamily: "Nunito_600SemiBold",
  },

  greenText: {
    fontSize: 15,
    fontFamily: "Nunito_600SemiBold",
    color: "#39CC83",
  },

  redText: {
    fontSize: 15,
    fontFamily: "Nunito_600SemiBold",
    color: "#FF669D",
  },
});

export default styles;

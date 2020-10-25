import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Theme } from "../../../../App";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props: Theme) => props.theme.Background};
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: #5c8599;
  font-size: 24px;
  font-family: Nunito_700Bold;
`;

export const NumberActive = styled.Text`
  font-family: Nunito_600SemiBold;
  font-size: 12px;
  color: #5c8599;
`;

export const Number = styled.Text`
  font-family: Nunito_600SemiBold;
  font-size: 12px;
  color: #8fa7b2;
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

export const Label = styled.Text`
  color: #8fa7b3;
  font-family: Nunito_600SemiBold;
  margin-bottom: 8px;
`;

export const UploadedImagesContainer = styled.View`
  flex-direction: row;
`;

export const UploadedImage = styled.Image`
  height: 64px;
  width: 64px;
  border-radius: 20px;
  margin-bottom: 32px;
  margin-right: 8px;
`;

export const ImagesInput = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.5);
  border-style: dashed;
  border-color: #96d2f0;
  border-width: 1.4px;
  border-radius: 20px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default styles;

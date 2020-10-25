import React from "react";
import { ActivityIndicator } from "react-native";
import { ThemeProvider } from "styled-components";
import styled from "styled-components/native";
import { Theme } from "../../../App";

interface Props {
  theme: any;
}

const Loading: React.FC<Props> = ({ theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LoadingText>Loading....</LoadingText>
        <LoadingIcon />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${(props: Theme) => props.theme.Background};
`;

const LoadingText = styled.Text`
  color: #ccc;
  font-size: 18px;
  font-family: Nunito_700Bold;
`;

const LoadingIcon = styled(ActivityIndicator).attrs({
  animating: true,
  size: "small",
  color: "#CCC",
})``;

export default Loading;

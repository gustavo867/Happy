import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { State, Theme } from "../../App";
import { ThemeProvider } from "styled-components";
import styled from "styled-components/native";

interface HeaderProps {
  title: string;
  showCancel?: boolean;
  screen: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showCancel = true,
  screen,
}) => {
  const { goBack, navigate } = useNavigation();

  const theme = useSelector((state: State) => state.themeReducer.theme);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <BorderlessButton onPress={() => goBack()}>
          <Feather name="arrow-left" size={24} color="#15b5d6" />
        </BorderlessButton>
        <Title>{title}</Title>

        {showCancel ? (
          <BorderlessButton
            onPress={() => navigate("CancelRegister", { screen })}
          >
            <Feather name="x" size={24} color="#ff669d" />
          </BorderlessButton>
        ) : (
          <View />
        )}
      </Container>
    </ThemeProvider>
  );
};

export const Container = styled.View`
  padding: 24px;
  background-color: ${(props: Theme) => props.theme.Background};
  border-bottom-width: 1px;
  border-color: #dde3f0;
  padding-top: 44px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: Nunito_600SemiBold;
  color: #8fa7b3;
  font-size: 16px;
`;

export default Header;

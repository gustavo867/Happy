import React, { useCallback } from "react";
import { View, Image, Dimensions, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Onboarding from "react-native-onboarding-swiper";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

import earth from "../../images/earth.png";
import kids from "../../images/Ilustra02.png";
import { useNavigation } from "@react-navigation/native";

const OnBoarding: React.FC = () => {
  const { navigate } = useNavigation();

  const NextButton = ({ ...props }) => {
    return (
      <RectButton style={styles.nextButton} {...props}>
        <Feather name="arrow-right" size={24} color="#15b5d6" />
      </RectButton>
    );
  };

  const Dot = ({ selected }: any) => {
    let backgroundColor;

    backgroundColor = selected ? "#FFD152" : "#BECFD8";

    return (
      <View
        style={[styles.dot, { backgroundColor, width: selected ? 16 : 6 }]}
      />
    );
  };

  const Done = ({ ...props }) => {
    return (
      <RectButton style={styles.nextButton} {...props}>
        <Feather name="check" size={24} color="#15b5d6" />
      </RectButton>
    );
  };

  const OnDone = useCallback(async () => {
    await AsyncStorage.setItem("@onboarding", "true");
    navigate("OrphanagesMap");
  }, []);

  return (
    <Onboarding
      onDone={OnDone}
      pages={[
        {
          backgroundColor: "#F2F3F5",
          image: (
            <Image style={styles.image} source={earth} resizeMode="contain" />
          ),
          title: "Leve felicidade para o mundo",
          subtitle: "Visite orfanatos e mude o dia de muitas crianças.",
        },
        {
          backgroundColor: "#F2F3F5",
          image: <Image source={kids} />,
          title: "Escolha um orfanato no mapa e faça uma visita",
          subtitle: "",
          titleStyles: {
            color: "#0089A5",
            fontSize: 30,
            fontFamily: "Nunito_800ExtraBold",
            width: width * 0.7,
            textAlign: "right",
          },
        },
      ]}
      containerStyles={{
        flex: 1,
      }}
      titleStyles={{
        color: "#0089A5",
        fontSize: 45,
        fontFamily: "Nunito_800ExtraBold",
        width: width * 0.7,
        textAlign: "left",
      }}
      subTitleStyles={{
        color: "#5C8599",
        fontSize: 20,
        fontFamily: "Nunito_600SemiBold",
        width: width * 0.7,
        textAlign: "left",
      }}
      NextButtonComponent={NextButton}
      bottomBarColor="#F2F3F5"
      SkipButtonComponent={() => null}
      bottomBarHeight={75}
      DotComponent={Dot}
      DoneButtonComponent={Done}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 0.6,
    height: height * 0.35,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#D1EDF2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
});

export default OnBoarding;

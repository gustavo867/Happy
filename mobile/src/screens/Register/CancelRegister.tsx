import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface RouteProps {
  screen: string;
}

const CancelRegister: React.FC = () => {
  const route = useRoute();

  const { screen } = route.params as RouteProps;

  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <Feather name="x" size={24} color="#FF669D" />
      </View>
      <Text style={styles.title}>Cancelar cadastro</Text>
      <Text style={styles.text}>
        Tem certeza que quer cancelar esse cadastro?
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigate(screen)}
          style={styles.button}
        >
          <Text style={styles.textButton}>Não</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("OrphanagesMap")}
          style={[styles.button, styles.filled]}
        >
          <Text style={styles.textButton}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF669D",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontFamily: "Nunito_800ExtraBold",
    marginTop: 20,
  },
  text: {
    marginTop: 15,
    color: "#FFFFFF",
    fontFamily: "Nunito_600SemiBold",
    width: width * 0.6,
    textAlign: "center",
    fontSize: 20,
  },
  square: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
  button: {
    width: width * 0.3,
    height: 65,
    borderColor: "#D6487B",
    borderWidth: 1.2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  filled: {
    backgroundColor: "#D6487B",
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 15,
  },
});

export default CancelRegister;

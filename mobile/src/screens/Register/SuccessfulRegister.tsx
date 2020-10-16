import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import img from "../../images/Vector.png";

const { width } = Dimensions.get("window");

const SuccessfulRegister: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={img} />
      <Text style={styles.title}>Ebaaa!</Text>
      <Text style={styles.subText}>
        O cadastro deu certo e foi enviado ao administrador para ser aprovado.
        Agora é só esperar :)
      </Text>
      <TouchableOpacity
        onPress={() => navigate("OrphanagesMap")}
        style={styles.button}
      >
        <Text style={styles.textButton}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#39CC83",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFF",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 40,
    marginTop: 20,
  },
  subText: {
    color: "#FFFF",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 20,
    marginTop: 20,
    width: width * 0.8,
    textAlign: "center",
  },
  button: {
    width: width * 0.3,
    height: 65,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#19C06D",
    marginTop: 15,
  },
  textButton: {
    color: "#FFFFFF",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 15,
  },
});

export default SuccessfulRegister;

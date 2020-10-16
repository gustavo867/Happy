import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import ButtonNext from "../../../components/ButtonNext";
import api from "../../../services/api";
import SelectButton from "./SelectButton";

import styles from "./styles";

interface RouteProps {
  position: {
    latitude: number;
    longitude: number;
  };
  datas: {
    name: string;
    about: string;
    images: string[];
  };
}

const Visitation: React.FC = () => {
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState<boolean>();

  const route = useRoute();
  const { navigate } = useNavigation();

  const { position, datas } = route.params as RouteProps;

  async function handleCreateOrphanage() {
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", datas.name);
    data.append("about", datas.about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    datas.images.forEach((image, index) => {
      data.append("images", {
        name: `image_${index}.jpg`,
        type: "image/jpg",
        uri: image,
      } as any);
    });

    await api.post("orphanages", data);

    navigate("SuccesRegister");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Visitação</Text>
        <Text style={styles.number}>
          01 - <Text style={styles.numberActive}>02</Text>
        </Text>
      </View>

      <View style={styles.line} />

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={(text) => setInstructions(text)}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={(text) => setOpeningHours(text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <View style={styles.buttonsContainer}>
          <SelectButton
            onPress={() =>
              open_on_weekends === true
                ? setOpenOnWeekends(undefined)
                : setOpenOnWeekends(true)
            }
            noPress={() =>
              open_on_weekends === false
                ? setOpenOnWeekends(undefined)
                : setOpenOnWeekends(false)
            }
            state={open_on_weekends}
          />
        </View>
      </View>

      <ButtonNext
        onPress={handleCreateOrphanage}
        title="Confirmar"
        color="#3CDC8C"
      />
    </ScrollView>
  );
};

export default Visitation;

import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import ButtonNext from "../../../components/ButtonNext";

interface RouteProps {
  position: {
    latitude: number;
    longitude: number;
  };
}

export default function OrphanageData() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const route = useRoute();

  const datas = {
    name,
    about,
    images,
  };

  const { position } = route.params as RouteProps;

  const { navigate } = useNavigation();

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Eita, precisamos de acesso às suas fotos...");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    setImages([...images, uri]);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dados</Text>
        <Text style={styles.numberActive}>
          01 - <Text style={styles.number}>02</Text>
        </Text>
      </View>

      <View style={styles.line} />

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={(text) => setAbout(text)}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((image) => {
          return (
            <Image
              source={{ uri: image }}
              key={image}
              style={styles.uploadedImage}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <ButtonNext
        title="Proximo"
        onPress={() => navigate("Visitation", { position, datas })}
      />
    </ScrollView>
  );
}

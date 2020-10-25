import React, { useState } from "react";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";

import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

import { useNavigation, useRoute } from "@react-navigation/native";
import * as S from "./styles";
import ButtonNext from "../../../components/ButtonNext";
import Input from "../../../components/Input";
import { useSelector } from "react-redux";
import { State } from "../../../../App";
import { ThemeProvider } from "styled-components";

interface RouteProps {
  position: {
    latitude: number;
    longitude: number;
  };
}

interface Values {
  name: string;
  about: string;
  whatsapp: string;
}

export default function OrphanageData() {
  const [images, setImages] = useState<string[]>([]);

  const route = useRoute();

  const { position } = route.params as RouteProps;

  const { navigate } = useNavigation();

  const theme = useSelector((state: State) => state.themeReducer.theme);

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

  async function handleNavigate(values: Values) {
    if (values) {
      const datas = {
        name: values.name,
        about: values.about,
        whatsapp: values.whatsapp,
        images: images,
      };

      if (images !== null) {
        navigate("Visitation", { position, datas });
      } else {
        Alert.alert("Selecione uma imagem");
        return;
      }
    }
    return;
  }

  return (
    <ThemeProvider theme={theme}>
      <S.Container
        style={S.default.container}
        contentContainerStyle={{ padding: 24 }}
      >
        <S.TitleContainer>
          <S.Title>Dados</S.Title>
          <S.NumberActive>
            01 - <S.Number>02</S.Number>
          </S.NumberActive>
        </S.TitleContainer>

        <S.Line />

        <Formik
          initialValues={{
            name: "",
            about: "",
            whatsapp: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("O nome e obrigatório"),
            about: Yup.string().required("O sobre e obrigatório"),
            whatsapp: Yup.string()
              .min(9, "Por favor insira no mínimo 9 digitos")
              .required("O numero e obrigatório"),
          })}
          onSubmit={() => {}}
        >
          {({
            values,
            errors,
            handleChange,
            isValid,
            setFieldTouched,
            touched,
          }) => (
            <>
              <Input
                label="Nome"
                value={values.name}
                onChangeText={handleChange("name")}
                errors={touched.name ? errors.name : undefined}
                onFocus={() => setFieldTouched("name", true)}
                borderColor={
                  touched.name
                    ? !errors.name
                      ? "#A1E9C5"
                      : "#d3e2e6"
                    : "#d3e2e6"
                }
              />

              <Input
                label="Sobre"
                value={values.about}
                onChangeText={handleChange("about")}
                multiline
                height={110}
                errors={touched.about ? errors.about : undefined}
                onFocus={() => setFieldTouched("about", true)}
                borderColor={
                  touched.about
                    ? !errors.about
                      ? "#A1E9C5"
                      : "#d3e2e6"
                    : "#d3e2e6"
                }
              />

              <Input
                label="Whatsapp"
                value={values.whatsapp}
                onChangeText={handleChange("whatsapp")}
                errors={touched.whatsapp ? errors.whatsapp : undefined}
                onFocus={() => setFieldTouched("whatsapp", true)}
                borderColor={
                  touched.whatsapp
                    ? !errors.whatsapp
                      ? "#A1E9C5"
                      : "#d3e2e6"
                    : "#d3e2e6"
                }
              />

              <S.Label>Fotos</S.Label>

              <S.UploadedImagesContainer>
                {images.map((image) => {
                  return (
                    <S.UploadedImage source={{ uri: image }} key={image} />
                  );
                })}
              </S.UploadedImagesContainer>

              <S.ImagesInput onPress={handleSelectImages}>
                <Feather name="plus" size={24} color="#15B6D6" />
              </S.ImagesInput>

              <ButtonNext
                disabled={isValid}
                title="Proximo"
                onPress={() => handleNavigate(values)}
              />
            </>
          )}
        </Formik>
      </S.Container>
    </ThemeProvider>
  );
}

import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import ButtonNext from "../../../components/ButtonNext";
import Input from "../../../components/Input";
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

interface Values {
  instructions: string;
  opening_hours: string;
}

const Visitation: React.FC = () => {
  const [open_on_weekends, setOpenOnWeekends] = useState<boolean>();

  const route = useRoute();
  const { navigate } = useNavigation();

  const { position, datas } = route.params as RouteProps;

  async function handleCreateOrphanage(values: Values) {
    const { latitude, longitude } = position;

    if (datas) {
      const data = new FormData();

      data.append("name", datas.name);
      data.append("about", datas.about);
      data.append("latitude", String(latitude));
      data.append("longitude", String(longitude));
      data.append("instructions", values.instructions);
      data.append("opening_hours", values.opening_hours);
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
    return;
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

      <Formik
        initialValues={{
          instructions: "",
          opening_hours: "",
        }}
        validationSchema={Yup.object().shape({
          instructions: Yup.string().required(
            "Instruções são um campo obrigatório"
          ),
          opening_hours: Yup.string().required(
            "O horário de visitas e obrigatório"
          ),
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
              label="Instruções"
              multiline
              value={values.instructions}
              onChangeText={handleChange("instructions")}
              height={110}
              errors={touched.instructions ? errors.instructions : undefined}
              onFocus={() => setFieldTouched("instructions", true)}
              borderColor={
                touched.instructions
                  ? !errors.instructions
                    ? "#A1E9C5"
                    : "#d3e2e6"
                  : "#d3e2e6"
              }
            />

            <Input
              label="Horário de visitas"
              value={values.opening_hours}
              onChangeText={handleChange("opening_hours")}
              errors={touched.opening_hours ? errors.opening_hours : undefined}
              onFocus={() => setFieldTouched("opening_hours", true)}
              borderColor={
                touched.opening_hours
                  ? !errors.opening_hours
                    ? "#A1E9C5"
                    : "#d3e2e6"
                  : "#d3e2e6"
              }
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
              disabled={isValid}
              onPress={() => handleCreateOrphanage(values)}
              title="Confirmar"
              color="#3CDC8C"
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Visitation;

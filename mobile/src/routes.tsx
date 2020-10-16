import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanagesMap from "./screens/OrphanageMap";
import OrphanageDetails from "./screens/OrphanageDetails";
import SelectMapPosition from "./screens/CreateOrphanage/SelectMapPosition";
import Header from "./components/Header";
import OrphanageData from "./screens/CreateOrphanage/OrphanageData";
import Onboarding from "./screens/OnBoarding";
import CancelRegister from "./screens/Register/CancelRegister";
import Visitation from "./screens/CreateOrphanage/Visitation";
import SuccessfulRegister from "./screens/Register/SuccessfulRegister";

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  const [onboarding, setOnboarding] = useState(true);

  useEffect(() => {
    async function loadOnboard() {
      await AsyncStorage.getItem("@onboarding").then((response) => {
        if (response === "true") {
          setOnboarding(false);
        } else {
          setOnboarding(true);
        }
      });
    }
    loadOnboard();
  }, []);

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#f2f3f5",
          },
        }}
      >
        {onboarding && <Screen name="Onboarding" component={Onboarding} />}
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => (
              <Header
                showCancel={false}
                title="Orfanato"
                screen="OrphanageDetails"
              />
            ),
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => (
              <Header screen="SelectMapPosition" title="Selecione no mapa" />
            ),
          }}
        />
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => (
              <Header screen="OrphanageData" title="Informe os dados" />
            ),
          }}
        />
        <Screen
          name="Visitation"
          component={Visitation}
          options={{
            headerShown: true,
            header: () => (
              <Header screen="Visitation" title="Adicione um orfanato" />
            ),
          }}
        />
        <Screen name="CancelRegister" component={CancelRegister} />
        <Screen name="SuccesRegister" component={SuccessfulRegister} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;

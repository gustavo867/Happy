import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

import styles from "./styles";

interface Props {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  noPress: ((event: GestureResponderEvent) => void) | undefined;
  state: boolean | undefined;
}

const SelectButton: React.FC<Props> = ({ onPress, noPress, state }) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          styles.buttonLeft,
          state === true && styles.buttonActive,
        ]}
      >
        <Text style={[styles.buttonText, state === true && styles.greenText]}>
          Sim
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={noPress}
        style={[
          styles.button,
          styles.buttonRight,
          state === false && styles.buttonActiveRed,
        ]}
      >
        <Text style={[styles.buttonText, state === false && styles.redText]}>
          Não
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default SelectButton;

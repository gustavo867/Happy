import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

interface Props extends TextInputProps {
  label: string;
  errors?: string;
  height?: number;
  borderColor?: string;
}

const Input: React.FC<Props> = ({
  label,
  errors,
  height,
  borderColor,
  ...props
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            height: height ? height : 56,
            borderColor: borderColor ? borderColor : "#d3e2e6",
            marginBottom: !errors ? 16 : 5,
          },
        ]}
        {...props}
      />
      {errors && <Text style={styles.error}>{errors}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#8fa7b3",
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 8,
    paddingLeft: 15,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    textAlignVertical: "top",
  },

  error: {
    color: "rgba(255, 1, 2, 0.9)",
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 15,
  },
});

export default Input;

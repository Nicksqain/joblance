import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
const Button = ({ title, bgColor, textColor, onClick }) => {
  const styles = StyleSheet.create({
    shadowProp: {
      // shadowColor: "#387796",
      // shadowOffset: { width: 0, height: 1 },
      // shadowOpacity: 1,
      elevation: 20,
      shadowColor: "#387796",
    },
    button: {
      backgroundColor: bgColor,
      width: 300,
      padding: 15,
      marginBottom: 20,
      alignItems: "center",
      // borderWidth: 2,
      borderStartColor: "#343434",
      borderBottomColor: "#387796",

      borderBottomWidth: 2,
      borderRadius: 7,
    },
    text: {
      color: textColor,
      textAlign: "center",
      fontWeight: "700",
    },
  });
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.shadowProp, styles.button]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button/Button";

const Main = ({ route, navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "#b1d0ff",
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      height: "100%",
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {/* <Text>Details Screen {check}</Text> */}
          <Button
            title={"Астана ЖЭТ"}
            bgColor={"#cee7fe"}
            onClick={() => navigation.navigate("Item")}
          ></Button>
          <Button
            title={"Жамбыл ЖЭТ"}
            bgColor={"#cee7fe"}
            onClick={() => navigation.navigate("Item")}
          ></Button>
          <Button
            title={"Жетісу ЖЭТ"}
            bgColor={"#cee7fe"}
            onClick={() => navigation.navigate("Item")}
          ></Button>

          <Button
            title={"Оңтүстік ЖЭТ"}
            bgColor={"#cee7fe"}
            onClick={() => navigation.navigate("Item")}
          ></Button>

          <Button
            title={"Солтүстік ЖЭТ"}
            bgColor={"#cee7fe"}
            onClick={() => navigation.navigate("Item")}
          ></Button>
          <Button
            title={"Талдықорған ЖЭТ"}
            bgColor={"#cee7fe"}
            onClick={() => navigation.navigate("Item")}
          ></Button>
          <Button
            title={"Шығыс ЖЭТ"}
            bgColor={"#cee7fe"}
            onClick={() => navigation.navigate("Item")}
          ></Button>
        </View>
        <Button
          title={"Литература"}
          textColor={"#fff"}
          bgColor={"#387796"}
          onClick={() => navigation.navigate("Library")}
        ></Button>
      </View>
    </View>
  );
};

export default Main;

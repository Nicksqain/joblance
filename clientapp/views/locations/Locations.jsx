import React from "react";
import { View } from "react-native";
import Button from "../../components/Button/Button";
const Locations = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>Details Screen {check}</Text> */}
      <Button title={"Садчиковка-Озерное"} bgColor={"#cee7fe"}></Button>
      <Button
        title={"Тобол-Аксу"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Item")}
      ></Button>
      <Button
        title={"ТЭЦ 1-Жанажол"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"ТЭЦ 2-Орал"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Батыс-Шығыс"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Сарыбай-Обжиг"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Акшабулак-Кумколь"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Кентау-Байконур"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Documents")}
      ></Button>
    </View>
  );
};

export default Locations;

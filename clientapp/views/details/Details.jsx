import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button/Button";
const Details = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>Details Screen {check}</Text> */}

      <Button
        title={"Карта линии"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Map")}
      ></Button>
      <Button
        title={"Листки осмотров"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Карточка учета выполненных работ"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Технологические карты"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Документы по верховым осмотрам"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Отчеты по замене анкерных плит"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
      <Button
        title={"Ведомости"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
};

export default Details;

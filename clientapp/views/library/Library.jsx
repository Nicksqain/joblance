import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button/Button";

const Library = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>Details Screen {check}</Text> */}
      <Button title={"Инструкции Компании"} bgColor={"#cee7fe"}></Button>
      <Button
        title={"Правила обеспечения промышленной безопасности"}
        bgColor={"#cee7fe"}
      ></Button>
      <Button
        title={"Правила работы с персоналом"}
        bgColor={"#cee7fe"}
      ></Button>
      <Button title={"ППБ для предприятий"} bgColor={"#cee7fe"}></Button>
      <Button
        title={"ПБ при работе с инструментом и приспособлениями"}
        bgColor={"#cee7fe"}
      ></Button>
      <Button title={"Типовая инструкция"} bgColor={"#cee7fe"}></Button>
      <Button title={"ОТ"} bgColor={"#cee7fe"}></Button>
      <Button title={"Пожарная безопасность"} bgColor={"#cee7fe"}></Button>
      <Button
        title={"Оказание первой медицинской помощи"}
        bgColor={"#cee7fe"}
      ></Button>
    </View>
  );
};

export default Library;

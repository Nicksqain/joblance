import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button/Button";

const Item = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>Details Screen {check}</Text> */}
      <Button title={"6-35 кВ"} bgColor={"#cee7fe"}></Button>
      <Button
        title={"110 кВ"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Item")}
      ></Button>
      <Button
        title={"220 кВ"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Item")}
      ></Button>
      <Button
        title={"500 кВ"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Locations")}
      ></Button>
      <Button
        title={"1150 кВ"}
        bgColor={"#cee7fe"}
        onClick={() => navigation.navigate("Item")}
      ></Button>
    </View>
  );
};

export default Item;

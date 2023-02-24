import React, { useState, useEffect } from "react";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./components/maps/Map";
import Main from "./views/Main/Main";
import Button from "./components/Button/Button";
import Item from "./views/Item/Item";
import Locations from "./views/locations/Locations";
import Details from "./views/details/Details";
import Library from "./views/library/Library";
import * as Location from "expo-location";
import { MarkerProvider } from "./context/Marker";
const App = () => {
  const GOOGLE_MAPS_APIKEY = "AIzaSyB5tc0RIj5Uy4VPP-fuuPwItrIAlAYdHyo";

  useEffect(() => {
    Location.setGoogleApiKey(GOOGLE_MAPS_APIKEY);
  }, []);
  function DetailsScreen({ route, navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title={"Литература"}
          textColor={"#fff"}
          bgColor={"#387796"}
        ></Button>
      </View>
    );
  }
  const Stack = createNativeStackNavigator();
  const [text, setText] = useState();
  // return <Map />;
  return (
    <MarkerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Main}
            options={{ title: "Главная", headerShown: false }}
          />
          <Stack.Screen
            name="Library"
            component={Library}
            options={{ title: "Литература", headerShown: true }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "ЖЭТ" }}
          />
          <Stack.Screen
            name="Item"
            component={Item}
            options={{ title: "ЖЭТ" }}
          />
          <Stack.Screen
            name="Locations"
            component={Locations}
            options={{ title: "Локации" }}
          />
          <Stack.Screen
            name="Documents"
            component={Details}
            options={{ title: "Документы" }}
          />

          <Stack.Screen
            name="Map"
            component={Map}
            options={{ title: "Карта линии" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MarkerProvider>
  );
};

export default App;

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   let map;

//   function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });
//   }

//   window.initMap = initMap;
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app! ssskek</Text>
//       <StatusBar style="auto" />
//       <div style={styles.map} id="map"></div>
//       <script
//         async
//         defer
//         src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADH4hPGFLUYFRK4Om58VF3Htg-bSsTSow"
//         type="text/javascript"
//       ></script>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     height: "100%",
//   },
// });

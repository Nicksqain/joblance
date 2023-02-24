import React, { useEffect, useState, useContext, useRef } from "react";

import { LocalTile, Polyline } from "react-native-maps";
import MapView from "react-native-map-clustering";

import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import Marker from "./Marker";
import { MarkerContext } from "../../context/Marker";
const Map = () => {
  const GOOGLE_MAPS_APIKEY = "AIzaSyB5tc0RIj5Uy4VPP-fuuPwItrIAlAYdHyo";
  Location.setGoogleApiKey(GOOGLE_MAPS_APIKEY);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useContext(MarkerContext);
  const mapRef = useRef();
  useEffect(() => {
    console.log("Current Marker:", selectedMarker);
  }, [selectedMarker]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location) {
        const { latitude, longitude } = location.coords;
        let currentLocation = {
          latitude: latitude,
          longitude: longitude,
        };
        setCurrentLocation(currentLocation);
      }
    })();
  }, []);
  const origin = {
    latitude: 53.22767175820073,
    longitude: 63.61498359289392,
  };
  location = {
    latitude: 53.03045748161691,
    longitude: 63.65080531093023,
  };
  const destination = {
    latitude: 53.209898558785625,
    longitude: 63.64517509632207,
  };

  const INITIAL_REGION = {
    // latitude: 53.20845533438308,
    // longitude: 63.65345113776367,
    latitude: 53.03045748161691,
    longitude: 63.019071424005704,
    latitudeDelta: 0.017,
    longitudeDelta: 0.035,
  };

  return (
    <MapView
      ref={mapRef}
      initialRegion={INITIAL_REGION}
      mapType="hybrid"
      showsUserLocation={true}
      onUserLocationChange={(e) => {
        const checkLocation = {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        };
        // console.log(e.nativeEvent.coordinate);
        setCurrentLocation(checkLocation);
        // console.log(location);
      }}
      style={{ flex: 1, height: "80%" }}
    >
      <LocalTile></LocalTile>
      <Marker
        title="#1"
        coordinate={{
          latitude: 53.01939906424194,
          longitude: 63.02328777540754,
        }}
      />
      <Marker
        title="#2"
        coordinate={{
          latitude: 53.022391533366196,
          longitude: 63.02045778413235,
        }}
      />
      <Marker
        title="#3"
        coordinate={{
          latitude: 53.0255444917235,
          longitude: 63.01760871099144,
        }}
      />
      <Marker
        title="#4"
        coordinate={{
          latitude: 53.0286769997268,
          longitude: 63.01480744240655,
        }}
      />
      <Marker
        title="#5"
        coordinate={{
          latitude: 53.03204953219081,
          longitude: 63.01175754276876,
        }}
        pressRef={mapRef.current}
      />
      {/* <Polyline
        coordinates={[
          { latitude: 53.022391533366196, longitude: 63.02045778413235 },
          {
            latitude: 53.20884407887858,
            longitude: 63.65391784214666,
          },
        ]}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={[
          "#7F0000",
          "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
          "#B24112",
          "#E5845C",
          "#238C23",
          "#7F0000",
        ]}
        strokeWidth={20}
      /> */}
      {/* {console.log(location)}
      {console.log(selectedMarker)} */}
      {selectedMarker !== null ? (
        <MapViewDirections
          origin={currentLocation}
          destination={selectedMarker.coordinate}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#6aaef8"
        />
      ) : (
        void 0
      )}
    </MapView>
  );
};

export default Map;

// import React, { useState } from "react";
// import MapView from "react-native-map-clustering";
// import { Marker } from "react-native-maps";
// import { StyleSheet, View, Text } from "react-native";
// const Map = () => {
//   const INITIAL_REGION = {
//     // latitude: 53.20845533438308,
//     // longitude: 63.65345113776367,
//     latitude: 53.03045748161691,
//     longitude: 63.019071424005704,
//     latitudeDelta: 0.017,
//     longitudeDelta: 0.035,
//   };
//   const [text, setText] = useState();
//   return (
//     <MapView
//       // clusterColor={"#343434"}
//       initialRegion={INITIAL_REGION}
//       mapType="hybrid"
//       style={{ flex: 1, height: "80%" }}
//       onLayout={() => {
//         setText("yes");
//       }}
//     >
//       {/* <Marker
//         identifier="ваывы"
//         coordinate={{
//           latitude: 53.20845533438308,
//           longitude: 63.65345113776367,
//         }}
//       >
//         <View style={{ backgroundColor: "red", padding: 10 }}>
//           <Text>{text}</Text>
//         </View>
//       </Marker>
//       <Marker
//         coordinate={{
//           latitude: 53.20884407887858,
//           longitude: 63.65391784214666,
//         }}
//       />
//       <Marker
//         coordinate={{
//           latitude: 53.209078608975936,
//           longitude: 63.654169969801835,
//         }}
//       />
//       <Marker
//         coordinate={{
//           latitude: 53.209605493840215,
//           longitude: 63.654856615328846,
//         }}
//       />
//       <Marker
//         coordinate={{
//           latitude: 53.20992354924319,
//           longitude: 63.65553253202145,
//         }}
//       /> */}
//       <Marker
//         title="#1"
//         coordinate={{
//           latitude: 53.01939906424194,
//           longitude: 63.02328777540754,
//         }}
//       />
//       <Marker
//         title="#2"
//         coordinate={{
//           latitude: 53.022391533366196,
//           longitude: 63.02045778413235,
//         }}
//       />
//       <Marker
//         title="#3"
//         coordinate={{
//           latitude: 53.0255444917235,
//           longitude: 63.01760871099144,
//         }}
//       />
//       <Marker
//         title="#4"
//         coordinate={{
//           latitude: 53.0286769997268,
//           longitude: 63.01480744240655,
//         }}
//       />
//       <Marker
//         title="#5"
//         coordinate={{
//           latitude: 53.03204953219081,
//           longitude: 63.01175754276876,
//         }}
//       />
//     </MapView>
//   );
// };

// export default Map;

import React, { useContext } from "react";
import { Marker as MyMarker } from "react-native-maps";
import { MarkerContext } from "../../context/Marker";
const Marker = ({ title, coordinate }) => {
  const [selectedMarker, setSelectedMarker] = useContext(MarkerContext);
  return (
    <MyMarker
      title={title}
      coordinate={coordinate}
      onPress={(e) => {
        setSelectedMarker({
          coordinate: e.nativeEvent.coordinate,
        });
      }}
    ></MyMarker>
  );
};

export default Marker;

import React, { useState, createContext } from "react";
const MarkerContext = createContext();
const MarkerProvider = ({ children }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <MarkerContext.Provider value={[selectedMarker, setSelectedMarker]}>
      {children}
    </MarkerContext.Provider>
  );
};

export { MarkerProvider, MarkerContext };

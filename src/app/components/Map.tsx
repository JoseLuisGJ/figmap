import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

interface IMap {
  styleMode: String; // try not to use any.
  viewport: any;
  accessToken: String;
  username: String;
  customStyleID: String;
  mapboxStyle: String;
  setViewport: any;
}

const Map: React.FC<IMap> = ({
  styleMode,
  viewport,
  accessToken,
  username,
  customStyleID,
  mapboxStyle,
  setViewport
}) => {
  const mapRef = useRef();
  useEffect(() => {});

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(newViewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return setViewport({
      ...newViewport,
      ...geocoderDefaultOverrides
    });
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={accessToken}
        mapStyle={`mapbox://styles/${
          styleMode == "customMapboxStyle" ? username : "mapbox"
        }/${styleMode == "customMapboxStyle" ? customStyleID : mapboxStyle}`}
        width="100%"
        height="100%"
        preventStyleDiffing={true}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={accessToken}
          position="top-right"
          marker={false}
        />
      </ReactMapGL>
    </div>
  );
};
export default Map;

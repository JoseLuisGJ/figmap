import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMapGL from "react-map-gl";
import { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

interface IMap {
  styleMode: String; // try not to use any.
  viewport: any;
  accessToken: String;
  username: String;
  customStyleID: String;
  mapboxStyle: String;
  setViewport: any;
  stateMarkers: any;
  setStateMarkers: any;
  mapMode: any;
}

const Map: React.FC<IMap> = ({
  styleMode,
  viewport,
  accessToken,
  username,
  customStyleID,
  mapboxStyle,
  setViewport,
  stateMarkers,
  setStateMarkers,
  mapMode
}) => {
  const mapRef = useRef();
  const markerRef = useRef();

  const [markerID, setMarkerID] = useState(0);

  useEffect(() => {});

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(newViewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return setViewport({
      ...newViewport,
      ...geocoderDefaultOverrides
    });
  }, []);
  // const mapboxMapRef = null;
  const onLoad = () => {
    // let map = mapRef.current.getMap();
    // const coordinate = [-122.420679, 37.772537];
    // let point = map.project(coordinate);
    // map.on('mousemove', function (e) {
    //   console.log( JSON.stringify(e.point))
    // });
    // console.log(point);
    console.log("=>", markerRef);
    // console.log('mapRef.current is ready for use', )
    // console.log('mapRef.current is ready for use', mapboxMapRef.current)
  };
  const mapClicked = e => {
    if (mapMode === "markers") {
      const newMarker = stateMarkers.concat({
        id: setMarkerID(markerID + 1),
        latitude: e.lngLat[1],
        longitude: e.lngLat[0],
        x: e.point[0],
        y: e.point[1],
        icon: null
      });
      setStateMarkers(newMarker);
      console.log(JSON.stringify(e.point), e.lngLat[0], e.lngLat[1], markerID);
      console.log("mapClicked =>", stateMarkers);
    }
  };
  return (
    <div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        onLoad={onLoad}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={accessToken}
        mapStyle={`mapbox://styles/${
          styleMode == "customMapboxStyle" ? username : "mapbox"
        }/${styleMode == "customMapboxStyle" ? customStyleID : mapboxStyle}`}
        width="100%"
        height="100%"
        preventStyleDiffing={true}
        onClick={e => mapClicked(e)}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={accessToken}
          position="top-right"
          marker={false}
        />
        {stateMarkers.map((localState, index) => (
          <Marker
            ref={markerRef || index}
            key={localState.id}
            offsetTop={-10}
            offsetLeft={-10}
            latitude={localState.latitude}
            longitude={localState.longitude}
          >
            <img src={require("../assets/markers-icon.svg")} />
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};
export default Map;

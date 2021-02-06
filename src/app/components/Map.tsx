import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import ReactMapGL from "react-map-gl";
import { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { WebMercatorViewport } from "react-map-gl";
interface IMap {
  styleMode: String;
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

  useEffect(() => {});

  const handleGeocoderViewportChange = useCallback(newViewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return setViewport({
      ...newViewport,
      ...geocoderDefaultOverrides
    });
  }, []);

  const onLoad = () => {
    //console.log("=>", markerRef);
  };
  const mapClicked = e => {
    if (mapMode === "markers") {
      const newMarker = stateMarkers.concat({
        latitude: e.lngLat[1],
        longitude: e.lngLat[0],
        x: e.point[0],
        y: e.point[1],
        icon: null
      });
      setStateMarkers(newMarker);
      //console.log(JSON.stringify(e.point), e.lngLat[0], e.lngLat[1], markerID);
      //console.log("mapClicked =>", stateMarkers);
    }
  };

  const onViewportChange = viewport => {
    const v = new WebMercatorViewport(viewport);
    for (const marker of stateMarkers) {
      const [x, y] = v.project([marker.longitude, marker.latitude]);
      marker.x = x;
      marker.y = y;
    }
    setViewport(viewport);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        onLoad={onLoad}
        onViewportChange={nextViewport => onViewportChange(nextViewport)}
        mapboxApiAccessToken={accessToken}
        mapStyle={`mapbox://styles/${
          styleMode == "customMapboxStyle" ? username : "mapbox"
        }/${styleMode == "customMapboxStyle" ? customStyleID : mapboxStyle}`}
        width="100%"
        height="100%"
        preventStyleDiffing={true}
        onClick={e => mapClicked(e)}
        getCursor={() => (mapMode === "styles" ? "grab" : "crosshair")}
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
            key={index}
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

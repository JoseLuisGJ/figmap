import * as React from "react";
import { useEffect, useRef } from "react";
import Map from "react-map-gl/dist/es5/index";
import { Marker } from "react-map-gl/dist/es5/index";
// import Geocoder from "react-map-gl-geocoder";
import GeocoderControl from "./geocoder-control";
// import { WebMercatorViewport } from "react-map-gl";
interface IMap {
  styleMode: string;
  viewState: any;
  accessToken: string;
  username: string;
  customStyleID: string;
  mapboxStyle: string;
  setviewState: any;
  stateMarkers: any;
  setStateMarkers: any;
  mapMode: any;
}

const MyMap: React.FC<IMap> = ({
  styleMode,
  viewState,
  accessToken,
  username,
  customStyleID,
  mapboxStyle,
  setviewState,
  stateMarkers,
  setStateMarkers,
  mapMode
}) => {
  const mapRef = useRef();
  const markerRef = useRef();

  useEffect(() => {});

  /*   const handleGeocoderViewportChange = useCallback(newViewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return setViewport({
      ...newViewport,
      ...geocoderDefaultOverrides
    });
  }, []); */

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

  const onviewStateChange = viewState => {
    /*  const v = new WebMercatorViewport(viewport);
    for (const marker of stateMarkers) {
      const [x, y] = v.project([marker.longitude, marker.latitude]);
      marker.x = x;
      marker.y = y;
    } */
    setviewState(viewState);
  };

  return (
    <div>
      <Map
        {...viewState}
        dragPan={true}
        ref={mapRef}
        onLoad={onLoad}
        onMove={evt => setviewState(evt.viewState)}
        onviewStateChange={nextviewState => onviewStateChange(nextviewState)}
        mapboxAccessToken={accessToken}
        mapStyle={`mapbox://styles/${
          styleMode == "customMapboxStyle" ? username : "mapbox"
        }/${styleMode == "customMapboxStyle" ? customStyleID : mapboxStyle}`}
        width="100%"
        height="100%"
        preventStyleDiffing={true}
        onClick={e => mapClicked(e)}
        getCursor={() => (mapMode === "styles" ? "grab" : "crosshair")}
      >
        {/* <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={accessToken}
          position="top-right"
          marker={false}
        />  */}
        {/*  https://github.com/visgl/react-map-gl/blob/7.1-release/examples/terrain/src/app.tsx */}
        {/*     <GeocoderControl
          mapboxAccessToken={accessToken}
          position="top-right"
          // mapRef={mapRef}
          // onViewportChange={handleGeocoderViewportChange} 
          marker={false}
        /> */}

        {stateMarkers.map((localState, index) => (
          <Marker
            ref={markerRef || index}
            key={index}
            // offsetTop={-10}
            // offsetLeft={-10}
            latitude={localState.latitude}
            longitude={localState.longitude}
          >
            <img src={require("../assets/markers-icon.svg")} />
          </Marker>
        ))}
      </Map>
    </div>
  );
};
export default MyMap;

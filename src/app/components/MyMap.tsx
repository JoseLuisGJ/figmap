import * as React from "react";
import { useEffect, useRef } from "react";
import Map from "react-map-gl/dist/es5/index";
import { Marker } from "react-map-gl/dist/es5/index";
import GeocoderControl from "./geocoder-control";
import WebMercatorViewport from "@math.gl/web-mercator";

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
  mapExportWidth: any;
  mapExportHeight: any;
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
  mapMode,
  // mapExportWidth,
  mapExportHeight
}) => {
  const mapRef = useRef();
  const markerRef = useRef();

  useEffect(() => {});

  const onLoad = () => {
    //console.log("=>", markerRef);
  };
  const mapClicked = e => {
    if (mapMode === "markers") {
      //  console.log(JSON.stringify(e.point), e.lngLat.lat, e.lngLat.lng);
      const newMarker = stateMarkers.concat({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
        x: e.point.x,
        y: e.point.y,
        icon: null
      });
      setStateMarkers(newMarker);
      //console.log("mapClicked =>", stateMarkers);
    }
  };

  const onMapMove = e => {
    let viewport = new WebMercatorViewport({
      ...e.viewState,
      width: mapExportHeight - 30,
      height: mapExportHeight - 30
    });
    //console.log("--v", viewport);
    for (const marker of stateMarkers) {
      let projection = viewport.project([marker.longitude, marker.latitude]);
      marker.x = projection[0];
      marker.y = projection[1];
    }

    setviewState(e.viewState);
  };

  return (
    <div>
      <Map
        {...viewState}
        ref={mapRef}
        onLoad={onLoad}
        onMove={e => onMapMove(e)}
        mapboxAccessToken={accessToken}
        mapStyle={`mapbox://styles/${
          styleMode == "customMapboxStyle" ? username : "mapbox"
        }/${styleMode == "customMapboxStyle" ? customStyleID : mapboxStyle}`}
        width="100%"
        height="100%"
        preventStyleDiffing={true}
        onClick={e => mapClicked(e)}
        cursor={mapMode === "styles" ? "grab" : "crosshair"}
        projection="mercator" // "mercator" or "globe"
        maxPitch={60}
        /*      terrain={{source: 'mapbox-dem', exaggeration: 5.5}}
        fog={{
          range: [0.8, 8],
          color: "#9FBBDC",
          "horizon-blend": 0.5,
          // "high-color": "#245bde",
          "space-color": "#000000",
          "star-intensity": 0.15,
        }} */
      >
        {/* This source is rendered but it's not generated using the Static Image API https://docs.mapbox.com/style-spec/reference/layers/ */}
        {/*        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        /> */}
        {/*  https://github.com/visgl/react-map-gl/blob/7.1-release/examples/terrain/src/app.tsx */}
        <GeocoderControl
          mapboxAccessToken={accessToken}
          position="top-right"
          // mapRef={mapRef}
          // onViewportChange={handleGeocoderViewportChange}
          marker={false}
        />

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

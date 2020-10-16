import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
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
  const markerRef = useRef();
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
  return (
    <div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        // ref={(ref) => {
        //   // mapboxMapRef.current = ref && ref.getMap();
        //   return mapRef;
        // }}
        onLoad={onLoad}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={accessToken}
        mapStyle={`mapbox://styles/${
          styleMode == "customMapboxStyle" ? username : "mapbox"
        }/${styleMode == "customMapboxStyle" ? customStyleID : mapboxStyle}`}
        width="100%"
        height="100%"
        preventStyleDiffing={true}
        onClick={e => console.log(JSON.stringify(e.point))}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={accessToken}
          position="top-right"
          marker={false}
        />
        <Marker
          ref={markerRef}
          key={1}
          offsetTop={-48}
          offsetLeft={-24}
          latitude={38.89744}
          longitude={-77.03968}
        >
          <img src="https://img.icons8.com/color/48/000000/marker.png" />
        </Marker>
      </ReactMapGL>
    </div>
  );
};
export default Map;

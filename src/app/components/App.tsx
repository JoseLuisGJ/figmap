import * as React from "react";
import { useState, useRef } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "../styles/ui.css";

import Map from "./Map";
import MapStylesForm from "./MapStylesForm";
import MapPropertiesForm from "./MapPropertiesForm";
import ImageSizeForm from "./ImageSizeForm";
import MapMarkersForm from "./MapMarkersForm";
import DrawMap from "./DrawMap";

declare function require(path: string): any;

const App = ({}) => {
  const inputUsername = useRef(null);
  const inputStyleID = useRef(null);
  const inputToken = useRef(null);

  const [mapMode, setMapMode] = useState("styles"); // styles or markers
  const [styleMode, setStyleMode] = useState("mapboxStyle"); // mapboxStyle or customMapboxStyle

  const [stateMarkers, setStateMarkers] = useState([]);
  const [markerImg, setMarkerImg] = useState(null);

  let [viewport, setViewport] = useState({
    longitude: -77.03968,
    latitude: 38.89744,
    zoom: 8,
    bearing: 0,
    pitch: 0,
    width: 560,
    height: 560
  });
  const handleViewportChange = (e, value) => {
    setViewport({
      ...viewport,
      [e.target.name]: Number(value)
    });
  };
  const [mapExportWidth, setMapExportWidth] = useState(800);
  const [mapExportHeight, setMapExportHeight] = useState(600);
  const [isRetina, setIsRetina] = useState(false);
  const onToggleRetina = () => {
    setIsRetina(!isRetina);
  };

  const [username, setUsername] = useState("ergum");
  const [customStyleID, setCustomStyleID] = useState(
    "ckg6ps8s62b5e19nrr67wqw9u"
  );
  const [mapboxStyle, setMapboxStyle] = useState("streets-v11");
  const [accessToken, setAccessToken] = useState(
    "pk.eyJ1IjoiZXJndW0iLCJhIjoiY2tnNnB1dzdnMTZzMTJybzVoY245bWs3biJ9.ZSHQTE9yUrMB6CPmEEEsfQ"
  );

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = event => {
      const { type, message } = event.data.pluginMessage;
      if (type === "map-drawed") {
        console.log(`Figma Says: ${message}`);
      }
      if (type === "components-response") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div className="main-wrapper">
      <div className="map-wrapper">
        <Map
          styleMode={styleMode}
          viewport={viewport}
          accessToken={accessToken}
          username={username}
          customStyleID={customStyleID}
          mapboxStyle={mapboxStyle}
          setViewport={setViewport}
          stateMarkers={stateMarkers}
          setStateMarkers={setStateMarkers}
          mapMode={mapMode}
        />
      </div>
      <div className="side-panel">
        <div className="form-block side-panel__tabs">
          <a
            href="#"
            className={mapMode === "styles" ? "active" : ""}
            onClick={() => setMapMode("styles")}
          >
            <img src={require("../assets/styles-icon.svg")} />
            <span>Map Styles</span>
          </a>
          <a
            href="#"
            className={mapMode === "markers" ? "active" : ""}
            onClick={() => setMapMode("markers")}
          >
            <img src={require("../assets/markers-icon.svg")} />
            <span>Markers</span>
          </a>
        </div>
        <hr />
        {mapMode === "styles" ? (
          <>
            <MapStylesForm
              styleMode={styleMode}
              accessToken={accessToken}
              username={username}
              customStyleID={customStyleID}
              mapboxStyle={mapboxStyle}
              setAccessToken={setAccessToken}
              setUsername={setUsername}
              inputToken={inputToken}
              inputUsername={inputUsername}
              inputStyleID={inputStyleID}
              setCustomStyleID={setCustomStyleID}
              setMapboxStyle={setMapboxStyle}
              setStyleMode={setStyleMode}
            />
            <hr />
            <MapPropertiesForm
              viewport={viewport}
              handleViewportChange={handleViewportChange}
            />
            <hr />
            <ImageSizeForm
              setMapExportWidth={setMapExportWidth}
              setMapExportHeight={setMapExportHeight}
              mapExportWidth={mapExportWidth}
              mapExportHeight={mapExportHeight}
              isRetina={isRetina}
              onToggleRetina={onToggleRetina}
            />
          </>
        ) : (
          <>
            <MapMarkersForm setMarkerImg={setMarkerImg} />
          </>
        )}
        <DrawMap
          username={username}
          styleMode={styleMode}
          customStyleID={customStyleID}
          mapboxStyle={mapboxStyle}
          viewport={viewport}
          mapExportWidth={mapExportWidth}
          mapExportHeight={mapExportHeight}
          isRetina={isRetina}
          accessToken={accessToken}
          stateMarkers={stateMarkers}
          markerImg={markerImg}
        />
      </div>
    </div>
  );
};

export default App;

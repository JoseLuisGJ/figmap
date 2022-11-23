import * as React from "react";
import { useState, useRef } from "react";
import * as mixpanel from "mixpanel-figma";

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

  const [figmaComponents, setFigmaComponents] = useState([]);
  const [editor, setEditor] = useState("figma");

  const [mapMode, setMapMode] = useState("styles"); // styles or markers
  const [styleMode, setStyleMode] = useState("mapboxStyle"); // mapboxStyle or customMapboxStyle

  const [stateMarkers, setStateMarkers] = useState([]);
  const [markerImg, setMarkerImg] = useState(1);

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
  const handleViewportChangeFileLoaded = (lat, lon) => {
    setViewport({
      ...viewport,
      latitude: Number(lat),
      longitude: Number(lon)
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
  const [accessToken] = useState(
    "pk.eyJ1IjoiZXJndW0iLCJhIjoiY2tnNnB1dzdnMTZzMTJybzVoY245bWs3biJ9.ZSHQTE9yUrMB6CPmEEEsfQ"
  );

  mixpanel.init("bb720f8aaaa0d68a225c4dc20cb584aa", {
    disable_cookie: true,
    disable_persistence: true
  });
  /*   const getUserId = async () => {
    let userId = uuid();
  
    try {
      const id = await figma.clientStorage.getAsync('userId')
  
      if (typeof id === 'undefined') {
        figma.clientStorage.setAsync('userId', userId)
      } else {
        userId = id
      }
    } catch (e) {
      console.error('userId retrieving error', e)
      figma.clientStorage.setAsync('userId', userId)
    }
  
    return userId
  } */
  // get or set if not yet set.
  // const userId = await getUserId();
  // send to iframe
  // figma.ui.postMessage(userId)

  React.useEffect(() => {
    mixpanel.track("plugin-loaded");
    parent.postMessage(
      {
        pluginMessage: {
          type: "read-storage"
        }
      },
      "*"
    );
    parent.postMessage(
      {
        pluginMessage: {
          type: "ask-editorType"
        }
      },
      "*"
    );

    // This is how we read messages sent from the plugin controller
    window.onmessage = event => {
      const { type, message, storage } = event.data.pluginMessage;
      if (type === "map-drawed") {
        console.log(`Figma Says: ${message}`);
      }
      if (type === "components-response") {
        setFigmaComponents(message);
      }
      if (type === "sending-editor") {
        setEditor(storage);
      }

      let notifyStorage = false;
      if (
        type === "fetched username" &&
        storage != undefined &&
        storage != "ergum"
      ) {
        setUsername(storage);
        console.log("setUsername --->", storage);
        notifyStorage = true;
      }
      if (
        type === "fetched custom style" &&
        storage != undefined &&
        storage != "ckg6ps8s62b5e19nrr67wqw9u"
      ) {
        setCustomStyleID(storage);
        console.log("setCustomStyleID --->", storage);
        notifyStorage = true;
      }
      if (notifyStorage) {
        parent.postMessage(
          {
            pluginMessage: {
              type: "notify-storage",
              user: username,
              style: customStyleID
            }
          },
          "*"
        );
      }
    };
  }, []);

  React.useEffect(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "update-storage",
          user: username,
          style: customStyleID
        }
      },
      "*"
    );
  }, [username, customStyleID]);

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
            onClick={() => {
              setMapMode("styles");
              mixpanel.track("styles-clicked");
            }}
          >
            <img src={require("../assets/styles-icon.svg")} />
            <span>Map Styles</span>
          </a>
          <a
            href="#"
            className={mapMode === "markers" ? "active" : ""}
            onClick={() => {
              setMapMode("markers");
              mixpanel.track("markers-clicked");
            }}
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
              username={username}
              customStyleID={customStyleID}
              mapboxStyle={mapboxStyle}
              setUsername={setUsername}
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
            <MapMarkersForm
              figmaComponents={figmaComponents}
              setMarkerImg={setMarkerImg}
              stateMarkers={stateMarkers}
              setStateMarkers={setStateMarkers}
              viewport={viewport}
              handleViewportChangeFileLoaded={handleViewportChangeFileLoaded}
            />
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
          editor={editor}
        />
      </div>
    </div>
  );
};

export default App;

import * as React from "react";
import { useState, useRef } from "react";
import * as mixpanel from "mixpanel-figma";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "../styles/ui.css";

import MyMap from "./MyMap";
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
  const [firstRenderMap, setFirstRenderMap] = useState(true);
  const [renderMap, setRenderMap] = useState(true);

  const [figmaComponents, setFigmaComponents] = useState([]);
  const [editor, setEditor] = useState("figma");

  const [mapMode, setMapMode] = useState("styles"); // styles or markers
  const [styleMode, setStyleMode] = useState("mapboxStyle"); // mapboxStyle or customMapboxStyle
  const [customToken, setCustomToken] = useState(false);

  const [stateMarkers, setStateMarkers] = useState([]);
  const [markerImg, setMarkerImg] = useState(1);

  let [viewState, setviewState] = useState({
    longitude: -77.03968,
    latitude: 38.89744,
    zoom: 8,
    bearing: 0,
    pitch: 0,
    width: 560,
    height: 560
  });
  const handleviewStateChange = (e, value) => {
    setviewState({
      ...viewState,
      [e.target.name]: Number(value)
    });
  };
  const handleviewStateChangeFileLoaded = (lat, lon) => {
    setviewState({
      ...viewState,
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
  const [accessToken, setAccessToken] = useState(process.env.MAPBOX_TOKEN);

  mixpanel.init("bb720f8aaaa0d68a225c4dc20cb584aa", {
    disable_cookie: true,
    disable_persistence: true
  });

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
      if (
        event.data &&
        event.data.pluginMessage &&
        typeof event.data.pluginMessage === "object"
      ) {
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
        if (
          type === "fetched custom access token" &&
          storage != undefined &&
          storage != process.env.MAPBOX_TOKEN
        ) {
          setAccessToken(storage);
          console.log("setAccessToken --->", storage);
          notifyStorage = true;
        }
        if (notifyStorage) {
          parent.postMessage(
            {
              pluginMessage: {
                type: "notify-storage",
                user: username,
                style: customStyleID,
                accessToken: accessToken
              }
            },
            "*"
          );
        }
      }
    };
  }, []);

  React.useEffect(() => {
    if (username == "") {
      setUsername("ergum");
    }
    if (customStyleID == "") {
      setCustomStyleID("ckg6ps8s62b5e19nrr67wqw9u");
    }
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

  React.useEffect(() => {
    if (!firstRenderMap) {
      setCustomToken(true);
      if (accessToken == "" || accessToken == undefined) {
        setAccessToken(process.env.MAPBOX_TOKEN);
      }
      setRenderMap(false);
      // if accessToken has more than 80 characters
      if (accessToken.length > 80) {
        setTimeout(() => {
          setRenderMap(true);
        }, 500);
      }
    }
    setFirstRenderMap(false);
  }, [accessToken]);

  const updateTokenStorage = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "update-accessToken-storage",
          accessToken: accessToken
        }
      },
      "*"
    );
  };

  return (
    <div className="main-wrapper">
      <div className="map-wrapper">
        {renderMap ? (
          <MyMap
            styleMode={styleMode}
            viewState={viewState}
            accessToken={accessToken}
            username={username}
            customStyleID={customStyleID}
            mapboxStyle={mapboxStyle}
            setviewState={setviewState}
            stateMarkers={stateMarkers}
            setStateMarkers={setStateMarkers}
            mapMode={mapMode}
            mapExportWidth={mapExportWidth}
            mapExportHeight={mapExportHeight}
            customToken={customToken}
            updateTokenStorage={updateTokenStorage}
          />
        ) : null}
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
              setAccessToken={setAccessToken}
              inputToken={inputToken}
              accessToken={
                accessToken != process.env.MAPBOX_TOKEN ? accessToken : ""
              }
            />
            <hr />
            <MapPropertiesForm
              viewState={viewState}
              handleviewStateChange={handleviewStateChange}
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
              viewState={viewState}
              handleviewStateChangeFileLoaded={handleviewStateChangeFileLoaded}
            />
          </>
        )}
        <DrawMap
          username={username}
          styleMode={styleMode}
          customStyleID={customStyleID}
          mapboxStyle={mapboxStyle}
          viewState={viewState}
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

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "../styles/ui.css";

import FormPanel from "./FormPanel";
import Map from "./Map";
import MapMarkersForm from "./MapMarkersForm";
import MapStylesForm from "./MapStylesForm";

declare function require(path: string): any;

const App = ({}) => {
  const mapRef = useRef();
  const inputUsername = useRef(null);
  const inputStyleID = useRef(null);
  const inputToken = useRef(null);

  const [styleMode, setStyleMode] = useState("mapboxStyle"); // mapboxStyle or customMapboxStyle

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
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(newViewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return setViewport({
      ...newViewport,
      ...geocoderDefaultOverrides
    });
  }, []);
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

  const onDrawMap = () => {
    let imurl = `https://api.mapbox.com/styles/v1/${
      styleMode == "customMapboxStyle" ? username : "mapbox"
    }/${
      styleMode == "customMapboxStyle" ? customStyleID : mapboxStyle
    }/static/${viewport.longitude},${viewport.latitude},${viewport.zoom},${
      viewport.bearing
    },${viewport.pitch}/${mapExportWidth}x${mapExportHeight}${
      isRetina ? "@2x" : ""
    }?access_token=${accessToken}&attribution=false&logo=false`;
    fetch(imurl)
      .then(r => r.arrayBuffer())
      .then(a =>
        parent.postMessage(
          {
            pluginMessage: {
              type: "draw-map",
              width: mapExportWidth,
              height: mapExportHeight,
              data: new Uint8Array(a)
            }
          },
          "*"
        )
      );
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = event => {
      const { type, message } = event.data.pluginMessage;
      if (type === "map-drawed") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  useEffect(() => {});

  return (
    <div className="main-wrapper">
      <FormPanel />
      <Map />
      <MapMarkersForm />
      <MapStylesForm />
      {/* <img src={require('../assets/logo.svg')} /> */}
      <div className="map-wrapper">
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
      <div className="side-panel">
        <div className="form-block style-mode">
          <input
            type="radio"
            id="mapboxStyle"
            name="mapStyleSelector"
            value="mapboxStyle"
            defaultChecked={styleMode === "mapboxStyle"}
            onClick={() => {
              setStyleMode("mapboxStyle");
            }}
          />
          <label htmlFor="mapboxStyle" className="mr-3">
            {" "}
            Mapbox style
          </label>
          <input
            type="radio"
            id="customMapboxStyle"
            name="mapStyleSelector"
            value="customMapboxStyle"
            defaultChecked={styleMode === "customMapboxStyle"}
            onClick={() => {
              setStyleMode("customMapboxStyle");
            }}
          />
          <label htmlFor="customMapboxStyle"> Custom style</label>
        </div>
        <hr />
        {styleMode === "customMapboxStyle" ? (
          <div className="form-block">
            <h2>Mapbox custom style</h2>
            <label htmlFor="tokenInput">Mapbox API access token</label>
            <input
              name="tokenInput"
              id="tokenInput"
              value={accessToken}
              onChange={e => setAccessToken(e.target.value)}
              ref={inputToken}
            />

            <label htmlFor="usernameInput">Mapbox user name</label>
            <input
              name="usernameInput"
              value={username}
              onChange={e => setUsername(e.target.value)}
              ref={inputUsername}
            />

            <label htmlFor="mapStyleInput">Mapbox Style ID</label>
            <input
              name="mapStyleInput"
              value={customStyleID}
              onChange={e => setCustomStyleID(e.target.value)}
              ref={inputStyleID}
            />
          </div>
        ) : (
          <div className="form-block">
            <h2>Mapbox default styles</h2>
            <label htmlFor="mapbox-styles">Map style</label>
            <select
              name="mapbox-styles"
              id="mapbox-styles"
              onChange={e => setMapboxStyle(e.currentTarget.value)}
              defaultValue={mapboxStyle}
            >
              <option value="streets-v11">streets</option>
              <option value="light-v10">light</option>
              <option value="dark-v10">dark</option>
              <option value="outdoors-v11">outdoors</option>
              <option value="satellite-v9">satellite</option>
            </select>
          </div>
        )}

        <hr />
        <div className="form-block">
          <h2>Map properties</h2>
          <div className="container-fluid p-0">
            <div className="row custom-gutter">
              <div className="col-6">
                <label htmlFor="latitude">Latitude</label>
                <input
                  title="Between -85 and 85"
                  type="number"
                  min="-85"
                  max="85"
                  step="any"
                  name="latitude"
                  value={viewport.latitude}
                  onChange={e => {
                    if (Number(e.target.value) > 85) {
                      handleViewportChange(e, 85);
                    } else if (Number(e.target.value) < -85) {
                      handleViewportChange(e, -85);
                    } else {
                      handleViewportChange(e, e.target.value);
                    }
                  }}
                />
              </div>
              <div className="col-6">
                <label htmlFor="longitude">Longitude</label>
                <input
                  title="Between -180 and 180"
                  type="number"
                  min="-180"
                  max="180"
                  step="any"
                  name="longitude"
                  value={viewport.longitude}
                  onChange={e => {
                    if (Number(e.target.value) > 180) {
                      handleViewportChange(e, 180);
                    } else if (Number(e.target.value) < -180) {
                      handleViewportChange(e, -180);
                    } else {
                      handleViewportChange(e, e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="form-block">
          <div className="container-fluid p-0">
            <div className="row custom-gutter">
              <div className="col-4">
                <label htmlFor="zoom">Zoom</label>
                <input
                  title="Between 0 and 22"
                  type="number"
                  min="0"
                  max="22"
                  step="any"
                  name="zoom"
                  value={viewport.zoom}
                  onChange={e => {
                    if (Number(e.target.value) > 22) {
                      handleViewportChange(e, 22);
                    } else if (Number(e.target.value) < 0) {
                      handleViewportChange(e, 0);
                    } else {
                      handleViewportChange(e, e.target.value);
                    }
                  }}
                />
              </div>
              <div className="col-4">
                <label htmlFor="pitch">Pitch</label>
                <input
                  title="Between 0 and 60"
                  type="number"
                  min="0"
                  max="60"
                  step="any"
                  name="pitch"
                  value={viewport.pitch}
                  onChange={e => {
                    if (Number(e.target.value) > 60) {
                      handleViewportChange(e, 60);
                    } else if (Number(e.target.value) < 0) {
                      handleViewportChange(e, 0);
                    } else {
                      handleViewportChange(e, e.target.value);
                    }
                  }}
                />
              </div>
              <div className="col-4">
                <label htmlFor="bearing">Bearing</label>
                <input
                  title="Between -180 and 180"
                  type="number"
                  min="-180"
                  max="180"
                  step="any"
                  name="bearing"
                  value={viewport.bearing}
                  onChange={e => {
                    if (Number(e.target.value) > 180) {
                      handleViewportChange(e, 180);
                    } else if (Number(e.target.value) < -180) {
                      handleViewportChange(e, -180);
                    } else {
                      handleViewportChange(e, e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="form-block">
          <h2>Image size</h2>
          <div className="container-fluid p-0">
            <div className="row custom-gutter">
              <div className="col-4">
                <label htmlFor="mapWidth">Width</label>
                <input
                  type="number"
                  min="1"
                  max="1280"
                  step="any"
                  name="mapWidth"
                  title="Max. 1280"
                  value={mapExportWidth}
                  onChange={e => {
                    if (Number(e.target.value) > 1280) {
                      setMapExportWidth(1280);
                    } else if (Number(e.target.value) < 1) {
                      setMapExportWidth(1);
                    } else {
                      setMapExportWidth(Number(e.target.value));
                    }
                  }}
                />
              </div>
              <div className="col-4">
                <label htmlFor="mapHeight">Height</label>
                <input
                  type="number"
                  min="1"
                  max="1280"
                  step="any"
                  name="mapHeight"
                  title="Max. 1280"
                  value={mapExportHeight}
                  onChange={e => {
                    if (Number(e.target.value) > 1280) {
                      setMapExportHeight(1280);
                    } else if (Number(e.target.value) < 1) {
                      setMapExportHeight(1);
                    } else {
                      setMapExportHeight(Number(e.target.value));
                    }
                  }}
                />
              </div>
              <div className="col-4 retina-check">
                <input
                  type="checkbox"
                  name="retinaCheck"
                  checked={isRetina}
                  onChange={onToggleRetina}
                />
                <label htmlFor="retinaCheck"> @2x</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="side-panel__footer p-2">
        <button id="draw-map" className="primary" onClick={onDrawMap}>
          Draw map to Figma
        </button>
      </div>
    </div>
  );
};

export default App;

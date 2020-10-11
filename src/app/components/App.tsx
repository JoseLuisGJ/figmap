import * as React from "react";
import { useState, useEffect, useRef } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "../styles/ui.css";

declare function require(path: string): any;

const App = ({}) => {
  const inputUsername = useRef(null);
  const inputStyleID = useRef(null);
  const inputToken = useRef(null);

  const [styleMode, setStyleMode] = useState("customMapboxStyle"); // mapboxStyle

  let [viewport, setViewport] = useState({
    longitude: -77.03968,
    latitude: 38.89744,
    zoom: 8,
    bearing: 0,
    pitch: 0,
    width: 560,
    height: 560
  });
  const handleViewportChange = e => {
    setViewport({
      ...viewport,
      [e.target.name]: Number(e.target.value)
    });
  };
  const [mapExportWidth, setMapExportWidth] = useState(800);
  const [mapExportHeight, setMapExportHeight] = useState(600);
  const [isRetina, setIsRetina] = useState(false);
  const onToggleRetina = () => {
    setIsRetina(!isRetina);
  };

  const [username, setUsername] = useState("qatium");
  const [customStyleID, setCustomStyleID] = useState(
    "ckaf3fzi6200k1ipufjkbt50v"
  );
  const [mapboxStyle, setMapboxStyle] = useState("streets-v11");
  const [accessToken, setAccessToken] = useState(
    "pk.eyJ1IjoicWF0aXVtIiwiYSI6ImNrM2lrNzE1djA4a3ozY2xjeDFiMzA3b24ifQ.baOd_O4sWca3ma4klyW7Mw"
  );

  const onDrawMap = () => {
    let imurl = `https://api.mapbox.com/styles/v1/${username}/${customStyleID}/static/${
      viewport.longitude
    },${viewport.latitude},${viewport.zoom},${viewport.bearing},${
      viewport.pitch
    }/${mapExportWidth}x${mapExportHeight}${
      isRetina ? "@2x" : ""
    }?access_token=${accessToken}`;
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
      {/* <img src={require('../assets/logo.svg')} /> */}
      <div className="map-wrapper">
        <ReactMapGL
          {...viewport}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapboxApiAccessToken={accessToken}
          mapStyle={`mapbox://styles/${
            styleMode == "customMapboxStyle" ? username : "mapbox"
          }/${styleMode == "customMapboxStyle" ? customStyleID : mapboxStyle}`}
          width="100%"
          height="100%"
        />
      </div>
      <div className="side-panel">
        <div className="form-block style-mode">
          <input
            type="radio"
            id="mapboxStyle"
            name="mapStyleSelector"
            value="mapboxStyle"
            checked={styleMode === "mapboxStyle"}
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
            checked={styleMode === "customMapboxStyle"}
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
                  name="latitude"
                  value={viewport.latitude}
                  onChange={handleViewportChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="longitude">Longitude</label>
                <input
                  name="longitude"
                  value={viewport.longitude}
                  onChange={handleViewportChange}
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
                  name="zoom"
                  value={viewport.zoom}
                  onChange={handleViewportChange}
                />
              </div>
              <div className="col-4">
                <label htmlFor="pitch">Pitch</label>
                <input
                  name="pitch"
                  value={viewport.pitch}
                  onChange={handleViewportChange}
                />
              </div>
              <div className="col-4">
                <label htmlFor="bearing">Bearing</label>
                <input
                  name="bearing"
                  value={viewport.bearing}
                  onChange={handleViewportChange}
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
                  name="mapWidth"
                  title="Max. 1280"
                  value={mapExportWidth}
                  onChange={e => setMapExportWidth(Number(e.target.value))}
                />
              </div>
              <div className="col-4">
                <label htmlFor="mapHeight">Height</label>
                <input
                  name="mapHeight"
                  title="Max. 1280"
                  value={mapExportHeight}
                  onChange={e => setMapExportHeight(Number(e.target.value))}
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

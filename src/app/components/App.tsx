import * as React from "react";
import "../styles/ui.css";

declare function require(path: string): any;

const App = ({}) => {
  const textbox = React.useRef<HTMLInputElement>(undefined);
  let mapStyle;
  let accessToken;
  let username;
  let style_id;
  let overlay;
  let lng = "-77.03968";
  let lat = "38.89744";
  let zoom = 9;
  let bearing = 0;
  let pitch = 0;
  let auto;
  let width = 800;
  let height = 800;
  let retina = true ? "@2x" : "";
  let attribution = false;
  let logo = false;
  let map;

  const onDrawMap = React.useCallback(() => {
    // Retrive statica map from mapbox style https://docs.mapbox.com/api/maps/#retrieve-a-static-map-from-a-style
    zoom = map.getZoom();
    pitch = map.getPitch();
    bearing = map.getBearing();
    lng = map.getCenter().lng;
    lat = map.getCenter().lat;
    let imurl = `https://api.mapbox.com/styles/v1/${username}/${style_id}/static/${lng},${lat},${zoom},${bearing},${pitch}/${width}x${height}${retina}?access_token=${accessToken}`;
    fetch(imurl)
      .then(r => r.arrayBuffer())
      .then(a =>
        parent.postMessage(
          { pluginMessage: { type: "draw-map", data: new Uint8Array(a) } },
          "*"
        )
      );
  }, []);

  const onGetMap = React.useCallback(() => {
    // Get values from inputs
    username = document.getElementById("usernameInput").value;
    style_id = document.getElementById("mapStyleInput").value;
    accessToken = document.getElementById("tokenInput").value;
    // Draw Mapbox map
    mapboxgl.accessToken = accessToken;
    map = new mapboxgl.Map({
      container: "map", // container id
      style: `mapbox://styles/${username}/${style_id}`, // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom // starting zoom
    });
    map.on("load", function() {
      map.resize();
    });
  }, []);

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = event => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-rectangles") {
        console.log(`Figma Says: ${message}`);
      }
    };
    onGetMap();
  }, []);

  return (
    <div className="main-wrapper">
      {/* <img src={require('../assets/logo.svg')} /> */}
      <div className="map-wrapper">
        <div id="map">Map here</div>
      </div>
      <div className="side-panel">
        <label htmlFor="tokenInput">Mapbox API access token</label>
        <input
          name="tokenInput"
          id="tokenInput"
          value="pk.eyJ1IjoicWF0aXVtIiwiYSI6ImNrM2lrNzE1djA4a3ozY2xjeDFiMzA3b24ifQ.baOd_O4sWca3ma4klyW7Mw"
        />

        <label htmlFor="usernameInput">Mapbox user name</label>
        <input name="usernameInput" id="usernameInput" value="qatium" />

        <label htmlFor="mapStyleInput">Mapbox Style ID</label>
        <input
          name="mapStyleInput"
          id="mapStyleInput"
          value="ckaf3fzi6200k1ipufjkbt50v"
        />

        <div className="side-panel__footer">
          <button id="get-map" onClick={onGetMap}>
            Get Map from Mapbox
          </button>
          <button id="draw-map" className="primary" onClick={onDrawMap}>
            Draw map to Figma
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

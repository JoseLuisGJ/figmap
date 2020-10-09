import * as React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/ui.css";

declare function require(path: string): any;

const App = ({}) => {
  let retina = true ? "@2x" : "";
  const [viewport, setViewport] = useState({
    longitude: -77.03968,
    latitude: 38.89744,
    zoom: 8,
    bearing: 0,
    pitch: 0,
    width: 560,
    height: 560
  });

  const [username, setUsername] = useState("qatium");
  const [style_id, setStyleID] = useState("ckaf3fzi6200k1ipufjkbt50v");
  const [accessToken, setAccessToken] = useState(
    "pk.eyJ1IjoicWF0aXVtIiwiYSI6ImNrM2lrNzE1djA4a3ozY2xjeDFiMzA3b24ifQ.baOd_O4sWca3ma4klyW7Mw"
  );

  const onDrawMap = React.useCallback(() => {
    // TODO no coge los valores actualizados del viewport. O no leo bien los valores actualizados o no se actualizan mediante:  onViewportChange={nextViewport => setViewport(nextViewport)}
    let imurl = `https://api.mapbox.com/styles/v1/${username}/${style_id}/static/${viewport.longitude},${viewport.latitude},${viewport.zoom},${viewport.bearing},${viewport.pitch}/${viewport.width}x${viewport.height}${retina}?access_token=${accessToken}`;
    fetch(imurl)
      .then(r => r.arrayBuffer())
      .then(a =>
        parent.postMessage(
          { pluginMessage: { type: "draw-map", data: new Uint8Array(a) } },
          "*"
        )
      );
  }, []);

  const onGetMap = React.useCallback(() => {}, []);

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = event => {
      const { type, message } = event.data.pluginMessage;
      if (type === "map-drawed") {
        console.log(`Figma Says: ${message}`);
      }
    };
    onGetMap();
  }, []);

  return (
    <div className="main-wrapper">
      {/* <img src={require('../assets/logo.svg')} /> */}
      <div className="map-wrapper">
        <ReactMapGL
          {...viewport}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapboxApiAccessToken={accessToken}
          mapStyle={`mapbox://styles/${username}/${style_id}`}
          width="100%"
          height="100%"
        />
      </div>
      <div className="side-panel">
        <label htmlFor="tokenInput">Mapbox API access token</label>
        <input
          name="tokenInput"
          id="tokenInput"
          value="pk.eyJ1IjoicWF0aXVtIiwiYSI6ImNrM2lrNzE1djA4a3ozY2xjeDFiMzA3b24ifQ.baOd_O4sWca3ma4klyW7Mw"
          onChange={e => setAccessToken(e.target.value)}
        />

        <label htmlFor="usernameInput">Mapbox user name</label>
        <input
          name="usernameInput"
          value="qatium"
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="mapStyleInput">Mapbox Style ID</label>
        <input
          name="mapStyleInput"
          value="ckaf3fzi6200k1ipufjkbt50v"
          onChange={e => setStyleID(e.target.value)}
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

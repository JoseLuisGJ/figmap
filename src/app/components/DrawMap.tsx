import * as React from "react";
import { useEffect } from "react";
import * as mixpanel from "mixpanel-figma";

interface IMap {
  username: any;
  styleMode: any;
  customStyleID: any;
  mapboxStyle: any;
  viewport: any;
  mapExportWidth: any;
  mapExportHeight: any;
  isRetina: any;
  accessToken: any;
  stateMarkers: any;
  markerImg: any;
  editor: any;
}

const DrawMap: React.FC<IMap> = ({
  username,
  styleMode,
  customStyleID,
  mapboxStyle,
  viewport,
  mapExportWidth,
  mapExportHeight,
  isRetina,
  accessToken,
  stateMarkers,
  markerImg,
  editor
}) => {
  useEffect(() => {});

  const onDrawMap = () => {
    mixpanel.track("map-drown");
    console.log("onDrawMap =>", stateMarkers);
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
              data: new Uint8Array(a),
              markers: stateMarkers,
              markerImg: markerImg
            }
          },
          "*"
        )
      );
  };

  return (
    <div>
      <div className="side-panel__footer p-2">
        <button id="draw-map" className="primary" onClick={onDrawMap}>
          Draw map to {editor === "figma" ? <>Figma</> : <>FigJam</>}
        </button>
      </div>
    </div>
  );
};
export default DrawMap;

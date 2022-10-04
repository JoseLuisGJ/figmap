import * as React from "react";
import { useEffect } from "react";
import Dropzone from 'react-dropzone'
import gpxParser from "gpxParser";

interface IMap {
  setMarkerImg: any;
  figmaComponents: any;
  stateMarkers: any;
  setStateMarkers: any;
}

const MapMarkerForm: React.FC<IMap> = ({ setMarkerImg, stateMarkers, setStateMarkers, figmaComponents }) => {
  useEffect(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "get-components"
        }
      },
      "*"
    );
    // console.log("loop", figmaComponents); // uncontrolled loop
  }, [figmaComponents]);

  const onDropGPX = (file) => {
    var reader = new FileReader();
    reader.onload = function(event) {
      let contents = event.target.result;
      let gpx = new gpxParser();
      gpx.parse("" + contents);

      let newMarkers = gpx.waypoints.map(
        waypoint => ({
          longitude: waypoint.lon,
          latitude: waypoint.lat,
          icon: null
        })
      );

      setStateMarkers(stateMarkers.concat(newMarkers));
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <div className="form-block markers-mode">
        <p>
          Click over map to create your markers. Then link your custom Figma
          component or start from scratch.
        </p>
        <p>
          OR
        </p>
        <Dropzone onDrop={acceptedFiles => {onDropGPX(acceptedFiles[0])}}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="form-block drag-and-drop-zone">Drag and drop file with markers in GPX format.</p>
              </div>
            </section>
          )}
        </Dropzone>

        <label htmlFor="marker-component">Marker component</label>
        <select
          name="marker-component"
          id="marker-component"
          onChange={e => {
            setMarkerImg(e.currentTarget.value);
          }}
          defaultValue="1"
        >
          <option value="1">Default marker</option>
          {figmaComponents.map((localState, index) => (
            <option key={index} value={localState}>
              {localState}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default MapMarkerForm;

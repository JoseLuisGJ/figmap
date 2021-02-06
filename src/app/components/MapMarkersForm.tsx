import * as React from "react";
import { useEffect } from "react";

interface IMap {
  setMarkerImg: any;
  figmaComponents: any;
}

const MapMarkerForm: React.FC<IMap> = ({ setMarkerImg, figmaComponents }) => {
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

  return (
    <div>
      <div className="form-block markers-mode">
        <p>
          Click over map to create your markers. Then link your custom Figma
          component or start from scratch.
        </p>
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

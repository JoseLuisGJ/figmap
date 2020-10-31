import * as React from "react";
import { useEffect } from "react";

interface IMap {
  setMarkerImg: any;
}

const MapMarkerForm: React.FC<IMap> = ({ setMarkerImg }) => {
  useEffect(() => {});

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
            parent.postMessage(
              {
                pluginMessage: {
                  type: "get-components"
                }
              },
              "*"
            );
          }}
          defaultValue="1"
        >
          <option value="1">Default component</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>
  );
};
export default MapMarkerForm;

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
          onChange={e => setMarkerImg(e.currentTarget.value)}
        >
          <option value="default">Default component</option>
        </select>
      </div>
    </div>
  );
};
export default MapMarkerForm;

import * as React from "react";
import { useEffect } from "react";

interface IMap {
  setMapExportWidth: any;
  setMapExportHeight: any;
  mapExportWidth: any;
  mapExportHeight: any;
  isRetina: any;
  onToggleRetina: any;
}

const ImageSizeForm: React.FC<IMap> = ({
  setMapExportWidth,
  setMapExportHeight,
  mapExportWidth,
  mapExportHeight,
  isRetina,
  onToggleRetina
}) => {
  useEffect(() => {});

  return (
    <div>
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
  );
};
export default ImageSizeForm;

import * as React from "react";
import { useEffect } from "react";

interface IMap {
  handleViewportChange: any;
  viewport: any;
}

const MapPropertiesForm: React.FC<IMap> = ({
  viewport,
  handleViewportChange
}) => {
  useEffect(() => {});

  return (
    <div>
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
    </div>
  );
};
export default MapPropertiesForm;

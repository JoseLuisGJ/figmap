import * as React from "react";
import { useEffect } from "react";

interface IMap {
  styleMode: String; // try not to use any.
  accessToken: any;
  username: any;
  customStyleID: any;
  mapboxStyle: any;
  setAccessToken: any;
  setUsername: any;
  inputToken: any;
  inputUsername: any;
  inputStyleID: any;
  setCustomStyleID: any;
  setMapboxStyle: any;
  setStyleMode: any;
}

const MapStylesForm: React.FC<IMap> = ({
  styleMode,
  accessToken,
  username,
  customStyleID,
  mapboxStyle,
  setAccessToken,
  setUsername,
  inputToken,
  inputUsername,
  inputStyleID,
  setCustomStyleID,
  setMapboxStyle,
  setStyleMode
}) => {
  useEffect(() => {});

  return (
    <div>
      <div className="form-block style-mode">
        <input
          type="radio"
          id="mapboxStyle"
          name="mapStyleSelector"
          value="mapboxStyle"
          defaultChecked={styleMode === "mapboxStyle"}
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
          defaultChecked={styleMode === "customMapboxStyle"}
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
          <div className="container-fluid p-0">
            <div className="row custom-gutter">
              <div className="col-6">
                <label htmlFor="usernameInput">Mapbox user name</label>
                <input
                  name="usernameInput"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  ref={inputUsername}
                />
              </div>
              <div className="col-6">
                <label htmlFor="mapStyleInput">Mapbox Style ID</label>
                <input
                  name="mapStyleInput"
                  value={customStyleID}
                  onChange={e => setCustomStyleID(e.target.value)}
                  ref={inputStyleID}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-block">
          <h2>Mapbox default styles</h2>
          <label htmlFor="mapbox-styles">Map style</label>
          <select
            name="mapbox-styles"
            id="mapbox-styles"
            onChange={e => setMapboxStyle(e.currentTarget.value)}
            defaultValue={mapboxStyle}
          >
            <option value="streets-v11">streets</option>
            <option value="light-v10">light</option>
            <option value="dark-v10">dark</option>
            <option value="outdoors-v11">outdoors</option>
            <option value="satellite-v9">satellite</option>
          </select>
        </div>
      )}
    </div>
  );
};
export default MapStylesForm;

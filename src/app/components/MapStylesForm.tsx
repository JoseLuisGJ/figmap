import * as React from "react";
import { useEffect } from "react";
import * as mixpanel from "mixpanel-figma";

interface IMap {
  styleMode: String; // try not to use any.
  username: any;

  customStyleID: any;
  mapboxStyle: any;
  setUsername: any;
  setAccessToken: any;
  inputUsername: any;
  inputToken: any;
  inputStyleID: any;
  setCustomStyleID: any;
  setMapboxStyle: any;
  setStyleMode: any;
  accessToken: any;
}

const MapStylesForm: React.FC<IMap> = ({
  styleMode,
  username,
  customStyleID,
  mapboxStyle,
  setUsername,
  inputUsername,
  inputStyleID,
  setCustomStyleID,
  setAccessToken,
  inputToken,
  setMapboxStyle,
  setStyleMode,
  accessToken
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
            mixpanel.track("mapbox-default-styles");
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
            mixpanel.track("custom-mapbox-style");
          }}
        />
        <label htmlFor="customMapboxStyle"> Custom style</label>
      </div>
      <hr />
      {styleMode === "customMapboxStyle" ? (
        <div className="form-block">
          <h2>Mapbox custom style</h2>

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
          <label htmlFor="tokenInput">Mapbox API access token</label>
          <input
            name="tokenInput"
            id="tokenInput"
            onChange={e => setAccessToken(e.target.value)}
            value={accessToken}
            ref={inputToken}
            placeholder="⚠️ Leave empty to use plugin token"
          />
        </div>
      ) : (
        <div className="form-block">
          <h2>Mapbox default styles</h2>
          <label htmlFor="mapbox-styles">Map style</label>
          <select
            name="mapbox-styles"
            id="mapbox-styles"
            onChange={e => {
              setMapboxStyle(e.currentTarget.value);
              mixpanel.track("mapbox-style-selected", {
                value: e.currentTarget.value
              });
            }}
            defaultValue={mapboxStyle}
          >
            <option value="streets-v12">Streets</option>
            <option value="outdoors-v12">Outdoors</option>
            <option value="light-v11">Light</option>
            <option value="dark-v11">Dark</option>
            <option value="satellite-v9">Satellite</option>
            <option value="satellite-streets-v12">Satellite Streets</option>
            <option value="navigation-day-v1">Navigation Day</option>
            <option value="navigation-night-v1">Navigation Night</option>
          </select>
        </div>
      )}
    </div>
  );
};
export default MapStylesForm;

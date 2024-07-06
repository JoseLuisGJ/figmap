import * as React from "react";
import { useState } from "react";
import {
  useControl,
  Marker,
  MarkerProps,
  ControlPosition
} from "react-map-gl/dist/es5";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";

type GeocoderControlProps = Omit<
  GeocoderOptions,
  "accessToken" | "mapboxgl" | "marker"
> & {
  mapboxAccessToken: string;
  marker?: boolean | Omit<MarkerProps, "longitude" | "latitude">;
  position: ControlPosition;
  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
};

export default function GeocoderControl({
  mapboxAccessToken,
  marker = true, // Default value set here
  position,
  onLoading = () => {}, // Default function
  onResults = () => {}, // Default function
  onResult = () => {}, // Default function
  onError = () => {}, // Default function
  ...props
}: GeocoderControlProps) {
  const [markerState, setMarker] = useState(null);
  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: mapboxAccessToken
      });
      ctrl.on("loading", onLoading);
      ctrl.on("results", onResults);
      ctrl.on("result", evt => {
        onResult(evt);
        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location && marker) {
          setMarker(
            <Marker
              {...(marker === true ? {} : marker)}
              longitude={location[0]}
              latitude={location[1]}
            />
          );
        } else {
          setMarker(null);
        }
      });
      ctrl.on("error", onError);
      return ctrl;
    },
    { position }
  );
  // Additional logic for updating geocoder properties
  return markerState;
}

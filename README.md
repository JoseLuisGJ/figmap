# Figmap

This plugin let you get an image from the main Mapbox default styles or your custom map style created in Mapbox Studio.
You can change the map properties like latitude, longitude, zoom, bearing or pitch over the map or using the field controls.

Also you can configure the width, height and retina ready of the image to get in Figma.
Get in mind the image obtained in Figma doesn't have Mapbox logo neither attribution. Please read the [Mapbox privacy policy about it](https://docs.mapbox.com/help/how-mapbox-works/attribution/#static--print).

Version 2 will let you create markers with a simple drawing tool or copy and pasting geojson data in different layers. Then you will be able to link this markers to your Figma components.

![Figmap Mockup](https://github.com/ergum/figmap/blob/master/src/app/assets/FigmapMockup.gif?raw=true) 


Template based on [Figma Plugin React Template](https://github.com/nirsky/figma-plugin-react-template) This template contains the react example as shown on [Figma Docs](https://www.figma.com/plugin-docs/intro/), with some structural changes and extra tooling.

## Quickstart
* Run `yarn` to install dependencies.
* Run `yarn build:watch` to start webpack in watch mode.
* Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Toolings
This repo is using:
* React + Webpack
* TypeScript
* Prettier precommit hook

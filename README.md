# Figmap

The main goal of this plugin is to get any custom styled map from Mapbox and get an image from it to Figma. Then the further steps will be create a data layers feeded by geoJson files or content to draw batched markers and transform them in Figma components.

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

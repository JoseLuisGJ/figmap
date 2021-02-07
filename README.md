# Figmap plugin
### Fully customizable styled maps and markers for Figma
![Figmap Mockup](https://github.com/ergum/figmap/blob/master/src/app/assets/Figmap-cover.jpg?raw=true) 

[Go to Figmap](https://www.figma.com/community/plugin/937760472566581732/Figmap)

Get an image from Mapbox default styles or your custom map style created with [Mapbox Studio](https://www.mapbox.com/mapbox-studio). You can change the map properties like latitude, longitude, zoom, bearing or pitch over the map or using the field controls. Also you can configure the width, height and retina ready of the image to get it in Figma.

Besides you can add markers linked to your existing Figma components or create a default one from scratch

Get in mind the image obtained in Figma doesn't have Mapbox logo neither attribution. Please read the [Mapbox privacy policy about it](https://docs.mapbox.com/help/how-mapbox-works/attribution/#static--print).

Template based on [Figma Plugin React Template](https://github.com/nirsky/figma-plugin-react-template) This template contains the react example as shown on [Figma Docs](https://www.figma.com/plugin-docs/intro/), with some structural changes and extra tooling.

## Figmap in action
![Figmap in action](https://github.com/ergum/figmap/blob/master/src/app/assets/FigmapInAction.gif?raw=true) 
## Quickstart
* Run `yarn` to install dependencies.
* Run `yarn build:watch` to start webpack in watch mode.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Toolings
This repo is using:
* React + Webpack
* TypeScript
* Prettier precommit hook
#### Thanks to 

[Xiaoji Chen @Pessimistress](https://github.com/Pessimistress).
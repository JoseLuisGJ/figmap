const pluginWidth = 800;
const pluginHeight = 560;
const mapBoundary = 560;
const markerSVG: string = `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.56215 19.3143C7.95734 19.3143 15.0186 11.7697 15.0186 7.65163C15.0186 3.53355 11.6802 0.19519 7.56215 0.19519C3.44407 0.19519 0.105713 3.53355 0.105713 7.65163C0.105713 11.7697 7.16697 19.3143 7.56215 19.3143ZM7.56216 11.3811C9.65003 11.3811 11.3426 9.68851 11.3426 7.60064C11.3426 5.51277 9.65003 3.82022 7.56216 3.82022C5.4743 3.82022 3.78175 5.51277 3.78175 7.60064C3.78175 9.68851 5.4743 11.3811 7.56216 11.3811Z" fill="#1DAEEF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.105713 7.65163C0.105713 11.7697 7.16697 19.3143 7.56215 19.3143L7.56215 11.3811C5.47429 11.381 3.78175 9.6885 3.78175 7.60064C3.78175 5.51278 5.47429 3.82023 7.56215 3.82022L7.56215 0.19519C3.44407 0.19519 0.105713 3.53355 0.105713 7.65163Z" fill="#3EC3FF"/>
</svg>`;
const allComponents = figma.root.findAll(c => c.type === "COMPONENT");
const allComponentsName = allComponents.map(component => component.name);
//console.log("==>", allComponentsName);
figma.showUI(__html__, {
  width: pluginWidth,
  height: pluginHeight
});

figma.ui.onmessage = msg => {
  if (msg.type === "draw-map") {
    let mapWidthOffset = (mapBoundary - msg.width) / 2;
    let mapHeightOffset = (mapBoundary - msg.height) / 2;
    if (figma.editorType == "figma") {
      // Figma drawing
      /////////
      // Map //
      /////////
      const nodes = [];
      let imageHash = figma.createImage(msg.data).hash;
      const rect = figma.createRectangle();
      rect.name = "Basemap image";
      rect.resize(msg.width, msg.height);
      rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
      figma.currentPage.appendChild(rect);
      // select the rectangle and focus the viewport
      figma.currentPage.selection = [rect];
      figma.viewport.scrollAndZoomIntoView([rect]);
      nodes.push(rect);
      /////////////
      // Markers //
      /////////////

      if (msg.markerImg == 1) {
        // default marker option
        // Create Master component
        const markerComponent = figma.createComponent();
        markerComponent.resize(16, 20);
        markerComponent.name = "Default marker component";
        let nodeSVG = figma.createNodeFromSvg(markerSVG);
        markerComponent.appendChild(nodeSVG);
        markerComponent.x = -100;
        markerComponent.y = -100;
        figma.currentPage.appendChild(markerComponent);
        // Instances from master component
        msg.markers.map(marker => {
          let instanceMarker = markerComponent.createInstance();
          instanceMarker.x = marker.x - mapWidthOffset;
          instanceMarker.y = marker.y - mapHeightOffset;
          instanceMarker.x -= instanceMarker.width / 2;
          instanceMarker.y -= instanceMarker.height / 2;
          figma.currentPage.appendChild(instanceMarker);
          nodes.push(instanceMarker);
        });
      } else {
        //Selected custom component
        let selectedComponent = figma.root.findAll(
          c => c.name === msg.markerImg && c.type === "COMPONENT"
        );
        msg.markers.map(marker => {
          // @ts-ignore: Unreachable code error
          let instanceMarker = selectedComponent[0].createInstance();
          instanceMarker.x = marker.x - mapWidthOffset;
          instanceMarker.y = marker.y - mapHeightOffset;
          instanceMarker.x -= instanceMarker.width / 2;
          instanceMarker.y -= instanceMarker.height / 2;

          if (marker.name) {
            for (var customProperty of instanceMarker.componentProperties) {
              if (customProperty["type"] == "TEXT") {
                instanceMarker.setProperties({
                  customProperty: marker.name
                });
                break;
              }
            }
          }
          figma.currentPage.appendChild(instanceMarker);
          nodes.push(instanceMarker);
        });
      }

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
      const groupContainer = figma.group(nodes, figma.currentPage);
      groupContainer.name = "Figmap";

      ////////////////////
      // Figma response //
      ////////////////////
      figma.ui.postMessage({
        type: "map-drawed",
        message: `Map drawed in Figma`
      });
      //console.log("allComponents ", allComponents);

      //////////////////
      // Close plugin //
      //////////////////
      figma.closePlugin();
    } else {
      // FigJam drawing
      const nodes = [];
      let imageHash = figma.createImage(msg.data).hash;
      const rect = figma.createRectangle();
      rect.name = "Basemap image";
      rect.resize(msg.width, msg.height);
      rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
      nodes.push(rect);
      figma.currentPage.appendChild(rect);
      // select the rectangle and focus the viewport
      figma.currentPage.selection = [rect];
      figma.viewport.scrollAndZoomIntoView([rect]);

      msg.markers.map(marker => {
        let nodeSVG = figma.createNodeFromSvg(markerSVG);
        figma.currentPage.appendChild(nodeSVG);

        nodeSVG.x = marker.x - mapWidthOffset;
        nodeSVG.y = marker.y - mapHeightOffset;
        nodeSVG.x -= 10;
        nodeSVG.y -= 8;
        nodes.push(nodeSVG);
      });
      figma.group(nodes, figma.currentPage);

      figma.closePlugin();
    }
  }
  if (msg.type === "get-components") {
    ////////////////////
    // Figma response //
    ////////////////////
    figma.ui.postMessage({
      type: "components-response",
      message: allComponentsName
    });
  }
  if (msg.type === "notification") {
    const notificationHandler = figma.notify("GPX file loaded", {
      timeout: 6000
    });
    return function(): void {
      notificationHandler.cancel();
    };
  }
  if (msg.type === "update-storage") {
    figma.clientStorage.setAsync("_username", msg.user);
    figma.clientStorage.setAsync("_customStyleID", msg.style);
  }
  if (msg.type === "read-storage") {
    figma.clientStorage.getAsync("_username").then(result => {
      figma.ui.postMessage({
        type: "fetched username",
        storage: result
      });
    });
    figma.clientStorage.getAsync("_customStyleID").then(result => {
      figma.ui.postMessage({
        type: "fetched custom style",
        storage: result
      });
    });
    // figma.notify("We restored your map. Default values were: 'ergum' 'ckg6ps8s62b5e19nrr67wqw9u'", {
    //   timeout: 6000
    // });
  }
  if (msg.type === "notify-storage") {
    figma.notify(
      "💾 We restored your Mapbox user and Style ID. Default values were: 'ergum' 'ckg6ps8s62b5e19nrr67wqw9u'",
      {
        timeout: 6000
      }
    );
  }
  if (msg.type === "ask-editorType") {
    figma.ui.postMessage({
      type: "sending-editor",
      storage: figma.editorType
    });
  }
};

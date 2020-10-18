const pluginWidth = 800;
const pluginHeight = 560;

figma.showUI(__html__, {
  width: pluginWidth,
  height: pluginHeight
});

figma.ui.onmessage = msg => {
  if (msg.type === "draw-map") {
    //Draw map image
    let imageHash = figma.createImage(msg.data).hash;
    const rect = figma.createRectangle();
    rect.resize(msg.width, msg.height);
    rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
    figma.currentPage.appendChild(rect);
    // select the rectangle and focus the viewport
    figma.currentPage.selection = [rect];
    figma.viewport.scrollAndZoomIntoView([rect]);
    // Markers
    const nodes = [];
    msg.markers.map(marker => {
      const rectMarker = figma.createRectangle();
      rectMarker.x = marker.x;
      rectMarker.y = marker.y;
      rectMarker.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rectMarker);
      nodes.push(rectMarker);
    });

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: "map-drawed",
      message: `Map drawed in Figma`
    });
  }

  figma.closePlugin();
};

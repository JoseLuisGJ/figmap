const pluginWidth = 800;
const pluginHeight = 560;

figma.showUI(__html__, {
  width: pluginWidth,
  height: pluginHeight
});

figma.ui.onmessage = msg => {
  if (msg.type === "draw-map") {
    let imageHash = figma.createImage(msg.data).hash;
    const rect = figma.createRectangle();
    rect.resize(msg.width, msg.height);
    rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
    figma.currentPage.appendChild(rect);
    // select the rectangle and focus the viewport
    figma.currentPage.selection = [rect];
    figma.viewport.scrollAndZoomIntoView([rect]);
    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: "map-drawed",
      message: `Map drawed in Figma`
    });
  }

  figma.closePlugin();
};

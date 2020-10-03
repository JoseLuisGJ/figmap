const pluginWidth = 800;
const pluginHeight = 560;

figma.showUI(__html__, {
  width: pluginWidth,
  height: pluginHeight
});

figma.ui.onmessage = msg => {
  if (msg.type === "create-rectangles") {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: "create-rectangles",
      message: `Created ${msg.count} Rectangles`
    });
  }

  if (msg.type === "draw-map") {
    let imageHash = figma.createImage(msg.data).hash;
    const rect = figma.createRectangle();
    rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
    figma.currentPage.appendChild(rect);
    // select the rectangle and focus the viewport
    figma.currentPage.selection = [rect];
    figma.viewport.scrollAndZoomIntoView([rect]);
  }

  figma.closePlugin();
};

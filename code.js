const width = 800;
const height = 560;
// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
    width: width,
    height: height
});
figma.ui.onmessage = msg => {
    if (msg.type === 'draw-map') {
        let imageHash = figma.createImage(msg.data).hash;
        const rect = figma.createRectangle();
        rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
        figma.currentPage.appendChild(rect);
        // select the rectangle and focus the viewport   
        figma.currentPage.selection = [rect];
        figma.viewport.scrollAndZoomIntoView([rect]);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};

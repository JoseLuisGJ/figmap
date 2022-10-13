/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugin/controller.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin/controller.ts":
/*!**********************************!*\
  !*** ./src/plugin/controller.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

const pluginWidth = 800;
const pluginHeight = 560;
const mapBoundary = 560;
const markerSVG = `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.56215 19.3143C7.95734 19.3143 15.0186 11.7697 15.0186 7.65163C15.0186 3.53355 11.6802 0.19519 7.56215 0.19519C3.44407 0.19519 0.105713 3.53355 0.105713 7.65163C0.105713 11.7697 7.16697 19.3143 7.56215 19.3143ZM7.56216 11.3811C9.65003 11.3811 11.3426 9.68851 11.3426 7.60064C11.3426 5.51277 9.65003 3.82022 7.56216 3.82022C5.4743 3.82022 3.78175 5.51277 3.78175 7.60064C3.78175 9.68851 5.4743 11.3811 7.56216 11.3811Z" fill="#1DAEEF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.105713 7.65163C0.105713 11.7697 7.16697 19.3143 7.56215 19.3143L7.56215 11.3811C5.47429 11.381 3.78175 9.6885 3.78175 7.60064C3.78175 5.51278 5.47429 3.82023 7.56215 3.82022L7.56215 0.19519C3.44407 0.19519 0.105713 3.53355 0.105713 7.65163Z" fill="#3EC3FF"/>
</svg>`;
const allComponents = figma.root.findAll(c => c.type === "COMPONENT");
const allComponentsName = allComponents.map(component => component.name);
figma.showUI(__html__, {
    width: pluginWidth,
    height: pluginHeight
});
figma.ui.onmessage = msg => {
    if (msg.type === "draw-map") {
        let mapWidthOffset = (mapBoundary - msg.width) / 2;
        let mapHeightOffset = (mapBoundary - msg.height) / 2;
        if (figma.editorType == "figma") {
            const nodes = [];
            let imageHash = figma.createImage(msg.data).hash;
            const rect = figma.createRectangle();
            rect.name = "Basemap image";
            rect.resize(msg.width, msg.height);
            rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
            figma.currentPage.appendChild(rect);
            figma.currentPage.selection = [rect];
            figma.viewport.scrollAndZoomIntoView([rect]);
            nodes.push(rect);
            if (msg.markerImg == 1) {
                const markerComponent = figma.createComponent();
                markerComponent.resize(16, 20);
                markerComponent.name = "Default marker component";
                let nodeSVG = figma.createNodeFromSvg(markerSVG);
                markerComponent.appendChild(nodeSVG);
                markerComponent.x = -100;
                markerComponent.y = -100;
                figma.currentPage.appendChild(markerComponent);
                msg.markers.map(marker => {
                    let instanceMarker = markerComponent.createInstance();
                    instanceMarker.x = marker.x - mapWidthOffset;
                    instanceMarker.y = marker.y - mapHeightOffset;
                    instanceMarker.x -= instanceMarker.width / 2;
                    instanceMarker.y -= instanceMarker.height / 2;
                    figma.currentPage.appendChild(instanceMarker);
                    nodes.push(instanceMarker);
                });
            }
            else {
                let selectedComponent = figma.root.findAll(c => c.name === msg.markerImg && c.type === "COMPONENT");
                msg.markers.map(marker => {
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
            figma.ui.postMessage({
                type: "map-drawed",
                message: `Map drawed in Figma`
            });
            figma.closePlugin();
        }
        else {
            const nodes = [];
            let imageHash = figma.createImage(msg.data).hash;
            const rect = figma.createRectangle();
            rect.name = "Basemap image";
            rect.resize(msg.width, msg.height);
            rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
            nodes.push(rect);
            figma.currentPage.appendChild(rect);
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
        figma.ui.postMessage({
            type: "components-response",
            message: allComponentsName
        });
    }
    if (msg.type === "notification") {
        const notificationHandler = figma.notify("GPX file loaded", {
            timeout: 6000
        });
        return function () {
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
    }
    if (msg.type === "notify-storage") {
        figma.notify("💾 We restored your Mapbox user and Style ID. Default values were: 'ergum' 'ckg6ps8s62b5e19nrr67wqw9u'", {
            timeout: 6000
        });
    }
    if (msg.type === "ask-editorType") {
        figma.ui.postMessage({
            type: "sending-editor",
            storage: figma.editorType,
        });
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNkNBQTZDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNkNBQTZDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wbHVnaW4vY29udHJvbGxlci50c1wiKTtcbiIsImNvbnN0IHBsdWdpbldpZHRoID0gODAwO1xuY29uc3QgcGx1Z2luSGVpZ2h0ID0gNTYwO1xuY29uc3QgbWFwQm91bmRhcnkgPSA1NjA7XG5jb25zdCBtYXJrZXJTVkcgPSBgPHN2ZyB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDE2IDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNy41NjIxNSAxOS4zMTQzQzcuOTU3MzQgMTkuMzE0MyAxNS4wMTg2IDExLjc2OTcgMTUuMDE4NiA3LjY1MTYzQzE1LjAxODYgMy41MzM1NSAxMS42ODAyIDAuMTk1MTkgNy41NjIxNSAwLjE5NTE5QzMuNDQ0MDcgMC4xOTUxOSAwLjEwNTcxMyAzLjUzMzU1IDAuMTA1NzEzIDcuNjUxNjNDMC4xMDU3MTMgMTEuNzY5NyA3LjE2Njk3IDE5LjMxNDMgNy41NjIxNSAxOS4zMTQzWk03LjU2MjE2IDExLjM4MTFDOS42NTAwMyAxMS4zODExIDExLjM0MjYgOS42ODg1MSAxMS4zNDI2IDcuNjAwNjRDMTEuMzQyNiA1LjUxMjc3IDkuNjUwMDMgMy44MjAyMiA3LjU2MjE2IDMuODIwMjJDNS40NzQzIDMuODIwMjIgMy43ODE3NSA1LjUxMjc3IDMuNzgxNzUgNy42MDA2NEMzLjc4MTc1IDkuNjg4NTEgNS40NzQzIDExLjM4MTEgNy41NjIxNiAxMS4zODExWlwiIGZpbGw9XCIjMURBRUVGXCIvPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTAuMTA1NzEzIDcuNjUxNjNDMC4xMDU3MTMgMTEuNzY5NyA3LjE2Njk3IDE5LjMxNDMgNy41NjIxNSAxOS4zMTQzTDcuNTYyMTUgMTEuMzgxMUM1LjQ3NDI5IDExLjM4MSAzLjc4MTc1IDkuNjg4NSAzLjc4MTc1IDcuNjAwNjRDMy43ODE3NSA1LjUxMjc4IDUuNDc0MjkgMy44MjAyMyA3LjU2MjE1IDMuODIwMjJMNy41NjIxNSAwLjE5NTE5QzMuNDQ0MDcgMC4xOTUxOSAwLjEwNTcxMyAzLjUzMzU1IDAuMTA1NzEzIDcuNjUxNjNaXCIgZmlsbD1cIiMzRUMzRkZcIi8+XG48L3N2Zz5gO1xuY29uc3QgYWxsQ29tcG9uZW50cyA9IGZpZ21hLnJvb3QuZmluZEFsbChjID0+IGMudHlwZSA9PT0gXCJDT01QT05FTlRcIik7XG5jb25zdCBhbGxDb21wb25lbnRzTmFtZSA9IGFsbENvbXBvbmVudHMubWFwKGNvbXBvbmVudCA9PiBjb21wb25lbnQubmFtZSk7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICB3aWR0aDogcGx1Z2luV2lkdGgsXG4gICAgaGVpZ2h0OiBwbHVnaW5IZWlnaHRcbn0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZHJhdy1tYXBcIikge1xuICAgICAgICBsZXQgbWFwV2lkdGhPZmZzZXQgPSAobWFwQm91bmRhcnkgLSBtc2cud2lkdGgpIC8gMjtcbiAgICAgICAgbGV0IG1hcEhlaWdodE9mZnNldCA9IChtYXBCb3VuZGFyeSAtIG1zZy5oZWlnaHQpIC8gMjtcbiAgICAgICAgaWYgKGZpZ21hLmVkaXRvclR5cGUgPT0gXCJmaWdtYVwiKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbGV0IGltYWdlSGFzaCA9IGZpZ21hLmNyZWF0ZUltYWdlKG1zZy5kYXRhKS5oYXNoO1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICAgICAgcmVjdC5uYW1lID0gXCJCYXNlbWFwIGltYWdlXCI7XG4gICAgICAgICAgICByZWN0LnJlc2l6ZShtc2cud2lkdGgsIG1zZy5oZWlnaHQpO1xuICAgICAgICAgICAgcmVjdC5maWxscyA9IFt7IHR5cGU6IFwiSU1BR0VcIiwgc2NhbGVNb2RlOiBcIkZJVFwiLCBpbWFnZUhhc2ggfV07XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtyZWN0XTtcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhbcmVjdF0pO1xuICAgICAgICAgICAgbm9kZXMucHVzaChyZWN0KTtcbiAgICAgICAgICAgIGlmIChtc2cubWFya2VySW1nID09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXJDb21wb25lbnQgPSBmaWdtYS5jcmVhdGVDb21wb25lbnQoKTtcbiAgICAgICAgICAgICAgICBtYXJrZXJDb21wb25lbnQucmVzaXplKDE2LCAyMCk7XG4gICAgICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50Lm5hbWUgPSBcIkRlZmF1bHQgbWFya2VyIGNvbXBvbmVudFwiO1xuICAgICAgICAgICAgICAgIGxldCBub2RlU1ZHID0gZmlnbWEuY3JlYXRlTm9kZUZyb21TdmcobWFya2VyU1ZHKTtcbiAgICAgICAgICAgICAgICBtYXJrZXJDb21wb25lbnQuYXBwZW5kQ2hpbGQobm9kZVNWRyk7XG4gICAgICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50LnggPSAtMTAwO1xuICAgICAgICAgICAgICAgIG1hcmtlckNvbXBvbmVudC55ID0gLTEwMDtcbiAgICAgICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChtYXJrZXJDb21wb25lbnQpO1xuICAgICAgICAgICAgICAgIG1zZy5tYXJrZXJzLm1hcChtYXJrZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5zdGFuY2VNYXJrZXIgPSBtYXJrZXJDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueCA9IG1hcmtlci54IC0gbWFwV2lkdGhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnkgPSBtYXJrZXIueSAtIG1hcEhlaWdodE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueCAtPSBpbnN0YW5jZU1hcmtlci53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnkgLT0gaW5zdGFuY2VNYXJrZXIuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQoaW5zdGFuY2VNYXJrZXIpO1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKGluc3RhbmNlTWFya2VyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZENvbXBvbmVudCA9IGZpZ21hLnJvb3QuZmluZEFsbChjID0+IGMubmFtZSA9PT0gbXNnLm1hcmtlckltZyAmJiBjLnR5cGUgPT09IFwiQ09NUE9ORU5UXCIpO1xuICAgICAgICAgICAgICAgIG1zZy5tYXJrZXJzLm1hcChtYXJrZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5zdGFuY2VNYXJrZXIgPSBzZWxlY3RlZENvbXBvbmVudFswXS5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci54ID0gbWFya2VyLnggLSBtYXBXaWR0aE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueSA9IG1hcmtlci55IC0gbWFwSGVpZ2h0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci54IC09IGluc3RhbmNlTWFya2VyLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueSAtPSBpbnN0YW5jZU1hcmtlci5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGN1c3RvbVByb3BlcnR5IG9mIGluc3RhbmNlTWFya2VyLmNvbXBvbmVudFByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tUHJvcGVydHlbXCJ0eXBlXCJdID09IFwiVEVYVFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnNldFByb3BlcnRpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUHJvcGVydHk6IG1hcmtlci5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQoaW5zdGFuY2VNYXJrZXIpO1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKGluc3RhbmNlTWFya2VyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xuICAgICAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KG5vZGVzKTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwQ29udGFpbmVyID0gZmlnbWEuZ3JvdXAobm9kZXMsIGZpZ21hLmN1cnJlbnRQYWdlKTtcbiAgICAgICAgICAgIGdyb3VwQ29udGFpbmVyLm5hbWUgPSBcIkZpZ21hcFwiO1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwibWFwLWRyYXdlZFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBNYXAgZHJhd2VkIGluIEZpZ21hYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGxldCBpbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShtc2cuZGF0YSkuaGFzaDtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgICAgIHJlY3QubmFtZSA9IFwiQmFzZW1hcCBpbWFnZVwiO1xuICAgICAgICAgICAgcmVjdC5yZXNpemUobXNnLndpZHRoLCBtc2cuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJlY3QuZmlsbHMgPSBbeyB0eXBlOiBcIklNQUdFXCIsIHNjYWxlTW9kZTogXCJGSVRcIiwgaW1hZ2VIYXNoIH1dO1xuICAgICAgICAgICAgbm9kZXMucHVzaChyZWN0KTtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKHJlY3QpO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW3JlY3RdO1xuICAgICAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KFtyZWN0XSk7XG4gICAgICAgICAgICBtc2cubWFya2Vycy5tYXAobWFya2VyID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVNWRyA9IGZpZ21hLmNyZWF0ZU5vZGVGcm9tU3ZnKG1hcmtlclNWRyk7XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQobm9kZVNWRyk7XG4gICAgICAgICAgICAgICAgbm9kZVNWRy54ID0gbWFya2VyLnggLSBtYXBXaWR0aE9mZnNldDtcbiAgICAgICAgICAgICAgICBub2RlU1ZHLnkgPSBtYXJrZXIueSAtIG1hcEhlaWdodE9mZnNldDtcbiAgICAgICAgICAgICAgICBub2RlU1ZHLnggLT0gMTA7XG4gICAgICAgICAgICAgICAgbm9kZVNWRy55IC09IDg7XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaChub2RlU1ZHKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmlnbWEuZ3JvdXAobm9kZXMsIGZpZ21hLmN1cnJlbnRQYWdlKTtcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcImdldC1jb21wb25lbnRzXCIpIHtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJjb21wb25lbnRzLXJlc3BvbnNlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBhbGxDb21wb25lbnRzTmFtZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcIm5vdGlmaWNhdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbkhhbmRsZXIgPSBmaWdtYS5ub3RpZnkoXCJHUFggZmlsZSBsb2FkZWRcIiwge1xuICAgICAgICAgICAgdGltZW91dDogNjAwMFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbkhhbmRsZXIuY2FuY2VsKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJ1cGRhdGUtc3RvcmFnZVwiKSB7XG4gICAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJfdXNlcm5hbWVcIiwgbXNnLnVzZXIpO1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwiX2N1c3RvbVN0eWxlSURcIiwgbXNnLnN0eWxlKTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcInJlYWQtc3RvcmFnZVwiKSB7XG4gICAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJfdXNlcm5hbWVcIikudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZmV0Y2hlZCB1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgIHN0b3JhZ2U6IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwiX2N1c3RvbVN0eWxlSURcIikudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZmV0Y2hlZCBjdXN0b20gc3R5bGVcIixcbiAgICAgICAgICAgICAgICBzdG9yYWdlOiByZXN1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcIm5vdGlmeS1zdG9yYWdlXCIpIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KFwi8J+SviBXZSByZXN0b3JlZCB5b3VyIE1hcGJveCB1c2VyIGFuZCBTdHlsZSBJRC4gRGVmYXVsdCB2YWx1ZXMgd2VyZTogJ2VyZ3VtJyAnY2tnNnBzOHM2MmI1ZTE5bnJyNjd3cXc5dSdcIiwge1xuICAgICAgICAgICAgdGltZW91dDogNjAwMFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcImFzay1lZGl0b3JUeXBlXCIpIHtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJzZW5kaW5nLWVkaXRvclwiLFxuICAgICAgICAgICAgc3RvcmFnZTogZmlnbWEuZWRpdG9yVHlwZSxcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
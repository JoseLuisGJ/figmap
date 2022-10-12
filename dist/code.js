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
        let mapWidthOffset = (mapBoundary - msg.width) / 2;
        let mapHeightOffset = (mapBoundary - msg.height) / 2;
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
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNkNBQTZDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wbHVnaW4vY29udHJvbGxlci50c1wiKTtcbiIsImNvbnN0IHBsdWdpbldpZHRoID0gODAwO1xuY29uc3QgcGx1Z2luSGVpZ2h0ID0gNTYwO1xuY29uc3QgbWFwQm91bmRhcnkgPSA1NjA7XG5jb25zdCBtYXJrZXJTVkcgPSBgPHN2ZyB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDE2IDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNy41NjIxNSAxOS4zMTQzQzcuOTU3MzQgMTkuMzE0MyAxNS4wMTg2IDExLjc2OTcgMTUuMDE4NiA3LjY1MTYzQzE1LjAxODYgMy41MzM1NSAxMS42ODAyIDAuMTk1MTkgNy41NjIxNSAwLjE5NTE5QzMuNDQ0MDcgMC4xOTUxOSAwLjEwNTcxMyAzLjUzMzU1IDAuMTA1NzEzIDcuNjUxNjNDMC4xMDU3MTMgMTEuNzY5NyA3LjE2Njk3IDE5LjMxNDMgNy41NjIxNSAxOS4zMTQzWk03LjU2MjE2IDExLjM4MTFDOS42NTAwMyAxMS4zODExIDExLjM0MjYgOS42ODg1MSAxMS4zNDI2IDcuNjAwNjRDMTEuMzQyNiA1LjUxMjc3IDkuNjUwMDMgMy44MjAyMiA3LjU2MjE2IDMuODIwMjJDNS40NzQzIDMuODIwMjIgMy43ODE3NSA1LjUxMjc3IDMuNzgxNzUgNy42MDA2NEMzLjc4MTc1IDkuNjg4NTEgNS40NzQzIDExLjM4MTEgNy41NjIxNiAxMS4zODExWlwiIGZpbGw9XCIjMURBRUVGXCIvPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTAuMTA1NzEzIDcuNjUxNjNDMC4xMDU3MTMgMTEuNzY5NyA3LjE2Njk3IDE5LjMxNDMgNy41NjIxNSAxOS4zMTQzTDcuNTYyMTUgMTEuMzgxMUM1LjQ3NDI5IDExLjM4MSAzLjc4MTc1IDkuNjg4NSAzLjc4MTc1IDcuNjAwNjRDMy43ODE3NSA1LjUxMjc4IDUuNDc0MjkgMy44MjAyMyA3LjU2MjE1IDMuODIwMjJMNy41NjIxNSAwLjE5NTE5QzMuNDQ0MDcgMC4xOTUxOSAwLjEwNTcxMyAzLjUzMzU1IDAuMTA1NzEzIDcuNjUxNjNaXCIgZmlsbD1cIiMzRUMzRkZcIi8+XG48L3N2Zz5gO1xuY29uc3QgYWxsQ29tcG9uZW50cyA9IGZpZ21hLnJvb3QuZmluZEFsbChjID0+IGMudHlwZSA9PT0gXCJDT01QT05FTlRcIik7XG5jb25zdCBhbGxDb21wb25lbnRzTmFtZSA9IGFsbENvbXBvbmVudHMubWFwKGNvbXBvbmVudCA9PiBjb21wb25lbnQubmFtZSk7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICB3aWR0aDogcGx1Z2luV2lkdGgsXG4gICAgaGVpZ2h0OiBwbHVnaW5IZWlnaHRcbn0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZHJhdy1tYXBcIikge1xuICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICBsZXQgaW1hZ2VIYXNoID0gZmlnbWEuY3JlYXRlSW1hZ2UobXNnLmRhdGEpLmhhc2g7XG4gICAgICAgIGNvbnN0IHJlY3QgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgcmVjdC5uYW1lID0gXCJCYXNlbWFwIGltYWdlXCI7XG4gICAgICAgIHJlY3QucmVzaXplKG1zZy53aWR0aCwgbXNnLmhlaWdodCk7XG4gICAgICAgIHJlY3QuZmlsbHMgPSBbeyB0eXBlOiBcIklNQUdFXCIsIHNjYWxlTW9kZTogXCJGSVRcIiwgaW1hZ2VIYXNoIH1dO1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW3JlY3RdO1xuICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcoW3JlY3RdKTtcbiAgICAgICAgbm9kZXMucHVzaChyZWN0KTtcbiAgICAgICAgbGV0IG1hcFdpZHRoT2Zmc2V0ID0gKG1hcEJvdW5kYXJ5IC0gbXNnLndpZHRoKSAvIDI7XG4gICAgICAgIGxldCBtYXBIZWlnaHRPZmZzZXQgPSAobWFwQm91bmRhcnkgLSBtc2cuaGVpZ2h0KSAvIDI7XG4gICAgICAgIGlmIChtc2cubWFya2VySW1nID09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlckNvbXBvbmVudCA9IGZpZ21hLmNyZWF0ZUNvbXBvbmVudCgpO1xuICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50LnJlc2l6ZSgxNiwgMjApO1xuICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50Lm5hbWUgPSBcIkRlZmF1bHQgbWFya2VyIGNvbXBvbmVudFwiO1xuICAgICAgICAgICAgbGV0IG5vZGVTVkcgPSBmaWdtYS5jcmVhdGVOb2RlRnJvbVN2ZyhtYXJrZXJTVkcpO1xuICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50LmFwcGVuZENoaWxkKG5vZGVTVkcpO1xuICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50LnggPSAtMTAwO1xuICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50LnkgPSAtMTAwO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQobWFya2VyQ29tcG9uZW50KTtcbiAgICAgICAgICAgIG1zZy5tYXJrZXJzLm1hcChtYXJrZXIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbnN0YW5jZU1hcmtlciA9IG1hcmtlckNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnggPSBtYXJrZXIueCAtIG1hcFdpZHRoT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnkgPSBtYXJrZXIueSAtIG1hcEhlaWdodE9mZnNldDtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci54IC09IGluc3RhbmNlTWFya2VyLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci55IC09IGluc3RhbmNlTWFya2VyLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQoaW5zdGFuY2VNYXJrZXIpO1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goaW5zdGFuY2VNYXJrZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb21wb25lbnQgPSBmaWdtYS5yb290LmZpbmRBbGwoYyA9PiBjLm5hbWUgPT09IG1zZy5tYXJrZXJJbWcgJiYgYy50eXBlID09PSBcIkNPTVBPTkVOVFwiKTtcbiAgICAgICAgICAgIG1zZy5tYXJrZXJzLm1hcChtYXJrZXIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbnN0YW5jZU1hcmtlciA9IHNlbGVjdGVkQ29tcG9uZW50WzBdLmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueCA9IG1hcmtlci54IC0gbWFwV2lkdGhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueSA9IG1hcmtlci55IC0gbWFwSGVpZ2h0T2Zmc2V0O1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnggLT0gaW5zdGFuY2VNYXJrZXIud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnkgLT0gaW5zdGFuY2VNYXJrZXIuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgY3VzdG9tUHJvcGVydHkgb2YgaW5zdGFuY2VNYXJrZXIuY29tcG9uZW50UHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1c3RvbVByb3BlcnR5W1widHlwZVwiXSA9PSBcIlRFWFRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnNldFByb3BlcnRpZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Qcm9wZXJ0eTogbWFya2VyLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChpbnN0YW5jZU1hcmtlcik7XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaChpbnN0YW5jZU1hcmtlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KG5vZGVzKTtcbiAgICAgICAgY29uc3QgZ3JvdXBDb250YWluZXIgPSBmaWdtYS5ncm91cChub2RlcywgZmlnbWEuY3VycmVudFBhZ2UpO1xuICAgICAgICBncm91cENvbnRhaW5lci5uYW1lID0gXCJGaWdtYXBcIjtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJtYXAtZHJhd2VkXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBgTWFwIGRyYXdlZCBpbiBGaWdtYWBcbiAgICAgICAgfSk7XG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJnZXQtY29tcG9uZW50c1wiKSB7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6IFwiY29tcG9uZW50cy1yZXNwb25zZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogYWxsQ29tcG9uZW50c05hbWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJub3RpZmljYXRpb25cIikge1xuICAgICAgICBjb25zdCBub3RpZmljYXRpb25IYW5kbGVyID0gZmlnbWEubm90aWZ5KFwiR1BYIGZpbGUgbG9hZGVkXCIsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IDYwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25IYW5kbGVyLmNhbmNlbCgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwidXBkYXRlLXN0b3JhZ2VcIikge1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwiX3VzZXJuYW1lXCIsIG1zZy51c2VyKTtcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcIl9jdXN0b21TdHlsZUlEXCIsIG1zZy5zdHlsZSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJyZWFkLXN0b3JhZ2VcIikge1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwiX3VzZXJuYW1lXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZldGNoZWQgdXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICBzdG9yYWdlOiByZXN1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcIl9jdXN0b21TdHlsZUlEXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZldGNoZWQgY3VzdG9tIHN0eWxlXCIsXG4gICAgICAgICAgICAgICAgc3RvcmFnZTogcmVzdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
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
console.log("==>", allComponentsName);
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
        figma.currentPage.selection = [rect];
        figma.viewport.scrollAndZoomIntoView([rect]);
        const nodes = [];
        let mapWidthOffset = (mapBoundary - msg.width) / 2;
        let mapHeightOffset = (mapBoundary - msg.height) / 2;
        if (msg.markerImg == 1) {
            const markerComponent = figma.createComponent();
            markerComponent.resize(16, 20);
            markerComponent.name = "Default marker component";
            let nodeSVG = figma.createNodeFromSvg(markerSVG);
            markerComponent.appendChild(nodeSVG);
            markerComponent.x = 0;
            markerComponent.y = 0;
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
                figma.currentPage.appendChild(instanceMarker);
                nodes.push(instanceMarker);
            });
        }
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
        figma.ui.postMessage({
            type: "map-drawed",
            message: `Map drawed in Figma`
        });
        console.log("allComponents ", allComponents);
        figma.closePlugin();
    }
    if (msg.type === "get-components") {
        figma.ui.postMessage({
            type: "components-response",
            message: allComponentsName
        });
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDZDQUE2QztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzXCIpO1xuIiwiY29uc3QgcGx1Z2luV2lkdGggPSA4MDA7XG5jb25zdCBwbHVnaW5IZWlnaHQgPSA1NjA7XG5jb25zdCBtYXBCb3VuZGFyeSA9IDU2MDtcbmNvbnN0IG1hcmtlclNWRyA9IGA8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMTYgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03LjU2MjE1IDE5LjMxNDNDNy45NTczNCAxOS4zMTQzIDE1LjAxODYgMTEuNzY5NyAxNS4wMTg2IDcuNjUxNjNDMTUuMDE4NiAzLjUzMzU1IDExLjY4MDIgMC4xOTUxOSA3LjU2MjE1IDAuMTk1MTlDMy40NDQwNyAwLjE5NTE5IDAuMTA1NzEzIDMuNTMzNTUgMC4xMDU3MTMgNy42NTE2M0MwLjEwNTcxMyAxMS43Njk3IDcuMTY2OTcgMTkuMzE0MyA3LjU2MjE1IDE5LjMxNDNaTTcuNTYyMTYgMTEuMzgxMUM5LjY1MDAzIDExLjM4MTEgMTEuMzQyNiA5LjY4ODUxIDExLjM0MjYgNy42MDA2NEMxMS4zNDI2IDUuNTEyNzcgOS42NTAwMyAzLjgyMDIyIDcuNTYyMTYgMy44MjAyMkM1LjQ3NDMgMy44MjAyMiAzLjc4MTc1IDUuNTEyNzcgMy43ODE3NSA3LjYwMDY0QzMuNzgxNzUgOS42ODg1MSA1LjQ3NDMgMTEuMzgxMSA3LjU2MjE2IDExLjM4MTFaXCIgZmlsbD1cIiMxREFFRUZcIi8+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMC4xMDU3MTMgNy42NTE2M0MwLjEwNTcxMyAxMS43Njk3IDcuMTY2OTcgMTkuMzE0MyA3LjU2MjE1IDE5LjMxNDNMNy41NjIxNSAxMS4zODExQzUuNDc0MjkgMTEuMzgxIDMuNzgxNzUgOS42ODg1IDMuNzgxNzUgNy42MDA2NEMzLjc4MTc1IDUuNTEyNzggNS40NzQyOSAzLjgyMDIzIDcuNTYyMTUgMy44MjAyMkw3LjU2MjE1IDAuMTk1MTlDMy40NDQwNyAwLjE5NTE5IDAuMTA1NzEzIDMuNTMzNTUgMC4xMDU3MTMgNy42NTE2M1pcIiBmaWxsPVwiIzNFQzNGRlwiLz5cbjwvc3ZnPmA7XG5jb25zdCBhbGxDb21wb25lbnRzID0gZmlnbWEucm9vdC5maW5kQWxsKGMgPT4gYy50eXBlID09PSBcIkNPTVBPTkVOVFwiKTtcbmNvbnN0IGFsbENvbXBvbmVudHNOYW1lID0gYWxsQ29tcG9uZW50cy5tYXAoY29tcG9uZW50ID0+IGNvbXBvbmVudC5uYW1lKTtcbmNvbnNvbGUubG9nKFwiPT0+XCIsIGFsbENvbXBvbmVudHNOYW1lKTtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHdpZHRoOiBwbHVnaW5XaWR0aCxcbiAgICBoZWlnaHQ6IHBsdWdpbkhlaWdodFxufSk7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJkcmF3LW1hcFwiKSB7XG4gICAgICAgIGxldCBpbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShtc2cuZGF0YSkuaGFzaDtcbiAgICAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICByZWN0LnJlc2l6ZShtc2cud2lkdGgsIG1zZy5oZWlnaHQpO1xuICAgICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogXCJJTUFHRVwiLCBzY2FsZU1vZGU6IFwiRklUXCIsIGltYWdlSGFzaCB9XTtcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtyZWN0XTtcbiAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KFtyZWN0XSk7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgIGxldCBtYXBXaWR0aE9mZnNldCA9IChtYXBCb3VuZGFyeSAtIG1zZy53aWR0aCkgLyAyO1xuICAgICAgICBsZXQgbWFwSGVpZ2h0T2Zmc2V0ID0gKG1hcEJvdW5kYXJ5IC0gbXNnLmhlaWdodCkgLyAyO1xuICAgICAgICBpZiAobXNnLm1hcmtlckltZyA9PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBtYXJrZXJDb21wb25lbnQgPSBmaWdtYS5jcmVhdGVDb21wb25lbnQoKTtcbiAgICAgICAgICAgIG1hcmtlckNvbXBvbmVudC5yZXNpemUoMTYsIDIwKTtcbiAgICAgICAgICAgIG1hcmtlckNvbXBvbmVudC5uYW1lID0gXCJEZWZhdWx0IG1hcmtlciBjb21wb25lbnRcIjtcbiAgICAgICAgICAgIGxldCBub2RlU1ZHID0gZmlnbWEuY3JlYXRlTm9kZUZyb21TdmcobWFya2VyU1ZHKTtcbiAgICAgICAgICAgIG1hcmtlckNvbXBvbmVudC5hcHBlbmRDaGlsZChub2RlU1ZHKTtcbiAgICAgICAgICAgIG1hcmtlckNvbXBvbmVudC54ID0gMDtcbiAgICAgICAgICAgIG1hcmtlckNvbXBvbmVudC55ID0gMDtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKG1hcmtlckNvbXBvbmVudCk7XG4gICAgICAgICAgICBtc2cubWFya2Vycy5tYXAobWFya2VyID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zdGFuY2VNYXJrZXIgPSBtYXJrZXJDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci54ID0gbWFya2VyLnggLSBtYXBXaWR0aE9mZnNldDtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci55ID0gbWFya2VyLnkgLSBtYXBIZWlnaHRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueCAtPSBpbnN0YW5jZU1hcmtlci53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueSAtPSBpbnN0YW5jZU1hcmtlci5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKGluc3RhbmNlTWFya2VyKTtcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKGluc3RhbmNlTWFya2VyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ29tcG9uZW50ID0gZmlnbWEucm9vdC5maW5kQWxsKGMgPT4gYy5uYW1lID09PSBtc2cubWFya2VySW1nICYmIGMudHlwZSA9PT0gXCJDT01QT05FTlRcIik7XG4gICAgICAgICAgICBtc2cubWFya2Vycy5tYXAobWFya2VyID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zdGFuY2VNYXJrZXIgPSBzZWxlY3RlZENvbXBvbmVudFswXS5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnggPSBtYXJrZXIueCAtIG1hcFdpZHRoT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnkgPSBtYXJrZXIueSAtIG1hcEhlaWdodE9mZnNldDtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci54IC09IGluc3RhbmNlTWFya2VyLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci55IC09IGluc3RhbmNlTWFya2VyLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQoaW5zdGFuY2VNYXJrZXIpO1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goaW5zdGFuY2VNYXJrZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6IFwibWFwLWRyYXdlZFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogYE1hcCBkcmF3ZWQgaW4gRmlnbWFgXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbENvbXBvbmVudHMgXCIsIGFsbENvbXBvbmVudHMpO1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZ2V0LWNvbXBvbmVudHNcIikge1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiBcImNvbXBvbmVudHMtcmVzcG9uc2VcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGFsbENvbXBvbmVudHNOYW1lXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9
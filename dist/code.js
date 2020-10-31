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
const markerSVG = `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.56215 19.3143C7.95734 19.3143 15.0186 11.7697 15.0186 7.65163C15.0186 3.53355 11.6802 0.19519 7.56215 0.19519C3.44407 0.19519 0.105713 3.53355 0.105713 7.65163C0.105713 11.7697 7.16697 19.3143 7.56215 19.3143ZM7.56216 11.3811C9.65003 11.3811 11.3426 9.68851 11.3426 7.60064C11.3426 5.51277 9.65003 3.82022 7.56216 3.82022C5.4743 3.82022 3.78175 5.51277 3.78175 7.60064C3.78175 9.68851 5.4743 11.3811 7.56216 11.3811Z" fill="#1DAEEF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.105713 7.65163C0.105713 11.7697 7.16697 19.3143 7.56215 19.3143L7.56215 11.3811C5.47429 11.381 3.78175 9.6885 3.78175 7.60064C3.78175 5.51278 5.47429 3.82023 7.56215 3.82022L7.56215 0.19519C3.44407 0.19519 0.105713 3.53355 0.105713 7.65163Z" fill="#3EC3FF"/>
</svg>`;
const allComponents = figma.root.findAll(c => c.type === "COMPONENT");
figma.showUI(__html__, {
    width: pluginWidth,
    height: pluginHeight,
});
figma.ui.onmessage = (msg) => {
    if (msg.type === "draw-map") {
        let imageHash = figma.createImage(msg.data).hash;
        const rect = figma.createRectangle();
        rect.resize(msg.width, msg.height);
        rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
        figma.currentPage.appendChild(rect);
        figma.currentPage.selection = [rect];
        figma.viewport.scrollAndZoomIntoView([rect]);
        const markerComponent = figma.createComponent();
        markerComponent.name = "Default marker component";
        let nodeSVG = figma.createNodeFromSvg(markerSVG);
        markerComponent.appendChild(nodeSVG);
        markerComponent.x = 0;
        markerComponent.y = 0;
        figma.currentPage.appendChild(markerComponent);
        const nodes = [];
        msg.markers.map((marker) => {
            let instanceMarker = markerComponent.createInstance();
            instanceMarker.x = marker.x;
            instanceMarker.y = marker.y;
            figma.currentPage.appendChild(instanceMarker);
            nodes.push(instanceMarker);
        });
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
        figma.ui.postMessage({
            type: "map-drawed",
            message: `Map drawed in Figma`,
        });
        console.log("allComponents ", allComponents);
        figma.closePlugin();
    }
    if (msg.type === "get-components") {
        figma.ui.postMessage({
            type: "components-response",
            message: allComponents,
        });
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDZDQUE2QztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGx1Z2luL2NvbnRyb2xsZXIudHNcIik7XG4iLCJjb25zdCBwbHVnaW5XaWR0aCA9IDgwMDtcbmNvbnN0IHBsdWdpbkhlaWdodCA9IDU2MDtcbmNvbnN0IG1hcmtlclNWRyA9IGA8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMTYgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03LjU2MjE1IDE5LjMxNDNDNy45NTczNCAxOS4zMTQzIDE1LjAxODYgMTEuNzY5NyAxNS4wMTg2IDcuNjUxNjNDMTUuMDE4NiAzLjUzMzU1IDExLjY4MDIgMC4xOTUxOSA3LjU2MjE1IDAuMTk1MTlDMy40NDQwNyAwLjE5NTE5IDAuMTA1NzEzIDMuNTMzNTUgMC4xMDU3MTMgNy42NTE2M0MwLjEwNTcxMyAxMS43Njk3IDcuMTY2OTcgMTkuMzE0MyA3LjU2MjE1IDE5LjMxNDNaTTcuNTYyMTYgMTEuMzgxMUM5LjY1MDAzIDExLjM4MTEgMTEuMzQyNiA5LjY4ODUxIDExLjM0MjYgNy42MDA2NEMxMS4zNDI2IDUuNTEyNzcgOS42NTAwMyAzLjgyMDIyIDcuNTYyMTYgMy44MjAyMkM1LjQ3NDMgMy44MjAyMiAzLjc4MTc1IDUuNTEyNzcgMy43ODE3NSA3LjYwMDY0QzMuNzgxNzUgOS42ODg1MSA1LjQ3NDMgMTEuMzgxMSA3LjU2MjE2IDExLjM4MTFaXCIgZmlsbD1cIiMxREFFRUZcIi8+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMC4xMDU3MTMgNy42NTE2M0MwLjEwNTcxMyAxMS43Njk3IDcuMTY2OTcgMTkuMzE0MyA3LjU2MjE1IDE5LjMxNDNMNy41NjIxNSAxMS4zODExQzUuNDc0MjkgMTEuMzgxIDMuNzgxNzUgOS42ODg1IDMuNzgxNzUgNy42MDA2NEMzLjc4MTc1IDUuNTEyNzggNS40NzQyOSAzLjgyMDIzIDcuNTYyMTUgMy44MjAyMkw3LjU2MjE1IDAuMTk1MTlDMy40NDQwNyAwLjE5NTE5IDAuMTA1NzEzIDMuNTMzNTUgMC4xMDU3MTMgNy42NTE2M1pcIiBmaWxsPVwiIzNFQzNGRlwiLz5cbjwvc3ZnPmA7XG5jb25zdCBhbGxDb21wb25lbnRzID0gZmlnbWEucm9vdC5maW5kQWxsKGMgPT4gYy50eXBlID09PSBcIkNPTVBPTkVOVFwiKTtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHdpZHRoOiBwbHVnaW5XaWR0aCxcbiAgICBoZWlnaHQ6IHBsdWdpbkhlaWdodCxcbn0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJkcmF3LW1hcFwiKSB7XG4gICAgICAgIGxldCBpbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShtc2cuZGF0YSkuaGFzaDtcbiAgICAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICByZWN0LnJlc2l6ZShtc2cud2lkdGgsIG1zZy5oZWlnaHQpO1xuICAgICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogXCJJTUFHRVwiLCBzY2FsZU1vZGU6IFwiRklUXCIsIGltYWdlSGFzaCB9XTtcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtyZWN0XTtcbiAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KFtyZWN0XSk7XG4gICAgICAgIGNvbnN0IG1hcmtlckNvbXBvbmVudCA9IGZpZ21hLmNyZWF0ZUNvbXBvbmVudCgpO1xuICAgICAgICBtYXJrZXJDb21wb25lbnQubmFtZSA9IFwiRGVmYXVsdCBtYXJrZXIgY29tcG9uZW50XCI7XG4gICAgICAgIGxldCBub2RlU1ZHID0gZmlnbWEuY3JlYXRlTm9kZUZyb21TdmcobWFya2VyU1ZHKTtcbiAgICAgICAgbWFya2VyQ29tcG9uZW50LmFwcGVuZENoaWxkKG5vZGVTVkcpO1xuICAgICAgICBtYXJrZXJDb21wb25lbnQueCA9IDA7XG4gICAgICAgIG1hcmtlckNvbXBvbmVudC55ID0gMDtcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQobWFya2VyQ29tcG9uZW50KTtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgbXNnLm1hcmtlcnMubWFwKChtYXJrZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZU1hcmtlciA9IG1hcmtlckNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueCA9IG1hcmtlci54O1xuICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueSA9IG1hcmtlci55O1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQoaW5zdGFuY2VNYXJrZXIpO1xuICAgICAgICAgICAgbm9kZXMucHVzaChpbnN0YW5jZU1hcmtlcik7XG4gICAgICAgIH0pO1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KG5vZGVzKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJtYXAtZHJhd2VkXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBgTWFwIGRyYXdlZCBpbiBGaWdtYWAsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbENvbXBvbmVudHMgXCIsIGFsbENvbXBvbmVudHMpO1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZ2V0LWNvbXBvbmVudHNcIikge1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiBcImNvbXBvbmVudHMtcmVzcG9uc2VcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGFsbENvbXBvbmVudHMsXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9
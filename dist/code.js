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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            storage: figma.editorType
        });
    }
};
const paymentStatus = { type: "PAID" };
figma.payments.setPaymentStatusInDevelopment(paymentStatus);
function runPaymentDetect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (figma.payments.status.type === "UNPAID") {
            const usageCount = (yield figma.clientStorage.getAsync("usage-count")) || 0;
            const maxUsages = 15;
            if (usageCount >= maxUsages) {
                yield figma.payments.initiateCheckoutAsync({
                    interstitial: "TRIAL_ENDED"
                });
                if (figma.payments.status.type === "UNPAID") {
                    figma.notify("You have run out of free usages of this plugin. Buy me a ☕️ to continue using it.", {
                        timeout: 6000
                    });
                    figma.closePlugin();
                    return;
                }
                else {
                    figma.notify("🎉 Thanks for purchasing it.");
                }
            }
            else {
                yield figma.clientStorage.setAsync("usage-count", usageCount + 1);
                figma.notify("ℹ️ " + usageCount + "/" + maxUsages + " free trials.", {
                    timeout: 6000
                });
            }
        }
    });
}
runPaymentDetect();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixxRkFBcUY7QUFDcEg7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNkNBQTZDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNkNBQTZDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzXCIpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jb25zdCBwbHVnaW5XaWR0aCA9IDgwMDtcbmNvbnN0IHBsdWdpbkhlaWdodCA9IDU2MDtcbmNvbnN0IG1hcEJvdW5kYXJ5ID0gNTYwO1xuY29uc3QgbWFya2VyU1ZHID0gYDxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAxNiAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcuNTYyMTUgMTkuMzE0M0M3Ljk1NzM0IDE5LjMxNDMgMTUuMDE4NiAxMS43Njk3IDE1LjAxODYgNy42NTE2M0MxNS4wMTg2IDMuNTMzNTUgMTEuNjgwMiAwLjE5NTE5IDcuNTYyMTUgMC4xOTUxOUMzLjQ0NDA3IDAuMTk1MTkgMC4xMDU3MTMgMy41MzM1NSAwLjEwNTcxMyA3LjY1MTYzQzAuMTA1NzEzIDExLjc2OTcgNy4xNjY5NyAxOS4zMTQzIDcuNTYyMTUgMTkuMzE0M1pNNy41NjIxNiAxMS4zODExQzkuNjUwMDMgMTEuMzgxMSAxMS4zNDI2IDkuNjg4NTEgMTEuMzQyNiA3LjYwMDY0QzExLjM0MjYgNS41MTI3NyA5LjY1MDAzIDMuODIwMjIgNy41NjIxNiAzLjgyMDIyQzUuNDc0MyAzLjgyMDIyIDMuNzgxNzUgNS41MTI3NyAzLjc4MTc1IDcuNjAwNjRDMy43ODE3NSA5LjY4ODUxIDUuNDc0MyAxMS4zODExIDcuNTYyMTYgMTEuMzgxMVpcIiBmaWxsPVwiIzFEQUVFRlwiLz5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0wLjEwNTcxMyA3LjY1MTYzQzAuMTA1NzEzIDExLjc2OTcgNy4xNjY5NyAxOS4zMTQzIDcuNTYyMTUgMTkuMzE0M0w3LjU2MjE1IDExLjM4MTFDNS40NzQyOSAxMS4zODEgMy43ODE3NSA5LjY4ODUgMy43ODE3NSA3LjYwMDY0QzMuNzgxNzUgNS41MTI3OCA1LjQ3NDI5IDMuODIwMjMgNy41NjIxNSAzLjgyMDIyTDcuNTYyMTUgMC4xOTUxOUMzLjQ0NDA3IDAuMTk1MTkgMC4xMDU3MTMgMy41MzM1NSAwLjEwNTcxMyA3LjY1MTYzWlwiIGZpbGw9XCIjM0VDM0ZGXCIvPlxuPC9zdmc+YDtcbmNvbnN0IGFsbENvbXBvbmVudHMgPSBmaWdtYS5yb290LmZpbmRBbGwoYyA9PiBjLnR5cGUgPT09IFwiQ09NUE9ORU5UXCIpO1xuY29uc3QgYWxsQ29tcG9uZW50c05hbWUgPSBhbGxDb21wb25lbnRzLm1hcChjb21wb25lbnQgPT4gY29tcG9uZW50Lm5hbWUpO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgd2lkdGg6IHBsdWdpbldpZHRoLFxuICAgIGhlaWdodDogcGx1Z2luSGVpZ2h0XG59KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gICAgaWYgKG1zZy50eXBlID09PSBcImRyYXctbWFwXCIpIHtcbiAgICAgICAgbGV0IG1hcFdpZHRoT2Zmc2V0ID0gKG1hcEJvdW5kYXJ5IC0gbXNnLndpZHRoKSAvIDI7XG4gICAgICAgIGxldCBtYXBIZWlnaHRPZmZzZXQgPSAobWFwQm91bmRhcnkgLSBtc2cuaGVpZ2h0KSAvIDI7XG4gICAgICAgIGlmIChmaWdtYS5lZGl0b3JUeXBlID09IFwiZmlnbWFcIikge1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGxldCBpbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShtc2cuZGF0YSkuaGFzaDtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgICAgIHJlY3QubmFtZSA9IFwiQmFzZW1hcCBpbWFnZVwiO1xuICAgICAgICAgICAgcmVjdC5yZXNpemUobXNnLndpZHRoLCBtc2cuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJlY3QuZmlsbHMgPSBbeyB0eXBlOiBcIklNQUdFXCIsIHNjYWxlTW9kZTogXCJGSVRcIiwgaW1hZ2VIYXNoIH1dO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbcmVjdF07XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcoW3JlY3RdKTtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gocmVjdCk7XG4gICAgICAgICAgICBpZiAobXNnLm1hcmtlckltZyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFya2VyQ29tcG9uZW50ID0gZmlnbWEuY3JlYXRlQ29tcG9uZW50KCk7XG4gICAgICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50LnJlc2l6ZSgxNiwgMjApO1xuICAgICAgICAgICAgICAgIG1hcmtlckNvbXBvbmVudC5uYW1lID0gXCJEZWZhdWx0IG1hcmtlciBjb21wb25lbnRcIjtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVNWRyA9IGZpZ21hLmNyZWF0ZU5vZGVGcm9tU3ZnKG1hcmtlclNWRyk7XG4gICAgICAgICAgICAgICAgbWFya2VyQ29tcG9uZW50LmFwcGVuZENoaWxkKG5vZGVTVkcpO1xuICAgICAgICAgICAgICAgIG1hcmtlckNvbXBvbmVudC54ID0gLTEwMDtcbiAgICAgICAgICAgICAgICBtYXJrZXJDb21wb25lbnQueSA9IC0xMDA7XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQobWFya2VyQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICBtc2cubWFya2Vycy5tYXAobWFya2VyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluc3RhbmNlTWFya2VyID0gbWFya2VyQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnggPSBtYXJrZXIueCAtIG1hcFdpZHRoT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci55ID0gbWFya2VyLnkgLSBtYXBIZWlnaHRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnggLT0gaW5zdGFuY2VNYXJrZXIud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci55IC09IGluc3RhbmNlTWFya2VyLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKGluc3RhbmNlTWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChpbnN0YW5jZU1hcmtlcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb21wb25lbnQgPSBmaWdtYS5yb290LmZpbmRBbGwoYyA9PiBjLm5hbWUgPT09IG1zZy5tYXJrZXJJbWcgJiYgYy50eXBlID09PSBcIkNPTVBPTkVOVFwiKTtcbiAgICAgICAgICAgICAgICBtc2cubWFya2Vycy5tYXAobWFya2VyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluc3RhbmNlTWFya2VyID0gc2VsZWN0ZWRDb21wb25lbnRbMF0uY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueCA9IG1hcmtlci54IC0gbWFwV2lkdGhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnkgPSBtYXJrZXIueSAtIG1hcEhlaWdodE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VNYXJrZXIueCAtPSBpbnN0YW5jZU1hcmtlci53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlTWFya2VyLnkgLT0gaW5zdGFuY2VNYXJrZXIuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlci5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjdXN0b21Qcm9wZXJ0eSBvZiBpbnN0YW5jZU1hcmtlci5jb21wb25lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1c3RvbVByb3BlcnR5W1widHlwZVwiXSA9PSBcIlRFWFRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZU1hcmtlci5zZXRQcm9wZXJ0aWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVByb3BlcnR5OiBtYXJrZXIubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKGluc3RhbmNlTWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChpbnN0YW5jZU1hcmtlcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgICAgICAgICBjb25zdCBncm91cENvbnRhaW5lciA9IGZpZ21hLmdyb3VwKG5vZGVzLCBmaWdtYS5jdXJyZW50UGFnZSk7XG4gICAgICAgICAgICBncm91cENvbnRhaW5lci5uYW1lID0gXCJGaWdtYXBcIjtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm1hcC1kcmF3ZWRcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgTWFwIGRyYXdlZCBpbiBGaWdtYWBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgICAgICBsZXQgaW1hZ2VIYXNoID0gZmlnbWEuY3JlYXRlSW1hZ2UobXNnLmRhdGEpLmhhc2g7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4gICAgICAgICAgICByZWN0Lm5hbWUgPSBcIkJhc2VtYXAgaW1hZ2VcIjtcbiAgICAgICAgICAgIHJlY3QucmVzaXplKG1zZy53aWR0aCwgbXNnLmhlaWdodCk7XG4gICAgICAgICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogXCJJTUFHRVwiLCBzY2FsZU1vZGU6IFwiRklUXCIsIGltYWdlSGFzaCB9XTtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gocmVjdCk7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtyZWN0XTtcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhbcmVjdF0pO1xuICAgICAgICAgICAgbXNnLm1hcmtlcnMubWFwKG1hcmtlciA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGVTVkcgPSBmaWdtYS5jcmVhdGVOb2RlRnJvbVN2ZyhtYXJrZXJTVkcpO1xuICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKG5vZGVTVkcpO1xuICAgICAgICAgICAgICAgIG5vZGVTVkcueCA9IG1hcmtlci54IC0gbWFwV2lkdGhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgbm9kZVNWRy55ID0gbWFya2VyLnkgLSBtYXBIZWlnaHRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgbm9kZVNWRy54IC09IDEwO1xuICAgICAgICAgICAgICAgIG5vZGVTVkcueSAtPSA4O1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZVNWRyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpZ21hLmdyb3VwKG5vZGVzLCBmaWdtYS5jdXJyZW50UGFnZSk7XG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJnZXQtY29tcG9uZW50c1wiKSB7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6IFwiY29tcG9uZW50cy1yZXNwb25zZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogYWxsQ29tcG9uZW50c05hbWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJub3RpZmljYXRpb25cIikge1xuICAgICAgICBjb25zdCBub3RpZmljYXRpb25IYW5kbGVyID0gZmlnbWEubm90aWZ5KFwiR1BYIGZpbGUgbG9hZGVkXCIsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IDYwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25IYW5kbGVyLmNhbmNlbCgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwidXBkYXRlLXN0b3JhZ2VcIikge1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwiX3VzZXJuYW1lXCIsIG1zZy51c2VyKTtcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcIl9jdXN0b21TdHlsZUlEXCIsIG1zZy5zdHlsZSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJyZWFkLXN0b3JhZ2VcIikge1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwiX3VzZXJuYW1lXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZldGNoZWQgdXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICBzdG9yYWdlOiByZXN1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcIl9jdXN0b21TdHlsZUlEXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZldGNoZWQgY3VzdG9tIHN0eWxlXCIsXG4gICAgICAgICAgICAgICAgc3RvcmFnZTogcmVzdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJub3RpZnktc3RvcmFnZVwiKSB7XG4gICAgICAgIGZpZ21hLm5vdGlmeShcIvCfkr4gV2UgcmVzdG9yZWQgeW91ciBNYXBib3ggdXNlciBhbmQgU3R5bGUgSUQuIERlZmF1bHQgdmFsdWVzIHdlcmU6ICdlcmd1bScgJ2NrZzZwczhzNjJiNWUxOW5ycjY3d3F3OXUnXCIsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IDYwMDBcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJhc2stZWRpdG9yVHlwZVwiKSB7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6IFwic2VuZGluZy1lZGl0b3JcIixcbiAgICAgICAgICAgIHN0b3JhZ2U6IGZpZ21hLmVkaXRvclR5cGVcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmNvbnN0IHBheW1lbnRTdGF0dXMgPSB7IHR5cGU6IFwiUEFJRFwiIH07XG5maWdtYS5wYXltZW50cy5zZXRQYXltZW50U3RhdHVzSW5EZXZlbG9wbWVudChwYXltZW50U3RhdHVzKTtcbmZ1bmN0aW9uIHJ1blBheW1lbnREZXRlY3QoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKGZpZ21hLnBheW1lbnRzLnN0YXR1cy50eXBlID09PSBcIlVOUEFJRFwiKSB7XG4gICAgICAgICAgICBjb25zdCB1c2FnZUNvdW50ID0gKHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJ1c2FnZS1jb3VudFwiKSkgfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IG1heFVzYWdlcyA9IDE1O1xuICAgICAgICAgICAgaWYgKHVzYWdlQ291bnQgPj0gbWF4VXNhZ2VzKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgZmlnbWEucGF5bWVudHMuaW5pdGlhdGVDaGVja291dEFzeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzdGl0aWFsOiBcIlRSSUFMX0VOREVEXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZmlnbWEucGF5bWVudHMuc3RhdHVzLnR5cGUgPT09IFwiVU5QQUlEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiWW91IGhhdmUgcnVuIG91dCBvZiBmcmVlIHVzYWdlcyBvZiB0aGlzIHBsdWdpbi4gQnV5IG1lIGEg4piV77iPIHRvIGNvbnRpbnVlIHVzaW5nIGl0LlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiA2MDAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCLwn46JIFRoYW5rcyBmb3IgcHVyY2hhc2luZyBpdC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcInVzYWdlLWNvdW50XCIsIHVzYWdlQ291bnQgKyAxKTtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCLihLnvuI8gXCIgKyB1c2FnZUNvdW50ICsgXCIvXCIgKyBtYXhVc2FnZXMgKyBcIiBmcmVlIHRyaWFscy5cIiwge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiA2MDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbnJ1blBheW1lbnREZXRlY3QoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
!function(e){var t={};function a(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=t,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(i,n,function(t){return e[t]}.bind(null,n));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=77)}({77:function(e,t){var a=this&&this.__awaiter||function(e,t,a,i){return new(a||(a=Promise))((function(n,r){function o(e){try{g(i.next(e))}catch(e){r(e)}}function s(e){try{g(i.throw(e))}catch(e){r(e)}}function g(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(o,s)}g((i=i.apply(e,t||[])).next())}))};const i='<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M7.56215 19.3143C7.95734 19.3143 15.0186 11.7697 15.0186 7.65163C15.0186 3.53355 11.6802 0.19519 7.56215 0.19519C3.44407 0.19519 0.105713 3.53355 0.105713 7.65163C0.105713 11.7697 7.16697 19.3143 7.56215 19.3143ZM7.56216 11.3811C9.65003 11.3811 11.3426 9.68851 11.3426 7.60064C11.3426 5.51277 9.65003 3.82022 7.56216 3.82022C5.4743 3.82022 3.78175 5.51277 3.78175 7.60064C3.78175 9.68851 5.4743 11.3811 7.56216 11.3811Z" fill="#1DAEEF"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M0.105713 7.65163C0.105713 11.7697 7.16697 19.3143 7.56215 19.3143L7.56215 11.3811C5.47429 11.381 3.78175 9.6885 3.78175 7.60064C3.78175 5.51278 5.47429 3.82023 7.56215 3.82022L7.56215 0.19519C3.44407 0.19519 0.105713 3.53355 0.105713 7.65163Z" fill="#3EC3FF"/>\n</svg>',n=figma.root.findAll(e=>"COMPONENT"===e.type).map(e=>e.name);figma.showUI(__html__,{width:800,height:560}),figma.ui.onmessage=e=>{if("draw-map"===e.type){let t=(560-e.width)/2,a=(560-e.height)/2;if("figma"==figma.editorType){const n=[];let r=figma.createImage(e.data).hash;const o=figma.createRectangle();if(o.name="Basemap image",o.resize(e.width,e.height),o.fills=[{type:"IMAGE",scaleMode:"FIT",imageHash:r}],figma.currentPage.appendChild(o),figma.currentPage.selection=[o],figma.viewport.scrollAndZoomIntoView([o]),n.push(o),1==e.markerImg){const r=figma.createComponent();r.resize(16,20),r.name="Default marker component";let o=figma.createNodeFromSvg(i);r.appendChild(o),r.x=-100,r.y=-100,figma.currentPage.appendChild(r),e.markers.map(e=>{let i=r.createInstance();i.x=e.x-t,i.y=e.y-a,i.x-=i.width/2,i.y-=i.height/2,figma.currentPage.appendChild(i),n.push(i)})}else{let i=figma.root.findAll(t=>t.name===e.markerImg&&"COMPONENT"===t.type);e.markers.map(e=>{let r=i[0].createInstance();if(r.x=e.x-t,r.y=e.y-a,r.x-=r.width/2,r.y-=r.height/2,e.name)for(var o of r.componentProperties)if("TEXT"==o.type){r.setProperties({customProperty:e.name});break}figma.currentPage.appendChild(r),n.push(r)})}figma.currentPage.selection=n,figma.viewport.scrollAndZoomIntoView(n);figma.group(n,figma.currentPage).name="Figmap",figma.ui.postMessage({type:"map-drawed",message:"Map drawed in Figma"}),figma.closePlugin()}else{const n=[];let r=figma.createImage(e.data).hash;const o=figma.createRectangle();o.name="Basemap image",o.resize(e.width,e.height),o.fills=[{type:"IMAGE",scaleMode:"FIT",imageHash:r}],n.push(o),figma.currentPage.appendChild(o),figma.currentPage.selection=[o],figma.viewport.scrollAndZoomIntoView([o]),e.markers.map(e=>{let r=figma.createNodeFromSvg(i);figma.currentPage.appendChild(r),r.x=e.x-t,r.y=e.y-a,r.x-=10,r.y-=8,n.push(r)}),figma.group(n,figma.currentPage),figma.closePlugin()}}if("get-components"===e.type&&figma.ui.postMessage({type:"components-response",message:n}),"notification"===e.type){const e=figma.notify("GPX file loaded",{timeout:6e3});return function(){e.cancel()}}"update-storage"===e.type&&(figma.clientStorage.setAsync("_username",e.user),figma.clientStorage.setAsync("_customStyleID",e.style)),"read-storage"===e.type&&(figma.clientStorage.getAsync("_username").then(e=>{figma.ui.postMessage({type:"fetched username",storage:e})}),figma.clientStorage.getAsync("_customStyleID").then(e=>{figma.ui.postMessage({type:"fetched custom style",storage:e})})),"notify-storage"===e.type&&figma.notify("💾 We restored your Mapbox user and Style ID. Default values were: 'ergum' 'ckg6ps8s62b5e19nrr67wqw9u'",{timeout:6e3}),"ask-editorType"===e.type&&figma.ui.postMessage({type:"sending-editor",storage:figma.editorType})};figma.payments.setPaymentStatusInDevelopment({type:"PAID"}),function(){a(this,void 0,void 0,(function*(){if("UNPAID"===figma.payments.status.type){const e=(yield figma.clientStorage.getAsync("usage-count"))||0,t=15;if(e>=t){if(yield figma.payments.initiateCheckoutAsync({interstitial:"TRIAL_ENDED"}),"UNPAID"===figma.payments.status.type)return figma.notify("You have run out of free usages of this plugin. Buy me a ☕️ to continue using it.",{timeout:6e3}),void figma.closePlugin();figma.notify("🎉 Thanks for purchasing it.")}else yield figma.clientStorage.setAsync("usage-count",e+1),figma.notify("ℹ️ "+e+"/"+t+" free trials.",{timeout:6e3})}}))}()}});
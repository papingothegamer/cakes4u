"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./components/order/order-pdf.tsx":
/*!****************************************!*\
  !*** ./components/order/order-pdf.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateOrderPDF: function() { return /* binding */ generateOrderPDF; }\n/* harmony export */ });\n/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jspdf */ \"(app-pages-browser)/./node_modules/jspdf/dist/jspdf.es.min.js\");\n/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns/format */ \"(app-pages-browser)/./node_modules/date-fns/format.mjs\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase */ \"(app-pages-browser)/./lib/supabase.ts\");\n\n\n\nasync function generateOrderPDF(param) {\n    let { orderNumber, orderDetails, contactDetails, imageKeys } = param;\n    const doc = new jspdf__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    // Title\n    doc.setFontSize(20);\n    doc.text(\"Order Summary #\".concat(orderNumber), 105, 20, {\n        align: \"center\"\n    });\n    // Order Details Section\n    doc.setFontSize(14);\n    doc.text(\"Order Details\", 10, 40);\n    doc.setFontSize(12);\n    doc.text(\"Type: \".concat(orderDetails.type), 10, 50);\n    doc.text(\"Servings: \".concat(orderDetails.servings), 10, 60);\n    doc.text(\"Occasion: \".concat(orderDetails.occasion), 10, 70);\n    doc.text(\"Delivery Date: \".concat((0,date_fns_format__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(orderDetails.deliveryDate, \"PPP\")), 10, 80);\n    if (orderDetails.description) {\n        doc.text(\"Description: \".concat(orderDetails.description), 10, 90);\n    }\n    if (orderDetails.allergyInfo) {\n        doc.text(\"Allergy Info: \".concat(orderDetails.allergyInfo), 10, 100);\n    }\n    // Contact Details Section\n    doc.setFontSize(14);\n    doc.text(\"Contact Information\", 10, 120);\n    doc.setFontSize(12);\n    doc.text(\"Name: \".concat(contactDetails.name), 10, 130);\n    doc.text(\"Email: \".concat(contactDetails.email), 10, 140);\n    doc.text(\"Phone: \".concat(contactDetails.phone), 10, 150);\n    doc.text(\"Address: \".concat(contactDetails.address), 10, 160);\n    // Reference Images Section\n    if (imageKeys && imageKeys.length > 0) {\n        const images = await fetchImagesFromSupabase(imageKeys);\n        doc.addPage();\n        doc.setFontSize(14);\n        doc.text(\"Reference Images\", 10, 20);\n        let yPosition = 30; // Start position for images\n        const imageWidth = 50; // Adjust width\n        const imageHeight = 50; // Adjust height\n        // Filter out any null values and only process valid image URLs\n        const validImages = images.filter((url)=>url !== null);\n        for (const imageUrl of validImages){\n            doc.addImage(imageUrl, \"JPEG\", 10, yPosition, imageWidth, imageHeight);\n            yPosition += imageHeight + 10; // Move to the next position\n            if (yPosition + imageHeight > 280) {\n                doc.addPage();\n                yPosition = 20;\n            }\n        }\n    }\n    // Save the PDF\n    doc.save(\"order-summary-\".concat(orderNumber, \".pdf\"));\n}\n// Function to fetch image URLs from Supabase\nasync function fetchImagesFromSupabase(imageKeys) {\n    const signedUrls = [];\n    for (const key of imageKeys){\n        const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.storage.from(\"order-images\").createSignedUrl(key, 60 * 60); // URL valid for 1 hour\n        if (error) {\n            console.error(\"Error fetching signed URL for \".concat(key, \":\"), error.message);\n            signedUrls.push(null);\n        } else {\n            signedUrls.push((data === null || data === void 0 ? void 0 : data.signedUrl) || null);\n        }\n    }\n    return signedUrls;\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvb3JkZXIvb3JkZXItcGRmLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTBCO0FBQ1E7QUFDUTtBQVVuQyxlQUFlRyxpQkFBaUIsS0FLdkI7UUFMdUIsRUFDckNDLFdBQVcsRUFDWEMsWUFBWSxFQUNaQyxjQUFjLEVBQ2RDLFNBQVMsRUFDSyxHQUx1QjtJQU1yQyxNQUFNQyxNQUFNLElBQUlSLDZDQUFLQTtJQUVyQixRQUFRO0lBQ1JRLElBQUlDLFdBQVcsQ0FBQztJQUNoQkQsSUFBSUUsSUFBSSxDQUFDLGtCQUE4QixPQUFaTixjQUFlLEtBQUssSUFBSTtRQUFFTyxPQUFPO0lBQVM7SUFFckUsd0JBQXdCO0lBQ3hCSCxJQUFJQyxXQUFXLENBQUM7SUFDaEJELElBQUlFLElBQUksQ0FBQyxpQkFBaUIsSUFBSTtJQUM5QkYsSUFBSUMsV0FBVyxDQUFDO0lBQ2hCRCxJQUFJRSxJQUFJLENBQUMsU0FBMkIsT0FBbEJMLGFBQWFPLElBQUksR0FBSSxJQUFJO0lBQzNDSixJQUFJRSxJQUFJLENBQUMsYUFBbUMsT0FBdEJMLGFBQWFRLFFBQVEsR0FBSSxJQUFJO0lBQ25ETCxJQUFJRSxJQUFJLENBQUMsYUFBbUMsT0FBdEJMLGFBQWFTLFFBQVEsR0FBSSxJQUFJO0lBQ25ETixJQUFJRSxJQUFJLENBQUMsa0JBQTJELE9BQXpDVCwyREFBTUEsQ0FBQ0ksYUFBYVUsWUFBWSxFQUFFLFNBQVUsSUFBSTtJQUUzRSxJQUFJVixhQUFhVyxXQUFXLEVBQUU7UUFDNUJSLElBQUlFLElBQUksQ0FBQyxnQkFBeUMsT0FBekJMLGFBQWFXLFdBQVcsR0FBSSxJQUFJO0lBQzNEO0lBQ0EsSUFBSVgsYUFBYVksV0FBVyxFQUFFO1FBQzVCVCxJQUFJRSxJQUFJLENBQUMsaUJBQTBDLE9BQXpCTCxhQUFhWSxXQUFXLEdBQUksSUFBSTtJQUM1RDtJQUVBLDBCQUEwQjtJQUMxQlQsSUFBSUMsV0FBVyxDQUFDO0lBQ2hCRCxJQUFJRSxJQUFJLENBQUMsdUJBQXVCLElBQUk7SUFDcENGLElBQUlDLFdBQVcsQ0FBQztJQUNoQkQsSUFBSUUsSUFBSSxDQUFDLFNBQTZCLE9BQXBCSixlQUFlWSxJQUFJLEdBQUksSUFBSTtJQUM3Q1YsSUFBSUUsSUFBSSxDQUFDLFVBQStCLE9BQXJCSixlQUFlYSxLQUFLLEdBQUksSUFBSTtJQUMvQ1gsSUFBSUUsSUFBSSxDQUFDLFVBQStCLE9BQXJCSixlQUFlYyxLQUFLLEdBQUksSUFBSTtJQUMvQ1osSUFBSUUsSUFBSSxDQUFDLFlBQW1DLE9BQXZCSixlQUFlZSxPQUFPLEdBQUksSUFBSTtJQUVuRCwyQkFBMkI7SUFDM0IsSUFBSWQsYUFBYUEsVUFBVWUsTUFBTSxHQUFHLEdBQUc7UUFDckMsTUFBTUMsU0FBUyxNQUFNQyx3QkFBd0JqQjtRQUM3Q0MsSUFBSWlCLE9BQU87UUFDWGpCLElBQUlDLFdBQVcsQ0FBQztRQUNoQkQsSUFBSUUsSUFBSSxDQUFDLG9CQUFvQixJQUFJO1FBRWpDLElBQUlnQixZQUFZLElBQUksNEJBQTRCO1FBQ2hELE1BQU1DLGFBQWEsSUFBSSxlQUFlO1FBQ3RDLE1BQU1DLGNBQWMsSUFBSSxnQkFBZ0I7UUFFeEMsK0RBQStEO1FBQy9ELE1BQU1DLGNBQWNOLE9BQU9PLE1BQU0sQ0FBQyxDQUFDQyxNQUFRQSxRQUFRO1FBRW5ELEtBQUssTUFBTUMsWUFBWUgsWUFBYTtZQUNsQ3JCLElBQUl5QixRQUFRLENBQUNELFVBQVUsUUFBUSxJQUFJTixXQUFXQyxZQUFZQztZQUMxREYsYUFBYUUsY0FBYyxJQUFJLDRCQUE0QjtZQUMzRCxJQUFJRixZQUFZRSxjQUFjLEtBQUs7Z0JBQ2pDcEIsSUFBSWlCLE9BQU87Z0JBQ1hDLFlBQVk7WUFDZDtRQUNGO0lBQ0Y7SUFFQSxlQUFlO0lBQ2ZsQixJQUFJMEIsSUFBSSxDQUFDLGlCQUE2QixPQUFaOUIsYUFBWTtBQUN4QztBQUVBLDZDQUE2QztBQUM3QyxlQUFlb0Isd0JBQXdCakIsU0FBbUI7SUFDeEQsTUFBTTRCLGFBQWdDLEVBQUU7SUFFeEMsS0FBSyxNQUFNQyxPQUFPN0IsVUFBVztRQUMzQixNQUFNLEVBQUU4QixJQUFJLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1wQyxtREFBUUEsQ0FBQ3FDLE9BQU8sQ0FDM0NDLElBQUksQ0FBQyxnQkFDTEMsZUFBZSxDQUFDTCxLQUFLLEtBQUssS0FBSyx1QkFBdUI7UUFFekQsSUFBSUUsT0FBTztZQUNUSSxRQUFRSixLQUFLLENBQUMsaUNBQXFDLE9BQUpGLEtBQUksTUFBSUUsTUFBTUssT0FBTztZQUNwRVIsV0FBV1MsSUFBSSxDQUFDO1FBQ2xCLE9BQU87WUFDTFQsV0FBV1MsSUFBSSxDQUFDUCxDQUFBQSxpQkFBQUEsMkJBQUFBLEtBQU1RLFNBQVMsS0FBSTtRQUNyQztJQUNGO0lBRUEsT0FBT1Y7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL29yZGVyL29yZGVyLXBkZi50c3g/NTZiMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQganNQREYgZnJvbSBcImpzcGRmXCI7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlXCI7XG5pbXBvcnQgeyBPcmRlckRldGFpbHMsIENvbnRhY3REZXRhaWxzIH0gZnJvbSBcIkAvdHlwZXMvb3JkZXJcIjtcblxudHlwZSBPcmRlclBERlByb3BzID0ge1xuICBvcmRlck51bWJlcjogc3RyaW5nO1xuICBvcmRlckRldGFpbHM6IE9yZGVyRGV0YWlscztcbiAgY29udGFjdERldGFpbHM6IENvbnRhY3REZXRhaWxzO1xuICBpbWFnZUtleXM/OiBzdHJpbmdbXTsgLy8gTGlzdCBvZiBpbWFnZSBrZXlzIGZyb20gU3VwYWJhc2UgYnVja2V0XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVPcmRlclBERih7XG4gIG9yZGVyTnVtYmVyLFxuICBvcmRlckRldGFpbHMsXG4gIGNvbnRhY3REZXRhaWxzLFxuICBpbWFnZUtleXMsXG59OiBPcmRlclBERlByb3BzKSB7XG4gIGNvbnN0IGRvYyA9IG5ldyBqc1BERigpO1xuXG4gIC8vIFRpdGxlXG4gIGRvYy5zZXRGb250U2l6ZSgyMCk7XG4gIGRvYy50ZXh0KGBPcmRlciBTdW1tYXJ5ICMke29yZGVyTnVtYmVyfWAsIDEwNSwgMjAsIHsgYWxpZ246IFwiY2VudGVyXCIgfSk7XG5cbiAgLy8gT3JkZXIgRGV0YWlscyBTZWN0aW9uXG4gIGRvYy5zZXRGb250U2l6ZSgxNCk7XG4gIGRvYy50ZXh0KFwiT3JkZXIgRGV0YWlsc1wiLCAxMCwgNDApO1xuICBkb2Muc2V0Rm9udFNpemUoMTIpO1xuICBkb2MudGV4dChgVHlwZTogJHtvcmRlckRldGFpbHMudHlwZX1gLCAxMCwgNTApO1xuICBkb2MudGV4dChgU2VydmluZ3M6ICR7b3JkZXJEZXRhaWxzLnNlcnZpbmdzfWAsIDEwLCA2MCk7XG4gIGRvYy50ZXh0KGBPY2Nhc2lvbjogJHtvcmRlckRldGFpbHMub2NjYXNpb259YCwgMTAsIDcwKTtcbiAgZG9jLnRleHQoYERlbGl2ZXJ5IERhdGU6ICR7Zm9ybWF0KG9yZGVyRGV0YWlscy5kZWxpdmVyeURhdGUsIFwiUFBQXCIpfWAsIDEwLCA4MCk7XG5cbiAgaWYgKG9yZGVyRGV0YWlscy5kZXNjcmlwdGlvbikge1xuICAgIGRvYy50ZXh0KGBEZXNjcmlwdGlvbjogJHtvcmRlckRldGFpbHMuZGVzY3JpcHRpb259YCwgMTAsIDkwKTtcbiAgfVxuICBpZiAob3JkZXJEZXRhaWxzLmFsbGVyZ3lJbmZvKSB7XG4gICAgZG9jLnRleHQoYEFsbGVyZ3kgSW5mbzogJHtvcmRlckRldGFpbHMuYWxsZXJneUluZm99YCwgMTAsIDEwMCk7XG4gIH1cblxuICAvLyBDb250YWN0IERldGFpbHMgU2VjdGlvblxuICBkb2Muc2V0Rm9udFNpemUoMTQpO1xuICBkb2MudGV4dChcIkNvbnRhY3QgSW5mb3JtYXRpb25cIiwgMTAsIDEyMCk7XG4gIGRvYy5zZXRGb250U2l6ZSgxMik7XG4gIGRvYy50ZXh0KGBOYW1lOiAke2NvbnRhY3REZXRhaWxzLm5hbWV9YCwgMTAsIDEzMCk7XG4gIGRvYy50ZXh0KGBFbWFpbDogJHtjb250YWN0RGV0YWlscy5lbWFpbH1gLCAxMCwgMTQwKTtcbiAgZG9jLnRleHQoYFBob25lOiAke2NvbnRhY3REZXRhaWxzLnBob25lfWAsIDEwLCAxNTApO1xuICBkb2MudGV4dChgQWRkcmVzczogJHtjb250YWN0RGV0YWlscy5hZGRyZXNzfWAsIDEwLCAxNjApO1xuXG4gIC8vIFJlZmVyZW5jZSBJbWFnZXMgU2VjdGlvblxuICBpZiAoaW1hZ2VLZXlzICYmIGltYWdlS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gYXdhaXQgZmV0Y2hJbWFnZXNGcm9tU3VwYWJhc2UoaW1hZ2VLZXlzKTtcbiAgICBkb2MuYWRkUGFnZSgpO1xuICAgIGRvYy5zZXRGb250U2l6ZSgxNCk7XG4gICAgZG9jLnRleHQoXCJSZWZlcmVuY2UgSW1hZ2VzXCIsIDEwLCAyMCk7XG5cbiAgICBsZXQgeVBvc2l0aW9uID0gMzA7IC8vIFN0YXJ0IHBvc2l0aW9uIGZvciBpbWFnZXNcbiAgICBjb25zdCBpbWFnZVdpZHRoID0gNTA7IC8vIEFkanVzdCB3aWR0aFxuICAgIGNvbnN0IGltYWdlSGVpZ2h0ID0gNTA7IC8vIEFkanVzdCBoZWlnaHRcblxuICAgIC8vIEZpbHRlciBvdXQgYW55IG51bGwgdmFsdWVzIGFuZCBvbmx5IHByb2Nlc3MgdmFsaWQgaW1hZ2UgVVJMc1xuICAgIGNvbnN0IHZhbGlkSW1hZ2VzID0gaW1hZ2VzLmZpbHRlcigodXJsKSA9PiB1cmwgIT09IG51bGwpO1xuXG4gICAgZm9yIChjb25zdCBpbWFnZVVybCBvZiB2YWxpZEltYWdlcykge1xuICAgICAgZG9jLmFkZEltYWdlKGltYWdlVXJsLCBcIkpQRUdcIiwgMTAsIHlQb3NpdGlvbiwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQpO1xuICAgICAgeVBvc2l0aW9uICs9IGltYWdlSGVpZ2h0ICsgMTA7IC8vIE1vdmUgdG8gdGhlIG5leHQgcG9zaXRpb25cbiAgICAgIGlmICh5UG9zaXRpb24gKyBpbWFnZUhlaWdodCA+IDI4MCkge1xuICAgICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgICB5UG9zaXRpb24gPSAyMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTYXZlIHRoZSBQREZcbiAgZG9jLnNhdmUoYG9yZGVyLXN1bW1hcnktJHtvcmRlck51bWJlcn0ucGRmYCk7XG59XG5cbi8vIEZ1bmN0aW9uIHRvIGZldGNoIGltYWdlIFVSTHMgZnJvbSBTdXBhYmFzZVxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hJbWFnZXNGcm9tU3VwYWJhc2UoaW1hZ2VLZXlzOiBzdHJpbmdbXSk6IFByb21pc2U8KHN0cmluZyB8IG51bGwpW10+IHtcbiAgY29uc3Qgc2lnbmVkVXJsczogKHN0cmluZyB8IG51bGwpW10gPSBbXTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBpbWFnZUtleXMpIHtcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5zdG9yYWdlXG4gICAgICAuZnJvbShcIm9yZGVyLWltYWdlc1wiKVxuICAgICAgLmNyZWF0ZVNpZ25lZFVybChrZXksIDYwICogNjApOyAvLyBVUkwgdmFsaWQgZm9yIDEgaG91clxuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzaWduZWQgVVJMIGZvciAke2tleX06YCwgZXJyb3IubWVzc2FnZSk7XG4gICAgICBzaWduZWRVcmxzLnB1c2gobnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNpZ25lZFVybHMucHVzaChkYXRhPy5zaWduZWRVcmwgfHwgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNpZ25lZFVybHM7XG59XG4iXSwibmFtZXMiOlsianNQREYiLCJmb3JtYXQiLCJzdXBhYmFzZSIsImdlbmVyYXRlT3JkZXJQREYiLCJvcmRlck51bWJlciIsIm9yZGVyRGV0YWlscyIsImNvbnRhY3REZXRhaWxzIiwiaW1hZ2VLZXlzIiwiZG9jIiwic2V0Rm9udFNpemUiLCJ0ZXh0IiwiYWxpZ24iLCJ0eXBlIiwic2VydmluZ3MiLCJvY2Nhc2lvbiIsImRlbGl2ZXJ5RGF0ZSIsImRlc2NyaXB0aW9uIiwiYWxsZXJneUluZm8iLCJuYW1lIiwiZW1haWwiLCJwaG9uZSIsImFkZHJlc3MiLCJsZW5ndGgiLCJpbWFnZXMiLCJmZXRjaEltYWdlc0Zyb21TdXBhYmFzZSIsImFkZFBhZ2UiLCJ5UG9zaXRpb24iLCJpbWFnZVdpZHRoIiwiaW1hZ2VIZWlnaHQiLCJ2YWxpZEltYWdlcyIsImZpbHRlciIsInVybCIsImltYWdlVXJsIiwiYWRkSW1hZ2UiLCJzYXZlIiwic2lnbmVkVXJscyIsImtleSIsImRhdGEiLCJlcnJvciIsInN0b3JhZ2UiLCJmcm9tIiwiY3JlYXRlU2lnbmVkVXJsIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJwdXNoIiwic2lnbmVkVXJsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/order/order-pdf.tsx\n"));

/***/ })

});
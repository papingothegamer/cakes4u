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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateOrderPDF: function() { return /* binding */ generateOrderPDF; }\n/* harmony export */ });\n/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jspdf */ \"(app-pages-browser)/./node_modules/jspdf/dist/jspdf.es.min.js\");\n/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns/format */ \"(app-pages-browser)/./node_modules/date-fns/format.mjs\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase */ \"(app-pages-browser)/./lib/supabase.ts\");\n\n\n\nasync function generateOrderPDF(param) {\n    let { orderNumber, orderDetails, contactDetails, imageKeys } = param;\n    const doc = new jspdf__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    // Define colors\n    const primaryColor = \"#FF69B4\"; // Hot Pink\n    const secondaryColor = \"#8A2BE2\"; // Blue Violet\n    // Add logo\n    const logoUrl = \"api/images/logo.png\"; // Replace with your actual logo path\n    doc.addImage(logoUrl, \"PNG\", 10, 10, 30, 30);\n    // Title\n    doc.setFont(\"helvetica\", \"bold\");\n    doc.setFontSize(28);\n    doc.setTextColor(primaryColor);\n    doc.text(\"Cakes4U\", 105, 30, {\n        align: \"center\"\n    });\n    doc.setFont(\"helvetica\", \"bold\");\n    doc.setFontSize(20);\n    doc.setTextColor(secondaryColor);\n    doc.text(\"Order Summary #\".concat(orderNumber), 105, 45, {\n        align: \"center\"\n    });\n    // Decorative line\n    doc.setDrawColor(primaryColor);\n    doc.setLineWidth(0.5);\n    doc.line(10, 50, 200, 50);\n    // Order Details Section\n    doc.setFont(\"helvetica\", \"bold\");\n    doc.setFontSize(16);\n    doc.setTextColor(primaryColor);\n    doc.text(\"Order Details\", 10, 65);\n    doc.setFont(\"helvetica\", \"normal\");\n    doc.setFontSize(12);\n    doc.setTextColor(0, 0, 0);\n    let yPos = 75;\n    const lineHeight = 7;\n    const addDetailLine = (label, value)=>{\n        doc.setFont(\"helvetica\", \"bold\");\n        doc.text(\"\".concat(label, \":\"), 10, yPos);\n        doc.setFont(\"helvetica\", \"normal\");\n        doc.text(value, 50, yPos);\n        yPos += lineHeight;\n    };\n    addDetailLine(\"Type\", orderDetails.type);\n    addDetailLine(\"Servings\", orderDetails.servings.toString());\n    addDetailLine(\"Occasion\", orderDetails.occasion);\n    addDetailLine(\"Delivery Date\", (0,date_fns_format__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(orderDetails.deliveryDate, \"PPP\"));\n    if (orderDetails.description) {\n        addDetailLine(\"Description\", orderDetails.description);\n    }\n    if (orderDetails.allergyInfo) {\n        addDetailLine(\"Allergy Info\", orderDetails.allergyInfo);\n    }\n    // Contact Details Section\n    yPos += 10;\n    doc.setFont(\"helvetica\", \"bold\");\n    doc.setFontSize(16);\n    doc.setTextColor(primaryColor);\n    doc.text(\"Contact Information\", 10, yPos);\n    yPos += 10;\n    doc.setFont(\"helvetica\", \"normal\");\n    doc.setFontSize(12);\n    doc.setTextColor(0, 0, 0);\n    addDetailLine(\"Name\", contactDetails.name);\n    addDetailLine(\"Email\", contactDetails.email);\n    addDetailLine(\"Phone\", contactDetails.phone);\n    addDetailLine(\"Address\", contactDetails.address);\n    // Fallback Message for Missing Images\n    const fallbackMessage = 'Please attach your image with this form and send it to cakes4ufoods@gmail.com with the subject \"Order #'.concat(orderNumber, '\"');\n    // Check if we have images\n    if (imageKeys && imageKeys.length > 0) {\n        const images = await fetchImagesFromSupabase(imageKeys);\n        doc.setFont(\"helvetica\", \"bold\");\n        doc.setFontSize(22);\n        doc.setTextColor(primaryColor);\n        doc.text(\"Reference Images\", 105, yPos + 20, {\n            align: \"center\"\n        });\n        // Decorative line\n        doc.setDrawColor(primaryColor);\n        doc.setLineWidth(0.5);\n        doc.line(10, yPos + 25, 200, yPos + 25);\n        let yPosition = yPos + 35;\n        const imageWidth = 80;\n        const imageHeight = 80;\n        let xPosition = 10;\n        // Filter out null images\n        const validImages = images.filter((url)=>url !== null);\n        if (validImages.length === 0) {\n            // Add fallback text if no valid images\n            doc.setFont(\"helvetica\", \"normal\");\n            doc.setFontSize(10);\n            doc.setTextColor(0, 0, 0);\n            // Center the fallback message\n            doc.text(fallbackMessage, 105, yPosition, {\n                align: \"center\"\n            });\n        } else {\n            // Add images if valid ones exist\n            for(let i = 0; i < validImages.length; i++){\n                const imageUrl = validImages[i];\n                if (imageUrl) {\n                    var _imageUrl_split_pop;\n                    const imageType = (_imageUrl_split_pop = imageUrl.split(\".\").pop()) === null || _imageUrl_split_pop === void 0 ? void 0 : _imageUrl_split_pop.toUpperCase();\n                    let imageFormat = \"WEBP\"; // Default to WEBP\n                    if (imageType === \"PNG\") {\n                        imageFormat = \"PNG\";\n                    } else if (imageType === \"JPG\" || imageType === \"JPEG\") {\n                        imageFormat = \"JPG\";\n                    }\n                    doc.addImage(imageUrl, imageFormat, xPosition, yPosition, imageWidth, imageHeight);\n                    if ((i + 1) % 2 === 0) {\n                        xPosition = 10;\n                        yPosition += imageHeight + 10;\n                    } else {\n                        xPosition += imageWidth + 10;\n                    }\n                    if (yPosition + imageHeight > 260) {\n                        break; // Prevent going over the page limit\n                    }\n                }\n            }\n            // If there are still no images or if there's space left, add the fallback message\n            if (validImages.length === 0 || yPosition + imageHeight >= 260) {\n                doc.setFont(\"helvetica\", \"normal\");\n                doc.setFontSize(10);\n                doc.setTextColor(0, 0, 0);\n                doc.text(fallbackMessage, 105, yPosition + 10, {\n                    align: \"center\"\n                });\n            }\n        }\n    } else {\n        // If no imageKeys, add fallback message directly\n        doc.setFont(\"helvetica\", \"normal\");\n        doc.setFontSize(10);\n        doc.setTextColor(0, 0, 0);\n        doc.text(fallbackMessage, 105, yPos + 20, {\n            align: \"center\"\n        });\n    }\n    // Footer\n    doc.setFont(\"helvetica\", \"italic\");\n    doc.setFontSize(10);\n    doc.setTextColor(secondaryColor);\n    doc.text(\"Cakes4U - Making your moments sweeter!\", 105, 280, {\n        align: \"center\"\n    });\n    doc.text(\" +46 76 745 74 19 | cakes4ufoods.vercel.app\", 105, 285, {\n        align: \"center\"\n    });\n    // Save the PDF\n    doc.save(\"cakes4u-order-\".concat(orderNumber, \".pdf\"));\n}\n// Function to fetch image URLs from Supabase\nasync function fetchImagesFromSupabase(imageKeys) {\n    const signedUrls = [];\n    for (const key of imageKeys){\n        const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.storage.from(\"order-images\").createSignedUrl(key, 60 * 60); // URL valid for 1 hour\n        if (error) {\n            console.error(\"Error fetching signed URL for \".concat(key, \":\"), error.message);\n            signedUrls.push(null);\n        } else {\n            signedUrls.push((data === null || data === void 0 ? void 0 : data.signedUrl) || null);\n        }\n    }\n    return signedUrls;\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvb3JkZXIvb3JkZXItcGRmLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTBCO0FBQ1E7QUFDUTtBQVVuQyxlQUFlRyxpQkFBaUIsS0FLdkI7UUFMdUIsRUFDckNDLFdBQVcsRUFDWEMsWUFBWSxFQUNaQyxjQUFjLEVBQ2RDLFNBQVMsRUFDSyxHQUx1QjtJQU1yQyxNQUFNQyxNQUFNLElBQUlSLDZDQUFLQTtJQUVyQixnQkFBZ0I7SUFDaEIsTUFBTVMsZUFBZSxXQUFXLFdBQVc7SUFDM0MsTUFBTUMsaUJBQWlCLFdBQVcsY0FBYztJQUVoRCxXQUFXO0lBQ1gsTUFBTUMsVUFBVSx1QkFBdUIscUNBQXFDO0lBQzVFSCxJQUFJSSxRQUFRLENBQUNELFNBQVMsT0FBTyxJQUFJLElBQUksSUFBSTtJQUV6QyxRQUFRO0lBQ1JILElBQUlLLE9BQU8sQ0FBQyxhQUFhO0lBQ3pCTCxJQUFJTSxXQUFXLENBQUM7SUFDaEJOLElBQUlPLFlBQVksQ0FBQ047SUFDakJELElBQUlRLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSTtRQUFFQyxPQUFPO0lBQVM7SUFFL0NULElBQUlLLE9BQU8sQ0FBQyxhQUFhO0lBQ3pCTCxJQUFJTSxXQUFXLENBQUM7SUFDaEJOLElBQUlPLFlBQVksQ0FBQ0w7SUFDakJGLElBQUlRLElBQUksQ0FBQyxrQkFBOEIsT0FBWlosY0FBZSxLQUFLLElBQUk7UUFBRWEsT0FBTztJQUFTO0lBRXJFLGtCQUFrQjtJQUNsQlQsSUFBSVUsWUFBWSxDQUFDVDtJQUNqQkQsSUFBSVcsWUFBWSxDQUFDO0lBQ2pCWCxJQUFJWSxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUs7SUFFdEIsd0JBQXdCO0lBQ3hCWixJQUFJSyxPQUFPLENBQUMsYUFBYTtJQUN6QkwsSUFBSU0sV0FBVyxDQUFDO0lBQ2hCTixJQUFJTyxZQUFZLENBQUNOO0lBQ2pCRCxJQUFJUSxJQUFJLENBQUMsaUJBQWlCLElBQUk7SUFFOUJSLElBQUlL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VyxDQUFDO0lBQ2hCTixJQUFJTyxZQUFZLENBQUNMO0lBQ2pCRixJQUFJUSxJQUFJLENBQUMsMENBQTBDLEtBQUssS0FBSztRQUFFQyxPQUFPO0lBQVM7SUFDL0VULElBQUlRLElBQUksQ0FBQywrQ0FBK0MsS0FBSyxLQUFLO1FBQUVDLE9BQU87SUFBUztJQUVwRixlQUFlO0lBQ2ZULElBQUkrQyxJQUFJLENBQUMsaUJBQTZCLE9BQVpuRCxhQUFZO0FBQ3hDO0FBRUEsNkNBQTZDO0FBQzdDLGVBQWVvQyx3QkFBd0JqQyxTQUFtQjtJQUN4RCxNQUFNaUQsYUFBZ0MsRUFBRTtJQUV4QyxLQUFLLE1BQU1DLE9BQU9sRCxVQUFXO1FBQzNCLE1BQU0sRUFBRW1ELElBQUksRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTXpELG1EQUFRQSxDQUFDMEQsT0FBTyxDQUMzQ0MsSUFBSSxDQUFDLGdCQUNMQyxlQUFlLENBQUNMLEtBQUssS0FBSyxLQUFLLHVCQUF1QjtRQUV6RCxJQUFJRSxPQUFPO1lBQ1RJLFFBQVFKLEtBQUssQ0FBQyxpQ0FBcUMsT0FBSkYsS0FBSSxNQUFJRSxNQUFNSyxPQUFPO1lBQ3BFUixXQUFXUyxJQUFJLENBQUM7UUFDbEIsT0FBTztZQUNMVCxXQUFXUyxJQUFJLENBQUNQLENBQUFBLGlCQUFBQSwyQkFBQUEsS0FBTVEsU0FBUyxLQUFJO1FBQ3JDO0lBQ0Y7SUFFQSxPQUFPVjtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvb3JkZXIvb3JkZXItcGRmLnRzeD81NmIxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqc1BERiBmcm9tIFwianNwZGZcIjtcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiQC9saWIvc3VwYWJhc2VcIjtcbmltcG9ydCB7IE9yZGVyRGV0YWlscywgQ29udGFjdERldGFpbHMgfSBmcm9tIFwiQC90eXBlcy9vcmRlclwiO1xuXG50eXBlIE9yZGVyUERGUHJvcHMgPSB7XG4gIG9yZGVyTnVtYmVyOiBzdHJpbmc7XG4gIG9yZGVyRGV0YWlsczogT3JkZXJEZXRhaWxzO1xuICBjb250YWN0RGV0YWlsczogQ29udGFjdERldGFpbHM7XG4gIGltYWdlS2V5cz86IHN0cmluZ1tdO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlT3JkZXJQREYoe1xuICBvcmRlck51bWJlcixcbiAgb3JkZXJEZXRhaWxzLFxuICBjb250YWN0RGV0YWlscyxcbiAgaW1hZ2VLZXlzLFxufTogT3JkZXJQREZQcm9wcykge1xuICBjb25zdCBkb2MgPSBuZXcganNQREYoKTtcblxuICAvLyBEZWZpbmUgY29sb3JzXG4gIGNvbnN0IHByaW1hcnlDb2xvciA9IFwiI0ZGNjlCNFwiOyAvLyBIb3QgUGlua1xuICBjb25zdCBzZWNvbmRhcnlDb2xvciA9IFwiIzhBMkJFMlwiOyAvLyBCbHVlIFZpb2xldFxuXG4gIC8vIEFkZCBsb2dvXG4gIGNvbnN0IGxvZ29VcmwgPSBcImFwaS9pbWFnZXMvbG9nby5wbmdcIjsgLy8gUmVwbGFjZSB3aXRoIHlvdXIgYWN0dWFsIGxvZ28gcGF0aFxuICBkb2MuYWRkSW1hZ2UobG9nb1VybCwgXCJQTkdcIiwgMTAsIDEwLCAzMCwgMzApO1xuXG4gIC8vIFRpdGxlXG4gIGRvYy5zZXRGb250KFwiaGVsdmV0aWNhXCIsIFwiYm9sZFwiKTtcbiAgZG9jLnNldEZvbnRTaXplKDI4KTtcbiAgZG9jLnNldFRleHRDb2xvcihwcmltYXJ5Q29sb3IpO1xuICBkb2MudGV4dChcIkNha2VzNFVcIiwgMTA1LCAzMCwgeyBhbGlnbjogXCJjZW50ZXJcIiB9KTtcblxuICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcImJvbGRcIik7XG4gIGRvYy5zZXRGb250U2l6ZSgyMCk7XG4gIGRvYy5zZXRUZXh0Q29sb3Ioc2Vjb25kYXJ5Q29sb3IpO1xuICBkb2MudGV4dChgT3JkZXIgU3VtbWFyeSAjJHtvcmRlck51bWJlcn1gLCAxMDUsIDQ1LCB7IGFsaWduOiBcImNlbnRlclwiIH0pO1xuXG4gIC8vIERlY29yYXRpdmUgbGluZVxuICBkb2Muc2V0RHJhd0NvbG9yKHByaW1hcnlDb2xvcik7XG4gIGRvYy5zZXRMaW5lV2lkdGgoMC41KTtcbiAgZG9jLmxpbmUoMTAsIDUwLCAyMDAsIDUwKTtcblxuICAvLyBPcmRlciBEZXRhaWxzIFNlY3Rpb25cbiAgZG9jLnNldEZvbnQoXCJoZWx2ZXRpY2FcIiwgXCJib2xkXCIpO1xuICBkb2Muc2V0Rm9udFNpemUoMTYpO1xuICBkb2Muc2V0VGV4dENvbG9yKHByaW1hcnlDb2xvcik7XG4gIGRvYy50ZXh0KFwiT3JkZXIgRGV0YWlsc1wiLCAxMCwgNjUpO1xuXG4gIGRvYy5zZXRGb250KFwiaGVsdmV0aWNhXCIsIFwibm9ybWFsXCIpO1xuICBkb2Muc2V0Rm9udFNpemUoMTIpO1xuICBkb2Muc2V0VGV4dENvbG9yKDAsIDAsIDApO1xuICBsZXQgeVBvcyA9IDc1O1xuICBjb25zdCBsaW5lSGVpZ2h0ID0gNztcblxuICBjb25zdCBhZGREZXRhaWxMaW5lID0gKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcImJvbGRcIik7XG4gICAgZG9jLnRleHQoYCR7bGFiZWx9OmAsIDEwLCB5UG9zKTtcbiAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcIm5vcm1hbFwiKTtcbiAgICBkb2MudGV4dCh2YWx1ZSwgNTAsIHlQb3MpO1xuICAgIHlQb3MgKz0gbGluZUhlaWdodDtcbiAgfTtcblxuICBhZGREZXRhaWxMaW5lKFwiVHlwZVwiLCBvcmRlckRldGFpbHMudHlwZSk7XG4gIGFkZERldGFpbExpbmUoXCJTZXJ2aW5nc1wiLCBvcmRlckRldGFpbHMuc2VydmluZ3MudG9TdHJpbmcoKSk7XG4gIGFkZERldGFpbExpbmUoXCJPY2Nhc2lvblwiLCBvcmRlckRldGFpbHMub2NjYXNpb24pO1xuICBhZGREZXRhaWxMaW5lKFwiRGVsaXZlcnkgRGF0ZVwiLCBmb3JtYXQob3JkZXJEZXRhaWxzLmRlbGl2ZXJ5RGF0ZSwgXCJQUFBcIikpO1xuXG4gIGlmIChvcmRlckRldGFpbHMuZGVzY3JpcHRpb24pIHtcbiAgICBhZGREZXRhaWxMaW5lKFwiRGVzY3JpcHRpb25cIiwgb3JkZXJEZXRhaWxzLmRlc2NyaXB0aW9uKTtcbiAgfVxuICBpZiAob3JkZXJEZXRhaWxzLmFsbGVyZ3lJbmZvKSB7XG4gICAgYWRkRGV0YWlsTGluZShcIkFsbGVyZ3kgSW5mb1wiLCBvcmRlckRldGFpbHMuYWxsZXJneUluZm8pO1xuICB9XG5cbiAgLy8gQ29udGFjdCBEZXRhaWxzIFNlY3Rpb25cbiAgeVBvcyArPSAxMDtcbiAgZG9jLnNldEZvbnQoXCJoZWx2ZXRpY2FcIiwgXCJib2xkXCIpO1xuICBkb2Muc2V0Rm9udFNpemUoMTYpO1xuICBkb2Muc2V0VGV4dENvbG9yKHByaW1hcnlDb2xvcik7XG4gIGRvYy50ZXh0KFwiQ29udGFjdCBJbmZvcm1hdGlvblwiLCAxMCwgeVBvcyk7XG4gIHlQb3MgKz0gMTA7XG5cbiAgZG9jLnNldEZvbnQoXCJoZWx2ZXRpY2FcIiwgXCJub3JtYWxcIik7XG4gIGRvYy5zZXRGb250U2l6ZSgxMik7XG4gIGRvYy5zZXRUZXh0Q29sb3IoMCwgMCwgMCk7XG5cbiAgYWRkRGV0YWlsTGluZShcIk5hbWVcIiwgY29udGFjdERldGFpbHMubmFtZSk7XG4gIGFkZERldGFpbExpbmUoXCJFbWFpbFwiLCBjb250YWN0RGV0YWlscy5lbWFpbCk7XG4gIGFkZERldGFpbExpbmUoXCJQaG9uZVwiLCBjb250YWN0RGV0YWlscy5waG9uZSk7XG4gIGFkZERldGFpbExpbmUoXCJBZGRyZXNzXCIsIGNvbnRhY3REZXRhaWxzLmFkZHJlc3MpO1xuXG4gIC8vIEZhbGxiYWNrIE1lc3NhZ2UgZm9yIE1pc3NpbmcgSW1hZ2VzXG4gIGNvbnN0IGZhbGxiYWNrTWVzc2FnZSA9IGBQbGVhc2UgYXR0YWNoIHlvdXIgaW1hZ2Ugd2l0aCB0aGlzIGZvcm0gYW5kIHNlbmQgaXQgdG8gY2FrZXM0dWZvb2RzQGdtYWlsLmNvbSB3aXRoIHRoZSBzdWJqZWN0IFwiT3JkZXIgIyR7b3JkZXJOdW1iZXJ9XCJgO1xuXG4gIC8vIENoZWNrIGlmIHdlIGhhdmUgaW1hZ2VzXG4gIGlmIChpbWFnZUtleXMgJiYgaW1hZ2VLZXlzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBpbWFnZXMgPSBhd2FpdCBmZXRjaEltYWdlc0Zyb21TdXBhYmFzZShpbWFnZUtleXMpO1xuXG4gICAgZG9jLnNldEZvbnQoXCJoZWx2ZXRpY2FcIiwgXCJib2xkXCIpO1xuICAgIGRvYy5zZXRGb250U2l6ZSgyMik7XG4gICAgZG9jLnNldFRleHRDb2xvcihwcmltYXJ5Q29sb3IpO1xuICAgIGRvYy50ZXh0KFwiUmVmZXJlbmNlIEltYWdlc1wiLCAxMDUsIHlQb3MgKyAyMCwgeyBhbGlnbjogXCJjZW50ZXJcIiB9KTtcblxuICAgIC8vIERlY29yYXRpdmUgbGluZVxuICAgIGRvYy5zZXREcmF3Q29sb3IocHJpbWFyeUNvbG9yKTtcbiAgICBkb2Muc2V0TGluZVdpZHRoKDAuNSk7XG4gICAgZG9jLmxpbmUoMTAsIHlQb3MgKyAyNSwgMjAwLCB5UG9zICsgMjUpO1xuXG4gICAgbGV0IHlQb3NpdGlvbiA9IHlQb3MgKyAzNTtcbiAgICBjb25zdCBpbWFnZVdpZHRoID0gODA7XG4gICAgY29uc3QgaW1hZ2VIZWlnaHQgPSA4MDtcbiAgICBsZXQgeFBvc2l0aW9uID0gMTA7XG5cbiAgICAvLyBGaWx0ZXIgb3V0IG51bGwgaW1hZ2VzXG4gICAgY29uc3QgdmFsaWRJbWFnZXMgPSBpbWFnZXMuZmlsdGVyKCh1cmwpID0+IHVybCAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWRJbWFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBBZGQgZmFsbGJhY2sgdGV4dCBpZiBubyB2YWxpZCBpbWFnZXNcbiAgICAgIGRvYy5zZXRGb250KFwiaGVsdmV0aWNhXCIsIFwibm9ybWFsXCIpO1xuICAgICAgZG9jLnNldEZvbnRTaXplKDEwKTtcbiAgICAgIGRvYy5zZXRUZXh0Q29sb3IoMCwgMCwgMCk7XG5cbiAgICAgIC8vIENlbnRlciB0aGUgZmFsbGJhY2sgbWVzc2FnZVxuICAgICAgZG9jLnRleHQoZmFsbGJhY2tNZXNzYWdlLCAxMDUsIHlQb3NpdGlvbiwgeyBhbGlnbjogXCJjZW50ZXJcIiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQWRkIGltYWdlcyBpZiB2YWxpZCBvbmVzIGV4aXN0XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbGlkSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGltYWdlVXJsID0gdmFsaWRJbWFnZXNbaV07XG4gICAgICAgIGlmIChpbWFnZVVybCkge1xuICAgICAgICAgIGNvbnN0IGltYWdlVHlwZSA9IGltYWdlVXJsLnNwbGl0KCcuJykucG9wKCk/LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgbGV0IGltYWdlRm9ybWF0OiBcIlBOR1wiIHwgXCJKUEdcIiB8IFwiV0VCUFwiID0gXCJXRUJQXCI7IC8vIERlZmF1bHQgdG8gV0VCUFxuXG4gICAgICAgICAgaWYgKGltYWdlVHlwZSA9PT0gXCJQTkdcIikge1xuICAgICAgICAgICAgaW1hZ2VGb3JtYXQgPSBcIlBOR1wiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW1hZ2VUeXBlID09PSBcIkpQR1wiIHx8IGltYWdlVHlwZSA9PT0gXCJKUEVHXCIpIHtcbiAgICAgICAgICAgIGltYWdlRm9ybWF0ID0gXCJKUEdcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2MuYWRkSW1hZ2UoaW1hZ2VVcmwsIGltYWdlRm9ybWF0LCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQpO1xuXG4gICAgICAgICAgaWYgKChpICsgMSkgJSAyID09PSAwKSB7XG4gICAgICAgICAgICB4UG9zaXRpb24gPSAxMDtcbiAgICAgICAgICAgIHlQb3NpdGlvbiArPSBpbWFnZUhlaWdodCArIDEwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4UG9zaXRpb24gKz0gaW1hZ2VXaWR0aCArIDEwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh5UG9zaXRpb24gKyBpbWFnZUhlaWdodCA+IDI2MCkge1xuICAgICAgICAgICAgYnJlYWs7IC8vIFByZXZlbnQgZ29pbmcgb3ZlciB0aGUgcGFnZSBsaW1pdFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGVyZSBhcmUgc3RpbGwgbm8gaW1hZ2VzIG9yIGlmIHRoZXJlJ3Mgc3BhY2UgbGVmdCwgYWRkIHRoZSBmYWxsYmFjayBtZXNzYWdlXG4gICAgICBpZiAodmFsaWRJbWFnZXMubGVuZ3RoID09PSAwIHx8IHlQb3NpdGlvbiArIGltYWdlSGVpZ2h0ID49IDI2MCkge1xuICAgICAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcIm5vcm1hbFwiKTtcbiAgICAgICAgZG9jLnNldEZvbnRTaXplKDEwKTtcbiAgICAgICAgZG9jLnNldFRleHRDb2xvcigwLCAwLCAwKTtcbiAgICAgICAgZG9jLnRleHQoZmFsbGJhY2tNZXNzYWdlLCAxMDUsIHlQb3NpdGlvbiArIDEwLCB7IGFsaWduOiBcImNlbnRlclwiIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJZiBubyBpbWFnZUtleXMsIGFkZCBmYWxsYmFjayBtZXNzYWdlIGRpcmVjdGx5XG4gICAgZG9jLnNldEZvbnQoXCJoZWx2ZXRpY2FcIiwgXCJub3JtYWxcIik7XG4gICAgZG9jLnNldEZvbnRTaXplKDEwKTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKDAsIDAsIDApO1xuICAgIGRvYy50ZXh0KGZhbGxiYWNrTWVzc2FnZSwgMTA1LCB5UG9zICsgMjAsIHsgYWxpZ246IFwiY2VudGVyXCIgfSk7XG4gIH1cblxuICAvLyBGb290ZXJcbiAgZG9jLnNldEZvbnQoXCJoZWx2ZXRpY2FcIiwgXCJpdGFsaWNcIik7XG4gIGRvYy5zZXRGb250U2l6ZSgxMCk7XG4gIGRvYy5zZXRUZXh0Q29sb3Ioc2Vjb25kYXJ5Q29sb3IpO1xuICBkb2MudGV4dChcIkNha2VzNFUgLSBNYWtpbmcgeW91ciBtb21lbnRzIHN3ZWV0ZXIhXCIsIDEwNSwgMjgwLCB7IGFsaWduOiBcImNlbnRlclwiIH0pO1xuICBkb2MudGV4dChcIiArNDYgNzYgNzQ1IDc0IDE5IHwgY2FrZXM0dWZvb2RzLnZlcmNlbC5hcHBcIiwgMTA1LCAyODUsIHsgYWxpZ246IFwiY2VudGVyXCIgfSk7XG5cbiAgLy8gU2F2ZSB0aGUgUERGXG4gIGRvYy5zYXZlKGBjYWtlczR1LW9yZGVyLSR7b3JkZXJOdW1iZXJ9LnBkZmApO1xufVxuXG4vLyBGdW5jdGlvbiB0byBmZXRjaCBpbWFnZSBVUkxzIGZyb20gU3VwYWJhc2VcbmFzeW5jIGZ1bmN0aW9uIGZldGNoSW1hZ2VzRnJvbVN1cGFiYXNlKGltYWdlS2V5czogc3RyaW5nW10pOiBQcm9taXNlPChzdHJpbmcgfCBudWxsKVtdPiB7XG4gIGNvbnN0IHNpZ25lZFVybHM6IChzdHJpbmcgfCBudWxsKVtdID0gW107XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgaW1hZ2VLZXlzKSB7XG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2Uuc3RvcmFnZVxuICAgICAgLmZyb20oXCJvcmRlci1pbWFnZXNcIilcbiAgICAgIC5jcmVhdGVTaWduZWRVcmwoa2V5LCA2MCAqIDYwKTsgLy8gVVJMIHZhbGlkIGZvciAxIGhvdXJcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc2lnbmVkIFVSTCBmb3IgJHtrZXl9OmAsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgc2lnbmVkVXJscy5wdXNoKG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWduZWRVcmxzLnB1c2goZGF0YT8uc2lnbmVkVXJsIHx8IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzaWduZWRVcmxzO1xufVxuIl0sIm5hbWVzIjpbImpzUERGIiwiZm9ybWF0Iiwic3VwYWJhc2UiLCJnZW5lcmF0ZU9yZGVyUERGIiwib3JkZXJOdW1iZXIiLCJvcmRlckRldGFpbHMiLCJjb250YWN0RGV0YWlscyIsImltYWdlS2V5cyIsImRvYyIsInByaW1hcnlDb2xvciIsInNlY29uZGFyeUNvbG9yIiwibG9nb1VybCIsImFkZEltYWdlIiwic2V0Rm9udCIsInNldEZvbnRTaXplIiwic2V0VGV4dENvbG9yIiwidGV4dCIsImFsaWduIiwic2V0RHJhd0NvbG9yIiwic2V0TGluZVdpZHRoIiwibGluZSIsInlQb3MiLCJsaW5lSGVpZ2h0IiwiYWRkRGV0YWlsTGluZSIsImxhYmVsIiwidmFsdWUiLCJ0eXBlIiwic2VydmluZ3MiLCJ0b1N0cmluZyIsIm9jY2FzaW9uIiwiZGVsaXZlcnlEYXRlIiwiZGVzY3JpcHRpb24iLCJhbGxlcmd5SW5mbyIsIm5hbWUiLCJlbWFpbCIsInBob25lIiwiYWRkcmVzcyIsImZhbGxiYWNrTWVzc2FnZSIsImxlbmd0aCIsImltYWdlcyIsImZldGNoSW1hZ2VzRnJvbVN1cGFiYXNlIiwieVBvc2l0aW9uIiwiaW1hZ2VXaWR0aCIsImltYWdlSGVpZ2h0IiwieFBvc2l0aW9uIiwidmFsaWRJbWFnZXMiLCJmaWx0ZXIiLCJ1cmwiLCJpIiwiaW1hZ2VVcmwiLCJpbWFnZVR5cGUiLCJzcGxpdCIsInBvcCIsInRvVXBwZXJDYXNlIiwiaW1hZ2VGb3JtYXQiLCJzYXZlIiwic2lnbmVkVXJscyIsImtleSIsImRhdGEiLCJlcnJvciIsInN0b3JhZ2UiLCJmcm9tIiwiY3JlYXRlU2lnbmVkVXJsIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJwdXNoIiwic2lnbmVkVXJsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/order/order-pdf.tsx\n"));

/***/ })

});
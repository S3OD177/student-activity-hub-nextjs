"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/certificates/route";
exports.ids = ["app/api/admin/certificates/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fcertificates%2Froute&page=%2Fapi%2Fadmin%2Fcertificates%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcertificates%2Froute.ts&appDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fcertificates%2Froute&page=%2Fapi%2Fadmin%2Fcertificates%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcertificates%2Froute.ts&appDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_m_ah1_Desktop_student_activity_hub_nextjs_app_api_admin_certificates_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/certificates/route.ts */ \"(rsc)/./app/api/admin/certificates/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/certificates/route\",\n        pathname: \"/api/admin/certificates\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/certificates/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\m_ah1\\\\Desktop\\\\student-activity-hub-nextjs\\\\app\\\\api\\\\admin\\\\certificates\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_m_ah1_Desktop_student_activity_hub_nextjs_app_api_admin_certificates_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/certificates/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmNlcnRpZmljYXRlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWRtaW4lMkZjZXJ0aWZpY2F0ZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhZG1pbiUyRmNlcnRpZmljYXRlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNtX2FoMSU1Q0Rlc2t0b3AlNUNzdHVkZW50LWFjdGl2aXR5LWh1Yi1uZXh0anMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q21fYWgxJTVDRGVza3RvcCU1Q3N0dWRlbnQtYWN0aXZpdHktaHViLW5leHRqcyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDK0M7QUFDNUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHVkZW50LWFjdGl2aXR5LWh1Yi1uZXh0anMvP2E1MmMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcbV9haDFcXFxcRGVza3RvcFxcXFxzdHVkZW50LWFjdGl2aXR5LWh1Yi1uZXh0anNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxjZXJ0aWZpY2F0ZXNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL2NlcnRpZmljYXRlcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL2NlcnRpZmljYXRlc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vY2VydGlmaWNhdGVzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcbV9haDFcXFxcRGVza3RvcFxcXFxzdHVkZW50LWFjdGl2aXR5LWh1Yi1uZXh0anNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxjZXJ0aWZpY2F0ZXNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FkbWluL2NlcnRpZmljYXRlcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fcertificates%2Froute&page=%2Fapi%2Fadmin%2Fcertificates%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcertificates%2Froute.ts&appDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/certificates/route.ts":
/*!*********************************************!*\
  !*** ./app/api/admin/certificates/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\n// Issue certificate to a single enrollment\nasync function POST(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { enrollmentId } = await request.json();\n        const enrollment = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.enrollment.findUnique({\n            where: {\n                id: enrollmentId\n            },\n            include: {\n                user: true,\n                activity: true\n            }\n        });\n        if (!enrollment) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Enrollment not found\"\n            }, {\n                status: 404\n            });\n        }\n        // Check if activity is completed\n        const activityDate = new Date(enrollment.activity.date);\n        const now = new Date();\n        if (activityDate > now) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Cannot issue certificate for future activity\"\n            }, {\n                status: 400\n            });\n        }\n        // Update certificate status\n        const updated = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.enrollment.update({\n            where: {\n                id: enrollmentId\n            },\n            data: {\n                certificateIssued: true,\n                certificateDate: new Date(),\n                attended: true\n            }\n        });\n        // Create notification for user\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.notification.create({\n            data: {\n                userId: enrollment.userId,\n                title: \"Certificate Issued\",\n                message: `Your certificate for \"${enrollment.activity.title}\" is now available!`,\n                type: \"badge\",\n                read: false\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(updated);\n    } catch (error) {\n        console.error(\"Error issuing certificate:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Bulk issue certificates for an activity\nasync function PUT(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { activityId } = await request.json();\n        const activity = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.activity.findUnique({\n            where: {\n                id: activityId\n            },\n            include: {\n                enrollments: {\n                    where: {\n                        certificateIssued: false\n                    },\n                    include: {\n                        user: true\n                    }\n                }\n            }\n        });\n        if (!activity) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Activity not found\"\n            }, {\n                status: 404\n            });\n        }\n        // Check if activity is completed\n        const activityDate = new Date(activity.date);\n        const now = new Date();\n        if (activityDate > now) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Cannot issue certificates for future activity\"\n            }, {\n                status: 400\n            });\n        }\n        // Issue certificates to all enrollments (marks them as attended)\n        const updates = await Promise.all(activity.enrollments.map(async (enrollment)=>{\n            // Update enrollment - mark as attended and issue certificate\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.enrollment.update({\n                where: {\n                    id: enrollment.id\n                },\n                data: {\n                    attended: true,\n                    certificateIssued: true,\n                    certificateDate: new Date()\n                }\n            });\n            // Create notification\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.notification.create({\n                data: {\n                    userId: enrollment.userId,\n                    title: \"Certificate Issued\",\n                    message: `Your certificate for \"${activity.title}\" is now available!`,\n                    type: \"badge\",\n                    read: false\n                }\n            });\n            return enrollment;\n        }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: `Issued ${updates.length} certificates`,\n            count: updates.length\n        });\n    } catch (error) {\n        console.error(\"Error issuing bulk certificates:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2NlcnRpZmljYXRlcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTBDO0FBQ0U7QUFDSjtBQUNIO0FBRXJDLDJDQUEyQztBQUNwQyxlQUFlSSxLQUFLQyxPQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTUMsVUFBVSxNQUFNTCwyREFBZ0JBLENBQUNDLGtEQUFXQTtRQUNsRCxJQUFJLENBQUNJLFdBQVdBLFFBQVFDLElBQUksQ0FBQ0MsSUFBSSxLQUFLLFNBQVM7WUFDN0MsT0FBT1IscURBQVlBLENBQUNTLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsTUFBTVAsUUFBUUksSUFBSTtRQUUzQyxNQUFNSSxhQUFhLE1BQU1WLCtDQUFNQSxDQUFDVSxVQUFVLENBQUNDLFVBQVUsQ0FBQztZQUNwREMsT0FBTztnQkFBRUMsSUFBSUo7WUFBYTtZQUMxQkssU0FBUztnQkFDUFYsTUFBTTtnQkFDTlcsVUFBVTtZQUNaO1FBQ0Y7UUFFQSxJQUFJLENBQUNMLFlBQVk7WUFDZixPQUFPYixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQXVCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUM1RTtRQUVBLGlDQUFpQztRQUNqQyxNQUFNUSxlQUFlLElBQUlDLEtBQUtQLFdBQVdLLFFBQVEsQ0FBQ0csSUFBSTtRQUN0RCxNQUFNQyxNQUFNLElBQUlGO1FBRWhCLElBQUlELGVBQWVHLEtBQUs7WUFDdEIsT0FBT3RCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBK0MsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3BHO1FBRUEsNEJBQTRCO1FBQzVCLE1BQU1ZLFVBQVUsTUFBTXBCLCtDQUFNQSxDQUFDVSxVQUFVLENBQUNXLE1BQU0sQ0FBQztZQUM3Q1QsT0FBTztnQkFBRUMsSUFB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aERDLE9BQU9MLFFBQVFJLE1BQU07UUFDdkI7SUFDRixFQUFFLE9BQU9sQyxPQUFPO1FBQ2QwQixRQUFRMUIsS0FBSyxDQUFDLG9DQUFvQ0E7UUFDbEQsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzdFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHVkZW50LWFjdGl2aXR5LWh1Yi1uZXh0anMvLi9hcHAvYXBpL2FkbWluL2NlcnRpZmljYXRlcy9yb3V0ZS50cz8wZDA4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCJcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiXHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIlxyXG5cclxuLy8gSXNzdWUgY2VydGlmaWNhdGUgdG8gYSBzaW5nbGUgZW5yb2xsbWVudFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxyXG4gICAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcImFkbWluXCIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgZW5yb2xsbWVudElkIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxyXG5cclxuICAgIGNvbnN0IGVucm9sbG1lbnQgPSBhd2FpdCBwcmlzbWEuZW5yb2xsbWVudC5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IGVucm9sbG1lbnRJZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgdXNlcjogdHJ1ZSxcclxuICAgICAgICBhY3Rpdml0eTogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0pXHJcblxyXG4gICAgaWYgKCFlbnJvbGxtZW50KSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkVucm9sbG1lbnQgbm90IGZvdW5kXCIgfSwgeyBzdGF0dXM6IDQwNCB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGFjdGl2aXR5IGlzIGNvbXBsZXRlZFxyXG4gICAgY29uc3QgYWN0aXZpdHlEYXRlID0gbmV3IERhdGUoZW5yb2xsbWVudC5hY3Rpdml0eS5kYXRlKVxyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKVxyXG4gICAgXHJcbiAgICBpZiAoYWN0aXZpdHlEYXRlID4gbm93KSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkNhbm5vdCBpc3N1ZSBjZXJ0aWZpY2F0ZSBmb3IgZnV0dXJlIGFjdGl2aXR5XCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBjZXJ0aWZpY2F0ZSBzdGF0dXNcclxuICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBwcmlzbWEuZW5yb2xsbWVudC51cGRhdGUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogZW5yb2xsbWVudElkIH0sXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjZXJ0aWZpY2F0ZUlzc3VlZDogdHJ1ZSxcclxuICAgICAgICBjZXJ0aWZpY2F0ZURhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgYXR0ZW5kZWQ6IHRydWUsIC8vIE1hcmsgYXMgYXR0ZW5kZWQgd2hlbiBpc3N1aW5nIGNlcnRpZmljYXRlXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIENyZWF0ZSBub3RpZmljYXRpb24gZm9yIHVzZXJcclxuICAgIGF3YWl0IHByaXNtYS5ub3RpZmljYXRpb24uY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHVzZXJJZDogZW5yb2xsbWVudC51c2VySWQsXHJcbiAgICAgICAgdGl0bGU6IFwiQ2VydGlmaWNhdGUgSXNzdWVkXCIsXHJcbiAgICAgICAgbWVzc2FnZTogYFlvdXIgY2VydGlmaWNhdGUgZm9yIFwiJHtlbnJvbGxtZW50LmFjdGl2aXR5LnRpdGxlfVwiIGlzIG5vdyBhdmFpbGFibGUhYCxcclxuICAgICAgICB0eXBlOiBcImJhZGdlXCIsXHJcbiAgICAgICAgcmVhZDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1cGRhdGVkKVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaXNzdWluZyBjZXJ0aWZpY2F0ZTpcIiwgZXJyb3IpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pXHJcbiAgfVxyXG59XHJcblxyXG4vLyBCdWxrIGlzc3VlIGNlcnRpZmljYXRlcyBmb3IgYW4gYWN0aXZpdHlcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBVVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxyXG4gICAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcImFkbWluXCIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgYWN0aXZpdHlJZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcclxuXHJcbiAgICBjb25zdCBhY3Rpdml0eSA9IGF3YWl0IHByaXNtYS5hY3Rpdml0eS5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IGFjdGl2aXR5SWQgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIGVucm9sbG1lbnRzOiB7XHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlzc3VlZDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICB1c2VyOiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAoIWFjdGl2aXR5KSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkFjdGl2aXR5IG5vdCBmb3VuZFwiIH0sIHsgc3RhdHVzOiA0MDQgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhY3Rpdml0eSBpcyBjb21wbGV0ZWRcclxuICAgIGNvbnN0IGFjdGl2aXR5RGF0ZSA9IG5ldyBEYXRlKGFjdGl2aXR5LmRhdGUpXHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpXHJcbiAgICBcclxuICAgIGlmIChhY3Rpdml0eURhdGUgPiBub3cpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiQ2Fubm90IGlzc3VlIGNlcnRpZmljYXRlcyBmb3IgZnV0dXJlIGFjdGl2aXR5XCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElzc3VlIGNlcnRpZmljYXRlcyB0byBhbGwgZW5yb2xsbWVudHMgKG1hcmtzIHRoZW0gYXMgYXR0ZW5kZWQpXHJcbiAgICBjb25zdCB1cGRhdGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXHJcbiAgICAgIGFjdGl2aXR5LmVucm9sbG1lbnRzLm1hcChhc3luYyAoZW5yb2xsbWVudCkgPT4ge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBlbnJvbGxtZW50IC0gbWFyayBhcyBhdHRlbmRlZCBhbmQgaXNzdWUgY2VydGlmaWNhdGVcclxuICAgICAgICBhd2FpdCBwcmlzbWEuZW5yb2xsbWVudC51cGRhdGUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IGVucm9sbG1lbnQuaWQgfSxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgYXR0ZW5kZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSXNzdWVkOiB0cnVlLFxyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZURhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBub3RpZmljYXRpb25cclxuICAgICAgICBhd2FpdCBwcmlzbWEubm90aWZpY2F0aW9uLmNyZWF0ZSh7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogZW5yb2xsbWVudC51c2VySWQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkNlcnRpZmljYXRlIElzc3VlZFwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBgWW91ciBjZXJ0aWZpY2F0ZSBmb3IgXCIke2FjdGl2aXR5LnRpdGxlfVwiIGlzIG5vdyBhdmFpbGFibGUhYCxcclxuICAgICAgICAgICAgdHlwZTogXCJiYWRnZVwiLFxyXG4gICAgICAgICAgICByZWFkOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGVucm9sbG1lbnRcclxuICAgICAgfSlcclxuICAgIClcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcclxuICAgICAgbWVzc2FnZTogYElzc3VlZCAke3VwZGF0ZXMubGVuZ3RofSBjZXJ0aWZpY2F0ZXNgLFxyXG4gICAgICBjb3VudDogdXBkYXRlcy5sZW5ndGggXHJcbiAgICB9KVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaXNzdWluZyBidWxrIGNlcnRpZmljYXRlczpcIiwgZXJyb3IpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJQT1NUIiwicmVxdWVzdCIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImVucm9sbG1lbnRJZCIsImVucm9sbG1lbnQiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsImluY2x1ZGUiLCJhY3Rpdml0eSIsImFjdGl2aXR5RGF0ZSIsIkRhdGUiLCJkYXRlIiwibm93IiwidXBkYXRlZCIsInVwZGF0ZSIsImRhdGEiLCJjZXJ0aWZpY2F0ZUlzc3VlZCIsImNlcnRpZmljYXRlRGF0ZSIsImF0dGVuZGVkIiwibm90aWZpY2F0aW9uIiwiY3JlYXRlIiwidXNlcklkIiwidGl0bGUiLCJtZXNzYWdlIiwidHlwZSIsInJlYWQiLCJjb25zb2xlIiwiUFVUIiwiYWN0aXZpdHlJZCIsImVucm9sbG1lbnRzIiwidXBkYXRlcyIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJsZW5ndGgiLCJjb3VudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/certificates/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Invalid credentials\");\n                }\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"User not found\");\n                }\n                const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Invalid password\");\n                }\n                if (!user.isVerified) {\n                    throw new Error(\"Please verify your email first\");\n                }\n                return {\n                    id: user.id.toString(),\n                    email: user.email,\n                    name: user.username,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNpRTtBQUNoQztBQUNKO0FBRXRCLE1BQU1HLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1RKLDJFQUFtQkEsQ0FBQztZQUNsQkssTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxNQUFNLElBQUlFLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1DLE9BQU8sTUFBTVosMkNBQU1BLENBQUNZLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUN4Q0MsT0FBTzt3QkFBRVIsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztnQkFDcEM7Z0JBRUEsSUFBSSxDQUFDTSxNQUFNO29CQUNULE1BQU0sSUFBSUQsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTUksa0JBQWtCLE1BQU1kLHVEQUFjLENBQzFDSSxZQUFZSSxRQUFRLEVBQ3BCRyxLQUFLSCxRQUFRO2dCQUdmLElBQUksQ0FBQ00saUJBQWlCO29CQUNwQixNQUFNLElBQUlKLE1BQU07Z0JBQ2xCO2dCQUVBLElBQUksQ0FBQ0MsS0FBS0ssVUFBVSxFQUFFO29CQUNwQixNQUFNLElBQUlOLE1BQU07Z0JBQ2xCO2dCQUVBLE9BQU87b0JBQ0xPLElBQUlOLEtBQUtNLEVBQUUsQ0FBQ0MsUUFBUTtvQkFDcEJiLE9BQU9NLEtBQUtOLEtBQUs7b0JBQ2pCRixNQUFNUSxLQUFLUSxRQUFRO29CQUNuQkMsTUFBTVQsS0FBS1MsSUFBSTtnQkFDakI7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFWixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlksTUFBTUgsSUFBSSxHQUFHVCxLQUFLUyxJQUFJO2dCQUN0QkcsTUFBTU4sRUFBRSxHQUFHTixLQUFLTSxFQUFFO1lBQ3BCO1lBQ0EsT0FBT007UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUMsUUFBUWIsSUFBSSxFQUFFO2dCQUNoQmEsUUFBUWIsSUFBSSxDQUFDUyxJQUFJLEdBQUdHLE1BQU1ILElBQUk7Z0JBQzlCSSxRQUFRYixJQUFJLENBQUNNLEVBQUUsR0FBR00sTUFBTU4sRUFBRTtZQUM1QjtZQUNBLE9BQU9PO1FBQ1Q7SUFDRjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBRixTQUFTO1FBQ1BHLFVBQVU7SUFDWjtJQUNBQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0dWRlbnQtYWN0aXZpdHktaHViLW5leHRqcy8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiXHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIi4vcHJpc21hXCJcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY3JlZGVudGlhbHNcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIG5vdCBmb3VuZFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXHJcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcclxuICAgICAgICAgIHVzZXIucGFzc3dvcmRcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBhc3N3b3JkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXVzZXIuaXNWZXJpZmllZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHZlcmlmeSB5b3VyIGVtYWlsIGZpcnN0XCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IHVzZXIuaWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgbmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXHJcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmdcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmdcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvblxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogXCIvbG9naW5cIixcclxuICB9LFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gIH0sXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXHJcbn1cclxuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJwcmlzbWEiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJFcnJvciIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlIiwiaXNWZXJpZmllZCIsImlkIiwidG9TdHJpbmciLCJ1c2VybmFtZSIsInJvbGUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsInN0cmF0ZWd5Iiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0dWRlbnQtYWN0aXZpdHktaHViLW5leHRqcy8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XHJcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYVxyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fcertificates%2Froute&page=%2Fapi%2Fadmin%2Fcertificates%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcertificates%2Froute.ts&appDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
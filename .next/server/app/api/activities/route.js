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
exports.id = "app/api/activities/route";
exports.ids = ["app/api/activities/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Factivities%2Froute&page=%2Fapi%2Factivities%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivities%2Froute.ts&appDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Factivities%2Froute&page=%2Fapi%2Factivities%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivities%2Froute.ts&appDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_m_ah1_Desktop_student_activity_hub_nextjs_app_api_activities_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/activities/route.ts */ \"(rsc)/./app/api/activities/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/activities/route\",\n        pathname: \"/api/activities\",\n        filename: \"route\",\n        bundlePath: \"app/api/activities/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\m_ah1\\\\Desktop\\\\student-activity-hub-nextjs\\\\app\\\\api\\\\activities\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_m_ah1_Desktop_student_activity_hub_nextjs_app_api_activities_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/activities/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhY3Rpdml0aWVzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhY3Rpdml0aWVzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWN0aXZpdGllcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNtX2FoMSU1Q0Rlc2t0b3AlNUNzdHVkZW50LWFjdGl2aXR5LWh1Yi1uZXh0anMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q21fYWgxJTVDRGVza3RvcCU1Q3N0dWRlbnQtYWN0aXZpdHktaHViLW5leHRqcyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDc0M7QUFDbkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHVkZW50LWFjdGl2aXR5LWh1Yi1uZXh0anMvP2VlZGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcbV9haDFcXFxcRGVza3RvcFxcXFxzdHVkZW50LWFjdGl2aXR5LWh1Yi1uZXh0anNcXFxcYXBwXFxcXGFwaVxcXFxhY3Rpdml0aWVzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hY3Rpdml0aWVzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWN0aXZpdGllc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWN0aXZpdGllcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG1fYWgxXFxcXERlc2t0b3BcXFxcc3R1ZGVudC1hY3Rpdml0eS1odWItbmV4dGpzXFxcXGFwcFxcXFxhcGlcXFxcYWN0aXZpdGllc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYWN0aXZpdGllcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Factivities%2Froute&page=%2Fapi%2Factivities%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivities%2Froute.ts&appDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/activities/route.ts":
/*!*************************************!*\
  !*** ./app/api/activities/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/ZodError.js\");\n\n\n\n\n\nconst activitySchema = zod__WEBPACK_IMPORTED_MODULE_4__.object({\n    title: zod__WEBPACK_IMPORTED_MODULE_4__.string().min(1),\n    description: zod__WEBPACK_IMPORTED_MODULE_4__.string().min(1),\n    date: zod__WEBPACK_IMPORTED_MODULE_4__.string(),\n    location: zod__WEBPACK_IMPORTED_MODULE_4__.string().min(1),\n    maxStudents: zod__WEBPACK_IMPORTED_MODULE_4__.number().optional(),\n    academicLevel: zod__WEBPACK_IMPORTED_MODULE_4__.string().optional(),\n    major: zod__WEBPACK_IMPORTED_MODULE_4__.string().optional(),\n    instructor: zod__WEBPACK_IMPORTED_MODULE_4__.string().optional()\n});\nasync function GET(req) {\n    try {\n        const { searchParams } = new URL(req.url);\n        const search = searchParams.get(\"search\");\n        const status = searchParams.get(\"status\");\n        const academicLevel = searchParams.get(\"academicLevel\");\n        const major = searchParams.get(\"major\");\n        const currentDate = new Date();\n        currentDate.setHours(0, 0, 0, 0);\n        let where = {};\n        if (search) {\n            where.OR = [\n                {\n                    title: {\n                        contains: search\n                    }\n                },\n                {\n                    description: {\n                        contains: search\n                    }\n                },\n                {\n                    location: {\n                        contains: search\n                    }\n                }\n            ];\n        }\n        if (status === \"upcoming\") {\n            where.date = {\n                gte: currentDate\n            };\n        } else if (status === \"ended\") {\n            where.date = {\n                lt: currentDate\n            };\n        }\n        if (academicLevel) {\n            where.academicLevel = academicLevel;\n        }\n        if (major) {\n            where.major = major;\n        }\n        const activities = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.activity.findMany({\n            where,\n            include: {\n                _count: {\n                    select: {\n                        enrollments: true\n                    }\n                }\n            },\n            orderBy: {\n                date: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(activities);\n    } catch (error) {\n        console.error(\"Error fetching activities:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch activities\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const body = await req.json();\n        const data = activitySchema.parse(body);\n        const activity = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.activity.create({\n            data: {\n                ...data,\n                date: new Date(data.date),\n                maxStudents: data.maxStudents || 0\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(activity, {\n            status: 201\n        });\n    } catch (error) {\n        if (error instanceof zod__WEBPACK_IMPORTED_MODULE_5__.ZodError) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid input\",\n                details: error.errors\n            }, {\n                status: 400\n            });\n        }\n        console.error(\"Error creating activity:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to create activity\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLENBQUM7WUFDNUNGLE1BQU07Z0JBQ0osR0FBR0EsSUFBSTtnQkFDUHhDLE1BQU0sSUFBSWlCLEtBQUt1QixLQUFLeEMsSUFBSTtnQkFDeEJFLGFBQWFzQyxLQUFLdEMsV0FBVyxJQUFJO1lBQ25DO1FBQ0Y7UUFFQSxPQUFPYixxREFBWUEsQ0FBQzJDLElBQUksQ0FBQ1AsVUFBVTtZQUFFVixRQUFRO1FBQUk7SUFDbkQsRUFBRSxPQUFPa0IsT0FBTztRQUNkLElBQUlBLGlCQUFpQnhDLHlDQUFVLEVBQUU7WUFDL0IsT0FBT0oscURBQVlBLENBQUMyQyxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO2dCQUFpQlcsU0FBU1gsTUFBTVksTUFBTTtZQUFDLEdBQ2hEO2dCQUFFOUIsUUFBUTtZQUFJO1FBRWxCO1FBRUFtQixRQUFRRCxLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPNUMscURBQVlBLENBQUMyQyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBNEIsR0FDckM7WUFBRWxCLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3R1ZGVudC1hY3Rpdml0eS1odWItbmV4dGpzLy4vYXBwL2FwaS9hY3Rpdml0aWVzL3JvdXRlLnRzPzM2YWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcclxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIlxyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCJcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiXHJcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCJcclxuXHJcbmNvbnN0IGFjdGl2aXR5U2NoZW1hID0gei5vYmplY3Qoe1xyXG4gIHRpdGxlOiB6LnN0cmluZygpLm1pbigxKSxcclxuICBkZXNjcmlwdGlvbjogei5zdHJpbmcoKS5taW4oMSksXHJcbiAgZGF0ZTogei5zdHJpbmcoKSxcclxuICBsb2NhdGlvbjogei5zdHJpbmcoKS5taW4oMSksXHJcbiAgbWF4U3R1ZGVudHM6IHoubnVtYmVyKCkub3B0aW9uYWwoKSxcclxuICBhY2FkZW1pY0xldmVsOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXHJcbiAgbWFqb3I6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcclxuICBpbnN0cnVjdG9yOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXHJcbn0pXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXEudXJsKVxyXG4gICAgY29uc3Qgc2VhcmNoID0gc2VhcmNoUGFyYW1zLmdldChcInNlYXJjaFwiKVxyXG4gICAgY29uc3Qgc3RhdHVzID0gc2VhcmNoUGFyYW1zLmdldChcInN0YXR1c1wiKVxyXG4gICAgY29uc3QgYWNhZGVtaWNMZXZlbCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJhY2FkZW1pY0xldmVsXCIpXHJcbiAgICBjb25zdCBtYWpvciA9IHNlYXJjaFBhcmFtcy5nZXQoXCJtYWpvclwiKVxyXG5cclxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKVxyXG4gICAgY3VycmVudERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMClcclxuXHJcbiAgICBsZXQgd2hlcmU6IGFueSA9IHt9XHJcblxyXG4gICAgaWYgKHNlYXJjaCkge1xyXG4gICAgICB3aGVyZS5PUiA9IFtcclxuICAgICAgICB7IHRpdGxlOiB7IGNvbnRhaW5zOiBzZWFyY2ggfSB9LFxyXG4gICAgICAgIHsgZGVzY3JpcHRpb246IHsgY29udGFpbnM6IHNlYXJjaCB9IH0sXHJcbiAgICAgICAgeyBsb2NhdGlvbjogeyBjb250YWluczogc2VhcmNoIH0gfSxcclxuICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGF0dXMgPT09IFwidXBjb21pbmdcIikge1xyXG4gICAgICB3aGVyZS5kYXRlID0geyBndGU6IGN1cnJlbnREYXRlIH1cclxuICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcImVuZGVkXCIpIHtcclxuICAgICAgd2hlcmUuZGF0ZSA9IHsgbHQ6IGN1cnJlbnREYXRlIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWNhZGVtaWNMZXZlbCkge1xyXG4gICAgICB3aGVyZS5hY2FkZW1pY0xldmVsID0gYWNhZGVtaWNMZXZlbFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChtYWpvcikge1xyXG4gICAgICB3aGVyZS5tYWpvciA9IG1ham9yXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aXZpdGllcyA9IGF3YWl0IHByaXNtYS5hY3Rpdml0eS5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlLFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgX2NvdW50OiB7XHJcbiAgICAgICAgICBzZWxlY3Q6IHsgZW5yb2xsbWVudHM6IHRydWUgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb3JkZXJCeTogeyBkYXRlOiBcImRlc2NcIiB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihhY3Rpdml0aWVzKVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgYWN0aXZpdGllczpcIiwgZXJyb3IpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGFjdGl2aXRpZXNcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcclxuXHJcbiAgICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiYWRtaW5cIikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKClcclxuICAgIGNvbnN0IGRhdGEgPSBhY3Rpdml0eVNjaGVtYS5wYXJzZShib2R5KVxyXG5cclxuICAgIGNvbnN0IGFjdGl2aXR5ID0gYXdhaXQgcHJpc21hLmFjdGl2aXR5LmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICAuLi5kYXRhLFxyXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGEuZGF0ZSksXHJcbiAgICAgICAgbWF4U3R1ZGVudHM6IGRhdGEubWF4U3R1ZGVudHMgfHwgMCxcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oYWN0aXZpdHksIHsgc3RhdHVzOiAyMDEgfSlcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2Ygei5ab2RFcnJvcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJJbnZhbGlkIGlucHV0XCIsIGRldGFpbHM6IGVycm9yLmVycm9ycyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNyZWF0aW5nIGFjdGl2aXR5OlwiLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5XCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJ6IiwiYWN0aXZpdHlTY2hlbWEiLCJvYmplY3QiLCJ0aXRsZSIsInN0cmluZyIsIm1pbiIsImRlc2NyaXB0aW9uIiwiZGF0ZSIsImxvY2F0aW9uIiwibWF4U3R1ZGVudHMiLCJudW1iZXIiLCJvcHRpb25hbCIsImFjYWRlbWljTGV2ZWwiLCJtYWpvciIsImluc3RydWN0b3IiLCJHRVQiLCJyZXEiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJzZWFyY2giLCJnZXQiLCJzdGF0dXMiLCJjdXJyZW50RGF0ZSIsIkRhdGUiLCJzZXRIb3VycyIsIndoZXJlIiwiT1IiLCJjb250YWlucyIsImd0ZSIsImx0IiwiYWN0aXZpdGllcyIsImFjdGl2aXR5IiwiZmluZE1hbnkiLCJpbmNsdWRlIiwiX2NvdW50Iiwic2VsZWN0IiwiZW5yb2xsbWVudHMiLCJvcmRlckJ5IiwianNvbiIsImVycm9yIiwiY29uc29sZSIsIlBPU1QiLCJzZXNzaW9uIiwidXNlciIsInJvbGUiLCJib2R5IiwiZGF0YSIsInBhcnNlIiwiY3JlYXRlIiwiWm9kRXJyb3IiLCJkZXRhaWxzIiwiZXJyb3JzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/activities/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\" Auth attempt with email:\", credentials?.email);\n                if (!credentials?.email || !credentials?.password) {\n                    console.log(\" Missing credentials\");\n                    throw new Error(\"Invalid credentials\");\n                }\n                try {\n                    console.log(\" Looking up user in database...\");\n                    const user = await _prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                        where: {\n                            email: credentials.email\n                        }\n                    });\n                    console.log(\" User found:\", !!user);\n                    if (!user) {\n                        console.log(\" User not found in database\");\n                        throw new Error(\"User not found\");\n                    }\n                    console.log(\" Comparing passwords...\");\n                    const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                    console.log(\" Password valid:\", isPasswordValid);\n                    if (!isPasswordValid) {\n                        console.log(\" Invalid password\");\n                        throw new Error(\"Invalid password\");\n                    }\n                    if (!user.isVerified) {\n                        console.log(\" User not verified\");\n                        throw new Error(\"Please verify your email first\");\n                    }\n                    console.log(\" Authentication successful for:\", user.email);\n                    return {\n                        id: user.id.toString(),\n                        email: user.email,\n                        name: user.username,\n                        role: user.role\n                    };\n                } catch (error) {\n                    console.error(\" Auth error:\", error);\n                    if (error instanceof Error) {\n                        throw error;\n                    }\n                    throw new Error(\"Authentication failed\");\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET || \"bXlzdXBlcnNlY3JldGtleWZvcm5leHRhdXRoMjAyNGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MTIzNDU2Nzg5MA==\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNpRTtBQUNoQztBQUNKO0FBRXRCLE1BQU1HLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1RKLDJFQUFtQkEsQ0FBQztZQUNsQkssTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCTSxRQUFRQyxHQUFHLENBQUMsNkJBQTZCUCxhQUFhQztnQkFFdEQsSUFBSSxDQUFDRCxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pERSxRQUFRQyxHQUFHLENBQUM7b0JBQ1osTUFBTSxJQUFJQyxNQUFNO2dCQUNsQjtnQkFFQSxJQUFJO29CQUNGRixRQUFRQyxHQUFHLENBQUM7b0JBQ1osTUFBTUUsT0FBTyxNQUFNZCwyQ0FBTUEsQ0FBQ2MsSUFBSSxDQUFDQyxVQUFVLENBQUM7d0JBQ3hDQyxPQUFPOzRCQUFFVixPQUFPRCxZQUFZQyxLQUFLO3dCQUFDO29CQUNwQztvQkFFQUssUUFBUUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNFO29CQUM5QixJQUFJLENBQUNBLE1BQU07d0JBQ1RILFFBQVFDLEdBQUcsQ0FBQzt3QkFDWixNQUFNLElBQUlDLE1BQU07b0JBQ2xCO29CQUVBRixRQUFRQyxHQUFHLENBQUM7b0JBQ1osTUFBTUssa0JBQWtCLE1BQU1oQix1REFBYyxDQUMxQ0ksWUFBWUksUUFBUSxFQUNwQkssS0FBS0wsUUFBUTtvQkFHZkUsUUFBUUMsR0FBRyxDQUFDLG9CQUFvQks7b0JBQ2hDLElBQUksQ0FBQ0EsaUJBQWlCO3dCQUNwQk4sUUFBUUMsR0FBRyxDQUFDO3dCQUNaLE1BQU0sSUFBSUMsTUFBTTtvQkFDbEI7b0JBRUEsSUFBSSxDQUFDQyxLQUFLSyxVQUFVLEVBQUU7d0JBQ3BCUixRQUFRQyxHQUFHLENBQUM7d0JBQ1osTUFBTSxJQUFJQyxNQUFNO29CQUNsQjtvQkFFQUYsUUFBUUMsR0FBRyxDQUFDLG1DQUFtQ0UsS0FBS1IsS0FBSztvQkFDekQsT0FBTzt3QkFDTGMsSUFBSU4sS0FBS00sRUFBRSxDQUFDQyxRQUFRO3dCQUNwQmYsT0FBT1EsS0FBS1IsS0FBSzt3QkFDakJGLE1BQU1VLEtBQUtRLFFBQVE7d0JBQ25CQyxNQUFNVCxLQUFLUyxJQUFJO29CQUNqQjtnQkFDRixFQUFFLE9BQU9DLE9BQU87b0JBQ2RiLFFBQVFhLEtBQUssQ0FBQyxnQkFBZ0JBO29CQUM5QixJQUFJQSxpQkFBaUJYLE9BQU87d0JBQzFCLE1BQU1XO29CQUNSO29CQUNBLE1BQU0sSUFBSVgsTUFBTTtnQkFDbEI7WUFDRjtRQUNGO0tBQ0Q7SUFDRFksV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFYixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUmEsTUFBTUosSUFBSSxHQUFHVCxLQUFLUyxJQUFJO2dCQUN0QkksTUFBTVAsRUFBRSxHQUFHTixLQUFLTSxFQUFFO1lBQ3BCO1lBQ0EsT0FBT087UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUMsUUFBUWQsSUFBSSxFQUFFO2dCQUNoQmMsUUFBUWQsSUFBSSxDQUFDUyxJQUFJLEdBQUdJLE1BQU1KLElBQUk7Z0JBQzlCSyxRQUFRZCxJQUFJLENBQUNNLEVBQUUsR0FBR08sTUFBTVAsRUFBRTtZQUM1QjtZQUNBLE9BQU9RO1FBQ1Q7SUFDRjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBRixTQUFTO1FBQ1BHLFVBQVU7SUFDWjtJQUNBQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWUsSUFBSTtBQUN6QyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3R1ZGVudC1hY3Rpdml0eS1odWItbmV4dGpzLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCJcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi9wcmlzbWFcIlxyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiXHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBBdXRoIGF0dGVtcHQgd2l0aCBlbWFpbDonLCBjcmVkZW50aWFscz8uZW1haWwpXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJyBNaXNzaW5nIGNyZWRlbnRpYWxzJylcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY3JlZGVudGlhbHNcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnIExvb2tpbmcgdXAgdXNlciBpbiBkYXRhYmFzZS4uLicpXHJcbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCcgVXNlciBmb3VuZDonLCAhIXVzZXIpXHJcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyBVc2VyIG5vdCBmb3VuZCBpbiBkYXRhYmFzZScpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgbm90IGZvdW5kXCIpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coJyBDb21wYXJpbmcgcGFzc3dvcmRzLi4uJylcclxuICAgICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKFxyXG4gICAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcclxuICAgICAgICAgICAgdXNlci5wYXNzd29yZFxyXG4gICAgICAgICAgKVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCcgUGFzc3dvcmQgdmFsaWQ6JywgaXNQYXNzd29yZFZhbGlkKVxyXG4gICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyBJbnZhbGlkIHBhc3N3b3JkJylcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXNzd29yZFwiKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICghdXNlci5pc1ZlcmlmaWVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgVXNlciBub3QgdmVyaWZpZWQnKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgdmVyaWZ5IHlvdXIgZW1haWwgZmlyc3RcIilcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnIEF1dGhlbnRpY2F0aW9uIHN1Y2Nlc3NmdWwgZm9yOicsIHVzZXIuZW1haWwpXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogdXNlci5pZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgbmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCcgQXV0aCBlcnJvcjonLCBlcnJvcilcclxuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdXRoZW50aWNhdGlvbiBmYWlsZWRcIilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXHJcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmdcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmdcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvblxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogXCIvbG9naW5cIixcclxuICB9LFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gIH0sXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQgfHwgJ2JYbHpkWEJsY25ObFkzSmxkR3RsZVdadmNtNWxlSFJoZFhSb01qQXlOR0ZpWTJSbFptZG9hV3ByYkcxdWIzQnhjbk4wZFhaM2VIbDZNVEl6TkRVMk56ZzVNQT09JyxcclxufVxyXG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsInByaXNtYSIsImJjcnlwdCIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlIiwiaXNWZXJpZmllZCIsImlkIiwidG9TdHJpbmciLCJ1c2VybmFtZSIsInJvbGUiLCJlcnJvciIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwic3RyYXRlZ3kiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Factivities%2Froute&page=%2Fapi%2Factivities%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivities%2Froute.ts&appDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cm_ah1%5CDesktop%5Cstudent-activity-hub-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
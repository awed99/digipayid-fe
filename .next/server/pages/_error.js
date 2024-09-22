"use strict";
(() => {
var exports = {};
exports.id = "pages/_error";
exports.ids = ["pages/_error"];
exports.modules = {

/***/ "./src/pages/_error.jsx":
/*!******************************!*\
  !*** ./src/pages/_error.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/nextjs */ "@sentry/nextjs");
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/error */ "next/error");
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);




var _jsxFileName = "C:\\kerjaan\\dewa\\digipay\\src\\pages\\_error.jsx";

const CustomErrorComponent = props => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_error__WEBPACK_IMPORTED_MODULE_1___default()), {
    statusCode: props.statusCode
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 10
  }, undefined);
};

CustomErrorComponent.getInitialProps = async contextData => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.captureUnderscoreErrorException(contextData); // This will contain the status code of the response

  return next_error__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(contextData);
};

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: CustomErrorComponent
});

/*
 * This file is a template for the code which will be substituted when our webpack loader handles non-API files in the
 * `pages/` directory.
 *
 * We use `__SENTRY_WRAPPING_TARGET_FILE__.cjs` as a placeholder for the path to the file being wrapped. Because it's not a real package,
 * this causes both TS and ESLint to complain, hence the pragma comments below.
 */


const userPageModule = serverComponentModule ;

const pageComponent = userPageModule ? userPageModule.default : undefined;

const origGetInitialProps = pageComponent ? pageComponent.getInitialProps : undefined;
const origGetStaticProps = userPageModule ? userPageModule.getStaticProps : undefined;
const origGetServerSideProps = userPageModule ? userPageModule.getServerSideProps : undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialPropsWrappers = {
  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapAppGetInitialPropsWithSentry,
  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapDocumentGetInitialPropsWithSentry,
  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapErrorGetInitialPropsWithSentry,
};

const getInitialPropsWrapper = getInitialPropsWrappers['/_error'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/_error')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/_error')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ }),

/***/ "@sentry/nextjs":
/*!*********************************!*\
  !*** external "@sentry/nextjs" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ "next/error":
/*!*****************************!*\
  !*** external "next/error" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("next/error");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_error.jsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvX2Vycm9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxNQUFNQSxvQkFBb0IsR0FBR0MsS0FBSyxJQUFJO0FBQ3BDLHNCQUFPQyw2REFBQUEsQ0FBQyxtREFBRDtBQUFPLGNBQVUsRUFBRUQsS0FBSyxDQUFDRSxVQUFBQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVAsRUFBQUMsU0FBQTtBQUNELENBRkQ7O0FBSUFKLG9CQUFvQixDQUFDSyxlQUFyQixHQUF1QyxNQUFNQyxXQUFOLElBQXFCO0FBQzFEO0FBQ0E7QUFDQSxRQUFNQywyRUFBQSxDQUF1Q0QsV0FBdkMsQ0FBTixDQUgwRDs7QUFNMUQsU0FBT0csaUVBQUEsQ0FBc0JILFdBQXRCLENBQVA7QUFDRCxDQVBEOzs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxjQUFjLEdBQUcscUJBQXFCLEVBQUU7QUFDOUM7QUFDQSxNQUFNLGFBQWEsR0FBRyxjQUFjLEdBQUcsY0FBYyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFDMUU7QUFDQSxNQUFNLG1CQUFtQixHQUFHLGFBQWEsR0FBRyxhQUFhLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUN0RixNQUFNLGtCQUFrQixHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUN0RixNQUFNLHNCQUFzQixHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO0FBQzlGO0FBQ0E7QUFDQSxNQUFNLHVCQUF1QixHQUFHO0FBQ2hDLEVBQUUsT0FBTyxFQUFFLDRFQUF1QztBQUNsRCxFQUFFLFlBQVksRUFBRSxpRkFBNEM7QUFDNUQsRUFBRSxTQUFTLEVBQUUsOEVBQXlDO0FBQ3RELENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxzQkFBc0IsR0FBRyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsSUFBSSx5RUFBb0MsQ0FBQztBQUMxRztBQUNBLElBQUksYUFBYSxJQUFJLE9BQU8sbUJBQW1CLEtBQUssVUFBVSxFQUFFO0FBQ2hFLEVBQUUsYUFBYSxDQUFDLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO0FBQy9FLENBQUM7QUFDRDtBQUNLLE1BQUMsY0FBYztBQUNwQixFQUFFLE9BQU8sa0JBQWtCLEtBQUssVUFBVTtBQUMxQyxNQUFNLHdFQUFtQyxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQztBQUN4RSxNQUFNLFVBQVU7QUFDWCxNQUFDLGtCQUFrQjtBQUN4QixFQUFFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtBQUM5QyxNQUFNLDRFQUF1QyxDQUFDLHNCQUFzQixFQUFFLFNBQVMsQ0FBQztBQUNoRixNQUFNLFVBQVU7QUFDaEI7QUFDSyxNQUFDLG1CQUFtQixHQUFHLGFBQWEsR0FBRyx1RUFBa0MsQ0FBQyxhQUFhLEVBQUUsR0FBRzs7Ozs7Ozs7Ozs7OztBQzNDakc7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRElHSVBBWUlEL3NyYy9wYWdlcy9fZXJyb3IuanN4Iiwid2VicGFjazovL0RJR0lQQVlJRC9zZW50cnktd3JhcHBlci1tb2R1bGUiLCJ3ZWJwYWNrOi8vRElHSVBBWUlEL2V4dGVybmFsIFwiQHNlbnRyeS9uZXh0anNcIiIsIndlYnBhY2s6Ly9ESUdJUEFZSUQvZXh0ZXJuYWwgXCJuZXh0L2Vycm9yXCIiLCJ3ZWJwYWNrOi8vRElHSVBBWUlEL2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbmV4dGpzJ1xuaW1wb3J0IEVycm9yIGZyb20gJ25leHQvZXJyb3InXG5cbmNvbnN0IEN1c3RvbUVycm9yQ29tcG9uZW50ID0gcHJvcHMgPT4ge1xuICByZXR1cm4gPEVycm9yIHN0YXR1c0NvZGU9e3Byb3BzLnN0YXR1c0NvZGV9IC8+XG59XG5cbkN1c3RvbUVycm9yQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIGNvbnRleHREYXRhID0+IHtcbiAgLy8gSW4gY2FzZSB0aGlzIGlzIHJ1bm5pbmcgaW4gYSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uLCBhd2FpdCB0aGlzIGluIG9yZGVyIHRvIGdpdmUgU2VudHJ5XG4gIC8vIHRpbWUgdG8gc2VuZCB0aGUgZXJyb3IgYmVmb3JlIHRoZSBsYW1iZGEgZXhpdHNcbiAgYXdhaXQgU2VudHJ5LmNhcHR1cmVVbmRlcnNjb3JlRXJyb3JFeGNlcHRpb24oY29udGV4dERhdGEpXG5cbiAgLy8gVGhpcyB3aWxsIGNvbnRhaW4gdGhlIHN0YXR1cyBjb2RlIG9mIHRoZSByZXNwb25zZVxuICByZXR1cm4gRXJyb3IuZ2V0SW5pdGlhbFByb3BzKGNvbnRleHREYXRhKVxufVxuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21FcnJvckNvbXBvbmVudFxuIiwiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbmV4dGpzJztcbmltcG9ydCAqIGFzIHNlcnZlckNvbXBvbmVudE1vZHVsZSBmcm9tICdfX1NFTlRSWV9XUkFQUElOR19UQVJHRVRfRklMRV9fLmNqcyc7XG5leHBvcnQgKiBmcm9tICdfX1NFTlRSWV9XUkFQUElOR19UQVJHRVRfRklMRV9fLmNqcyc7XG5cbi8qXG4gKiBUaGlzIGZpbGUgaXMgYSB0ZW1wbGF0ZSBmb3IgdGhlIGNvZGUgd2hpY2ggd2lsbCBiZSBzdWJzdGl0dXRlZCB3aGVuIG91ciB3ZWJwYWNrIGxvYWRlciBoYW5kbGVzIG5vbi1BUEkgZmlsZXMgaW4gdGhlXG4gKiBgcGFnZXMvYCBkaXJlY3RvcnkuXG4gKlxuICogV2UgdXNlIGBfX1NFTlRSWV9XUkFQUElOR19UQVJHRVRfRklMRV9fLmNqc2AgYXMgYSBwbGFjZWhvbGRlciBmb3IgdGhlIHBhdGggdG8gdGhlIGZpbGUgYmVpbmcgd3JhcHBlZC4gQmVjYXVzZSBpdCdzIG5vdCBhIHJlYWwgcGFja2FnZSxcbiAqIHRoaXMgY2F1c2VzIGJvdGggVFMgYW5kIEVTTGludCB0byBjb21wbGFpbiwgaGVuY2UgdGhlIHByYWdtYSBjb21tZW50cyBiZWxvdy5cbiAqL1xuXG5cbmNvbnN0IHVzZXJQYWdlTW9kdWxlID0gc2VydmVyQ29tcG9uZW50TW9kdWxlIDtcblxuY29uc3QgcGFnZUNvbXBvbmVudCA9IHVzZXJQYWdlTW9kdWxlID8gdXNlclBhZ2VNb2R1bGUuZGVmYXVsdCA6IHVuZGVmaW5lZDtcblxuY29uc3Qgb3JpZ0dldEluaXRpYWxQcm9wcyA9IHBhZ2VDb21wb25lbnQgPyBwYWdlQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyA6IHVuZGVmaW5lZDtcbmNvbnN0IG9yaWdHZXRTdGF0aWNQcm9wcyA9IHVzZXJQYWdlTW9kdWxlID8gdXNlclBhZ2VNb2R1bGUuZ2V0U3RhdGljUHJvcHMgOiB1bmRlZmluZWQ7XG5jb25zdCBvcmlnR2V0U2VydmVyU2lkZVByb3BzID0gdXNlclBhZ2VNb2R1bGUgPyB1c2VyUGFnZU1vZHVsZS5nZXRTZXJ2ZXJTaWRlUHJvcHMgOiB1bmRlZmluZWQ7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5jb25zdCBnZXRJbml0aWFsUHJvcHNXcmFwcGVycyA9IHtcbiAgJy9fYXBwJzogU2VudHJ5LndyYXBBcHBHZXRJbml0aWFsUHJvcHNXaXRoU2VudHJ5LFxuICAnL19kb2N1bWVudCc6IFNlbnRyeS53cmFwRG9jdW1lbnRHZXRJbml0aWFsUHJvcHNXaXRoU2VudHJ5LFxuICAnL19lcnJvcic6IFNlbnRyeS53cmFwRXJyb3JHZXRJbml0aWFsUHJvcHNXaXRoU2VudHJ5LFxufTtcblxuY29uc3QgZ2V0SW5pdGlhbFByb3BzV3JhcHBlciA9IGdldEluaXRpYWxQcm9wc1dyYXBwZXJzWycvX2Vycm9yJ10gfHwgU2VudHJ5LndyYXBHZXRJbml0aWFsUHJvcHNXaXRoU2VudHJ5O1xuXG5pZiAocGFnZUNvbXBvbmVudCAmJiB0eXBlb2Ygb3JpZ0dldEluaXRpYWxQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICBwYWdlQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyA9IGdldEluaXRpYWxQcm9wc1dyYXBwZXIob3JpZ0dldEluaXRpYWxQcm9wcykgO1xufVxuXG5jb25zdCBnZXRTdGF0aWNQcm9wcyA9XG4gIHR5cGVvZiBvcmlnR2V0U3RhdGljUHJvcHMgPT09ICdmdW5jdGlvbidcbiAgICA/IFNlbnRyeS53cmFwR2V0U3RhdGljUHJvcHNXaXRoU2VudHJ5KG9yaWdHZXRTdGF0aWNQcm9wcywgJy9fZXJyb3InKVxuICAgIDogdW5kZWZpbmVkO1xuY29uc3QgZ2V0U2VydmVyU2lkZVByb3BzID1cbiAgdHlwZW9mIG9yaWdHZXRTZXJ2ZXJTaWRlUHJvcHMgPT09ICdmdW5jdGlvbidcbiAgICA/IFNlbnRyeS53cmFwR2V0U2VydmVyU2lkZVByb3BzV2l0aFNlbnRyeShvcmlnR2V0U2VydmVyU2lkZVByb3BzLCAnL19lcnJvcicpXG4gICAgOiB1bmRlZmluZWQ7XG5cbmNvbnN0IHBhZ2VXcmFwcGVyVGVtcGxhdGUgPSBwYWdlQ29tcG9uZW50ID8gU2VudHJ5LndyYXBQYWdlQ29tcG9uZW50V2l0aFNlbnRyeShwYWdlQ29tcG9uZW50ICkgOiBwYWdlQ29tcG9uZW50O1xuXG5leHBvcnQgeyBwYWdlV3JhcHBlclRlbXBsYXRlIGFzIGRlZmF1bHQsIGdldFNlcnZlclNpZGVQcm9wcywgZ2V0U3RhdGljUHJvcHMgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBzZW50cnkvbmV4dGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZXJyb3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOyJdLCJuYW1lcyI6WyJDdXN0b21FcnJvckNvbXBvbmVudCIsInByb3BzIiwiX2pzeERFViIsInN0YXR1c0NvZGUiLCJ0aGlzIiwiZ2V0SW5pdGlhbFByb3BzIiwiY29udGV4dERhdGEiLCJTZW50cnkiLCJjYXB0dXJlVW5kZXJzY29yZUVycm9yRXhjZXB0aW9uIiwiRXJyb3IiXSwic291cmNlUm9vdCI6IiJ9
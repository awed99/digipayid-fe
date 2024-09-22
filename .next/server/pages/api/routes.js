;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="47c4f459-0178-47c5-842f-5de53d703816",e._sentryDebugIdIdentifier="sentry-dbid-47c4f459-0178-47c5-842f-5de53d703816")}catch(e){}}();
"use strict";
(() => {
var exports = {};
exports.id = 5105;
exports.ids = [5105];
exports.modules = {

/***/ 4130:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ wrappedHandler$1)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8300);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7405);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_1__);



async function POST(req, res) {
  // console.log('req: ', req)
  // console.log('res: ', res)
  // return false
  const auth = store__WEBPACK_IMPORTED_MODULE_1___default().get('auth');
  res.status(200).json({
    auth: auth,
    message: 'Check session successfully.',
    data: req.body
  });
} // // ** Layout Import
// export default function CheckSession(req, res) {
//   const auth = store.get('auth')
//   res.status(200).json({
//     auth: auth,
//     message: 'Check session successfully.'
//   })
// }

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: POST
});

/*
 * This file is a template for the code which will be substituted when our webpack loader handles API files in the
 * `pages/` directory.
 *
 * We use `__SENTRY_WRAPPING_TARGET_FILE__.cjs` as a placeholder for the path to the file being wrapped. Because it's not a real package,
 * this causes both TS and ESLint to complain, hence the pragma comments below.
 */


const userApiModule = serverComponentModule ;

// Default to undefined. It's possible for Next.js users to not define any exports/handlers in an API route. If that is
// the case Next.js wil crash during runtime but the Sentry SDK should definitely not crash so we need tohandle it.
let userProvidedHandler = undefined;

if ('default' in userApiModule && typeof userApiModule.default === 'function') {
  // Handle when user defines via ESM export: `export default myFunction;`
  userProvidedHandler = userApiModule.default;
} else if (typeof userApiModule === 'function') {
  // Handle when user defines via CJS export: "module.exports = myFunction;"
  userProvidedHandler = userApiModule;
}

const origConfig = userApiModule.config || {};

// Setting `externalResolver` to `true` prevents nextjs from throwing a warning in dev about API routes resolving
// without sending a response. It's a false positive (a response is sent, but only after we flush our send queue), and
// we throw a warning of our own to tell folks that, but it's better if we just don't have to deal with it in the first
// place.
const config = {
  ...origConfig,
  api: {
    ...origConfig.api,
    externalResolver: true,
  },
};

let wrappedHandler = userProvidedHandler;

if (wrappedHandler && undefined) {
  wrappedHandler = _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapApiHandlerWithSentryVercelCrons(wrappedHandler, undefined);
}

if (wrappedHandler) {
  wrappedHandler = _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapApiHandlerWithSentry(wrappedHandler, '/api/routes');
}

const wrappedHandler$1 = wrappedHandler;




/***/ }),

/***/ 8300:
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 7405:
/***/ ((module) => {

module.exports = require("store");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4130));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=routes.js.map
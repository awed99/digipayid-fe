;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0dc25e33-5ec5-466b-be76-fb8bd31fa56a",e._sentryDebugIdIdentifier="sentry-dbid-0dc25e33-5ec5-466b-be76-fb8bd31fa56a")}catch(e){}}();
"use strict";
(() => {
var exports = {};
exports.id = 660;
exports.ids = [660];
exports.modules = {

/***/ 2675:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pageWrapperTemplate),
  "getServerSideProps": () => (/* binding */ getServerSideProps),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "@sentry/nextjs"
var nextjs_ = __webpack_require__(8300);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./node_modules/next/document.js
var next_document = __webpack_require__(6859);
;// CONCATENATED MODULE: external "@emotion/server/create-instance"
const create_instance_namespaceObject = require("@emotion/server/create-instance");
var create_instance_default = /*#__PURE__*/__webpack_require__.n(create_instance_namespaceObject);
// EXTERNAL MODULE: ./src/@core/utils/create-emotion-cache.js + 1 modules
var create_emotion_cache = __webpack_require__(7051);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/pages/_document.js







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CustomDocument extends next_document.default {
  render() {
    return /*#__PURE__*/(0,jsx_runtime_.jsxs)(next_document.Html, {
      lang: "en",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(next_document.Head, {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsx)("link", {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("link", {
          rel: "preconnect",
          href: "https://fonts.gstatic.com"
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("link", {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("link", {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/images/logo.png"
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("link", {
          rel: "shortcut icon",
          href: "/images/logo.png"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("body", {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsx)(next_document.Main, {}), /*#__PURE__*/(0,jsx_runtime_.jsx)(next_document.NextScript, {})]
      })]
    });
  }

}

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage;
  const cache = (0,create_emotion_cache/* createEmotionCache */.S)();
  const {
    extractCriticalToChunks
  } = create_instance_default()(cache);

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: App => props => /*#__PURE__*/(0,jsx_runtime_.jsx)(App, _objectSpread(_objectSpread({}, props), {}, {
      // @ts-ignore
      emotionCache: cache
    }))
  });

  const initialProps = await next_document.default.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return /*#__PURE__*/(0,jsx_runtime_.jsx)("style", {
      dangerouslySetInnerHTML: {
        __html: style.css
      },
      "data-emotion": `${style.key} ${style.ids.join(' ')}`
    }, style.key);
  });
  return _objectSpread(_objectSpread({}, initialProps), {}, {
    styles: [...external_react_.Children.toArray(initialProps.styles), ...emotionStyleTags]
  });
};

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: CustomDocument
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
  '/_app': nextjs_.wrapAppGetInitialPropsWithSentry,
  '/_document': nextjs_.wrapDocumentGetInitialPropsWithSentry,
  '/_error': nextjs_.wrapErrorGetInitialPropsWithSentry,
};

const getInitialPropsWrapper = getInitialPropsWrappers['/_document'] || nextjs_.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? nextjs_.wrapGetStaticPropsWithSentry(origGetStaticProps, '/_document')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? nextjs_.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/_document')
    : undefined;

const pageWrapperTemplate = pageComponent ? nextjs_.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ }),

/***/ 7051:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "S": () => (/* binding */ createEmotionCache)
});

;// CONCATENATED MODULE: external "@emotion/cache"
const cache_namespaceObject = require("@emotion/cache");
var cache_default = /*#__PURE__*/__webpack_require__.n(cache_namespaceObject);
;// CONCATENATED MODULE: ./src/@core/utils/create-emotion-cache.js

const createEmotionCache = () => {
  return cache_default()({
    key: 'css'
  });
};

/***/ }),

/***/ 8300:
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 372:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 2538:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 2208:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 6044:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 6098:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 7620:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 9297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1168:
/***/ ((module) => {

module.exports = require("styled-jsx/server");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [6859], () => (__webpack_exec__(2675)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=_document.js.map
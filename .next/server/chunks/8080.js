;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="fca10680-bc79-4c61-b5ed-eb5b9f65165b",e._sentryDebugIdIdentifier="sentry-dbid-fca10680-bc79-4c61-b5ed-eb5b9f65165b")}catch(e){}}();
"use strict";
exports.id = 8080;
exports.ids = [8080];
exports.modules = {

/***/ 8080:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8300);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1874);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers_general__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3110);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);










// ** MUI Imports
const TriangleImg = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_4__.styled)('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
}); // Styled component for the trophy image

const TrophyImg = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_4__.styled)('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
});

const Trophy = ({
  saldo = '0'
}) => {
  // ** Hook
  const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_4__.useTheme)();
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default()), {
    sx: {
      position: 'relative'
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3___default()), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
        variant: "h6",
        children: "Saldo Real Saat Ini"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
        variant: "body2",
        sx: {
          letterSpacing: '0.25px'
        },
        children: "Saldo keuntungan yang tersedia"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
        variant: "h5",
        sx: {
          my: 4,
          color: 'primary.main'
        },
        children: ["IDR ", (0,_helpers_general__WEBPACK_IMPORTED_MODULE_7__/* .format_rupiah */ .j7)(saldo)]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
        size: "small",
        variant: "contained",
        onClick: () => router.push('/admin/withdraw-admin'),
        children: "History Transaction"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(TriangleImg, {
        alt: "triangle background",
        src: `/images/misc/${imageSrc}`
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(TrophyImg, {
        alt: "trophy",
        src: "/images/logo.png"
      })]
    })
  });
};

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: Trophy
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

const getInitialPropsWrapper = getInitialPropsWrappers['/admin/views/dashboard/TrophyReal'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/admin/views/dashboard/TrophyReal')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/admin/views/dashboard/TrophyReal')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ })

};
;
//# sourceMappingURL=8080.js.map
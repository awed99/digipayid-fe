;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b3cc059a-4cd0-4997-80c3-20cc4d2c0679",e._sentryDebugIdIdentifier="sentry-dbid-b3cc059a-4cd0-4997-80c3-20cc4d2c0679")}catch(e){}}();
"use strict";
exports.id = 8421;
exports.ids = [8421];
exports.modules = {

/***/ 8421:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9688);
/* harmony import */ var _mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
// ** React Imports
 // ** MUI Components


 // Styled Components



const MaskImg = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)('img')(() => ({
  bottom: 0,
  zIndex: -1,
  width: '100%',
  position: 'absolute'
}));
const TreeImg = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)('img')(({
  theme
}) => ({
  left: '2.25rem',
  bottom: '4.25rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0,
    bottom: 0
  }
}));

const FooterIllustrations = props => {
  // ** Props
  const {
    image
  } = props; // ** Hook

  const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.useTheme)(); // ** Vars

  const hidden = _mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1___default()(theme.breakpoints.down('md'));

  if (!hidden) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [image || /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(TreeImg, {
        alt: "tree",
        src: "/images/pages/tree-2.png"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(MaskImg, {
        alt: "mask",
        src: `/images/pages/misc-mask-${theme.palette.mode}.png`
      })]
    });
  } else {
    return null;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FooterIllustrations);

/***/ })

};
;
//# sourceMappingURL=8421.js.map
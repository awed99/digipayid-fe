;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a28b0bfd-bbd2-4e58-acf9-b0b03c5b91ff",e._sentryDebugIdIdentifier="sentry-dbid-a28b0bfd-bbd2-4e58-acf9-b0b03c5b91ff")}catch(e){}}();
"use strict";
exports.id = 265;
exports.ids = [265];
exports.modules = {

/***/ 6561:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const themeConfig = {
  // ** Layout Configs
  templateName: "DIGIPAYID"
  /* App Name */
  ,
  subDitName: ""
  /* Sub App Name */
  ,
  themeColor: "info"
  /* Theme Color */
  ,
  mode: "light"
  /* light | dark */
  ,
  contentWidth: "boxed"
  /* full | boxed */
  ,
  // ** Routing Configs
  routingLoader: true
  /* true | false */
  ,
  // ** Navigation (Menu) Configs
  menuTextTruncate: true
  /* true | false */
  ,
  navigationSize: parseInt("250")
  /* Number in PX(Pixels) /*! Note: This is for Vertical navigation menu only */
  ,
  // ** Other Configs
  responsiveFontSizes: true
  /* true | false */
  ,
  disableRipple: false
  /* true | false */

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (themeConfig);

/***/ }),

/***/ 3568:
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
const Tree1Img = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)('img')(() => ({
  left: 0,
  bottom: 0,
  position: 'absolute'
}));
const Tree2Img = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)('img')(() => ({
  right: 0,
  bottom: 0,
  position: 'absolute'
}));

const FooterIllustrationsV1 = props => {
  // ** Props
  const {
    image1,
    image2
  } = props; // ** Hook

  const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.useTheme)(); // ** Vars

  const hidden = _mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1___default()(theme.breakpoints.down('md'));

  if (!hidden) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [image1 || /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(Tree1Img, {
        alt: "tree",
        src: "/images/pages/auth-v1-tree.png"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(MaskImg, {
        alt: "mask",
        src: `/images/pages/auth-v1-mask-${theme.palette.mode}.png`
      }), image2 || /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(Tree2Img, {
        alt: "tree-2",
        src: "/images/pages/auth-v1-tree-2.png"
      })]
    });
  } else {
    return null;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FooterIllustrationsV1);

/***/ })

};
;
//# sourceMappingURL=265.js.map
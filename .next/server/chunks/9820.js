;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="77dc0a12-b09b-46f2-9643-cd07df502918",e._sentryDebugIdIdentifier="sentry-dbid-77dc0a12-b09b-46f2-9643-cd07df502918")}catch(e){}}();
"use strict";
exports.id = 9820;
exports.ids = [9820];
exports.modules = {

/***/ 9820:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8300);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3648);
/* harmony import */ var _mui_material_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers_general__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3110);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);









// ** MUI Imports
const TrophyImg = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_5__.styled)('img')({
  right: 36,
  top: 70,
  position: 'absolute'
});

const Trophy = ({
  data,
  updateData
}) => {
  const onItemChange = (_field, _value) => {
    const _item = data;
    _item[_field] = _value;
    updateData(_item);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default()), {
    sx: {
      position: 'relative'
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2___default()), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
        style: {
          float: 'right'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((_mui_material_Switch__WEBPACK_IMPORTED_MODULE_3___default()), {
          checked: (data === null || data === void 0 ? void 0 : data.status) === '1',
          onChange: e => {
            var _e$target;

            return onItemChange('status', e !== null && e !== void 0 && (_e$target = e.target) !== null && _e$target !== void 0 && _e$target.checked ? 1 : 0);
          },
          inputProps: {
            'aria-label': 'controlled'
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
        variant: "h6",
        children: data === null || data === void 0 ? void 0 : data.payment_method_name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
        variant: "body2",
        sx: {
          letterSpacing: '0.25px'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
          variant: "p",
          sx: {
            my: 4,
            color: 'primary.main'
          },
          children: ["H+", data === null || data === void 0 ? void 0 : data.settlement_day, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("br", {}), "(", (0,_helpers_general__WEBPACK_IMPORTED_MODULE_6__/* .format_rupiah */ .j7)(parseInt(data === null || data === void 0 ? void 0 : data.fee_original)), " + ", parseFloat(data === null || data === void 0 ? void 0 : data.fee_original_percent), "%)"]
        }), (data === null || data === void 0 ? void 0 : data.settlement_on_weekend) === '0' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
          color: "error",
          children: "Libur Tidak Kliring"
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
          color: "primary",
          children: "Libur Tetap Kliring"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(TrophyImg, {
        alt: data === null || data === void 0 ? void 0 : data.payment_method_code,
        src: data === null || data === void 0 ? void 0 : data.payment_method_image_url,
        width: 70,
        height: 'auto'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
        variant: "p",
        children: [(0,_helpers_general__WEBPACK_IMPORTED_MODULE_6__/* .format_rupiah */ .j7)(data === null || data === void 0 ? void 0 : data.min_transaction), " - ", (0,_helpers_general__WEBPACK_IMPORTED_MODULE_6__/* .format_rupiah */ .j7)(data === null || data === void 0 ? void 0 : data.max_transaction)]
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

const getInitialPropsWrapper = getInitialPropsWrappers['/admin/master/views/metode-pembayaran'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/admin/master/views/metode-pembayaran')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/admin/master/views/metode-pembayaran')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ })

};
;
//# sourceMappingURL=9820.js.map
;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="14a365f4-0fed-4b41-b479-c50a35e34478",e._sentryDebugIdIdentifier="sentry-dbid-14a365f4-0fed-4b41-b479-c50a35e34478")}catch(e){}}();
"use strict";
exports.id = 7309;
exports.ids = [7309];
exports.modules = {

/***/ 7309:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8300);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7541);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1586);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4451);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2219);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1838);
/* harmony import */ var _mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3776);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var mdi_material_ui_MenuUp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8351);
/* harmony import */ var mdi_material_ui_MenuUp__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_MenuUp__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _helpers_general__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3110);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);














function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TotalEarning = ({
  data = []
}) => {
  var _format_rupiah, _data$;

  const _data = data === null || data === void 0 ? void 0 : data.map((item, index) => ({
    progress: parseInt(item === null || item === void 0 ? void 0 : item.keuntungan) / parseInt(item === null || item === void 0 ? void 0 : item.saldo_real) * 100,
    imgHeight: 30,
    title: item === null || item === void 0 ? void 0 : item.merchant_name,
    color: 'success',
    amount: item === null || item === void 0 ? void 0 : item.keuntungan,
    subtitle: item === null || item === void 0 ? void 0 : item.merchant_owner,
    imgSrc: `/images/logo.png`
  }));

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_3___default()), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5___default()), {
      title: "3 Merchant Terbaik",
      titleTypographyProps: {
        sx: {
          lineHeight: '1.6 !important',
          letterSpacing: '0.15px !important'
        }
      },
      action: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
        size: "small",
        "aria-label": "settings",
        className: "card-more-options",
        sx: {
          color: 'text.secondary'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_9___default()), {})
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_4___default()), {
      sx: {
        pt: theme => `${theme.spacing(2.25)} !important`
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {
        sx: {
          mb: 1.5,
          display: 'flex',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8___default()), {
          variant: "h4",
          sx: {
            fontWeight: 600,
            fontSize: '2.125rem !important'
          },
          children: (_format_rupiah = (0,_helpers_general__WEBPACK_IMPORTED_MODULE_11__/* .format_rupiah */ .j7)((_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.saldo_real)) !== null && _format_rupiah !== void 0 ? _format_rupiah : 0
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {
          sx: {
            display: 'flex',
            alignItems: 'center',
            color: 'success.main'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((mdi_material_ui_MenuUp__WEBPACK_IMPORTED_MODULE_10___default()), {
            sx: {
              fontSize: '1.875rem',
              verticalAlign: 'middle'
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8___default()), {
            variant: "body2",
            sx: {
              fontWeight: 600,
              color: 'success.main'
            },
            children: "100%"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8___default()), {
        component: "p",
        variant: "caption",
        sx: {
          mb: 10
        },
        children: "Data Keuntungan Tahun Ini"
      }), _data.map((item, index) => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {
          sx: _objectSpread({
            display: 'flex',
            alignItems: 'center'
          }, index !== data.length - 1 ? {
            mb: 8.5
          } : {}),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1___default()), {
            variant: "rounded",
            sx: {
              mr: 3,
              width: 40,
              height: 40,
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("img", {
              src: item.imgSrc,
              alt: item.title,
              height: item.imgHeight
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {
            sx: {
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {
              sx: {
                marginRight: 2,
                display: 'flex',
                flexDirection: 'column'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8___default()), {
                variant: "body2",
                sx: {
                  mb: 0.5,
                  fontWeight: 600,
                  color: 'text.primary'
                },
                children: item.title
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8___default()), {
                variant: "caption",
                children: item.subtitle
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {
              sx: {
                minWidth: 85,
                display: 'flex',
                flexDirection: 'column'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8___default()), {
                variant: "body2",
                sx: {
                  mb: 2,
                  fontWeight: 600,
                  color: 'text.primary'
                },
                children: item.amount
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_7___default()), {
                color: item.color,
                value: item.progress,
                variant: "determinate"
              })]
            })]
          })]
        }, item.title);
      })]
    })]
  });
};

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: TotalEarning
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

const getInitialPropsWrapper = getInitialPropsWrappers['/admin/views/dashboard/TotalEarning'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/admin/views/dashboard/TotalEarning')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/admin/views/dashboard/TotalEarning')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ })

};
;
//# sourceMappingURL=7309.js.map
;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="04466dd7-2ad8-444f-809a-0e9c66a6fbdf",e._sentryDebugIdIdentifier="sentry-dbid-04466dd7-2ad8-444f-809a-0e9c66a6fbdf")}catch(e){}}();
"use strict";
exports.id = 7149;
exports.ids = [7149];
exports.modules = {

/***/ 7149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8300);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1586);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4451);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2219);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3776);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_core_components_react_apexcharts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5581);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);












// ** MUI Imports

const WeeklyOverview = ({
  data = [0, 0, 0, 0, 0, 0, 0]
}) => {
  // ** Hook
  const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__.useTheme)();
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: {
      show: false
    },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: {
      enabled: true
    },
    colors: [theme.palette.warning.main, theme.palette.warning.main, theme.palette.warning.main, theme.palette.warning.main, theme.palette.primary.main, theme.palette.success.main, theme.palette.success.main],
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    xaxis: {
      categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      tickPlacement: 'on',
      labels: {
        show: true
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
      }
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default()), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default()), {
      title: "Grafik Penarikan Merchant",
      titleTypographyProps: {
        sx: {
          lineHeight: '5rem !important',
          letterSpacing: '0.15px !important'
        }
      },
      action: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default()), {
        size: "small",
        "aria-label": "settings",
        className: "card-more-options",
        sx: {
          color: 'text.secondary'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)((mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_8___default()), {})
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3___default()), {
      sx: {
        '& .apexcharts-xcrosshairs.apexcharts-active': {
          opacity: 0
        }
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(src_core_components_react_apexcharts__WEBPACK_IMPORTED_MODULE_9__/* .default */ .Z, {
        type: "bar",
        height: 205,
        options: options,
        series: [{
          data
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
        sx: {
          mb: 7,
          display: 'flex',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
          variant: "h5",
          sx: {
            mr: 4
          },
          children: "30%"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
          variant: "body2",
          children: "Jumlah penarikam uang Merchant terbanyak \uD83D\uDE0E pada weekend"
        })]
      })]
    })]
  });
};

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: WeeklyOverview
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

const getInitialPropsWrapper = getInitialPropsWrappers['/admin/views/dashboard/WeeklyOverviewWithdraw'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/admin/views/dashboard/WeeklyOverviewWithdraw')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/admin/views/dashboard/WeeklyOverviewWithdraw')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ })

};
;
//# sourceMappingURL=7149.js.map
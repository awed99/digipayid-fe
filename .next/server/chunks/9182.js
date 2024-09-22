;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d665f929-ecf2-47ab-94fa-eeb2df534d44",e._sentryDebugIdIdentifier="sentry-dbid-d665f929-ecf2-47ab-94fa-eeb2df534d44")}catch(e){}}();
"use strict";
exports.id = 9182;
exports.ids = [9182];
exports.modules = {

/***/ 9182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8300);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7949);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Chip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4066);
/* harmony import */ var _mui_material_Chip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Chip__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9685);
/* harmony import */ var _mui_material_Table__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Table__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_TableBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6480);
/* harmony import */ var _mui_material_TableBody__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableBody__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2152);
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2960);
/* harmony import */ var _mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_material_TableHead__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9653);
/* harmony import */ var _mui_material_TableHead__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableHead__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_TableRow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5103);
/* harmony import */ var _mui_material_TableRow__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableRow__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);














// ** MUI Imports

const DashboardTable = ({
  merchants = []
}) => {
  const statusObj = {
    1: {
      color: 'info'
    },
    9: {
      color: 'error'
    },
    1: {
      color: 'primary'
    },
    0: {
      color: 'warning'
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default()), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10___default()), {
      variant: "h5",
      sx: {
        pl: 5,
        pt: 5
      },
      children: "Data Merchants"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_7___default()), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_Table__WEBPACK_IMPORTED_MODULE_4___default()), {
        sx: {
          minWidth: 800
        },
        "aria-label": "table in dashboard",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableHead__WEBPACK_IMPORTED_MODULE_8___default()), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_TableRow__WEBPACK_IMPORTED_MODULE_9___default()), {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: "Merchant Name"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: "Owner Name"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: "No Whatsapp"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: "Email"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: "Tanggal Daftar"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: "Status"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableBody__WEBPACK_IMPORTED_MODULE_5___default()), {
          children: merchants.map(row => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((_mui_material_TableRow__WEBPACK_IMPORTED_MODULE_9___default()), {
            hover: true,
            sx: {
              '&:last-of-type td, &:last-of-type th': {
                border: 0
              }
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              sx: {
                py: theme => `${theme.spacing(0.5)} !important`
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Box, {
                sx: {
                  display: 'flex',
                  flexDirection: 'column'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10___default()), {
                  sx: {
                    fontWeight: 500,
                    fontSize: '0.875rem !important'
                  },
                  children: row.merchant_name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10___default()), {
                  variant: "caption",
                  children: row.designation
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: row.username
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Link, {
                href: `https://wa.me/${row.merchant_wa.replace(/^0/, '62')}`,
                target: "_blank",
                children: row.merchant_wa
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: row.email
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: moment__WEBPACK_IMPORTED_MODULE_11___default()(row.created_at).format('ddd, DD MMMM YYYY hh:mm')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_6___default()), {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((_mui_material_Chip__WEBPACK_IMPORTED_MODULE_3___default()), {
                label: row.is_active ? 'Active' : 'Inactive',
                color: statusObj[row.is_active].color,
                sx: {
                  height: 24,
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': {
                    fontWeight: 500
                  }
                }
              })
            })]
          }, row.name))
        })]
      })
    })]
  });
};

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: DashboardTable
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

const getInitialPropsWrapper = getInitialPropsWrappers['/admin/views/dashboard/TableMerchants'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/admin/views/dashboard/TableMerchants')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/admin/views/dashboard/TableMerchants')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ })

};
;
//# sourceMappingURL=9182.js.map
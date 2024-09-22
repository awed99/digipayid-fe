;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5317e462-5eb5-4ea8-84b8-13924cf22caa",e._sentryDebugIdIdentifier="sentry-dbid-5317e462-5eb5-4ea8-84b8-13924cf22caa")}catch(e){}}();
"use strict";
exports.id = 4677;
exports.ids = [4677];
exports.modules = {

/***/ 4677:
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
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4451);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(818);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);










// ** MUI Imports
const depositData = [{
  logoWidth: 28,
  logoHeight: 29,
  amount: '+$4,650',
  subtitle: 'Sell UI Kit',
  title: 'Gumroad Account',
  logo: '/images/logos/gumroad.png'
}, {
  logoWidth: 38,
  logoHeight: 38,
  amount: '+$92,705',
  title: 'Mastercard',
  subtitle: 'Wallet deposit',
  logo: '/images/logos/mastercard-label.png'
}, {
  logoWidth: 20,
  logoHeight: 28,
  amount: '+$957',
  title: 'Stripe Account',
  subtitle: 'iOS Application',
  logo: '/images/logos/stripe.png'
}, {
  logoWidth: 34,
  logoHeight: 32,
  amount: '+$6,837',
  title: 'American Bank',
  subtitle: 'Bank Transfer',
  logo: '/images/logos/american-bank.png'
}, {
  logoWidth: 33,
  logoHeight: 22,
  amount: '+$446',
  title: 'Bank Account',
  subtitle: 'Wallet deposit',
  logo: '/images/logos/citi-bank.png'
}];
const withdrawData = [{
  logoWidth: 29,
  logoHeight: 30,
  amount: '-$145',
  title: 'Google Adsense',
  subtitle: 'Paypal deposit',
  logo: '/images/logos/google.png'
}, {
  logoWidth: 34,
  logoHeight: 34,
  amount: '-$1870',
  title: 'Github Enterprise',
  logo: '/images/logos/github.png',
  subtitle: 'Security & compliance'
}, {
  logoWidth: 30,
  logoHeight: 30,
  amount: '-$450',
  title: 'Upgrade Slack Plan',
  subtitle: 'Debit card deposit',
  logo: '/images/logos/slack.png'
}, {
  logoWidth: 30,
  logoHeight: 30,
  amount: '-$540',
  title: 'Digital Ocean',
  subtitle: 'Cloud Hosting',
  logo: '/images/logos/digital-ocean.png'
}, {
  logoWidth: 36,
  logoHeight: 21,
  amount: '-$21',
  title: 'AWS Account',
  logo: '/images/logos/aws.png',
  subtitle: 'Choosing a Cloud Platform'
}]; // Styled Divider component

const Divider = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.styled)((_mui_material_Divider__WEBPACK_IMPORTED_MODULE_7___default()))(({
  theme
}) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

const DepositWithdraw = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default()), {
    sx: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: ['column', 'column', 'row']
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
      sx: {
        width: '100%'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default()), {
        title: "Renbut Gaji",
        sx: {
          pt: 5.5,
          alignItems: 'center',
          '& .MuiCardHeader-action': {
            mt: 0.6
          }
        },
        action: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
          variant: "caption",
          children: "View All"
        }),
        titleTypographyProps: {
          variant: 'h6',
          sx: {
            lineHeight: '1.6 !important',
            letterSpacing: '0.15px !important'
          }
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6___default()), {
        sx: {
          pb: theme => `${theme.spacing(5.5)} !important`
        },
        children: depositData.map((item, index) => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
            sx: {
              display: 'flex',
              alignItems: 'center',
              mb: index !== depositData.length - 1 ? 6 : 0
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
              sx: {
                minWidth: 38,
                display: 'flex',
                justifyContent: 'center'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                src: item.logo,
                alt: item.title,
                width: item.logoWidth,
                height: item.logoHeight
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
              sx: {
                ml: 4,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
                sx: {
                  marginRight: 2,
                  display: 'flex',
                  flexDirection: 'column'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
                  sx: {
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  },
                  children: item.title
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
                  variant: "caption",
                  children: item.subtitle
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
                variant: "subtitle2",
                sx: {
                  fontWeight: 600,
                  color: 'success.main'
                },
                children: item.amount
              })]
            })]
          }, item.title);
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Divider, {
      flexItem: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
      sx: {
        width: '100%'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default()), {
        title: "Tunkin",
        sx: {
          pt: 5.5,
          alignItems: 'center',
          '& .MuiCardHeader-action': {
            mt: 0.6
          }
        },
        action: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
          variant: "caption",
          children: "View All"
        }),
        titleTypographyProps: {
          variant: 'h6',
          sx: {
            lineHeight: '1.6 !important',
            letterSpacing: '0.15px !important'
          }
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6___default()), {
        sx: {
          pb: theme => `${theme.spacing(5.5)} !important`
        },
        children: withdrawData.map((item, index) => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
            sx: {
              display: 'flex',
              alignItems: 'center',
              mb: index !== depositData.length - 1 ? 6 : 0
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
              sx: {
                minWidth: 36,
                display: 'flex',
                justifyContent: 'center'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                src: item.logo,
                alt: item.title,
                width: item.logoWidth,
                height: item.logoHeight
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
              sx: {
                ml: 4,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
                sx: {
                  marginRight: 2,
                  display: 'flex',
                  flexDirection: 'column'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
                  sx: {
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  },
                  children: item.title
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
                  variant: "caption",
                  children: item.subtitle
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
                variant: "subtitle2",
                sx: {
                  fontWeight: 600,
                  color: 'error.main'
                },
                children: item.amount
              })]
            })]
          }, item.title);
        })
      })]
    })]
  });
};

var serverComponentModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: DepositWithdraw
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

const getInitialPropsWrapper = getInitialPropsWrappers['/admin/views/dashboard/DepositWithdraw'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/admin/views/dashboard/DepositWithdraw')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/admin/views/dashboard/DepositWithdraw')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;




/***/ })

};
;
//# sourceMappingURL=4677.js.map
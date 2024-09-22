;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1638544f-aa97-4664-991f-8029dc528d84",e._sentryDebugIdIdentifier="sentry-dbid-1638544f-aa97-4664-991f-8029dc528d84")}catch(e){}}();
"use strict";
exports.id = 2434;
exports.ids = [2434];
exports.modules = {

/***/ 9097:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1586);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4451);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(818);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
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

const Divider = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)((_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6___default()))(({
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default()), {
    sx: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: ['column', 'column', 'row']
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
      sx: {
        width: '100%'
      },
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3___default()), {
        title: "Renbut Gaji",
        sx: {
          pt: 5.5,
          alignItems: 'center',
          '& .MuiCardHeader-action': {
            mt: 0.6
          }
        },
        action: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
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
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_5___default()), {
        sx: {
          pb: theme => `${theme.spacing(5.5)} !important`
        },
        children: depositData.map((item, index) => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
            sx: {
              display: 'flex',
              alignItems: 'center',
              mb: index !== depositData.length - 1 ? 6 : 0
            },
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
              sx: {
                minWidth: 38,
                display: 'flex',
                justifyContent: 'center'
              },
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("img", {
                src: item.logo,
                alt: item.title,
                width: item.logoWidth,
                height: item.logoHeight
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
              sx: {
                ml: 4,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
                sx: {
                  marginRight: 2,
                  display: 'flex',
                  flexDirection: 'column'
                },
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
                  sx: {
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  },
                  children: item.title
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
                  variant: "caption",
                  children: item.subtitle
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
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
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(Divider, {
      flexItem: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
      sx: {
        width: '100%'
      },
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3___default()), {
        title: "Tunkin",
        sx: {
          pt: 5.5,
          alignItems: 'center',
          '& .MuiCardHeader-action': {
            mt: 0.6
          }
        },
        action: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
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
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_5___default()), {
        sx: {
          pb: theme => `${theme.spacing(5.5)} !important`
        },
        children: withdrawData.map((item, index) => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
            sx: {
              display: 'flex',
              alignItems: 'center',
              mb: index !== depositData.length - 1 ? 6 : 0
            },
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
              sx: {
                minWidth: 36,
                display: 'flex',
                justifyContent: 'center'
              },
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("img", {
                src: item.logo,
                alt: item.title,
                width: item.logoWidth,
                height: item.logoHeight
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
              sx: {
                ml: 4,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
                sx: {
                  marginRight: 2,
                  display: 'flex',
                  flexDirection: 'column'
                },
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
                  sx: {
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  },
                  children: item.title
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
                  variant: "caption",
                  children: item.subtitle
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DepositWithdraw);

/***/ }),

/***/ 4455:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1586);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1874);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7541);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2219);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4451);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var mdi_material_ui_ChevronUp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(321);
/* harmony import */ var mdi_material_ui_ChevronUp__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_ChevronUp__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var mdi_material_ui_ChevronDown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5968);
/* harmony import */ var mdi_material_ui_ChevronDown__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_ChevronDown__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3776);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ** MUI Imports







 // ** Icons Imports






const data = [{
  sales: '894k',
  trendDir: 'up',
  subtitle: '(SKB 3 Menteri) Sudah Terbit...',
  title: 'Dokumen',
  avatarText: 'M',
  trendNumber: 'Disetujui',
  avatarColor: 'success',
  trend: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((mdi_material_ui_ChevronUp__WEBPACK_IMPORTED_MODULE_8___default()), {
    sx: {
      color: 'success.main',
      fontWeight: 600
    }
  })
}, {
  sales: '645k',
  subtitle: '(SK Kemenkeu) Ubah anggaran keluar...',
  trendDir: 'down',
  title: 'Dokumen',
  avatarText: 'K',
  trendNumber: 'Revisi',
  avatarColor: 'error',
  trend: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((mdi_material_ui_ChevronDown__WEBPACK_IMPORTED_MODULE_9___default()), {
    sx: {
      color: 'error.main',
      fontWeight: 600
    }
  })
}, {
  sales: '148k',
  title: 'Dokumen',
  trendDir: 'up',
  avatarText: 'R',
  subtitle: '(Surat Rekomendasi Menhan) Siap Terbit...',
  trendNumber: 'Disetujui',
  avatarColor: 'warning',
  trend: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((mdi_material_ui_ChevronUp__WEBPACK_IMPORTED_MODULE_8___default()), {
    sx: {
      color: 'success.main',
      fontWeight: 600
    }
  })
}, {
  sales: '86k',
  title: 'Dokumen',
  trendDir: 'down',
  avatarText: 'D',
  subtitle: '(Surat Tugas) Tambahkan detail tugas...',
  trendNumber: 'Revisi',
  avatarColor: 'secondary',
  trend: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((mdi_material_ui_ChevronDown__WEBPACK_IMPORTED_MODULE_9___default()), {
    sx: {
      color: 'error.main',
      fontWeight: 600
    }
  })
}, {
  sales: '42k',
  title: 'Dokumen',
  trendDir: 'up',
  avatarText: 'E',
  subtitle: '(SP Menhan) Persetujuan anggaran 2024 ditambah...',
  trendNumber: 'Disetujui',
  avatarColor: 'error',
  trend: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((mdi_material_ui_ChevronUp__WEBPACK_IMPORTED_MODULE_8___default()), {
    sx: {
      color: 'success.main',
      fontWeight: 600
    }
  })
}];

const SalesByCountries = ({
  title
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default()), {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_6___default()), {
      title: title,
      titleTypographyProps: {
        sx: {
          lineHeight: '1.2 !important',
          letterSpacing: '0.31px !important'
        }
      },
      action: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default()), {
        size: "small",
        "aria-label": "settings",
        className: "card-more-options",
        sx: {
          color: 'text.secondary'
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_10___default()), {})
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_7___default()), {
      sx: {
        pt: theme => `${theme.spacing(2)} !important`
      },
      children: data.map((item, index) => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
          sx: _objectSpread({
            display: 'flex',
            alignItems: 'center'
          }, index !== data.length - 1 ? {
            mb: 5.875
          } : {}),
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_3___default()), {
            sx: {
              width: 38,
              height: 38,
              marginRight: 3,
              fontSize: '1rem',
              color: 'common.white',
              backgroundColor: `${item.avatarColor}.main`
            },
            children: item.avatarText
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
            sx: {
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
              sx: {
                marginRight: 2,
                display: 'flex',
                flexDirection: 'column'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
                sx: {
                  display: 'flex'
                },
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
                  sx: {
                    mr: 0.5,
                    fontWeight: 600,
                    letterSpacing: '0.25px'
                  },
                  children: item.title
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
                  sx: {
                    display: 'flex',
                    alignItems: 'center'
                  },
                  children: [item.trend, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
                    variant: "caption",
                    sx: {
                      fontWeight: 600,
                      lineHeight: 1.5,
                      color: item.trendDir === 'down' ? 'error.main' : 'success.main'
                    },
                    children: item.trendNumber
                  })]
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
                variant: "caption",
                sx: {
                  lineHeight: 1.5
                },
                children: item.subtitle
              })]
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
              sx: {
                display: 'flex',
                textAlign: 'end',
                flexDirection: 'column'
              },
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
                sx: {
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  lineHeight: 1.72,
                  letterSpacing: '0.22px'
                },
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
                  variant: "contained",
                  size: "small",
                  children: "Buka"
                })
              })
            })]
          })]
        }, item.title);
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SalesByCountries);

/***/ })

};
;
//# sourceMappingURL=2434.js.map
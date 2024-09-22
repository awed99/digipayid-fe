;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f248d27e-aea1-476f-b842-6dd2a6a8f726",e._sentryDebugIdIdentifier="sentry-dbid-f248d27e-aea1-476f-b842-6dd2a6a8f726")}catch(e){}}();
"use strict";
exports.id = 1740;
exports.ids = [1740];
exports.modules = {

/***/ 7917:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7541);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1586);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4451);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5224);
/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2219);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var mdi_material_ui_AccountOutline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9696);
/* harmony import */ var mdi_material_ui_AccountOutline__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_AccountOutline__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var mdi_material_ui_CellphoneLink__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2506);
/* harmony import */ var mdi_material_ui_CellphoneLink__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_CellphoneLink__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var mdi_material_ui_CurrencyUsd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6348);
/* harmony import */ var mdi_material_ui_CurrencyUsd__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_CurrencyUsd__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3776);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var mdi_material_ui_TrendingUp__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7154);
/* harmony import */ var mdi_material_ui_TrendingUp__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_TrendingUp__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _helpers_general__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3110);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__);
// ** MUI Imports







 // ** Icons Imports










const StatisticsCard = ({
  products = 0,
  items = 0,
  buyers = 0,
  profits = 0
}) => {
  const renderStats = () => {
    const salesData = [{
      stats: (0,_helpers_general__WEBPACK_IMPORTED_MODULE_13__/* .format_rupiah */ .j7)(products),
      title: 'Produk Terjual',
      color: 'primary',
      icon: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((mdi_material_ui_TrendingUp__WEBPACK_IMPORTED_MODULE_12___default()), {
        sx: {
          fontSize: '1.75rem'
        }
      })
    }, {
      stats: (0,_helpers_general__WEBPACK_IMPORTED_MODULE_13__/* .format_rupiah */ .j7)(items),
      color: 'warning',
      title: 'Item Terjual',
      icon: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((mdi_material_ui_CellphoneLink__WEBPACK_IMPORTED_MODULE_9___default()), {
        sx: {
          fontSize: '1.75rem'
        }
      })
    }, {
      stats: (0,_helpers_general__WEBPACK_IMPORTED_MODULE_13__/* .format_rupiah */ .j7)(buyers),
      title: 'Jumlah Pembelian',
      color: 'secondary',
      icon: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((mdi_material_ui_AccountOutline__WEBPACK_IMPORTED_MODULE_8___default()), {
        sx: {
          fontSize: '1.75rem'
        }
      })
    }, {
      stats: (0,_helpers_general__WEBPACK_IMPORTED_MODULE_13__/* .format_rupiah */ .j7)(profits),
      color: 'success',
      title: 'Total Pendapatan',
      icon: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((mdi_material_ui_CurrencyUsd__WEBPACK_IMPORTED_MODULE_10___default()), {
        sx: {
          fontSize: '1.75rem'
        }
      })
    }];
    return salesData.map((item, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((_mui_material_Grid__WEBPACK_IMPORTED_MODULE_5___default()), {
      item: true,
      xs: 12,
      sm: 3,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
        sx: {
          display: 'flex',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_0___default()), {
          variant: "rounded",
          sx: {
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          },
          children: item.icon
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
          sx: {
            display: 'flex',
            flexDirection: 'column'
          },
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
            variant: "caption",
            children: item.title
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
            variant: "h6",
            children: item.stats
          })]
        })]
      }, index)
    }, index));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default()), {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default()), {
      title: 'Statistik Transaksi Tahun Ini',
      action: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
        size: "small",
        "aria-label": "settings",
        className: "card-more-options",
        sx: {
          color: 'text.secondary'
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_11___default()), {})
      }),
      subheader: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
        variant: "body2",
        children: ["Statistik transaksi tahun ", new Date().getFullYear()]
      }),
      titleTypographyProps: {
        sx: {
          mb: 2.5,
          lineHeight: '2rem !important',
          letterSpacing: '0.15px !important'
        }
      }
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3___default()), {
      sx: {
        pt: theme => `${theme.spacing(3)} !important`
      },
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx((_mui_material_Grid__WEBPACK_IMPORTED_MODULE_5___default()), {
        container: true,
        spacing: [5, 0],
        children: renderStats()
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatisticsCard);

/***/ }),

/***/ 2589:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7949);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Chip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4066);
/* harmony import */ var _mui_material_Chip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Chip__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9685);
/* harmony import */ var _mui_material_Table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Table__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_TableBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6480);
/* harmony import */ var _mui_material_TableBody__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableBody__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2152);
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2960);
/* harmony import */ var _mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_TableHead__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9653);
/* harmony import */ var _mui_material_TableHead__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableHead__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_material_TableRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5103);
/* harmony import */ var _mui_material_TableRow__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableRow__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
// ** MUI Imports














const DashboardTable = ({
  users = []
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default()), {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_9___default()), {
      variant: "h5",
      sx: {
        pl: 5,
        pt: 5
      },
      children: "Data User"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_6___default()), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Table__WEBPACK_IMPORTED_MODULE_3___default()), {
        sx: {
          minWidth: 800
        },
        "aria-label": "table in dashboard",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableHead__WEBPACK_IMPORTED_MODULE_7___default()), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_TableRow__WEBPACK_IMPORTED_MODULE_8___default()), {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: "Name"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: "User Role"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: "No Whatsapp"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: "Email"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: "Tanggal Daftar"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: "Status"
            })]
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableBody__WEBPACK_IMPORTED_MODULE_4___default()), {
          children: users === null || users === void 0 ? void 0 : users.map(row => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_TableRow__WEBPACK_IMPORTED_MODULE_8___default()), {
            hover: true,
            sx: {
              '&:last-of-type td, &:last-of-type th': {
                border: 0
              }
            },
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              sx: {
                py: theme => `${theme.spacing(0.5)} !important`
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_0__.Box, {
                sx: {
                  display: 'flex',
                  flexDirection: 'column'
                },
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_9___default()), {
                  sx: {
                    fontWeight: 500,
                    fontSize: '0.875rem !important'
                  },
                  children: row.username
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_9___default()), {
                  variant: "caption",
                  children: row.designation
                })]
              })
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: row.user_privilege_name
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_0__.Link, {
                href: `https://wa.me/${row.merchant_wa.replace(/^0/, '62')}`,
                target: "_blank",
                children: row.merchant_wa
              })
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: row.email
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: moment__WEBPACK_IMPORTED_MODULE_10___default()(row.created_at).format('ddd, DD MMMM YYYY hh:mm')
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Chip__WEBPACK_IMPORTED_MODULE_2___default()), {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DashboardTable);

/***/ }),

/***/ 7037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7541);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1838);
/* harmony import */ var _mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3776);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var mdi_material_ui_MenuUp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8351);
/* harmony import */ var mdi_material_ui_MenuUp__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_MenuUp__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _helpers_general__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3110);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ** MUI Imports







 // ** Icons Imports







const TotalEarning = ({
  data = []
}) => {
  var _data$;

  const _data = data === null || data === void 0 ? void 0 : data.map((item, index) => ({
    progress: parseInt(item === null || item === void 0 ? void 0 : item.qty) / parseInt(item === null || item === void 0 ? void 0 : item.pembelian) * 100,
    imgHeight: 30,
    title: item === null || item === void 0 ? void 0 : item.product,
    color: index === 0 ? 'success' : index === 1 ? 'primary' : 'warning',
    amount: item === null || item === void 0 ? void 0 : item.qty,
    subtitle: item === null || item === void 0 ? void 0 : item.code,
    imgSrc: `${"http://localhost:8080"}${item === null || item === void 0 ? void 0 : item.image}`
  }));

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_2___default()), {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default()), {
      title: "3 Produk Terlaris",
      titleTypographyProps: {
        sx: {
          lineHeight: '1.6 !important',
          letterSpacing: '0.15px !important'
        }
      },
      action: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default()), {
        size: "small",
        "aria-label": "settings",
        className: "card-more-options",
        sx: {
          color: 'text.secondary'
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_8___default()), {})
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_3___default()), {
      sx: {
        pt: theme => `${theme.spacing(2.25)} !important`
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
        sx: {
          mb: 1.5,
          display: 'flex',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
          variant: "h4",
          sx: {
            fontWeight: 600,
            fontSize: '2.125rem !important'
          },
          children: (0,_helpers_general__WEBPACK_IMPORTED_MODULE_10__/* .format_rupiah */ .j7)((_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.pembelian)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
          sx: {
            display: 'flex',
            alignItems: 'center',
            color: 'success.main'
          },
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((mdi_material_ui_MenuUp__WEBPACK_IMPORTED_MODULE_9___default()), {
            sx: {
              fontSize: '1.875rem',
              verticalAlign: 'middle'
            }
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
            variant: "body2",
            sx: {
              fontWeight: 600,
              color: 'success.main'
            },
            children: "100%"
          })]
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
        component: "p",
        variant: "caption",
        sx: {
          mb: 10
        },
        children: "Data Penjualan Tahun Ini"
      }), _data.map((item, index) => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
          sx: _objectSpread({
            display: 'flex',
            alignItems: 'center'
          }, index !== data.length - 1 ? {
            mb: 8.5
          } : {}),
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_0___default()), {
            variant: "rounded",
            sx: {
              mr: 3,
              width: 40,
              height: 40,
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
            },
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("img", {
              src: item.imgSrc,
              alt: item.title,
              height: item.imgHeight
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
            sx: {
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
              sx: {
                marginRight: 2,
                display: 'flex',
                flexDirection: 'column'
              },
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
                variant: "body2",
                sx: {
                  mb: 0.5,
                  fontWeight: 600,
                  color: 'text.primary'
                },
                children: item.title
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
                variant: "caption",
                children: item.subtitle
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_1___default()), {
              sx: {
                minWidth: 85,
                display: 'flex',
                flexDirection: 'column'
              },
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
                variant: "body2",
                sx: {
                  mb: 2,
                  fontWeight: 600,
                  color: 'text.primary'
                },
                children: item.amount
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((_mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_6___default()), {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TotalEarning);

/***/ }),

/***/ 5058:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1874);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers_general__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3110);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
// ** MUI Imports






 // Styled component for the triangle shaped background image



const TriangleImg = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.styled)('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
}); // Styled component for the trophy image

const TrophyImg = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.styled)('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
});

const Trophy = ({
  saldo = '0'
}) => {
  // ** Hook
  const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png';
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default()), {
    sx: {
      position: 'relative'
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2___default()), {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
        variant: "h6",
        children: "Saldo Saat Ini"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
        variant: "body2",
        sx: {
          letterSpacing: '0.25px'
        },
        children: "Uang yang tersedia setelah porses kliring"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
        variant: "h5",
        sx: {
          my: 4,
          color: 'primary.main'
        },
        children: ["IDR ", (0,_helpers_general__WEBPACK_IMPORTED_MODULE_6__/* .format_rupiah */ .j7)(saldo)]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_0___default()), {
        size: "small",
        variant: "contained",
        onClick: () => router.push('/dompet-digital'),
        children: "Dompet Digital"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(TriangleImg, {
        alt: "triangle background",
        src: `/images/misc/${imageSrc}`
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(TrophyImg, {
        alt: "trophy",
        src: "/images/logo.png"
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trophy);

/***/ }),

/***/ 2850:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1586);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4501);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3988);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4451);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2219);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8082);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3776);
/* harmony import */ var mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_core_components_react_apexcharts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5581);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
// ** MUI Imports






 // ** Icons Imports

 // ** Custom Components Imports





const WeeklyOverview = ({
  data = [0, 0, 0, 0, 0, 0, 0]
}) => {
  // ** Hook
  const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_5__.useTheme)();
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_1___default()), {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_3___default()), {
      title: "Grafik Mingguan",
      titleTypographyProps: {
        sx: {
          lineHeight: '5rem !important',
          letterSpacing: '0.15px !important'
        }
      },
      action: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_4___default()), {
        size: "small",
        "aria-label": "settings",
        className: "card-more-options",
        sx: {
          color: 'text.secondary'
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((mdi_material_ui_DotsVertical__WEBPACK_IMPORTED_MODULE_7___default()), {})
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_2___default()), {
      sx: {
        '& .apexcharts-xcrosshairs.apexcharts-active': {
          opacity: 0
        }
      },
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(src_core_components_react_apexcharts__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z, {
        type: "bar",
        height: 205,
        options: options,
        series: [{
          data
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_0___default()), {
        sx: {
          mb: 7,
          display: 'flex',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_6___default()), {
          variant: "h5",
          sx: {
            mr: 4
          },
          children: "30%"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_6___default()), {
          variant: "body2",
          children: "Jumlah penjualan terbaik \uD83D\uDE0E pada weekend"
        })]
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WeeklyOverview);

/***/ })

};
;
//# sourceMappingURL=1740.js.map
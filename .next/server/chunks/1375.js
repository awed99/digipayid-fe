;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6d7e0b1e-4091-4dfc-9ec6-0dcaed5f4e60",e._sentryDebugIdIdentifier="sentry-dbid-6d7e0b1e-4091-4dfc-9ec6-0dcaed5f4e60")}catch(e){}}();
"use strict";
exports.id = 1375;
exports.ids = [1375];
exports.modules = {

/***/ 1375:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ MaterialUIPickers)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6177);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7949);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_x_date_pickers_AdapterDayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9586);
/* harmony import */ var _mui_x_date_pickers_AdapterDayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_x_date_pickers_AdapterDayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_x_date_pickers_DatePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6444);
/* harmony import */ var _mui_x_date_pickers_DatePicker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_x_date_pickers_DatePicker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1126);
/* harmony import */ var _mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8349);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);









const DateRangePickerStyled = _emotion_styled__WEBPACK_IMPORTED_MODULE_0___default()('div')(() => ({
  display: 'flex',
  alignItems: 'center'
}));
function MaterialUIPickers(props) {
  const {
    onChange
  } = props;
  const {
    0: startDate,
    1: setStartDate
  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(dayjs__WEBPACK_IMPORTED_MODULE_5___default()().startOf('month'));
  const {
    0: endDate,
    1: setEndDate
  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(dayjs__WEBPACK_IMPORTED_MODULE_5___default()().endOf('month'));
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    onChange && onChange(dayjs__WEBPACK_IMPORTED_MODULE_5___default()(startDate).format('YYYY-MM-DD'), dayjs__WEBPACK_IMPORTED_MODULE_5___default()(endDate).format('YYYY-MM-DD'));
  }, [dayjs__WEBPACK_IMPORTED_MODULE_5___default()(startDate).format('YYYY-MM-DD'), dayjs__WEBPACK_IMPORTED_MODULE_5___default()(endDate).format('YYYY-MM-DD'), endDate]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Box, {
    sx: {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_4__.LocalizationProvider, {
      dateAdapter: _mui_x_date_pickers_AdapterDayjs__WEBPACK_IMPORTED_MODULE_2__.AdapterDayjs,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(_mui_x_date_pickers_DatePicker__WEBPACK_IMPORTED_MODULE_3__.DatePicker, {
        label: "Start Date",
        value: startDate,
        onChange: newValue => setStartDate(newValue),
        maxDate: endDate !== null && endDate !== void 0 ? endDate : null,
        sx: {
          m: 3
        }
      }), "\u2003", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(_mui_x_date_pickers_DatePicker__WEBPACK_IMPORTED_MODULE_3__.DatePicker, {
        label: "End Date",
        value: endDate,
        onChange: newValue => setEndDate(newValue),
        minDate: dayjs__WEBPACK_IMPORTED_MODULE_5___default()(startDate),
        maxDate: dayjs__WEBPACK_IMPORTED_MODULE_5___default()(startDate).add(3, 'month').endOf('month'),
        sx: {
          m: 3
        }
      })]
    })
  });
}

/***/ })

};
;
//# sourceMappingURL=1375.js.map
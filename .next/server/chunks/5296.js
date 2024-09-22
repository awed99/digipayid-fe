;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3c4de47b-81a7-418b-92d3-cf1fe9115a88",e._sentryDebugIdIdentifier="sentry-dbid-3c4de47b-81a7-418b-92d3-cf1fe9115a88")}catch(e){}}();
"use strict";
exports.id = 5296;
exports.ids = [5296];
exports.modules = {

/***/ 5296:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CustomPaginationGrid)
/* harmony export */ });
/* harmony import */ var _mui_material_Pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8927);
/* harmony import */ var _mui_material_Pagination__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Pagination__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5947);
/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function Pagination({
  page,
  onPageChange,
  className
}) {
  const apiRef = (0,_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__.useGridApiContext)();
  const pageCount = (0,_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__.useGridSelector)(apiRef, _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__.gridPageCountSelector);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx((_mui_material_Pagination__WEBPACK_IMPORTED_MODULE_0___default()), {
    color: "primary",
    className: className,
    count: pageCount,
    page: page + 1,
    onChange: (event, newPage) => {
      onPageChange(event, newPage - 1);
    }
  });
}

function CustomPagination(props) {
  return /*#__PURE__*/_jsx(GridPagination, _objectSpread({
    ActionsComponent: Pagination
  }, props));
}

function CustomPaginationGrid(props) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__.GridPagination, _objectSpread({
    ActionsComponent: Pagination
  }, props));
}

/***/ })

};
;
//# sourceMappingURL=5296.js.map
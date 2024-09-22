;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="514a2108-6ec3-497d-96cc-2ab2c7b79f3c",e._sentryDebugIdIdentifier="sentry-dbid-514a2108-6ec3-497d-96cc-2ab2c7b79f3c")}catch(e){}}();
"use strict";
exports.id = 2223;
exports.ids = [2223];
exports.modules = {

/***/ 2223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CustomizedDialogs)
/* harmony export */ });
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1962);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1874);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4606);
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4355);
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5949);
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2761);
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2219);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8035);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);











const BootstrapDialog = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_7__.styled)((_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2___default()))(({
  theme
}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));
function CustomizedDialogs({
  children,
  titleModal = 'Title Modal',
  ButtonDialogs = false,
  handleSubmitFunction = false,
  openModal = false,
  setOpenModal
}) {
  const [open, setOpen] = react__WEBPACK_IMPORTED_MODULE_8__.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
  };

  const buttonDialogs = handleSubmitFunction => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
    variant: "contained",
    size: "small",
    sx: {
      m: 3
    },
    onClick: handleSubmitFunction,
    children: "Submit"
  });

  react__WEBPACK_IMPORTED_MODULE_8__.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(react__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(BootstrapDialog, {
      onClose: handleClose,
      "aria-labelledby": "customized-dialog-title",
      open: open,
      fullWidth: true,
      maxWidth: 'md',
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default()), {
        sx: {
          m: 0,
          p: 2
        },
        id: "customized-dialog-title",
        children: titleModal
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
        "aria-label": "close",
        onClick: handleClose,
        sx: {
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_0___default()), {})
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4___default()), {
        dividers: true,
        children: children
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx((_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_3___default()), {
        children: handleSubmitFunction ? buttonDialogs(handleSubmitFunction) : ButtonDialogs ? ButtonDialogs : buttonDialogs(handleClose)
      })]
    })
  });
}

/***/ })

};
;
//# sourceMappingURL=2223.js.map
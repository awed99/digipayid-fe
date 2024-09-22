;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="239cb4b7-87e1-4f41-98f9-4b0eb3d320fc",e._sentryDebugIdIdentifier="sentry-dbid-239cb4b7-87e1-4f41-98f9-4b0eb3d320fc")}catch(e){}}();
"use strict";
exports.id = 8916;
exports.ids = [8916];
exports.modules = {

/***/ 8916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ handleChangeEl)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const handleChangeEl = async (_key, _e, values, setValues, schemaData, setErrorsField, errorsField = {}, _typeData = 'string') => {
  var _ref, _ref2, _e$target$value, _e$target, _ref3, _e$target$value2, _e$target2;

  let _dataKey0 = (_ref = (_ref2 = (_e$target$value = _e === null || _e === void 0 ? void 0 : (_e$target = _e.target) === null || _e$target === void 0 ? void 0 : _e$target.value) !== null && _e$target$value !== void 0 ? _e$target$value : _e === null || _e === void 0 ? void 0 : _e.value) !== null && _ref2 !== void 0 ? _ref2 : _e) !== null && _ref !== void 0 ? _ref : ''; // console.log('!(event instanceof Event): ', !(_e instanceof Event))


  if (!!(_e instanceof Event)) {
    if (_typeData === 'number' || _typeData === 'int' || _typeData === 'integer') {
      var _dataKey2, _parseInt;

      _dataKey0 = _dataKey0.toString() === '' ? '0' : _dataKey0.toString();
      _dataKey0 = (_dataKey2 = _dataKey0) === null || _dataKey2 === void 0 ? void 0 : _dataKey2.replace(/\./g, '').replace(/\,/g, '');
      _dataKey0 = !_dataKey0 || _dataKey0 === 'NaN' || _dataKey0 === NaN ? 0 : (_parseInt = parseInt(_dataKey0)) !== null && _parseInt !== void 0 ? _parseInt : 0;
    }

    values[_key] = _dataKey0;
  } else {
    values[_key] = _dataKey0;
  } // console.log('values: ', values)


  schemaData === null || schemaData === void 0 ? void 0 : schemaData.isValid(values).then(valid => {
    // console.log('valid: ', valid)
    if (!valid) {
      var _schemaData$validate;

      schemaData === null || schemaData === void 0 ? void 0 : (_schemaData$validate = schemaData.validate(values, {
        abortEarly: false
      })) === null || _schemaData$validate === void 0 ? void 0 : _schemaData$validate.catch(err => {
        var _err$inner;

        // const _err = err?.inner[0]?.path
        // const _errorsField = errorsField
        let errors = {};
        err === null || err === void 0 ? void 0 : (_err$inner = err.inner) === null || _err$inner === void 0 ? void 0 : _err$inner.map(item => {
          var _item$message, _item$message$charAt, _item$message2, _item$message2$slice;

          errors = _objectSpread(_objectSpread({}, errors), {}, {
            [item === null || item === void 0 ? void 0 : item.path]: ((item === null || item === void 0 ? void 0 : (_item$message = item.message) === null || _item$message === void 0 ? void 0 : (_item$message$charAt = _item$message.charAt(0)) === null || _item$message$charAt === void 0 ? void 0 : _item$message$charAt.toUpperCase()) + (item === null || item === void 0 ? void 0 : (_item$message2 = item.message) === null || _item$message2 === void 0 ? void 0 : (_item$message2$slice = _item$message2.slice(1)) === null || _item$message2$slice === void 0 ? void 0 : _item$message2$slice.replace(/_([a-z])/g, function (g) {
              var _g$;

              return ' ' + ((_g$ = g[1]) === null || _g$ === void 0 ? void 0 : _g$.toUpperCase());
            }))).replace('must be less than or equal to', 'Max.').replace('must be greater than or equal to', 'Min.')
          });
        }); // _errorsField[_err] =
        //   err?.inner[0]?.errors[0]?.charAt(0)?.toUpperCase() +
        //   err?.inner[0]?.errors[0]?.slice(1)?.replace(/_([a-z])/g, function (g) {
        //     return ' ' + g[1]?.toUpperCase()
        //   })
        // let __errorsField = {}
        // Object.keys(_errorsField)?.forEach(item => {
        //   if (item) {
        //     __errorsField = { ...__errorsField, [item]: _errorsField[item] }
        //   }
        // })
        // console.log('values: ', values)
        // console.log('errors: ', errors)

        if (errors) {
          setErrorsField(_objectSpread({}, errors));
        } else {
          setErrorsField({});
        }
      });
    } else {
      setErrorsField({});
    }
  });
  const _data = values;

  let _dataKey = (_ref3 = (_e$target$value2 = _e === null || _e === void 0 ? void 0 : (_e$target2 = _e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value) !== null && _e$target$value2 !== void 0 ? _e$target$value2 : _e === null || _e === void 0 ? void 0 : _e.value) !== null && _ref3 !== void 0 ? _ref3 : _e;

  if (_typeData === 'number' || _typeData === 'int' || _typeData === 'integer') {
    var _dataKey3, _dataKey4, _dataKey5, _dataKey6;

    _dataKey = ((_dataKey3 = _dataKey) === null || _dataKey3 === void 0 ? void 0 : _dataKey3.toString()) === '' ? '0' : (_dataKey4 = _dataKey) === null || _dataKey4 === void 0 ? void 0 : _dataKey4.toString();
    _dataKey = (_dataKey5 = _dataKey) === null || _dataKey5 === void 0 ? void 0 : _dataKey5.replace(/\./g, '').replace(/\,/g, '');
    _dataKey = parseInt((_dataKey6 = _dataKey) !== null && _dataKey6 !== void 0 ? _dataKey6 : 0);
  }

  _data[_key] = _dataKey; // console.log('values: ', _data)

  setValues(_objectSpread({}, _data));
};

/***/ })

};
;
//# sourceMappingURL=8916.js.map
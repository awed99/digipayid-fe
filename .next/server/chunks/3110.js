;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f2a6e9f2-6e21-4623-abfc-951c61a782b4",e._sentryDebugIdIdentifier="sentry-dbid-f2a6e9f2-6e21-4623-abfc-951c61a782b4")}catch(e){}}();
"use strict";
exports.id = 3110;
exports.ids = [3110];
exports.modules = {

/***/ 3110:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j7": () => (/* binding */ format_rupiah),
/* harmony export */   "Qn": () => (/* binding */ spacing4Char),
/* harmony export */   "Hl": () => (/* binding */ generateSignature)
/* harmony export */ });
/* unused harmony exports number_format, currency_format, checkOperatorByNumber, isValidPLN */
/* harmony import */ var crypto_js_enc_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8279);
/* harmony import */ var crypto_js_enc_base64__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js_enc_base64__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto_js_hmac_sha256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3282);
/* harmony import */ var crypto_js_hmac_sha256__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js_hmac_sha256__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



const number_format = x => {
  var _x$toString, _x$toString$replace;

  return x === null || x === void 0 ? void 0 : (_x$toString = x.toString()) === null || _x$toString === void 0 ? void 0 : (_x$toString$replace = _x$toString.replace(/\,/g, '')) === null || _x$toString$replace === void 0 ? void 0 : _x$toString$replace.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const currency_format = x => {
  // return x?.toString()?.replace(/\,/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'USD'
  }).format(x !== null && x !== void 0 ? x : 0);
};
const format_rupiah = (angka, prefix) => {
  if (angka) {
    var _angka$toString$repla, _splitx$, _splitx$2, _splitx$3;

    const isMinus = parseFloat(angka) < 0 ? '-' : '';
    const number_string = (_angka$toString$repla = angka.toString().replace(/\,/g, '').replace(/\./g, '')) === null || _angka$toString$repla === void 0 ? void 0 : _angka$toString$repla.replace(/[^,\d]/g, '');
    const splitx = number_string === null || number_string === void 0 ? void 0 : number_string.split('.');
    const sisa = ((_splitx$ = splitx[0]) === null || _splitx$ === void 0 ? void 0 : _splitx$.length) % 3;
    let rupiah = (_splitx$2 = splitx[0]) === null || _splitx$2 === void 0 ? void 0 : _splitx$2.substr(0, sisa);
    const ribuan = (_splitx$3 = splitx[0]) === null || _splitx$3 === void 0 ? void 0 : _splitx$3.substr(sisa).match(/\d{3}/gi); // tambahkan titik jika yang di input sudah menjadi angka ribuan

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = splitx[1] != undefined ? rupiah + '.' + splitx[1] : rupiah;
    rupiah = isMinus + rupiah;
    return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  } else {
    return angka;
  }
};
const spacing4Char = x => {
  const joy = x === null || x === void 0 ? void 0 : x.match(/.{1,4}/g);
  return joy === null || joy === void 0 ? void 0 : joy.join(' ');
};
const operator = {
  tri: {
    name: 'Tri',
    img: 'tri'
  },
  telkomsel: {
    name: 'Telkomsel',
    img: 'telkomsel'
  },
  im3: {
    name: 'Im3',
    img: 'im3'
  },
  xl: {
    name: 'XL',
    img: 'xl'
  },
  axis: {
    name: 'Axis',
    img: 'axis'
  },
  smartfren: {
    name: 'Smartfren',
    img: 'smartfren'
  }
};
const checkOperatorByNumber = async (val, setPhoneNumber, setImgOperator, setIsValid) => {
  setPhoneNumber(val);

  const _val = val.substring(0, 4);

  if (_val === '0811' || _val === '0812' || _val === '0813' || _val === '0821' || _val === '0822' || _val === '0823' || _val === '0852' || _val === '0853') {
    var _operator$telkomsel;

    setImgOperator(operator === null || operator === void 0 ? void 0 : (_operator$telkomsel = operator.telkomsel) === null || _operator$telkomsel === void 0 ? void 0 : _operator$telkomsel.img);
  } else if (_val === '0814' || _val === '0815' || _val === '0816' || _val === '0855' || _val === '0856' || _val === '0857' || _val === '0858') {
    var _operator$im;

    setImgOperator(operator === null || operator === void 0 ? void 0 : (_operator$im = operator.im3) === null || _operator$im === void 0 ? void 0 : _operator$im.img);
  } else if (_val === '0895' || _val === '0896' || _val === '0897' || _val === '0898' || _val === '0899') {
    var _operator$im2;

    setImgOperator(operator === null || operator === void 0 ? void 0 : (_operator$im2 = operator.im3) === null || _operator$im2 === void 0 ? void 0 : _operator$im2.img);
  } else if (_val === '0817' || _val === '0818' || _val === '0819' || _val === '0859' || _val === '0877' || _val === '0878' || _val === '0879') {
    var _operator$xl;

    setImgOperator(operator === null || operator === void 0 ? void 0 : (_operator$xl = operator.xl) === null || _operator$xl === void 0 ? void 0 : _operator$xl.img);
  } else if (_val === '0831' || _val === '0838') {
    var _operator$axis;

    setImgOperator(operator === null || operator === void 0 ? void 0 : (_operator$axis = operator.axis) === null || _operator$axis === void 0 ? void 0 : _operator$axis.img);
  } else if (_val === '0881' || _val === '0882' || _val === '0883' || _val === '0884') {
    var _operator$smartfren;

    setImgOperator(operator === null || operator === void 0 ? void 0 : (_operator$smartfren = operator.smartfren) === null || _operator$smartfren === void 0 ? void 0 : _operator$smartfren.img);
  } else {
    setImgOperator('');
  }

  await setIsValid(await schemaData.isValid({
    phone: val
  }));
};
const isValidPLN = async (val, setPlnNumber, setIsValid) => {
  setPlnNumber(val);
  setIsValid(await schemaDataPln.isValid({
    pln: val
  }));
};
const generateSignature = async _uri => {
  const httpMethod = 'POST';

  const _time = moment__WEBPACK_IMPORTED_MODULE_2___default()().unix();

  const pattern = (httpMethod + ':' + _uri + ':' + _time).toUpperCase();

  const secretKey = "digipay10D3w@";
  const hmacDigest0 = await crypto_js_enc_base64__WEBPACK_IMPORTED_MODULE_0___default().stringify(crypto_js_hmac_sha256__WEBPACK_IMPORTED_MODULE_1___default()(pattern, secretKey));
  const hmacDigest = await crypto_js_hmac_sha256__WEBPACK_IMPORTED_MODULE_1___default()(pattern, secretKey).toString();
  return {
    signature: hmacDigest,
    timestamp: _time
  };
};

/***/ })

};
;
//# sourceMappingURL=3110.js.map
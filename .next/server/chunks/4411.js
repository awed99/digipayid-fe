;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f8cade9d-b460-4914-8a88-e0baf5fb3b06",e._sentryDebugIdIdentifier="sentry-dbid-f8cade9d-b460-4914-8a88-e0baf5fb3b06")}catch(e){}}();
"use strict";
exports.id = 4411;
exports.ids = [4411];
exports.modules = {

/***/ 4411:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hp": () => (/* binding */ handleSubmitLogin),
/* harmony export */   "eD": () => (/* binding */ handleSubmitRegister),
/* harmony export */   "up": () => (/* binding */ handleCheckValidOTP),
/* harmony export */   "DH": () => (/* binding */ handleResendOTP),
/* harmony export */   "py": () => (/* binding */ handleGetForgotPasswordOTP),
/* harmony export */   "h4": () => (/* binding */ handleCheckValidForgotPasswordOTP),
/* harmony export */   "sm": () => (/* binding */ handleChange_password)
/* harmony export */ });
/* unused harmony exports handleSubmitLoginAdmin, handleSubmitResetPassword, handleSubmitNewPassword */
/* harmony import */ var _helpers_general__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3110);

const handleSubmitLoginAdmin = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault();
      const dataX = new FormData(); // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)

      const _uri = 'admin/auth/login';

      const _secret = await generateSignature(_uri);

      const resX = await fetch(`${process.env.NEXT_PUBLIC_BE_API_DOMAIN}${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
          'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp
        },
        body: JSON.stringify(values) // body: dataX,

      }).then(async res => await res.json()).then(async res => res);
      return resX;
    } else {
      return {
        code: '001',
        message: 'Error'
      };
    }
  });
};
const handleSubmitLogin = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault();
      const dataX = new FormData(); // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)

      const _uri = 'users/login';

      const _secret = await (0,_helpers_general__WEBPACK_IMPORTED_MODULE_0__/* .generateSignature */ .Hl)(_uri); // console.log(_secret)


      const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
          'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp
        },
        body: JSON.stringify(values)
      }).then(async res => await res.json()).then(async res => res);
      return resX;
    } else {
      return {
        code: '001',
        message: 'Error'
      };
    }
  });
};
const handleSubmitRegister = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault();
      const dataX = new FormData(); // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)

      const _uri = 'users/register';

      const _secret = await (0,_helpers_general__WEBPACK_IMPORTED_MODULE_0__/* .generateSignature */ .Hl)(_uri);

      const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
          'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp
        },
        body: JSON.stringify(values) // body: dataX,

      }).then(async res => await res.json()).then(async res => res);
      return resX;
    } else {
      return {
        code: '001',
        message: 'Error'
      };
    }
  });
};
const handleSubmitResetPassword = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault(); // const dataX = new FormData()
      // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)

      const _uri = 'users/change_password';

      const _secret = await generateSignature(_uri);

      const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
          'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp
        },
        body: JSON.stringify(values) // body: dataX,

      }).then(async res => await res.json()).then(async res => res);
      return resX;
    } else {
      return {
        code: '001',
        message: 'Error'
      };
    }
  });
};
const handleSubmitNewPassword = async (e, schemaData, values, token) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault(); // const dataX = new FormData()
      // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)

      const _uri = 'users/new_password';

      const _secret = await generateSignature(_uri);

      const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
          'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp
        },
        body: JSON.stringify(values) // body: dataX,

      }).then(async res => await res.json()).then(async res => res);
      return resX;
    } else {
      return {
        code: '001',
        message: 'Error'
      };
    }
  });
};
const handleCheckValidOTP = async (values, token) => {
  const _uri = 'users/check_valid_otp';

  const _secret = await (0,_helpers_general__WEBPACK_IMPORTED_MODULE_0__/* .generateSignature */ .Hl)(_uri);

  const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
      'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp
    },
    body: JSON.stringify(values) // body: dataX,

  }).then(async res => await res.json()).then(async res => res);
  return resX;
};
const handleResendOTP = async (values, token) => {
  const _uri = 'users/resend_otp';

  const _secret = await (0,_helpers_general__WEBPACK_IMPORTED_MODULE_0__/* .generateSignature */ .Hl)(_uri);

  const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
      'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp,
      Authorization: token
    },
    body: JSON.stringify(values) // body: dataX,

  }).then(async res => await res.json()).then(async res => res);
  return resX;
};
const handleGetForgotPasswordOTP = async (values, token) => {
  const _uri = 'users/get_valid_otp_forgot_password';

  const _secret = await (0,_helpers_general__WEBPACK_IMPORTED_MODULE_0__/* .generateSignature */ .Hl)(_uri);

  const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
      'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp,
      Authorization: token
    },
    body: JSON.stringify(values) // body: dataX,

  }).then(async res => await res.json()).then(async res => res);
  return resX;
};
const handleCheckValidForgotPasswordOTP = async (values, token) => {
  const _uri = 'users/check_valid_otp_forgot_password';

  const _secret = await (0,_helpers_general__WEBPACK_IMPORTED_MODULE_0__/* .generateSignature */ .Hl)(_uri);

  const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
      'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp,
      Authorization: token
    },
    body: JSON.stringify(values) // body: dataX,

  }).then(async res => await res.json()).then(async res => res);
  return resX;
};
const handleChange_password = async (values, token) => {
  const _uri = 'users/change_password';

  const _secret = await (0,_helpers_general__WEBPACK_IMPORTED_MODULE_0__/* .generateSignature */ .Hl)(_uri);

  const resX = await fetch(`${"http://localhost:8080"}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret === null || _secret === void 0 ? void 0 : _secret.signature,
      'x-timestamp': _secret === null || _secret === void 0 ? void 0 : _secret.timestamp,
      Authorization: token
    },
    body: JSON.stringify(values) // body: dataX,

  }).then(async res => await res.json()).then(async res => res);
  return resX;
};

/***/ })

};
;
//# sourceMappingURL=4411.js.map
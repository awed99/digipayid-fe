import Base64 from 'crypto-js/enc-base64'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import moment from 'moment'

export const number_format = x => {
  return x
    ?.toString()
    ?.replace(/\,/g, '')
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const currency_format = x => {
  // return x?.toString()?.replace(/\,/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'USD'
  }).format(x ?? 0)
}

export const format_rupiah = (angka, prefix) => {
  if (angka) {
    const isMinus = parseFloat(angka) < 0 ? '-' : ''

    const number_string = angka
      .toString()
      .replace(/\,/g, '')
      .replace(/\./g, '')
      ?.replace(/[^,\d]/g, '')

    const splitx = number_string?.split('.')
    const sisa = splitx[0]?.length % 3
    let rupiah = splitx[0]?.substr(0, sisa)
    const ribuan = splitx[0]?.substr(sisa).match(/\d{3}/gi)

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      const separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    rupiah = splitx[1] != undefined ? rupiah + '.' + splitx[1] : rupiah
    rupiah = isMinus + rupiah

    return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : ''
  } else {
    return angka
  }
}

export const format_rupiah_desimal = (angka, prefix) => {
  if (angka) {
    const isMinus = parseFloat(angka) < 0 ? '-' : ''

    const number_string = angka
      .toString()
      .replace(/\,/g, '.')
      ?.replace(/[^,\d]/g, '')

    const splitx = number_string?.split('.')
    const sisa = splitx[0]?.length % 3
    let rupiah = splitx[0]?.substr(0, sisa)
    const ribuan = splitx[0]?.substr(sisa).match(/\d{3}/gi)

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      const separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    rupiah = splitx[1] != undefined ? rupiah + '.' + splitx[1] : rupiah
    rupiah = isMinus + rupiah

    return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : ''
  } else {
    return angka
  }
}

export const spacing4Char = x => {
  const joy = x?.match(/.{1,4}/g)

  return joy?.join(' ')
}

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
}

export const checkOperatorByNumber = async (val, setPhoneNumber, setImgOperator, setIsValid) => {
  setPhoneNumber(val)
  const _val = val.substring(0, 4)
  if (
    _val === '0811' ||
    _val === '0812' ||
    _val === '0813' ||
    _val === '0821' ||
    _val === '0822' ||
    _val === '0823' ||
    _val === '0852' ||
    _val === '0853'
  ) {
    setImgOperator(operator?.telkomsel?.img)
  } else if (
    _val === '0814' ||
    _val === '0815' ||
    _val === '0816' ||
    _val === '0855' ||
    _val === '0856' ||
    _val === '0857' ||
    _val === '0858'
  ) {
    setImgOperator(operator?.im3?.img)
  } else if (_val === '0895' || _val === '0896' || _val === '0897' || _val === '0898' || _val === '0899') {
    setImgOperator(operator?.im3?.img)
  } else if (
    _val === '0817' ||
    _val === '0818' ||
    _val === '0819' ||
    _val === '0859' ||
    _val === '0877' ||
    _val === '0878' ||
    _val === '0879'
  ) {
    setImgOperator(operator?.xl?.img)
  } else if (_val === '0831' || _val === '0838') {
    setImgOperator(operator?.axis?.img)
  } else if (_val === '0881' || _val === '0882' || _val === '0883' || _val === '0884') {
    setImgOperator(operator?.smartfren?.img)
  } else {
    setImgOperator('')
  }
  await setIsValid(await schemaData.isValid({ phone: val }))
}

export const isValidPLN = async (val, setPlnNumber, setIsValid) => {
  setPlnNumber(val)
  setIsValid(await schemaDataPln.isValid({ pln: val }))
}

export const generateSignature = async _uri => {
  const httpMethod = 'POST'
  const _time = moment().unix()
  const pattern = (httpMethod + ':' + _uri + ':' + _time).toUpperCase()
  const secretKey = process.env.NEXT_PUBLIC_BE_API_KEY

  const hmacDigest0 = await Base64.stringify(hmacSHA256(pattern, secretKey))
  const hmacDigest = await hmacSHA256(pattern, secretKey).toString()

  return {
    signature: hmacDigest,
    timestamp: _time
  }
}

export const handleChangeEl = async (
  _key,
  _e,
  values,
  setValues,
  schemaData,
  setErrorsField,
  errorsField = {},
  _typeData = 'string'
) => {
  let _dataKey0 = _e?.target?.value ?? _e?.value ?? _e ?? ''

  // console.log('!(event instanceof Event): ', !(_e instanceof Event))
  if (!!(_e instanceof Event)) {
    if (_typeData === 'number' || _typeData === 'int' || _typeData === 'integer') {
      _dataKey0 = _dataKey0.toString() === '' ? '0' : _dataKey0.toString()
      _dataKey0 = _dataKey0?.replace(/\./g, '').replace(/\,/g, '')
      _dataKey0 = !_dataKey0 || _dataKey0 === 'NaN' || _dataKey0 === NaN ? 0 : parseInt(_dataKey0) ?? 0
    }
    values[_key] = _dataKey0
  } else {
    values[_key] = _dataKey0
  }

  // console.log('values: ', values)

  if (schemaData) {
    schemaData?.isValid(values).then(valid => {
      // console.log('valid: ', valid)
      if (!valid) {
        schemaData?.validate(values, { abortEarly: false })?.catch(err => {
          // const _err = err?.inner[0]?.path
          // const _errorsField = errorsField

          let errors = {}
          err?.inner?.map(item => {
            errors = {
              ...errors,
              [item?.path]: (
                item?.message?.charAt(0)?.toUpperCase() +
                item?.message?.slice(1)?.replace(/_([a-z])/g, function (g) {
                  return ' ' + g[1]?.toUpperCase()
                })
              )
                .replace('must be less than or equal to', 'Max.')
                .replace('must be greater than or equal to', 'Min.')
            }
          })

          // _errorsField[_err] =
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
            setErrorsField({ ...errors })
          } else {
            setErrorsField({})
          }
        })
      } else {
        setErrorsField({})
      }
    })
  }

  const _data = values
  let _dataKey = _e?.target?.value ?? _e?.value ?? _e

  if (_typeData === 'number' || _typeData === 'int' || _typeData === 'integer') {
    _dataKey = _dataKey?.toString() === '' ? '0' : _dataKey?.toString()
    _dataKey = _dataKey?.replace(/\./g, '').replace(/\,/g, '')
    _dataKey = parseInt(_dataKey ?? 0)
  }

  _data[_key] = _dataKey

  // console.log('values: ', _data)
  setValues({ ..._data })
}

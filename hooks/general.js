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

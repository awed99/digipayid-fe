import { generateSignature } from '../helpers/general'

export const handleSubmitLoginAdmin = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault()
      const dataX = new FormData()

      // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)
      const _uri = 'admin/auth/login'
      const _secret = await generateSignature(_uri)

      const resX = await fetch(`${process.env.NEXT_PUBLIC_BE_API_DOMAIN}${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret?.signature,
          'x-timestamp': _secret?.timestamp
        },
        body: JSON.stringify(values)

        // body: dataX,
      })
        .then(async res => await res.json())
        .then(async res => res)

      return resX
    } else {
      return {
        code: '001',
        message: 'Error'
      }
    }
  })
}

export const handleSubmitLogin = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault()
      const dataX = new FormData()

      // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)
      const _uri = 'users/login'
      const _secret = await generateSignature(_uri)

      // console.log(_secret)

      const resX = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret?.signature,
          'x-timestamp': _secret?.timestamp
        },
        body: JSON.stringify(values)
      })
        .then(async res => await res.json())
        .then(async res => res)

      return resX
    } else {
      return {
        code: '001',
        message: 'Error'
      }
    }
  })
}

export const handleSubmitRegister = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault()
      const dataX = new FormData()

      // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)
      const _uri = 'users/register'
      const _secret = await generateSignature(_uri)

      const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret?.signature,
          'x-timestamp': _secret?.timestamp
        },
        body: JSON.stringify(values)

        // body: dataX,
      })
        .then(async res => await res.json())
        .then(async res => res)

      return resX
    } else {
      return {
        code: '001',
        message: 'Error'
      }
    }
  })
}

export const handleSubmitRegisterAffiliator = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault()
      const dataX = new FormData()

      // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)
      const _uri = 'users/register_affiliator'
      const _secret = await generateSignature(_uri)

      const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret?.signature,
          'x-timestamp': _secret?.timestamp
        },
        body: JSON.stringify(values)

        // body: dataX,
      })
        .then(async res => await res.json())
        .then(async res => res)

      return resX
    } else {
      return {
        code: '001',
        message: 'Error'
      }
    }
  })
}

export const handleSubmitResetPassword = async (e, schemaData, values) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault()

      // const dataX = new FormData()
      // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)
      const _uri = 'users/change_password'
      const _secret = await generateSignature(_uri)

      const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret?.signature,
          'x-timestamp': _secret?.timestamp
        },
        body: JSON.stringify(values)

        // body: dataX,
      })
        .then(async res => await res.json())
        .then(async res => res)

      return resX
    } else {
      return {
        code: '001',
        message: 'Error'
      }
    }
  })
}

export const handleSubmitNewPassword = async (e, schemaData, values, token) => {
  // console.log(values)
  return schemaData.isValid(values).then(async valid => {
    if (valid) {
      e.preventDefault()

      // const dataX = new FormData()
      // dataX.append('email', values?.email)
      // dataX.append('password', values?.password)
      const _uri = 'users/new_password'
      const _secret = await generateSignature(_uri)

      const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
        method: 'POST',
        headers: {
          'x-signature': _secret?.signature,
          'x-timestamp': _secret?.timestamp
        },
        body: JSON.stringify(values)

        // body: dataX,
      })
        .then(async res => await res.json())
        .then(async res => res)

      return resX
    } else {
      return {
        code: '001',
        message: 'Error'
      }
    }
  })
}

export const handleCheckValidOTP = async (values, token) => {
  const _uri = 'users/check_valid_otp'
  const _secret = await generateSignature(_uri)

  const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret?.signature,
      'x-timestamp': _secret?.timestamp
    },
    body: JSON.stringify(values)

    // body: dataX,
  })
    .then(async res => await res.json())
    .then(async res => res)

  return resX
}

export const handleResendOTP = async (values, token) => {
  const _uri = 'users/resend_otp'
  const _secret = await generateSignature(_uri)

  const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret?.signature,
      'x-timestamp': _secret?.timestamp,
      Authorization: token
    },
    body: JSON.stringify(values)

    // body: dataX,
  })
    .then(async res => await res.json())
    .then(async res => res)

  return resX
}

export const handleGetForgotPasswordOTP = async (values, token) => {
  const _uri = 'users/get_valid_otp_forgot_password'
  const _secret = await generateSignature(_uri)

  const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret?.signature,
      'x-timestamp': _secret?.timestamp,
      Authorization: token
    },
    body: JSON.stringify(values)

    // body: dataX,
  })
    .then(async res => await res.json())
    .then(async res => res)

  return resX
}

export const handleCheckValidForgotPasswordOTP = async (values, token) => {
  const _uri = 'users/check_valid_otp_forgot_password'
  const _secret = await generateSignature(_uri)

  const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret?.signature,
      'x-timestamp': _secret?.timestamp,
      Authorization: token
    },
    body: JSON.stringify(values)

    // body: dataX,
  })
    .then(async res => await res.json())
    .then(async res => res)

  return resX
}

export const handleChange_password = async (values, token) => {
  const _uri = 'users/change_password'
  const _secret = await generateSignature(_uri)

  const resX = await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
    method: 'POST',
    headers: {
      'x-signature': _secret?.signature,
      'x-timestamp': _secret?.timestamp,
      Authorization: token
    },
    body: JSON.stringify(values)

    // body: dataX,
  })
    .then(async res => await res.json())
    .then(async res => res)

  return resX
}

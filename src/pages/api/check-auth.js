import store from 'store'

export default async function GET(req, res) {
  const { email } = JSON.parse(req.body)

  // console.log('email: ', email)

  // console.log('store.get(req.body): ', store.get(email))
  const auth = await store.get(email)
  const data = req.body
  res.status(200).json({ auth: auth, message: 'Check session successfully.', data: data })
}

// // ** Layout Import

// export default function CheckSession(req, res) {
//   const auth = store.get('auth')
//   res.status(200).json({
//     auth: auth,
//     message: 'Check session successfully.'
//   })
// }

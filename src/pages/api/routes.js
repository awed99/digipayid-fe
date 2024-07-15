'use-strict'

import store from 'store'

export default async function POST(req, res) {
  // console.log('req: ', req)
  // console.log('res: ', res)

  // return false
  const auth = store.get('auth')
  res.status(200).json({ auth: auth, message: 'Check session successfully.', data: req.body })
}

// // ** Layout Import

// export default function CheckSession(req, res) {
//   const auth = store.get('auth')
//   res.status(200).json({
//     auth: auth,
//     message: 'Check session successfully.'
//   })
// }

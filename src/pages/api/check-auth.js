// // ** Layout Import
import store from 'store'

export default function CheckSession(req, res) {
  const auth = store.get('auth')
  res.status(200).json({
    auth: auth,
    message: 'Check session successfully.'
  })
}

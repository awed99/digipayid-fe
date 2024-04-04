// // ** Layout Import
import store from 'store'

export default function CheckSession(req, res) {
  const { key } = JSON.parse(req.body)

  const val = store.get(key)
  res.status(200).json({
    [key]: val,
    message: 'Store gotten successfully.'
  })
}

// // ** Layout Import
import store from 'store'

export default function setSession(req, res) {
  const { key, val } = JSON.parse(req.body)

  // Then save the post data to a database
  store.set(key, val)
  res.status(200).json({
    [key]: val,
    message: 'Store updated successfully.'
  })
}

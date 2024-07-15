// // ** Layout Import
import store from 'store'

export default function setSession(req, res) {
  const { email } = JSON.parse(req.body)

  // Then save the post data to a database
  store.remove(email)
  res.status(200).json({
    message: 'Store removed successfully.'
  })
}

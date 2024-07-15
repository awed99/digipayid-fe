// // ** Layout Import
import store from 'store'

export default async function setSession(req, res) {
  const { key, val } = JSON.parse(req.body)

  // Then save the post data to a database
  // console.log('key: ', key)
  // console.log('val: ', val)
  await store.set(key, val)
  res.status(200).json({
    [key]: val,
    message: 'Store updated successfully.'
  })
}

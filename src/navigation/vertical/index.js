import store from 'store'

import admin from './admin'
import user from './user'

const navigation = () => {
  // console.log('store.get("module"): ', store.get('module'))
  if (store.get('module') === 'user') {
    return user()
  } else if (store.get('module') === 'admin') {
    return admin()
  } else {
    return user()
  }
}

export default navigation

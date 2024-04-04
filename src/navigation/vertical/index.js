import store from 'store'

import user from './user'
import admin from './admin'

const navigation = () => {
  if (store.get('module') === 'user') {
    return user()
  } else if (store.get('module') === 'admin') {
    return admin()
  } else {
    return user()
  }
}

export default navigation

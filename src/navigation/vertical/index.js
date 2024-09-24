import store from 'store'

import admin from './admin'
import affiliator from './affiliator'
import user from './user'

const navigation = () => {
  // console.log('store.get("module"): ', store.get('module'))
  if (store.get('module') === 'user') {
    return user()
  } else if (store.get('module') === 'admin') {
    return admin()
  } else if (store.get('module') === 'affiliator') {
    return affiliator()
  } else {
    return affiliator()
  }
}

export default navigation

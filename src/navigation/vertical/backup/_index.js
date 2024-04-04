import store from 'store'

import dalku from './dalku'
import bincab from './bincab'
import binum from './binum'
import irdit from './irdit'

const navigation = () => {
  if (store.get('module') === 'dalku') {
    return dalku()
  } else if (store.get('module') === 'bincab') {
    return bincab()
  } else if (store.get('module') === 'binum') {
    return binum()
  } else if (store.get('module') === 'irdit') {
    return irdit()
  } else {
    return dalku()
  }
}

export default navigation

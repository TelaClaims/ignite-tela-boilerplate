import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import DebugConfig from 'config/DebugConfig'
import ReduxPersist from 'config/ReduxPersist'

const updateReducers = (store: Object) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig
  // const startup = () => store.dispatch(StartupActions.startup())

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      if (DebugConfig.useReactotron) {
        console.tron.display({
          name: 'PURGE',
          value: {
            'Old Version:': localVersion,
            'New Version:': reducerVersion
          },
          preview: 'Reducer Version Change Detected',
          important: true
        })
      }
      // Purge store
      // persistStore(store, config, startup).purge()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      // persistStore(store, config, startup)
    }
  }).catch(() => {
    // persistStore(store, config, startup)
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}

export default {updateReducers}

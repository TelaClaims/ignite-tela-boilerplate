import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise-middleware'
import ReduxThunk from 'redux-thunk'
import Config from 'config/DebugConfig'
import reducers from './Redux'
import { autoRehydrate } from 'redux-persist'
import ReduxPersist from 'config/ReduxPersist'
import Libs from 'libs'

/* -------------  Middleware ------------- */
const middleware = []
middleware.push(Libs.ScreenTrackingMiddleware)
middleware.push(ReduxThunk)
middleware.push(promise())

/* ------------- Enhancers ------------- */
const enhancers = []
enhancers.push(applyMiddleware(...middleware))

// add the autoRehydrate enhancer
if (ReduxPersist.active) {
  enhancers.push(autoRehydrate())
}

/* ------------- Store ------------- */
// if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
const store = createAppropriateStore(reducers, compose(...enhancers))

// configure persistStore and check reducer version number
if (ReduxPersist.active) {
  Libs.RehydrationService.updateReducers(store)
}

export default store

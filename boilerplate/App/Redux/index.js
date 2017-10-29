import { combineReducers } from 'redux'

const reducers = combineReducers({
  nav: require('./Navigation/reducer').reducer
})

export default reducers

import RootNav from 'navigation/root-nav'

export const reducer = (state, action) => {
  const newState = RootNav.router.getStateForAction(action, state)
  return newState || state
}

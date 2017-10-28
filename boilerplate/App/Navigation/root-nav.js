import { StackNavigator } from 'react-navigation'
import LaunchScreen from 'containers/LaunchScreen'
import { RootNavRouteNames as RouteNames } from './constants'

import styles from './styles'

// Manifest of possible screens
const RootNav = StackNavigator({
  [RouteNames.launchScreen]: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: RouteNames.launchScreen,
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default RootNav

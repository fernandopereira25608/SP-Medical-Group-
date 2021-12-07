import { 
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';

import Login from './pages/login';
import Consultas from './pages/consultas';

const AuthStack = createStackNavigator ({ Login, Consultas },
    {
        headerMode: 'none'
    }
    );

// const MainNavigator = createBottomTabNavigator (
//     {
//         Login,
//         // Main,
//         Consultas
//     },
//     {
//         initialRouteName: "Consultas",
//         swipeEnabled: true,
//         tabBarOptions: {
//             showLabel: false,
//             showIcon: true,
//             inactiveBackgroundColor: "#dd99ff",
//             activeBackgroundColor: "#B727FF",
//             activeTintColor: "#FFFFFF",
//             inactiveTintColor: "#FFFFFF",
//             style: {
//                 height: 50
//             }
//         }
//     }
// );

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthStack
        },
        {
            initialRouteName : "AuthStack"
        }
    )
);
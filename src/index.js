import React, { Component } from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import LoginScreen from './pages/login';
import InfoScreen from './pages/info';
import ScheduleScreen from './pages/schedule';
import ScheduleDetailsScreen from './pages/scheduledetails';
import QrCodeScannerScreen from './pages/qrcodescanner';

import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';


class Logout extends Component {
  render() {
    return (
      <View />
    );
  }
}

const AppTabNavigator = createBottomTabNavigator(
  {
    InfoScreen: {
      screen: InfoScreen,
      navigationOptions: {
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ tintColor }) => (
          <Icon size={25} name={'ios-home'} color={tintColor} />
        ),
      },
    },
    ScheduleScreen: {
      screen: ScheduleScreen,
      navigationOptions: {
        tabBarLabel: 'Programação',
        tabBarIcon: ({ tintColor }) => (
          <Icon size={25} name={'ios-list'} color={tintColor} />
        ),
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        tabBarLabel: 'Sair',
        tabBarIcon: ({ tintColor }) => (
          //<Icon size={25} name={'ios-qr-scanner'} color={tintColor} />
          <Icon size={25} name={'ios-log-out'} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      if (routeName === 'InfoScreen') {
        return { headerTitle: 'Informações', };
      } else if (routeName === 'ScheduleScreen') {
        return { headerTitle: 'Programação', };
      }
      return { headerTitle: routeName, };
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (navigation.state.routeName === 'Logout') {
          Alert.alert(
            'Sair',
            'Deseja mesmo sair?',
            [
              {
                text: 'Cancelar',
                //onPress: () => console.log('Retornando ao inicio'),
                style: 'cancel',
              },
              {text: 'Sim', onPress: async () => {
                await AsyncStorage.removeItem('@UserData:token');
                navigation.navigate('Welcome');
              }},
            ],
            {cancelable: false},
          );
        } else {
          defaultHandler();
        }
        console.log('onPress:', navigation.state.routeName);
      },
    }),
  }
);

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: AppTabNavigator,
  ScheduleDetailsScreen: ScheduleDetailsScreen,
  QrCodeScannerScreen: QrCodeScannerScreen,
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: LoginScreen },
  Dashboard: { screen: AppStackNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;

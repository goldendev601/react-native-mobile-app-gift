import React, { useEffect } from 'react';
import { AsyncStorage, ColorSchemeName } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
import { IRootState } from '../reducers';
import { RootStackParamList } from '../types';
import { authLoginUserSuccess } from '../actions/authActions';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Root">
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
};

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
    </Stack.Navigator>
  );
};

export interface INavigationProps {
  colorScheme: ColorSchemeName;
}

const Navigation: React.FC<INavigationProps> = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    AsyncStorage.getItem('login_data').then((storageData) => {
      if (storageData && JSON.parse(storageData)) {
        const login_data = JSON.parse(storageData);
        console.log('========user info=======');
        console.log(login_data.name);
        console.log(login_data.email);
        console.log(login_data.user);
        console.log(login_data.status);
        dispatch(authLoginUserSuccess(login_data.token, login_data.user))
      }
    })
  }, [dispatch])
  
  const authData = useSelector((state: IRootState) => state.auth);
  const isAuthenticated = authData.isAuthenticated;
  const isApproval = authData.userStatus;
  console.log(isApproval);
  const { colorScheme } = props;
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {(isAuthenticated && isApproval === "APPROVED") ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;

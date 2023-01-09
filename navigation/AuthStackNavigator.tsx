import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import VerificationScreen from '../screens/VerificationScreen';
import VerificationRecoveryPasswordScreen from '../screens/VerificationRecoveryPasswordScreen';
import PasswordSetupScreen from '../screens/PasswordSetupScreen';
import ConnectStripeScreen from '../screens/ConnectStripeScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
import ResetScreen from '../screens/ResetScreen';
import { AuthParamList } from '../types';
import AppReadMeScreen from '../screens/AppReadMeScreen';
import HelpScreen from '../screens/HelpScreen';
import TutorialFirstScreen from '../screens/TutorialFirstScreen';
import TutorialSecondScreen from '../screens/TutorialSecondScreen';
import TutorialThirdScreen from '../screens/TutorialThirdScreen';

const AuthNavigator: React.FC = () => {
  const AuthStack = createStackNavigator<AuthParamList>();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
      <AuthStack.Screen name="VerificationScreen" component={VerificationScreen} />
      <AuthStack.Screen name="HelpScreen" component={HelpScreen} />
      <AuthStack.Screen name="ConnectStripeScreen" component={ConnectStripeScreen} />
      <AuthStack.Screen name="AppReadMeScreen" component={AppReadMeScreen} />
      <AuthStack.Screen name="TutorialFirstScreen" component={TutorialFirstScreen} />
      <AuthStack.Screen name="TutorialSecondScreen" component={TutorialSecondScreen} />
      <AuthStack.Screen name="TutorialThirdScreen" component={TutorialThirdScreen} />
      <AuthStack.Screen name="VerificationRecoveryPasswordScreen" component={VerificationRecoveryPasswordScreen} />
      <AuthStack.Screen name="PasswordSetupScreen" component={PasswordSetupScreen} />
      <AuthStack.Screen name="ResetScreen" component={ResetScreen} />
      <AuthStack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

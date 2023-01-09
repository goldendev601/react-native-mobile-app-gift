import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  // prefixes: ['giftd://', 'https://api.givegiftd.com'],
  config: {
    screens: {
      Auth: {
        screens: {
          Welcome: {
            screens: {
              WelcomeScreen: 'welcome',
            },
          },
          Login: {
            screens: {
              LoginScreen: 'login',
            },
          },
          Signup: {
            screens: {
              SignupScreen: 'signup',
            },
          },
          PrivacyPolicy: {
            screens: {
              PrivacyPolicyScreen: 'privacyPolicy',
            },
          },
          Verification: {
            screens: {
              VerificationScreen: 'verification',
            },
          },
          VerificationRecoveryPassword: {
            screens: {
              VerificationRecoveryPasswordScreen: 'verificationRecoveryPassword',
            },
          },
          Homepage: {
            screens: {
              HomePageScreen: 'homepage',
            },
          },
          contactList: {
            screens: {
              ContactListScreen: 'contactList',
            },
          },
          SendMoneyScreen: {
            screens: {
              SendMoneyScreen: 'sendmoney',
            },
          },
          PasswordSetup: {
            screens: {
              PasswordSetupScreen: 'passwordSetup',
            },
          },
          Reset: {
            screens: {
              ResetScreen: 'reset',
            },
          },
          UpdatePassword: {
            screens: {
              UpdatePasswordScreen: 'updatePassword',
            },
          },
        },
      },
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          NotFound: '*',
        },
      },
    },
  },
};

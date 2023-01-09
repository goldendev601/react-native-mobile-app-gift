import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authSignupUser, clearAuthState, sendVerificationCode, setAccountInfo } from '../actions/authActions';
import { IRootState } from '../reducers';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 20,
    marginTop: 0
  },
  notificationWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row'
  },
  notification: {
    color: "#111",
    fontSize: 12,
    lineHeight: 20, 
    fontWeight: "400",
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    justifyContent: 'flex-start',
  },
  description: {
    marginTop: 30,
    color: "#111",
    fontSize: 14,
    fontWeight: "normal",
  },
  helpText: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  socialButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
  },
  signinButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#FFF"
  },
  signupButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#FFF",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  fieldWrapperTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 50
  },
  fieldWrapperBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 24
  },
  fieldLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 5,
  },
  fieldDescription: {
    fontSize: 14,
    fontWeight: 'normal',
    paddingBottom: 5,
    marginLeft: 10
  },
  iconStyle: {
    paddingLeft: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  iconStyle2: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 0,
  },
  iconStyleRight: {
    position: 'absolute',
    zIndex: 99,
    width: 24,
  },
  iconNotificationStyle: {
    paddingRight: 5
  },
  fieldInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    color: '#111',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    height: 56
  },
  fieldInputError: {
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    color: '#111',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    backgroundColor: '#F5F5F5',
    height: 56,
    borderWidth: 1,
    borderColor: '#E74678',
    borderStyle: 'solid'
  },
  fieldInputCheckbox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    padding: 10,
    color: '#2CAF4D',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginLeft: 50
  },
  signupButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7B61FF",
    padding: 16,
    fontSize: 15,
    fontWeight: "700",
    height: 56,
    borderRadius: 14,
    width: "100%",
    marginTop: 40,
  },
  greenButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CAF4D',
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 50,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  textLinkWrapper: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  iconImage: {
    width: 30,
    height: 30
  },
  textLink: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right'
  },
  toggle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 10,
  },
  toggleConfirm: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 10,
  },
  errorMessageWrapper: {
    width: '100%',
    height: 56,
    backgroundColor: '#E74678',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 30,
    justifyContent: 'center',
    marginTop: 50
  },
  errorMessageAlert: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    justifyContent: 'flex-start',
    marginLeft: 10
  },
  textLinkArrow: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 25,
  },
  flex: {
    flex: 1,
  },
});

interface IPasswordSetupScreenProps {
  navigation: NavigationProp<any>;
}

const PasswordSetupScreen: React.FC<IPasswordSetupScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const { firstName, lastName, email, phone } = useSelector((state: IRootState) => state.auth.accountInfo);
  const { isRegistered, isSentVerificationCode } = useSelector((state: IRootState) => state.auth);

  const [pass, setPass] = React.useState('');

  const [errorModalShow, setErrorModalShow] = React.useState(false);
  const [enableMask, setEnableMask] = React.useState(true);
  const [enableMaskConfirm, setEnableMaskConfirm] = React.useState(true);

  const toggleMask = () => setEnableMask((f) => !f);
  const toggleMaskConfirm = () => setEnableMaskConfirm((fConfirm) => !fConfirm);

  const [passValidator1, setPassValidator1] = React.useState(false);
  const [passValidator2, setPassValidator2] = React.useState(false);
  const [passValidator3, setPassValidator3] = React.useState(false);

  const [validationPassError, setValidationPassError] = React.useState(false);
  const [validationConfirmError, setValidationConfirmError] = React.useState(false);

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

  const [confirm, setConfirm] = React.useState('');

  const bgColor = useThemeColor({}, 'background');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const closeErrorModal = () => {
    setErrorModalShow(false);
  };

  const signup = () => {
    if (pass.length === 0) {
      setValidationError(true);
      setValidationErrorMessage('You should fill the password!');
      setErrorModalShow(true);
      setValidationPassError(true);
    } else {
      setValidationPassError(false);
    }
    if (pass !== confirm) {
      setValidationError(true);
      setValidationErrorMessage('passwords do not match');
      setErrorModalShow(true);
      setValidationConfirmError(true);
    } else {
      setValidationConfirmError(false);
    }
    if (!validationError) {
      dispatch(setAccountInfo({
        password: pass
      }));
      dispatch(authSignupUser(firstName, lastName, email, phone, pass, confirm));
    } 
  };

  const goBack = () => {
    navigation.goBack();
  };

  const validatePassword1 = () => {
    if (pass.length > 7) {
      setPassValidator1(true);
    } else {
      setPassValidator1(false);
    }
  }
  const validatePassword2 = () => {
    if (/\d/.test(pass)) {
      setPassValidator2(true);
    } else {
      setPassValidator2(false);
    }
  }
  const validatePassword3 = () => {
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) {
      setPassValidator3(true);
    } else {
      setPassValidator3(false);
    }
  }

  useEffect(() => {
      if (isRegistered) {
        dispatch(clearAuthState());
        navigation.navigate('VerificationScreen')
      }
      
  }, [isRegistered])

  useEffect(() => {
    validatePassword1();
    validatePassword2();
    validatePassword3();
  }, [pass, confirm])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <ScrollView
        style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.headerWrapper}>
          <Pressable style={styles.textLinkWrapper} onPress={goBack}>
            <Icon2 style={styles.textLinkArrow} name="arrow-back" />
          </Pressable>
        </View>
        {
          fontsLoaded && (
            <>
              <View style={styles.container}>
                <View style={styles.titleWrapper}>
                  <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Now, set up password in your account.</Text>
                  <Text style={[styles.description, {fontFamily: 'Work-Sans-regular'}]}>
                    Create a password for your account
                  </Text>
                </View>

                <View style={styles.fieldWrapperTop}>
                  <Icon5 style={styles.iconStyle} name="lock-outline" size={20} color="#1118" />
                  {
                    validationPassError ? (
                      <TextInput
                        style={styles.fieldInputError}
                        secureTextEntry={enableMask}
                        placeholder="Enter your password"
                        onChangeText={(text) => setPass(text)}
                      />
                    ) : (
                      <TextInput
                        style={styles.fieldInput}
                        secureTextEntry={enableMask}
                        placeholder="Enter your password"
                        onChangeText={(text) => setPass(text)}
                      />
                    )
                  }
                  
                  <Text style={styles.toggle} onPress={toggleMask}>
                    {enableMask ?
                      <Icon6 name="eye-slash" size={20} color="#1118" />
                      :
                      <Icon6 name="eye" size={20} color="#1118" />
                    }
                  </Text>
                </View>
                <View style={styles.fieldWrapperBottom}>
                  <Icon5 style={styles.iconStyle} name="lock-outline" size={20} color="#1118" />
                  {
                    validationConfirmError ? (
                      <TextInput
                        style={styles.fieldInputError}
                        secureTextEntry={enableMaskConfirm}
                        placeholder="Confirm your password"
                        onChangeText={(text) => setConfirm(text)}
                      />
                    ) : (
                      <TextInput
                        style={styles.fieldInput}
                        secureTextEntry={enableMaskConfirm}
                        placeholder="Confirm your password"
                        onChangeText={(text) => setConfirm(text)}
                      />
                    )
                  }
                  
                  <Text style={styles.toggleConfirm} onPress={toggleMaskConfirm}>
                    {enableMaskConfirm ?
                      <Icon6 name="eye-slash" size={20} color="#1118" />
                      :
                      <Icon6 name="eye" size={20} color="#1118" />
                    }
                  </Text>
                </View>

                <View style={{marginTop: 50}}>

                  <View style={styles.notificationWrapper}>
                    <Icon3 style={styles.iconNotificationStyle} name="check" size={20} color={passValidator1 ? "#27AE60" : "#0D1C2E"} />
                    <Text style={[styles.notification, {fontFamily: 'Work-Sans-regular'}]}>
                      Your password must be at least eight characters
                    </Text>
                  </View>

                  <View style={styles.notificationWrapper}>
                    <Icon3 style={styles.iconNotificationStyle} name="check" size={20} color={passValidator2 ? "#27AE60" : "#0D1C2E"} />
                    <Text style={[styles.notification, {fontFamily: 'Work-Sans-regular'}]}>
                      Must contain at least one digit.
                    </Text>
                  </View>

                  <View style={styles.notificationWrapper}>
                    <Icon3 style={styles.iconNotificationStyle} name="check" size={20} color={passValidator3 ? "#27AE60" : "#0D1C2E"} />
                    <Text style={[styles.notification, {fontFamily: 'Work-Sans-regular'}]}>
                      Must contain at least one uppercase letter.
                    </Text>
                  </View>

                </View>

                {validationError && errorModalShow && (
                  <View style={styles.errorMessageWrapper}>
                    <Icon3 style={styles.iconStyle} name="warning" size={20} color="#FFF" />
                    <Text style={[styles.errorMessageAlert, {fontFamily: 'Work-Sans'}]}>
                      {validationErrorMessage}
                    </Text>
                    <Pressable onPress={closeErrorModal} style={styles.iconStyle2}>
                      <Icon3 name="close" size={15} color="#FFF" />
                    </Pressable>
                  </View>
                )}

                <Pressable style={styles.signupButton} onPress={signup}>
                  <Text style={[styles.signupButtonText, {fontFamily: 'Work-Sans'}]}>Set Password</Text>
                </Pressable>

              </View>
            </>
          )
        }
        
      </ScrollView>
    </KeyboardAvoidingView>
      
  );
};

export default PasswordSetupScreen;

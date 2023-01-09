import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import CheckBox from 'react-native-check-box'
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { setAccountInfo, resetRegisterFlag, checkEmailAvailability, clearEmailAavailablityFlag, clearPhoneAavailablityFlag, checkPhoneAvailability } from '../actions/authActions';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import PhoneInput from "react-native-phone-number-input";
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { handleMessage } from '../actions/commonAction';


const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    paddingBottom: 10,
    marginTop: 0
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    justifyContent: 'flex-start',
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
  signupButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#FFF",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 30,
    width: '100%'
  },
  fieldCheckboxWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginTop: 10
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
    paddingBottom: 10,
    marginLeft: 30,
    paddingRight: 30,
    marginTop: 12,
    lineHeight: 20,
  },
  iconStyle: {
    padding: 10,
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
  fieldInput: {
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
  fieldInputPhone: {
    backgroundColor: '#F5F5F5',
    fontSize: 16,
    color: '#2CAF4D',
    flex: 1,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    height: 56
  },
  fieldInputPhoneError: {
    backgroundColor: '#F5F5F5',
    fontSize: 16,
    color: '#2CAF4D',
    flex: 1,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    height: 56,
    borderWidth: 1,
    borderColor: '#E74678',
    borderStyle: 'solid'
  },
  errorMessageWrapper: {
    width: '100%',
    height: 56,
    backgroundColor: '#E74678',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 30,
    justifyContent: 'center'
  },
  errorMessageAlert: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 10
  },
  fieldInputCheckbox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    padding: 10,
    color: '#2CAF4D',
    flex: 1,
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
    marginTop: 16,
  },
  iconImage: {
    width: 30,
    height: 30
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
  textLink: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right'
  },
  textLinkStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textLinkArrow: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 25,
  },
});

interface ISignupScreenProps {
  navigation: NavigationProp<any>;
}

const SignupScreen: React.FC<ISignupScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const { isEmailAvailableConfirmed, isPhoneAvailableConfirmed, isCheckedEmail, isCheckedPhone } = useSelector((state: IRootState) => state.auth);


  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [formattedValue, setFormattedValue] = useState("");
  const [errorModalShow, setErrorModalShow] = useState(false);

  const phoneInput = useRef(null);

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
  const bgColor = useThemeColor({}, 'background');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const [validationFirstNameError, setValidationFirstNameError] = React.useState(false);
  const [validationLastNameError, setValidationLastNameError] = React.useState(false);
  const [validationEmailError, setValidationEmailError] = React.useState(false);
  const [validationPhoneError, setValidationPhoneError] = React.useState(false);
  const [validationTermsError, setValidationTermsError] = React.useState(false);

  const validateEmail = (email: string) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }  

  const validateForm = () => {
    let flag = true;
    if (!firstName) {
      flag = false;
      setValidationError(true);
      setErrorModalShow(true);
      setValidationFirstNameError(true);
      setValidationErrorMessage('first name is required field');
      return flag;
    } else {
      setValidationFirstNameError(false);
    }
    if (!lastName) {
      flag = false;
      setValidationError(true);
      setErrorModalShow(true);
      setValidationLastNameError(true);
      setValidationErrorMessage('last name is required field');
      return flag;
    } else {
      setValidationLastNameError(false);
    }
    if (!email || !validateEmail(email)) {
      flag = false;
      setValidationError(true);
      setErrorModalShow(true);
      setValidationEmailError(true);
      setValidationErrorMessage('email is incorrect');
      return flag;
    } else {
      setValidationEmailError(false);
    }
    if (phone.length === 0 || phone.length < 8) {
      flag = false;
      setValidationError(true);
      setErrorModalShow(true);
      setValidationPhoneError(true);
      setValidationErrorMessage('Please fill your phone number!');
      return flag;
    } else {
      setValidationPhoneError(false);
    }
    if (!toggleCheckBox) {
      flag = false;
      setValidationError(true);
      setErrorModalShow(true);
      setValidationTermsError(true);
      setValidationErrorMessage('You should accept the terms');
      return flag;
    } else {
      setValidationTermsError(false);
    }
    return flag;
  }

  const signup = () => {
    console.log(validateForm());
    if (validateForm()) {
      if (email.length > 0 && validateEmail(email)) {
        dispatch(checkEmailAvailability(email));
      }
      if (phone.length > 0) {
        dispatch(checkPhoneAvailability(phone));
      }
    }
  };

  useEffect(() => {
    if (isCheckedEmail && isCheckedPhone) {
      if (isEmailAvailableConfirmed && isPhoneAvailableConfirmed) {
        dispatch(setAccountInfo({
          firstName,
          lastName,
          email,
          phone,
        }));
        dispatch(clearEmailAavailablityFlag());
        dispatch(clearPhoneAavailablityFlag());
        navigation.navigate('PasswordSetupScreen');
      } else {
        setErrorModalShow(true);
        if (!isEmailAvailableConfirmed) {
          dispatch(handleMessage(true, 'error', 'This email is already in use, please use another email.'));  
          setValidationErrorMessage('This email is already in use.');
          setValidationEmailError(true);
          dispatch(clearEmailAavailablityFlag());
        }
        if (!isPhoneAvailableConfirmed) {
          setValidationErrorMessage('phone number is incorrect');
          setValidationPhoneError(true);
          dispatch(clearPhoneAavailablityFlag());
        }
      }
    }
  }, [isCheckedEmail, isEmailAvailableConfirmed, isCheckedPhone, isPhoneAvailableConfirmed])

  const gotoPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicyScreen');
  };

  const closeErrorModal = () => {
    setErrorModalShow(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(resetRegisterFlag());  
    dispatch(clearEmailAavailablityFlag());
    dispatch(clearPhoneAavailablityFlag());
    setToggleCheckBox(false);
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.headerWrapper}>
          <Pressable style={styles.textLinkWrapper} onPress={goBack}>
            <Icon2 style={styles.textLinkArrow} name="arrow-back"/>
          </Pressable>
        </View>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Welcome!</Text>
            <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Create your account</Text>
          </View>
          <View style={styles.fieldWrapper}>
            <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#1118" />
            {
              validationFirstNameError ? (
                <TextInput
                  style={styles.fieldInputError}
                  placeholder="Enter your first name"
                  onChangeText={(text) => setFirstName(text)}
                  autoFocus
                />
              ) : (
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Enter your first name"
                  onChangeText={(text) => setFirstName(text)}
                  autoFocus
                />
              )
            }
          </View>
          <View style={styles.fieldWrapper}>
            <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#1118" />
            {
              validationLastNameError ? (
                <TextInput
                  style={styles.fieldInputError}
                  placeholder="Enter your last name"
                  onChangeText={(text) => setLastName(text)}
                />
              ) : (
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Enter your last name"
                  onChangeText={(text) => setLastName(text)}
                />
              )
            }
            
          </View>
          <View style={styles.fieldWrapper}>
            <Icon3 style={styles.iconStyle} name="mail" size={20} color="#1118" />
            {
              validationEmailError ? (
                <TextInput
                  style={styles.fieldInputError}
                  placeholder="Enter your email"
                  onChangeText={(text) => setEmail(text)}
                />
              ) : (
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Enter your email"
                  onChangeText={(text) => setEmail(text)}
                />
              )
            }
          </View>
          <View style={styles.fieldWrapper}>
            {
              validationPhoneError ? (
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phone}
                  defaultCode="US"
                  layout="first"
                  onChangeText={(text) => {
                    setFormattedValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setPhone(text);
                  }}
                  containerStyle={styles.fieldInputPhoneError}
                  textContainerStyle={{ paddingVertical: 0, borderTopRightRadius: 8, borderBottomRightRadius: 8, backgroundColor: 'transparent' }}
                  withDarkTheme            
                />
              ) : (
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phone}
                  defaultCode="US"
                  layout="first"
                  onChangeText={(text) => {
                    setFormattedValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setPhone(text);
                  }}
                  containerStyle={styles.fieldInputPhone}
                  textContainerStyle={{ paddingVertical: 0, borderTopRightRadius: 8, borderBottomRightRadius: 8, backgroundColor: 'transparent' }}
                  withDarkTheme            
                />
              )
            }
            
          </View>
          
          {fontsLoaded && (
            <View style={styles.fieldCheckboxWrapper}>
              <CheckBox
                style={{ flex: 1, padding: 10 }}
                onClick={() => {
                  setToggleCheckBox(!toggleCheckBox);
                }}
                isChecked={toggleCheckBox}
                leftText={"CheckBox"}
              />
              <Text style={[styles.fieldDescription, {fontFamily: 'Work-Sans-regular'}]}>
                By creating an account means you agree to the 
                <Text style={[styles.textLinkStyle, {fontFamily: 'Work-Sans'}]}> Terms and Conditions, </Text>
                and our
                <Pressable onPress={gotoPrivacyPolicy}>
                  <Text style={[styles.textLinkStyle, {fontFamily: 'Work-Sans'}]}> Privacy Policy </Text>
                </Pressable>
              </Text>
            </View>
          )}

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
            <Text style={[styles.signupButtonText, {fontFamily: 'Work-Sans'}]}>Create Account</Text>
          </Pressable>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

export default SignupScreen;

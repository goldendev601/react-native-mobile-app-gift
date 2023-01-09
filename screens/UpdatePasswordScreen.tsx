import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import { clearAuthState, updatePassword } from '../actions/authActions';
import { IRootState } from '../reducers';


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
    marginTop: 24,
    flexDirection: 'row'
  },
  notification: {
    color: "#111",
    fontSize: 12,
    fontWeight: "normal",
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
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
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  iconNotificationStyle: {
    paddingRight: 5
  },
  fieldInput: {
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
    paddingLeft: 40,
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
    height: 50,
    borderRadius: 14,
    width: "85%",
    marginTop: 100,
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
  toggle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 0,
  },
  toggleConfirm: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 0,
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center'
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

interface IUpdatePasswordScreenProps {
  navigation: NavigationProp<any>;
}

const UpdatePasswordScreen: React.FC<IUpdatePasswordScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const { isUpdatedPassword } = useSelector((state: IRootState) => state.auth);
  const { email, value } = useSelector((state: IRootState) => state.auth.accountInfo);

  console.log(email);
  console.log(value);

  const [pass, setPass] = React.useState('');

  const [enableMask, setEnableMask] = React.useState(true);
  const [enableMaskConfirm, setEnableMaskConfirm] = React.useState(true);

  const toggleMask = () => setEnableMask((f) => !f);
  const toggleMaskConfirm = () => setEnableMaskConfirm((fConfirm) => !fConfirm);

  const [passValidator1, setPassValidator1] = React.useState(false);
  const [passValidator2, setPassValidator2] = React.useState(false);
  const [passValidator3, setPassValidator3] = React.useState(false);

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

  const [confirm, setConfirm] = React.useState('');

  const bgColor = useThemeColor({}, 'background');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const updatePasswordFun = () => {
    if (pass.length === 0) {
      setValidationError(true);
      setValidationErrorMessage('You should fill the password!');
    }
    if (pass !== confirm) {
      setValidationError(true);
      setValidationErrorMessage('The confirm password is not matched with the password');
    }
    if (!validationError) {
      dispatch(updatePassword(email, value, pass, confirm));
    } 
  };

  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
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
    if (!/[a-z]/.test(pass) && /[A-Z]/.test(pass)) {
      setPassValidator3(true);
    } else {
      setPassValidator3(false);
    }
  }

  useEffect(() => {
    if (isUpdatedPassword) {
      dispatch(clearAuthState());
      navigation.navigate('LoginScreen')
    }
  }, [isUpdatedPassword])

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
          <Pressable style={styles.textLinkWrapper} onPress={gotoLogin}>
            <Text style={styles.textLink}>LOGIN</Text>
          </Pressable>
        </View>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Now, set up password in your account.</Text>
            <Text style={styles.description}>
              Create a password for your account
            </Text>
          </View>

          <View style={styles.fieldWrapperTop}>
            <Icon5 style={styles.iconStyle} name="lock-outline" size={20} color="#000" />
            <TextInput
              style={styles.fieldInput}
              secureTextEntry={enableMask}
              placeholder="Enter your password"
              onChangeText={(text) => setPass(text)}
            />
            <Text style={styles.toggle} onPress={toggleMask}>
              {enableMask ?
                <Icon6 name="eye-slash" size={20} color="#000" />
                :
                <Icon6 name="eye" size={20} color="#000" />
              }
            </Text>
          </View>
          <View style={styles.fieldWrapperBottom}>
            <Icon5 style={styles.iconStyle} name="lock-outline" size={20} color="#000" />
            <TextInput
              style={styles.fieldInput}
              secureTextEntry={enableMaskConfirm}
              placeholder="Confirm your password"
              onChangeText={(text) => setConfirm(text)}
            />
            <Text style={styles.toggleConfirm} onPress={toggleMaskConfirm}>
              {enableMaskConfirm ?
                <Icon6 name="eye-slash" size={20} color="#000" />
                :
                <Icon6 name="eye" size={20} color="#000" />
              }
            </Text>
          </View>

          <View style={{marginTop: 50}}>
            <View style={styles.notificationWrapper}>
              <Icon3 style={styles.iconNotificationStyle} name="check" size={20} color={passValidator1 ? "#27AE60" : "#0D1C2E"} />
              <Text style={styles.notification}>
                Your password must be at least eight characters
              </Text>
            </View>

            <View style={styles.notificationWrapper}>
              <Icon3 style={styles.iconNotificationStyle} name="check" size={20} color={passValidator2 ? "#27AE60" : "#0D1C2E"} />
              <Text style={styles.notification}>
                Must contain at least one digit.
              </Text>
            </View>

            <View style={styles.notificationWrapper}>
              <Icon3 style={styles.iconNotificationStyle} name="check" size={20} color={passValidator3 ? "#27AE60" : "#0D1C2E"} />
              <Text style={styles.notification}>
                Must contain at least one uppercase symbol.
              </Text>
            </View>
          </View>

          {validationError && (
            <Text style={styles.errorMessageAlert}>
              {validationErrorMessage}
            </Text>
          )}

          <Pressable style={styles.signupButton} onPress={updatePasswordFun}>
            <Text style={styles.signinButtonText}>Set Password</Text>
          </Pressable>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

export default UpdatePasswordScreen;

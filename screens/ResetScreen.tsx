import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, useThemeColor } from '../components/Themed';
import { clearAuthState, setAccountInfo } from '../actions/authActions';
import { IRootState } from '../reducers';
import { resetPassword } from '../actions/authActions';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    justifyContent: 'flex-start',
  },
  helpText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  socialButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#FFF"
  },
  fieldWrapper: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 10,
  },
  
  fieldLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 5,
  },
  fieldInput: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    padding: 8,
    color: '#2CAF4D',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 40,
  },
  greenButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7B61FF",
    padding: 16,
    fontSize: 15,
    fontWeight: "700",
    height: 50,
    borderRadius: 14,
    width: "85%",
    marginTop: 111,
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
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
    top: 14
  },
  textLinkArrow: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 25,
  },
});

interface IResetScreenProps {
  navigation: NavigationProp<any>;
}

const ResetScreen: React.FC<IResetScreenProps> = (props) => {
  const dispatch = useDispatch();
  const authData = useSelector((state: IRootState) => state.auth);
  const { navigation } = props;

  const [email, setEmail] = React.useState('');
  const [sentLink, setSentLink] = React.useState(false);

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const bgColor = useThemeColor({}, 'background');

  React.useEffect(() => {
    console.log(authData.isSentLink);
    if (authData.isSentLink) {
      dispatch(clearAuthState());
      navigation.navigate('VerificationRecoveryPasswordScreen')
    }
  }, [authData.isSentLink]);

  const sendLink = () => {
    console.log(email);
    dispatch(setAccountInfo({    
      email,      
    }));
    dispatch(resetPassword(email));
  };

  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const goBack = () => {
    navigation.goBack();
  };
  

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
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
          <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Recover Password</Text>
          <Text style={[styles.helpText, {fontFamily: 'Work-Sans-regular'}]}>Enter your email address to reset your password.</Text>
        </View>

        <View style={styles.fieldWrapper}>
          <Icon3 style={styles.iconStyle} name="mail" size={20} color="#000" />
          <TextInput
            style={styles.fieldInput}
            placeholder="Enter Email Address"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {sentLink ? (
          <Pressable style={styles.greenButton} onPress={gotoLogin}>
            <Text style={styles.socialButtonText}>Continue Login</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.greenButton} onPress={sendLink}>
            <Text style={styles.socialButtonText}>Recover Password</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default ResetScreen;

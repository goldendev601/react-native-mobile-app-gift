//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { getProfileInfo, goStripeAccessLink } from '../actions/authActions';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { IRootState } from '../reducers';
import { useFonts } from 'expo-font';

interface IConnectStripeScreenProps {
  navigation: NavigationProp<any>;
}

const ConnectStripeScreen: React.FC<IConnectStripeScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const { token, stripeUrl, userInfo, profileInfo } = useSelector((state: IRootState) => state.auth);

  console.log(stripeUrl);
  React.useEffect(() => {
    if (stripeUrl) {
      Linking.openURL(stripeUrl); 
      console.log('=========profileInfo========');
      console.log(profileInfo);
      dispatch(getProfileInfo(token));
      // navigation.navigate('TutorialFirstScreen');
    }
  }, [stripeUrl]);

  React.useEffect(() => {
    if (profileInfo) {
      console.log(profileInfo);
      if (profileInfo.user_stripe_account !== 'not created') {
        navigation.navigate('TutorialFirstScreen');
      } 
    }
  }, [profileInfo]);

  const setupStripeAccount = () => {
    console.log(token);
    dispatch(goStripeAccessLink(token));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/stripe-bk1.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>
          Connect Stripe to receive payments
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.description, {fontFamily: 'Work-Sans-regular'}]}>
          You will be prompted to create a Stripe account, if you already have one, please log in with your credentials.
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={styles.notificationWrapper}>
          <Image
              source={require("../assets/images/checkmark.png")}
              style={styles.iconNotificationStyle}
              resizeMode="cover"
          />
          <View style={styles.notificationContentWrapper}>
            <Text style={[styles.notificationTitle, {fontFamily: 'Work-Sans'}]}>Secure</Text>
            <Text style={[styles.description, {fontFamily: 'Work-Sans-regular'}]}>Transfer of your bank data</Text>
          </View>
        </View>
        <View style={styles.notificationWrapper}>
          <Image
              source={require("../assets/images/checkmark.png")}
              style={styles.iconNotificationStyle}
              resizeMode="cover"
          />
          <View style={styles.notificationContentWrapper}>
            <Text style={[styles.notificationTitle, {fontFamily: 'Work-Sans'}]}>Private</Text>
            <Text style={[styles.description, {fontFamily: 'Work-Sans-regular'}]}>
              This application will never be able to access your credentials
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.warningWrapper}>
        <Text style={[styles.warningContent, {fontFamily: 'Work-Sans-regular'}]}>
          By selecting “Continue” you agree to the
        </Text>
        <View style={styles.warningBottomWrapper}>
          <Text style={[styles.warningContent, {fontFamily: 'Work-Sans-regular'}]}>Stripe</Text>
          <Text style={[styles.warningBlueContent, {fontFamily: 'Work-Sans-regular'}]}>End User Privacy Policy</Text>
          <Text style={[styles.warningContent, {fontFamily: 'Work-Sans-regular'}]}>and</Text>
          <Text style={[styles.warningBlueContent, {fontFamily: 'Work-Sans-regular'}]}>SMS terms</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={setupStripeAccount}
      >
        <Text style={[styles.signupButtonText, {fontFamily: 'Work-Sans'}]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    width: '100%',
    flexDirection: 'column',
  },
  greenButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CAF4D',
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 999,
    width: '100%',
    marginTop: 40,
  },
  signinButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B61FF',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 14,
    width: '85%',
    marginTop: 20,
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
    width: "80%",
    marginTop: 20,
  },
  socialButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
  },
  signinButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
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
  headerContainer: {
    height: '45%',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  slideContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    padding: 0,
  },
  textContainer: {
    width: '85%',
    textAlign: 'left',
  },
  slideImage: {
    width: '80%',
    height: '90%',
  },
  title: {
    marginTop: 20,
    color: '#111',
    fontSize: 25,
    fontWeight: '700',
  },
  description: {
    marginTop: 10,
    color: '#111',
    fontSize: 14,
    fontWeight: 'normal',
  },
  notificationWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40,
  },
  notificationContentWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    marginLeft: 10
  },
  iconNotificationStyle: {
    paddingRight: 5,
  },
  notificationTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  warningWrapper: {
    width: '100%',
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 20,
  },
  warningBottomWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  warningContent: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  warningBlueContent: {
    color: '#7B61FF',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
});

//make this component available to the app
export default ConnectStripeScreen;

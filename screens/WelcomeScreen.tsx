//import liraries
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from "../components/Themed";
import { useFonts } from "expo-font";

interface IWelcomeScreenProps {
  navigation: NavigationProp<any>;
}

const WelcomeScreen: React.FC<IWelcomeScreenProps> = (props) => {

  const dispatch = useDispatch();
  const { navigation } = props;

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const gotoSignup = () => {
    navigation.navigate('SignupScreen');    
  };

  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={[styles.scrollContainer]}
        keyboardShouldPersistTaps='handled'
    >
      <View
        style={styles.container}      
      >
        
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/images/bg.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.headerContent}>
            <View style={styles.iconView}>
              <Image
                source={require('../assets/images/splash_logo.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            {
              fontsLoaded && (
                <>
                  <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>
                    Send greeting cards with cash in a meaningful & easy way
                  </Text>
                  <Text style={[styles.description, {fontFamily: 'Work-Sans-regular'}]}>
                    With Giftd, we make the process to send and receive monetary gifts easy and meaningful. No more writing checks, buying last minute greeting cards, or running to the ATM to pull out cash.
                  </Text>
                </>
              )
            }
            
            <TouchableOpacity
              style={styles.signinButton}
              onPress={gotoLogin}  
            >
              <Text style={styles.signinButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={gotoSignup}
            >
              <Text style={styles.signupButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 0,
    width: "100%",
    flexDirection: 'column'
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'transparent',
    paddingTop: 100,
    paddingLeft: 32,
    paddingRight: 32
  },
  iconView: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginTop: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitleInfo: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '600'
  },
  numberInfo: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '600'
  },
  subTitleInfo: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '600',
    marginTop: 20
  },
  contentInfo: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '400',
    marginTop: 10
  },
  signinButton: {    
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 16,
    fontSize: 15,
    fontWeight: "700",
    height: 50,
    borderRadius: 14,
    width: "100%",
    marginTop: 45,
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
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFF"
  },  
  socialButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
  },
  signinButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#7B61FF"
  },
  signupButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#FFF"
  },
  headerContainer: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
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
    padding: 0
  },
  textContainer: {
    width: '85%',
    textAlign: 'left'
  },
  slideImage: {
    width: '80%',
    height: '90%',
  },
  title: {
    marginTop: 25,
    color: "#FFF",
    fontSize: 26,   
    fontWeight: "700", 
    textAlign: 'center'
  },
  description: {
    marginTop: 30,
    color: "#FFF",
    fontSize: 13,   
    fontWeight: "normal", 
    textAlign: 'center'
  }
});

//make this component available to the app
export default WelcomeScreen;

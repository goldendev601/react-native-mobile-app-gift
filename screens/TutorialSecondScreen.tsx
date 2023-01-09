//import liraries
import React, { Component, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from "../components/Themed";
import { useFonts } from "expo-font";
import { getMyProfile } from "../actions/giftAppAction";
import { IRootState } from "../reducers";

interface ITutorialSecondScreenProps {
  navigation: NavigationProp<any>;
}

const TutorialSecondScreen: React.FC<ITutorialSecondScreenProps> = (props) => {

  const dispatch = useDispatch();
  const { navigation } = props;

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const gotoNext = () => {
    navigation.navigate('TutorialThirdScreen');
  };

  const {
    myProfile,
  } = useSelector((state: IRootState) => state.giftApp);

  useEffect(() => {
    dispatch(getMyProfile());
    console.log(myProfile)
  }, []);

  return (
    <View
      style={styles.container}      
    >
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/bg-small.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.slideContainer}>
          <Image
            source={require("../assets/images/tutorial2.png")}
            style={styles.slideImage}
            resizeMode="contain"
          />
        </View>
      </View>
      {
        fontsLoaded && (
          <>
            <View style={styles.textContainer}>
              <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>
                  A beautiful greeting card
              </Text>
              <Text style={[styles.description, {fontFamily: 'Work-Sans-regular'}]}>
                All the money gifted goes straight to the recipient’s account. No need for any extra steps.
              </Text>
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.signupButton} onPress={gotoNext}>
                    <Text style={[styles.signupButtonText, {fontFamily: 'Work-Sans'}]}>Next</Text>
                </Pressable>
            </View>
          </>
        )
      }
      
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 0,
    width: "100%",
    flexDirection: 'column'
  },
  greenButton: {    
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2CAF4D",
    fontSize: 15,
    fontWeight: "700",
    height: 50,
    borderRadius: 999,
    width: "100%",
    marginTop: 40,
  },  
  signinButton: {    
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7B61FF",
    padding: 16,
    fontSize: 15,
    fontWeight: "700",
    height: 50,
    borderRadius: 14,
    width: "85%",
    marginTop: 62,
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
  socialButtonText: {
    textTransform: "uppercase",
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
  headerContainer: {
    height: '52%',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    marginTop: 60,
    color: "#111",
    fontSize: 28,   
    fontWeight: "600", 
  },
  description: {
    marginTop: 10,
    color: "#111",
    fontSize: 14,   
    fontWeight: "normal", 
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7B61FF",
    fontSize: 15,
    fontWeight: "700",
    height: 50,
    borderRadius: 14,
    width: 250,
  },
  buttonContainer: {
    width: '100%',
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{
        translateX: -185
    }],
    margin: 0,
    backgroundColor: 'transparent'
  },
});

//make this component available to the app
export default TutorialSecondScreen;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import { clearContactState, clearPaymentMethodState, getContactList, getFavoriteContactList, getFilteredContactList, getPaymentMethods, selectPaymentMethod, setContactInfo } from '../actions/giftAppAction';
import { Contact, IRootState, PaymentMethod } from '../reducers';
import { setGiftInfo } from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';


interface ISelectPaymentMethodScreenProps {
  navigation: NavigationProp<any>;
}

const SelectPaymentMethodScreen: React.FC<ISelectPaymentMethodScreenProps> = (props) => {
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const closeModal = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    dispatch(clearContactState());
    dispatch(getContactList())
    dispatch(getFavoriteContactList())
    dispatch(clearPaymentMethodState());
    dispatch(getPaymentMethods());
  }, [])

  const selectPaymentMethodHandle = (paymentMethod: PaymentMethod) => {
    console.log(paymentMethod);
    dispatch(selectPaymentMethod(paymentMethod))
    props.navigation.navigate('SendMoneyScreen');
  };

  const sengotoPaymentMethodSettingdGift = () => {
      // props.navigation.navigate('ProfileScreen', { screen: 'AddPayment' });
      props.navigation.navigate('PaymentMethodSelectionScreen');
  };

  const addNewPaymentMethod = () => {
      // props.navigation.navigate('ProfileScreen', { screen: 'AddPayment' });
      props.navigation.navigate('PaymentMethodSelectionScreen');
  };

  const { paymentMethodList, isPaymentMethodLoading } = useSelector((state: IRootState) => state.giftApp);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer} >
          <View >
          </View>
          {
            paymentMethodList && paymentMethodList.length > 0 && (
              <View style={styles.headerTitleContainer}>
                <Text style={[styles.modalTitle, {fontFamily: 'Work-Sans'}]}>Select Payment Method</Text>
              </View>
            )
          }
          
          <Pressable onPress={closeModal}>
              <Image
                  source={require("../assets/images/close.png")}
                  style={styles.iconImage}
                  resizeMode="cover"
              />
          </Pressable>
      </View>
      {
        (paymentMethodList && paymentMethodList.length > 0) ? (
          <>
                <Text style={[styles.labelInfo, { fontFamily: 'Work-Sans-regular' }]} >
                  Credit/Debit Cards
                </Text>
                <View style={styles.modalView}>
                    {
                        fontsLoaded && paymentMethodList && paymentMethodList.filter((paymentMethod) => paymentMethod.type == 'card').map((paymentMethod, index) => {
                            return (
                                <Pressable style={styles.infoLinkContainer} key={index} onPress={() => selectPaymentMethodHandle(paymentMethod)}>
                                    <View style={styles.infoWrapper}>
                                        {
                                            paymentMethod.brand == 'amex' && (
                                                <Image
                                                    source={require("../assets/images/american-express.png")}
                                                    style={styles.iconImage1}
                                                    resizeMode="contain"
                                                />
                                            )
                                        }
                                        {
                                            paymentMethod.brand == 'visa' && (
                                                <Image
                                                    source={require("../assets/images/Visa.png")}
                                                    style={styles.iconImage1}
                                                    resizeMode="contain"
                                                />
                                            )
                                        }
                                        {
                                            paymentMethod.brand == 'mastercard' && (
                                                <Image
                                                    source={require("../assets/images/Mastercard.png")}
                                                    style={styles.iconImage1}
                                                    resizeMode="contain"
                                                />
                                            )
                                        }
                                        <View>
                                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                                {paymentMethod.brand}
                                            </Text>
                                            <Text style={[styles.codeInfo, { fontFamily: 'Work-Sans' }]} >
                                                ****{paymentMethod.last4}
                                            </Text>
                                        </View>
                                    </View>
                                    <Icon2 name="right" size={20} color="#7B61FF" />
                                </Pressable>
                            )
                        })
                    }
                </View>
                <Text style={[styles.labelInfo, { fontFamily: 'Work-Sans-regular' }]} >
                  Banks
                </Text>
                <View style={styles.modalView}>
                    {
                        fontsLoaded && paymentMethodList && paymentMethodList.filter((paymentMethod) => paymentMethod.type == 'bank' && paymentMethod.is_verified).map((paymentMethod, index) => {
                            return (
                                <Pressable style={styles.infoLinkContainer} key={index} onPress={() => selectPaymentMethodHandle(paymentMethod)}>
                                    <View style={styles.infoWrapper}>
                                        <Image
                                            source={require("../assets/images/GenericBank.png")}
                                            style={styles.iconImage1}
                                            resizeMode="contain"
                                        />
                                        <View>
                                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                                {paymentMethod.bank_name}
                                            </Text>
                                            <Text style={[styles.codeInfo, { fontFamily: 'Work-Sans' }]} >
                                                ****{paymentMethod.last4}
                                            </Text>
                                        </View>
                                    </View>
                                    <Icon2 name="right" size={20} color="#7B61FF" />
                                </Pressable>
                            )
                        })
                    }
                    <Pressable
                        onPress={() => addNewPaymentMethod()}
                    >
          
                        <View style={styles.modalButtonContainer1}>
                            <Text style={styles.buttonTitleInfo1}>
                                Add new payment method
                            </Text>
                        </View>
                    </Pressable>
                </View>
          </>
        ) : (
              <View style={styles.modalView}>
                  <Image
                  source={require('../assets/images/credit-card.png')}
                  style={{ width: 134 }}
                  resizeMode="contain"
                  />
                  <Text style={[styles.modalTitle, {fontFamily: 'Work-Sans'}]}>Set up payment account</Text>
                  <Text style={[styles.modalText, {fontFamily: 'Work-Sans'}]}>
                      Before sending your first Gift please enter your credit or debit card details.
                  </Text>
                  <Pressable
                      onPress={() => sengotoPaymentMethodSettingdGift()}
                  >
                      <View style={styles.modalButtonContainer}>
                          <Text style={styles.buttonTitleInfo2}>
                              Continue
                          </Text>
                      </View>
                  </Pressable>
              </View>
        )
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // height: 350,
    marginTop: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  centeredView: {
      flex: 1,
      backgroundColor: 'transparent',
  },
  centeredView1: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  iconImage1: {
    width: 70,
    height: 48
  },
  headerTitleContainer: {
    marginTop: 20,
    height: 50,
    textAlign: 'center',
    paddingTop: 3,        
  },
  modalButtonContainer: {
    marginTop: 5,
    width: 300,
    height: 56,
    backgroundColor: '#7B61FF',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: 'rgba(17, 17, 17, 0.4)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonTitleInfo1: {
      fontSize: 14,
      color: '#7B61FF',
      fontWeight: '600',
      textTransform: 'uppercase'
  },
  buttonTitleInfo2: {
      fontSize: 14,
      color: '#FFF',
      fontWeight: '600',
      textTransform: 'uppercase'
  },
  labelInfo: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 31,
    color: '#111',
    fontWeight: '600',
    paddingLeft: 35
  },
  titleInfo: {
      fontSize: 14,
      color: '#111',
      textAlign: 'left',
      fontWeight: '500',
      alignItems: 'center',
      paddingTop: 3,
      paddingLeft: 12,
      textTransform: 'capitalize'
  },
  codeInfo: {
      fontSize: 12,
      color: '#111',
      textAlign: 'left',
      fontWeight: '400',
      alignItems: 'center',
      paddingTop: 3,
      paddingLeft: 12,
      opacity: 0.5
  },
  modalButtonContainer1: {
      marginBottom: 45,
      marginTop: 25,
      width: 300,
      height: 56,
      backgroundColor: '#FFF',
      borderRadius: 14,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#7B61FF',
      borderStyle: 'solid',
      borderWidth: 0.5
  },
  infoLinkContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 68,
      alignItems: 'center',
      padding: 10,
      borderRadius: 15,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      borderStyle: 'solid',
      borderWidth: 0.5,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      marginBottom: 10
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  modalTitle: {
      color: '#111',
      fontSize: 20,
      lineHeight: 40,
      fontWeight: '600',
      marginBottom: 15,
      textAlign: 'center',
  },
  modalView: {
      backgroundColor: 'white',
      paddingLeft: 35,
      paddingRight: 35,
      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 5,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
  },
  textContainer: {
    width: '85%',
    textAlign: 'left'
  },
  headerContainer: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  movementListContainer: {
    width: '100%',
    paddingTop: 20
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    marginTop: 30,
    flexDirection:  'row',
    justifyContent: 'space-between'
  },
  buttonTitleInfo: {
    fontSize: 14,
    color: '#7B61FF',
    fontWeight: '600'
  },
  buttonTitleInfoBlank: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    marginTop: 13,
    width: 79,
    textAlign: 'center'
  },
  importButtonTitleInfoBlank: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 10
  },
  newContactContainer: {
    width: '48%',
  },
  importContactContainer: {
    width: '48%'
  },
  newContactContainerSingle: {
    width: '48%',
  },
  importContactContainerSingle: {
    width: '48%'
  },
  newContactButton: {
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    borderRadius: 10,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  newContactButtonBlank: {
    backgroundColor: '#7B61FF',
    borderRadius: 10,
    height: 123,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  importContactButtonBlank: {
    backgroundColor: '#7B61FF',
    borderRadius: 10,
    height: 123,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanQrButton: {
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    borderRadius: 10,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanQrContainer: {
    width: '50%',
    paddingLeft: 10
  },
  headerTitleInfo: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: 20,
    marginTop: 60
  },
  headerPriceInfo: {
    fontSize: 60,
    color: '#FFF',
    marginLeft: 20,
    marginTop: 24
  },
  mainContainer: {
    width: '100%',
    marginBottom: 50,
    marginTop: 20
  },
  favoritesContainer: {
    height: 100,
    width: '100%',
    overflow: "hidden",
    marginTop: 20
  },
  eventsContainer: {
    width: '100%',
    overflow: "hidden"
  },
  movementsContainer: {
    width: '100%',
    overflow: "hidden"
  },
  favoriteInfoListContainer: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden'
  },
  profileImage1: {
    width: 40,
    height: 40,
    borderRadius: 24,
    overflow: 'hidden'
  },
  image: {
    width: "100%",
    height: "100%"
  },
  eventImage: {
    width: "100%",
    height: "100%"
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 20,
    marginTop: 30
  },
  title: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    fontWeight: '600',
    justifyContent: 'flex-start',
  },
  dateInfo: {
    fontSize: 16,
    lineHeight: 31,
    color: '#111111',
    fontStyle: 'normal',
    fontWeight: '600'
  },
  favoriteTitleInfo: {
    fontSize: 16,
    color: '#111111',
    fontStyle: 'normal',
    fontWeight: '600',
    paddingBottom: 10
  },
  helpText: {
    fontSize: 16,
  },
  iconImage: {
    width: 30,
    height: 30
  },
  iconCloseImage: {
    width: 30,
    height: 30,
    marginTop: 5
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
  fieldWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 10
  },
  fieldCheckboxWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 5,
    marginLeft: 10,
    paddingRight: 30
  },
  iconStyle: {
    paddingRight: 5,
    paddingTop: 5
  },
  iconStyle1: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  searchFieldInput: {
    backgroundColor: 'rgba(17, 17, 17, 0.1)',
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    color: '#111',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 40,
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center'
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
    marginTop: 16,
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
  slideImage: {
    width: '80%',
    height: '90%',
  },
  eventImageContainer: {
    height: 280,
    overflow: 'hidden'
  },
  eventInfoContainer: {
    height: 70,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
  },
  favoriteInfoContainer: {
    height: 32,
    width: 80,
  },
  nameInfoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoInfoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteFullNameInfoContainer: {
    width: 80,
    textAlign: 'center'
  },
  fullNameInfoContainer: {
    width: '60%',
    paddingLeft: 12
  },
  fullNameInfo: {
    fontSize: 14,
    color: '#111',
  },
  nameInfo: {
    fontSize: 12,
    color: '#7B61FF',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  photoInfo: {
    fontSize: 12,
    color: '#7B61FF',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  emailInfo: {
    fontSize: 12,
    color: '#111',
    opacity: 0.5
  },
  editIconContainer: {
    marginLeft: 'auto'
  },
  deleteIconContainer: {
    marginLeft: 'auto'
  },
  priceInfo: {
    fontSize: 18,
    color: '#111'
  },
  blankContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
  },
  blankText: {
      color: 'rgba(17, 17, 17, 0.4)',
      marginTop: '50%',
      fontSize: 14
  }

});

export default SelectPaymentMethodScreen;


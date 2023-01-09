import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import { clearContactState, getContactList, getFavoriteContactList, getFilteredContactList, setContactInfo } from '../actions/giftAppAction';
import { Contact, IRootState } from '../reducers';
import { setGiftInfo } from '../actions/giftAppAction';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { handleMessage } from '../actions/commonAction';


interface IContactListScreenProps {
  navigation: NavigationProp<any>;
}

const ContactListScreen: React.FC<IContactListScreenProps> = (props) => {
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const closeModal = () => {
    props.navigation.goBack();
  };

  const gotoSendMoneyScreen = (contact: Contact) => {
    if (contact.email || contact.phone) {
      dispatch(setGiftInfo({
        gift_contact: contact,
      }));
      props.navigation.navigate('SelectPaymentMethodScreen');
    } else {
      dispatch(handleMessage(true, 'error', 'Contact must have at least a phone number or an email address to receive payments.'));
    }
  };

  const gotoEditContactScreen = (contact: Contact) => {
    dispatch(setContactInfo(contact));
    props.navigation.navigate('EditContactScreen');
  };

  const gotoDeleteContactScreen = (contact: Contact) => {
    dispatch(setContactInfo(contact));
    props.navigation.navigate('DeleteContactScreen');
  };

  useEffect(() => {
    dispatch(clearContactState());
    dispatch(getContactList())
    dispatch(getFavoriteContactList())
  }, [])

  const gotoNewContact = () => {
    props.navigation.navigate('AddNewContactScreen');
  };

  const gotoImportContact = () => {
    props.navigation.navigate('ImportContactsScreen');
  };

  const handleSearchChange = (value: string) => {
    dispatch(getFilteredContactList(value))
  }

  const { contactList, favoriteList } = useSelector((state: IRootState) => state.giftApp)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={closeModal}>
          <Image
            source={require("../assets/images/close.png")}
            style={styles.iconCloseImage}
            resizeMode="cover"
          />
        </Pressable>
        <View style={styles.fieldWrapper}>
            <Icon2 style={styles.iconStyle1} name="search" size={20} color="#000" />
            <TextInput
                style={styles.searchFieldInput}
                placeholder="Search contact"
                onChangeText={(text) => handleSearchChange(text)}
            />
        </View>
      </View>
        
      {
        contactList.length > 0 ? (
          <>
            <View style={styles.buttonContainer}>
              <View style={styles.newContactContainer}>
                <Pressable style={styles.newContactButtonBlank} onPress={gotoNewContact}>
                  <Image
                    source={require("../assets/images/plus-circle-white.png")}
                    style={styles.iconImage}
                    resizeMode="cover"
                  />
                  <Text style={[styles.buttonTitleInfoBlank, {fontFamily: 'Work-Sans'}]}>
                    Add New Contact
                  </Text>
                </Pressable>
              </View>
              <View style={[styles.importContactContainer]}>
                <Pressable style={styles.importContactButtonBlank} onPress={gotoImportContact}>
                  <Image
                    source={require("../assets/images/importContact-white.png")}
                    style={styles.iconImage}
                    resizeMode="cover"
                  />
                  <Text style={[styles.buttonTitleInfoBlank, {fontFamily: 'Work-Sans'}]}>
                    Import Contacts
                  </Text>
                </Pressable>
              </View>
            </View>
            {/* {
              favoriteList.length > 0 && (
                <View style={styles.favoritesContainer}>
                  <Text style={styles.favoriteTitleInfo}>
                    Favorites
                  </Text>
                  <ScrollView style={styles.favoriteInfoListContainer} horizontal>
                  {
                    favoriteList.map((favorite, index) => {
                      return (
                        <Pressable onPress={() => gotoSendMoneyScreen(favorite)} key={index}>
                          <View style={styles.favoriteInfoContainer}>
                            <View style={styles.photoInfoContainer}>
                              <Image
                                  source={{
                                      uri: 'https://givegiftd.s3.us-east-1.amazonaws.com/default/profile_picture.png',
                                  }}
                                  style={styles.profileImage1}
                              />
                            </View>
                            <View style={styles.favoriteFullNameInfoContainer}>
                              <Text style={styles.fullNameInfo}>
                                {favorite.first_name}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      )
                    })
                  }
                  </ScrollView>
                </View>
              )
            } */}
            
            <ScrollView style={styles.mainContainer}>
              <View
                style={styles.movementsContainer}
              >
                <View style={styles.movementListContainer}>
                  <Text style={[styles.dateInfo, {fontFamily: 'Work-Sans-regular'}]}>
                    Send a gift to
                  </Text>
                  {
                    contactList.map((contact, index) => {
                      return (
                        <View style={styles.eventInfoContainer} key={index}>
                          <Pressable style={styles.nameInfoContainer} onPress={() => gotoSendMoneyScreen(contact)} >
                            <Image
                                source={{
                                    uri: 'https://givegiftd.s3.us-east-1.amazonaws.com/default/profile_picture.png',
                                }}
                                style={styles.profileImage}
                            />
                          </Pressable>
                          <Pressable style={styles.fullNameInfoContainer} onPress={() => gotoSendMoneyScreen(contact)}>
                            <Text style={[styles.fullNameInfo, {fontFamily: 'Work-Sans-regular'}]}>
                              {contact.first_name} {contact.last_name}
                            </Text>
                            {
                              contact.email ? (
                                <Text style={[styles.emailInfo, {fontFamily: 'Work-Sans-regular'}]}>
                                  {contact.email}
                                </Text>
                              ) : (
                                <Text style={[styles.emailInfo, {fontFamily: 'Work-Sans-regular'}]}>
                                  {contact.phone}
                                </Text>
                              )
                            }
                            
                          </Pressable>
                          <Pressable style={styles.deleteIconContainer} onPress={() => gotoDeleteContactScreen(contact)}>
                            <Icon3 style={styles.iconStyle} name="trash-2" size={20} color="#000" />
                          </Pressable>
                          <Pressable style={styles.editIconContainer} onPress={() => gotoEditContactScreen(contact)}>
                            <Icon1 style={styles.iconStyle} name="pencil" size={20} color="#000" />
                          </Pressable>
                        </View>
                      )
                    })
                  }
                  
                </View>
              </View>
            </ScrollView>
          </>
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <View style={styles.newContactContainerSingle}>
                <Pressable style={styles.newContactButtonBlank} onPress={gotoNewContact}>
                  <Image
                    source={require("../assets/images/plus-circle-white.png")}
                    style={styles.iconImage}
                    resizeMode="cover"
                  />
                  <Text style={[styles.buttonTitleInfoBlank, {fontFamily: 'Work-Sans'}]}>
                    Add New Contact
                  </Text>
                </Pressable>
              </View>
              <View style={styles.importContactContainerSingle}>
                <Pressable style={styles.importContactButtonBlank} onPress={gotoImportContact}>
                  <Image
                    source={require("../assets/images/importContact-white.png")}
                    style={styles.iconImage}
                    resizeMode="cover"
                  />
                  <Text style={[styles.buttonTitleInfoBlank, {fontFamily: 'Work-Sans'}]}>
                    Import Contacts
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.blankContainer}>
              <Image
                  source={require("../assets/images/contacts-icon.png")}
                  style={{width: 80, height: 80}}
                  resizeMode="cover"
              />
              <Text style={[styles.blankText1, {fontFamily: 'Work-Sans'}]}>
                You don’t have any contacts yet.
              </Text>
              <Text style={[styles.blankText2, {fontFamily: 'Work-Sans'}]}>
                Create a contact first to send a gift.
              </Text>
              <Pressable style={styles.createNewContactContainer} onPress={gotoNewContact}>
                <Text style={[styles.blankBtnText, {fontFamily: 'Work-Sans'}]}>
                  Create a new contact
                </Text>
              </Pressable>
            </View>
          </>
        )
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    maxHeight: '95%',
    marginTop: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  textContainer: {
    width: '85%',
    textAlign: 'left'
  },
  headerContainer: {
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
    marginTop: '40%'
  },
  blankText1: {
      color: 'rgba(17, 17, 17, 0.4)',
      marginTop: 20,
      fontSize: 14,
      lineHeight: 22,
      textAlign: 'center'
  },
  blankText2: {
    color: 'rgba(17, 17, 17, 0.4)',
    // marginBottom: '50%',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center'
  },
  createNewContactContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 188,
    height: 37,
    borderRadius: 40,
    borderColor: '#7B61FF',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: '50%'
  },
  blankBtnText: {
    color: '#7B61FF',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 30,
    fontWeight: '600'
  }
});

export default ContactListScreen;

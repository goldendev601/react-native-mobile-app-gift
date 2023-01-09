import * as React from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput, Switch, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import { addContact, addContactWithoutEmail, addContactWithoutPhone, clearContactState, getMyProfile, setGiftInfo } from '../actions/giftAppAction';
import { IRootState } from '../reducers';
import { useEffect } from 'react';
import PhoneInput from "react-native-phone-number-input";


interface IAddNewContactScreenProps {
    navigation: NavigationProp<any>;
}

const AddNewContactScreen: React.FC<IAddNewContactScreenProps> = (props) => {

    const dispatch = useDispatch();

    const [sendGift, setSendGift] = React.useState(false);

    const { myProfile } = useSelector((state: IRootState) => state.giftApp)

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [formattedValue, setFormattedValue] = React.useState("");
    const [isFavourite, setIsFavourite] = React.useState(false);

    const phoneInput = React.useRef(null);
    const [errorModalShow, setErrorModalShow] = React.useState(false);

    const toggleSwitch = () => setIsFavourite(previousState => !previousState);    

    const [validationError, setValidationError] = React.useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

    const [validationFirstNameError, setValidationFirstNameError] = React.useState(false);
    const [validationLastNameError, setValidationLastNameError] = React.useState(false);
    const [validationEmailError, setValidationEmailError] = React.useState(false);
    const [validationPhoneError, setValidationPhoneError] = React.useState(false);

    const { contactInfo, isAddContactSuccess } = useSelector((state: IRootState) => state.giftApp)

    const validateEmail = (email: string) => {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    const validatePhone = (phone: string) => {
        let isnum = /^\d+$/.test(phone.substring(1));
        return isnum
    }

    const closeErrorModal = () => {
        setErrorModalShow(false);
    };

    useEffect(() => {
        dispatch(getMyProfile())
    }, [])


    const closeModal = () => {
        props.navigation.goBack();
    };

    const validateForm = () => {
        let flag = true;
        if (firstName.length === 0) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationFirstNameError(true);
        } else {
            setValidationFirstNameError(false);
        }
        if (lastName.length === 0) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationLastNameError(true);
        } else {
            setValidationLastNameError(false);
        }
        if (email.length !== 0 && !validateEmail(email)) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationEmailError(true);
        } else {
            setValidationEmailError(false);
        }
        if (phone.length === 0 && email.length === 0) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationEmailError(true);
            setValidationPhoneError(true);
        } else {
            setValidationEmailError(false);
            setValidationPhoneError(false);
        }
        if (phone.length !== 0 && !phone.startsWith('+')) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationPhoneError(true);
        } 
        if (phone.length !== 0 && phone.length < 10) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationPhoneError(true);
        } 
        if (phone.length !== 0 && !validatePhone(phone)) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationPhoneError(true);
        } 
        return flag;
    }

    const sendInvite = () => {
        console.log(myProfile)
        if (validateForm()) {
            setSendGift(true);
            if (email.length > 0 && phone.length > 0) {
                dispatch(addContact(firstName, lastName, email, phone, isFavourite));
            }
            if (email.length > 0 && phone.length === 0) {
                dispatch(addContactWithoutPhone(firstName, lastName, email, isFavourite));
            }
            if (email.length === 0 && phone.length > 0) {
                dispatch(addContactWithoutEmail(firstName, lastName, phone, isFavourite));
            }
        } else {
            if (firstName.length === 0) {
                setValidationErrorMessage('first name is required field');
              }
              else if (lastName.length === 0) {
                setValidationErrorMessage('last name is required field');
              }
              else if (email.length !== 0 && !validateEmail(email)) {
                setValidationErrorMessage('Please recheck your email info');
              }
              else if (phone.length === 0 && email.length === 0) {
                setValidationErrorMessage('Enter at least 1 field');
              }
              else if (phone.length !== 0 && !phone.startsWith('+')) {
                setValidationErrorMessage('Invalid phone number');
              }
              else if (phone.length !== 0 && phone.length < 10) {
                setValidationErrorMessage('Invalid phone number');
              }
              else if (phone.length !== 0 && !validatePhone(phone)) {
                setValidationErrorMessage('Invalid phone number');
              }
              else {
                setValidationErrorMessage('There are some thing wrong in your input values!');
              }
        }
    };

    const addNewContact = () => {
        if (validateForm()) {
            setSendGift(false);
            if (email.length > 0 && phone.length > 0) {
                dispatch(addContact(firstName, lastName, email, phone, isFavourite));
            }
            if (email.length > 0 && phone.length === 0) {
                dispatch(addContactWithoutPhone(firstName, lastName, email, isFavourite));
            }
            if (email.length === 0 && phone.length > 0) {
                dispatch(addContactWithoutEmail(firstName, lastName, phone, isFavourite));
            }
        } else {
            if (firstName.length === 0) {
                setValidationErrorMessage('first name is required field');
              }
              else if (lastName.length === 0) {
                setValidationErrorMessage('last name is required field');
              }
              else if (email.length !== 0 && !validateEmail(email)) {
                setValidationErrorMessage('Please recheck your email info');
              }
              else if (phone.length === 0 && email.length === 0) {
                setValidationErrorMessage('Enter at least 1 field');
              }
              else if (phone.length !== 0 && !phone.startsWith('+')) {
                setValidationErrorMessage('Invalid phone number');
              }
              else if (phone.length !== 0 && phone.length < 10) {
                setValidationErrorMessage('Invalid phone number');
              }
              else if (phone.length !== 0 && !validatePhone(phone)) {
                setValidationErrorMessage('Invalid phone number');
              }
              else {
                setValidationErrorMessage('There are some thing wrong in your input values!');
              }
        }
    };

    useEffect(() => {
        if (contactInfo.id > 0 && isAddContactSuccess) {
            console.log(sendGift);
            console.log(isAddContactSuccess);
            if (sendGift) {
                dispatch(setGiftInfo({
                    gift_contact: contactInfo,
                }));
                props.navigation.navigate('SelectPaymentMethodScreen');
            } else {
                props.navigation.navigate('ContactListScreen');
            }
        }
    }, [contactInfo, isAddContactSuccess, sendGift])

    useEffect(() => {
        dispatch(clearContactState());
    }, [])

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    const [message, setMessage] = React.useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.flex}
        >
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={[styles.scrollContainer]}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={styles.headerContainer} >
                        <Pressable style={styles.textLinkWrapper} onPress={closeModal} >
                            <Image
                                source={require("../assets/images/close.png")}
                                style={styles.iconImage}
                                resizeMode="cover"
                            />
                        </Pressable>
                        <View style={styles.headerTitleContainer}>
                            <Text style={[styles.headerTitle, {fontFamily: 'Work-Sans'}]}>Add new contact</Text>
                        </View>
                        <View style={styles.textLinkWrapper}>
                        </View>
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={styles.fieldWrapper}>
                            <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#1118" />
                            {
                                validationFirstNameError ? (
                                    <TextInput
                                        style={styles.fieldInputError}
                                        placeholder="Enter first name"
                                        onChangeText={(text) => setFirstName(text)}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.fieldInput}
                                        placeholder="Enter first name"
                                        onChangeText={(text) => setFirstName(text)}
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
                                        placeholder="Enter last name"
                                        onChangeText={(text) => setLastName(text)}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.fieldInput}
                                        placeholder="Enter last name"
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
                                        placeholder="Enter email address"
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.fieldInput}
                                        placeholder="Enter email address"
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
                                        textContainerStyle={{ paddingVertical: 0 }}
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
                                        textContainerStyle={{ paddingVertical: 0 }}
                                        withDarkTheme            
                                    />
                                )
                            }
                        </View>
                        {/* <View style={styles.fieldWrapper}>
                            <Text style={{marginRight: 20}}>Favorite</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isFavourite ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isFavourite}
                            />
                        </View> */}

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
                    </View>
                    <View style={styles.buttonContainer} >
                        <Pressable style={styles.sendButton} onPress={addNewContact}>
                            <Text style={[styles.sendButtonText, {fontFamily: 'Work-Sans'}]}>ADD CONTACT</Text>
                        </Pressable>
                        <Pressable style={styles.sendButton2} onPress={sendInvite}>
                            <Text style={[styles.sendButtonText2, {fontFamily: 'Work-Sans'}]}>ADD & SEND A GIFT</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
       
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 30,
        height: '92%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center',
    },
    iconStyle2: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        right: 0,
    },
    headerTitleContainer: {
        height: 50,
        textAlign: 'center',
        paddingTop: 15,        
    },
    headerContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    textLinkWrapper: {
        justifyContent: 'center',
        width: 32,
        backgroundColor: 'transparent'
    },
    errorMessageWrapper: {
        marginTop: 15,
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
    headerTitle: {
        color: '#7B61FF',
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase'
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
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 80
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 24,
        width: '100%',
    },
    iconStyle: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
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
    image: {
        width: '100%',
    },
    iconImage: {
        width: 30,
        height: 30
    },
    fieldCheckboxWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginBottom: 50,
        marginTop: 25,
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
    },
    fieldDescription: {
        fontSize: 14,
        fontWeight: 'normal',
        paddingBottom: 5,
        marginLeft: 10,
        paddingRight: 30,
        marginTop: 5
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF",
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        letterSpacing: 0.5
    },
    sendButtonText2: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#7B61FF",
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        letterSpacing: 0.5
    },
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        fontSize: 15,
        fontWeight: "700",
        height: 56,
        borderRadius: 14,
        width: "85%",
        marginTop: 16,
    },
    sendButton2: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        fontSize: 15,
        fontWeight: "700",
        height: 56,
        borderRadius: 14,
        width: "85%",
        marginTop: 16,
        borderColor: '#7B61FF',
        borderWidth: 0.5
    },
   
});

export default AddNewContactScreen;

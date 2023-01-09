import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput, Switch, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import { addContact, updateContact, updateContactWithoutEmail, updateContactWithoutPhone } from '../actions/giftAppAction';
import { IRootState } from '../reducers';


interface IEditContactScreenProps {
    navigation: NavigationProp<any>;
}

const EditContactScreen: React.FC<IEditContactScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { contactInfo } = useSelector((state: IRootState) => state.giftApp);

    const [contactId, setContactId] = React.useState(contactInfo.id);
    const [firstName, setFirstName] = React.useState(contactInfo.first_name);
    const [lastName, setLastName] = React.useState(contactInfo.last_name);
    const [email, setEmail] = React.useState(contactInfo.email);
    const [phone, setPhone] = React.useState("");
    const [isFavourite, setIsFavourite] = React.useState(false);
   
    

    React.useEffect(() => {
        if (contactInfo) {
            setContactId(contactInfo.id);
            setFirstName(contactInfo.first_name);
            setLastName(contactInfo.last_name);
            setEmail(contactInfo.email);
            if (contactInfo.phone) {
                setPhone(contactInfo.phone);  
            } else {
                setPhone("");  
            }
            if (contactInfo.is_favourite === true) {
                setIsFavourite(true);
            }         
        }
    }, [contactInfo])

    const toggleSwitch = () => setIsFavourite(previousState => !previousState);


    const closeModal = () => {
        props.navigation.goBack();
    };

    const [validationError, setValidationError] = React.useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

    const [validationFirstNameError, setValidationFirstNameError] = React.useState(false);
    const [validationLastNameError, setValidationLastNameError] = React.useState(false);
    const [validationEmailError, setValidationEmailError] = React.useState(false);
    const [validationPhoneError, setValidationPhoneError] = React.useState(false);

    const [errorModalShow, setErrorModalShow] = React.useState(false);


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
        if (email && email.length !== 0 && !validateEmail(email)) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationEmailError(true);
        } else {
            setValidationEmailError(false);
        }
        if (phone && phone.length === 0 && email && email.length === 0) {
            flag = false;
            setValidationError(true);
            setErrorModalShow(true);
            setValidationEmailError(true);
            setValidationPhoneError(true);
        } else {
            setValidationEmailError(false);
            setValidationPhoneError(false);
        }
        if (!phone && !email) {
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
        if (validateForm()) {
            console.log(phone);
            console.log(email);
            if (email && email.length > 0 && phone && phone.length > 0) {
                dispatch(updateContact(contactId, firstName, lastName, email, phone, isFavourite));
            }
            if (email && email.length > 0 && phone && phone.length === 0) {
                dispatch(updateContactWithoutPhone(contactId, firstName, lastName, email, isFavourite));
            }
            if (email && email.length > 0 && !phone) {
                dispatch(updateContactWithoutPhone(contactId, firstName, lastName, email, isFavourite));
            }
            if (email && email.length === 0 && phone && phone.length > 0) {
                dispatch(updateContactWithoutEmail(contactId, firstName, lastName, phone, isFavourite));
            }
            if (!email && phone && phone.length > 0) {
                dispatch(updateContactWithoutEmail(contactId, firstName, lastName, phone, isFavourite));
            }
            props.navigation.navigate('ContactListScreen');
        } else {
            if (firstName.length === 0) {
                setValidationErrorMessage('first name is required field');
              }
              else if (lastName.length === 0) {
                setValidationErrorMessage('last name is required field');
              }
              else if (email && email.length !== 0 && !validateEmail(email)) {
                setValidationErrorMessage('Please recheck your email info');
              }
              else if (phone && phone.length === 0 && email && email.length === 0) {
                setValidationErrorMessage('Enter at least 1 field');
              }
              else if (!phone && !email) {
                setValidationErrorMessage('Enter at least 1 field');
              }
              else if (phone && phone.length !== 0 && !phone.startsWith('+')) {
                setValidationErrorMessage('Invalid phone number');
              }
              else if (phone && phone.length !== 0 && phone.length < 10) {
                setValidationErrorMessage('Invalid phone number');
              }
              else if (phone && phone.length !== 0 && !validatePhone(phone)) {
                setValidationErrorMessage('Invalid phone number');
              }
              else {
                setValidationErrorMessage('There are some thing wrong in your input values!');
              }
        }
    };

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
                        <Pressable onPress={closeModal}>
                            <Image
                                source={require("../assets/images/close.png")}
                                style={styles.iconImage}
                                resizeMode="cover"
                            />
                        </Pressable>
                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.headerTitle}>Edit contact</Text>
                        </View>
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={styles.fieldWrapper}>
                            <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#1118" />
                            {
                                validationFirstNameError ? (
                                    <TextInput
                                        style={styles.fieldInputError}
                                        placeholder="Enter your first name"
                                        value={firstName}
                                        onChangeText={(text) => setFirstName(text)}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.fieldInput}
                                        placeholder="Enter your first name"
                                        value={firstName}
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
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChangeText={(text) => setLastName(text)}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.fieldInput}
                                        placeholder="Enter your last name"
                                        value={lastName}
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
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.fieldInput}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                )
                            }
                        </View>
                        <View style={styles.fieldWrapper}>
                            <Icon4 style={styles.iconStyle} name="phone" size={20} color="#1118" />
                            {
                                validationPhoneError ? (
                                    <TextInput
                                        style={styles.fieldInputError}
                                        placeholder="Enter your phone"
                                        value={phone}
                                        onChangeText={(text) => setPhone(text)}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.fieldInput}
                                        placeholder="Enter your phone"
                                        value={phone}
                                        onChangeText={(text) => setPhone(text)}
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
                        <Pressable style={styles.sendButton} onPress={sendInvite}>
                            <Text style={[styles.sendButtonText, {fontFamily: 'Work-Sans'}]}>Save</Text>
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
    headerTitleContainer: {
        width: 220,
        height: 50,
        textAlign: 'center',
        paddingTop: 3,
    },
    headerContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitle: {
        color: '#7B61FF',
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 10,
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 50
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
    iconStyle2: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        right: 0,
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
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        fontSize: 15,
        fontWeight: "700",
        height: 56,
        borderRadius: 14,
        width: '85%',
    },
});

export default EditContactScreen;

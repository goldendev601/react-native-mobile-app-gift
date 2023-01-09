import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Switch, FlatList, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect } from '../actions/authActions';
import { clearContactUsState, contactUs, getMyProfile } from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
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
    mainContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        marginTop: -24,
        paddingLeft: 30,
        paddingRight: 30
    },
    AboveWrapper: {
        width: '100%',
        height: 120,
        backgroundColor: '#7B61FF',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 50,
        backgroundColor: '#7B61FF',
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
        width: 32,
        backgroundColor: 'transparent'
    },
    textLink: {
    },
    textLinkStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    avatarWrapper: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    iconStyle2: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        right: 0,
    },
    nameInfo: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600'
    },
    mainTitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '400',
        paddingTop: 8,
        textTransform: 'uppercase'
    },
    fieldTitle: {
        fontSize: 14,
        color: '#111',
        textAlign: 'left',
        fontWeight: '600',
        marginTop: 30,
    },
    titleInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        width: '100%',
    },
    fieldInput: {
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 14,
        color: '#111',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    fieldInputMulti: {
        height: 134,
        width: '100%',
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 14,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        color: '#111',
        textAlignVertical: 'top'
    },
    infoLinkContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center',        
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 140,
        paddingLeft: 40,
        paddingRight: 40
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF"
    },
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        fontSize: 15,
        fontWeight: "700",
        height: 50,
        borderRadius: 14,
        width: '100%',
    },
    valueInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        opacity: 0.5,
        marginLeft: 15
    },
    errorMessageWrapper: {
        marginTop: 50,
        width: '100%',
        height: 56,
        backgroundColor: '#E74678',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: 30,
        justifyContent: 'center'
    },
    iconStyle3: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
    errorMessageAlert: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginLeft: 15,
        marginTop: 0
    },
});

interface IContactUsScreenProps {
    navigation: NavigationProp<any>;
}

const ContactUsScreen: React.FC<IContactUsScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const { profileInfo } = useSelector((state: IRootState) => state.auth);
    const { myProfile, isContactUsSuccess } = useSelector((state: IRootState) => state.giftApp)

    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [subject, setSubject] = React.useState('Inquiry');
    const [message, setMessage] = React.useState('');

    const [validationError, setValidationError] = React.useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

    const [errorModalShow, setErrorModalShow] = React.useState(false);

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    const closeErrorModal = () => {
        setErrorModalShow(false);
    };

    useEffect(() => {
        dispatch(getMyProfile())
        dispatch(clearContactUsState())
        setSubject('Inquiry');
    }, [])

    useEffect(() => {
        if (myProfile) {
            setFullName(myProfile.first_name + ' ' + myProfile.last_name);
            setEmail(myProfile.email)
        }
    }, [myProfile])

    const sendMessage = () => {
        if (subject === "") {
            setValidationError(true);
            setErrorModalShow(true);
            setValidationErrorMessage('You should fill event name');
        } else if (message === "") {
            setValidationError(true);
            setErrorModalShow(true);
            setValidationErrorMessage('You should set event date');
        } else {
            dispatch(contactUs(
                subject,
                message
            ));
        }
    };

    useEffect(() => {
        if (isContactUsSuccess) {
            dispatch(handleMessage(true, 'success', 'Message has been sent successfully.'));
            dispatch(clearContactUsState())
            setSubject("");
            setMessage("");
            setErrorModalShow(false);
        }
    }, [isContactUsSuccess])

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
                <View style={styles.AboveWrapper}>
                    <View style={styles.headerWrapper}>
                        <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                            <Icon3 style={styles.textLink} name="arrowleft" size={25} color="#FFF" />
                        </Pressable>
                        <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                            Contact Us
                        </Text>
                        <View style={styles.textLinkWrapper}>
                        </View>
                    </View>
                </View>
                {fontsLoaded && (
                    <>
                        <View style={styles.mainContainer}>
                            {/* <Text style={[styles.fieldTitle, { fontFamily: 'Work-Sans' }]} >
                                Full Name
                            </Text>
                            <View style={styles.fieldWrapper}>
                                <TextInput
                                    style={styles.fieldInput}
                                    value={fullName}
                                    editable = {false}
                                />
                            </View> */}
                            <Text style={[styles.fieldTitle, { fontFamily: 'Work-Sans' }]} >
                                Email
                            </Text>
                            <View style={styles.fieldWrapper}>
                                <TextInput
                                    style={styles.fieldInput}
                                    value={email}
                                    editable = {false}
                                />
                            </View>
                            <Text style={[styles.fieldTitle, { fontFamily: 'Work-Sans' }]} >
                                Subject
                            </Text>
                            <View style={styles.fieldWrapper}>
                                <TextInput
                                    style={styles.fieldInput}
                                    placeholder="Enter your Subject"
                                    onChangeText={(text) => setSubject(text)}
                                    value={subject}
                                />
                            </View>
                            <Text style={[styles.fieldTitle, { fontFamily: 'Work-Sans' }]} >
                                Message
                            </Text>
                            <View style={styles.fieldWrapper}>
                                <TextInput
                                    multiline
                                    style={styles.fieldInputMulti}
                                    placeholder="Enter your Message"
                                    onChangeText={(text) => setMessage(text)}
                                />
                            </View>
                            {validationError && errorModalShow && (
                                <View style={styles.errorMessageWrapper}>
                                    <Icon3 style={styles.iconStyle3} name="warning" size={20} color="#FFF" />
                                    <Text style={[styles.errorMessageAlert, {fontFamily: 'Work-Sans'}]}>
                                        {validationErrorMessage}
                                    </Text>
                                    <Pressable onPress={closeErrorModal} style={styles.iconStyle2}>
                                        <Icon3 name="close" size={15} color="#FFF" />
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    </>
                )}

                <View style={styles.buttonContainer} >
                    <Pressable style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>SEND MESSAGE</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ContactUsScreen;



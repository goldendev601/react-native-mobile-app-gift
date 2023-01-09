import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, SafeAreaView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { authLoginUser, authLoginUserInRegister, sendVerificationCode, setTokenInfo, ValidateUser } from '../actions/authActions';
import { IRootState } from '../reducers';
import { useFonts } from 'expo-font';
import Icon3 from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
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
        marginTop: 30
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        justifyContent: 'flex-start',
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
    fieldWrapper: {
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
        marginLeft: 10
    },
    iconStyle: {
        padding: 10
    },
    iconStyle1: {
        paddingLeft: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
    iconStyle2: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        right: 0,
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
        paddingLeft: 10,
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
        height: 56,
        borderRadius: 14,
        width: "100%",
        marginTop: 40,
    },
    iconImage: {
        width: 30,
        height: 30
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
    textLinkSendCodeWrapper: {
        justifyContent: 'center',
        paddingVertical: 40,
    },
    textLink: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'right'
    },
    textLinkSendCode: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
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
    description: {
        marginTop: 10,
        color: "#111",
        fontSize: 14,
        fontWeight: "normal",
    },
    safeAreaWrapper: {
        padding: 20, 
        minHeight: 300
    },
    fieldRow: {
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: 8,
    },
    cell: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        marginLeft: 8,
        borderRadius: 6,
        backgroundColor: '#F5F5F5',        
    },
    cellError: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        marginLeft: 8,
        borderRadius: 6,
        color: "#E74678",
        backgroundColor: '#F5F5F5',
        borderColor: '#E74678',
        borderStyle: 'solid',
        borderWidth: 1,
        borderTopEndRadius: 12,
        borderBottomStartRadius: 12,
        borderTopStartRadius: 12,
        borderBottomEndRadius: 12
    },
    toggle: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 24,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    textLinkArrow: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: '600',
        fontSize: 25,
    },
    errorMessageWrapper: {
        width: '100%',
        height: 56,
        backgroundColor: '#E74678',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: 30,
        justifyContent: 'center',
        marginTop: 50
    },
    errorMessageAlert: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        justifyContent: 'flex-start',
        marginLeft: 10
    },
});

interface IVerificationScreenProps {
    navigation: NavigationProp<any>;
}

const CELL_COUNT = 5;

const VerificationScreen: React.FC<IVerificationScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;
    const bgColor = useThemeColor({}, 'background');    

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const { email, password } = useSelector((state: IRootState) => state.auth.accountInfo);
    const { isValidated, isValidatedFailed, userInfo } = useSelector((state: IRootState) => state.auth);

    const [enableMask, setEnableMask] = useState(false);
    const [value, setValue] = useState('');

    const [verificationCodeError, setVerificationCodeError] = React.useState(false);
    const [errorModalShow, setErrorModalShow] = React.useState(false);

    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});


    const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const toggleMask = () => setEnableMask((f) => !f);

    const renderCell = ({index, symbol, isFocused}: {index: number, symbol: any, isFocused: boolean}) => {
        let textChild = null;
    
        if (symbol) {
          textChild = enableMask ? '•' : symbol;
        } else if (isFocused) {
          textChild = <Cursor />;
        }
    
        return (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {textChild}
          </Text>
        );
    };

    const renderCellError = ({index, symbol, isFocused}: {index: number, symbol: any, isFocused: boolean}) => {
        let textChild = null;
    
        if (symbol) {
          textChild = enableMask ? '•' : symbol;
        } else if (isFocused) {
          textChild = <Cursor />;
        }
    
        return (
          <Text
            key={index}
            style={[styles.cellError, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {textChild}
          </Text>
        );
    };

    const closeErrorModal = () => {
        setErrorModalShow(false);
    };

    const validateAccount = () => {
        dispatch(ValidateUser(email, value));
    };

    const sendVerification = () => {
        console.log('===========Email=========');
        console.log(email);
        dispatch(sendVerificationCode(email));
    };


    useEffect(() => {
        if (isValidated) {
            console.log(userInfo);
            if (userInfo) {
                dispatch(setTokenInfo(userInfo.access_token, userInfo.user));
                navigation.navigate('HelpScreen')
            }
        } 
    }, [isValidated])

    useEffect(() => {
        if (isValidatedFailed) {
            setVerificationCodeError(true);
            setErrorModalShow(true);
        } else {
            setVerificationCodeError(false);
            setErrorModalShow(false);
        }
    }, [isValidatedFailed])

    // useEffect(() => {
    //     if (isValidated) {
    //         if (email.length > 0 && password.length > 0) {
    //             dispatch(authLoginUserInRegister(email, password));
    //         }
    //         // navigation.navigate('HelpScreen')
    //     }
    // }, [isValidated])

    // useEffect(() => {
    //     if (isAuthenticatedInRegister) {
    //         navigation.navigate('HelpScreen')
    //     }
    // }, [isAuthenticatedInRegister])

    const goBack = () => {
        navigation.goBack();
    };

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
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon2 style={styles.textLinkArrow} name="arrow-back" />
                    </Pressable>
                    {/* <Pressable style={styles.textLinkWrapper} onPress={gotoLogin}>
                        <Text style={styles.textLink}>LOGIN</Text>
                    </Pressable> */}
                </View>
                <View style={styles.container}>
                    
                    <View style={styles.titleWrapper}>
                        <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Please enter</Text>
                        <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>verification code</Text>
                        <Text style={[styles.description, {fontFamily: 'Work-Sans-regular'}]}>
                            5-digit verification code has been sent to {email}. Please check your inbox and spam folder as well.
                        </Text>
                    </View>

                    <SafeAreaView style={styles.safeAreaWrapper}>
                        <View style={styles.fieldRow}>
                            {
                                verificationCodeError ? (
                                    <CodeField
                                        ref={ref}
                                        {...cellOnLayout}
                                        value={value}
                                        onChangeText={setValue}
                                        cellCount={CELL_COUNT}
                                        keyboardType="number-pad"
                                        textContentType="oneTimeCode"
                                        renderCell={renderCellError}
                                    />
                                ) : (
                                    <CodeField
                                        ref={ref}
                                        {...cellOnLayout}
                                        value={value}
                                        onChangeText={setValue}
                                        cellCount={CELL_COUNT}
                                        keyboardType="number-pad"
                                        textContentType="oneTimeCode"
                                        renderCell={renderCell}
                                    />
                                )
                            }
                        </View>
                        <Pressable style={styles.textLinkSendCodeWrapper} onPress={sendVerification}>
                            <Text style={styles.textLinkSendCode}>SEND THE CODE AGAIN (60S)</Text>
                        </Pressable>
                    </SafeAreaView>

                    {verificationCodeError && errorModalShow && (
                        <View style={styles.errorMessageWrapper}>
                            <Icon3 style={styles.iconStyle1} name="warning" size={20} color="#FFF" />
                            <Text style={[styles.errorMessageAlert, {fontFamily: 'Work-Sans'}]}>
                                INVALID CODE. PLEASE TRY AGAIN
                            </Text>
                            <Pressable onPress={closeErrorModal} style={styles.iconStyle2}>
                            <Icon3 name="close" size={15} color="#FFF" />
                            </Pressable>
                        </View>
                    )}

                    <Pressable style={styles.signupButton} onPress={validateAccount}>
                        <Text style={[styles.signupButtonText, {fontFamily: 'Work-Sans'}]}>Activate account</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>

        
    );
};

export default VerificationScreen;

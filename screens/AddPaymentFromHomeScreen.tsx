import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { addPaymentMethods, clearPaymentMethodState, generateToken, getMyProfile } from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { CreditCardInput } from "react-native-vertical-input-credit-card";
import { ScrollView } from 'react-native-gesture-handler';
import { IRootState } from '../reducers';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    mainScrollContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        marginTop: -24,
    },
    AboveWrapper: {
        width: '100%',
        height: 100,
        backgroundColor: '#7B61FF',
    },
    mainHeaderContainer: {
        width: '100%',
        height: 150,
        paddingLeft: 40,
        paddingRight: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 39
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
    },
    successMessageAlert: {
        fontSize: 10,
        color: '#7B61FF',
        fontStyle: 'italic',
        paddingTop: 4,
        paddingBottom: 4,
        textAlign: 'center'
    },
    textLinkStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    mainTitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 8,
        textTransform: 'uppercase',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 20,
        backgroundColor: 'transparent'
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
        width: 250,
    },
    cardBtn: {
        backgroundColor: 'rgba(123, 97, 255, 0.12)',
        borderRadius: 10,
        height: 98,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#7B61FF'
    },
    bankBtn: {
        backgroundColor: 'rgba(123, 97, 255, 0.12)',
        borderRadius: 10,
        height: 98,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        opacity: 0.6
    },
    iconImage: {
        width: 38,
        height: 38
    },
    cardButtonTitleInfo: {
        fontSize: 14,
        color: '#7B61FF',
        fontWeight: '600',
        lineHeight: 24
    },
    bankButtonTitleInfo: {
        fontSize: 14,
        color: '#7B61FF',
        fontWeight: '600',
        lineHeight: 24
    },
    flex: {
        flex: 1,
    },
});

interface IAddPaymentFromHomeScreenProps {
    navigation: NavigationProp<any>;
}

const AddPaymentFromHomeScreen: React.FC<IAddPaymentFromHomeScreenProps> = (props) => {
    const dispatch = useDispatch();
    
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
        'Courier': require('../assets/fonts/CourierPrime-Regular.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const { paymentToken, isPaymentTokenGeneratedSuccess, isAddingPaymentMethodSuccess } = useSelector((state: IRootState) => state.giftApp)

    const [cardNumber, setCardNumber] = React.useState('');
    const [expMonth, setExpMonth] = React.useState('');
    const [expYear, setExpYear] = React.useState('');
    const [cvc, setCVC] = React.useState('');

    const [validationSuccessMessage, setValidationSuccessMessage] = React.useState('');

    const goBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        dispatch(clearPaymentMethodState());
    }, [])

    const setCardValues = (cardInfo: any) => {
        const cardValues = cardInfo.values;
        const expiryInfo = cardValues.expiry;
        const expMonthInfo = expiryInfo.split('/')[0];
        const expYearInfo = '20' + expiryInfo.split('/')[1];
        if (cardInfo.valid) {
            setExpMonth(expMonthInfo);
            setExpYear(expYearInfo);
            setCVC(cardValues.cvc);
            setCardNumber(cardValues.number.replaceAll(' ', ''));
        } 
    };

    const save = () => {
        dispatch(generateToken(cardNumber, expMonth, expYear, cvc));
    };

    useEffect(() => {
        if (isAddingPaymentMethodSuccess) {
            setValidationSuccessMessage('The new payment method has been created successfully.')
            setCardNumber('');
            setExpMonth('');
            setExpYear('');
            setCVC('');
            dispatch(clearPaymentMethodState())
            navigation.navigate('SelectPaymentMethodFromHomeScreen');
        }
    }, [isAddingPaymentMethodSuccess])

    useEffect(() => {
        if (isPaymentTokenGeneratedSuccess) {
            console.log('===isPaymentTokenGeneratedSuccess====');
            console.log(isPaymentTokenGeneratedSuccess);
            dispatch(addPaymentMethods(paymentToken));
        }
    }, [isPaymentTokenGeneratedSuccess])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.flex}
        >
            <View
                style={[styles.scrollContainer, { backgroundColor: bgColor }]}
            >
                <View style={styles.AboveWrapper}>
                    <View style={styles.headerWrapper}>
                        <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                            <Icon3 name="arrowleft" size={25} color="#FFF" />
                        </Pressable>
                        <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                            Add Payment method
                        </Text>
                        <Pressable style={styles.textLinkWrapper}>
                        </Pressable>
                    </View>
                </View>
                <ScrollView style={styles.mainScrollContainer}>
                    <View style={styles.mainHeaderContainer}>
                        <View style={styles.cardBtn}>
                            <Image
                                source={require("../assets/images/cardIcon.png")}
                                style={styles.iconImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.cardButtonTitleInfo}>
                                Credit/Debit Card
                            </Text>
                        </View>
                    </View>
                    {fontsLoaded && (
                        <View style={styles.mainContainer}>
                            <CreditCardInput onChange={setCardValues}/>
                        </View>
                    )}
                </ScrollView>

                {isAddingPaymentMethodSuccess && paymentToken !== '' && (
                    <Text style={styles.successMessageAlert}>
                        {validationSuccessMessage}
                    </Text>
                )}

                {
                    !isPaymentTokenGeneratedSuccess && (
                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.sendButton} onPress={save}>
                                <Text style={styles.sendButtonText}>Save</Text>
                            </Pressable>
                        </View>
                    )
                }
            
            </View>
        </KeyboardAvoidingView>
    );
};

export default AddPaymentFromHomeScreen;



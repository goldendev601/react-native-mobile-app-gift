import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { clearPaymentMethodState, deletePaymentMethod, setStripeTokenId } from '../actions/giftAppAction';
import { handleMessage } from '../actions/commonAction';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        height: '60%',
        marginTop: -24,
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
    infoLinkContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 0.5,
        borderStyle: 'solid'
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    titleInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
    },
    valueInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'left',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 5,
        paddingLeft: 15,
        opacity: 0.5
    },
    messageInfo: {
        color: '#000',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400'
    },
    messageContainer: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 20
    }
});

interface IPaymentMethodDetailScreenProps {
    navigation: NavigationProp<any>;
}

const PaymentMethodDetailScreen: React.FC<IPaymentMethodDetailScreenProps> = (props) => {
    const dispatch = useDispatch();
    
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    const { selectedPaymentMethod, isDeletePaymentMethodSuccess } = useSelector((state: IRootState) => state.giftApp)

    const removePaymentMethod = () => {
        props.navigation.navigate('DeletePaymentMethodScreen');       
    };

    // const removePaymentMethod = () => {
    //     dispatch(deletePaymentMethod(selectedPaymentMethod.stripe_token_id))        
    // };

    const gotoVerifyBank = () => {
        console.log(selectedPaymentMethod.stripe_token_id);
        dispatch(setStripeTokenId(selectedPaymentMethod.stripe_token_id));
        props.navigation.navigate('PaymentBankVerificationScreen');  
    };

    // useEffect(() => {
    //     console.log(isDeletePaymentMethodSuccess);
    //     if (isDeletePaymentMethodSuccess) {
    //         dispatch(clearPaymentMethodState())
    //         dispatch(handleMessage(true, 'success', 'Payment method successfully deleted'));
    //         navigation.navigate('PaymentMethod');
    //     }
    // }, [isDeletePaymentMethodSuccess])


    return (
        <View
            style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 name="arrowleft" size={25} color="#FFF" />
                    </Pressable>
                    {
                        selectedPaymentMethod.type === 'card' ? (
                            <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                                CREDIT/DEBIT CARD
                            </Text>
                        ) : (
                            <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                                BANK
                            </Text>
                        )
                    }
                    
                    <Pressable style={styles.textLinkWrapper} onPress={removePaymentMethod}>
                        <Icon2 name="trash-2" size={25} color="#FFF" />
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <View style={styles.mainContainer}>
                    
                    {
                        selectedPaymentMethod.type === 'card' && (
                            <>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Credit card information
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        **** **** **** {selectedPaymentMethod.last4}
                                    </Text>
                                </View>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Brand
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        {selectedPaymentMethod.brand}
                                    </Text>
                                </View>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Country
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        {selectedPaymentMethod.country}
                                    </Text>
                                </View>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Expiration Year
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        {selectedPaymentMethod.exp_year}
                                    </Text>
                                </View>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Expiration Month
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        {selectedPaymentMethod.exp_month}
                                    </Text>
                                </View>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Funding
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        {selectedPaymentMethod.funding}
                                    </Text>
                                </View>
                            </>
                        )
                    }

                    {
                        selectedPaymentMethod.type === 'bank' && (
                            <>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Account number
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        **** **** **** {selectedPaymentMethod.last4}
                                    </Text>
                                </View>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Bank number
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        {selectedPaymentMethod.bank_name}
                                    </Text>
                                </View>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Account type
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        {selectedPaymentMethod.account_holder_type}
                                    </Text>
                                </View>
                                <View style={styles.infoLinkContainer}>
                                    <View style={styles.infoWrapper}>
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Status
                                        </Text>
                                    </View>
                                    <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                        {selectedPaymentMethod.status}
                                    </Text>
                                </View>
                            </>
                        )
                    }
                    
                </View>
            )}
            {
                selectedPaymentMethod.type === 'bank' && !selectedPaymentMethod.is_verified && (
                    <>
                        <View style={styles.messageContainer}>
                            <Text style={[styles.messageInfo, { fontFamily: 'Work-Sans' }]} >
                                You have not verified this account yet. Before you can use this payment method for your transactions, you need to verify this account first.
                            </Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.sendButton} onPress={gotoVerifyBank}>
                                <Text style={styles.sendButtonText}>Verify Account</Text>
                            </Pressable>
                        </View>
                    </>
                )
            }
            
        </View>
    );
};

export default PaymentMethodDetailScreen;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { clearPaymentMethodState, getPaymentMethods, selectPaymentMethod, transactionSendSuccess, transactionsSend } from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 120,
        maxHeight: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    mainContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 20,
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
    },
    headerContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitleContainer: {
        width: 220,
        height: 30,
        textAlign: 'center',
        paddingTop: 3,
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
    headerTitle: {
        color: '#7B61FF',
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 25
    },
    subTitle: {
        marginTop: 30,
        fontSize: 14,
        color: '#111',
        fontWeight: '700',
    },
    descriptionInfo: {
        marginTop: 30,
        fontSize: 14,
        color: '#111',
        fontWeight: '400',
    },
    infoLinkContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderBottomColor: '#D8D8D8',
    },
    titleInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'left',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
        paddingLeft: 12
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
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    iconImage: {
        width: 35,
        height: 24,
        textAlign: 'left',
        alignItems: 'center',
        marginTop: 5,
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: [{
            translateX: -180
        }],
        margin: 0,
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
});

interface IFinalPaymentScreenProps {
    navigation: NavigationProp<any>;
}

const FinalPaymentScreen: React.FC<IFinalPaymentScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const { selectedPaymentMethod, giftInfo, newGiftId, isTransactionSendSuccess } = useSelector((state: IRootState) => state.giftApp)

    const closeModal = () => {
        props.navigation.goBack();
    };

    useEffect(() => {
        dispatch(clearPaymentMethodState());
        dispatch(getPaymentMethods())
    }, [])


    const goThanksScreen = () => {
        
        if (newGiftId && selectedPaymentMethod) {
            dispatch(
                transactionsSend(
                    newGiftId, 
                    selectedPaymentMethod.stripe_token_id, 
                )
            );
        }
        console.log(isTransactionSendSuccess);
        props.navigation.navigate('ThanksScreen');
    };


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <Pressable onPress={closeModal}>
                    <Image
                        source={require("../assets/images/close.png")}
                        style={styles.iconImage}
                        resizeMode="cover"
                    />
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>VISA {selectedPaymentMethod.last4}</Text>
                </View>
            </View>
            {fontsLoaded && (
                <View style={styles.mainContainer}>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Gift Id
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            {newGiftId}
                        </Text>
                    </View>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Amount
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            ${giftInfo.amount}
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
                </View>
            )}
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={goThanksScreen}>
                    <Text style={styles.sendButtonText}>Pay now</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default FinalPaymentScreen;



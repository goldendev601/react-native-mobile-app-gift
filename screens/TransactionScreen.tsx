import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { clearPaymentMethodState, getPaymentMethods, selectPaymentMethod } from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { IRootState, PaymentMethod } from '../reducers';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    mainContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        marginTop: -24,
        paddingLeft: 30,
        paddingRight: 30,
        maxHeight: "80%"
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
    }
});

interface ITransactionScreenProps {
    navigation: NavigationProp<any>;
}

const TransactionScreen: React.FC<ITransactionScreenProps> = (props) => {
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

    const goPaymentMethodDetailScreen = (paymentMethod: PaymentMethod) => {
        dispatch(selectPaymentMethod(paymentMethod))
        navigation.navigate('FinalPaymentScreen');
    };

    useEffect(() => {
        dispatch(clearPaymentMethodState());
        dispatch(getPaymentMethods())
    }, [])

    const { paymentMethodList } = useSelector((state: IRootState) => state.giftApp)

    return (
        <View
            style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 name="arrowleft" size={25} color="#FFF" />
                    </Pressable>
                    <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                        Payment Method
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <View style={styles.mainContainer}>
                    <ScrollView>
                        {
                            paymentMethodList.length === 0 ? (
                                <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    There is no payment method in your account. You can create a new payment method by clicking + button.
                                </Text>
                            ) : (
                                paymentMethodList.map((paymentMethod, index) => {
                                    return (
                                        <Pressable style={styles.infoLinkContainer} key={index} onPress={() => goPaymentMethodDetailScreen(paymentMethod)}>
                                            <View style={styles.infoWrapper}>
                                                {
                                                    paymentMethod.brand == 'visa' && (
                                                        <Image
                                                            source={require("../assets/images/Visa.png")}
                                                            style={styles.iconImage}
                                                            resizeMode="contain"
                                                        />
                                                    )
                                                }
                                                {
                                                    paymentMethod.brand == 'MasterCard' && (
                                                        <Image
                                                            source={require("../assets/images/Mastercard.png")}
                                                            style={styles.iconImage}
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
                                            <Icon3 name="right" size={20} color="#0D1C2E" />
                                        </Pressable>
                                    )
                                })
                            )
                        }                        
                    </ScrollView>
                    <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                        Open Settings for more options (like sounds) or to disable notifications altogether.
                    </Text>
                </View>
            )}

        </View>
    );
};

export default TransactionScreen;



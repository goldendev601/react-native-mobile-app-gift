import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput, Modal } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { Contact, IRootState, PaymentMethod } from '../reducers';
import { clearPaymentMethodState, getPaymentMethods, selectPaymentMethod, setGiftInfo } from '../actions/giftAppAction';
import { useFonts } from 'expo-font';

interface ISendMoneyScreenProps {
    navigation: NavigationProp<any>;
}

const SendMoneyScreen: React.FC<ISendMoneyScreenProps> = (props) => {

    const dispatch = useDispatch();

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const { id } = useSelector((state: IRootState) => state.giftApp.giftInfo.gift_contact);
    const { contactList, paymentMethodList, isPaymentMethodLoading } = useSelector((state: IRootState) => state.giftApp);

    const [selectedContact, setSelectedContact] = React.useState<Contact>()

    const closeModal = () => {
        props.navigation.goBack();
    };

    const [price, setPrice] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [paymentModalVisible, setPaymentModalVisible] = React.useState(false);


    React.useEffect(() => {
        dispatch(clearPaymentMethodState());
        dispatch(getPaymentMethods());
      }, []);

    const gotoSelectCardTypeScreen = () => {
        dispatch(setGiftInfo({
            amount: parseInt(price),
        }));
        props.navigation.navigate('SelectCardTypeScreen');
    };

    const sengotoPaymentMethodSettingdGift = (modalVisible: Boolean) => {
        props.navigation.navigate('ProfileScreen', { screen: 'AddPayment' });
        setModalVisible(!modalVisible);
    };

    const addNewPaymentMethod = (paymentModalVisible: Boolean) => {
        props.navigation.navigate('ProfileScreen', { screen: 'AddPayment' });
        setPaymentModalVisible(!paymentModalVisible);
    };

    React.useEffect(() => {
        if (id && contactList) {
            setSelectedContact(contactList.find((contact) => contact.id === id))
        }
    }, [id, contactList])

    React.useEffect(() => {
        if (!isPaymentMethodLoading && paymentMethodList.length === 0) {
          setModalVisible(true);
          setPaymentModalVisible(false);
        } else {
          setModalVisible(false);
          setPaymentModalVisible(true);
        }
    }, [paymentMethodList, isPaymentMethodLoading]);

    const selectPaymentMethodHandle = (paymentMethod: PaymentMethod) => {
        dispatch(selectPaymentMethod(paymentMethod))
        setPaymentModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
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
                            onPress={() => sengotoPaymentMethodSettingdGift(modalVisible)}
                        >
                            <View style={styles.modalButtonContainer}>
                                <Text style={styles.buttonTitleInfo}>
                                    Continue
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={paymentModalVisible}
                onRequestClose={() => {
                    setPaymentModalVisible(!paymentModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalTitle, {fontFamily: 'Work-Sans'}]}>Select Payment Method</Text>
                        {
                            fontsLoaded && paymentMethodList && paymentMethodList.length > 0 && paymentMethodList.map((paymentMethod, index) => {
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
                                        <Icon3 name="right" size={20} color="#7B61FF" />
                                    </Pressable>
                                )
                            })
                        }
                        <Pressable
                            onPress={() => addNewPaymentMethod(paymentModalVisible)}
                        >
                            <View style={styles.modalButtonContainer1}>
                                <Text style={styles.buttonTitleInfo1}>
                                    Add new payment method
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View
                style={
                    (modalVisible || paymentModalVisible) ? styles.ContainerWrapperBlurry : styles.ContainerWrapper
                }
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
                        <Text style={styles.headerTitle}>SEND MONEY TO</Text>
                    </View>
                </View>
                <View style={styles.emailContainer} >
                    <Text style={styles.emailInfo}>{selectedContact?.email}</Text>
                </View>
                <View style={styles.priceContainer} >
                    <Text style={styles.symbol}>$</Text>
                    <TextInput
                        style={styles.priceInput}
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                        keyboardType="numeric"
                        autoCompleteType="off"
                        autoFocus
                    />
                </View>

                {
                    price != '0' && (
                        <View style={styles.buttonContainer} >
                            <Pressable style={styles.sendButton} onPress={gotoSelectCardTypeScreen}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </Pressable>
                        </View>
                    )
                }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        height: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerTitleContainer: {
        width: 210,
        height: 30,
        textAlign: 'center',
        paddingTop: 3
    },
    emailContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center'
    },
    balanceContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center'
    },
    emailInfo: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111111',
        marginTop: 30,
    },
    modalText: {
        color: 'rgba(17, 17, 17, 0.4)',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalTitle: {
        color: '#111',
        fontSize: 24,
        lineHeight: 40,
        fontWeight: '600',
        marginBottom: 15,
        textAlign: 'center',
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
    modalButtonContainer1: {
        marginTop: 5,
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
    balanceInfo: {
        fontSize: 14,
        color: 'rgba(17, 17, 17, 0.4)',
        marginTop: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row'
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
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    priceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 100
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    ContainerWrapperBlurry: {
        height: 120,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        opacity: 0.3,
    },
    ContainerWrapper: {
        width: '100%',
    },
    headerTitle: {
        color: '#7B61FF',
        fontSize: 16,
        fontWeight: '600'
    },
    movementListContainer: {
        width: '100%',
        paddingTop: 20
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 100
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
    buttonTitleInfo: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    buttonTitleInfo1: {
        fontSize: 14,
        color: '#7B61FF',
        fontWeight: '600',
        textTransform: 'uppercase'
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
    newContactContainer: {
        width: '50%',
        paddingRight: 10
    },
    newContactButton: {
        backgroundColor: 'rgba(123, 97, 255, 0.3)',
        borderRadius: 10,
        height: 90,
        flexDirection: 'row',
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
        height: 300,
        width: '100%',
        overflow: "hidden"
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
    iconImage1: {
        width: 70,
        height: 48
    },
    iconImage: {
        width: 30,
        height: 38
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
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
    priceInput: {
        backgroundColor: '#fff',
        fontSize: 70,
        color: '#111',
        height: 70,
        textAlign: 'center'
    },
    symbol: {
        fontSize: 36,
        color: '#111',

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
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF"
    },
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        padding: 16,
        fontSize: 15,
        fontWeight: "700",
        height: 50,
        borderRadius: 14,
        width: "85%",
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
    priceInfoContainer: {
        marginLeft: 'auto'
    },
    priceInfo: {
        fontSize: 18,
        color: '#111'
    }

});

export default SendMoneyScreen;

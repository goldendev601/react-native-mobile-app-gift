import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, Modal, ScrollView } from 'react-native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { addThankyouToContract, clearThanksNoteState, getTransactionDetail } from '../actions/giftAppAction';

const TransactionDetailModal = ({
    transactionId,
    visible,
    sendThanksNote,
    onHide
}: {
    transactionId: number,
    visible: boolean,
    sendThanksNote: () => void,
    onHide: () => void
}) => {

    const dispatch = useDispatch();

    const { transactionDetail, isAddThankyouSuccess1, selectedPaymentMethod } = useSelector((state: IRootState) => state.giftApp)

    const closeModal = () => {
        onHide()
    };

    React.useEffect(() => {
        dispatch(clearThanksNoteState());
    }, [])

    const gotoAddThankyouNoteScreen = () => {
        closeModal();
        sendThanksNote();
    };

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Merriweather': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
        'Waterfall': require('../assets/fonts/Waterfall-Regular.ttf'),
        'Cormorant': require('../assets/fonts/Cormorant-Bold.ttf'),
        'Playfair': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
        'Lato': require('../assets/fonts/Lato-Black.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf')
    });

    return (
        <Modal 
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer} >
                    <Pressable onPress={closeModal} style={styles.textLinkWrapper}>
                        <Image
                            source={require("../assets/images/close.png")}
                            style={styles.iconImage}
                            resizeMode="cover"
                        />
                    </Pressable>
                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.headerTitle, { fontFamily: 'Work-Sans' }]}>Transaction Detail</Text>
                    </View>
                    <View style={styles.textLinkWrapper}>
                    </View>
                </View>
                {
                    fontsLoaded && transactionDetail && transactionDetail.id > 0 && (
                        <>
                            {
                                transactionDetail.flagged_total_amount < 0 ? (
                                    <>
                                        <View style={styles.topBlockContainer}>
                                            <View style={styles.leftBlockContainer}>
                                                <Image
                                                    source={{
                                                        uri: transactionDetail.gift_picture,
                                                    }}
                                                    style={styles.giftIconImage}
                                                    resizeMode="cover"
                                                />
                                                <View style={styles.textBlockContainer}>
                                                    <Text style={[styles.categoryInfo, {fontFamily: 'Work-Sans'}]}>
                                                        {transactionDetail.gift_category}
                                                    </Text>
                                                    <View style={styles.textSenderContainer}>
                                                        <Text style={[styles.categoryInfo, {fontFamily: 'Work-Sans'}]}>
                                                            To:
                                                        </Text>
                                                        <Text style={[styles.receiverInfo]}>
                                                            {transactionDetail.receiver}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <Text style={[styles.priceInfoNeg, {marginLeft: 'auto'}]}>
                                                -${transactionDetail.total_amount}
                                            </Text>
                                        </View>
                                        <View style={styles.imageBlockContainer1}>
                                            <View style={styles.imageContentContainer}>
                                                <Image
                                                    source={{
                                                        uri: transactionDetail.gift_picture,
                                                    }}
                                                    style={styles.giftImage}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                            <View style={styles.TextContentContainer1}>
                                                <Text style={styles.description}>
                                                    {transactionDetail.message}
                                                </Text>
                                                <Text style={[styles.priceInfo1, {fontFamily: transactionDetail.gift_primary_font.description }]}>
                                                    ${transactionDetail.amount}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.subTotalContainer}>
                                            <Text style={styles.title}>Subtotal</Text>
                                            <Text style={styles.value}>${transactionDetail.amount}</Text>
                                        </View>
                                        <View style={styles.feeContainer}>
                                            <Text style={styles.title}>Transaction Fee</Text>
                                            <Text style={styles.value}>${transactionDetail.transaction_fee}</Text>
                                        </View>
                                        <View style={styles.feeContainer}>
                                            <Text style={styles.title}>Card Fee</Text>
                                            <Text style={styles.value}>${transactionDetail.card_fee}</Text>
                                        </View>
                                        <View style={styles.totalContainer}>
                                            <Text style={styles.boldTextInfo}>Total</Text>
                                            {
                                                transactionDetail.total_amount > 0 ? (
                                                    <Text style={[styles.priceInfoNeg, {marginLeft: 'auto'}]}>-${transactionDetail.total_amount}</Text>
                                                ) : (
                                                    <Text style={[styles.priceInfoNeg, {marginLeft: 'auto'}]}>-${transactionDetail.total_amount}</Text>
                                                )
                                            }
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.imageBlockContainer}>
                                            <View style={styles.giftImageContainer}>
                                                <Image
                                                    source={{
                                                        uri: transactionDetail.gift_picture,
                                                    }}
                                                    style={styles.giftImage}
                                                    resizeMode="contain"
                                                />
                                            </View>
                                            <View style={styles.giftTextContentContainer}>
                                                <Text style={[styles.description, { fontFamily: 'Work-Sans' }]}>
                                                    {transactionDetail.sender} sent you a present of
                                                </Text>
                                                <View style={styles.giftPriceContainer}>
                                                    <Text style={[styles.giftPriceInfo, {fontFamily: 'Work-Sans' }]}>
                                                        ${transactionDetail.amount}
                                                    </Text>
                                                    {
                                                        transactionDetail.gift_status_id === 6 ? (
                                                            <View style={styles.giftStatusContainer1}>
                                                                <Text style={[styles.giftStatusInfo, {fontFamily: 'Work-Sans' }]}>
                                                                    Pending payment confirmation
                                                                </Text>
                                                            </View>
                                                        ) : (
                                                            <View style={styles.giftStatusContainer}>
                                                                <Text style={[styles.giftStatusInfo, {fontFamily: 'Work-Sans' }]}>
                                                                    Paid to account
                                                                </Text>
                                                            </View>
                                                        )
                                                    }
                                                    
                                                </View>
                                            </View>
                                        </View>
                                        {
                                            transactionDetail && transactionDetail.sender_contact_id && (
                                                <View style={styles.buttonContainer} >
                                                    <Pressable style={styles.sendButton} onPress={gotoAddThankyouNoteScreen}>
                                                        <Text style={[styles.sendButtonText, {fontFamily: 'Work-Sans'}]}>Send Thank you Note</Text>
                                                    </Pressable>
                                                </View>
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                }
                
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    topBlockContainer: {
        width: '100%',
        height: 90,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#D8D8D8',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textSenderContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    receiverInfo: {
        color: '#111',
        fontSize: 14,
        fontWeight: '400',
        opacity: 0.5,
        marginTop: 15,
        marginLeft: 5
    },
    textBlockContainer: {
        marginLeft: 20
    },
    giftIconImage: {
        width: 70,
        height: 70
    },
    leftBlockContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    categoryInfo: {
        color: '#111',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 15
    },
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 180,
        maxHeight: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 20,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 3, height: 3},
        shadowRadius: 3,
    },
    headerTitleContainer: {
        height: 30,
        textAlign: 'center',
        paddingTop: 3,
    },
    messageContentContainer: {        
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30  
    },
    imageBlockContainer: {        
        width: '100%',
        marginTop: 24,  
        padding: 30
    },
    imageBlockContainer1: {        
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10 ,
        marginTop: 24               
    },
    BlockContainer: {        
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 24,    
        height: 90,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 3, height: 3},
        shadowRadius: 3,
        elevation: 3,
    },
    subTotalContainer: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    feeContainer: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    priceInfo1: {
        fontSize: 60,
        textAlign: 'center'
    },
    contactInfoText: {
        color: '#111111',
        fontSize: 34,   
        textAlign: 'center'     
    },
    totalContainer: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50
    },
    textLinkWrapper: {
        justifyContent: 'center',
        width: 32,
        backgroundColor: 'transparent'
    },
    giftImage: {
        width: '100%', 
        height: 350
    },
    title: {
        color: '#111111',
        fontSize: 14,
        fontWeight: '500',
        opacity: 0.5
    },
    value: {
        color: '#111111',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 'auto'
    },
    priceInfo: {
        fontSize: 20,
        fontFamily: 'WorkSans-Medium',
        color: '#111111',
        fontWeight: '600',
        marginLeft: 'auto'
    },
    priceInfoNeg: {
        fontSize: 20,
        fontFamily: 'WorkSans-Medium',
        color: '#FF6C6C',
        fontWeight: '600',
        marginLeft: 'auto'
    },
    TextContentContainer1: {
        width: '100%',
        backgroundColor: '#FFF',
        padding: 15,
    },
    giftPriceInfo: {
        fontSize: 32,
        lineHeight: 70,
        textAlign: 'center',
        color: '#111111',
        fontWeight: '600'
    },
    giftStatusInfo: {
        fontSize: 12,
        lineHeight: 14,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '500'
    },
    imageText: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: 'normal',
        marginTop: -90,
        textAlign: 'center',
        fontFamily: 'Italianno-Regular',
    },
    giftImageText: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: 'normal',
        marginTop: -90,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    italicText: {
        color: '#111111',
        fontSize: 34,   
        fontFamily: 'Italianno-Regular',
        textAlign: 'center'     
    },
    description: {
        color: '#111111',
        fontSize: 14,   
        lineHeight: 70,
        textAlign: 'center',
        fontWeight: '600'     
    },
    imageContentContainer: {
        width: '100%',
        height: 190,
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    giftImageContainer: {
        width: '100%',
    },
    textContentContainer: {
        padding: 15
    },
    giftTextContentContainer: {
        width: '100%',
        padding: 15,
    },
    giftPriceContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    giftStatusContainer: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#219653',
        borderRadius: 4,
        width: 109,
        height: 22,
        marginLeft: 12
    },
    giftStatusContainer1: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#F2994A',
        borderRadius: 4,
        height: 22,
        marginLeft: 12
    },
    boldTextInfo: {
        fontSize: 14,
        color: '#111',
        fontWeight: '500'
    },
    contactTextInfo: {
        fontSize: 14,
        color: '#111',
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    normalTextInfo: {
        fontSize: 12,
        color: '#111',
        fontWeight: '400'
    },
    headerContainer: {
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
        textTransform: 'uppercase'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
       
    },
    image: {
        width: '100%',
        height: 70,   
    },
    TextContentContainer: {
        width: '100%',
        height: 380,
        backgroundColor: '#E7EAD9',
        padding: 15,
    },
    iconImage: {
        width: 30,
        height: 30
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
});

export default TransactionDetailModal;

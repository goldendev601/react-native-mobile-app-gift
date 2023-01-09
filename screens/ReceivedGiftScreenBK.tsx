import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, TouchableOpacity, Image } from 'react-native';
import { getGiftsReceived, getTransactions } from '../actions/giftAppAction';
import Icon2 from 'react-native-vector-icons/Feather';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { IRootState } from '../reducers';

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 0,
        width: "100%",
        flexDirection: 'column'
    },
    textContainer: {
        width: '85%',
        textAlign: 'left'
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 80
    },
    movementListContainer: {
        width: '100%',
        paddingTop: 20
    },
    headerContent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'transparent'
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
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden"
    },
    eventsContainer: {
        width: '100%',
        overflow: "hidden"
    },
    movementsContainer: {
        width: '100%',
        overflow: "hidden"
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
        fontSize: 14,
        color: '#111111',
        paddingLeft: 20,
        paddingRight: 20
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
        paddingLeft: 40,
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
        fontWeight: 'bold',
        fontSize: 20,
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
    eventImageContainer: {
        height: 280,
        overflow: 'hidden'
    },
    eventInfoContainer: {
        height: 70,
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
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
    emailInfo: {
        fontSize: 12,
        color: '#111',
        opacity: 0.5
    },
    priceInfoContainer: {
        marginLeft: 'auto'
    },
    priceInfo: {
        fontSize: 18,
        color: '#111'
    },
    moreBtn: {
        color: '#0D1C2E',
    },
    blankInfoContainer: {
        height: 400,
        width: '100%',
        paddingLeft: 36,
        paddingRight: 36,
        display: 'flex',
        paddingTop: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notificationInfo: {
        fontSize: 14,
        color: 'rgba(17, 17, 17, 0.4)',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blankContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6E6E633',
        width: '100%',
        height: '100%',
        marginTop: -60
    },
    blankButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 188,
        height: 37,
        backgroundColor: 'transparent',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#7B61FF',
        borderStyle: 'solid',
        marginTop: 25
    },
    blankWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        width: '100%'
    },
    blankText: {
        color: '#111',
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.4
    },
    blankBtnText: {
        color: '#7B61FF',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 30
    },
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden'
    },
});

interface IReceivedGiftScreenBKProps {
    navigation: NavigationProp<any>;
}

const ReceivedGiftScreenBK: React.FC<IReceivedGiftScreenBKProps> = (props) => {
    const dispatch = useDispatch();

    const bgColor = useThemeColor({}, 'background');

    useEffect(() => {
        dispatch(getTransactions())
    }, [])

    const sendGift = () => {
        props.navigation.navigate('AddEventScreen');
    };

    const { transactionList } = useSelector((state: IRootState) => state.giftApp)

    return (
        <View
            style={styles.scrollContainer}

        >
            <View style={styles.headerWrapper}>
                <Text style={styles.textLink}>All transactions</Text>
                <Pressable style={styles.textLinkWrapper}>
                    {/* <Icon1 style={styles.textLink} name="pluscircleo" size={20} color="#000" /> */}
                </Pressable>
            </View>
            {
                transactionList.length > 0 ? (
                    <View style={styles.mainContainer}>
                        <View
                            style={styles.movementsContainer}
                        >
                            <View style={styles.movementListContainer}>
                                {transactionList.map((transaction, index) => {
                                    return (
                                        <View style={styles.eventInfoContainer}>
                                            <View style={styles.nameInfoContainer}>
                                                <Image
                                                    source={{
                                                        uri: 'https://givegiftd.s3.us-east-1.amazonaws.com/default/profile_picture.png',
                                                    }}
                                                    style={styles.profileImage}
                                                />
                                            </View>
                                            <View style={styles.fullNameInfoContainer}>
                                                <Text style={styles.fullNameInfo}>
                                                    {transaction.colleague_name}
                                                </Text>
                                                <Text style={styles.emailInfo}>
                                                    {transaction.colleague_email}
                                                </Text>
                                            </View>
                                            <View style={styles.priceInfoContainer}>
                                                <Text style={styles.priceInfo}>
                                                    {/* <Icon2 style={styles.moreBtn} name="more-vertical" size={20} color="#000" /> */}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.blankWrapper}>
                        <View style={styles.blankContainer}>
                            <Text style={styles.blankText}>
                                All your transactions will show here.
                            </Text>
                            <Text style={styles.blankText}>
                                Send your first gift to a loved one or a friend.
                            </Text>
                            <Pressable onPress={sendGift}>
                                <View style={styles.blankButtonContainer}>
                                    <Text style={styles.blankBtnText}>
                                        Send you first gift
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                )
            }
                
        </View>
    );
};

export default ReceivedGiftScreenBK;

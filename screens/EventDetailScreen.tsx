import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { EventDetailInfo, IRootState } from '../reducers';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import { clearThanksNoteState, getEventDetail, getMembers, setEventDetailInfo } from '../actions/giftAppAction';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { useFonts } from 'expo-font';


interface IEventDetailScreenProps {
    navigation: NavigationProp<any>;
}

const EventDetailScreen: React.FC<IEventDetailScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { eventInfo, eventDetailInfo, eventMembers } = useSelector((state: IRootState) => state.giftApp);

    useEffect(() => {
        if (eventInfo) {
            console.log(eventInfo.is_owner);
            const event_id = eventInfo.id;
            if (eventInfo.is_owner) {
                dispatch(getEventDetail(event_id))
                dispatch(getMembers(event_id));  
            } else {
                dispatch(getMembers(event_id));  
            }
        }
    }, [eventInfo])

    const closeModal = () => {
        props.navigation.goBack();
    };

    const gotoEventQRCodeScreen = () => {
        props.navigation.navigate('EventQRCodeScreen');
    };

    const gotoAddThankyouNoteScreen = () => {
        props.navigation.navigate('SelectPaymentMethodFromEventScreen');
    };

    useEffect(() => {
        dispatch(clearThanksNoteState());
    }, [dispatch])
   
    const gotoEditEventScreen = (eventDetailInfo: EventDetailInfo) => {
        dispatch(setEventDetailInfo(eventDetailInfo));
        props.navigation.navigate('EditEventScreen');
    };

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Merriweather-Bold': require('../assets/fonts/Merriweather-Bold.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Waterfall': require('../assets/fonts/Waterfall-Regular.ttf'),
      });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <Image
                    source={require("../assets/images/detail-main.png")}
                    resizeMode="cover"
                />
                <Pressable onPress={closeModal} style={styles.iconDiv}>
                    <Image
                        source={require("../assets/images/close-white.png")}
                        style={styles.iconImage}
                        resizeMode="cover"
                    />
                </Pressable>
            </View>
            {
                eventInfo && (
                    eventInfo.is_owner ? (
                        <>
                            <View style={styles.mainContainer}>
                                {
                                    eventDetailInfo && (
                                        <>
                                            <View style={styles.detailHeaderContainer}>
                                                <Text style={[styles.eventTitle, {fontFamily: 'Merriweather-Bold'}]}>{eventDetailInfo.name}</Text>
                                                <Pressable onPress={() => gotoEditEventScreen(eventDetailInfo)}>
                                                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 4, marginLeft: 15}}>
                                                        {/* <Text style={styles.editText}>Edit</Text> */}
                                                        <Icon2 name="edit" size={20} color="#7B61FF" />
                                                    </View>
                                                </Pressable>
                                            </View>
                                            <View style={styles.detailInfoContainer}>
                                                <Icon1 name="calendar" size={20} color="#000" />
                                                <Text style={styles.calendarInfo}>{moment(eventDetailInfo.event_date).format('MM/DD/YYYY')}</Text>
                                            </View>
                                            <View style={styles.detailInfoInviteContainer}>
                                                <View style={styles.detailInfoContainer}>
                                                    <Text style={[styles.labelInfo, {fontFamily: 'Work-Sans'}]}>Invited</Text>
                                                    <Text style={styles.calendarInfo}>{eventMembers.length}</Text>
                                                    {
                                                        eventMembers.length == 0 ? (
                                                            <Text style={styles.calendarInfo}>People</Text>
                                                        ) : (
                                                            <Text style={styles.calendarInfo}>People</Text>
                                                        )
                                                    }                                
                                                </View>
                                                <View style={styles.detailInfoContainer}>
                                                    {eventMembers && eventMembers.filter((_, index) => index < 3).map((member, index) => {
                                                        return (
                                                            <View 
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                    backgroundColor: "#D5BBFF",
                                                                    borderColor: "#fff",
                                                                    borderRadius: 25,
                                                                    borderStyle: "solid",
                                                                    borderWidth: 1,
                                                                    marginLeft: index == 0 ? 0 : -25,
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}
                                                                key={index}
                                                            >
                                                                {
                                                                    member && member.contact && member.contact.name && (
                                                                        <Text style={styles.inviteNameInfo}>{member.contact.name[0]}{member.contact.name[1]}</Text>
                                                                    )
                                                                }
                                                            </View>
                                                        )
                                                    })}
                                                    {
                                                        eventMembers.length > 3 && (
                                                            <View style={styles.moreMembers}>
                                                                <Text style={[styles.moreMemberCount, {fontFamily: 'Work-Sans'}]}>+{eventMembers.length - 3}</Text>
                                                            </View>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.detailInfoContainer}>
                                                <Text style={[styles.labelInfo, {fontFamily: 'Work-Sans'}]}>Description</Text>
                                            </View>
                                            <Text style={styles.descriptionInfo}>{eventDetailInfo.message}</Text>
                                        </>
                                    )
                                }
                            </View>
                            <View style={styles.buttonContainer} >
                                <Pressable style={styles.sendButton} onPress={gotoEventQRCodeScreen}>
                                    <Text style={[styles.sendButtonText, {fontFamily: 'Work-Sans'}]}>View QR Code</Text>
                                </Pressable>
                                <Pressable style={styles.sendButton1} onPress={gotoAddThankyouNoteScreen}>
                                    <Text style={[styles.sendButtonText1, {fontFamily: 'Work-Sans'}]}>Send Thank you Note</Text>
                                </Pressable>
                            </View>

                        </>
                    ) : (
                        <>
                            <View style={styles.mainContainer}>
                                {
                                    eventInfo && (
                                        <>
                                            <View style={styles.detailHeaderContainer}>
                                                <Text style={[styles.eventTitle, {fontFamily: 'Merriweather-Bold'}]}>{eventInfo.name}</Text>
                                            </View>
                                            <View style={styles.detailInfoContainer}>
                                                <Icon1 name="calendar" size={20} color="#000" />
                                                <Text style={styles.calendarInfo}>{moment(eventInfo.event_date).format('MM/DD/YYYY')}</Text>
                                            </View>
                                            <View style={styles.detailInfoInviteContainer}>
                                                <View style={styles.detailInfoContainer}>
                                                    <Text style={[styles.labelInfo, {fontFamily: 'Work-Sans'}]}>Invited</Text>
                                                    <Text style={styles.calendarInfo}>{eventMembers.length}</Text>
                                                    {
                                                        eventMembers.length == 0 ? (
                                                            <Text style={styles.calendarInfo}>People</Text>
                                                        ) : (
                                                            <Text style={styles.calendarInfo}>People</Text>
                                                        )
                                                    }                                
                                                </View>
                                                <View style={styles.detailInfoContainer}>
                                                    {eventMembers && eventMembers.filter((_, index) => index < 3).map((member, index) => {
                                                        return (
                                                            <View 
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                    backgroundColor: "#D5BBFF",
                                                                    borderColor: "#fff",
                                                                    borderRadius: 25,
                                                                    borderStyle: "solid",
                                                                    borderWidth: 1,
                                                                    marginLeft: index == 0 ? 0 : -25,
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}
                                                                key={index}
                                                            >
                                                                {
                                                                    member && member.contact && member.contact.name && (
                                                                        <Text style={styles.inviteNameInfo}>{member.contact.name[0]}{member.contact.name[1]}</Text>
                                                                    )
                                                                }
                                                            </View>
                                                        )
                                                    })}
                                                    {
                                                        eventMembers.length > 3 && (
                                                            <View style={styles.moreMembers}>
                                                                <Text style={[styles.moreMemberCount, {fontFamily: 'Work-Sans'}]}>+{eventMembers.length - 3}</Text>
                                                            </View>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.detailInfoContainer}>
                                                <Text style={[styles.labelInfo, {fontFamily: 'Work-Sans'}]}>Description</Text>
                                            </View>
                                            <Text style={styles.descriptionInfo}>{eventDetailInfo.message}</Text>
                                        </>
                                    )
                                }
                            </View>
                        </>
                    )
                )
            }
                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    inviteNameInfo: {
        fontSize: 12,
        color: '#7B61FF',
        textTransform: 'uppercase'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        overflow: 'hidden',
        height: '55%',
    },
    moreMembers: {
        width: 50,
        height: 50,
        backgroundColor: "#7B61FF",
        borderColor: "#fff",
        borderRadius: 25,
        borderStyle: "solid",
        borderWidth: 1,
        marginLeft: -25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreMemberCount: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600'
    },
    mainContainer: {
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -100,
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    iconDiv: {
        position: 'absolute',
        top: 60,
        left: 30
    },
    detailInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 18
    }, 
    detailInfoInviteContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    eventTitle: {
        fontSize: 24,
        textAlign: 'left',
        color: '#111',
        fontWeight: '700',
        maxWidth: '90%'
    },
    editText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#7B61FF',
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
        paddingRight: 4
    },
    calendarInfo: {
        color: 'rgba(17, 17, 17, 0.4)',
        fontSize: 16,
        paddingLeft: 10
    },
    labelInfo: {
        fontSize: 16,
        color: '#111',
        fontWeight: '600'
    },
    descriptionInfo: {
        marginTop: 12,
        color: 'rgba(17, 17, 17, 0.4)',
        fontSize: 14,
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{
            translateX: -185
        }],
        margin: 0,
        backgroundColor: 'transparent'
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF"
    },
    sendButtonText1: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#7B61FF"
    },
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        fontSize: 15,
        fontWeight: "700",
        height: 56,
        borderRadius: 14,
        width: '80%',
        marginBottom: 15
    },
    sendButton1: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        fontSize: 15,
        fontWeight: "700",
        height: 56,
        borderRadius: 14,
        width: '80%',
        marginBottom: 15,
        borderColor: '#7B61FF',
        borderWidth: 1
    },

});

export default EventDetailScreen;

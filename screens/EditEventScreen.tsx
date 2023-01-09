import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import CustomCheckbox from '../components/CustomCheckbox';
import { useFonts } from 'expo-font';
import { clearEventState, getEventTypes, getMembers } from '../actions/giftAppAction';
import { IRootState } from '../reducers';
import { updateEvent } from '../actions/giftAppAction';
import { AntDesign } from '@expo/vector-icons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { handleMessage } from '../actions/commonAction';


interface IEditEventScreenProps {
    navigation: NavigationProp<any>;
}

const EditEventScreen: React.FC<IEditEventScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { eventTypeList, dateInfo, isUpdateEventSuccess, isUpdateEventTriggered, eventDetailInfo, eventMembers } = useSelector((state: IRootState) => state.giftApp)

    const [validationError, setValidationError] = React.useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

    const closeModal = () => {
        props.navigation.goBack();
    };

    let [fontsLoaded] = useFonts({
        'Merriweather': require('../assets/fonts/Merriweather-Light.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    });


    const [type, setType] = React.useState(eventDetailInfo.event_type_id);
    const [message, setMessage] = React.useState(eventDetailInfo.message);
    const [eventName, setEventName] = React.useState(eventDetailInfo.name);
    const [eventDate, setEventDate] = React.useState(eventDetailInfo.event_date);

    const [errorModalShow, setErrorModalShow] = React.useState(false);

    useEffect(() => {
        dispatch(getEventTypes());
    }, [])

    React.useEffect(() => {
        if (eventDetailInfo) {
            setType(eventDetailInfo.event_type_id);
            setMessage(eventDetailInfo.message);
            setEventName(eventDetailInfo.name);
            setEventDate(eventDetailInfo.event_date);   
            dispatch(getMembers(eventDetailInfo.id));      
        }
    }, [eventDetailInfo])

    const updateEventInfo = () => {
        if (eventName === "") {
            setValidationError(true);
            setErrorModalShow(true);
            setValidationErrorMessage('You should fill event name');
        } else if (eventDate === "") {
            setValidationError(true);
            setErrorModalShow(true);
            setValidationErrorMessage('You should set event date');
        } else {
            dispatch(updateEvent(
                eventDetailInfo.id,
                eventName,
                eventDate,
                parseInt(type),
                message                
            ));
        }

    };

    console.log(isUpdateEventSuccess);

    const closeErrorModal = () => {
        setErrorModalShow(false);
    };

    useEffect(() => {
        if (isUpdateEventSuccess) {
            dispatch(handleMessage(true, 'success', 'Changes saved'));  
            props.navigation.navigate('EventDetailScreen');
            dispatch(clearEventState())
        } else {
            if (isUpdateEventTriggered) {
                setValidationError(true);
                setValidationErrorMessage('Please recheck input fields.');
            }
        }
    }, [isUpdateEventSuccess, isUpdateEventTriggered])

    const gotoInviteMembersScreen = () => {
        console.log(eventMembers);
        props.navigation.navigate('EditInviteMembersScreen');
    };

    const gotoCalendarScreen = () => {
        props.navigation.navigate('CalendarScreen');
    };
   

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.flex}
        >
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={[styles.scrollContainer]}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={styles.headerContainer} >
                        <Pressable onPress={closeModal}>
                            <Image
                                source={require("../assets/images/close.png")}
                                style={styles.iconImage}
                                resizeMode="cover"
                            />
                        </Pressable>
                    </View>
                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.headerTitle, {fontFamily: 'Work-Sans'}]}>Edit event</Text>
                    </View>
                
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Event type</Text>
                    </View>
                    <ScrollView style={styles.categoryContainer} horizontal>
                        <View style={styles.categoryItemListContainer}>
                            {eventTypeList && eventTypeList.map((eventType, index) => {
                                return (
                                    <View style={styles.categoryItemContainer} key={index}>
                                        <CustomCheckbox
                                            option={eventType.id}
                                            value={type}
                                            onChange={setType}
                                            position='top-right'
                                        >
                                            <View style={[styles.categoryItemInfo, { backgroundColor: eventType.bg_color }]}>
                                                <Image
                                                    source={{
                                                        uri: eventType.image_url,
                                                    }}
                                                    style={styles.eventTypeIconImage}
                                                    resizeMode="cover"
                                                />
                                                <Text style={[styles.typeName, {fontFamily: 'Work-Sans'}]}>{eventType.description}</Text>
                                            </View>
                                        </CustomCheckbox>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Event name</Text>
                    </View>
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Enter name"
                        value={eventName}
                        onChangeText={(text) => setEventName(text)}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Event date</Text>
                    </View>
                    <Pressable onPress={gotoCalendarScreen}>
                        <View style={styles.fieldWrapper}>
                            <AntDesign style={styles.iconStyleInput} name="calendar" size={20} color="black" />
                            <TextInput
                                style={styles.fieldInputIcon}
                                placeholder="Enter date"
                                value={eventDate}
                            />
                        </View>
                    </Pressable>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Description</Text>
                    </View>
                    <View style={styles.messageContentContainer}>
                        <TextInput
                            multiline
                            style={styles.fieldInputMulti}
                            value={message}
                            placeholder="Enter a message for your invitees"
                            onChangeText={(text) => setMessage(text)}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Invite friends and family</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        {eventMembers && eventMembers.map((eventMember, index) => {
                            return (
                                <View 
                                    style={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: "#ddd",
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
                                        eventMember.contact && eventMember.contact.name && (
                                            <Text style={styles.inviteNameInfo}>{eventMember.contact.name[0]}{eventMember.contact.name[1]}</Text>
                                        )
                                    }
                                    
                                </View>
                            )
                        })}
                        {
                            (eventMembers.length) ? (
                                <Pressable onPress={() => gotoInviteMembersScreen()}>
                                    <AntDesign style={styles.iconStyle} name="pluscircle" size={50} color="#7B61FF" />
                                </Pressable>
                            ) : (
                                <Pressable onPress={gotoInviteMembersScreen}>
                                    <AntDesign name="pluscircle" size={30} color="#7B61FF" />
                                </Pressable>
                            )
                        }
                    
                    </View>
                    {/* <View style={styles.detailInfoContainer}>
                        <Text style={styles.labelInfo}>Invited</Text>
                        <Text style={styles.calendarInfo}>{eventMembers.length}</Text>
                        {
                            eventMembers.length == 0 ? (
                                <Text style={styles.calendarInfo}>People</Text>
                            ) : (
                                <Text style={styles.calendarInfo}>Peoples</Text>
                            )
                        }                                
                    </View> */}
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
                    <View style={styles.buttonContainer} >
                        <Pressable style={styles.sendButton} onPress={updateEventInfo}>
                            <Text style={styles.sendButtonText}>Save changes</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    iconStyle2: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        right: 0,
    },
    calendarInfo: {
        color: 'rgba(17, 17, 17, 0.4)',
        fontSize: 16,
        paddingLeft: 5
    },
    detailInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 15
    },
    labelInfo: {
        fontSize: 16,
        color: '#111',
        fontWeight: '600'
    },
    container: {
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingBottom: 30,
        height: '100%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    headerTitleContainer: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    },
    titleContainer: {
        width: '100%',
        textAlign: 'left',
        marginTop: 30,
    },
    title: {
        fontSize: 16,
        color: '#111111',
    },
    typeName: {
        fontSize: 8,
        lineHeight: 15,
        textAlign: 'center',
        alignItems: 'center',
        color: '#111',
        textTransform: 'capitalize',
        fontWeight: '600'
    },
    inviteNameInfo: {
        fontSize: 12,
        color: '#2F80ED',
        textTransform: 'uppercase'
    },
    categoryItemContainer: {
        marginRight: 15,
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 15,
        width: '100%'
    },
    categoryItemInfo: {
        width: 70,
        height: 70,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
    errorMessageAlert: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginLeft: 15,
        marginTop: 0
    },
    fieldInputIcon: {
        borderRadius: 8,
        fontSize: 16,
        color: '#111',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        backgroundColor: '#F5F5F5',
        height: 56,
    },
    fieldInput: {
        borderRadius: 8,
        fontSize: 16,
        color: '#111',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#F5F5F5',
        height: 56,
        marginTop: 10
    },
    fieldInputMulti: {
        height: 134,
        width: '100%',
        marginTop: 10,
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        color: '#111',
        backgroundColor: '#F5F5F5',
        textAlignVertical: 'top'
    },
    errorMessageWrapper: {
        marginTop: 10,
        marginBottom: 20,
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
    messageContentContainer: {
        width: '100%',
    },
    fieldInputWrapper: {
        width: '100%',
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20,
    },
    categoryContainer: {
        paddingLeft: 30,
        width: '100%',
        height: 70,
        marginTop: 30,
        flexDirection: "row"
    },
    categoryItemListContainer: {
        flexDirection: 'row'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitle: {
        color: '#7B61FF',
        fontSize: 28,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundColor: 'transparent'
    },
    image: {
        width: 70,
        height: 70
    },
    eventTypeIconImage: {
        width: 40,
        height: 40
    },
    categoryItemTitle: {
        fontSize: 20,
        color: '#111111',
        marginTop: 10,
        fontWeight: '600',
    },
    iconImage: {
        width: 30,
        height: 30
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF",
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
        textAlign: 'center'
    },
    iconStyle: {
        marginLeft: -25
    },
    iconStyleInput: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },

});

export default EditEventScreen;

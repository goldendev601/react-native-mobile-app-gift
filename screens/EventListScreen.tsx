import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { clearEventState, getEventList, getFilteredEventList, setEventInfo } from '../actions/giftAppAction';
import { IRootState, Event} from '../reducers';
import Icon2 from 'react-native-vector-icons/EvilIcons';

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
        paddingTop: 60
    },
    eventContainer: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
        borderRadius: 12,
        overflow: 'hidden'
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
        paddingLeft: 20,
        paddingRight: 20,
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
    },
    image: {
        width: '100%',
        height: 190
    },
    textLink: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'right'
    },
    eventTitleInfo: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'left',
        position: 'absolute',
        bottom: 15,
        left: 15,
        zIndex: 10
    },
    eventDateInfo: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 10,
        lineHeight: 12,
        textAlign: 'left',
        position: 'absolute',
        bottom: 45,
        left: 15,
        zIndex: 10
    },
    eventsContainer: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 22
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
        width: "100%",
    },
    blankContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6E6E633',
        width: '100%',
        height: '100%',
        paddingLeft: 50,
        paddingRight: 50,
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
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 30,
        width: '100%'
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

});

interface IEventListScreenProps {
    navigation: NavigationProp<any>;
}

const EventListScreen: React.FC<IEventListScreenProps> = (props) => {
    const dispatch = useDispatch();


    const gotoAddNewEventScreen = () => {
        props.navigation.navigate('CreateEventScreen');
    };

    useEffect(() => {
        dispatch(getEventList())
        dispatch(clearEventState())
    }, [])
   

    const handleSearchChange = (value: string) => {
        dispatch(getFilteredEventList(value))
    }

    const option = {
        day : 'numeric',
        month : 'numeric',
        year : 'numeric'
    }

    const dateToMyDate = (date: any) => {
        var d = date.substr(0, 10);
        var z = new Date(d).toTimeString().split(' ')[1];
        return new Date(d + 'T00:00:00.000' + z.substr(-5, 3) + ":" + z.substr(-2));
    }

    const { eventList } = useSelector((state: IRootState) => state.giftApp)

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Merriweather-Bold': require('../assets/fonts/Merriweather-Bold.ttf'),
        'Italianno': require('../assets/fonts/Italianno-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Waterfall': require('../assets/fonts/Waterfall-Regular.ttf'),
        'Cormorant': require('../assets/fonts/Cormorant-Bold.ttf'),
        'Playfair': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
        'Lato': require('../assets/fonts/Lato-Black.ttf'),
    });
    

    const gotoEventDetailScreen = (eventInfo: Event) => {
        dispatch(setEventInfo(eventInfo));
        props.navigation.navigate('EventDetailScreen');
    };

    return (
        <View
            style={styles.scrollContainer}
        >
            <View style={styles.headerWrapper}>
                <Text style={[styles.textLink, {fontFamily: 'Work-Sans'}]}>Events</Text>
            </View>
            {
                eventList.length > 0 ? (
                    <View style={styles.mainContainer}>
                        <View style={styles.fieldWrapper}>
                            <Icon2 style={styles.iconStyle} name="search" size={20} color="#000" />
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Search"
                                onChangeText={(text) => handleSearchChange(text)}
                            />
                        </View>
                        <View style={styles.buttonContainer} >
                            <Pressable style={styles.sendButton} onPress={gotoAddNewEventScreen}>
                                <Text style={styles.sendButtonText}>Create New event</Text>
                            </Pressable>
                        </View>
                        <ScrollView style={styles.eventsContainer}>
                            {
                                eventList.map((eventInfo, index) => {
                                    return (
                                        <Pressable onPress={() => gotoEventDetailScreen(eventInfo)}>
                                            <View style={styles.eventContainer} key={index}>
                                                <Image
                                                    source={require("../assets/images/card11.jpeg")}
                                                    style={styles.image}
                                                    resizeMode="cover"
                                                />
                                                {fontsLoaded && (
                                                    <>
                                                        <Text style={[styles.eventDateInfo, {fontFamily: 'Work-Sans'}]}>{dateToMyDate(eventInfo.event_date).toLocaleDateString('en-US', option)}</Text>
                                                        <Text style={[styles.eventTitleInfo, {fontFamily: 'Merriweather-Light'}]}>{eventInfo.name}</Text>
                                                    </>
                                                )}
                                            </View>
                                        </Pressable>
                                    )
                                })
                            }
                            
                        </ScrollView>
                    </View>
                ) : (
                    <View style={styles.blankWrapper}>
                        <View style={styles.blankContainer}>
                            <Text style={styles.blankText}>
                                Your events will show here. You can manage them, invite contacts, and download a unique QR code
                            </Text>
                            <Pressable onPress={gotoAddNewEventScreen}>
                                <View style={styles.blankButtonContainer}>
                                    <Text style={styles.blankBtnText}>
                                        Create an event
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

export default EventListScreen;

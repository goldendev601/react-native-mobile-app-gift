import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { getEventList } from '../actions/giftAppAction';


interface IThanksEventScreenProps {
    navigation: NavigationProp<any>;
}

const ThanksEventScreen: React.FC<IThanksEventScreenProps> = (props) => {

    const dispatch = useDispatch();

    const closeModal = () => {
        // props.navigation.goBack();
        props.navigation.navigate('EventList')
    };

    useEffect(() => {
        dispatch(getEventList())
    }, [])

    const gotoHomeScreen = () => {
        // props.navigation.navigate('Home');
        props.navigation.navigate('EventList')
    };

    const gotoQRCodeScreen = () => {
        props.navigation.navigate('QRCodeScreen');
    };


    let [fontsLoaded] = useFonts({
        'Merriweather': require('../assets/fonts/Merriweather-Light.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    const [message, setMessage] = React.useState('');

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
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.imageContentContainer}>
                    <Image
                        source={require("../assets/images/save.png")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.thanksContainer}>
                    <Text style={[styles.thanksText, {fontFamily: 'Work-Sans'}]}>Event created</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        You can invite people to your event or let them scan the QR code below.
                    </Text>
                </View>
                <View style={styles.buttonContainer} >
                    <Pressable style={styles.sendButton} onPress={gotoQRCodeScreen}>
                        <Text style={styles.sendButtonText}>View QR Code</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.textLinkWrapper} onPress={gotoHomeScreen}>
                    <Text style={styles.textLink}>GO TO HOMEPAGE</Text>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 30,
        maxHeight: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitle: {
        color: '#111',
        fontSize: 25,
        fontWeight: '600',
        paddingLeft: 12
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        justifyContent: 'center'
    },
    thanksContainer: {
        width: '100%',
        marginTop: 30
    }, 
    descriptionContainer: {
        width: '100%',
        marginTop: 20
    },
    descriptionText: {
        color: '#111',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center'
    },
    thanksText: {
        textAlign: 'center',
        color: '#7B61FF',
        fontSize: 28,
        fontWeight: 'bold'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: 'transparent'
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
    imageContentContainer: {
        marginTop: 50,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center'
    },
    image: {
        width: 119,
        height: 119,
    },
    iconImage: {
        width: 30,
        height: 30
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
        marginTop: 50
    },
    textLink: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: '800',
        fontSize: 14,
        textAlign: 'center',
        textTransform: "uppercase",
        paddingHorizontal: 20,
    }
});

export default ThanksEventScreen;

import * as React from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';


interface IThanksScreenProps {
    navigation: NavigationProp<any>;
}

const ThanksScreen: React.FC<IThanksScreenProps> = (props) => {

    const closeModal = () => {
        props.navigation.goBack();
    };

    const gotoHomeScreen = () => {
        props.navigation.navigate('BottomNav');
    };

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    const [message, setMessage] = React.useState('');

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <Pressable onPress={gotoHomeScreen}>
                    <Image
                        source={require("../assets/images/close.png")}
                        style={styles.iconImage}
                        resizeMode="cover"
                    />
                </Pressable>
            </View>
            <View style={styles.mainContainer}>
                <Image
                    source={require("../assets/images/sending-gift-success.png")}
                    style={styles.giftImage}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Thank you</Text>
                <Pressable onPress={gotoHomeScreen}>
                    <Text style={styles.sendButtonText1}>Go to home page</Text>
                </Pressable>
            </View>
            {/* <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoHomeScreen}>
                    <Text style={styles.sendButtonText}>Go back to homepage</Text>
                </Pressable>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 180,
        height: '92%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    mainContainer: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        color: '#7B61FF',
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 20
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
        color: '#7B61FF',
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 0
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        left: '50%',
        transform: [{
            translateX: -180
        }],
        margin: 0,
        backgroundColor: 'transparent'
    },
    image: {
        width: '100%',
    },
    iconImage: {
        width: 30,
        height: 30
    },
    giftImage: {
        width: 150,
        height: 150,
        marginTop: 125
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF"
    },
    sendButtonText1: {
        textTransform: "uppercase",
        color: "#7B61FF",
        fontSize: 14,
        marginTop: 80,
        fontWeight: '800'
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

export default ThanksScreen;

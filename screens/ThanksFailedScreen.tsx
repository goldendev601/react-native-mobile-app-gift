import * as React from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { useDispatch } from 'react-redux';
import { getPaymentMethods } from '../actions/giftAppAction';


interface IThanksFailedScreenProps {
    navigation: NavigationProp<any>;
}

const ThanksFailedScreen: React.FC<IThanksFailedScreenProps> = (props) => {

    const closeModal = () => {
        props.navigation.goBack();
    };

    const gotoHomeScreen = () => {
        props.navigation.navigate('BottomNav');
    };

    const dispatch = useDispatch();

    const gotoSendMoneyScreen = () => {
        dispatch(getPaymentMethods());
        props.navigation.navigate('SendMoneyScreen');
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
            {
                fontsLoaded && (
                    <View style={styles.mainContainer}>
                        <Image
                            source={require("../assets/images/sending-gift-failed.png")}
                            style={styles.giftImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Transaction Failed</Text>
                        <Text style={[styles.description, {marginTop: 20, fontFamily: 'WorkSans-Medium'}]}>
                            We could not push through with your
                        </Text>
                        <Text style={[styles.description, {fontFamily: 'WorkSans-Medium'}]}>
                            transaction. Please select or enter
                        </Text>
                        <Text style={[styles.description, {fontFamily: 'WorkSans-Medium'}]}>
                            another payment method.
                        </Text>
                        <Pressable onPress={gotoSendMoneyScreen}>
                            <Text style={styles.sendButtonText1}>OKAY</Text>
                        </Pressable>
                    </View>
                )
            }
            
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
    description: {
        color: '#111111',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        textAlign: 'center'
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

export default ThanksFailedScreen;

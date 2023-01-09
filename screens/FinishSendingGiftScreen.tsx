import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { addGift } from '../actions/giftAppAction';


interface IFinishSendingGiftScreenProps {
    navigation: NavigationProp<any>;
}

const FinishSendingGiftScreen: React.FC<IFinishSendingGiftScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { giftInfo, newGiftId } = useSelector((state: IRootState) => state.giftApp)

    const closeModal = () => {
        props.navigation.goBack();
    };

    const gotoHomeScreen = () => {
        props.navigation.navigate('Home');
    };

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

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
                <Image
                    source={require("../assets/images/icons8-wedding_gift.png")}
                    style={styles.giftImage}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Your gift was sent</Text>
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoHomeScreen}>
                    <Text style={styles.sendButtonText}>Go back to homepage</Text>
                </Pressable>
            </View>
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
        color: '#111111',
        fontSize: 28,
        fontWeight: '600',
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
        width: 125,
        height: 125,
        marginTop: 125
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

export default FinishSendingGiftScreen;

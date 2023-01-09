import * as React from 'react';

import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import Icon2 from 'react-native-vector-icons/Ionicons';


interface IPaymentScreenProps {
    navigation: NavigationProp<any>;
}

const PaymentScreen: React.FC<IPaymentScreenProps> = (props) => {

    const closeModal = () => {
        props.navigation.goBack();
    };

    const gotoThanksScreen = () => {
        props.navigation.navigate('ThanksScreen');
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
                <Pressable onPress={closeModal}>
                    <Image
                        source={require("../assets/images/close.png")}
                        style={styles.iconImage}
                        resizeMode="cover"
                    />
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Payment</Text>
                </View>
            </View>
            <ScrollView style={styles.mainContainer}>
                <View style={styles.fieldWrapper}>
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Number credit card"
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Name holder"
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="MM/YY"
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="CVC"
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Select Location"
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Zip code"
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoThanksScreen}>
                    <Text style={styles.sendButtonText}>Pay now</Text>
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
    headerTitleContainer: {
        width: 220,
        height: 50,
        textAlign: 'center',
        paddingTop: 3,
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
        paddingLeft: 40,
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: [{
            translateX: -180
        }],
        margin: 0,
        backgroundColor: 'transparent'
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 24,
        width: '100%',
    },
    iconStyle: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30
    },
    fieldInput: {
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
    image: {
        width: '100%',
    },
    iconImage: {
        width: 30,
        height: 30
    },
    fieldCheckboxWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginBottom: 50,
        marginTop: 25,
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
    },
    fieldDescription: {
        fontSize: 14,
        fontWeight: 'normal',
        paddingBottom: 5,
        marginLeft: 10,
        paddingRight: 30,
        marginTop: 5
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

export default PaymentScreen;

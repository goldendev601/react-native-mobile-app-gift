import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import CustomCheckbox from '../components/CustomCheckbox';
import { useFonts } from 'expo-font';
import { getCardTypes, getGiftColors, getGiftFonts, getGiftPictures, setGiftInfo } from '../actions/giftAppAction';
import { IRootState } from '../reducers';
import { API_ENDPOINT } from '../constants/Api';


interface ISelectCardTypeScreenProps {
    navigation: NavigationProp<any>;
}

const SelectCardTypeScreen: React.FC<ISelectCardTypeScreenProps> = (props) => {

    const dispatch = useDispatch();

    const closeModal = () => {
        props.navigation.goBack();
    };

    let [fontsLoaded] = useFonts({
        'Merriweather': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno': require('../assets/fonts/Italianno-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Waterfall': require('../assets/fonts/Waterfall-Regular.ttf'),
        'Cormorant': require('../assets/fonts/Cormorant-Bold.ttf'),
        'Playfair': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
        'Lato': require('../assets/fonts/Lato-Black.ttf'),
    });


    const [cardType, setCardType] = React.useState(2);

    useEffect(() => {
        dispatch(getCardTypes());
    }, [])

    const { cardTypeList } = useSelector((state: IRootState) => state.giftApp)

    const gotoSelectCategoryScreen = () => {
        dispatch(setGiftInfo({
            card_type_id: 2,
        }));
        props.navigation.navigate('SelectCategoryScreen');
    };

    const gotoSelectCardScreen = () => {
        dispatch(setGiftInfo({
            card_type_id: 1,
        }));
        props.navigation.navigate('SelectCategoryScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <Pressable onPress={closeModal} style={styles.textLinkWrapper}>
                    <Image
                        source={require("../assets/images/close.png")}
                        style={styles.iconImage}
                        resizeMode="cover"
                    />
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>SELECT TYPE</Text>
                </View>
                <View style={styles.textLinkWrapper}>
                </View>
            </View>
            {
                cardTypeList && cardTypeList.length > 0 && fontsLoaded && (
                    <ScrollView style={styles.mainContainer}>
                        <Pressable style={styles.cardContainer} onPress={gotoSelectCardScreen}>
                            <View style={styles.cardHeader}>
                                <Text style={[styles.cardTitle, { fontFamily: 'Work-Sans' }]}>
                                    {cardTypeList[0].description}
                                </Text>
                                <Text style={[styles.cardTitle, { fontFamily: 'Work-Sans' }]}>
                                    ${cardTypeList[0].fee_amount}.00
                                </Text>
                            </View>
                            <View style={styles.cardDescriptionWrapper}>
                                <Text style={[styles.cardDescription, { fontFamily: 'Work-Sans' }]}>
                                    Select from one of our dozens of beautifully designed greeting cards. All you have to do is pick the message and send it!
                                </Text>
                            </View>
                            <View style={styles.cardImageWrapper}>
                                <Image
                                    source={{
                                        uri: `${API_ENDPOINT}/gift-pictures/designed/birthday-Card1.png`
                                    }}
                                    style={styles.image1}
                                    resizeMode="cover"
                                />
                                <Image
                                    source={{
                                        uri: `${API_ENDPOINT}/gift-pictures/designed/wedding/Card3.png`
                                    }}
                                    style={styles.image1}
                                    resizeMode="cover"
                                />
                                <Image
                                    source={{
                                        uri: `${API_ENDPOINT}/gift-pictures/designed/baby/BabyCard1.png`
                                    }}
                                    style={styles.image1}
                                    resizeMode="cover"
                                />
                            </View>
                        </Pressable>
                        <Pressable style={styles.cardContainer} onPress={gotoSelectCategoryScreen}>
                            <View style={styles.cardHeader}>
                                <Text style={[styles.cardTitle, { fontFamily: 'Work-Sans' }]}>
                                    {cardTypeList[1].description}
                                </Text>
                                <Text style={[styles.cardTitle, { fontFamily: 'Work-Sans' }]}>
                                    ${cardTypeList[1].fee_amount}.00
                                </Text>
                            </View>
                            <View style={styles.cardDescriptionWrapper}>
                                <Text style={[styles.cardDescription, { fontFamily: 'Work-Sans' }]}>
                                    If you feel like selecting the colors and adding a custom message, this is your option. Customize your options and add a custom headline and message.
                                </Text>
                            </View>
                            <View style={styles.cardImageWrapper}>
                                <Image
                                    source={require("../assets/images/custom_card-image1.png")}
                                    style={styles.image2}
                                    resizeMode="cover"
                                />
                                <Image
                                    source={require("../assets/images/custom_card-image2.png")}
                                    style={styles.image3}
                                    resizeMode="cover"
                                />
                                <View style={styles.image4}>
                                </View>
                            </View>
                        </Pressable>
                    </ScrollView>
                )
            }
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
        height: 30,
        textAlign: 'center',
        paddingTop: 3,
    },
    titleContainer: {
        width: '100%',
        textAlign: 'left',
        marginTop: 30,
        paddingLeft: 30
    },
    title: {
        fontSize: 16,
        color: '#111111',
    },
    textLinkWrapper: {
        justifyContent: 'center',
        width: 32,
        backgroundColor: 'transparent'
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
        textAlign: 'center'
    },
    image: {
        width: 155,
        height: 180,
    },
    image1: {
        width: 125,
        height: 150,
    },
    image2: {
        width: 155,
        height: 180,
        borderRadius: 20     
    },
    image3: {
        width: 155,
        height: 180,
        marginLeft: -40,
        marginTop: 30
    },
    image4: {
        width: 70,
        height: 70,
        borderRadius: 12,
        zIndex: 99,
        backgroundColor: '#9E9AF8',
        marginLeft: -45,    },
    iconImage: {
        width: 30,
        height: 30
    },
    mainContainer: {
        width: '100%',
        paddingLeft: 35,
        paddingRight: 35,
        marginTop: 50
    },
    cardContainer: {
        width: '100%',
        marginBottom: 30
    },
    cardHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    cardTitle: {
        color: '#7B61FF',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 30
    },
    cardDescriptionWrapper: {
        width: '100%',
        marginTop: 10
    },
    cardDescription: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        color: 'rgba(17, 17, 17, 0.4)'
    },
    cardImageWrapper: {
        marginTop: 20,
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row'
    }
});

export default SelectCardTypeScreen;

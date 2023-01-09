import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import CustomCheckbox from '../components/CustomCheckbox';
import { useFonts } from 'expo-font';
import { getGiftColors, getGiftFonts, getGiftPictures, setGiftInfo } from '../actions/giftAppAction';
import { IRootState } from '../reducers';


interface ISelectTemplateScreenProps {
    navigation: NavigationProp<any>;
}

const SelectTemplateScreen: React.FC<ISelectTemplateScreenProps> = (props) => {

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


    const [picture, setPicture] = React.useState(null);
    const [color, setColor] = React.useState();
    const [primaryFont, setPrimaryFont] = React.useState();
    const [secondaryFont, setSecondaryFont] = React.useState();

    const [validationError, setValidationError] = React.useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

    useEffect(() => {
        dispatch(getGiftColors());
        dispatch(getGiftFonts());
    }, [])

    const { giftColorList, giftFontList, giftInfo, giftPictureList } = useSelector((state: IRootState) => state.giftApp)

    useEffect(() => {
        if (giftInfo.gift_category !== undefined) {
            console.log('============categoryId=============');
            console.log(giftInfo.gift_category.id);
            dispatch(getGiftPictures(giftInfo.gift_category.id));
        }
    }, [])

    const gotoMessageScreen = () => {
        if (picture && color && primaryFont && secondaryFont) {
            dispatch(setGiftInfo({
                gift_picture: picture,
                gift_color: color,
                gift_primary_font: primaryFont,
                gift_secondary_font: secondaryFont,
            }));
            props.navigation.navigate('MessageScreen');
        } else {
            setValidationError(true);
            setValidationErrorMessage('Please select all template options');
        }
        
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
                    <Text style={styles.headerTitle}>SELECT TEMPLATE</Text>
                </View>
                <View style={styles.textLinkWrapper}>
                </View>
            </View>
            <ScrollView >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Select Picture</Text>
                </View>
                <ScrollView style={styles.categoryContainer} horizontal>
                    <View style={styles.categoryItemListContainer}>

                        {giftPictureList && giftPictureList.map((giftPicture, pictureIndex) => {
                            return (
                                <View style={styles.categoryItemContainer} key={pictureIndex}>
                                    <CustomCheckbox
                                        option={giftPicture}
                                        value={picture}
                                        onChange={setPicture}
                                        position='top-right'
                                    >
                                        <View style={[styles.categoryItemInfo]}>
                                            <Image
                                                source={{
                                                    uri: giftPicture.image_url,
                                                }}
                                                style={styles.image}
                                                resizeMode="cover"
                                            />
                                        </View>
                                    </CustomCheckbox>
                                </View>
                            )
                        })}
                        
                    </View>
                </ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Color</Text>
                </View>
                <ScrollView style={styles.categoryContainer} horizontal>
                    <View style={styles.categoryItemListContainer}>
                        {giftColorList && giftColorList.map((giftColor, colorIndex) => {
                            return (
                                <View style={styles.categoryItemContainer} key={colorIndex}>
                                    <CustomCheckbox
                                        option={giftColor}
                                        value={color}
                                        onChange={setColor}
                                        position='top-right'
                                        key={colorIndex}
                                    >
                                        <View style={[styles.colorItemInfo, { backgroundColor: giftColor.hex_color }]}>
                                        </View>
                                    </CustomCheckbox>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
                {fontsLoaded && (
                    <React.Fragment>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Primary Font</Text>
                        </View>
                        <ScrollView style={styles.categoryContainer} horizontal>
                            <View style={styles.categoryItemListContainer}>
                                {giftFontList && giftFontList.map((giftFont, fontIndex1) => {
                                    return (
                                        <View style={styles.categoryItemContainer} key={fontIndex1}>
                                            <CustomCheckbox
                                                option={giftFont}
                                                value={primaryFont}
                                                onChange={setPrimaryFont}
                                                position='top-right'
                                            >
                                                <View style={[styles.fontItemInfo, { backgroundColor: '#E7E6FD' }]}>
                                                    <Text style={[styles.fontDisplay, { fontFamily: giftFont.description }]}> Aa </Text>
                                                    <Text style={styles.fontName}>{giftFont.description}</Text>
                                                </View>
                                            </CustomCheckbox>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Secondary Font</Text>
                        </View>
                        <ScrollView style={styles.categoryContainer} horizontal>
                            <View style={styles.categoryItemListContainer}>
                                {giftFontList && giftFontList.map((giftFont, fontIndex2) => {
                                    return (
                                        <View style={styles.categoryItemContainer} key={fontIndex2}>
                                            <CustomCheckbox
                                                option={giftFont}
                                                value={secondaryFont}
                                                onChange={setSecondaryFont}
                                                position='top-right'
                                            >
                                                <View style={[styles.fontItemInfo, { backgroundColor: '#E7E6FD' }]}>
                                                    <Text style={[styles.fontDisplay, { fontFamily: giftFont.description }]}> Aa </Text>
                                                    <Text style={styles.fontName}>{giftFont.description}</Text>
                                                </View>
                                            </CustomCheckbox>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </React.Fragment>
                )}
            </ScrollView>
            {validationError && (
                <Text style={styles.errorMessageAlert}>
                {validationErrorMessage}
                </Text>
            )}
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoMessageScreen}>
                    <Text style={styles.sendButtonText}>continue</Text>
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
    categoryItemContainer: {
        marginRight: 15,
    },
    categoryItemInfo: {
        width: 155,
        height: 180,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
    colorItemInfo: {
        width: 70,
        height: 70,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
    fontItemInfo: {
        width: 120,
        height: 150,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
    textLinkWrapper: {
        justifyContent: 'center',
        width: 32,
        backgroundColor: 'transparent'
    },
    fontName: {
        fontSize: 14,
        color: '#111',
        fontWeight: '600'
    },
    fontDisplay: {
        fontSize: 60,
        color: '#111',
        fontWeight: '600'
    },
    categoryContainer: {
        paddingLeft: 30,
        width: '100%',
        marginTop: 30,
        flexDirection: "row"
    },
    categoryItemListContainer: {
        flexDirection: 'row'
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
        fontWeight: '600'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{
            translateX: -180
        }],
        margin: 0,
        backgroundColor: 'transparent'
    },
    image: {
        width: 155,
        height: 180,
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
    errorMessageAlert: {
        fontSize: 10,
        color: '#cc3300',
        fontStyle: 'italic',
        marginTop: 15,
        marginBottom: 60,
        textAlign: 'center'
    },

});

export default SelectTemplateScreen;

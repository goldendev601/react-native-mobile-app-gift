import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { addDesignedGift } from '../actions/giftAppAction';


interface IPreviewDesignedGiftScreenProps {
    navigation: NavigationProp<any>;
}

const PreviewDesignedGiftScreen: React.FC<IPreviewDesignedGiftScreenProps> = (props) => {

    const dispatch = useDispatch();

    const closeModal = () => {
        props.navigation.goBack();
    };

    const { giftInfo, selectedPaymentMethod } = useSelector((state: IRootState) => state.giftApp)

    console.log('=======selectedPaymentMethod==========');
    console.log(selectedPaymentMethod);

    let [fontsLoaded] = useFonts({
        'Merriweather': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno': require('../assets/fonts/Italianno-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Waterfall': require('../assets/fonts/Waterfall-Regular.ttf'),
        'Cormorant': require('../assets/fonts/Cormorant-Bold.ttf'),
        'Playfair': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
        'Lato': require('../assets/fonts/Lato-Black.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf')
    });

    const gotoResumePaymentScreen = () => {
        if (giftInfo && selectedPaymentMethod) {
            dispatch(addDesignedGift(
                1,
                giftInfo.gift_category.id, 
                giftInfo.gift_picture.id, 
                giftInfo.amount,
                giftInfo.gift_contact.id,
                selectedPaymentMethod.stripe_token_id,
            ));
        }
        props.navigation.navigate('ResumePaymentScreen');
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
                    <Text style={styles.headerTitle}>PREVIEW GIFT</Text>
                </View>
                <View style={styles.textLinkWrapper}>
                </View>
            </View>
            {fontsLoaded && (
                <>
                    <ScrollView style={styles.mainContainer}>
                        <View style={styles.imageBlockContainer}>
                            <View style={styles.imageContentContainer}>
                                <Image
                                    source={{
                                        uri: giftInfo.gift_picture.image_url,
                                    }}
                                    style={styles.giftImage}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.TextContentContainer}>
                                {/* <Text style={[styles.contactInfoText, { fontFamily: 'Work-Sans' }]}>
                                    {giftInfo.gift_contact.first_name} {giftInfo.gift_contact.last_name} sent you a present of 
                                </Text> */}
                                <Text style={[styles.priceInfo, {fontFamily: 'Work-Sans' }]}>
                                    ${giftInfo.amount}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </>
            )}
            
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoResumePaymentScreen}>
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
        height: '92%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerTitleContainer: {
        height: 30,
        textAlign: 'center',
        paddingTop: 3,
    },
    messageContentContainer: {        
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30  
    },
    imageBlockContainer: {        
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30 ,
        marginTop: 24,        
    },
    mainContainer: {
        marginBottom: 50
    },
    priceInfo: {
        fontSize: 32,
        lineHeight: 50,
        fontWeight: '600',
        textAlign: 'center'
    },
    imageText: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: 'normal',
        marginTop: -90,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    contactInfoText: {
        color: '#111111',
        fontSize: 14, 
        lineHeight: 70,
        fontWeight: '600',  
        textAlign: 'center'     
    },
    description: {
        color: '#111111',
        fontSize: 14,   
        fontFamily: 'Merriweather-Light',
        textAlign: 'center',
        paddingTop: 15    
    },
    textLinkWrapper: {
        justifyContent: 'center',
        width: 32,
        backgroundColor: 'transparent'
    },
    imageContentContainer: {
        width: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    TextContentContainer: {
        width: '100%',
        padding: 15,
    },
    fieldInput: {
        height: 234,
        width: '100%',
        marginTop: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 14,
        padding: 15,
        color: '#111',   
        textAlignVertical: 'top'     
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
        paddingLeft: 12
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
    giftImage: {
        width: '100%', 
        height: 400,       
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
});

export default PreviewDesignedGiftScreen;

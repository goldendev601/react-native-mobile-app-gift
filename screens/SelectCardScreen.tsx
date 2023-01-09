import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import CustomCheckbox from '../components/CustomCheckbox';
import { getCustomPictures, getCustomPicturesCard, getGiftCategories } from '../actions/giftAppAction';
import { GiftCatetory, GiftPicture, IRootState } from '../reducers';
import { setGiftInfo } from '../actions/giftAppAction';

interface ISelectCardScreenProps {
    navigation: NavigationProp<any>;
}

const SelectCardScreen: React.FC<ISelectCardScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { giftPictureList, giftInfo } = useSelector((state: IRootState) => state.giftApp)

    const closeModal = () => {
        props.navigation.goBack();
    };

    console.log(giftPictureList);

    useEffect(() => {
        if (giftInfo.gift_category !== undefined) {
            console.log(giftInfo.card_type_id);
            if (giftInfo.card_type_id === 1) {
                dispatch(getCustomPicturesCard(giftInfo.gift_category.id));
            } 
            if (giftInfo.card_type_id === 2) {
                dispatch(getCustomPictures(giftInfo.gift_category.id));
            }
            
        }
    }, [giftInfo.gift_category])

    const gotoNextScreen = (giftPicture: GiftPicture) => {
        dispatch(setGiftInfo({
            gift_picture: giftPicture,
        }));
        props.navigation.navigate('PreviewDesignedGiftScreen');
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
                    <Text style={styles.headerTitle}>SELECT CARD</Text>
                </View>
                <View style={styles.textLinkWrapper}>
                </View>
            </View>
            <ScrollView style={styles.categoryContainer}>
                <View style={styles.categoryItemContainer}>
                    <View style={styles.categoryItemLeftContainer}>
                        {giftPictureList && giftPictureList.map((giftPicture, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {
                                        index % 2 == 0 && (
                                            <Pressable style={[styles.categoryItemInfo]} onPress={() => gotoNextScreen(giftPicture)}>
                                                <Image
                                                    source={{
                                                        uri: giftPicture.image_url,
                                                    }}
                                                    style={styles.image}
                                                    resizeMode="cover"
                                                />
                                            </Pressable>
                                        )
                                    }

                                </React.Fragment>
                            )
                        })}
                    </View>
                    <View style={styles.categoryItemRightContainer}>
                        {giftPictureList && giftPictureList.map((giftPicture, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {
                                        index % 2 == 1 && (
                                            <Pressable style={[styles.categoryItemInfo]} onPress={() => gotoNextScreen(giftPicture)}>
                                                <Image
                                                    source={{
                                                        uri: giftPicture.image_url,
                                                    }}
                                                    style={styles.image}
                                                    resizeMode="cover"
                                                />
                                            </Pressable>
                                        )
                                    }

                                </React.Fragment>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        maxHeight: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerTitleContainer: {
        height: 30,
        textAlign: 'center',
        paddingTop: 3
    },
    categoryItemLeftContainer: {
        width: '50%',
    },
    categoryItemRightContainer: {
        width: '50%',
    },
    categoryItemInfo: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
    },
    categoryContainer: {
        width: '100%',
        height: 600,
        marginTop: 30,
    },
    categoryItemContainer: {
        flexDirection: 'row'
    },
    textLinkWrapper: {
        justifyContent: 'center',
        width: 32,
        backgroundColor: 'transparent'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitle: {
        color: '#7B61FF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{
            translateX: -120
        }],
        margin: 0,
        backgroundColor: 'transparent'
    },
    image: {
        width: 180,
        height: 200,
    },
    categoryItemTitle: {
        fontSize: 20,
        color: '#111111',
        marginTop: 10,
        fontWeight: '600',
        textTransform: "capitalize",
    },
    iconImage: {
        width: 30,
        height: 30
    },
});

export default SelectCardScreen;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image, Linking } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect, getProfileInfo } from '../actions/authActions';
import { getMyProfile, getStripeDashboardLink } from '../actions/giftAppAction';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Zocial';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    mainContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: 412,
        width: '100%',
        overflow: 'hidden',
        marginTop: -24,
        paddingTop: 24
    },
    AboveWrapper: {
        width: '100%',
        height: 350,
        backgroundColor: '#7B61FF',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 50,
        backgroundColor: '#7B61FF',
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
    },
    textLink: {
    },
    textLinkStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    avatarWrapper: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    nameInfo: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600'
    },
    userNameInfo: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        fontWeight: '400'
    },
    infoLinkContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderBottomColor: '#D8D8D8',
        paddingLeft: 24,
        paddingRight: 24,
    },
    titleInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
        paddingLeft: 12
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden'
    },
    iconStyle: {
        margin: 0,
    },
    iconStyle1: {
        marginTop: -6,
    },
});

interface IProfileScreenProps {
    navigation: NavigationProp<any>;
}

const ProfileScreen: React.FC<IProfileScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    const { myProfile, stripeAccountLinkInfo } = useSelector((state: IRootState) => state.giftApp)
    const { isRegistered, profileInfo, userInfo } = useSelector((state: IRootState) => state.auth);

    let [fontsLoaded] = useFonts({
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    const goProfileScreen = () => {
        navigation.navigate('PersonalInfo');
    };

    const goNotificationScreen = () => {
        navigation.navigate('Notification');
    };

    const goStripeAccount = () => {
        // navigation.navigate('StripeAccount');
        if (stripeAccountLinkInfo) {
            Linking.openURL(stripeAccountLinkInfo.url);
        }
    };

    const goTermsAndConditionScreen = () => {
        // navigation.navigate('TermsAndCondition');
        Linking.openURL('https://www.givegiftd.com/privacy')
    };

    const goFaqScreen = () => {
        // navigation.navigate('Faq');
        Linking.openURL('https://www.givegiftd.com/faqs')
    };

    const goContactUs = () => {
        navigation.navigate('ContactUs');
    };

    const goPaymentMethodScreen = () => {
        navigation.navigate('PaymentMethod');
    };

    const logout = () => {
        dispatch(authLogoutAndRedirect())
    };

    useEffect(() => {
        dispatch(getMyProfile())
        dispatch(getStripeDashboardLink())
        if (userInfo && isRegistered) {
            dispatch(getProfileInfo(userInfo.access_token));
        }
    }, [])


    return (
        <View
            style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 style={styles.textLink} name="close" size={25} color="#FFF" />
                    </Pressable>
                    <Pressable style={styles.textLinkWrapper} onPress={logout}>
                        <Icon4 style={styles.textLink} name="log-out" size={25} color="#FFF" />
                    </Pressable>
                </View>

                {fontsLoaded && (
                    <>
                        {
                            profileInfo ? (
                                <View style={styles.avatarWrapper}>
                                    <Image
                                        source={{
                                            uri: profileInfo.image_url,
                                        }}
                                        style={styles.profileImage}
                                    />
                                    <Text style={[styles.nameInfo, { fontFamily: 'Work-Sans' }]} >
                                        {profileInfo.name}
                                    </Text>
                                    <Text style={[styles.userNameInfo, { fontFamily: 'Work-Sans' }]} >
                                        {profileInfo.email}
                                    </Text>
                                </View>
                            ) : (
                                <View style={styles.avatarWrapper}>
                                    <Image
                                        source={{
                                            uri: myProfile.image_url,
                                        }}
                                        style={styles.profileImage}
                                    />
                                    <Text style={[styles.nameInfo, { fontFamily: 'Work-Sans' }]} >
                                        {myProfile.name}
                                    </Text>
                                    <Text style={[styles.userNameInfo, { fontFamily: 'Work-Sans' }]} >
                                        {myProfile.email}
                                    </Text>
                                </View>
                            )
                        }
                        
                    </>
                )}
            </View>
            {fontsLoaded && (
                <>
                    <View style={styles.mainContainer}>
                        <Pressable onPress={goProfileScreen} style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Icon5 style={styles.iconStyle} name="person-outline" size={24} color="#000" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Personal Information
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#0D1C2E" />
                        </Pressable>
                        <Pressable style={styles.infoLinkContainer} onPress={goNotificationScreen}>
                            <View style={styles.infoWrapper}>
                                <Icon4 style={styles.iconStyle} name="bell" size={24} color="#0D1C2E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Notifications
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#0D1C2E" />
                        </Pressable>

                        {
                            stripeAccountLinkInfo && (
                                <Pressable style={styles.infoLinkContainer} onPress={goStripeAccount}>
                                    <View style={styles.infoWrapper}>
                                        <Icon2 style={styles.iconStyle1} name="stripe" size={24} color="#0D1C2E" />
                                        <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                            Stripe Account
                                        </Text>
                                    </View>
                                    <Icon3 name="right" size={20} color="#0D1C2E" />
                                </Pressable>
                            )
                        }
                        
                        <Pressable style={styles.infoLinkContainer} onPress={goPaymentMethodScreen}>
                            <View style={styles.infoWrapper}>
                                <Icon1 style={styles.iconStyle} name="payment" size={24} color="#0D1C2E" />   
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Payment Method
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#0D1C2E"  />
                        </Pressable>
                        <Pressable style={styles.infoLinkContainer} onPress={goContactUs} >
                            <View style={styles.infoWrapper}>
                                <Icon4 style={styles.iconStyle} name="mail" size={24} color="#0D1C2E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Contact Us
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#0D1C2E" />
                        </Pressable>
                        <Pressable style={styles.infoLinkContainer} onPress={goTermsAndConditionScreen}>
                            <View style={styles.infoWrapper}>
                                <Icon5 style={styles.iconStyle} name="ios-document-text-outline" size={24} color="#0D1C2E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Terms and Conditions
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#0D1C2E" />
                        </Pressable>
                        <Pressable style={styles.infoLinkContainer} onPress={goFaqScreen}>
                            <View style={styles.infoWrapper}>
                                <Icon4 style={styles.iconStyle} name="alert-circle" size={24} color="#0D1C2E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    FAQ
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#0D1C2E"  />
                        </Pressable>

                    </View>
                </>
            )}

        </View>
    );
};

export default ProfileScreen;

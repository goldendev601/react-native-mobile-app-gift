import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect, getProfileInfo } from '../actions/authActions';
import { getMyProfile } from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
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
        height: 120,
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
        width: 32
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
    mainTitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 8,
        textTransform: 'uppercase'
    },
    titleInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
    },
    valueInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
        opacity: 0.5
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
});

interface IPersonalInfoScreenProps {
    navigation: NavigationProp<any>;
}

const PersonalInfoScreen: React.FC<IPersonalInfoScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    const { myProfile } = useSelector((state: IRootState) => state.giftApp)
    const { isRegistered, profileInfo, userInfo } = useSelector((state: IRootState) => state.auth);

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    const logout = () => {
        dispatch(authLogoutAndRedirect())
    };

    useEffect(() => {
        if (userInfo && isRegistered) {
            dispatch(getProfileInfo(userInfo.access_token));
        }
        dispatch(getMyProfile())
    }, [])


    return (
        <View
            style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 style={styles.textLink} name="arrowleft" size={25} color="#FFF" />
                    </Pressable>
                    <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                        Personal Info
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <>
                    <View style={styles.mainContainer}>
                        <View style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    First Name
                                </Text>
                            </View>
                            <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                {profileInfo ? profileInfo.first_name : myProfile.first_name}
                            </Text>
                        </View>
                        <View style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Last Name
                                </Text>
                            </View>
                            <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                {profileInfo ? profileInfo.last_name : myProfile.last_name}
                            </Text>
                        </View>
                        <View style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Email
                                </Text>
                            </View>
                            <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                {profileInfo ? profileInfo.email : myProfile.email}
                            </Text>
                        </View>
                        <View style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Phone
                                </Text>
                            </View>
                            <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                {profileInfo ? profileInfo.phone : myProfile.phone}
                            </Text>
                        </View>
                        {/* <View style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Password
                                </Text>
                            </View>
                            <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                                *************
                            </Text>
                        </View> */}

                    </View>
                </>
            )}

        </View>
    );
};

export default PersonalInfoScreen;

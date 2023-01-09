import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Switch } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect } from '../actions/authActions';
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
    descriptionInfo: {
        marginTop: 30,
        fontSize: 14,
        color: '#111',
        fontWeight: '500',
        paddingLeft: 20,
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

interface INotificationScreenProps {
    navigation: NavigationProp<any>;
}

const NotificationScreen: React.FC<INotificationScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const [isEmailEnabled, setIsEmailEnabled] = useState(true);
    const toggleEmailSwitch = () => setIsEmailEnabled(previousState => !previousState);

    const [isPushEnabled, setIsPushEnabled] = useState(true);
    const togglePushSwitch = () => setIsPushEnabled(previousState => !previousState);

    const [isSMSEnabled, setIsSMSEnabled] = useState(true);
    const toggleSMSSwitch = () => setIsSMSEnabled(previousState => !previousState);

    const goBack = () => {
        navigation.goBack();
    };

    const logout = () => {
        dispatch(authLogoutAndRedirect())
    };

    useEffect(() => {
        dispatch(getMyProfile())
      }, [])

    const { myProfile } = useSelector((state: IRootState) => state.giftApp)


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
                        Notifications
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
                                    Send by email
                                </Text>                                
                            </View>
                            <Switch
                                trackColor={{ false: "#7B61FF", true: "#7B61FF" }}
                                thumbColor={isEmailEnabled ? "#fff" : "#fff"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleEmailSwitch}
                                value={isEmailEnabled}
                            />
                        </View>
                        <View style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Send by push notification
                                </Text>
                            </View>
                            <Switch
                                trackColor={{ false: "#7B61FF", true: "#7B61FF" }}
                                thumbColor={isPushEnabled ? "#fff" : "#fff"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={togglePushSwitch}
                                value={isPushEnabled}
                            />
                        </View>
                        <View style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Send by SMS
                                </Text>
                            </View>
                            <Switch
                                trackColor={{ false: "#7B61FF", true: "#7B61FF" }}
                                thumbColor={isSMSEnabled ? "#fff" : "#fff"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSMSSwitch}
                                value={isSMSEnabled}
                            />
                        </View>
                        <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans' }]} >
                            Open Settings for more options (like sounds) or to disable notifications altogether.
                        </Text>               
                    </View>
                </>
            )}

        </View>
    );
};

export default NotificationScreen;

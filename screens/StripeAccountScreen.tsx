import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Linking } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect, generateStripeAccessLink, stripeLink } from '../actions/authActions';
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
        width: '100%',
        marginTop: -24,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1        
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
    },
    textLinkStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    mainTitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 8,
        textTransform: 'uppercase',
        justifyContent: 'center'
    },
    warning: {
        fontSize: 24,
        textAlign: 'left',
        color: '#111',
        fontWeight: '700',
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
        left: '50%',
        transform: [{
            translateX: -185
        }],
        margin: 0,
        backgroundColor: 'transparent'
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
    refreshButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF"
    },
    refreshButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        fontSize: 15,
        fontWeight: "700",
        height: 50,
        borderRadius: 14,
        width: 250,
        marginTop: 20
    },
});

interface IStripeAccountScreenProps {
    navigation: NavigationProp<any>;
}

const StripeAccountScreen: React.FC<IStripeAccountScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    const { user, stripeUrl } = useSelector((state: IRootState) => state.auth);


    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    React.useEffect(() => {
        if (stripeUrl) {
            Linking.openURL(stripeUrl)
        }
    }, [stripeUrl])

    const setupStripeAccount = () => {        
        if (user && (user.user_stripe_account === 'pending verification' || user.user_stripe_account === 'not created')) {
            dispatch(generateStripeAccessLink())
          }
    };

    const openStripeAccount = () => {        
        if (user && (user.user_stripe_account === 'fully connected')) {
            console.log(stripeUrl)
            if (stripeUrl) {
                Linking.openURL(stripeUrl)
            }
        }
    };

    const refresh = () => {
        dispatch(getMyProfile())
        console.log(user.user_stripe_account);
    };

    return (
        <View
            style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 name="arrowleft" size={25} color="#FFF" />
                    </Pressable>
                    <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                        Stripe Account
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {
                (user.user_stripe_account === 'pending verification' || user.user_stripe_account === 'not created') ? (
                    <>
                        <View style={styles.mainContainer}>
                            <Text style={[styles.warning]} >
                                please set up your Stripe account.
                            </Text>
                        </View>
                        <View style={styles.buttonContainer} >
                            <Pressable style={styles.sendButton} onPress={setupStripeAccount}>
                                <Text style={styles.sendButtonText}>Set up</Text>
                            </Pressable>
                            <Pressable style={styles.refreshButton} onPress={refresh}>
                                <Text style={styles.refreshButtonText}>Refresh</Text>
                            </Pressable>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.mainContainer}>
                            <Text style={[styles.warning]} >
                                You already set up your stripe account.
                            </Text>
                        </View>
                        <View style={styles.buttonContainer} >
                            <Pressable style={styles.sendButton} onPress={openStripeAccount}>
                                <Text style={styles.sendButtonText}>Open Account</Text>
                            </Pressable>
                        </View>
                    </>
                )
            }

        </View>
    );
};

export default StripeAccountScreen;



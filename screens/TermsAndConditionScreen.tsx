import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Switch, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect } from '../actions/authActions';
import { getMyProfile } from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { ScrollView } from 'react-native-gesture-handler';


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
        paddingRight: 30
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
        textTransform: 'uppercase',
        justifyContent: 'center'
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
        fontWeight: '400',
    },
    itemInfo: {
        fontSize: 14,
        color: '#111',
        fontWeight: '400',
        marginLeft: 5,
        marginTop: 6
    },
    subTitle: {
        marginTop: 30,
        fontSize: 14,
        color: '#111',
        fontWeight: '700',
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
    itemInfoWrapper: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row'
    },
    dotIcon: {
        paddingTop: 0,
        marginTop: 0
    },
    textLink: {
    },
});

interface ITermsAndConditionScreenProps {
    navigation: NavigationProp<any>;
}

const TermsAndConditionScreen: React.FC<ITermsAndConditionScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

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
                        Terms and Conditions
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <>
                    <View style={styles.mainContainer}>
                        <ScrollView>
                            <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                Last updated: October 06, 2021
                            </Text> 
                            <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                            </Text>  
                            <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.
                            </Text> 
                            <Text style={[styles.subTitle, { fontFamily: 'Work-Sans-bold' }]} >
                                Interpretation and Definitions
                            </Text> 
                            <Text style={[styles.subTitle, { fontFamily: 'Work-Sans-bold' }]} >
                                Interpretation
                            </Text> 
                            <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                            </Text> 
                            <Text style={[styles.subTitle, { fontFamily: 'Work-Sans-bold' }]} >
                                Definitions
                            </Text> 
                            <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                For the purposes of this Privacy Policy:
                            </Text> 
                            <View style={styles.itemInfoWrapper}>
                                <Icon1 style={styles.dotIcon} name="dot-single" size={25} color="#000" />
                                <Text style={[styles.itemInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Account means a unique account created for You to access our Service or parts of our Service.
                                </Text> 
                            </View>
                            <View style={styles.itemInfoWrapper}>
                                <Icon1 style={styles.dotIcon} name="dot-single" size={25} color="#000" />
                                <Text style={[styles.itemInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                                </Text> 
                            </View>
                            <View style={styles.itemInfoWrapper}>
                                <Icon1 style={styles.dotIcon} name="dot-single" size={25} color="#000" />
                                <Text style={[styles.itemInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to My Tripkit LLC, 58 arbor field way, lake grove, ny 11755 US.
                                </Text> 
                            </View>
                            <View style={styles.itemInfoWrapper}>
                                <Icon1 style={styles.dotIcon} name="dot-single" size={25} color="#000" />
                                <Text style={[styles.itemInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Cookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
                                </Text> 
                            </View>
                            <View style={styles.itemInfoWrapper}>
                                <Icon1 style={styles.dotIcon} name="dot-single" size={25} color="#000" />
                                <Text style={[styles.itemInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Country refers to: New York, United States
                                </Text> 
                            </View>
                            <View style={styles.itemInfoWrapper}>
                                <Icon1 style={styles.dotIcon} name="dot-single" size={25} color="#000" />
                                <Text style={[styles.itemInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                                </Text> 
                            </View>
                            <View style={styles.itemInfoWrapper}>
                                <Icon1 style={styles.dotIcon} name="dot-single" size={25} color="#000" />
                                <Text style={[styles.itemInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Personal Data is any information that relates to an identified or identifiable individual.
                                </Text> 
                            </View>
                        </ScrollView>
                    </View>
                </>
            )}

        </View>
    );
};

export default TermsAndConditionScreen;



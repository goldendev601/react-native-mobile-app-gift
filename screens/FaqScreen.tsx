import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Switch, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect } from '../actions/authActions';
import { getMyProfile } from '../actions/giftAppAction';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
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
    faqContentWrapper: {
        marginTop: 42,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    textLinkWrapper: {
        justifyContent: 'center',
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
    titleInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
    },
    descriptionInfo: {
        marginTop: 20,
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
        fontSize: 14,
        color: '#111',
        fontWeight: '700',
        marginTop: 5
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    textLink: {
    },
});

interface IFaqScreenProps {
    navigation: NavigationProp<any>;
}

const FaqScreen: React.FC<IFaqScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    const [show1, setShow1] = React.useState(true);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    const hideContent1 = () => {
        setShow1(false);
    };
    const showContent1 = () => {
        setShow1(true);
    };

    const hideContent2 = () => {
        setShow2(false);
    };
    const showContent2 = () => {
        setShow2(true);
    };

    const hideContent3 = () => {
        setShow3(false);
    };
    const showContent3 = () => {
        setShow3(true);
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
                        Faq
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <View style={styles.mainContainer}>
                    <ScrollView>
                        <View style={styles.faqContentWrapper}>
                            <Text style={[styles.subTitle, { fontFamily: 'Work-Sans-bold' }]} >
                                Lorem ipsum dolor sit amet
                            </Text> 
                            <Pressable style={styles.textLinkWrapper}>
                                {
                                    show1 ? (
                                        <Icon2 style={styles.textLink} name="chevron-up" size={25} color="#0D1C2E" onPress={hideContent1} />
                                    ) : (
                                        <Icon2 style={styles.textLink} name="chevron-down" size={25} color="#0D1C2E" onPress={showContent1} />
                                    )
                                }
                                
                            </Pressable>
                        </View>
                        {
                            show1 && (
                                <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat dolor, at condimentum maecenas volutpat. Fermentum egestas lectus nulla penatibus. Sed aenean dapibus mauris sed quis a. Lectus felis elit morbi congue risus, tristique nulla amet. Tortor, sem diam, vitae ut lobortis vel bibendum. Nisi, varius proin hendrerit scelerisque placerat elit imperdiet sed nascetur. Leo sed dictumst etiam lobortis. Lectus congue vulputate dui bibendum sodales arcu. Eget ante neque, sed sit.
                                    Nullam euismod dignissim hac cursus vel tortor egestas. Sollicitudin eget vitae non nisl dictum nullam laoreet. Convallis duis ridiculus semper sed vestibulum eu interdum. Venenatis a faucibus ornare feugiat tristique aenean. Et enim, risus quam ut. Amet rhoncus gravida ut ut nunc massa interdum.
                                </Text> 
                            )
                        }
                        <View style={styles.faqContentWrapper}>
                            <Text style={[styles.subTitle, { fontFamily: 'Work-Sans-bold' }]} >
                                Lorem ipsum dolor sit amet
                            </Text> 
                            <Pressable style={styles.textLinkWrapper}>
                                {
                                    show2 ? (
                                        <Icon2 style={styles.textLink} name="chevron-up" size={25} color="#0D1C2E" onPress={hideContent2} />
                                    ) : (
                                        <Icon2 style={styles.textLink} name="chevron-down" size={25} color="#0D1C2E" onPress={showContent2} />
                                    )
                                }
                                
                            </Pressable>
                        </View>
                        {
                            show2 && (
                                <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat dolor, at condimentum maecenas volutpat. Fermentum egestas lectus nulla penatibus. Sed aenean dapibus mauris sed quis a. Lectus felis elit morbi congue risus, tristique nulla amet. Tortor, sem diam, vitae ut lobortis vel bibendum. Nisi, varius proin hendrerit scelerisque placerat elit imperdiet sed nascetur. Leo sed dictumst etiam lobortis. Lectus congue vulputate dui bibendum sodales arcu. Eget ante neque, sed sit.
                                    Nullam euismod dignissim hac cursus vel tortor egestas. Sollicitudin eget vitae non nisl dictum nullam laoreet. Convallis duis ridiculus semper sed vestibulum eu interdum. Venenatis a faucibus ornare feugiat tristique aenean. Et enim, risus quam ut. Amet rhoncus gravida ut ut nunc massa interdum.
                                </Text> 
                            )
                        }
                        <View style={styles.faqContentWrapper}>
                            <Text style={[styles.subTitle, { fontFamily: 'Work-Sans-bold' }]} >
                                Lorem ipsum dolor sit amet
                            </Text> 
                            <Pressable style={styles.textLinkWrapper}>
                                {
                                    show3 ? (
                                        <Icon2 style={styles.textLink} name="chevron-up" size={25} color="#0D1C2E" onPress={hideContent3} />
                                    ) : (
                                        <Icon2 style={styles.textLink} name="chevron-down" size={25} color="#0D1C2E" onPress={showContent3} />
                                    )
                                }
                                
                            </Pressable>
                        </View>
                        {
                            show3 && (
                                <Text style={[styles.descriptionInfo, { fontFamily: 'Work-Sans-regular' }]} >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat dolor, at condimentum maecenas volutpat. Fermentum egestas lectus nulla penatibus. Sed aenean dapibus mauris sed quis a. Lectus felis elit morbi congue risus, tristique nulla amet. Tortor, sem diam, vitae ut lobortis vel bibendum. Nisi, varius proin hendrerit scelerisque placerat elit imperdiet sed nascetur. Leo sed dictumst etiam lobortis. Lectus congue vulputate dui bibendum sodales arcu. Eget ante neque, sed sit.
                                    Nullam euismod dignissim hac cursus vel tortor egestas. Sollicitudin eget vitae non nisl dictum nullam laoreet. Convallis duis ridiculus semper sed vestibulum eu interdum. Venenatis a faucibus ornare feugiat tristique aenean. Et enim, risus quam ut. Amet rhoncus gravida ut ut nunc massa interdum.
                                </Text> 
                            )
                        }
                    </ScrollView>
                </View>
            )}

        </View>
    );
};

export default FaqScreen;



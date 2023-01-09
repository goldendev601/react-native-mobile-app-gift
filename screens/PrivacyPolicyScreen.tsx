import React from 'react';
import { StyleSheet, Pressable, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import Icon2 from 'react-native-vector-icons/Ionicons';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        paddingBottom: 20,
        marginTop: 30
    },
    descriptionWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        paddingBottom: 20,
    },
    description: {
        fontSize: 14,
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    descriptionList: {
        fontSize: 14,
        justifyContent: 'flex-start',
    },
    subTitle: {
        fontSize: 14,
        justifyContent: 'flex-start',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        justifyContent: 'flex-start',
    },
    helpText: {
        fontSize: 16,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
    },
    socialButtonText: {
        textTransform: 'uppercase',
        paddingHorizontal: 20,
    },
    signinButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF"
    },
    fieldWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10
    },
    fieldCheckboxWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10
    },
    fieldLabel: {
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: '800',
        paddingBottom: 5,
    },
    fieldDescription: {
        fontSize: 14,
        fontWeight: 'normal',
        paddingBottom: 5,
        marginLeft: 10,
        paddingRight: 30
    },
    iconStyle: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
    fieldInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 16,
        padding: 10,
        color: '#2CAF4D',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 40,
    },
    errorMessageAlert: {
        fontSize: 10,
        color: '#cc3300',
        fontStyle: 'italic',
        paddingTop: 4,
        paddingBottom: 4,
        textAlign: 'center'
    },
    fieldInputCheckbox: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 16,
        padding: 10,
        color: '#2CAF4D',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginLeft: 50
    },
    signupButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        padding: 16,
        fontSize: 15,
        fontWeight: "700",
        height: 50,
        borderRadius: 14,
        width: "85%",
        marginTop: 16,
    },
    greenButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2CAF4D',
        fontSize: 15,
        fontWeight: '700',
        height: 50,
        borderWidth: 0,
        borderColor: '#fff',
        borderRadius: 50,
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
    },
    textLink: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'right'
    },
    textLinkArrow: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: '600',
        fontSize: 25,
    }
});

interface IPrivacyPolicyScreenProps {
    navigation: NavigationProp<any>;
}

const PrivacyPolicyScreen: React.FC<IPrivacyPolicyScreenProps> = (props) => {
    const { navigation } = props;
    const bgColor = useThemeColor({}, 'background');


    const gotoLogin = () => {
        navigation.navigate('LoginScreen');
    };

    const gotoSignup = () => {
        navigation.navigate('SignupScreen');
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={[styles.scrollContainer, { backgroundColor: bgColor }]}
            keyboardShouldPersistTaps='handled'
        >
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon2 style={styles.textLinkArrow} name="arrow-back" />
                    </Pressable>
                    <Pressable style={styles.textLinkWrapper} onPress={gotoLogin}>
                        <Text style={styles.textLink}>LOGIN</Text>
                    </Pressable>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Privacy Policy</Text>
                </View>
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>
                        Last updated: October 06, 2021
                    </Text>
                    <Text style={styles.description}>
                        This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                    </Text>
                    <Text style={styles.description}>
                        We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.
                    </Text>
                    <Text style={styles.subTitle}>    
                        Interpretation and Definitions
                    </Text>
                    <Text style={styles.subTitle}>   
                        Interpretation
                    </Text>
                    <Text style={styles.description}>   
                        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </Text>
                    <Text style={styles.subTitle}>   
                        Definitions
                    </Text>
                    <Text style={styles.description}>   
                        For the purposes of this Privacy Policy:
                    </Text> 
                    <Text style={styles.description}>                     
                        - Account means a unique account created for You to access our Service or parts of our Service.
                    </Text> 
                    <Text style={styles.description}> 
                        - Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                    </Text> 
                    <Text style={styles.description}>     
                        - Application means the software program provided by the Company downloaded by You on any electronic device, named Lucia
                    </Text> 
                    <Text style={styles.description}>     
                        - Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to My Tripkit LLC, 58 arbor field way, lake grove, ny 11755 US.
                    </Text> 
                    <Text style={styles.description}>     
                        - Cookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
                    </Text> 
                    <Text style={styles.description}> 
                        - Country refers to: New York, United States
                    </Text> 
                    <Text style={styles.description}> 
                        - Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                    </Text> 
                    <Text style={styles.description}> 
                        - Personal Data is any information that relates to an identified or identifiable individual.
                    </Text>
                </View>
                <Pressable style={styles.signupButton} onPress={gotoSignup}>
                    <Text style={styles.signinButtonText}>Accept Terms</Text>
                </Pressable>

            </View>
        </ScrollView>
    );
};

export default PrivacyPolicyScreen;

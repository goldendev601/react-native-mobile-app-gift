import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput, Switch, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { addContact, clearDeleteContactState, deleteContact, getContactList, updateContact } from '../actions/giftAppAction';
import { IRootState } from '../reducers';


interface IDeleteContactScreenProps {
    navigation: NavigationProp<any>;
}

const DeleteContactScreen: React.FC<IDeleteContactScreenProps> = (props) => {

    const dispatch = useDispatch();

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const { contactInfo, isDeleteContactSuccess } = useSelector((state: IRootState) => state.giftApp);

    const closeModal = () => {
        props.navigation.goBack();
    };
    
    const deleteContactHandle = () => {
        console.log(contactInfo);
        dispatch(deleteContact(contactInfo.id));
    }

    React.useEffect(() => {
        dispatch(clearDeleteContactState());
    }, [])

    React.useEffect(() => {
        if (isDeleteContactSuccess) {
            console.log(isDeleteContactSuccess);
            dispatch(getContactList());
            props.navigation.navigate('ContactListScreen');
            dispatch(clearDeleteContactState());
        }
    }, [isDeleteContactSuccess])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.flex}
        >
            {
                fontsLoaded && (
                    <>
                        <View style={styles.container}>
                            <ScrollView
                                contentContainerStyle={{ flexGrow: 1 }}
                                style={[styles.scrollContainer]}
                                keyboardShouldPersistTaps='handled'
                            >
                                <View style={styles.headerContainer} >
                                    <View style={styles.headerTitleContainer}>
                                        <Text style={[styles.headerTitle, {fontFamily: 'Work-Sans'}]}>Remove Contact</Text>
                                    </View>
                                    <Pressable onPress={closeModal} style={styles.iconStyle2}>
                                        <Icon3 name="close" size={20} color="#000" />
                                    </Pressable>
                                </View>
                                <Text style={[styles.headerDescription, {fontFamily: 'Work-Sans-regular'}]}>
                                Are you sure you want to remove {contactInfo.first_name}? 
                                </Text>
                                <Text style={[styles.headerDescription, {fontFamily: 'Work-Sans-regular'}]}>
                                    This action cannot be undone.
                                </Text>
                                <View style={styles.buttonContainer} >
                                    <Pressable style={styles.sendButton2} onPress={closeModal}>
                                        <Text style={[styles.sendButtonText2, {fontFamily: 'Work-Sans-regular'}]}>CANCEL</Text>
                                    </Pressable>
                                    <Pressable style={styles.sendButton} onPress={deleteContactHandle}>
                                        <Text style={[styles.sendButtonText, {fontFamily: 'Work-Sans-regular'}]}>REMOVE</Text>
                                    </Pressable>
                                </View>
                            </ScrollView>
                        </View>
                    </>
                )
            }
            
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
        height: 250,
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center',
    },
    headerTitleContainer: {
        width: '100%',
        height: 50,
        textAlign: 'center',
        marginTop: 20
    },
    iconStyle2: {
        position: 'absolute',
        zIndex: 99,
        right: 0,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitle: {
        color: '#111111',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center' 
    },
    headerDescription: {
        color: '#111111',
        fontSize: 14,
        fontWeight: '400',
        paddingLeft: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    errorMessageAlert: {
        fontSize: 10,
        color: '#cc3300',
        fontStyle: 'italic',
        marginTop: 4,
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 24,
        width: '100%',
    },
    iconStyle: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fieldInput: {
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 16,
        color: '#2CAF4D',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 40,
    },
    
    image: {
        width: '100%',
    },
    iconImage: {
        width: 30,
        height: 30
    },
    fieldCheckboxWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginBottom: 50,
        marginTop: 25,
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
    },
    fieldDescription: {
        fontSize: 14,
        fontWeight: 'normal',
        paddingBottom: 5,
        marginLeft: 10,
        paddingRight: 30,
        marginTop: 5
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF",
        fontSize: 16,
        lineHeight: 24
    },
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        fontSize: 15,
        fontWeight: "700",
        height: 56,
        borderRadius: 14,
        width: '48%',
    },
    sendButtonText2: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#7B61FF",
        fontSize: 16,
        lineHeight: 24
    },
    sendButton2: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        fontSize: 15,
        fontWeight: "700",
        height: 56,
        borderRadius: 14,
        width: '48%',
        borderWidth: 1,
        borderColor: "#7B61FF",
        borderStyle: 'solid'
    },
});

export default DeleteContactScreen;

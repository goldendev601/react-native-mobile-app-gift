import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { IRootState } from '../reducers';
import { addThankyouWithMessage, setThanksNoteInfo, updateThankyou } from '../actions/giftAppAction';


interface IAddThankyouNote1ScreenProps {
    navigation: NavigationProp<any>;
}

const AddThankyouNote1Screen: React.FC<IAddThankyouNote1ScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { latestThankyou, isUpdateThankyouSuccess } = useSelector((state: IRootState) => state.giftApp);

    const [message, setMessage] = React.useState('');

    useEffect(() => {
        if (latestThankyou) {
            setMessage(latestThankyou.message);
        }
    }, [latestThankyou])

    const updateThanksNote = () => {
        console.log(latestThankyou.id);
        if (latestThankyou && latestThankyou.id) {
            dispatch(updateThankyou(
                latestThankyou.id,
                message
            ));
        }
    };

    useEffect(() => {
        if (isUpdateThankyouSuccess) {
            props.navigation.navigate('EventDetailScreen', { screen: 'ThanksResumePaymentScreen' });
        }
    }, [isUpdateThankyouSuccess])

    const closeModal = () => {
        props.navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.flex}
            >
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
                        <Text style={styles.headerTitle}>Thank you card</Text>
                    </View>
                    <View style={styles.textLinkWrapper}>
                    </View>
                </View>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.qrImageContainer}>
                        <Image
                            source={require("../assets/images/thankyou-note.png")}
                            style={styles.qrImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Message</Text>
                    </View>
                    <View style={styles.messageContentContainer}>
                        <TextInput
                            multiline
                            value={message}
                            style={styles.fieldInput}
                            placeholder="Enter your message"
                            onChangeText={(text) => setMessage(text)}
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer} >
                    <Pressable style={styles.sendButton} onPress={updateThanksNote}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        backgroundColor: '#fff',
        height: '100%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerContainer: {
        marginTop: 30,
        paddingLeft: 30,
        paddingRight: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 100
    },
    notificationContainer: {
        width: '100%',
        textAlign: 'center'
    },
    headerTitle: {
        color: '#7B61FF',
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    errorMessageAlert: {
        fontSize: 15,
        color: '#cc3300',
        fontStyle: 'italic',
        marginTop: 4,
        textAlign: 'center'
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
        width: 32,
        backgroundColor: 'transparent'
    },
    qrImageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrImage: {
        width: 396,
        height: 504
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    
    detailInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 18
    }, 
    eventTitle: {
        fontSize: 24,
        textAlign: 'left',
        color: '#111',
        fontWeight: '700',
    },
    calendarInfo: {
        color: 'rgba(17, 17, 17, 0.4)',
        fontSize: 16,
        paddingLeft: 10
    },
    headerTitleContainer: {
        marginTop: 20,
        height: 50,
        textAlign: 'center',
        paddingTop: 3,        
    },
    iconDiv: {
        position: 'absolute',
        top: 60,
        left: 30
    },
    labelInfo: {
        fontSize: 16,
        color: '#111',
        fontWeight: '600'
    },
    descriptionInfo: {
        marginTop: 12,
        color: 'rgba(17, 17, 17, 0.4)',
        fontSize: 14,
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
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
    titleContainer: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 30
    },
    title: {
        fontSize: 16,
        color: '#111111',        
    },
    messageContentContainer: {        
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 50  
    },
    fieldInput: {
        height: 200,
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

});

export default AddThankyouNote1Screen;

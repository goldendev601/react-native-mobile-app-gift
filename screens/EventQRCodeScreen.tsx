import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { IRootState } from '../reducers';
import { getEventDetail, setEventInfo } from '../actions/giftAppAction';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import { handleMessage } from '../actions/commonAction';



interface IEventQRCodeScreenProps {
    navigation: NavigationProp<any>;
}

const EventQRCodeScreen: React.FC<IEventQRCodeScreenProps> = (props) => {

    const dispatch = useDispatch();
    const [status, requestPermission] = MediaLibrary.usePermissions()

    useEffect(() => {
        requestPermission()
    }, [])

    useEffect(() => {
        console.log(status)
    }, [status])

    const [isDownloaded, setIsdownloaded] = React.useState(false);

    const { eventInfo } = useSelector((state: IRootState) => state.giftApp);
    const { eventDetailInfo } = useSelector((state: IRootState) => state.giftApp);

    const saveFile = async (fileUri: string) => {
        // const permission = await Notifications.requestPermissionsAsync();
        const permission = await MediaLibrary.requestPermissionsAsync();
        console.log('=========permission.granted===========');
        console.log(permission.granted);
        console.log('===========permission.canAskAgain=========');
        console.log(permission.canAskAgain);
        console.log('============permission.status============');
        console.log(permission.status);
        if (!permission.canAskAgain || permission.status === "denied") {
            dispatch(handleMessage(true, 'error', 'You have no permission for media libarary')); 
        } else {
            if (permission.granted) {
                const asset = await MediaLibrary.createAssetAsync(fileUri)
                return await MediaLibrary.createAlbumAsync("Download", asset, false)
            }
        }
        
        return false
    }

    const downloadFile = (uri: string) => {
        console.log(uri);
        let fileUri = FileSystem.documentDirectory + "gift_qr_code.jpg";
        FileSystem.downloadAsync(uri, fileUri)
        .then(async ({ uri }) => {
            const result = await saveFile(uri);
            console.log(result)
            if (result) {
                setIsdownloaded(true);
                console.log('downloaded!');
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    

    useEffect(() => {
        if (eventInfo) {
            const event_id = eventInfo.id;
            dispatch(getEventDetail(event_id))
        }
    }, [eventInfo])


    const closeModal = () => {
        props.navigation.goBack();
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
                    <Text style={styles.headerTitle}>QR code</Text>
                </View>
                <View style={styles.textLinkWrapper}>
                </View>
            </View>
            <View style={styles.mainContainer}>
                {
                    eventDetailInfo && (
                        <View style={styles.qrImageContainer}>
                            <Image
                                source={{
                                    uri: eventDetailInfo.qr_code_url,
                                }}
                                style={styles.qrImage}
                                resizeMode="cover"
                            />
                        </View>
                        
                    )
                }                
            </View>
            {isDownloaded && (
                <View style={styles.notificationContainer}>
                    <Text style={styles.errorMessageAlert}>
                        Your QR code has been downloaded.
                    </Text>
                    <Text style={styles.errorMessageAlert}>
                        Please check Recents folder in your Albums.
                    </Text>
                </View>
            )}
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={() => downloadFile(eventDetailInfo.qr_code_url)} >
                    <Text style={styles.sendButtonText}>Download qr code</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        height: 100,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    mainContainer: {
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 50,
        paddingTop: 30,
        height: 460
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
    textLinkWrapper: {
        justifyContent: 'center',
        width: 32,
        backgroundColor: 'transparent',
        marginTop: 50
    },
    errorMessageAlert: {
        fontSize: 15,
        color: '#cc3300',
        fontStyle: 'italic',
        marginTop: 4,
        textAlign: 'center'
    },
    qrImageContainer: {
        width: '100%',
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrImage: {
        width: 250,
        height: 250
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
        height: 150,
        textAlign: 'center',
        justifyContent: 'center',
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
        bottom: 30,
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

});

export default EventQRCodeScreen;

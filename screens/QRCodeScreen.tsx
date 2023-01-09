import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import ImageView from "react-native-image-viewing";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import { handleMessage } from '../actions/commonAction';


interface IQRCodeScreenProps {
    navigation: NavigationProp<any>;
}

const QRCodeScreen: React.FC<IQRCodeScreenProps> = (props) => {

    const dispatch = useDispatch();
    const [status, requestPermission] = MediaLibrary.usePermissions()

    const [isDownloaded, setIsdownloaded] = React.useState(false);

    useEffect(() => {
        requestPermission()
    }, [])

    useEffect(() => {
        console.log(status)
    }, [status])

    const closeModal = () => {
        props.navigation.goBack();
    };

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    // const [visible, setIsVisible] = useState(false);

    // const downloadQRCode = () => {
    //     setIsVisible(true);
    // };

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

    const { latestEvent } = useSelector((state: IRootState) => state.giftApp)  
    const qrImages = [latestEvent.qr_code_url];
    console.log(qrImages) 
    

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <Pressable onPress={closeModal}>
                    <Image
                        source={require("../assets/images/close.png")}
                        style={styles.iconImage}
                        resizeMode="cover"
                    />                    
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>QR CODE</Text>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.imageContentContainer}>
                    <Image
                        source={{
                            uri: latestEvent.qr_code_url,
                        }}
                        style={styles.image}
                        resizeMode="cover"
                    />
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
                    <Pressable style={styles.sendButton} onPress={() => downloadFile(latestEvent.qr_code_url)}>
                        <Text style={styles.sendButtonText}>Download QR Code</Text>
                    </Pressable>
                </View>
            </View>

            {/* <ImageView
                images={qrImages}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            /> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 30,
        maxHeight: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitle: {
        color: '#7B61FF',
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 12
    },
    errorMessageAlert: {
        fontSize: 15,
        color: '#cc3300',
        fontStyle: 'italic',
        marginTop: 4,
        textAlign: 'center'
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        justifyContent: 'center'
    },
    thanksContainer: {
        width: '100%',
        marginTop: 30
    }, 
    headerTitleContainer: {
        width: 220,
        height: 50,
        textAlign: 'center',
        paddingTop: 3,
    },
    descriptionContainer: {
        width: '100%',
        marginTop: 20
    },
    descriptionText: {
        color: '#111',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center'
    },
    thanksText: {
        textAlign: 'center',
        color: '#7B61FF',
        fontSize: 28,
        fontWeight: 'bold'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: 'transparent'
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF",
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
        textAlign: 'center'
    },
    imageContentContainer: {
        marginTop: 50,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center'
    },
    image: {
        width: 119,
        height: 119,
    },
    notificationContainer: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    },
    iconImage: {
        width: 30,
        height: 30
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
        marginTop: 50
    },
    textLink: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: '800',
        fontSize: 14,
        textAlign: 'center',
        textTransform: "uppercase",
        paddingHorizontal: 20,
    }
});

export default QRCodeScreen;

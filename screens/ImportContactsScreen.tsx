import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import { clearContactState, getContactList, getFavoriteContactList, getFilteredContactList, importContactInfoList, setImportedContactInfo, setMembersInfo } from '../actions/giftAppAction';
import { IRootState } from '../reducers';
import CheckBox from 'react-native-check-box'
import Icon2 from 'react-native-vector-icons/EvilIcons';
import * as Contacts from 'expo-contacts';
import { handleMessage } from '../actions/commonAction';


interface IImportContactsScreenProps {
    navigation: NavigationProp<any>;
}

const ImportContactsScreen: React.FC<IImportContactsScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { importedContactInfo, isImportContactsSuccess } = useSelector((state: IRootState) => state.giftApp);
    const [toggleCheckBox, setToggleCheckBox] = React.useState<number[]>([])
    const [filteredContactList, setFilteredContactList] = React.useState<[]>([]);

    const [selectedCount, setSelectedCount] = React.useState(0);

    const closeModal = () => {
        props.navigation.goBack();
    };

    const clickContact = (contact_id: number) => {
        if (toggleCheckBox.indexOf(contact_id) >= 0) {
            setToggleCheckBox(toggleCheckBox.filter(checkedId => checkedId != contact_id))
        } else {
            setToggleCheckBox([...toggleCheckBox, contact_id])
        }
    };

    useEffect(() => {
        if (toggleCheckBox) {
            setSelectedCount(toggleCheckBox.length);
        }
    }, [toggleCheckBox])

    const importContacts = () => {
        
        const contacts = importedContactInfo.importedContactInfo.filter((contact: any) => toggleCheckBox.includes(contact.id))
        
        const formData = new FormData();
        for (let i = 0; i < contacts.length; i ++) {
            console.log(contacts[i]);
            if (contacts[i].firstName && contacts[i].lastName) {
                formData.append(`contact[${i}][name]`, contacts[i].firstName + ' ' + contacts[i].lastName)
                if (contacts[i].emails && contacts[i].emails.length > 0) {
                    formData.append(`contact[${i}][email]`, contacts[i].emails[0].email)
                }
                if (contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0) {
                    formData.append(`contact[${i}][phone]`, contacts[i].phoneNumbers[0].number.replaceAll('-', '').replace('(', '').replace(')', '').replaceAll(' ', ''))
                }
            }
            if (contacts[i].firstName && !contacts[i].lastName) {
                formData.append(`contact[${i}][name]`, contacts[i].firstName)
                if (contacts[i].emails && contacts[i].emails.length > 0) {
                    formData.append(`contact[${i}][email]`, contacts[i].emails[0].email)
                }
                if (contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0) {
                    formData.append(`contact[${i}][phone]`, contacts[i].phoneNumbers[0].number.replaceAll('-', '').replace('(', '').replace(')', '').replaceAll(' ', ''))
                }
            }
            if (!contacts[i].firstName && contacts[i].lastName) {
                formData.append(`contact[${i}][name]`, contacts[i].lastName)
                if (contacts[i].emails && contacts[i].emails.length > 0) {
                    formData.append(`contact[${i}][email]`, contacts[i].emails[0].email)
                }
                if (contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0) {
                    formData.append(`contact[${i}][phone]`, contacts[i].phoneNumbers[0].number.replaceAll('-', '').replace('(', '').replace(')', '').replaceAll(' ', ''))
                }
            }
            if (!contacts[i].firstName && !contacts[i].lastName && contacts[i].company) {
                formData.append(`contact[${i}][name]`, contacts[i].company)
                if (contacts[i].emails && contacts[i].emails.length > 0) {
                    formData.append(`contact[${i}][email]`, contacts[i].emails[0].email)
                }
                if (contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0) {
                    formData.append(`contact[${i}][phone]`, contacts[i].phoneNumbers[0].number.replaceAll('-', '').replace('(', '').replace(')', '').replaceAll(' ', ''))
                }
            }
            if (!contacts[i].firstName && !contacts[i].lastName && !contacts[i].company) {
                dispatch(handleMessage(true, 'error', 'Sorry, You can not import these contacts. The contact should have one of first name, last name and company.'));
            }
        }
        dispatch(importContactInfoList(formData));
    };

    useEffect(() => {
       if(isImportContactsSuccess) {
            dispatch(getContactList());
            props.navigation.navigate('ContactListScreen');
            dispatch(clearContactState());
       }
    }, [isImportContactsSuccess])

    useEffect(() => {
        if (importedContactInfo && 'importedContactInfo' in importedContactInfo && importedContactInfo.importedContactInfo) {
            setFilteredContactList(importedContactInfo.importedContactInfo);
        }
    }, [importedContactInfo]);

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync();
            if (data.length > 0) { 
              data.sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)))
              dispatch(setImportedContactInfo({
                importedContactInfo: data,
              }));
            }
          }
        })();
    }, []);

    const handleSearchChange = (value: string) => {
        let filteredContact = importedContactInfo.importedContactInfo;
        if (value) {
            filteredContact = importedContactInfo.importedContactInfo.filter((a) => (a.name && a.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) || (a.emails && a.emails.some((emailItem) => emailItem.email.toLowerCase().indexOf(value.toLowerCase()) >= 0)))
        }
        setFilteredContactList(filteredContact);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={closeModal}>
                    <Image
                        source={require("../assets/images/close.png")}
                        style={styles.iconCloseImage}
                        resizeMode="cover"
                    />
                </Pressable>
                <View style={styles.fieldWrapper}>
                    <Icon2 style={styles.iconStyle} name="search" size={20} color="#000" />
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Search Contact"
                        onChangeText={(text) => handleSearchChange(text)}
                    />
                </View>
            </View>

            {
                (filteredContactList.length > 0) ? (
                    <>
                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.dateInfo}>
                                Import Contacts
                            </Text>
                            <Text style={[styles.selectedInfoTxt, {fontFamily: 'Work-Sans'}]}>
                                ({selectedCount}) selected
                            </Text>
                        </View>
                        
                        <ScrollView style={styles.mainContainer}>
                            <View
                                style={styles.movementsContainer}
                            >
                                <View style={styles.movementListContainer}>
                                    {filteredContactList.length > 0  && filteredContactList.map((contact, index) => {
                                        return (
                                            <>
                                                <Pressable style={styles.eventInfoContainer} key={index} onPress={() => clickContact(contact.id)}>
                                                    <View style={styles.nameInfoContainer}>
                                                        <Image
                                                            source={{
                                                                uri: 'https://givegiftd.s3.us-east-1.amazonaws.com/default/profile_picture.png',
                                                            }}
                                                            style={styles.profileImage}
                                                        />
                                                    </View>
                                                    <View style={styles.fullNameInfoContainer}>
                                                        <Text style={styles.fullNameInfo}>
                                                            {contact.firstName} {contact.lastName}
                                                        </Text>
                                                        {
                                                            (contact.emails && contact.emails.length > 0) ? (
                                                                <Text style={styles.emailInfo}>
                                                                    {contact.emails[0].email}
                                                                </Text>
                                                            ) : (
                                                                <Text style={styles.emailInfo}>
                                                                    {contact.phoneNumbers ? contact.phoneNumbers[0].number : ''}
                                                                </Text>
                                                            )
                                                        }
                                                        
                                                    </View>
                                                    <View style={styles.priceInfoContainer}>
                                                        <CheckBox
                                                            onClick={() => {
                                                                clickContact(contact.id);
                                                            }}
                                                            isChecked={toggleCheckBox.indexOf(contact.id) >= 0}
                                                            leftText={"CheckBox"}
                                                        />
                                                    </View>
                                                </Pressable>
                                            </>
                                        )
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                        {
                            selectedCount > 1 && (
                                <View style={styles.buttonContainer} >
                                    <Pressable style={styles.sendButton} onPress={importContacts}>
                                        <Text style={styles.sendButtonText}>Add ({selectedCount}) contacts</Text>
                                    </Pressable>
                                </View>
                            )
                        }
                        {
                            selectedCount === 1 && (
                                <View style={styles.buttonContainer} >
                                    <Pressable style={styles.sendButton} onPress={importContacts}>
                                        <Text style={styles.sendButtonText}>Add ({selectedCount}) contact</Text>
                                    </Pressable>
                                </View>
                            )
                        }
                        
                    </>
                ) : (
                    <>
                        <Text style={styles.dateInfo}>
                            Contacts
                        </Text>
                        <View style={styles.blankContainer}>
                            <Image
                                source={require("../assets/images/address_book.png")}
                                style={{width: 90, height: 90}}
                                resizeMode="cover"
                            />
                            <Text style={styles.blankText}>Don’t have contacts</Text>
                        </View>
                    </>
                    
                )
            }
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        height: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    textContainer: {
        width: '85%',
        textAlign: 'left'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    movementListContainer: {
        width: '100%',
        paddingTop: 20
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    buttonTitleInfo: {
        fontSize: 14,
        color: '#7B61FF',
        fontWeight: '600'
    },
    newContactContainer: {
        width: '50%',
        paddingRight: 10
    },
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden'
    },
    newContactButton: {
        backgroundColor: 'rgba(123, 97, 255, 0.3)',
        borderRadius: 10,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanQrButton: {
        backgroundColor: 'rgba(123, 97, 255, 0.3)',
        borderRadius: 10,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanQrContainer: {
        width: '50%',
        paddingLeft: 10
    },
    headerTitleInfo: {
        fontSize: 20,
        color: '#FFF',
        marginLeft: 20,
        marginTop: 60
    },
    headerPriceInfo: {
        fontSize: 60,
        color: '#FFF',
        marginLeft: 20,
        marginTop: 24
    },
    mainContainer: {
        width: '100%',
        marginTop: 21
    },
    favoritesContainer: {
        height: 100,
        width: '100%',
        overflow: "hidden",
        marginTop: 20
    },
    eventsContainer: {
        width: '100%',
        overflow: "hidden"
    },
    headerTitleContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    movementsContainer: {
        width: '100%',
        overflow: "hidden"
    },
    favoriteInfoListContainer: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
    },
    image: {
        width: "100%",
        height: "100%"
    },
    eventImage: {
        width: "100%",
        height: "100%"
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        paddingBottom: 20,
        marginTop: 30
    },
    title: {
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        fontWeight: '600',
        justifyContent: 'flex-start',
    },
    dateInfo: {
        fontSize: 16,
        color: '#111111',
        fontStyle: 'normal',
        fontWeight: '600',
        marginTop: 40
    },
    selectedInfoTxt: {
        fontSize: 16,
        color: '#7B61FF',
        fontStyle: 'normal',
        fontWeight: '600',
        marginTop: 40
    },
    favoriteTitleInfo: {
        fontSize: 16,
        color: '#111111',
        fontStyle: 'normal',
        fontWeight: '600',
        paddingBottom: 10
    },
    helpText: {
        fontSize: 16,
    },
    iconImage: {
        width: 30,
        height: 30
    },
    iconCloseImage: {
        width: 30,
        height: 30,
        marginTop: 5
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
        marginLeft: 10
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
    slideContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        padding: 0
    },
    slideImage: {
        width: '80%',
        height: '90%',
    },
    eventImageContainer: {
        height: 280,
        overflow: 'hidden'
    },
    eventInfoContainer: {
        height: 70,
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
    },
    favoriteInfoContainer: {
        height: 32,
        width: 80,
    },
    nameInfoContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(123, 97, 255, 0.3)',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoInfoContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(123, 97, 255, 0.3)',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    favoriteFullNameInfoContainer: {
        width: 80,
        textAlign: 'center'
    },
    fullNameInfoContainer: {
        width: '60%',
        paddingLeft: 12
    },
    fullNameInfo: {
        fontSize: 14,
        color: '#111',
    },
    nameInfo: {
        fontSize: 12,
        color: '#7B61FF',
        textAlign: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    photoInfo: {
        fontSize: 12,
        color: '#7B61FF',
        textAlign: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    emailInfo: {
        fontSize: 12,
        color: '#111',
        opacity: 0.5
    },
    priceInfoContainer: {
        marginLeft: 'auto'
    },
    priceInfo: {
        fontSize: 18,
        color: '#111'
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
    blankContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '70%'
    },
    blankText: {
        color: 'rgba(17, 17, 17, 0.4)',
        marginTop: 30,
        fontSize: 14
    }

});

export default ImportContactsScreen;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Modal, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import {
  clearPaymentMethodState,
  clearStripeDashboardInfo,
  clearThanksNoteState,
  clearTransactionDetailSuccess,
  getDashBoardInfo,
  getMyProfile,
  getPaymentMethods,
  getTransactionDetail,
  setEventInfo,
} from '../actions/giftAppAction';
import { IRootState } from '../reducers';
import TransactionDetailModal from '../components/TransactionDetailModal';
import { useFonts } from 'expo-font';
import Icon3 from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#7B61FF',
  },
  container: {
    backgroundColor: '#7B61FF',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    width: '100%',
    flexDirection: 'column',
  },
  textContainer: {
    width: '85%',
    textAlign: 'left',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50,
  },
  movementListContainer: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1
  },
  headerContainer: {
    height: 120,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainerBlurry: {
    height: 120,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    opacity: 0.3,
  },
  headerContent: {
    position: 'absolute',
    top: 20,
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerTitleInfo: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: 20,
    marginTop: 60,
  },
  headerPriceInfo: {
    fontSize: 60,
    color: '#FFF',
    marginLeft: 20,
    marginTop: 24,
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // overflow: 'hidden',
  },
  mainContainerBlurry: {
    height: 580,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    opacity: 0.3,
  },
  eventsContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  movementsContainer: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 120
  },
  image: {
    width: '100%',
    height: '100%',
  },
  logoImage: {
    width: 110,
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 21,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    fontWeight: '600',
    justifyContent: 'flex-start',
  },
  dateInfo: {
    fontSize: 14,
    color: '#111111',
    paddingLeft: 20,
    paddingRight: 20,
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
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
  },
  fieldWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  fieldCheckboxWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
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
    paddingRight: 30,
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
    textAlign: 'center',
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
    marginLeft: 50,
  },
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B61FF',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 14,
    width: '85%',
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
    padding: 20,
    position: 'absolute',
    zIndex: 99,
    right: 0,
    justifyContent: 'center',
  },
  textLink: {
    textDecorationStyle: 'solid',
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right',
  },
  iconStyle: {
    padding: 20,
    position: 'absolute',
    zIndex: 99,
    right: 0,
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
    padding: 0,
  },
  slideImage: {
    width: '80%',
    height: '90%',
  },
  eventImageContainer: {
    height: 280,
    overflow: 'hidden',
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
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden'
  },
  buttonImage: {
    width: 70,
    height: 70,
  },
  cardImage: {
    width: 59,
    height: 59
  },
  nameInfoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullNameInfoContainer: {
    width: '60%',
    paddingLeft: 12,
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
    display: 'flex',
  },
  emailInfo: {
    fontSize: 12,
    color: '#111',
    opacity: 0.5,
  },
  priceInfoContainer: {
    marginLeft: 'auto',
  },
  priceInfo: {
    fontSize: 18,
    color: '#111',
  },
  priceInfo1: {
    fontSize: 18,
    color: '#FF6C6C',
  },
  blankTextContainer: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '45%',
  },
  notificationInfo: {
    fontSize: 14,
    color: 'rgba(17, 17, 17, 0.4)',
    textAlign: 'center',
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  paymentNotificationInfo: {
    fontSize: 12,
    color: 'rgba(17, 17, 17, 0.4)',
    textAlign: 'left',
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginLeft: 15  
  },
  notificationTitle: {
    fontSize: 18,
    lineHeight: 20,
    color: '#111',
    textAlign: 'center',
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  blankInfoContainer: {
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1
  },
  paymentNotificationContainer: {
    width: '100%',
    height: 140,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  paymentNotification: {
    width: '100%',
    borderTopColor: 'rgba(17, 17, 17, 0.4)',
    borderTopWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paymentNotificationTextContainer: {
    width: '70%',
    height: 140,
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentNotificationTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#111',
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: 25,
    width: 188,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#7B61FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    marginTop: 5,
    width: 250,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#7B61FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitleInfo: {
    fontSize: 14,
    color: '#7B61FF',
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#FFF',
    borderColor: '#7B61FF',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  buttonText: {
    color: '#7B61FF',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalText: {
    color: 'rgba(17, 17, 17, 0.4)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    color: '#111',
    fontSize: 28,
    lineHeight: 40,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryItemListContainer: {
    flexDirection: 'row',
  },
  categoryItemContainer: {
    marginRight: 15,
  },
  categoryItemInfo: {
    width: 220,
    height: 280,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  categoryContainer: {
    paddingLeft: 30,
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
  },
  eventTitleInfo: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
    position: 'absolute',
    bottom: 15,
    left: 15,
    zIndex: 10,
  },
  dataInfo: {
    paddingTop: 20,
    fontSize: 14,
    lineHeight: 30,
    color: '#111',
    opacity: 0.4
  }
});

interface IHomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<IHomeScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const bgColor = useThemeColor({}, 'background');

  const { userStatus } = useSelector((state: IRootState) => state.auth);

  const [transactionVisible, setTransactionVisible] = useState(false);
  const [transactionId, setTransactionId] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentNoteVisible, setpaymentNoteVisible] = useState(false);

  const {
    myProfile,
    dashboardInfo,
    paymentMethodList,
    isPaymentMethodLoading,
    isDashBoardInfoLoading,
    transactionDetailSuccess
  } = useSelector((state: IRootState) => state.giftApp);

  useEffect(() => {
    dispatch(getMyProfile())
    dispatch(getDashBoardInfo());
    dispatch(clearPaymentMethodState());
    dispatch(clearStripeDashboardInfo());
    dispatch(getPaymentMethods());
    dispatch(clearThanksNoteState());
    setpaymentNoteVisible(false);
    console.log('============myProfile========');
    console.log(myProfile);
    console.log('============userStatus========');
    console.log(userStatus);
  }, []);

  const handleTranactionDetailShow = (id: number) => {
    dispatch(getTransactionDetail(id));
  };

  useEffect(() => {
    console.log('====transactionDetailSuccess======');
    console.log(transactionDetailSuccess);
    if (transactionDetailSuccess) {
      setTransactionVisible(true);
    }
  }, [transactionDetailSuccess]);

  const option = {
    month : 'long',
    day : 'numeric'    
  }

  const dateToMyDate = (date: any) => {
    var d = date.substr(0, 10);
    var z = new Date(d).toTimeString().split(' ')[1];
    return new Date(d + 'T00:00:00.000' + z.substr(-5, 3) + ":" + z.substr(-2));
  }

  const sendGift = () => {
    props.navigation.navigate('AddEventScreen');
  };

  const sendThanksNote = () => {
    props.navigation.navigate('SelectPaymentMethodFromHomeScreen');
  }

  const onHide = () => {
    setTransactionVisible(false);
    dispatch(clearTransactionDetailSuccess());
  }

  const sengotoPaymentMethodSettingdGift = (modalVisible: Boolean) => {
    navigation.navigate('ProfileScreen', { screen: 'AddPayment' });
    setModalVisible(!modalVisible);
  };

  let [fontsLoaded] = useFonts({
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf')
  });

  useEffect(() => {
    if (!isPaymentMethodLoading && paymentMethodList.length === 0) {
      setModalVisible(false);
    } else {
      setModalVisible(false);
    }
  }, [paymentMethodList, isPaymentMethodLoading]);


  return (
    <View style={styles.scrollContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../assets/images/credit-card.png')}
              style={{ width: 134 }}
              resizeMode="contain"
            />
            {
              fontsLoaded && (
                <>
                  <Text style={[styles.modalTitle, {fontFamily: 'Work-Sans'}]}>Set up payment account</Text>
                  <Text style={[styles.modalText, {fontFamily: 'Work-Sans'}]}>
                    Before sending your first Gift please enter your credit or debit card details.
                  </Text>
                </>
              )
            }
            
            <Pressable
              onPress={() => sengotoPaymentMethodSettingdGift(modalVisible)}
            >
              <View style={styles.modalButtonContainer}>
                <Text style={styles.buttonTitleInfo}>
                  Set up preferred payment method
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={
          modalVisible ? styles.headerContainerBlurry : styles.headerContainer
        }
      >
        <Image
          source={require('../assets/images/bg-small.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.headerContent}>
          <Image
            source={require('../assets/images/home_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View
        style={modalVisible ? styles.mainContainerBlurry : styles.mainContainer}
      >
        <ScrollView style={styles.movementsContainer}>
          {
            fontsLoaded && (
              <Text style={[styles.title, {fontFamily: 'Work-Sans'}]}>Last activity</Text>
            )
          }
          <View style={styles.movementListContainer}>
            {
              Object.keys(dashboardInfo.latest_gifts).length > 0 &&
              Object.keys(dashboardInfo.latest_gifts).map((date, dateIndex) => (
                <React.Fragment key={dateIndex}>
                  <Text style={styles.dataInfo}>{dateToMyDate(date).toLocaleDateString('en-US', option)}</Text>
                  {dashboardInfo.latest_gifts[date].map(
                    (transaction, index) => (
                      <Pressable
                        onPress={() =>
                          handleTranactionDetailShow(transaction.id)
                        }
                        key={index}
                      >
                        <View style={styles.eventInfoContainer}>
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
                              {transaction.colleague_name}
                            </Text>
                            <Text style={styles.emailInfo}>
                              {transaction.colleague_email}
                            </Text>
                          </View>
                          <View style={styles.priceInfoContainer}>
                            {transaction.flagged_total_amount > 0 ? (
                              <Text style={styles.priceInfo}>
                                +${transaction.flagged_total_amount}
                              </Text>
                            ) : (
                              <Text style={styles.priceInfo1}>
                                -${Math.abs(transaction.flagged_total_amount)}
                              </Text>
                            )}
                          </View>
                        </View>
                      </Pressable>
                    )
                  )}
                </React.Fragment>
              ))}

            {Object.keys(dashboardInfo.latest_gifts).length === 0 &&
              !isDashBoardInfoLoading && (
                <View style={styles.blankInfoContainer}>
                  <View style={styles.blankTextContainer}>
                    <Image
                        source={require('../assets/images/SendFirstGift.png')}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.notificationTitle}>
                      Send a gift
                    </Text>
                    <Text style={styles.notificationInfo}>
                      Your recent transactions will show here.
                    </Text>
                    <Text style={styles.notificationInfo}>
                      Send your first gift to a loved one or a friend.
                    </Text>
                  </View>
                  <Pressable onPress={sendGift}>
                    <View style={styles.buttonContainer}>
                      <Text style={styles.buttonTitleInfo}>
                        Send your first gift
                      </Text>
                    </View>
                  </Pressable>
                  
                </View>
              )}
          </View>
        </ScrollView>
      </View>
      {
        paymentNoteVisible && (
          <View style={styles.paymentNotificationContainer}>
            <Pressable style={styles.textLinkWrapper} onPress={() => setpaymentNoteVisible(false)}>
                <Icon3 style={styles.textLink} name="close" size={20} color="#000" />
            </Pressable>
            <Pressable
              onPress={() => setpaymentNoteVisible(false)}
            >
              <Icon3 style={styles.iconStyle} name="close" size={20} color="#000" />
            </Pressable>
            <View style={styles.paymentNotification}>
              <Image
                  source={require('../assets/images/card-image.png')}
                  style={styles.cardImage}
              />
              {
                fontsLoaded && (
                  <View style={styles.paymentNotificationTextContainer}>
                    <Text style={[styles.paymentNotificationTitle, {fontFamily: 'Work-Sans'}]}>
                      Add an extra payment method
                    </Text>
                    <Text style={[styles.paymentNotificationInfo, {fontFamily: 'Work-Sans'}]}>
                      You can add multiple payment methods to send gifts on your profile settings.
                    </Text>
                  </View>
                )
              }
              
            </View>
          </View>
        )
      }
          
      <TransactionDetailModal
        transactionId={transactionId}
        visible={transactionVisible}
        sendThanksNote={sendThanksNote}
        onHide={onHide}
      />
    </View>
  );
};

export default HomeScreen;

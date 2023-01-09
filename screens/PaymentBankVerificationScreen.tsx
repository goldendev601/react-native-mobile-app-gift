import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';

import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import { IRootState } from '../reducers';
import { getPaymentMethods, verifyBankAccount } from '../actions/giftAppAction';
import { handleMessage } from '../actions/commonAction';

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  mainContainer: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  mainScrollContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    marginTop: 25,
  },
  AboveWrapper: {
    width: '100%',
    height: 100,
  },
  mainHeaderContainer: {
    width: '100%',
    height: 150,
    paddingLeft: 28,
    paddingRight: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 39,
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
  textLinkWrapper: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  successMessageAlert: {
    fontSize: 10,
    color: '#7B61FF',
    fontStyle: 'italic',
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center',
  },
  textLinkStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mainTitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 8,
    textTransform: 'uppercase',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 40,
    backgroundColor: 'transparent',
  },
  sendButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
    fontWeight: '600',
    letterSpacing: 0.5
  },
  laterButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: 'rgba(17, 17, 17, 0.5)',
    fontWeight: '600',
    letterSpacing: 0.5
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B61FF',
    fontSize: 15,
    fontWeight: '700',
    height: 56,
    borderRadius: 14,
    width: '85%',
  },
  errorMessageWrapper: {
    width: '100%',
    height: 56,
    backgroundColor: '#E74678',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 30,
    justifyContent: 'center',
    marginTop: 20
  },
  iconStyle2: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 0,
  },
  laterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: '700',
    height: 56,
    borderRadius: 14,
    width: '85%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'rgba(17, 17, 17, 0.5)',
    borderStyle: 'solid'
  },
  cardBtn: {
    backgroundColor: 'rgba(123, 97, 255, 0.12)',
    borderRadius: 10,
    height: 98,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    opacity: 0.6
  },
  bankBtn: {
    backgroundColor: 'rgba(123, 97, 255, 0.12)',
    borderRadius: 10,
    height: 98,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#7B61FF',
  },
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  fieldInput: {
    backgroundColor: '#F5F5F5',
    fontSize: 14,
    padding: 18,
    color: '#111',
    flex: 1,
    borderRadius: 12,
  },
  iconImage: {
    width: 38,
    height: 38,
  },
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  cardButtonTitleInfo: {
    fontSize: 14,
    color: '#7B61FF',
    fontWeight: '600',
    lineHeight: 24,
  },
  bankButtonTitleInfo: {
    fontSize: 14,
    color: '#7B61FF',
    fontWeight: '600',
    lineHeight: 24
  },
  fieldLabel: {
    fontSize: 14,
    color: '#111',
    fontWeight: '400',
    lineHeight: 24,
    marginTop: 50
  },
  fieldLabel2: {
    fontSize: 14,
    color: '#111',
    fontWeight: '400',
    lineHeight: 24,
    marginTop: 20
  },
  title: {
    fontSize: 25,
    color: '#111',
    fontWeight: '600',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 30
  },
  errorMessageAlert: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 10
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: {
    color: '#111',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 24,
  },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 24,
  },
});

interface IPaymentBankVerificationScreenProps {
  navigation: NavigationProp<any>;
}

const PaymentBankVerificationScreen: React.FC<IPaymentBankVerificationScreenProps> = (props) => {

  const dispatch = useDispatch();

  const { navigation } = props;

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const bgColor = useThemeColor({}, 'background');

  const {
    stripeTokenId,
    isVerifyBankAccountSuccess,
    selectedPaymentMethod
  } = useSelector((state: IRootState) => state.giftApp);

  const [amount1, setAmount1] = React.useState('');
  const [amount2, setAmount2] = React.useState('');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const [errorModalShow, setErrorModalShow] = React.useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const closeErrorModal = () => {
    setErrorModalShow(false);
  };

  const goPaymentListScreen = () => {
    navigation.navigate('PaymentMethod');
  };

  const bankVerification = () => {
    console.log(stripeTokenId);
    console.log(parseFloat(amount1));
    console.log(parseFloat(amount2));
    let deposit = [];
    if (amount1 && amount2 && parseFloat(amount1) && parseFloat(amount2) && parseFloat(amount1) > 0 && parseFloat(amount2) > 0 && amount1[0] !== "." && amount2[0] !== ".") {
      deposit = [parseFloat(amount1), parseFloat(amount2)];
      if (stripeTokenId) {
        dispatch(verifyBankAccount(stripeTokenId, deposit));
      }
    } else {
      setValidationErrorMessage('Invalid amount');
      setErrorModalShow(true);
      setValidationError(true);
    }
    
  };

  console.log(selectedPaymentMethod);

  console.log('===isVerifyBankAccountSuccess==');
  console.log(isVerifyBankAccountSuccess);

  useEffect(() => {
    if (isVerifyBankAccountSuccess) {
      dispatch(handleMessage(true, 'success', 'Payment method has been verified!'));
      dispatch(getPaymentMethods())
      navigation.navigate('PaymentMethod');
    }
  }, [isVerifyBankAccountSuccess]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.AboveWrapper}>
          <View style={styles.headerWrapper}>
            <Pressable style={styles.textLinkWrapper} onPress={goBack}>
              <Icon3 name="arrowleft" size={25} color="#7B61FF" />
            </Pressable>
            <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]}>
            </Text>
            <Pressable style={styles.textLinkWrapper}></Pressable>
          </View>
        </View>
        <View style={styles.mainScrollContainer}>
        {fontsLoaded && (
            <View style={styles.mainContainer}>
              <Text style={[styles.title, { fontFamily: 'Work-Sans' }]}>
                Please enter verification amounts 
              </Text>
              <Text style={[styles.subtitle, { fontFamily: 'Work-Sans' }]}>
                2 monetary amounts have been sent to {selectedPaymentMethod.bank_name} account **** **** {selectedPaymentMethod.last4}. You may locate this using your online banking app or your bank statement.
              </Text>
              <Text style={[styles.fieldLabel, { fontFamily: 'Work-Sans' }]}>
                Amount 1
              </Text>
              <View style={[styles.fieldWrapper, { marginTop: 10 }]}>
                <Text style={[styles.fieldLabel, styles.iconStyle, { fontFamily: 'Work-Sans' }]}>
                 $
                </Text>
                <TextInput
                  style={styles.fieldInput}
                  onChangeText={(text) => setAmount1(text)}
                />
              </View>
              <Text style={[styles.fieldLabel2, { fontFamily: 'Work-Sans' }]}>
                Amount 2
              </Text>
              <View style={[styles.fieldWrapper, { marginTop: 10 }]}>
                <Text style={[styles.fieldLabel, styles.iconStyle, { fontFamily: 'Work-Sans' }]}>
                 $
                </Text>
                <TextInput
                  style={styles.fieldInput}
                  onChangeText={(text) => setAmount2(text)}
                />
              </View>
              {validationError && errorModalShow && (
                <View style={styles.errorMessageWrapper}>
                  <Icon3 style={styles.iconStyle} name="warning" size={20} color="#FFF" />
                  <Text style={[styles.errorMessageAlert, {fontFamily: 'Work-Sans'}]}>
                    {validationErrorMessage}
                  </Text>
                  <Pressable onPress={closeErrorModal} style={styles.iconStyle2}>
                    <Icon3 name="close" size={15} color="#FFF" />
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <Pressable style={styles.sendButton} onPress={bankVerification}>
            <Text style={styles.sendButtonText}>Submit</Text>
          </Pressable>
          <Pressable style={styles.laterButton} onPress={goPaymentListScreen}>
            <Text style={styles.laterButtonText}>Do this later</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PaymentBankVerificationScreen;

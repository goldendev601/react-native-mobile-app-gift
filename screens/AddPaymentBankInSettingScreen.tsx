import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import SelectDropdown from 'react-native-select-dropdown';
import {
  addPaymentMethods,
  clearPaymentMethodState,
  generateToken,
  generateTokenBank,
  getCurrencyTypes,
  getEventTypes,
  getMyProfile,
} from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { IRootState } from '../reducers';
import { FontAwesome } from '@expo/vector-icons';
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
    backgroundColor: '#7B61FF',
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
    backgroundColor: '#7B61FF',
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
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  sendButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
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

interface IAddPaymentBankInSettingScreenProps {
  navigation: NavigationProp<any>;
}

const AddPaymentBankInSettingScreen: React.FC<IAddPaymentBankInSettingScreenProps> = (props) => {
  const countryList = [
    'US',
    'AE',
    'AR',
    'AT',
    'AU',
    'BE',
    'BG',
    'BO',
    'CA',
    'CH',
    'CL',
    'CO',
    'CR',
    'CY',
    'CZ',
    'DE',
    'DK',
    'DO',
    'EE',
    'EG',
    'ES',
    'FI',
    'FR',
    'GB',
    'GM',
    'GR',
    'HK',
    'HR',
    'HU',
    'ID',
    'IE',
    'IL',
    'IS',
    'IT',
    'JP',
    'KE',
    'KR',
    'LI',
    'LT',
    'LU',
    'LV',
    'MA',
    'MT',
    'MX',
    'NL',
    'NO',
    'NZ',
    'PE',
    'PH',
    'PL',
    'PT',
    'PY',
    'RO',
    'RS',
    'SA',
    'SE',
    'SG',
    'SI',
    'SK',
    'TH',
    'TN',
    'TR',
    'TT',
    'UY',
    'ZA',
    'BD',
    'BJ',
    'CI',
    'JM',
    'MC',
    'NE',
    'SN',
    'AG',
    'BH',
    'GH',
    'GT',
    'GY',
    'KW',
    'LC',
    'MU',
    'NA',
    'SM',
    'AM',
    'BA',
    'MY',
    'OM',
    'PA',
    'SV',
  ];

  const accountHolderTypeList = ['individual', 'company'];

  const dispatch = useDispatch();

  const { navigation } = props;

  let [fontsLoaded] = useFonts({
    'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
    'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  const bgColor = useThemeColor({}, 'background');

  const {
    paymentTokenBank,
    isPaymentTokenBankGeneratedSuccess,
    isAddingPaymentMethodSuccess,
    currencyTypeList,
  } = useSelector((state: IRootState) => state.giftApp);

  const [routingNumber, setRoutingNumber] = React.useState('');
  const [accountHolderName, setAccountHolderName] = React.useState('');
  const [accountHolderType, setAccountHolderType] =
    React.useState('individual');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [currency, setCurrency] = React.useState('USD');
  const [country, setCountry] = React.useState('US');

  const [validationSuccessMessage, setValidationSuccessMessage] =
    React.useState('');

  useEffect(() => {
    dispatch(getCurrencyTypes());
    dispatch(clearPaymentMethodState());
  }, []);


  const goBack = () => {
    // navigation.navigate('PaymentMethod');
    navigation.goBack();
  };

  const save = () => {
    dispatch(generateTokenBank(routingNumber, accountHolderName, accountHolderType, accountNumber, currency, country));
  };

  useEffect(() => {
    if (isAddingPaymentMethodSuccess) {
        setValidationSuccessMessage('The new payment method has been created successfully.')
        dispatch(handleMessage(true, 'success', 'The new payment method has been created.'));  
        setRoutingNumber('');
        setAccountHolderName('');
        setAccountHolderType('individual');
        setAccountNumber('');
        setCurrency('USD');
        setCountry('US');
        dispatch(clearPaymentMethodState())
        // navigation.navigate('TutorialFirst');
        navigation.navigate('PaymentBankVerificationScreen');
    }
}, [isAddingPaymentMethodSuccess])

  useEffect(() => {
    if (isPaymentTokenBankGeneratedSuccess && paymentTokenBank) {
      console.log('=========Successs==========')
      console.log(isPaymentTokenBankGeneratedSuccess);
      console.log(paymentTokenBank);
      dispatch(addPaymentMethods(paymentTokenBank));
    }
  }, [isPaymentTokenBankGeneratedSuccess, paymentTokenBank]);

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
              <Icon3 name="arrowleft" size={25} color="#FFF" />
            </Pressable>
            <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]}>
              Add Bank
            </Text>
            <Pressable style={styles.textLinkWrapper}></Pressable>
          </View>
        </View>
        {/* <View style={styles.mainHeaderContainer}>
          <Pressable style={styles.cardBtn} onPress={goAddPaymentScreen}>
            <Image
              source={require('../assets/images/cardIcon.png')}
              style={styles.iconImage}
              resizeMode="cover"
            />
            <Text style={styles.cardButtonTitleInfo}>Credit/Debit Card</Text>
          </Pressable>
          <View style={styles.bankBtn}>
            <Image
              source={require('../assets/images/Bank.png')}
              style={styles.iconImage}
              resizeMode="cover"
            />
            <Text style={styles.bankButtonTitleInfo}>Bank Account</Text>
          </View>
        </View> */}
        <View style={styles.mainScrollContainer}>
          {fontsLoaded && (
            <View style={styles.mainContainer}>
              <Text style={[styles.fieldLabel, { fontFamily: 'Work-Sans' }]}>
                Account details
              </Text>
              <View style={[styles.fieldWrapper, { marginTop: 10 }]}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Enter routing number"
                  onChangeText={(text) => setRoutingNumber(text)}
                  autoFocus
                />
              </View>
              <View style={[styles.fieldWrapper, { marginTop: 24 }]}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Enter account number"
                  onChangeText={(text) => setAccountNumber(text)}
                  autoFocus
                />
              </View>
              <View style={[styles.fieldWrapper, { marginTop: 24 }]}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Enter account holder full name"
                  onChangeText={(text) => setAccountHolderName(text)}
                  autoFocus
                />
              </View>

              <Text
                style={[
                  styles.fieldLabel,
                  { fontFamily: 'Work-Sans', marginTop: 24 },
                ]}
              >
                Account holder type
              </Text>
              <SelectDropdown
                data={accountHolderTypeList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  setAccountHolderType(selectedItem);
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  setAccountHolderType(item);
                  return item;
                }}
                defaultButtonText={'Individual'}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#111'}
                      size={12}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />

              <Text
                style={[
                  styles.fieldLabel,
                  { fontFamily: 'Work-Sans', marginTop: 24 },
                ]}
              >
                Currency
              </Text>
              <SelectDropdown
                data={currencyTypeList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  setCurrency(selectedItem.description);
                  return selectedItem.description;
                }}
                rowTextForSelection={(item, index) => {
                  setCurrency(item.description);
                  return item.description;
                }}
                defaultButtonText={'USD'}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#111'}
                      size={12}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />

              <Text
                style={[
                  styles.fieldLabel,
                  { fontFamily: 'Work-Sans', marginTop: 24 },
                ]}
              >
                Country or Region
              </Text>
              <SelectDropdown
                data={countryList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  setCountry(selectedItem);
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  setCountry(item);
                  return item;
                }}
                defaultButtonText={'US'}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#111'}
                      size={12}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
          )}
        </View>

        {/* <Text style={styles.successMessageAlert}>
          {validationSuccessMessage}
        </Text> */}

        <View style={styles.buttonContainer}>
          <Pressable style={styles.sendButton} onPress={save}>
            <Text style={styles.sendButtonText}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPaymentBankInSettingScreen;

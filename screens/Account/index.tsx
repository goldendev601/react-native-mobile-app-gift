import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text, View, useThemeColor } from '../../components/Themed';
import { IRootState } from '../../reducers';
import { styles } from './index.style';
import { accountDetailAdd } from '../../actions/accountAction';

import { isValidEmail, isValidMobileNumber, getKeyValue } from '../../utilities/Helpers';
import { utilStyles } from '../../utilities/UtilStyles';


interface IAccountDetail {
  name: string;
  email: string;
  phone: number;
}

const AccountScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: IRootState) => state.auth);

  const bgColor = useThemeColor({}, 'background');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [state, setState] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...user,
    }));
  }, []);

  const _onChangeField = (name: string, value: string) => {
    _setFormErrors(name, value);

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const _setFormErrors = (name: string, value: string) => {
    let errorMessage = '';

    if (!value) {
      errorMessage = 'This field can not be empty';
    // } else if (name === 'email' && !isValidEmail(value)) {
    //   errorMessage = 'Email is not valid';
    } else if (name === 'phone' && !isValidMobileNumber(value)) {
      errorMessage = 'MSISDN is not valid';
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));
  }

  const validForm = () => {
    let isValid = true;
    Object.keys(errors).forEach((key) => {
      isValid = isValid && !!state[key];

      if (key === 'phone') {
        isValid = isValid && isValidMobileNumber(state[key]);
      }

      _setFormErrors(key, state[key]);
    })

    setIsValidForm(isValid);

    return isValid;
  }

  const _onSubmit = () => {
    console.log(state);

    if ( token && validForm() ) {
      dispatch(accountDetailAdd(token, state));
    }
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor, paddingTop: 20 }]}
    >
      <View style={styles.textInputView}>
        <Text>Name</Text>
        <TextInput
          style={styles.fieldInput}
          onChangeText={(text) => _onChangeField('name', text)}
        />
        <Text style={styles.errorText}>{errors.name}</Text>
      </View>

      <View style={styles.textInputView}>
        <Text>Email</Text>
        <TextInput
          defaultValue={user.email}
          style={styles.fieldInput}
          onChangeText={(text) => _onChangeField('email', text)}
        />
      </View>

      <View style={styles.textInputView}>
        <Text>MSISDN</Text>
        <TextInput
          defaultValue={user.phone}
          keyboardType='numeric'
          style={styles.fieldInput}
          onChangeText={(text) => _onChangeField('phone', text)}
        />
        <Text style={styles.errorText}>{errors.phone}</Text>
      </View>

      <View style={styles.textInputView}>
        <Pressable style={utilStyles.greenButton} onPress={_onSubmit}>
          <Text>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;

import * as React from 'react';

import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { IRootState } from '../reducers';


const LoadingSpinner: React.FC = () => {

  const { spinnerShow, spinnerText } = useSelector((state: IRootState) => state.common);

  return (
    <Spinner
      visible={spinnerShow}
      textContent={spinnerText}
      textStyle={styles.spinnerTextStyle}
    />
  );
}

export default LoadingSpinner;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});

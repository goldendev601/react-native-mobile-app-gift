import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from 'react-native-paper';

import {
  Text,
  View,
} from './Themed';

import { handleMessage } from '../actions/commonAction';
import { IRootState } from '../reducers';


const Message: React.FC = () => {

  const dispatch = useDispatch();
  const { messageShow, messageType, messageContent } = useSelector((state: IRootState) => state.common);

  const backgroundColor = messageType == 'success' ? 'green' : messageType == 'error' ? 'red' : 'black';

  return (
    <Snackbar
      visible={messageShow}
      onDismiss={() => dispatch(handleMessage(false, '', ''))}
      // action={{
      //   label: 'Undo',
      //   onPress: () => {
      //   },
      // }}
      style={{ backgroundColor }}
    >
      <Text style={{ color: '#fff' }}>{messageContent}</Text>
    </Snackbar>
  );
}

export default Message;

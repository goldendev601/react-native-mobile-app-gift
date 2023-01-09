import * as React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';

export default function BackIcon() {
  const navigation = useNavigation();
  const theme = useColorScheme();
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.container}
    >
      <Ionicons
        name="chevron-back"
        size={30}
        color={theme === 'dark' ? '#fff' : '#aaa'}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
  },
});

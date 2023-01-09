import * as React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';

import { View, useThemeColor } from './Themed';

export default function HamburgerIcon(props: any) {
  const navigation = useNavigation();

  function _openDrawer() {
    navigation.dispatch(DrawerActions.openDrawer());
  }
  const theme = useColorScheme();
  return (
    <TouchableHighlight onPress={() => _openDrawer()} style={styles.container}>
      <Ionicons
        name="ios-reorder-three"
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

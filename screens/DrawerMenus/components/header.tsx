//import liraries
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { View, useThemeColor } from "../../../components/Themed";
// create a component
type DrawerHeaderProps = {
  handleBack: () => void;
};
const DrawerHeader = (props: DrawerHeaderProps) => {
  const tintColor = useThemeColor({}, "inactive");
  const navigation = useNavigation();
  const _closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <View style={[styles.container, { borderBottomColor: tintColor }]}>
      <TouchableOpacity onPress={() => props.handleBack()}>
        <Ionicons name="chevron-back" color={tintColor} size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={_closeDrawer}>
        <Ionicons name="close" color={tintColor} size={30} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
});

//make this component available to the app
export default DrawerHeader;

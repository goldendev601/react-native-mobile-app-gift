//import liraries
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, useThemeColor, Text } from "../../../components/Themed";
// create a component
type SubMenuItemProps = {
  title: string;
  onClick: () => void;
};
const SubMenuItem = (props: SubMenuItemProps) => {
  const tintColor = useThemeColor({}, "inactive");
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={[styles.container, { borderBottomColor: tintColor }]}
    >
      <Text>
        {"\u2022"}
        {"  "}
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

//make this component available to the app
export default SubMenuItem;

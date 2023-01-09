//import liraries
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View, useThemeColor, Text } from "../../../components/Themed";
import SubMenuItem from "./SubMenuItem";
import { BottomTabParamList, DrawerNavParamList } from "../../../types";
import { MenuItemProps } from "..";
// create a component
type SubItem = {
  name: string;
};

type MenuProps = {
  item: MenuItemProps;
  onClick: (
    route?: keyof DrawerNavParamList | keyof BottomTabParamList | string
  ) => void;
  subMenu?: Array<SubItem>;
};
const MenuItem = (props: MenuProps) => {
  const tintColor = useThemeColor({}, "inactive");
  const [isOpen, setisOpen] = useState(false);
  const { item, onClick } = props;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (item.nav) {
            props.onClick(item.nav);
          }
          if (item.link) {
            props.onClick(item.link);
          }
        }}
        style={[styles.container, { borderBottomColor: tintColor }]}
      >
        <Text>{item.name}</Text>
        {item.hasNav && (
          <Ionicons
            color={tintColor}
            size={24}
            name={isOpen ? "chevron-up" : "chevron-down"}
          />
        )}
      </TouchableOpacity>
      {isOpen &&
        props.hasNav &&
        props.subMenu &&
        props.subMenu.map((item, index) => {
          return (
            <SubMenuItem
              title={item.name}
              key={index}
              onClick={() => props.onClick("FutureStack")}
            />
          );
        })}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

//make this component available to the app
export default MenuItem;

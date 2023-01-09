//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CustomDrawerContentScreen from "../../screens/DrawerMenus/CustomDrawerContent";
import BettingGuideStatesScreen from "../../screens/DrawerMenus/BettingGuideStates";
import NBAScreen from "./NBAScreen";
import NFLScreen from "./NFLScreen";
import MLBScreen from "./MLBScreen";
import CFBScreen from "./CFBScreen";
import { BottomTabParamList, DrawerStackParmList } from "../../types";
import { IReducer } from "../../types/reducer";

export type MenuItemProps = {
  name: string;
  hasNav: boolean;
  nav?: keyof DrawerStackParmList | keyof BottomTabParamList;
  link?: string;
};

// create a component
const DrawMain = () => {
  const selectedIndex = useSelector(
    (state: IReducer) => state.app.drawerItemIndex
  );
  const [index, setindex] = useState(selectedIndex);
  useEffect(() => {
    setindex(selectedIndex);
  }, [selectedIndex]);
  return (
    <View style={styles.container}>
      {index == 0 && (
        <CustomDrawerContentScreen handleClick={(i: number) => setindex(i)} />
      )}
      {index == 1 && <NBAScreen handleBack={() => setindex(0)} />}
      {index == 2 && <NFLScreen handleBack={() => setindex(0)} />}
      {index == 3 && <MLBScreen handleBack={() => setindex(0)} />}
      {index == 4 && <CFBScreen handleBack={() => setindex(0)} />}
      {index == 6 && (
        <BettingGuideStatesScreen handleBack={() => setindex(0)} />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default DrawMain;

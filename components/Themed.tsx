/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Text as DefaultText,
  TouchableWithoutFeedback,
  View as DefaultView,
} from 'react-native';
import {
  default as DefaultDropDownPicker,
  DropDownPickerProps,
} from 'react-native-dropdown-picker';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TabViewProps = ViewProps & {
  key: string;
  tabLabel: string;
};
export type TouchableWithNavigationProps = ViewProps & {
  url: string | undefined;
};

export function DropDownPicker(props: DropDownPickerProps) {
  const { style, zIndex, ...otherProps } = props;
  const backgroundColor = useThemeColor({}, 'text');
  const color = useThemeColor({}, 'inactive');

  const [isOpen, setOpen] = useState(false);

  return (
    <DefaultDropDownPicker
      open={isOpen}
      setOpen={setOpen}
      containerStyle={{ borderRadius: 8, borderColor: color }}
      itemStyle={{ justifyContent: 'flex-start' }}
      style={{ color, fontSize: 16, lineHeight: 24, padding: 12 }}
      zIndex={zIndex}
      {...otherProps}
    />
  );
}

export function LoadingSpinner(props: any) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({}, 'text');

  return (
    <ActivityIndicator
      color={color}
      size="large"
      style={{ flex: 1 }}
      {...otherProps}
    />
  );
}

export function SmallLoadingSpinner(props: any) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({}, 'text');

  return (
    <ActivityIndicator
      color={color}
      size="small"
      style={{ flex: 1 }}
      {...otherProps}
    />
  );
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TabView(props: TabViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TouchableWithNavigation(props: TouchableWithNavigationProps) {
  const { url, children, ...otherProps } = props;
  return (
    <TouchableWithoutFeedback
      {...otherProps}
      onPress={async () => {
        if (url) {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            console.error(`Cannot navigate to ${url}`);
          }
        }
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}

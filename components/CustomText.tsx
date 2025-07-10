import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

const getFontFamily = (fontWeight: TextStyle['fontWeight'] = 'normal') => {
  switch (fontWeight) {
    case 'bold':
    case '700':
      return 'Roboto-Bold';
    case '500':
    case 'medium':
      return 'Roboto-Medium';
    case 'normal':
    default:
      return 'Roboto-Regular';
  }
};

const CustomText = ({ style, ...props }: TextProps) => {
  const fontWeight: TextStyle['fontWeight'] = Array.isArray(style)
    ? style.find((s: any) => s?.fontWeight)?.fontWeight || 'normal'
    : (style as TextStyle)?.fontWeight || 'normal';

  const fontFamily = getFontFamily(fontWeight);

  return <Text {...props} style={[{ fontFamily }, style]} />;
};

export default CustomText;
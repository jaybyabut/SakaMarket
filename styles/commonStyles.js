import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const commonStyles = StyleSheet.create({
  fullCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  buttonTextWhite: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: Fonts.Roboto,
    color: 'white',
  },
  heading: {
    fontSize: 48,
    fontWeight: '700',
    fontFamily: Fonts.RobotoBold,
  },
  subtext: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: Fonts.Roboto,
  },
});

export default commonStyles;

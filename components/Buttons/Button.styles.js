import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  gradientWrapper: {
    width: 279,
    height: 63,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fullSize: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  outlineButton: {
    borderRadius: 12,
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#10AF7C',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  outlineText: {
    color: '#10AF7C',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  largeButton: {
    width: 280,
    height: 276,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2.3,
    elevation: 3,
    marginBottom: 40,
    overflow: 'hidden',
  },
  largeButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButtonIcon: {
    width: 212,
    height: 212,
  },
  largeButtonText: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
});

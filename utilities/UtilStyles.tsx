import { StyleSheet } from 'react-native';

export const utilStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  textView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  textHozCenter: {
    textAlign: 'center',
    width: '100%'
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  font600: {
    fontWeight: '600',
  },
  greenButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CAF4D',
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 50,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  stretchedRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightCol: {
    paddingLeft: 16,
    textAlign: 'right',
    flexWrap: 'wrap',
    flexShrink: 1
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 16,
  },
  screenSubTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  py_2: {
    paddingVertical: 16,
  }
});

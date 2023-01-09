import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  explore: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 90,
  },
  radioBoxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  textInputView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 40,
  },
  fieldInput: {
    width: '100%',
    height: 30,
    backgroundColor: 'lightgrey',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 8,
    color: '#2CAF4D',
  },
  textTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
  },
  genderView: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    fontSize: 12,
    paddingTop: 5,
    color: 'red'
  }
});

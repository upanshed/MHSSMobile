import { Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;

export default {
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    height: deviceHeight / 5,
    alignSelf: 'center',
  },
  form: {
    flex: 1,
  },
  loginBtn: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  linkBtn: {
    opacity: 0.9,
    fontSize: 14,
    color: '#FFF',
    textAlign: 'left',
    marginLeft: 5,
    paddingLeft: 0,
  },
  signUpText: {
    opacity: 0.7,
    fontSize: 14,
    color: '#FFF',
    textAlign: 'right',
    marginRight: 0,
    paddingRight: 0,
  },
};

import { Platform } from 'react-native';

export default {
  header: {
    container: {
      marginTop: 5,
    },
    icon: {
      color: '#D8D8D8',
      fontSize: 26,
    },
    avatar: {
      height: 40,
      width: 40,
      borderRadius: Platform.OS === 'android' ? 40 : 20,
    },
  },
  content: {
    paddingTop: Platform.OS === 'android' ? 20 : 30,
    backgroundColor: '#fff',
  },
  menuItem: {
    container: {
      flexDirection: 'row',
      borderColor: 'rgba(29, 29, 38, 0.1)',
      paddingLeft: 15,
      marginLeft: 0,
    },
    selected: {
      backgroundColor: '#F8F8F8',
    },
    title: {
      fontFamily: 'Roboto_light',
      color: '#444',
    },
    icon: {
      color: '#444',
      marginRight: 10,
      fontSize: Platform.OS === 'android' ? 25 : 30,
    },
  },
};
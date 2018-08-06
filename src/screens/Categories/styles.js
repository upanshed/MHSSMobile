const React = require('react-native');
const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  content: {
    backgroundColor: '#FFF',
  },
  categoryBox: {
    justifyContent: 'center',
    height: deviceHeight / 4,
    width: deviceWidth / 2,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  categoryIcon: {
    fontSize: 35,
    alignSelf: 'center',
    color: '#c9c9c9',
  },
  categoryTitle: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#1D1D26',
    paddingBottom: 15,
  },
  categoryAmount: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#8E8E93',
  },
  categoryLine: {
    borderBottomWidth: 3,
    paddingTop: 10,
    width: 25,
    alignSelf: 'center',
  },
};
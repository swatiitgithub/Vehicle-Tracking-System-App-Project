import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {fontSize, hp, wp} from '../../utils/Responsive';

const styles = StyleSheet.create({
  card: {
    marginTop: hp('2'),
    backgroundColor: Colors.white,
    width: wp('90'),
    alignSelf: 'center',
    borderRadius: 10,
  },
  card1: {
    flexDirection: 'row',
    marginTop: hp("1.5"),
  },
  firstLetter: {
    width: wp('10'),
    height: hp('5'),
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginLeft: wp('3'),
    marginRight: wp('3'),
    backgroundColor: Colors.darkgreen1,
  },
  firstLetterText: {
    color: Colors.white,
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  text: {
    textAlignVertical: 'center',
    height: 30,
    fontWeight:'400',
    color:'black',
    fontSize:14
  },
  text1: {
    fontWeight:'400',
    fontSize:12
  },
  text2: {
    fontWeight:'400',
    fontSize:14
  },
  rate: {
    flexDirection: 'row',
    marginVertical: hp('1'),
    marginLeft: wp('3'),
  },
  rate1: {
    marginRight: wp('3'),
  },
  desc: {
    marginHorizontal: wp('3'),
    justifyContent: 'center',
    marginBottom: hp('2'),
  },
});

export default styles;

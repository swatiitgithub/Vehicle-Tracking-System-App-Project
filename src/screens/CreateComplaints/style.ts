import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {
  responsiveHeight as hp,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:  Colors.white,
  },
  viewCommon: {
    flexDirection: 'row',
    alignSelf: 'center',
    height:hp(10),
    width: '100%',
    backgroundColor: Colors.white,
  },
  txtCommon: {
    color: Colors.white,
    alignSelf: 'center',
    flex: 1,
    fontSize:  18,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  imgCommon: {
    height: '100%',
    justifyContent: 'center',
    marginHorizontal:2,
    paddingHorizontal: 8,
  },
  bottomGrayLine: {
    borderBottomColor: Colors.silvergrey,
    borderBottomWidth: 1,
  },
  imgIcon: {
    height: 23,
    width: 24,
    resizeMode: 'contain',
  },
  headerText: {
    color: Colors.black,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {flex: 1},
  hCenter: {
    justifyContent: 'center',
  },
  createGrpAction: {
    backgroundColor: Colors.backgroundGrey,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  fs16: {
    fontSize: 16,
  },
  fs14: {
    fontSize: 14,
  },
  fs12: {
    fontSize: 12,
  },
  
  createGroupTextColor: {
    color: Colors.primary,
  },
  p10: {
    padding: 5,
  },
  pt5: {
    paddingTop: 5,
  },
  inputText: {
    height: hp(10),
    borderWidth: hp(0.05),
    borderRadius: 5,
    padding: hp(2),
    marginTop: hp(2),
  },
  errorStyle: {
    fontSize: 12,
    marginTop: 4,
  },

  verticalSpacing: {
    marginTop: hp(4),
  },

  profileImage: {
    marginVertical: hp(5),
    marginHorizontal: hp(10),
    paddingTop: hp(10),
    alignContent: 'center',
    alignItems: 'center',
  },

  imgBox: {
    height: hp(15),
    width: hp(10),
    borderColor: '#6C6C6C',
    borderRadius: 60,
    borderWidth: 1,
    backgroundColor: Colors.backgroundGrey,
    overflow: 'hidden',
  },

  img: {
    height: hp(10),
    width: hp(10),
    borderColor: '#6C6C6C',
  },
  pb5: {
    paddingBottom: hp(1),
  },
});

export default styles;

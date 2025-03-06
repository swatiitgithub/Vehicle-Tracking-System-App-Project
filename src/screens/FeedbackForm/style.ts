import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:  Colors.white,
  },
  viewCommon: {
    flexDirection: 'row',
    alignSelf: 'center',
    height:42,
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
    height: 46,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 8,
  },
  errorStyle: {
    fontSize: 12,
    marginTop: 4,
  },

  verticalSpacing: {
    marginTop: 16,
  },

  profileImage: {
    marginVertical: 10,
    marginHorizontal: 20,
    paddingTop: 10,
    alignContent: 'center',
    alignItems: 'center',
  },

  imgBox: {
    height: 100,
    width: 100,
    borderColor: '#6C6C6C',
    borderRadius: 60,
    borderWidth: 1,
    backgroundColor: Colors.backgroundGrey,
    overflow: 'hidden',
  },

  img: {
    height: 100,
    width: 100,
    borderColor: '#6C6C6C',
  },
  pb5: {
    paddingBottom: 5,
  },
});

export default styles;


import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons'
import {
  background,
  flexbox,
} from 'native-base/lib/typescript/theme/styled-system';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useTheme from '../../config/theme/hooks/useTheme';
import AppStyleConstant from '../../utils/AppStyleConstant';
import React from 'react';

const InstituteCard = ({ item, onPress, bgColor }: any) => {
  const style = useThemedStyles(styles);
  const theme = useTheme();
  // console.log(item)
  return (
    <>
      <TouchableOpacity
        style={[style.container]}
        onPress={() => onPress(item)}>
        <View style={[style.card, style.elevation]}>
          <View style={[style.descBox,{height:"100%"}]}>

            {/* <View style={{ flex: 1, justifyContent: 'center',alignSelf:'center',alignItems:'center'}}>
              <View style={[style.imageContainer]}>
                <Image
                  source={{ uri: `data:image/png;base64,${item.galleryImage}` }}
                  style={[style.image]}></Image>
              </View>
            </View> */}
            <View style={{ flex: 1.5, marginHorizontal: wp('2'),marginTop:5 }}>
              <View style={style.descBox}>
                <Text style={style.textHead} >{`Institute Name :`}</Text>
                <Text style={[style.textValue]} numberOfLines={2} >{`${item?.instituteName}`}</Text>
              </View>

              <View style={style.descBox}>
                <Text style={[style.textHead]}>{`Mobile No :`}</Text>
                <Text numberOfLines={2} style={[style.textValue]}>{`${item?.mobileNo}`}</Text>

              </View>
              <View style={style.descBox}>
                <Text style={[style.textHead]}>{`Address :`}</Text>
                <Text numberOfLines={2} style={[style.textValue]}>{`${item?.instituteAddress}`}</Text>
              </View>
              <View style={style.descBox}>
                <Text style={[style.textHead]}>{`Website :`}</Text>
                <Text numberOfLines={2} style={[style.textValue]}>{`${item?.website}`}</Text>
              </View>
              <View style={style.descBox}>

              </View>

            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default InstituteCard;

const styles = (theme: any) => StyleSheet.create({
  icon: {
    color: theme.colors.TEXT
  },
  container: {
    height: hp("22"),
    marginHorizontal: wp("4"),
  },
  card: {
    height: hp("20"),
    backgroundColor: "white",
    borderRadius: 8,
    width: wp("92"),
    marginVertical: hp("3"),
    
  },
  elevation: {
    elevation: 10,
    shadowColor: Colors.silvergrey,
  },
  descBox: {
    flexDirection: 'row',
    // backgroundColor:theme.colors.CARD_BACKGROUND
  },
  head: {
    marginTop: hp('2'),
    fontWeight: '500',
    fontSize: 22,
    color: theme.colors.TEXT,
    // flex:1,
    fontFamily: AppStyleConstant.CRIMSONPRO_BOLD
  },
  textHead: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.TEXT,
    paddingLeft: wp("2"),
    paddingVertical:5

  },

  textValue: {
    flex:1,
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.TEXT_SECONDARY,
    paddingVertical:5
  },
  btnValue: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.white,
  },

  image: {
    width: wp("32"),
    height: hp("16"),
  },
  imageContainer: {
    justifyContent:'center',
    height: "80%",
    width: wp("32"),
    borderRadius: 10,
    borderWidth: 0.1,
    overflow: 'hidden',
  },
});

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useThemedStyles from "../../../src/config/theme/hooks/useThemedStyles";
import useTheme from '../../config/theme/hooks/useTheme';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating, Rating} from 'react-native-ratings';
import React from 'react';
import {Button} from 'react-native-paper';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { fontSize, hp, wp } from '../../utils/Responsive';
import moment from 'moment';

const phNO = '6394755955';
const BusStationsCard = ({item, onPress}: any) => {
  const style = useThemedStyles(styles);
  const theme=useTheme();
  return (
    <>
      <TouchableOpacity
        style={style.container}
        onPress={() => onPress(item)}>
        <View style={[style.card, style.elevation,]}>
          <View style={style.busImage}>
            <View style={[style.imageContainer]}>
            <Image
              source={{uri: `data:image/png;base64,${item.galleryImage}`}}
              style={style.image}></Image>
            </View>
          </View>
          <View style={style.bus}>
            <View style={style.descBox}>
            <Text style={style.head} numberOfLines={1}>{item.appCompName}</Text>
            </View>
            <View style={style.descBox}>
            {/* <FontAwesome5
                name="map-marked-alt"
                size={11}
                color={theme.colors.TEXT}></FontAwesome5> */}
              <Text numberOfLines={2} style={style.textValue}>{item.commonName}
              </Text>
            </View>

            <View style={style.descBox}>
            {/* <Feather name="phone-call" size={11} color={theme.colors.TEXT}/> */}
            <Text style={style.textHead}>{item.bookingBillID}</Text>
            </View>
            
            <View style={style.descBox}>
              <View style={[{flexDirection:'row', flex:1}]}>
              {/* <FontAwesome
                name="star"
                size={11}
                color={theme.colors.TEXT} /> */}
              <Text style={style.textHead}>`From: {moment(item.fromDate).format('DD-MMM-YYYY')}`</Text>
              <Text style={style.textValue}>`From: {moment(item.toDate).format('DD-MMM-YYYY')}</Text>

              </View>
            
            </View> 
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BusStationsCard;

const styles = (theme: any) => StyleSheet.create({
  bus:{
    flex: 1.6,marginHorizontal:wp("5")
  },
  busImage:{
    flex: 1,justifyContent:'center'
  },
  container: {
    height: hp("19"),
    marginHorizontal: wp("4"),
  },
  
  card: {
    height: hp("18"),
    backgroundColor: theme.colors.CARD_BACKGROUND,
    borderRadius: 8,
    width: wp("92"),
    marginVertical: hp("1.6"),
    flexDirection: 'row',
  },
  head: {
    paddingTop: hp("1"),
    fontWeight: '500',
    fontSize: 17,
    color: theme.colors.TEXT
  },
  textHead: {
    fontWeight: '500',
    fontSize: 11,
    color: theme.colors.TEXT_SECONDARY,
    paddingHorizontal:wp("2"),
  },

  textValue: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.TEXT_SECONDARY,
    paddingHorizontal:wp("2"),
  },
  textValue1: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.TEXT_SECONDARY
  },
  descBox: {
    flexDirection: 'row',
    paddingTop:hp("1.1"),
  },
  elevation: {
    elevation: 20,
    shadowColor: Colors.darkgrey
  },

  image: {
    width: wp("32"),
    height: hp("16"),
  },
  imageContainer: {
    width: wp("32"),
    height: hp("16"),
    borderRadius: 10,
    borderWidth: 0.1,
    overflow: 'hidden',
    marginLeft:wp("3"),
  },
  vbutton: {
    flexDirection: 'row',
    width: wp("14"),
    height: hp("2.6"),
    borderRadius: 10,
    backgroundColor: Colors.brown,
    borderWidth: 1,
    borderColor: Colors.lessdarkgrey,
    justifyContent: 'center',
},
});

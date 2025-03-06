import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const date = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
import Images from '../../utils/Images';
import { fontSize, hp, wp } from '../../utils/Responsive';
import React from 'react';
import useThemedStyles from "../../../src/config/theme/hooks/useThemedStyles";
import useTheme from '../../config/theme/hooks/useTheme';

const phNO = '6394755955';

const CinemasCard = ({item, onPress,index}: any) => {
  const style = useThemedStyles(styles);
  const theme = useTheme();
  // console.log(item.images)
  //item.images.poster["1"].medium.film_image
  if (item) {
    return (
      <>
        <TouchableOpacity
          style={[style.container]}
          // onPress={() => onPress(item)}
          >
          <View style={[style.card,style.elevation]}>
            <View style={style.parent}>
            {/* <Text style={styles.date}>{date + '-' + month + '-' + year}</Text> */}
              {/* <View style={styles.descBox}>
            <Text style={styles.date}>{date + '-' + month + '-' + year}</Text>
            <Text style={styles.date}>{''}</Text>
          </View> */}
          <View style={[style.descBox]}>
            <Text numberOfLines={1} style={style.name}>{item.film_name}</Text>
          </View>
          <View style={style.descBox}>
            <Text numberOfLines={4} style={style.details}>
              {`${item.cinema_name} ${item.address2} ${item.city} ${item.state}`}
            </Text>
          </View>
          <View style={style.appCompName}>
            <TouchableOpacity
              style={style.rateTO}>
              <Text
                style={style.rateText}>
                <IconFontAwesome name="star" size={15} color={theme.colors.ICON_COLOR2} /> 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.cinemaImg}>
          <Image
            source={item.length > 0 ? Images.DETAILS_BG_3 :{ uri: `${item.logo_url}` } }
            style={style.img}></Image>
        </View>
        </View>
      </TouchableOpacity>
    </>
  );}
};

export default CinemasCard;

const styles = (theme: any) =>StyleSheet.create({
  cinemaImg:{
    flex: 1
  },
  rateText:{
    color: theme.colors.TEXT,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  rateTO:{
    width: wp("18"),
    backgroundColor: '#E2E2E280',
    borderRadius: 25,
    marginLeft: wp("5"),
    justifyContent:'center',
    alignItems:'center',
    height:hp("3")
  },
  appCompNameText:{
    color: '#090073',
    textAlign: 'center',
    fontSize: 12,
    textAlignVertical: 'center',
    fontWeight: '500',
    width: wp("20"),
  },
  appCompNameTO:{
    backgroundColor: theme.colors.ICON_COLOR,
    width: wp("30"),
    height: hp("4"),
    borderRadius: 35,
    justifyContent:'center',
    alignItems:'center'
  },
  appCompName:{
    flexDirection: 'row', marginTop: hp("2"), 
  },
  parent:{
    flex: 1.6
  },
  header: {
    fontWeight: '900',
    fontSize: 4,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  details: {
    fontWeight: '500',
    fontSize: 12,
    marginHorizontal: wp("3"),
    color: theme.colors.TEXT_SECONDARY,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    color: theme.colors.TEXT,
    marginHorizontal: wp("3"),
  },
  date: {
    fontWeight: '500',
    fontSize: 12,
    marginHorizontal: wp("3"),
    marginTop: hp("2"),
  },
  img: {
    height: hp("14"),
    width: wp("28"),
    marginTop:hp('2'),
    marginLeft:wp('5'),
    borderRadius:10,
  },
  headText: {
    flexDirection: 'row',
    flexbox: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  
  container: {
    marginTop: hp("2"),
    height: hp("18"),
    width: wp("100"),
  },

  head: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },

  textHead: {
    width: wp("20"),
    fontWeight: '700',
    fontSize: 14,
    paddingBottom: hp("2"),
  },

  textValue: {
    fontSize: 13,
    paddingBottom: hp("2"),
  },

  descBox: {
    flexDirection: 'row',
    marginTop: hp("0.5"),
  },
  card: {
    backgroundColor: theme.colors.CARD_BACKGROUND,
    width: wp("96"),
    // marginVertical: hp("2"),
    flexDirection: 'row',
    height: hp("18"),
    marginHorizontal:wp('2'),
    borderRadius:10,
  },
  elevation: {
    elevation: 20,
    shadowColor: 'gray',
  },

  image: {
    width: wp("50"),
    height: hp("52"),
  },
  imageContainer: {
    height: hp("50"),
    width: wp("52"),
    borderRadius: 8,
    borderWidth: 0.1,
    marginRight: wp("-10"),
    marginTop: hp("10"),
    overflow: 'hidden',
  },
});

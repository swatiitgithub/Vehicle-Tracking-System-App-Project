import { View } from 'native-base';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { color } from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";
import moment from 'moment';

const EventCard = ({ item, onPress }: any) => {
  const styles = useThemedStyles(style);
    const theme = useTheme();
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress(item)}
        >
        <View style={styles.card}>
          <Image
            source={{uri: `data:image/png;base64,${item.galleryImage}`}}
            style={styles.imageContainer}></Image>
          <View style={{  }}>
            <View style={styles.deskBox}>
              <Text style={styles.dateText}>{`EventDate:`}</Text>
              <Text style={styles.textValue}>{moment(item.eventdate).utc().format('DD-MM-YY')}</Text>
            </View>
            <View >
              <Text numberOfLines={2} style={styles.eventText}>
                {item.appCompName}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>
                {item.commonName}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>
                {item.aboutus}
              </Text>
            </View>
            {/* <View style={styles.location}>
              <View style={styles.locationIcon}><MaterialIcons name="location-on" size={25} color={Colors.black} /></View>
              <Text style={styles.locationText}>
                {'Kanpur,Uttar Pradesh'}
              </Text>

            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default EventCard;

const style =(theme:any)=> StyleSheet.create({
  icon: {
    marginTop: hp("1.5"), justifyContent: 'flex-end'
  },
  card: {
    borderRadius: 20,
    borderWidth: 2,
    marginTop: hp("2"),
    width: wp("98"),
    alignSelf: 'center',
    borderColor: theme.colors.LABEL_BACKGROUND,
    backgroundColor:theme.colors.CARD_BACKGROUND,
  },
  imageContainer: {
    height: hp("20"),
    margin: hp("2"),
    width: wp("88"),
    alignSelf: 'center',
  },
  image: {
    borderRadius: 10
  },
  event: {
    alignSelf: 'center'
  },
  eventText: {
    color: theme.colors.TEXT, fontWeight: '800', fontSize: 15,marginLeft:wp("4")
  },
  isbn: {
    flexDirection: 'row', flex: 1, alignSelf: 'center'
  },
  deskBox: {
    marginHorizontal: wp('4'),
    flexDirection: 'row',
  },
  textValue: {
    color: theme.colors.TEXT, fontWeight: '600', fontSize: 14, marginLeft: wp('1')
  },
  date: {
    marginLeft: wp("14"), position: 'absolute'
  },
  dateText: {
    color: theme.colors.TEXT,
    fontSize: 14
  },
  detail: {
    alignSelf: 'center'
  },
  detailText: {
    fontWeight: '600', color: theme.colors.TEXT_SECONDARY, flexWrap: 'wrap', fontSize: 11
  },
  info: {
    alignSelf: 'center'
  },
  infoText: {
    fontSize: 10, marginLeft: wp("3"), marginTop: hp("2")
  },
  location: {
    flexDirection: 'row',
  },
  locationIcon: {
    marginTop: hp('1'), marginLeft: wp("1")
  },
  locationText: {
    marginTop: hp("1.5"), fontWeight: '500', color: theme.colors.TEXT,
  },
  rate: {
    justifyContent: 'flex-end', marginLeft: wp("10")
  },

});

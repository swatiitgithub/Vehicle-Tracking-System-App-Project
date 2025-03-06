import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import React from 'react';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from '../../config/theme/hooks/useTheme';

const MedicalStoreCard = ({ item, onPress }: any) => {
  const styles = useThemedStyles(style);
  const theme = useTheme();
  const address=item.commonName;
  const pincode = address.match(/\b\d{6}(-\d{5})?\b/);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(item)}>
        <View style={[styles.card, styles.elevation]}>
          <View style={[styles.descBox, styles.desc1]}>
            <View style={styles.img}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: `data:image/png;base64,${item.galleryImage}`}}
                  style={styles.image}></Image>
              </View>
            </View>
            <View style={styles.appCompName}>
              <View style={styles.descBox}>
                <Text numberOfLines={1} style={[styles.head,styles.head1]}>
                  {item.appCompName}
                </Text>
                <View style={styles.descBox}>
                  {/* <Ionicons
                    name="ios-location"
                    size={12}
                    color={Colors.blue}></Ionicons>
                  <Text style={styles.textValue1}>3.2 km</Text> */}
                </View>
              </View>
              <View style={styles.descBox}>
                <Ionicons name="location" size={12} color={theme.colors.ICON} />
                <Text numberOfLines={2} style={styles.textValue}>{item.commonName}</Text>
                  </View>
                <View style={styles.descBox}>
                  <Rating
                    tintColor={theme.colors.CARD_BACKGROUND}
                    type='star'
                    ratingCount={5}
                    imageSize={12}
                    readonly={true}
                    startingValue={item.overAllRating}/>
                  <Text style={styles.textValue}>{item.noOfReviews}</Text>
                </View>
                <View >
                  <View style={styles.desc2}>
                    <Text style={styles.textHead} >
                      {'Phone No: '}
                    </Text>
                    <Text style={styles.textValue1} >
                      {item.contact1}
                    </Text>
                  </View>

                  <View style={styles.desc2}>
                    <Text style={styles.textHead} >
                      {'Pincode: '}
                    </Text>
                    <Text style={styles.textValue1}>{pincode}
                    </Text>
                  </View>
                </View>
            </View>
          </View>
          <View style={[styles.bottomContainer, styles.bottomContainer1]}>
              <View style={[styles.descBoxBottom, { alignItems: "center" }]}>
                <Text style={styles.bottomText}>{'Open Timings :'}</Text>
                <Text style={styles.bottomText}>{item.timing}</Text>
              </View>
            </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default MedicalStoreCard;

const style =(theme:any)=> StyleSheet.create({
  head1:{
    flex: 1
  },
  desc2:{
    flexDirection: 'row',
  },
  appCompName:{
    flex: 2.1, marginHorizontal: wp("2")
  },
desc1:{flex: 3,flexWrap:'wrap'},
img:{
  flex:1
},
bottomContainer1:{
  flex: 1,
},
  container: {
    height: hp("24"),
    marginHorizontal: wp("3"),
    marginTop: hp("2"),
  },
  card: {
    height: hp("23"),
    backgroundColor: theme.colors.CARD_BACKGROUND,
    borderRadius: 8,
    width: wp("94"),
    marginVertical: hp("1"),
  },
  head: {
    paddingTop: hp("1"),
    fontWeight: '600',
    fontSize: 18,
    color: theme.colors.TEXT,
  },

  textHead: {
    color: theme.colors.TEXT,
    fontWeight: '500',
    fontSize: 12,
  },

  textValue: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: wp("2"),
    color:theme.colors.TEXT_SECONDARY,
  },

  textValue1: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.TEXT_SECONDARY,
  },

  descBox: {
    flexDirection: 'row',
    marginTop: hp("0.5"),
  },
  elevation: {
    elevation: 20,
    shadowColor: Colors.backgroundGrey,
  },

  image: {
    width: wp("26"),
    height: hp("14"),
  },
  imageContainer: {
    height: hp("14"),
    width: wp("26"),
    borderRadius: 48,
    borderWidth: 0.1,
    marginLeft: wp("3"),
    marginTop: hp("1.5"),
    overflow: 'hidden',
  },
  bottomText: {
    fontWeight: '500',
    fontSize: 14,
    color: theme.colors.TEXT,
  },
  bottomContainer: {
    borderTopColor: theme.colors.TEXT,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:hp("4")
  },
  descBoxBottom: {
    flexDirection: 'row',
  },
});

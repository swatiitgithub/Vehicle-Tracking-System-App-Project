import { View } from 'native-base';
import React, { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';
import { color } from 'react-native-reanimated';
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontSize, hp, wp } from '../../utils/Responsive';
import i18n from '../../utils/i18n';
import AppStyleConstant from '../../utils/AppStyleConstant';
import useThemedStyles from '../../config/theme/hooks/useThemedStyles';
import useTheme from '../../config/theme/hooks/useTheme';

const TrendsCard = ({ item, onPress }: any) => {
  const value = useRef(new Animated.Value(0)).current;
  function move() {
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1,
        duration: 1000,
        delay: 200,
        useNativeDriver: false
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: 1000,
        delay: 2000,
        useNativeDriver: false
      })
    ]).start(() => {
      move()
    });
  }
  const styles = useThemedStyles(style);
  const theme = useTheme();
  const getTrendName = (compName: string): string => {
    if (compName.includes("Hotel"))
      return "Hotel";
    else
      if (compName.includes("Rest"))
        return "Restaurant";
      else
        return "Trending"
    //console.log(trendName)
  }
  console.log(item)
  return (
    <>
      <View style={styles.deskBox2}>
        <Animated.View >
          <Animated.Text style={[styles.textHead, { transform: [{ scale: value }] }]}>{`${getTrendName(item.appCompName)} of the Week`}</Animated.Text>
        </Animated.View>
      </View>
      <TouchableOpacity
        style={styles.container}
        onLayout={() => move()}
        onPress={() => onPress(item)}>

        <View style={[styles.card, styles.elevation]}>
          <View style={[styles.descBox1]}>
            <View style={{ flex: 1, }}>
              <Text numberOfLines={1} style={[styles.head]} >
                {item.appCompName}
              </Text>
            </View>
            <View style={{ flex: 3.2, }}>
              <View style={[styles.imageContainer]}>
              
                <IconFontAwesome style={[styles.icon]} name='location' size={15} color={theme.colors.ICON_COLOR} />
                <Text numberOfLines={7} style={[styles.textValue]} >
                  {item.commonName}
                </Text>
              
                <Image style={styles.image}
                  source={{ uri: `data:image/png;base64,${item.galleryImage}` }} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{alignSelf:'flex-end',paddingVertical:10,flexDirection:'row'}}>
              <Text numberOfLines={1} style={[styles.textValue1]} >
                {item.overAllRating}
              </Text>
              <Rating
                type='custom'
                tintColor={theme.colors.CARD_BACKGROUND}
                // ratingColor='red'
                ratingCount={5}
                imageSize={15}
                readonly={true}
                startingValue={5} />
                </View>
            </View>
            {/* <View style={styles.img}>
              <View style={styles.imageContainer}>
                <Image style={styles.image}
                  source={{ uri: `data:image/png;base64,${item.galleryImage}` }} />
              </View>
            </View>
            <View style={styles.appComp}>
              <View style={[styles.descBox]}>
                <Text numberOfLines={1} style={[styles.head, styles.head1]} >
                  {item.appCompName}
                </Text>
                <Rating
                  style={[ styles.descBox1]}
                  type='custom'
                  tintColor={theme.colors.CARD_BACKGROUND}
                  // ratingColor='red'
                  ratingCount={5}
                  imageSize={15}
                  readonly={true}
                  startingValue={5} />
              </View>
              <View style={[styles.descBox, styles.descBox2]}>
                <IconFontAwesome style={styles.icon} name='location' size={14} color={theme.colors.ICON_COLOR} />
                <Text numberOfLines={2} style={[styles.textValue]} >
                  {item.commonName}
                </Text>
              </View>

              <View style={styles.phNo}>
                <View style={styles.descBox}>
                  <Text style={styles.textValue1} >
                    {`Phone: ${item.contact1}`}
                  </Text>
                </View>
              </View>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default TrendsCard;

const style = (theme: any) => StyleSheet.create({
  deskBox2: {
    width: wp('94'),
    marginTop: hp("2"),
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: hp("1"),
    // backgroundColor: '#FE9072',
    alignContent: 'center',
    alignSelf: 'center',
    // borderTopLeftRadius: 28,
    // borderBottomRightRadius: 28
  },
  textHead: {
    fontSize: 16,
    color: theme.colors.TEXT,
    fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
  },
  phNo: {
    flexDirection: 'row',
  },
  appComp: {
    flex: 1.7
  },
  img: {
    height: '100%',
    justifyContent: 'center',
    flex: 1
  },
  container: {
    height: hp("30"),
    marginHorizontal: wp("5"),
  },
  card: {
    height: hp("28"),
    backgroundColor: theme.colors.CARD_BACKGROUND,
    borderRadius: 8,
    width: '100%',
    marginVertical: hp("1"),
  },
  head: {
    paddingHorizontal:wp('2'),
    paddingTop: hp("1"),
    fontSize: 16,
    color: theme.colors.TEXT,
    fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
  },
  icon: {
    marginLeft: wp("1")
  },
  descBox: {
    flexDirection: 'row',
    paddingTop: hp("1")
  },
  textValue: {
    width:"38%",
    fontSize: 14,
    fontWeight: '400',
    // paddingLeft: wp('1'),
    // marginRight: wp("3"),
    color: theme.colors.TEXT_SECONDARY
  },
  textValue1: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.TEXT,
    paddingRight: wp("2"),
    marginTop:hp('-0.3')
  },
  elevation: {
    elevation: 20,
    shadowColor: 'gray',
  },
  image: {
    elevation: 10,
    width: "60%",
    height: hp("17"),
    borderRadius:4,
    alignSelf: 'flex-end',
    borderWidth: 0.1,
  },
  imageContainer: {
    flexDirection:'row',
    height: hp("17"),
    width: "100%",
    borderRadius: 4,
    overflow: 'hidden',
    // justifyContent: 'center',

  },
  descBox1: {
    flex: 1,
    marginHorizontal: wp('4')
  },
  descBox2: {
    marginRight: 10
  },

})

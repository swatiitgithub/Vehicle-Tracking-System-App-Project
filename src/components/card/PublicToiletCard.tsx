import IconFontAwesome from 'react-native-vector-icons/EvilIcons';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import Colors from '../../utils/Colors';
import { hp, wp } from '../../utils/Responsive';
import useThemedStyles from '../../config/theme/hooks/useThemedStyles';
import useTheme from '../../config/theme/hooks/useTheme';

const PublicToiletCard = ({item, onPress}: any) => {
  const styles = useThemedStyles(style);
  const theme = useTheme();
  return (
    <>
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => onPress(item)}>
        <View style={[styles.card, styles.elevation]}>
          <View style={[styles.imageView]}>
            <View style={[styles.imageContainer]}>
            <Image
              source={{uri: `data:image/png;base64,${item.galleryImage}`}}
              style={styles.image}></Image>
            </View>
          </View>
          <View style={styles.app}>
            <View style={styles.descBox}>
              <Text style={styles.head}>{item.appCompName}</Text>
              {/* <Text style={styles.free}>
                Free
              </Text> */}
            </View>

            {/* <View style={styles.descBox}>
            <Text style={styles.textValue}>{'Kanpur,Uttar Pradesh</Text>'}
            </View> */}
            <View style={styles.descBox}>
            <Text numberOfLines={2} style={styles.textValue}>
              {`Address: ${item.commonName}`}
            </Text>
            </View>
            <View style={styles.rate}>
              <AirbnbRating
                count={5}
                defaultRating={item.overAllRating}
                size={12}
                showRating={false}
                isDisabled={true}
              />
            </View>
            <View style={styles.location}>
              {/* <View style={{flex:1}}>
                <Text style={styles.textValue}>
                  <IconFontAwesome name="location" size={13} color={Colors.lightgreen} />
                  {'1.2km from kanpur'}
                </Text>
              </View> */}
              <View style={styles.text}>
                <Text style={styles.textValue}>
                  <IconFontAwesome name="clock" size={13} color={theme.colors.ICON} />
                  {item.timing}
                </Text>
              </View>
              <View style={styles.rating}>
                <TouchableOpacity
                  style={styles.vbutton}>
                  <View style={styles.overAll}>
                    <Text style={styles.textHead}>{item.overAllRating}
                    </Text>
                    <IconFontAwesome
                      name="star"
                      color={theme.colors.ICON}
                      size={12}>
                      </IconFontAwesome>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PublicToiletCard;

const style =(theme:any)=> StyleSheet.create({
  overAll:{
    flexDirection: 'row', justifyContent: 'center',
    alignItems:'center'
  },
  rating:{
    alignItems:'flex-end'
  },
  text:{
    flex:1
  },
  location:{
    flexDirection: 'row'
  },
  rate:{
    alignItems: 'flex-start'
  },
  free:{
    color: '#2DD35C',marginRight:wp("3")
  },
  app:{
    flex: 1,paddingTop:hp("1")
  },
  container: {
    paddingTop:hp('2'),
    height: hp("18"),
    width:wp("99"),
  },
  card: {
    marginTop:hp('2'),
    height: hp("17"),
    marginHorizontal:wp("3"),
    borderRadius: 8,
    backgroundColor:theme.colors.CARD_BACKGROUND,
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  head: {
    flex:1,
    fontWeight: '800',
    fontSize: 15,
    color: theme.colors.TEXT,
  },

  textHead: {
    fontWeight: '600',
    fontSize: 12,
    color:theme.colors.TEXT,
  },

  textValue: {
    fontSize: 12,
    color:theme.colors.TEXT_SECONDARY
  },

  descBox: {
    flexDirection: 'row',
    marginTop: hp("0.8"),
  },
  elevation: {
    elevation: 20,
    shadowColor: Colors.backgroundGrey,
  },
  image: {
    width: wp("25"),
    height: hp("12"),
  },
  imageContainer: {
    height: hp("12"),
    width: wp("25"),
    borderRadius: 8,
    borderWidth: 0.1,
    overflow: 'hidden',
    justifyContent:'center',
    alignItems:'center'
  },
  imageView: {
    justifyContent:'center',
    marginLeft:wp("3"),
    marginRight: wp("2"),
    marginTop:hp('1.5'),
  },
  vbutton: {
    backgroundColor: theme.colors.HEADER_BACKGROUND,
    borderRadius: 4,
    height: hp("3"),
    width: wp("10"),
    justifyContent: 'center',
    marginRight:wp("3"),
  },
});

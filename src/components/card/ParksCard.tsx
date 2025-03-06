import {View} from 'native-base';
import {Image, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from '../../config/theme/hooks/useThemedStyles';
import useTheme from '../../config/theme/hooks/useTheme';


const ParksCard = ({item, onPress}: any) => {
  const styles = useThemedStyles(style);
  const theme = useTheme();
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
        <View style={[styles.card, styles.elevation]}>
          <View style={styles.descBox}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{uri: `data:image/png;base64,${item.galleryImage}`}}
              />
            </View>

            <View style={{flex: 2,marginHorizontal:wp('2')}}>
              <View style={styles.descBox}>
                <Text numberOfLines={1} style={[styles.head,styles.head1]}>
                 {item.appCompName}{' '}</Text>
                  <Text style={styles.rate}>
                    {item.overAllRating}
                    <IconFontAwesome name="star" size={10} color={theme.colors.ICON} />
                  </Text>
                
              </View>

              <View style={styles.commonName}>
                <IconFontAwesome name="location" size={12} color={theme.colors.ICON} />
                <Text numberOfLines={3} style={[styles.textValue]}>
                  {item.commonName}
                </Text>
              </View>
            </View>
            <View style={styles.button}>
              <TouchableOpacity 
               onPress={()=>onPress(item)}
              style={styles.vbutton}>
                <Text style={styles.textHead}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default ParksCard;

const style =(theme:any)=> StyleSheet.create({
  button:{
    alignSelf: 'center',flex:1
  },
  commonName:{
    flexDirection:'row'
  },
  rate:{
    color: theme.colors.TEXT, fontSize: 10
  },
  head1:{
    flex: 1,
  },
  container: {
    height: hp("15"),
    marginHorizontal: wp("3"),
  },
  card: {
    height: hp("13"),
    backgroundColor: theme.colors.CARD_BACKGROUND,
    borderRadius: 18,
    width: wp("95"),
    marginVertical: hp("2"),
    paddingHorizontal: wp("2"),
  },
  head: {
    fontWeight: '700',
    fontSize: 15,
    color: theme.colors.TEXT,
  },
  descBox: {
    flexDirection: 'row',
    paddingVertical: hp("0.5"),
  },
  textHead: {
    fontWeight: '600',
    fontSize: 12,
    alignSelf: 'center',
    color: theme.colors.TEXT,
  },

  textValue: {
    fontSize: 12,
    fontWeight: '600',
    flexWrap: 'wrap',
    paddingLeft: wp("2"),
    paddingRight: wp("2"),
    color: theme.colors.TEXT_SECONDARY,
  },
  elevation: {
    // elevation: 20,
    // shadowColor: 'gray',
  },
  image: {
    width: wp("30"),
    height: hp("10"),
  },
  imageContainer: {
    height: hp("10"),
    width: wp("30"),
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop:hp('1'),
    flex:1,
    
  },
  vbutton: {
    height: hp("4"),
    width: wp("18"),
    borderRadius: 20,
    marginRight:18.5,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
  },
});

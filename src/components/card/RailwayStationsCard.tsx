import { View } from 'native-base';
import { Image, ImageBackground, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';
import { color } from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from '../../config/theme/hooks/useThemedStyles';
import useTheme from '../../config/theme/hooks/useTheme';

const RailwayStationsCard = ({ item, onPress }: any) => {
  const styles = useThemedStyles(style);
  const theme = useTheme();
  return (
    <>
      <TouchableOpacity
      onPress={() => onPress(item)}>
        <View style={styles.border}>
          <ImageBackground
            source={{uri: `data:image/png;base64,${item.galleryImage}`}}
            style={styles.card}
            imageStyle={styles.border}>
            <View>
              <View
                style={styles.container}>
                {/* <View style={styles.share}>
                  <TouchableOpacity>
                    <FontAwesome5 name="share-alt" size={30} color={Colors.white} />
                  </TouchableOpacity>
                </View> */}
              </View>
              <View
                style={styles.descBox}>
                {/* <View style={styles.descBox1}>
                  <FontAwesome5 name="train" size={25} color={Colors.white} />
                </View> */}
                {/* <Text style={styles.distance}>
                  {''}
                </Text> */}
              </View>
              <View style={styles.name}>
                <Text
                  style={styles.Text}>
                  {item.appCompName}
                </Text>
              </View>
              <View style={styles.add}>
                <Text numberOfLines={2} style={styles.addText}>
                {item.commonName}
                </Text>
              </View>
              {/* <View style={styles.zone} >
                <Text style={styles.zoneText}>
                  Zone:NR/Northern
                </Text>
              </View> */}
              {/* <View style={styles.data}>
                <Text
                  style={styles.dataText}></Text>
              </View> */}
              <View style={styles.Icon}>
                <Text
                  style={styles.icon}>
                  <FontAwesome5 name="train" size={25} /> Railway
                  Station,Kanpur-Uttar Pradesh
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default RailwayStationsCard;

const style =(theme:any)=> StyleSheet.create({
  border: {
    borderRadius: 10
  },
  card: {
    height: hp("23"),
    marginTop: hp("2"),
    width: wp("95"),
    alignSelf: 'center',
  },
  container: {
    position: 'absolute',
    marginTop: hp("2"),
    zIndex: 1,
    marginLeft: wp("85"),
  },
  share: {
    alignItems: 'flex-end',
  },
  descBox: {
    position: 'absolute',
    marginTop: hp("16"),
    zIndex: 1,
    marginLeft: wp("80"),
  },
  descBox1: {
    alignItems: 'flex-end', opacity: 0.7
  },
  distance: {
    color: theme.colors.TEXT, fontSize: 14, fontWeight: '900'
  },
  name: {
    backgroundColor: theme.colors.CARD_BACKGROUND, marginTop: hp("10"), opacity: 0.7
  },
  Text: {
    color: theme.colors.TEXT,
    fontSize: 15,
    marginLeft: wp("2"),
    fontWeight: '900',
  },
  add: {
    backgroundColor: theme.colors.CARD_BACKGROUND, opacity: 0.7
  },
  addText: {
    color: theme.colors.TEXT, fontSize: 12, marginLeft: wp("2")
  },
  zone: {
    backgroundColor: theme.colors.CARD_BACKGROUND, opacity: 0.7
  },
  zoneText: {
    color: theme.colors.TEXT_SECONDARY, fontSize: 12, marginLeft: wp("2")
  },
  data: {
    backgroundColor: theme.colors.TEXT, opacity: 0.7
  },
  icon: {
    color: theme.colors.ICON_COLOR,
    fontSize: 12,
    marginLeft: wp("2"),
    fontWeight: '900',
  },
  dataText: {
    color: Colors.white, fontSize: 12, marginLeft: wp("2")
  },
  Icon: {
    backgroundColor: theme.colors.CARD_BACKGROUND, height: hp("50"), opacity: 0.7
  }
});

import IonIcons from 'react-native-vector-icons/Ionicons';
import useThemedStyles from "../../../src/config/theme/hooks/useThemedStyles";
import useTheme from '../../config/theme/hooks/useTheme';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
const phNO = '6394755955';
import Images from '../../utils/Images';
import { fontSize, hp, wp } from '../../utils/Responsive';

const ATMServiceCard = ({ item, onPress }: any) => {
  const address=item.commonName;
  const pincode = address.match(/\b\d{6}(-\d{5})?\b/);
  const style = useThemedStyles(styles);
  const theme=useTheme();

  var getImageLogo = (name: any) => {
    if (name.startsWith("State Bank Of", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.SBIBANK_CARDIMG}/>)
    if (name.startsWith("Punjab National", 0))
        return(<Image
            style={style.image}
            resizeMode="cover"
            source={ Images.PNBBANK_CARDIMG}/>)
    if (name.startsWith("Allahabad", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.ALLAHABADBANK_CARDIMG}/>)
    if (name.startsWith("Indian Bank", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.INDIANBANK_CARDIMG}/>)
    if (name.includes("Baroda", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.BOBBANK_CARDIMG}/>)
    if (name.startsWith("Central Bank of India", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.CBOIBANK_CARDIMG}/>)
    if (name.startsWith("Canara Bank", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.CANRABANK_CARDIMG}/>)
    if (name.startsWith("Bank of Maharashtra", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.MAHARASHTRABANK_CARDIMG}/>)
    if (name.startsWith("Bank of India", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.BOIBANK_CARDIMG}/>)
    if (name.startsWith("UCO Bank", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.UCOBANKCARDIMG}/>)
    if (name.startsWith("Union Bank of India", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.UNIONBANK_CARDIMG}/>)
    if (name.startsWith("HDFC Bank", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.HDFCBANK_CARDIMG}/>)
    if (name.startsWith("Axis Bank", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.BANK_CARDIMG}/>)
    if (name.startsWith("ICICI Bank", 0))
        return(<Image
            style={style.image}
            resizeMode="contain"
            source={ Images.ICICIBANK_CARDIMG}/>)
    else return(<Image
      style={style.image}
      resizeMode="contain"
      source={ Images.ATM_CARDIMG}/>)

}

  return (
    <>
      <TouchableOpacity
        style={[style.container]}
        onPress={() => onPress(item)}>
        <View style={[style.card, style.elevation]}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={style.imageContainer}>
              {/* <Image
                source={{uri: `data:image/png;base64,${item.galleryImage}`}}
                style={style.image}></Image> */}
                {getImageLogo(item.appCompName)}
            </View>
          </View>
          <View style={style.parentDescBox}>
            <View style={style.descBox}>
              <Text numberOfLines={1} style={[style.head,style.head1]}>{item.appCompName}</Text>
              {/* <View style={styles.location}>
                <IonIcons name='location-sharp' size={10} color={Colors.orange} />
                <Text style={styles.textValue}>{'3.5km'}</Text>
              </View> */}
            </View>
            <View style={style.descBox}>
              <IonIcons
                name="location"
                size={12}
                color={theme.colors.ICON_COLOR} />
              <Text numberOfLines={2} style={style.textValue}>{item.commonName}</Text>
            </View>
            <View style={style.descBox}>
              <Text style={style.textHead}>{'Pincode :'} </Text>
              <Text style={style.textValue1}>{pincode}</Text>
            </View>
            {/* <View style={style.descBox}>
              <View style={style.enquiry}>
              <Text style={style.textHead}>{`Phone no:- `}</Text>
              <Text style={style.textValue1}>{item.contact1}</Text>
              </View>
            </View> */}
              
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ATMServiceCard;

const styles = (theme: any) => StyleSheet.create({
  icon:{
    color:theme.colors.TEXT
  },
  rate:{
    flexDirection: 'row', 
    fontSize: 11,
    fontWeight: '500',
  
  },
  enquiry:{
    flex:1,flexDirection:'row'
  },
  location:{
    flexDirection: 'row', marginTop: 5 
  },
head1:{
flex:1
},
  container: {
    height: hp("21"),
    marginHorizontal: wp("5"),
  },
  card: {
    height: hp("20"),
    backgroundColor: theme.colors.CARD_BACKGROUND,
    borderRadius: 8,
    width: wp("90"),
    marginVertical: hp("1.5"),
    flexDirection: 'row',
  },

  head: {
    paddingTop:hp("1"), 
    fontWeight: '600',
    fontSize: 20,
    color: theme.colors.TEXT,
  },
  textHead: {
    fontWeight: '500',
    fontSize: 12,
    color: theme.colors.ICON_COLOR,
    marginTop:hp("-1")
  },

  textValue: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.TEXT_SECONDARY
  },
  textValue1: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.ICON_COLOR,
    marginTop:hp("-1")
  },
  textValue2: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.ICON_COLOR,

  },

  descBox: {
    flexDirection: 'row',
    marginTop: hp("1.6"),
    alignItems:'flex-start'
  },

  elevation: {
    elevation: 20,
    shadowColor: 'gray',
  },

  image: {
    height: hp("15"),
    width: wp("30"),
  },
  imageContainer: {
    height: hp("15"),
    width: wp("30"),
    borderRadius: 10,
    // borderWidth: 0.1,
    overflow: 'hidden',
    marginLeft: wp("4"),
  },
  parentDescBox:{
    flex: 1.5, marginHorizontal: wp('3.5') 
  }
});

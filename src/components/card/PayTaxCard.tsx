import { View } from 'native-base';
import React from 'react';
import { Image, StyleSheet, Text, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';
import { color } from 'react-native-reanimated';
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { fontSize, hp, wp } from '../../utils/Responsive';
import { useNavigation } from '@react-navigation/native';

const PayTaxCard = ({ item, indexKey, catName }: any) => {
  const navigation = useNavigation();
  const arr = item.commonName.split(',');
  const onWebService = (urlData: any) => {
    let params: Object = {
      url: urlData.website,
      name: item.appCompName
    };
    if (catName == 'VILLAGE AND PANCHAYAT')
      navigation.navigate('MyWeb', params);
  };
  console.log(arr[0]);
  return (
    <>
      <TouchableOpacity
        style={[styles.container, styles.card]}
        onPress={() => onWebService(item)}>
        <View style={[{ flex: 1 }]}>
          <View style={(indexKey % 2 == 0) ? [styles.descBox, { backgroundColor: Colors.lessdarkgrey }] : styles.descBox}>
            <Text style={[styles.textValue, { flex: 0.7 }]}>
              {indexKey + 1}
            </Text>
            <Text style={[styles.textValue]}>
              {item.appCompName}
            </Text>
            <Text style={[styles.textHead]}>
              {arr[0]}
            </Text>
            {/* <Text style={[styles.textValue, { flex: 0.5 }]}>
              {item.totaldays}
            </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default PayTaxCard;

const styles = StyleSheet.create({
  parent: {
    flex: 1
  },
  container: {
    alignSelf: 'center',
    width: wp("100"),
  },

  textHead: {
    paddingVertical: 5,
    flex: 1,
    borderWidth: 1,
    width: '25%',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 14,
    textAlignVertical: 'center',
    color: '#061EF0',
    borderColor: Colors.greygrey,

  },

  textValue: {
    flex: 1,
    width: '25%',
    fontSize: 13,
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    textAlignVertical: 'center',
    borderColor: Colors.greygrey
  },

  descBox: {
    flexDirection: 'row',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    width: wp("94"),
    flexDirection: 'row',
    // borderRadius:8,
    borderWidth: 0.5,
    borderColor: Colors.greygrey
  },
  elevation: {
    elevation: 20,
    shadowColor: 'blue',
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

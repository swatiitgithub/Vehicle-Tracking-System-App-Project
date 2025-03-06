import {View} from 'native-base';
import ViewMoreText from 'react-native-view-more-text';
import React from 'react';
import {Image, StyleSheet, Text, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {color} from 'react-native-reanimated';
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import {fontSize, hp, wp} from '../../utils/Responsive';
import styles from '../ReviewList/style';
const renderViewMore=(onPress:any)=>{
  return(
    <Text onPress={onPress} style={{fontWeight:'700',color:Colors.blue,marginTop:hp("1.5")}}>View more</Text>
  )
}
const renderViewLess=(onPress:any)=>{
  return(
    <Text onPress={onPress} style={{fontWeight:'700',color:Colors.blue,marginTop:hp("1.5")}}>View less</Text>
  )
}
const ReviewCard = ({item, onPress}: any) => {
  return (
    <>
      <View
        style={styles.card}>
        <View style={styles.card1}>
          <View
            style={styles.firstLetter}>
            <Text
              style={styles.firstLetterText}>
              {item?.name}
            </Text>
          </View>
          <View style={{justifyContent:'center'}}>
            <Text style={styles.text}>
              {item?.userID}
            </Text>
          </View>
        </View>
        <View style={styles.rate}>
          <View style={styles.rate1}>
          <AirbnbRating
  count={5}
  defaultRating={item?.rating}
  size={10}
  selectedColor={Colors.darkgreen}
  showRating={false}
  isDisabled={true}
/>
          </View>
          <View>
            <Text style={styles.text1}>{item?.entryDate}</Text>
          </View>
        </View>
        <View style={styles.desc}>
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
        >
          <Text numberOfLines={4} style={styles.text2}>{item?.reviewText}</Text>
          </ViewMoreText>
        </View>
      </View>
    </>
  );
};
export default ReviewCard;

import { View } from "native-base"
import { Image, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Rating } from "react-native-ratings"
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../../src/config/theme/hooks/useThemedStyles";
import useTheme from '../../config/theme/hooks/useTheme';
import Colors from "../../utils/Colors";
const CommonCard = ({ item, onPress }: any) => {
    const address=item.commonName;
    const pincode = address.match(/\b\d{6}(-\d{5})?\b/);
    const style = useThemedStyles(styles);
    const theme=useTheme();
    return (
        <>
            <TouchableOpacity
                style={style.container}
                onPress={() => onPress(item)}>

                <View style={[style.card, style.elevation]}>

                    <View style={style.descBox}>
                        <View style={style.imageCard}>
                            <View style={style.imageContainer}>
                                <Image style={style.image}
                                    source={{uri: `data:image/png;base64,${item.galleryImage}`}} />
                            </View>
                        </View>
                        <View style={style.star}>
                            <View style={[style.descBox]}>
                                <Text numberOfLines={2} style={[style.head]} >
                                {item.appCompName}
                                </Text>
                                <Rating type='star'
                                    tintColor={theme.colors.CARD_BACKGROUND}
                                    style={style.rate}
                                    ratingCount={5}
                                    imageSize={10}
                                    startingValue={item.overAllRating}
                                    readonly={true} />
                            </View>
                            {/* <View style={style.descBox}>
                                <Text numberOfLines={1} style={[style.textValue1]} >
                                    {'Address :'}{item.commonName}
                                </Text>
                            </View> */}
                            <View style={[style.descBox]}>
                                <View style={style.descBox}>
                                    <IconFontAwesome name='clock-o' size={12} color={theme.colors.ICON_COLOR} />
                                    <Text style={style.textValue}>{item.timing}
                                    </Text>
                                </View>
                                <View style={style.descBox}>
                                    <IconFontAwesome name="phone" size={11} color={theme.colors.ICON_COLOR} />
                                    <Text style={style.textValue} >
                                        {item.contact1}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={style.bottomcontainer}>
                        <View style={style.descBoxbottom}>
                            <TouchableOpacity
                                style={style.vbutton}>
                                <Text style={style.textHead}>{item.overAllRating}</Text>
                                <IconFontAwesome name='star' size={8} color={theme.colors.ICON_COLOR} />
                            </TouchableOpacity>
                        </View>
                        <View style={style.descBoxbottom}>
                            <Text style={[style.textHead,{color:Colors.white}]} >
                                {'Pincode : '}
                            </Text>
                            <Text style={[style.textValue,{color:Colors.white}]} >
                                {pincode}
                            </Text>
                        </View>
                        <View style={style.descBoxbottom}>
                            <TouchableOpacity
                             onPress={()=>onPress(item)}
                                style={[style.vbutton]}>
                                <Text style={style.textHead1}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
export default CommonCard;

const styles = (theme: any) => StyleSheet.create({
    star:{
        flex: 3 
    },
    imageCard:{
        flex: 1,marginRight:wp("2.5")
    },
    rate:{
        marginLeft: wp("2"), marginTop: hp("1"),
    },
    container: {
        height: hp("19.5"),
        marginHorizontal: wp("5"),
        marginTop: hp("2"),
    },
    card: {
        height: hp("18.5"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderRadius: 8,
        width: wp("90"),
        marginVertical: hp("1"),
    },
    elevation: {
        elevation: 2,
        shadowColor: 'gray',
    },
    descBoxbottom: {
        flexDirection: 'row',
        flex:1,
        justifyContent:'center'
    },
    head: {
        fontWeight: '400',
        fontSize: 18,
        color: theme.colors.TEXT,
        flex:1,
    },
    descBox: {
        flexDirection: 'row',
        paddingTop:hp("1"),
        marginRight:wp("2")
    },
    bottomcontainer: {
        backgroundColor: '#FFA992',
        flexDirection: 'row',
        paddingTop: hp('1'),
        paddingBottom: hp('0.5'),
        position:'absolute',
        bottom:0,
        borderBottomColor:'#FFA992',
        borderBottomWidth:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    textHead: {
        fontWeight: '400',
        fontSize: 10,
        paddingRight:wp("1"),
        color:theme.colors.TEXT
    },
    textHead1: {
        fontWeight: '400',
        fontSize: 10,
        color:theme.colors.TEXT
    },

    textValue: {
        color:theme.colors.TEXT,
        fontSize: 10,
        fontWeight:'400',
        marginRight:wp("5"),
        marginLeft:wp("1.5")
    },
    textValue1: {
        fontSize: 12,
        fontWeight:'400',
        marginRight:wp("1.5"),
        color:theme.colors.TEXT_SECONDARY,
        width:wp("65")
    },
   
    image: {
        width: wp("20"),
        height: hp("10"),
    },
    imageContainer: {
        height: hp("10"),
        width: wp("20"),
        borderRadius: 8,
        borderWidth: 0.1,
        marginTop: hp("1.5"),
        marginLeft:wp("2.5"),
        overflow: 'hidden',
    },
    vbutton: {
        flexDirection:'row',
        height: hp("2.5"),
        width: wp("12"),
        borderRadius: 10,
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderWidth: 1,
        borderColor: theme.colors.LABEL_BACKGROUND,
        justifyContent:'center',
        alignItems:'center',
        
    },
})
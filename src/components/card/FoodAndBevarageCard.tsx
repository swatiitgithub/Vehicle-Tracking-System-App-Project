import { View } from "native-base"
import { Image, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Rating } from "react-native-ratings"
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const FoodAndBevarageCard = ({ item, onPress }: any) => {
    const styles = useThemedStyles(style);
    const theme = useTheme();
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}>

                <View style={[styles.card, styles.elevation]}>

                    <View style={styles.descBox}>
                        <View style={styles.img}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image}
                                    source={{uri: `data:image/png;base64,${item.galleryImage}`}} />
                            </View>
                        </View>
                        <View style={styles.appComp}>
                            <View style={[styles.descBox]}>
                                <Text numberOfLines={1} style={[styles.head, styles.head1]} >
                                    {item.appCompName}
                                </Text>
                                <Rating
                                    style={[styles.descBox,styles.descBox1]}
                                    type='custom'
                                    tintColor={theme.colors.CARD_BACKGROUND}
                                    ratingColor={theme.colors.LABEL_BACKGROUND}
                                    ratingCount={5}
                                    imageSize={15}
                                    readonly={true} 
                                    startingValue={item.overAllRating}/>
                            </View>
                            <Text style={styles.textValue}>{'Indian Food Available'}
                            </Text>
                            <View style={[styles.descBox,styles.descBox2]}>
                                <IconFontAwesome style={styles.icon} name='location' size={12} color={theme.colors.ICON_COLOR} />
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
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
export default FoodAndBevarageCard;

const style =(theme:any)=> StyleSheet.create({
    phNo:{
        flexDirection: 'row',
    },
    appComp:{
        flex: 2.1
    },
    img:{
        justifyContent:'center',
        flex: 1
    },
    container: {
        height: hp("17"),
        marginHorizontal: wp("5"),
    },
    card: {
        height: hp("15"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderRadius: 8,
        width: '100%',
        marginVertical: hp("1"),
    },
    head: {
        paddingLeft:wp("1"),
        fontWeight: '700',
        fontSize: 15,
        color:theme.colors.TEXT,
    },
    head1: {
        flex: 1
    },
    icon:{
        marginLeft:wp("1")
    },
    descBox: {
        flexDirection: 'row',
        paddingTop: hp("1")
    },
    textHead: {
        fontWeight: '400',
        fontSize: 11,
        color:theme.colors.TEXT_SECONDARY
    },

    textValue: {
        fontSize: 10,
        fontWeight: '400',
        paddingLeft: wp('1'),
        marginRight: wp("3"),
        color:theme.colors.TEXT_SECONDARY
    },
    textValue1: {
        fontSize: 10,
        fontWeight: '500',
        color:theme.colors.TEXT,
        paddingRight:wp("3"),
    },
    elevation: {
        elevation: 20,
        shadowColor: 'gray',
    },
    image: {
        width: wp("24"),
        height: hp("12"),
    },
    imageContainer: {
        height: hp("12"),
        width: wp("24"),
        borderRadius: 24,
        borderWidth: 0.1,
        overflow: 'hidden',
        alignSelf: 'center',
        justifyContent:'center',

    },
    descBox1:{
        flex: 1
    },
    descBox2:{
        marginRight:10    },

})
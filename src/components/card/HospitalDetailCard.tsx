import { View } from "native-base"
import { Image, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Rating } from "react-native-ratings"
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
const pin = "";
const address = "";
const startIndex = 0;
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const HospitalDetailCard = ({ item, onPress }: any) => {
    const styles = useThemedStyles(style);
    const theme = useTheme();
    const address = item.commonName;
    const startIndex = address.search(/\d{6}/);
    const pin = startIndex >= 0 ? address.slice(startIndex, startIndex + 6) : null;
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}>

                <View style={[styles.card, styles.elevation]}>

                    <View style={styles.descBox}>
                        <View style={styles.desc}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image}
                                    source={{ uri: `data:image/png;base64,${item.galleryImage}` }} />
                            </View>
                        </View>
                        <View style={styles.appCompName}>
                            <View style={[styles.descBox, styles.desc1]}>
                                <Text numberOfLines={1} style={[styles.head]} >
                                    {item.appCompName}
                                </Text>
                                <Rating
                                    tintColor={theme.colors.CARD_BACKGROUND}
                                    type='star'
                                    style={styles.star}
                                    ratingCount={5}
                                    imageSize={10}
                                    readonly={true}
                                    startingValue={item.overAllRating} />
                            </View>
                            <View style={styles.descBox}>
                                <Text numberOfLines={2} style={[styles.textValue1]} >
                                    {'Address :'}{item.commonName}
                                </Text>
                            </View>
                            <View style={[styles.descBox, { justifyContent: 'space-between' }]}>
                                <View style={styles.descBox}>
                                    <IconFontAwesome name='clock-o' size={12} color={theme.colors.ICON_COLOR} />
                                    <Text style={styles.textValue}>{item.timing}
                                    </Text>
                                </View>
                                <View style={styles.descBox}>
                                    <IconFontAwesome name="phone" size={12} color={theme.colors.ICON_COLOR} />
                                    <Text style={styles.textValue} >
                                        {item.contact1}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.descBoxBottom}>
                            <TouchableOpacity
                                style={styles.vbutton}>
                                <Text style={styles.textHead}>{item.overAllRating}</Text>
                                <IconFontAwesome name='star' size={10} color={theme.colors.ICON} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.descBoxBottom}>
                            <Text style={styles.textHead} >
                                {'Pincode : '}
                            </Text>
                            <Text style={styles.textValue} >
                                {pin}
                            </Text>
                        </View>
                        <View style={styles.descBoxBottom}>
                            <TouchableOpacity
                                onPress={() => onPress(item)}
                                style={[styles.vbutton]}>
                                <Text style={styles.textHead1}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
export default HospitalDetailCard;

const style = (theme: any) => StyleSheet.create({
    star: {
        marginLeft: wp("2"), marginTop: hp("1")
    },
    appCompName: {
        flex: 3,
        marginHorizontal: wp('2')
    },

    desc: {
        flex: 1, marginRight: wp("2")
    },
    desc1: {
        marginRight: wp("2")
    },
    desc2: {
        justifyContent: 'space-between'
    },
    container: {
        height: hp("21"),
        marginHorizontal: wp("3"),
        marginTop: hp("1"),
    },
    card: {
        height: hp("20"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderRadius: 8,
        width: wp("94"),
        marginVertical: hp('1'),
    },
    elevation: {
        elevation: 2,
        shadowColor: 'gray',
    },
    descBoxBottom: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    head: {
        fontWeight: '400',
        fontSize: 16,
        color: theme.colors.TEXT,
        flex: 1,
    },
    descBox: {
        flexDirection: 'row',
        paddingTop: hp("1"),
    },
    bottomContainer: {
        backgroundColor: theme.colors.HEADER_BACKGROUND,
        flexDirection: 'row',
        paddingTop: hp('1'),
        paddingBottom: hp('0.5'),
        position: 'absolute',
        bottom: 0,
        borderBottomColor: theme.colors.HEADER_BACKGROUND,
        borderBottomWidth: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    textHead: {
        fontWeight: '600',
        fontSize: 12,
        paddingRight: wp("0.5"),
        color: theme.colors.TEXT
    },
    textHead1: {
        fontWeight: '400',
        fontSize: 10,
        color: theme.colors.TEXT
    },

    textValue: {
        fontSize: 12,
        fontWeight: '400',
        marginLeft: wp("1"),
        color: theme.colors.TEXT_SECONDARY
    },
    textValue1: {
        fontSize: 12,
        fontWeight: '400',
        color: theme.colors.TEXT,
    },

    image: {
        width: wp("20"),
        height: hp("10"),
    },
    imageContainer: {
        height: hp("10"),
        width: wp("20"),
        borderRadius: 50,
        borderWidth: 0.1,
        marginTop: hp("1"),
        marginLeft: wp("3"),
        overflow: 'hidden',
    },
    vbutton: {
        flexDirection: 'row',
        height: hp("2.5"),
        width: wp("12"),
        borderRadius: 10,
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderWidth: 1,
        borderColor: theme.colors.LABEL_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',

    },
})
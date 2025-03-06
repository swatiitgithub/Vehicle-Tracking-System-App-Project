import { View } from "native-base"
import { Image, StyleSheet, Text, ViewBase } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Rating } from "react-native-ratings"
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
const pin = "";
const address = "";
const startIndex = 0;
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const CSCCard = ({ item, onPress }: any) => {
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


                    <View style={styles.imageParent}>
                        <View style={styles.imageSubParent}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image}
                                    source={{uri: `data:image/png;base64,${item.galleryImage}`}} />
                            </View>
                        </View>

                        <View style={styles.appCompName}>

                            <View style={styles.appCompNameSub}>
                                <View style={[styles.descBox]}>
                                    <Text numberOfLines={1} style={[styles.head, { flex: 1 }]} >
                                        {item.appCompName}
                                    </Text>
                                    {/* <View style={{ justifyContent: 'flex-end' }}>
                                        <IconFontAwesome name='heart-outline' size={20} color={"#E73137"} />
                                    </View> */}
                                </View>

                                <View style={styles.descBox}>
                                    <IconFontAwesome name='location' size={10} color={theme.colors.ICON_COLOR} />
                                    <Text numberOfLines={3} style={[styles.textValue]} >
                                        {item.commonName}
                                    </Text>
                                </View>
                                <View style={[styles.descBox, { justifyContent: 'space-between' }]}>
                                    <View style={styles.descBox}>
                                        <Text style={styles.textHead} >
                                            {'Phone :'}
                                        </Text>
                                        <Text style={styles.textValue} >
                                            {item.contact1}
                                        </Text>
                                    </View>

                                    <View style={styles.descBox}>
                                        <Text style={styles.textHead} >
                                            {'PinCode : '}
                                        </Text>
                                        <Text style={styles.textValue}>{pin}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.descBox}>
                                    <View style={[styles.descBox, { flex: 1 }]}>
                                        <IconFontAwesome name='star' size={12} color={theme.colors.ICON_COLOR} />
                                        <Text style={styles.textValue} >
                                            {item.overAllRating}
                                        </Text>
                                        <Text style={[styles.textValue, { color: theme.colors.ICON_COLOR }]} >
                                            {`(${item.noOfReviews} reviews)`}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between' }}>
                                        <TouchableOpacity
                                            onPress={() => onPress(item)}
                                            style={[styles.vbutton,]}>
                                            <Text style={styles.textHead}>{`View`}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
export default CSCCard;

const style =(theme:any)=> StyleSheet.create({
    appCompNameSub: {
        paddingVertical: hp("2"),
        marginHorizontal: wp("2"),
    },
    appCompName: {
        flex:1.6
    },
    imageSubParent: {
        flex: 1, justifyContent: 'center'
    },
    imageParent: {
        flex: 1, flexDirection: 'row',marginHorizontal: wp('2'),
    },
    container: {
        height: hp("22"),
        marginHorizontal: wp('5'),

    },
    card: {
        height: hp("20"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderRadius: 8,
        width: wp("90"),
        marginVertical: hp('1'),
    },
    head: {
        fontWeight: '500',
        fontSize: 15,
        color: theme.colors.TEXT,
    },
    descBox: {
        flexDirection: 'row',
        paddingTop: hp("0.5"),
    },
    textHead: {
        fontWeight: '500',
        fontSize: 10,
        color: theme.colors.TEXT
    },

    textValue: {
        fontSize: 10,
        fontWeight: '500',
        color:theme.colors.TEXT_SECONDARY
    },
    elevation: {
        elevation: 20,
        shadowColor: 'gray',
        width: wp("90")
    },
    image: {
        width: wp("30"),
        height: hp("15"),
    },
    imageContainer: {
        height: hp("15"),
        width: wp("30"),
        borderRadius: 10,
        borderWidth: 0.1,
        overflow: 'hidden',
        marginLeft: wp("2"),
    },
    vbutton: {
        marginTop:hp('1'),
        flexDirection: 'row',
        height: hp('2.25'),
        width: wp("10"),
        borderRadius: 10,
        backgroundColor: theme.colors.HEADER_BACKGROUND,
        borderWidth: 1,
        borderColor: theme.colors.LABEL_BACKGROUND,
        justifyContent: 'center',
    },
})

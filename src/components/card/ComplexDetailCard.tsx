import { View } from "native-base"
import { Image, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const ComplexDetailCard = ({ item, onPress }: any) => {
    const styles = useThemedStyles(style);
    const theme = useTheme();
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}>

                <View style={[styles.card, styles.elevation]}>


                    <View style={styles.imagespace}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={{ uri: `data:image/png;base64,${item.galleryImage}` }} />
                        </View>
                    </View>
                    <View style={styles.button}>
                        {/* <View style={styles.descBox1}>
                                <View style={styles.vbutton}>
                                    <Text style={styles.textHead} >
                                        {'Complex'}
                                    </Text>
                                </View>
                                <Text style={styles.textHead} >
                                {new Date().getFullYear()+' Update'}
                                </Text> 
                            </View> */}

                        <View style={styles.descBox}>
                            <View style={styles.appCompName}>
                                <Text numberOfLines={1} style={[styles.head]} >
                                    {item.appCompName}
                                </Text>
                                <View style={styles.descBox}>
                                <IconFontAwesome name="map-marker" size={12} color={theme.colors.ICON_COLOR} />
                                    <Text numberOfLines={2} style={[styles.textValue]} >
                                        {item.commonName}
                                    </Text>

                                </View>
                            </View>
                        </View>
                        <View style={styles.address}>
                            <View style={[styles.descBox, styles.subDescBox]}>
                                <IconFontAwesome name="clock-o" size={12} color={theme.colors.ICON_COLOR} />
                                <Text style={styles.textValue}>{item.timing}
                                    </Text>
                            </View>
                            {/* <IconFontAwesome style={styles.descBox1} name="heart" size={20} color={Colors.black} /> */}
                        </View>
                        <View style={[styles.descBox]}>
                                <View style={styles.descBox}>
                                    <IconFontAwesome name="phone" size={12} color={theme.colors.ICON_COLOR} />
                                    <Text style={styles.textValue} >
                                        {item.contact1}
                                    </Text>
                                </View>
                            </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
export default ComplexDetailCard;

const style =(theme:any)=> StyleSheet.create({
    address: {
        flexDirection: 'row'
    },
    appCompName: {
        flexDirection: 'column'
    },
    button: {
        flex: 1.4,
        marginTop: hp('1'),
    },
    complex: {
        flexDirection: 'row', flexWrap: 'wrap'
    },
    container: {
        height: hp("22"),
        marginHorizontal: wp("5"),
    },
    card: {
        height: hp("20"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        width: wp("90"),
        marginVertical: hp("1"),
        borderRadius: 8,
        flexDirection: 'row',
    },
    head: {
        fontWeight: '600',
        fontSize: 15,
        color: theme.colors.TEXT
    },
    descBox: {
        flexDirection: 'row',
        paddingTop: hp("1"),
    },
    subDescBox: {
        flex: 1
    },
    descBox1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: hp("3"),
        marginRight: wp("3"),
    },
    textHead: {
        fontWeight: '400',
        fontSize: 12,
        alignSelf: 'center',
        color: theme.colors.TEXT
    },

    textValue: {
        fontSize: 11,
        fontWeight: '400',
        paddingLeft: wp("1"),
        paddingRight: wp("1"),
        color:theme.colors.TEXT_SECONDARY
    },
    elevation: {
        elevation: 20,
        shadowColor: Colors.darkgrey
    },
    image: {
        width: wp("30"),
        height: hp("30"),
    },
    imageContainer: {
        height: wp("30"),
        width: wp("30"),
        borderRadius: 10,
        borderWidth: 0.1,
        overflow: 'hidden',
    },
    imagespace: {
        flexBasis: '38%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    vbutton: {
        flexDirection: 'row',
        height: hp("3"),
        width: wp("30"),
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.lessdarkgrey,
        justifyContent: 'center',
    },
})
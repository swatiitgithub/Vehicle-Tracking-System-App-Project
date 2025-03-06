import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../../utils/Colors";
import { hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const phNO = '6394755955'
const PostOfficeCard = ({ item, onPress }: any) => {
    const styles = useThemedStyles(style);
    const theme = useTheme();
    const address = item.commonName;
    const pincode = address.match(/\b\d{6}(-\d{5})?\b/);
    return (
        <>
            <TouchableOpacity
                style={[styles.container]}
                onPress={() => onPress(item)} >
                <View style={[styles.elevation, styles.card]}>
                    <View style={[styles.descBox, styles.desc]}>
                        <View style={[styles.desc2]}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image}
                                    source={{ uri: `data:image/png;base64,${item.galleryImage}` }} />
                            </View>
                        </View>
                        <View style={styles.desc3}>
                            <View style={styles.descBox}>
                                <Text numberOfLines={1} style={styles.head}>
                                    {item.appCompName}</Text>
                            </View>

                            <View style={styles.descBox}>
                                <Ionicons
                                    name="ios-location"
                                    size={12}
                                    color={theme.colors.ICON}></Ionicons>
                                <Text numberOfLines={2} style={styles.textValue}>
                                    {item.commonName}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={[styles.location]}>

                        <View style={styles.bottomView}>
                            <Text style={styles.textHead}>LOCATION</Text>
                            <Text numberOfLines={1} style={styles.textValue}>{'Kanpur,UP'}</Text>
                        </View>
                        <View style={styles.bottomView}>
                            <Text style={styles.textHead}>PINCODE</Text>
                            <Text style={styles.textValue}>{pincode}</Text>
                        </View>
                        <View style={styles.bottomView}>
                            <Text style={styles.textHead}>OFFICE TYPE</Text>
                            <Text style={styles.textValue}>{'B.O'}</Text>
                        </View>
                        <View style={styles.bottomView}>
                            <Text style={styles.textHead}>PHONE</Text>
                            <Text style={styles.textValue}>{'1800-266-6868'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default PostOfficeCard;

const style =(theme:any)=> StyleSheet.create({
    location: {
        flex: 1, borderWidth: 0.5, flexDirection: 'row'
    },
    desc: {
        flex: 2
    },
    desc2: {
        flex: 1
    },
    desc3: {
        flex: 3, marginHorizontal: wp("2")
    },
    container: {
        height: hp("15"),
        marginHorizontal: wp("4"),
        marginTop: hp("2"),
    },

    head: {
        fontWeight: '400',
        fontSize: 14,
        color:theme.colors.TEXT,
    },

    textHead: {
        fontWeight: '400',
        fontSize: 10,
        color: theme.colors.TEXT,
    },

    textValue: {
        fontSize: 10,
        paddingBottom: hp("1"),
        color: Colors.greygrey3,
    },
    bottomView: {
        flex: 1, borderWidth: 0.5, alignItems: 'center',
        borderColor: theme.colors.CARD_BACKGROUND,
    },

    descBox: {
        flexDirection: 'row',
        marginTop: hp("1"),
    },
    card: {
        height: hp("15"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        width: wp("92"),
        marginVertical: hp("1"),
    },
    elevation: {
        elevation: 20,
        shadowColor: Colors.backgroundGrey,
    },

    image: {
        width: wp("17"),
        height: hp("10"),
    },
    imageContainer: {
        height: hp("8"),
        width: wp("17"),
        borderRadius: 48,
        marginLeft: wp("2"),
        borderWidth: 0.1,
        overflow: 'hidden',
        justifyContent: 'center'
    }
})
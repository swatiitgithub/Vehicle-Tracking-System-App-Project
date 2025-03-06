import { View } from "native-base"
import { Image, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Rating } from "react-native-ratings"
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const MonumentsCard = ({ item, onPress }: any) => {
    const styles = useThemedStyles(style);
    const theme = useTheme();
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}>

                <View style={[,styles.card, styles.elevation]}>

                    <View style={[styles.descBox,styles.desc1]}>
                        
                        <View style={styles.imageContainer}>
                                <Image style={styles.image}
                                    source={{uri: `data:image/png;base64,${item.galleryImage}`}} />
                        </View>
                        
                        <View style={styles.appCompName}>
                            <View style={styles.descBox}>
                                <Text numberOfLines={1} style={[styles.head, styles.desc1]} >
                                    {item.appCompName}
                                </Text>
                                <View style={styles.star}>
                                    <Text style={styles.textValue}>{item.overAllRating}
                                    </Text>
                                    <IconFontAwesome name='star' size={12} color={theme.colors.ICON} />
                                </View>
                            </View>

                            <View style={styles.descBox}>
                                <IconFontAwesome name='location' size={12} color={theme.colors.ICON} />
                                <Text numberOfLines={3} style={[styles.textValue]} >
                                    {item.commonName}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.vbutton}>
                                <Text style={styles.textHead}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
export default MonumentsCard;

const style =(theme:any)=> StyleSheet.create({
    button:{
        flex:1,alignSelf:'center',marginRight:wp("1")
    },
    star:{
        flexDirection: 'row',
    },
    appCompName:{
        flex: 2.1
    },
    desc1:{
        flex:1
    },
    container: {
        height: hp("15"),
        marginHorizontal: wp("4"),
    },
    card: {
        height: hp("13"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderRadius: 8,
        width: wp("92"),
        marginVertical: hp("1"),
    },
    head: {
        fontWeight: '600',
        fontSize: 15,
        color: theme.colors.TEXT,
    },
    descBox: {
        flexDirection: 'row',
        paddingVertical: hp("0.5")
    },
    textHead: {
        fontWeight: '600',
        fontSize: 12,
        alignSelf: 'center',
        color:theme.colors.TEXT,
    },

    textValue: {
        fontSize: 12,
        fontWeight: '400',
        color:theme.colors.TEXT_SECONDARY
    },
    elevation: {
        elevation: 20,
        shadowColor: Colors.backgroundGrey,
    },
    image: {
        width: wp("20"),
        height: hp("10"),
    },
    imageContainer: {
        height: hp("10"),
        width: wp("20"),
        borderRadius: 10,
        borderWidth: 0.1,
        overflow: 'hidden',
        alignSelf: 'center',
        marginRight:wp("2"),
        marginLeft:wp("3"),
    },
    vbutton: {
        height: hp("4"),
        width: wp("15"),
        borderRadius: 26,
        backgroundColor: Colors.lightgreen,
        justifyContent: 'center',
        marginLeft:wp("5"),
    },
})
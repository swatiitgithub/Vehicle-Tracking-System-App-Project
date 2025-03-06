import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const PoliceStationCard = ({ item, onPress }: any) => {
    const styles = useThemedStyles(style);
    const theme = useTheme();
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}
            >
                <View style={[styles.cardElevation,styles.card, styles.elevation]}>

                    <View style={styles.img}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{uri: `data:image/png;base64,${item.galleryImage}`}} />
                        </View>
                    </View>

                    <View style={styles.app} >
                            <View style={[styles.descBox]}>
                                <Text numberOfLines={1} style={[styles.head,styles.head1]} >
                                {item.appCompName}
                                </Text>
                                <View style={[styles.descBox,styles.descBox1]}>
                                <Text style={styles.textHead}>{item.overAllRating}</Text>
                                <IconFontAwesome name='star' size={11} color={theme.colors.ICON} />
                                </View>
                            </View>

                            <View style={styles.descBox}>
                            <IconFontAwesome name='location' size={13} color={theme.colors.ICON} />
                                <Text numberOfLines={2}  style={[styles.textValue]} >
                                    {item.commonName}
                                </Text>
                            </View>
                            
                            
                            <View style={styles.descBox2}>
                                <IconFontAwesome name='flag' size={13} color={theme.colors.ICON} />
                                <Text style={styles.textValue} >
                                    {item.timing}
                                </Text>
                                </View>
                                <View style={styles.descBox2}>
                                <IconFontAwesome name='call' size={13} color={theme.colors.ICON} />
                                <Text style={styles.textValue} >
                                    {item.contact1}
                                </Text>
                                </View>
                            
                       
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default PoliceStationCard;

const style =(theme:any)=> StyleSheet.create({
    descBox2:{
        flexDirection: 'row',
        marginHorizontal:hp("1.2"),
    },
    descBox1:{
        justifyContent:'flex-end'
    },
    head1:{
        flex:1
    },
    app:{
        flex:1,
        paddingVertical:hp("1"),
    },

    img:{
        justifyContent:'center'
    },
    cardElevation:{
        flex: 1,
        flexDirection: 'row',
    },
    container: {
        height: hp("17"),
        marginHorizontal: wp("3"),
        marginTop: hp("2"),
    },

    head: {
        fontWeight: '400',
        fontSize: 16,
        color:theme.colors.TEXT
    },

    textHead: {
        color:theme.colors.TEXT,
        fontWeight: '700',
        fontSize: 11,
        paddingBottom: hp("1"),
    },

    textValue: {
        fontSize: 12, 
        fontWeight: '400',
        paddingBottom: hp("1"),
        color:theme.colors.TEXT
    },

    descBox: {
        flexDirection: 'row',
        marginTop: hp("0.4"),
        marginHorizontal:hp("1.2"),
    },
    card: {
        height: hp("17"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderRadius: 8,
        width: '100%',
    },
    elevation: {
        elevation: 25,
        shadowColor: Colors.backgroundGrey,
    },

    image: {
        width: wp("25"),
        height: hp("13"),
    },
    imageContainer: {
        height: hp("13"),
        width: wp("25"), 
        borderRadius: 10,
        borderWidth: 0.1,
        marginLeft:wp("4"),
        overflow: 'hidden',
    }
})
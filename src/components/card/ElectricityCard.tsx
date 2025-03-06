import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Rating } from "react-native-ratings";
import IconFontAwesome from 'react-native-vector-icons/Ionicons';
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";


const ElectricityCard = ({ item, onPress }: any) => {
    const styles = useThemedStyles(style);
    const theme = useTheme();
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}
            >
                <View style={[styles.card, styles.elevation]}>
                    <View style={[styles.descBox,styles.img]}>
                        <View style={styles.flexBasis}>
                            <View style={[styles.imageContainer]}>
                                <Image
                                    style={
                                        styles.image
                                    }
                                    source={{uri: `data:image/png;base64,${item.galleryImage}`}} />
                            </View>
                        </View>

                        <View style={styles.appCompName}>
                                <View style={[styles.descBox,styles.appCompName1]}>
                                    <Text numberOfLines={1} style={[styles.head,]} >
                                        {item.appCompName}
                                    </Text>
                                    {/* <View style={[styles.descBox]}>
                                    <IconFontAwesome name='location' size={10} color={Colors.blue} />
                                    <Text  style={styles.textValue}>{'3.2km'}</Text>
                                    </View> */}
                                </View>

                                <View style={styles.descBox}>
                                    <IconFontAwesome name='location' size={12} color={Colors.blue} />
                                    <Text numberOfLines={2} style={[styles.textValue1, styles.textValue]} >
                                        {item.commonName}
                                    </Text>
                                </View>
                                <View style={styles.descBox}>
                                    {/* <Text style={styles.textValue} >
                                        {item.overAllRating}
                                    </Text> */}
                                    <Rating
                                        tintColor={theme.colors.CARD_BACKGROUND}
                                        type='star'
                                        ratingCount={5}
                                        imageSize={12}
                                        readonly={true}
                                        startingValue={item.overAllRating} />
                                    <Text style={[styles.textValue,styles.review]} >
                                        {item.noOfReviews}
                                    </Text>
                                    <Text style={[styles.textValue]} >
                                        {' Reviews'}
                                    </Text>
                                </View>
                                <View style={[styles.descBox,styles.row]}>
                                    <View style={[styles.descBox,]}>
                                        <Text style={styles.textHead} >
                                            {'Phone No: '}
                                        </Text>
                                        <Text style={styles.textValue} >
                                            {item.contact1}
                                        </Text>
                                    </View>
{/* 
                                    <View style={styles.descBox}>
                                        <Text style={styles.textHead} >
                                            {'Hours: '}
                                        </Text>
                                        <Text style={{fontSize:11}}>{'24 hours'}
                                        </Text>
                                    </View> */}
                                </View>
                            
                        </View>
                    </View>
                    <View style={[styles.bottomContainer,]}>
                        <View style={[styles.descBoxBottom,]}>
                            <Text style={styles.bottomText}>{'Open Timings :'}</Text>
                            <Text style={styles.bottomText}>{item.timing}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default ElectricityCard;

const style =(theme:any)=> StyleSheet.create({
    row:{
        justifyContent:'space-between',marginRight:wp("1"),
    },
    review:{
        paddingLeft:wp("2")
    },
    appCompName:{
        flex:1,
        marginRight: wp("3"),
    },
    appCompName1:{
        paddingRight:wp("0.5")
    },
    flexBasis:{
        flexBasis:'36%'
    },
    img:{
        flexWrap:'wrap'
    },
    container: {
        height: hp("22"),
        marginHorizontal: wp("5"),
        marginTop: hp("2"),
    },
    card: {
        height: hp("22"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderRadius: 8,
        width: '100%',

    },
    descBoxBottom: {
        flexDirection: 'row',
        alignItems:"center"
    },
    head: {
        fontWeight: '600',
        fontSize: 15,
        color: theme.colors.TEXT,
        flex:1
    },

    textHead: {
        color: theme.colors.TEXT,
        fontWeight: '500',
        fontSize: 12,
    },

    textValue: {
        fontSize: 12,
        paddingBottom: hp("0.5"),
        fontWeight: '500',
        color:theme.colors.TEXT_SECONDARY,
    },
    textValue1: {
        flex: 1, flexWrap: 'wrap' 
    },
    bottomText: {
        fontWeight: '500',
        fontSize: 14,
        color: theme.colors.TEXT,
    },

    descBox: {
        flexDirection: 'row',
        paddingTop: hp("0.5"),
    },

    elevation: {
        elevation: 25,
        shadowColor: Colors.backgroundGrey,
    },

    image: {
        width: wp("25"),
        height: hp("25"),
    },
    imageContainer: {
        height: hp("13"),
        width: wp("25"),
        borderRadius: 48,
        borderWidth: 0.1,
        marginLeft: wp("3"),
        marginTop: hp("2"),
        overflow: 'hidden',
        
    },
    bottomContainer: {
        borderTopColor: Colors.greygrey1,
        borderTopWidth: 0.5,
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: hp("1"),
        flex:1
    },
})
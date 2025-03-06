import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const UniversityCollegeCard = ({ item, onPress,index }: any) => {
    const styles = useThemedStyles(style);
    const theme = useTheme();
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}
            >
                <View style={[styles.card, styles.elevation,{backgroundColor: '#DFB9B9'}]}>

                    <View style={[styles.descBox, styles.desc1]}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={
                                        styles.image
                                    }
                                    source={{ uri: `data:image/png;base64,${item.galleryImage}` }} />
                            </View>
                        </View>

                        <View style={styles.desc2}>

                            <View style={styles.desc3}>
                                <View style={styles.descBox}>
                                    <Text numberOfLines={2} style={[styles.head, styles.desc1]} >
                                        {item.appCompName}
                                    </Text>
                                </View>

                                {/* <View style={styles.descBox}>
                                    <Text numberOfLines={1} style={[styles.textValue, styles.desc1]} >
                                        {'College in ' + item.commonName}
                                    </Text>
                                </View> */}
                                <View style={styles.descBox}>
                                    <Text numberOfLines={2} style={[styles.textValue1, styles.desc1]} >
                                        {item.commonName}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.descBoxbottom]}>
                        <View style={styles.descBox}>
                            <Text style={styles.textHead} >
                                {'Phone No. : '}
                            </Text>
                            <Text style={styles.textValue} >
                                {item.contact1}
                            </Text>
                        </View>
                        <View style={styles.descBox}>
                            <Text style={styles.textHead} >
                                {'Timing : '}
                            </Text>
                            <Text style={styles.textValue}>{item.timing}
                            </Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        </>
    )
}

export default UniversityCollegeCard;

const style =(theme:any)=> StyleSheet.create({
    desc1: {
        flex: 1
    },
    desc2: {
        flex: 1.7
    },
    desc3: {
        paddingVertical: hp("0.5"),
    },
    container: {
        height: hp("21"),
        alignSelf:'center',
        marginTop: hp("1"),
    },
    card: {
        height: hp("20"),
        borderRadius: 8,
        width: wp("92"),
    },
    head: {
        fontWeight: '400',
        fontSize: 18,
        color: theme.colors.TEXT,
        textAlign: "right",
        marginEnd: wp("2"),
    },

    textHead: {
        color: theme.colors.TEXT,
        fontWeight: '600',
        fontSize: 12,
    },

    textValue: {
        fontSize: 12,
        paddingBottom: hp('1'),
        color: theme.colors.TEXT_SECONDARY,
        textAlign: "right",
        marginEnd: wp("2"),
    },
    textValue1: {
        fontSize: 12,
        paddingBottom: hp("2"),
        color:theme.colors.TEXT_SECONDARY,
        textAlign: "right",
        flex: 1, marginEnd: wp("2"),
    },

    descBox: {
        flexDirection: 'row',
        marginTop: hp('0.5'),
        paddingRight: hp('1'),
    },
    descBoxbottom: {
        flexDirection: 'row',
        marginVertical: hp("1"),
        marginHorizontal: wp("0.8"),
        justifyContent: 'space-between',
        marginBottom: hp('1'),
    },

    elevation: {
        elevation: 20,
        shadowColor: Colors.backgroundGrey,
    },

    image: {
        width: wp("28"),
        height: hp("14"),
    },
    imageContainer: {
        height: hp("14"),
        width: wp("28"),
        borderRadius: 360,
        borderWidth: 0.1,
        marginTop: hp("1"),
        marginLeft: wp("4"),
        overflow: 'hidden',
    }
})
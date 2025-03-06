import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';

const UniversityGridCard = ({ item, onPress }: any) => {
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}
            >
                <View style={[styles.cardElevation, styles.card, styles.elevation]}>
                    <View>
                        <View style={styles.app}>

                            <View style={styles.zindex}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={Images.COLLEGE_CARDIMG} />
                                </View>
                            </View>
                            <View style={styles.descBox}>
                                <Text style={styles.head} >
                                    {item.appCompName}
                                </Text>
                            </View>

                            <View style={styles.descBox}>
                                <Text numberOfLines={2} style={[styles.common, styles.textValue]} >
                                    {item.commonName}
                                </Text>
                            </View>

                            <View style={styles.descBox}>
                                <Text style={styles.textHead} >
                                    {'Phone No.'}
                                </Text>
                                <Text style={styles.textValue} >
                                    {'+91 9999999999'}
                                </Text>
                            </View>

                            <View style={styles.descBox}>
                                <Text style={styles.textHead} >
                                    {'Timing'}
                                </Text>
                                <Text style={styles.textValue}>{item.timing}
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default UniversityGridCard;

const styles = StyleSheet.create({
    common:{
        flex: 1, flexWrap: 'wrap'
    },
    zindex:{
        zIndex: 9999,
    },
    app:{
        alignItems:'center',
        marginLeft: 0,
        paddingVertical: hp('1')
    },
    cardElevation:{
        flex: 1,
                    marginTop: hp('2'),
    },
    container: {
        shadowColor: '#00000021',
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: hp("1"),
        backgroundColor: Colors.white,
        flexBasis: '47%',
        marginHorizontal: wp("1"),
    },

    head: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
        color: Colors.black,
    },

    textHead: {
        color: 'red',
        width: wp("20"),
        fontWeight: '700',
        fontSize: 14,
        paddingBottom: hp("0.5"),
    },

    textValue: {
        fontSize: 13,
        paddingBottom: hp("0.5"),
    },

    descBox: {
        flexDirection: 'row',
        marginTop: hp("1"),

    },
    card: {
        shadowColor: '#00000021',
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical:hp("0.5"),
        backgroundColor: Colors.white,
        flexBasis: '47%',
        marginHorizontal: wp("1"),
    },
    elevation: {
        elevation: 25,
        shadowColor: Colors.backgroundGrey,
    },

    image: {
        flex: 1,
        height: hp("20"),
        width: wp("30"),
    },
    imageContainer: {
        height: hp("13"),
        width: wp("28"),
        borderRadius: 50,
        justifyContent: 'center',
        borderWidth: 0.1,
        overflow: 'hidden',
    }
})
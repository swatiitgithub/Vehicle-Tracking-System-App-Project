import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../../utils/Responsive';
import i18n from '../../utils/i18n';
import { ThemeContext } from '../../config/theme/ThemeProvider';

const TicketCard = ({ item, onPress }: any) => {
    
    const contextType = ThemeContext;

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}>

                <View style={[styles.card, styles.elevation]}>

                    <View style={styles.descBox}>
                        <View style={styles.imageCard}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image}
                                    source={item.image} />
                            </View>
                        </View>
                        <View style={styles.star}>
                            <View style={styles.descBox}>
                                <Text numberOfLines={2} style={[styles.head]} >
                                    {i18n.t(item.name)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
};

export default TicketCard;

const styles = StyleSheet.create({
    star: {
        flex: 3,
        justifyContent: 'center'
    },
    imageCard: {
        flex: 1, marginRight: wp("2.5")
    },
    container: {
        height: hp("13"),
        marginHorizontal: wp("5"),
        marginTop: hp("1"),
    },
    card: {
        height: hp("12"),
        backgroundColor: 'white',
        borderRadius: 8,
        width: wp("90"),
        marginVertical: hp("1"),
    },
    elevation: {
        elevation: 2,
        shadowColor: 'gray',
    },
    head: {
        fontWeight: '400',
        fontSize: 16,
        color: '#000000',
        flex: 1,
    },
    descBox: {
        flexDirection: 'row',
        paddingTop: hp("1"),
        marginRight: wp("2")
    },

    image: {
        width: wp("16"),
        height: hp("8"),
    },
    imageContainer: {
        height: hp("8"),
        width: wp("16"),
        borderRadius: 50,
        borderWidth: 0.1,
        marginTop: hp("1"),
        marginLeft: wp("3.5"),
        overflow: 'hidden',
    },
})

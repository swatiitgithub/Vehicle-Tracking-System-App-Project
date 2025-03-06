import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { fontSize, hp, wp } from '../../utils/Responsive';

import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import useThemedStyles from "../../../src/config/theme/hooks/useThemedStyles";
import useTheme from '../../config/theme/hooks/useTheme';
import React from "react";
const BankDetailsCard = ({ item, onPress }: any) => {
    const style = useThemedStyles(styles);
    const theme = useTheme();

    var getImageLogo = (name: any) => {
        if (name.startsWith("State Bank Of", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.SBIBANK_CARDIMG} />)
        if (name.startsWith("Punjab National", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.PNBBANK_CARDIMG} />)
        if (name.startsWith("Allahabad", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.ALLAHABADBANK_CARDIMG} />)
        if (name.startsWith("Indian Bank", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.INDIANBANK_CARDIMG} />)
        if (name.includes("Baroda", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.BOBBANK_CARDIMG} />)
        if (name.startsWith("Central Bank of India", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.CBOIBANK_CARDIMG} />)
        if (name.startsWith("Canara Bank", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.CANRABANK_CARDIMG} />)
        if (name.startsWith("Bank of Maharashtra", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.MAHARASHTRABANK_CARDIMG} />)
        if (name.startsWith("Bank of India", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.BOIBANK_CARDIMG} />)
        if (name.startsWith("UCO Bank", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.UCOBANKCARDIMG} />)
        if (name.startsWith("Union Bank of India", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.UNIONBANK_CARDIMG} />)
        if (name.startsWith("HDFC Bank", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.HDFCBANK_CARDIMG} />)
        if (name.startsWith("Axis Bank", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.BANK_CARDIMG} />)
        if (name.startsWith("ICICI Bank", 0))
            return (<Image
                style={style.image}
                resizeMode="contain"
                source={Images.ICICIBANK_CARDIMG} />)

    }

    return (
        <>
            <TouchableOpacity
                style={style.container}
                onPress={() => onPress(item)}
            >
                <View style={[style.card, style.elevation]}>
                    <View style={style.descBox}>

                        <View style={style.bank1}>
                            <View style={style.imageContainer}>
                                <Image
                                    style={style.image}
                                    resizeMode="cover"
                                    source={{uri:`data:image/png;base64,${item?.profileImage}`}}/>
                            </View>
                        </View>

                        <View style={{ flexBasis: '80%' }}>

                            <View style={style.detail}>
                                <View style={style.descBox}>
                                    <Text
                                        style={[style.head]} >
                                        {item.firstName}
                                    </Text>
                                </View>



                                <View style={style.descBox}>

                                    <Text style={[style.address, style.textValue]} >
                                        {item.mobileNo}
                                    </Text>
                                </View>
                                <View style={style.descBox}>

                                    <Text style={[style.address, style.textValue]} >
                                        {item.emailID}
                                    </Text>
                                </View>
                                <View style={style.descBox}>

                                    <Text numberOfLines={2} style={[style.address, style.textValue]} >
                                        {item.candidateAddress}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default BankDetailsCard;

const styles = (theme: any) => StyleSheet.create({
    address: {
        flex: 1, flexWrap: 'wrap'
    },
    detail: {
        justifyContent: 'center',
        marginLeft: wp("15"),
        paddingVertical: hp("1")
    },
    bank1: {
        flex: 1, justifyContent: 'center',
    },
    bank: {
        flex: 1,
        flexDirection: 'row',
    },
    container: {
        height: hp("19"),
        marginHorizontal: wp("4"),
        marginTop: hp("2"),
    },

    head: {
        fontWeight: '700',
        fontSize: 15,
        color: theme.colors.TEXT,

    },

    textHead: {
        width: wp("19"),
        fontWeight: '700',
        fontSize: 14,
        color: theme.colors.TEXT
    },

    textValue: {
        fontSize: 13,
        color: theme.colors.TEXT_SECONDARY

        //paddingBottom: hp("0.5"),
    },

    descBox: {
        flexDirection: 'row',
        marginTop: hp("0.6"),
        marginHorizontal: wp("1"),
    },
    card: {
        height: hp("18"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderRadius: 8,
        width: '100%',
        marginVertical: hp("0.8"),
    },
    elevation: {
        elevation: 20,
        shadowColor: Colors.darkgrey,
    },

    image: {
        width: 100,
        height: 100,
    },
    imageContainer: {
        width: wp("24"),
        height: hp("12"),
        borderRadius: 200,
        // borderWidth: 0.1,
        overflow: 'hidden',
        justifyContent: 'center',
        marginLeft: wp('2'),
        marginTop: hp("1"),
    }
})
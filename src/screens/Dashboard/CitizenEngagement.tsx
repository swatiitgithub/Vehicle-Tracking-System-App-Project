import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base"
import React, { } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import Constant from "../../utils/Constant";
import i18n from "../../utils/i18n";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppStyleConstant from "../../utils/AppStyleConstant";
import { hp, wp } from "../../utils/Responsive";



const CitizenEngagement: any = () => {
    const navigation = useNavigation();
    const styles = useThemedStyles(style);
    const onWebService = (urlData: any) => {
        navigation.navigate('MyWeb', urlData);
    };
    return (
        <>
            <View style={styles.deskBox2}>
                <Text style={styles.textHead}>{i18n.t('DashBoard.citizenEngagement')}</Text>
            </View>
            <View style={[styles.deskBox, { flex: 1 }]}>
                {Constant.CITIZEN_ENGAGEMENT.map(item => {
                    return (
                        <View style={styles.servicesIconViewO}>
                            <TouchableOpacity
                                onPress={() => onWebService(item)}
                                style={[styles.servicesIcon,
                                {
                                    width: wp("10"),
                                    height: hp("4")
                                }
                                ]}>
                                <FontAwesome
                                    name={item.icon}
                                    size={30}
                                    color={item.color}></FontAwesome>
                                {/* <Text style={styles.iconText}>{i18n.t(item.name)}</Text> */}
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </>
    )
}
const style=(theme:any)=>StyleSheet.create({
    deskBox2: {
        marginTop: hp("2"),
        flexDirection: 'row',
        paddingVertical: hp("1"),
        paddingLeft: 15,
        backgroundColor: theme.colors.LABEL_BACKGROUND,
        alignContent: 'center',
        borderTopLeftRadius: 28,
        borderBottomRightRadius: 28
    },
    textHead: {
        fontSize: 16,
        color: theme?.colors.TEXT,
        fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
    },
    deskBox: {
        flexDirection: 'row',
        paddingTop: hp("2"),
        marginRight: wp('1'),
    },
    servicesIconViewO: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: wp("1"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        // width: wp("25"),
        elevation: 10,
        flex: 1,
    },
    servicesIcon: {
        width: wp("13"),
        height: hp("6"),
        alignItems: 'center',
        marginVertical: hp("2"),
    },
    iconText: {
        paddingTop: hp("1"),
        color: theme.colors.TEXT,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
        width: wp("20"),
        lineHeight: 15,
    },
})

export default CitizenEngagement;
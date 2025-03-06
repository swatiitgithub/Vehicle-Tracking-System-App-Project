import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base"
import React, {  } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Constant from "../../utils/Constant";
import i18n from "../../utils/i18n";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from "../../config/theme/hooks/useTheme";
import { hp, wp } from "../../utils/Responsive";
import AppStyleConstant from "../../utils/AppStyleConstant";



const AboutKanpur: any = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = useThemedStyles(style);
    const onWebService = (urlData: any) => {
         navigation.navigate('MyWeb', urlData);
      };
    return (
        <>
            <View style={styles.deskBox2}>
                <Text style={styles.textHead}>{i18n.t('DashBoard.aboutKanpur')}</Text>
            </View>
            <View style={[styles.deskBox]}>
                {Constant.ABOUT_KANPUR.map(item => {
                    return (
                        <View style={styles.servicesIconViewO}>
                            <TouchableOpacity
                                onPress={() => onWebService(item)}
                                style={styles.servicesIcon}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={20}
                                    color={theme.colors.ICON_COLOR2}></MaterialCommunityIcons>
                                <Text style={styles.iconText}>{i18n.t(item.name)}</Text>
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

export default AboutKanpur;
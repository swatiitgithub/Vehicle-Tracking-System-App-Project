import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";
import i18n from "../../utils/i18n";
import Constant from "../../utils/Constant";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sagaActions } from "../../redux/saga/sagaActions";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { hp, wp } from "../../utils/Responsive";
import Colors from "../../utils/Colors";
import AppStyleConstant from "../../utils/AppStyleConstant";
import { getBackground } from "../../utils/Helper";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";

const PublicUtility = () => {

    const navigation = useNavigation();
    const theme = useTheme();
    const styles = useThemedStyles(style);

    const dispatch = useDispatch();
    const dashboard = useSelector((state: RootState) => state?.dashboard);

    useEffect(() => {
        dispatch({ type: sagaActions.DASHBOARD_MENU_OPTIONS });
    }, []);

    function onSelectItem(data: any) {

        let params: Object = {
            data: { subItem: data },
            background: getBackground(data.subCategoryName),
        };
        navigation.navigate("ListData", params);

    }

    return (
        <>
            <View>
                {/* <Text>{JSON.stringify(dashboard)}</Text> */}
                {Constant.PUBLIC_UTILITY && Constant.PUBLIC_UTILITY.map((item: any) => {
                    return (
                        <View>
                            <View style={styles.deskBox2}>
                                <Text style={styles.textHead}>{i18n.t(item.categoryName)}</Text>
                            </View>

                            <View style={[styles.deskBox,{flexWrap:'wrap'}]}>
                                {item.lstCategorySubCategoryResp.map((subItem: any, index: number) => {
                                    return (
                                        <View style={styles.servicesIconViewO}>
                                            <TouchableOpacity
                                                onPress={() => { onSelectItem(subItem) }}
                                                style={styles.servicesIcon}>
                                                <MaterialCommunityIcons name={subItem.catIcon ? subItem.catIcon : 'circle'} size={20} color={subItem.catIcon ? theme?.colors.ICON_COLOR2 : "#dcdcdc"} />
                                                <Text style={styles.iconText}>{i18n.t(subItem.subCategoryName)}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    );
                })}
            </View>
        </>
    )

}
const style = (theme: any) => StyleSheet.create({
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
        marginLeft: wp("2"),
        backgroundColor: theme.colors.CARD_BACKGROUND,
        width: wp('21.5'),
        elevation: 10,
        marginTop:hp('1')
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

export default PublicUtility;


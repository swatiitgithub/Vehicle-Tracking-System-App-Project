import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { default as style } from "./styles";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import i18n from "../../utils/i18n";
import Constant from "../../utils/Constant";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { sagaActions } from "../../redux/saga/sagaActions";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { hp, wp } from "../../utils/Responsive";
import Colors from "../../utils/Colors";
import AppStyleConstant from "../../utils/AppStyleConstant";
import { getBackground } from "../../utils/Helper";
import useTheme from "../../config/theme/hooks/useTheme";


const DynamicOptions = () => {

    const navigation = useNavigation();
    const styles = useThemedStyles(style);
    const theme = useTheme();
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
                {Constant.DYNAMIC_OPTIONS && Constant.DYNAMIC_OPTIONS.map((item: any) => {
                    return (
                        <View>
                            <View style={styles.deskBox2}>
                                <Text style={styles.textHead}>{i18n.t(item.categoryName)}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                paddingTop: hp("2"),
                                marginRight: wp('1'),
                            }}>
                                {item.lstCategorySubCategoryResp.map((subItem: any, index: number) => {
                                    return (
                                        <View style={{ flex: 1 }}>
                                            <View style={{
                                                flex: 1,
                                                // width: wp('21.5'),
                                                height: wp('20'),
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                marginLeft: wp("2"),
                                                backgroundColor: theme?.colors?.CARD_BACKGROUND,
                                                elevation: 10,
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => { onSelectItem(subItem) }}
                                                    style={{
                                                        flex: 1,
                                                        // width: wp("13"),
                                                        height: hp("6"),
                                                        alignItems: 'center',
                                                        marginVertical: hp("2"),
                                                    }}>
                                                    <IconFontAwesome
                                                        name={subItem.catIcon ? subItem.catIcon : 'circle'}
                                                        size={20}
                                                        color={subItem.catIcon ? theme?.colors.ICON_COLOR2 : "#dcdcdc"}
                                                    />
                                                    <Text style={{
                                                        paddingTop: hp("1"),
                                                        color: theme?.colors.TEXT,
                                                        fontSize: 11,
                                                        textAlign: 'center',
                                                        fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
                                                        // width: wp("22"),
                                                        // flex:1,
                                                        lineHeight: 15,
                                                    }}>{i18n.t(subItem.subCategoryName)}</Text>
                                                </TouchableOpacity>
                                            </View>
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

export default DynamicOptions;


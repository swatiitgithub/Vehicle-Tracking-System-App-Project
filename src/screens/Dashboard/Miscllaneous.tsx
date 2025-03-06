import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base"
import React, { } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import Constant from "../../utils/Constant";
import i18n from "../../utils/i18n";
import styles from "./styles";
import { wp } from "../../utils/Responsive";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {default as style}  from "./styles";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";


const Miscellaneous: any = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = useThemedStyles(style);
    const onWebService = (urlData: any) => {
        navigation.navigate('MyWeb', urlData);
    };
    const onSelectTicket = () => {
        navigation.navigate("TicketList");
    };
    const onSelectService = (data: any) => {
        console.log(data);
        let params: Object = {
            data: {
                subItem: {
                    subCategoryID: 51,
                    categoryID: 4,
                    categoryName: 'EDUCATION',
                    subCategoryCode: 'SP. FAC',
                    subCategoryName: 'SPORTS FACILITIES',
                    isActive: true,
                },
            },
            background: {
                bg: 1,
                bgImage: true,
            },
        };
        console.log(params);
        navigation.navigate('ListData', params);
    };
    return (
        <>
            <View style={styles.deskBox2}>
                <Text style={styles.textHead}>{i18n.t('DashBoard.miscellaneous')}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.deskBox, { flex: 2 }]}>
                    {Constant.MISC.map(item => {
                        return (
                            <View style={styles.servicesIconViewO}>
                                <TouchableOpacity
                                    onPress={() => onWebService(item)}
                                    style={styles.servicesIcon}>
                                    <FontAwesome5
                                        name={item.icon}
                                        size={20}
                                        color={theme.colors.ICON_COLOR2}></FontAwesome5>
                                    <Text numberOfLines={2} style={styles.iconText}>{i18n.t(item.name)}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                <View style={[styles.deskBox, { flex: 1 }]}>
                    <View style={styles.servicesIconViewO}>
                        <TouchableOpacity
                            onPress={() => onSelectService()}
                            style={styles.servicesIcon}>
                            <FontAwesome5
                                name={"volleyball-ball"}
                                size={20}
                                color={theme.colors.ICON_COLOR2}></FontAwesome5>
                            <Text style={styles.iconText}>{i18n.t('DashBoard.sportFacilities')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.deskBox, { flex: 1 }]}>
                    <View style={styles.servicesIconViewO}>
                        <TouchableOpacity
                            onPress={() => onSelectTicket()}
                            style={styles.servicesIcon}>
                            <FontAwesome5
                                name={"ticket-alt"}
                                size={20}
                                color={theme.colors.ICON_COLOR2}></FontAwesome5>
                            <Text style={styles.iconText}>{i18n.t('DashBoard.ticket')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Miscellaneous;
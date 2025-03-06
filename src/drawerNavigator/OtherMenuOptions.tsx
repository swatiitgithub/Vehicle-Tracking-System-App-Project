
import { View } from "native-base"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import {default as style} from "./styles"
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import Constant from "../utils/Constant";
import i18n from "../utils/i18n";
import { useNavigation } from "@react-navigation/native";
import useThemedStyles from '../config/theme/hooks/useThemedStyles';
import useTheme from '../config/theme/hooks/useTheme';


const OtherMenuOptions = () => {
    const navigation = useNavigation<any>();
    const theme:any = useTheme();
    const styles = useThemedStyles(style);
    const [drawerMenus, setDrawerMenus] = useState<any>([]);

    useEffect(() => {

        if (Constant.OTHER_MENU_OPTION) {
            const data: any[] = Constant.OTHER_MENU_OPTION.map((item: any, index: number) => ({
                ...item,
                title: item.categoryName,
                data: item.lstCategorySubCategoryResp,
                isCollapse: true,
                index
            }));
            setDrawerMenus(data);
        }
    }, []);

    const toggleHeader = ({ title, isCollapse, index }: any) => {
        let data = [...drawerMenus];
        data[index].isCollapse = !isCollapse;
        console.log(data[index].isCollapse);
        setDrawerMenus(data);
    }

    function onSelectItem(data: any) {
        navigation.navigate('MyWeb', data.subItem);
    }

    return (
        <View>
            {drawerMenus.map((item: any, index: number) => {
                return (
                    <View
                        key={`setting_${index}`}
                    >
                        <TouchableOpacity

                            onPress={() => { toggleHeader(item) }}
                            style={styles.headerContainer}>

                            <View style={styles.headerIcon}>
                                <IconFontAwesome name={item.catIcon ? item.catIcon : 'circle'} size={15} color={item.catIcon ? "#000000" : "#dcdcdc"} />
                            </View>
                            <Text style={styles.headerText}>
                                {i18n.t(item.title)}
                            </Text>
                            <View>
                                <IconFeather name={item.isCollapse ? "chevron-down" : "chevron-up"} size={18} color={theme.colors.ICON_COLOR} />
                            </View>
                        </TouchableOpacity>

                        {item.lstCategorySubCategoryResp.map((subItem: any, index: number) => {
                            return (
                                <View key={`subCat_${index}`}>
                                    {!item.isCollapse &&
                                        <TouchableOpacity
                                            onPress={() => onSelectItem({ subItem })}
                                            style={[
                                                styles.container,
                                                styles.subContainer
                                            ]}>
                                            <IconFontAwesome name="square" size={12} color={index % 2 ? "#914bdb" : '#4972d1'} />
                                            <View>
                                                <View style={styles.subHeaderTextContainer}>
                                                    <Text style={styles.subHeaderText}>
                                                        {i18n.t(subItem.name)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>}
                                </View>
                            )
                        })}

                    </View>

                )
            })}
        </View>
    )
}

export default OtherMenuOptions;
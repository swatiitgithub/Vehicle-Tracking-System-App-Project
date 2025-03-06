import styles, { default as style } from "./style";
import React from "react";
import useTheme from "../../config/theme/hooks/useTheme";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import { Text, TouchableOpacity, View } from "react-native";
import Constant from "../../utils/Constant";
import i18n from "../../utils/i18n";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import ActionBar from "../../components/ActionBar";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {

    const theme: any = useTheme();
    const styles = useThemedStyles(style);
    const navigation = useNavigation();

    return (
        <View>
            <ActionBar
                title={i18n.t('DashBoard.SETTING')}
                containerStyle={{
                    height: 70,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            />
            <View style={{ backgroundColor: theme.colors.BACKGROUND }}>
                {Constant.SETTING.map((item: any, index: number) => {
                    return (
                        <View key={`setting_${index}`}  >
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Theme') }}
                                style={styles.headerContainer}>

                                <View style={[styles.headerIcon,{width:"10%"}]}>
                                    <IconFontAwesome name={item.icon} size={15} color={item.icon ? theme.colors.ICON_COLOR : "#dcdcdc"} />
                                </View>
                                <Text style={{
                                    color: theme.colors.TEXT,
                                    padding:10,
                                    width:"85%"
                                }}>
                                    {item.name}
                                </Text>
                                <View>
                                    <IconFeather name={"chevron-right"} size={18} color={theme.colors.ICON_COLOR} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>

        </View>
    )
}

export default Setting;
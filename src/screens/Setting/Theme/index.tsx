import styles, { default as style } from "./style";
import React, { useEffect } from "react";
import useTheme from "../../../config/theme/hooks/useTheme";
import useThemedStyles from "../../../config/theme/hooks/useThemedStyles";
import { Text, TouchableOpacity, View } from "react-native";
import i18n from "../../../utils/i18n";
import ActionBar from "../../../components/ActionBar";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../../redux/saga/sagaActions";
import { RootState } from "../../../redux/store";
import Colors from "../../../utils/Colors";

const THEMES_DATA = [
    {
        name: 'Dark',
        value: 'dark',
        color: "#0B2447",
        textColor: Colors.white
    },
    {
        name: 'Light',
        value: 'light',
        color: "#ffffff",
        textColor: Colors.black
    },
    {
        name: 'Red',
        value: 'red',
        color: "#D21312",
        textColor: "#ffffff"
    },
    {
        name: 'Amaze',
        value: 'amaze',
        color: "#85CDFD",
        textColor: Colors.black
    }
]

const Theme = () => {

    const themeStyle: any = useTheme();
    const styles = useThemedStyles(style);
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.theme);

    const onSelect = (item: any) => {
        dispatch({ type: sagaActions.SELECT_THEME, theme: item.value });
    }

    return (
        <View>
            <ActionBar
                title={i18n.t('Theme')}
                containerStyle={{
                    height: 70,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            />
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row',flexWrap:'wrap' }}>
                {THEMES_DATA.map(item => {
                    return (
                        <TouchableOpacity style={{
                            width: '27.7%',
                            height: 100,
                            backgroundColor: item.color,
                            margin: 10,
                            borderRadius: 10
                        }}
                            onPress={() => { onSelect(item) }}
                        >
                            <Text style={{
                                color: item.textColor,
                                fontWeight: '700',
                                padding: 10
                            }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default Theme;
import { View } from "native-base";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../utils/Colors";
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { BackArrow } from "../utils/Helper";
import { BackButton } from "./BackButton";
import { memo, useEffect, useState } from "react";
import AppStyleConstant from "../utils/AppStyleConstant";
import React from "react";
import useThemedStyles from "../config/theme/hooks/useThemedStyles";
import LinearGradient from "react-native-linear-gradient";
import { wp } from "../utils/Responsive";

const ActionBar1 = ({ title, searchValue, onCloseSearch, search, onChangeText, containerStyle, addButton,onAddVisible }: any) => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const styles = useThemedStyles(style);
    const navigation = useNavigation();

    const makeSearchVisible = () => {
        setToggleSearch(toggle => !toggle);
        if (toggleSearch) {
            onCloseSearch()
        }
    }
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.content}>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { navigation.goBack() }}
                        style={{
                            width: 40,
                            height: 40,
                            // backgroundColor: 'blue',
                            borderRadius: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // elevation: 10,
                            // shadowColor:'blue'
                        }}>
                        {/* <BackButton /> */}
                        <AntDesign name="arrowleft" style={{ elevation: 20 }} size={24} color={'white'} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.titleContainer, { width: '70%' }]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    {search &&
                        <TouchableOpacity onPress={makeSearchVisible}>
                            <AntDesign name="search1" size={18} color={'white'} />
                        </TouchableOpacity>}
                </View>
                    {
                        addButton &&
                        <TouchableOpacity style={{width: '20%',paddingLeft:10}} onPress={onAddVisible}>
                            <Ionicons  name="add" size={30} color={'white'} />
                        </TouchableOpacity>
                    }

            </View>
            {
                toggleSearch &&
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="search"
                        onChangeText={value => onChangeText(value)}
                    />
                    <TouchableOpacity style={styles.searchClose} onPress={makeSearchVisible}>
                        <AntDesign name="closecircle" size={22} color={'grey'} />
                    </TouchableOpacity>

                </View>
            }
        </View>
    )
}


const style = (theme: any) => StyleSheet.create({

    container: {
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#5263B7',
    },

    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    titleContainer: {
        alignItems: 'center'
    },

    title: {
        textAlign: 'center',
        fontSize: 25,
        // fontWeight:'700',
        color: 'white',
        width: 200,
        fontFamily: AppStyleConstant.CRIMSONPRO_BLACK
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        marginBottom: 10,
        marginHorizontal: 40
    },
    searchInput: {
        width: '85%',
        paddingLeft: 15
    },
    searchClose: {
        marginHorizontal: 20,
        justifyContent: 'center'
    }

})

export default memo(ActionBar1);   
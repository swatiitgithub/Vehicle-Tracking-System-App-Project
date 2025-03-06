import { useNavigation } from "@react-navigation/native";
import { Text, View, theme } from "native-base"
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constant from "../../utils/Constant";
import i18n from "../../utils/i18n";
import { fontSize, hp, wp } from "../../utils/Responsive";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import Images from "../../utils/Images";
import { getBackground, notLoginAlert } from "../../utils/Helper";
import ActionButtonCircle from "../../components/ActionButtonCircle/ActionButtonCircle";
import { LIST_OBJECT } from "../../types";
import Url from "../../utils/Url";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from 'react-native-popup-menu';
import { axiosRequest } from "../../utils/ApiRequest";
import useTheme from "../../config/theme/hooks/useTheme";
import AppStyleConstant from "../../utils/AppStyleConstant";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const CircleDesign: any = ({ language }) => {
    const navigation = useNavigation();
    const styles = useThemedStyles(style);
    const theme = useTheme();
    const [data, setData] = useState<[]>([]);
    const [imgSize, setImgSize] = useState<number>(150);
    const [loading, setLoading] = useState<boolean>(true);
    const user = useSelector((state: RootState) => state.user);

    const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
    const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
    const scrollIndicator = useRef(new Animated.Value(0)).current;

    const scrollIndicatorSize =
        completeScrollBarHeight > visibleScrollBarHeight
            ? (visibleScrollBarHeight * visibleScrollBarHeight)
            / completeScrollBarHeight
            : visibleScrollBarHeight;

    const difference =
        visibleScrollBarHeight > scrollIndicatorSize
            ? visibleScrollBarHeight - scrollIndicatorSize
            : 1;

    const scrollIndicatorPosition = Animated.multiply(
        scrollIndicator,
        visibleScrollBarHeight / completeScrollBarHeight,
    ).interpolate({
        extrapolate: 'clamp',
        inputRange: [0, difference],
        outputRange: [0, difference],
    });

    const onContentSizeChange = (_: any, contentHeight: React.SetStateAction<number>) =>
        setCompleteScrollBarHeight(contentHeight);

    const onLayout = ({
        nativeEvent: {
            layout: { height },
        },
    }) => {
        setVisibleScrollBarHeight(height);
    };

    const onSelectCircleIcon = (data: any) => {
        console.log("menu name========================" + data.subCategoryName)
        let params: Object = {
            data: { subItem: data },
            background: getBackground(data),
        };
        switch (data.subCategoryName) {
            case 'SOLID WASTE COMPLAINT':
            case 'STREET LIGHT COMPLAINT':
            case 'WATER SUPPLY COMPLAINT':
            case 'ROAD REPAIR COMPLAIN':
            case 'STRAY ANIMAL COMPLAINT':
            case 'ILLEGAL HOLDING COMPLAINT':
            case 'FOOD ADULTERATION COMPLAINT':
            case 'HEALTH COMPLAINT':
            case 'GARDEN COMPLAINT':
            case 'CIVIL CONSTRUCTION':
            case 'HYGIENE COMPLAINT':

                if (!user.userData) {
                    notLoginAlert(navigation);
                } else {
                    const webParams = {
                        ...params,
                        name: 'Add Complaint',
                        url: `https://online.kanpursmartcity.org/`,
                        //url: `${Url.WEB_ADD_COMPLAINT}?email=${user.userData ? user?.userData?.email : ""}`,
                    };
                    navigation.navigate("MyWeb", webParams);
                }
                break;

            default:
                navigation.navigate("ListData", params);
                break;
        }
        //navigation.navigate('ListData', params);

    };
    useEffect(() => {
        console.log({ language });
        if (language == 'en') {
            getCircleData("", 3);
        } else {
            getCircleData("", 4);
        }

    }, [language]);
    const getCircleData = (searchText: string = "", type: number): void => {
        setLoading(true);

        const params = {
            type,
            categoryID: -1,
            userID: 1,
            formID: 1,
            searchText
        }

        axiosRequest(Url.DASHBOARD_MENU, Constant.API_REQUEST_METHOD.GET, params).then(res => {
            const { data } = res;
            setData(data);
            setLoading(false);

        }).catch(err => {
            setLoading(false);
        });
    }

    const getDeviceIcon = (iconName: string) => {
        switch (iconName) {
            case 'building-o':
                return 'graduation-cap';
            case 'ambulance':
                return 'hotel';
            case 'briefcase':
                return 'bank';
            case 'medkit':
                return 'medkit';
            case 'truck':
                return 'truck';
            case 'headphones':
                return 'music';
            case 'comment-o':
                return 'wpforms';
            case 'group':
                return 'handshake-o';

            default:
                return 'google';

        }
    }

    return (
        <View style={styles.dashboardCircle}>
            <View style={{
                width: wp('96'),
                height: hp('7'),
            }}>
                <ActionButtonCircle
                    autoInactive={false}
                    icon={<View
                        style={styles.circleView}>
                        <Image style={{
                            marginLeft: -5,
                            height: imgSize,
                            width: imgSize + 2,
                        }} source={Images.DASHBOARD_CIRCLE}
                        />
                    </View>}
                    radius={hp('19.5')}
                    degrees={0}
                    position="center"
                    active={true}>
                    {data?.map((item: any) => {
                        return (
                            <ActionButtonCircle.Item
                            key={`circleItem${item.categoryName}`}
                                title={item.categoryName}
                            >
                                <Menu>
                                    <MenuTrigger >
                                        <View style={{ alignItems: 'center' }} >
                                            <View style={styles.iconView}>
                                                <FontAwesome name={item.catIcon} size={30} color={Colors.orange}></FontAwesome>
                                                {/* <FontAwesome name={item.catIcon} size={30} color={theme.colors.ICON_COLOR}>
                                                </FontAwesome> */}
                                                {/* <Image style={{height:50,width:50,borderRadius:25}} source={getDeviceIcon(item.catIcon)}/> */}
                                            </View>
                                            <View style={{ width: 86, borderRadius: 10, alignItems: 'center' }}>
                                                <Text numberOfLines={2} style={{
                                                    lineHeight: 16,
                                                    fontSize: fontSize('1.7'), textAlign: 'center',
                                                    fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
                                                    color: theme.colors.ICON_COLOR
                                                }}>
                                                    {item.categoryName[0] + item.categoryName.toLowerCase().slice(1)}
                                                </Text>
                                            </View>
                                        </View>

                                    </MenuTrigger>

                                    {item.categoryID == 11 ?
                                        <MenuOptions
                                        key={`catName${item.categoryName}`}
                                            optionsContainerStyle={{
                                                borderRadius: 45,
                                                // backgroundColor: 'rgba(255, 213, 194, 0.99)',
                                                elevation: 20,
                                            }}>
                                            <ImageBackground
                                                    blurRadius={1}
                                                    imageStyle={{ borderRadius: 15 }}
                                                    style={styles.bgImageStyle}
                                                    source={Images.BG_6}>
                                            <MenuOption
                                                style={[styles.menuContainer]}
                                                onSelect={() => navigation.navigate("MyWeb", { name: 'Add Complaint', url: `https://online.kanpursmartcity.org/` })}>
                                                <View style={{flexDirection:'row'}}>
                                                <MaterialCommunityIcons name='star-four-points' size={12} style={{marginTop:5}} color={Colors.black} />
                                                <Text style={styles.menuLabel}>{'Complaint'}</Text>
                                                </View>
                                            </MenuOption>
                                            </ImageBackground>
                                        </MenuOptions> :
                                        <MenuOptions
                                            optionsContainerStyle={{
                                                // paddingVertical: 2,
                                                borderRadius: 15,
                                                // //backgroundColor: 'rgba(255, 213, 194, 0.99)',
                                                // elevation: 20,
                                            }}>

                                            <>
                                                <ImageBackground
                                                    blurRadius={1}
                                                    imageStyle={{ borderRadius: 15 }}
                                                    style={styles.bgImageStyle}
                                                    source={Images.BG_6}>
                                                    <ScrollView
                                                        //onScrollEndDrag={()=>setCompleteScrollBarHeight(1)}
                                                        //contentContainerStyle={{ paddingRight: 14 }}
                                                        onContentSizeChange={onContentSizeChange}
                                                        onLayout={onLayout}
                                                        onScroll={Animated.event(
                                                            [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
                                                            { useNativeDriver: false },
                                                        )}
                                                        scrollEventThrottle={16}
                                                        showsVerticalScrollIndicator={false}
                                                        // style={styles.scrollViewContainer}

                                                        style={{ height: hp('10'), borderRadius: 45, marginHorizontal: 10, paddingTop: 3 }}>
                                                        {item.lstCategorySubCategoryResp.map((subItem: any) => {
                                                            return (
                                                                <MenuOption
                                                                    key={`subCat${subItem.subCategoryName}`}
                                                                    style={[styles.menuContainer]}
                                                                    onSelect={() => onSelectCircleIcon(subItem)}>

                                                                    <View
                                                                    style={{ flexDirection: 'row' }}>
                                                                        {/* <View style={styles.menuIcon}>
                                                                            <FontAwesomeIcon name={subItem.icon} size={17} color={Colors.black} />
                                                                        </View> */}
                                                                        <View style={{ marginTop: 5 }}>
                                                                            <MaterialCommunityIcons name='star-four-points' size={12} color={Colors.black} />
                                                                        </View>
                                                                        <Text style={styles.menuLabel}>{i18n.t(subItem.subCategoryName)}</Text>
                                                                    </View>
                                                                </MenuOption>
                                                            );
                                                        })}
                                                    </ScrollView>
                                                </ImageBackground>
                                                <View style={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    //borderWidth:1,
                                                    // backgroundColor: '#232323',
                                                    height: 20,
                                                    borderRadius: 3,
                                                    width: 4,
                                                }}>
                                                    <Animated.View
                                                        style={[
                                                            {
                                                                backgroundColor: (item.lstCategorySubCategoryResp.length > 2 ? 'gray' : 'transparent'),
                                                                borderRadius: 3,
                                                                width: 4,
                                                            },
                                                            {
                                                                height: scrollIndicatorSize,
                                                                transform: [{ translateY: scrollIndicatorPosition }],
                                                            },
                                                        ]}
                                                    />
                                                </View>
                                            </>
                                        </MenuOptions>}

                                </Menu>

                            </ActionButtonCircle.Item>
                        )
                    })}
                </ActionButtonCircle>
            </View>
        </View>
    )
}

export default CircleDesign;

const style = (theme: any) => StyleSheet.create({
    dashboardCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        width: wp('96'),
        height: hp('47'),
        marginTop: hp('1.5'),
        flex: 1,
        borderRadius: 360,
    },
    menuContainer: {
        // borderWidth:1,
        borderRadius: 45,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    menuLabel: {
        marginLeft: 5,
        color: theme.colors.TEXT,
        fontSize: 14,
        fontWeight: '700',
        //fontFamily: AppStyleConstant.CRIMSONPRO_BOLD
    },
    iconView: {
        //borderWidth: 1, 
        elevation: 20,
        height: 50,
        width: 50,
        borderRadius: 48,
        backgroundColor: theme.colors.DASHBOARD_HEADER_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#333',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    circleView: {
        height: 150,
        width: 152,
        borderRadius: 360,
        alignSelf: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        borderColor: theme.colors.ICON_COLOR2,
        borderWidth: 4
    },
    bgImageStyle: {
        flex: 1,
        paddingVertical: 2,
        borderRadius: 35,
        //backgroundColor: 'rgba(255, 213, 194, 0.99)',
        elevation: 20,
    }
})
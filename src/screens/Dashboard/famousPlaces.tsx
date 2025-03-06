import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base"
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import Constant from "../../utils/Constant";
import i18n from "../../utils/i18n";
import { hp, wp } from "../../utils/Responsive";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import Url from "../../utils/Url";
import { axiosRequest } from "../../utils/ApiRequest";
import useTheme from "../../config/theme/hooks/useTheme";
import { ImageSlider } from "react-native-image-slider-banner";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Carousel from "react-native-reanimated-carousel";
import AppStyleConstant from "../../utils/AppStyleConstant";
import { Indicator } from "react-native-image-slider-banner/src/indicator";
import { color } from "react-native-reanimated";
import { findCoordinates } from "../../utils/Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const FamousPlaces: any = () => {
    const navigation = useNavigation();
    const styles = useThemedStyles(style);
    const theme = useTheme();
    const [index1, setIndex] = useState<number>(1);

    const [data, setData] = useState([]);
    const [weather, setWeather] = useState(0);
    const [location, setLocation] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { response, userData } = useSelector(
        (state: RootState) => state.user,
    );
    let params: Object = {
        extraData: data
    };

    useEffect(() => {
        getPlaceList();
    }, []);
    const getPlaceList = (searchText: string = "",): void => {
        setLoading(true);

        let params: Object = {
            "instituteID":"1",
            "roomID":"-1",
            "userID":"-1",
            "formID":"-1",
            "type":"1",
            "fromdate":new Date(),
            "todate":new Date(),
            "slotID":"-1"
        };

        axiosRequest('/Institute/GetinstituteDetail', Constant.API_REQUEST_METHOD.POST, params).then(res => {
            const { data } = res;
            setData(data.result.lstInstittueImageRespDTO);
            // console.log(res.data.result)
            let params: any = {
                item: data
            };
            setLoading(false);

        }).catch(err => {
            setLoading(false);
        });
    }
    const onPlaceClick = (data: any): void => {
        console.log('onPress');
        console.log(data);
        let params: Object = {
            extraData: data.item
        };
        navigation.navigate('DetailView', params)
    }
    return (
        <>
            <View style={styles.deskBox2}>
                <Text style={styles.textHead}>{i18n.t('Hello')}</Text>
            </View>
            <View style={styles.deskBox}>

                <View style={[styles.imageListView1, { flex: 1}]}>
                    <Carousel
                        loop
                        width={wp("96")}
                        height={hp("26")}
                        autoPlay={true}
                        data={data}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => setIndex(index)}
                        renderItem={(index) => (
                            <TouchableOpacity
                                style={styles.imageSliderView}
                                // onPress={() => onPlaceClick(index)}
                            >
                                <Image style={styles.imageView}
                                    source={{ uri: `${data[index.index].instituteImage}` }}
                                >
                                </Image>
                                {/* <Text style={styles.imageText}>{`${data[index.index].appCompName}`}</Text> */}
                            </TouchableOpacity>
                        )}/>
                    <View style={styles.imageIndicatorView}>
                        <Indicator
                            data={data}
                            currenIndex={index1}
                        // indicatorContainerStyle={indicatorContainerStyle}
                        //activeIndicatorStyle={{ backgroundColor: 'red' }}
                        // inActiveIndicatorStyle={inActiveIndicatorStyle}
                        />
                    </View>
                </View>
                {/* <ImageSlider
                            data={imageData}
                            autoPlay={true}
                            caroselImageStyle={{ height: hp('23'), width: wp('96'),resizeMode:'stretch',borderRadius:8}}
                            //onItemChanged={(item) => console.log("item", item)}
                            onItemChanged={(item) => setImgArray(item.name)}
                            closeIconColor={theme.colors.ICON_COLOR}
                            timer={4000}
                            //caroselImageContainerStyle={{width: wp('96')}}
                        //indicatorContainerStyle={{bottom: 0,height:0}}
                        //onClick={()=>navigation.navigate('DetailView', params)}
                        >
                            <Text style={{ color: `${theme.colors.TEXT}`, fontSize: 22, textAlign: 'center', marginTop: 10 }}>{`${imgArray}`}</Text>
                        </ImageSlider> */}

                {/* <ScrollView horizontal={true}>
                    {data.map(item => {
                        return (
                            <TouchableOpacity 
                                onPress={() => onPlaceClick(item)}>
                                <View style={styles.imageListView}>
                                    <View style={styles.imageContainer3}>
                                        <Image
                                            source={{uri: `data:image/png;base64,${item.galleryImage}`}}
                                            style={styles.imagelist}></Image>
                                    </View>
                                    <Text style={styles.imageText} numberOfLines={2}>{i18n.t(item.appCompName)}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView> */}
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
    imageText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: AppStyleConstant.ROBOTO_SLAB_B,
        color: theme.colors.TEXT
    },
    imageSliderView: {
        width: wp("96"),
        height: hp("26"),
        borderRadius: 8,
        justifyContent: 'center',
    },
    imageView: {
        resizeMode:'stretch',
        borderWidth: 2,
        borderColor:theme.colors.LABEL_BACKGROUND,
        width: wp("96"),
        height: hp("23"),
        borderRadius: 8
    },
    imageIndicatorView: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    },
    imageListView1: {
        //width: wp("23.4"),
        height: hp("28"),
        // backgroundColor: theme.colors.BACKGROUND,
        borderRadius: 8,
        marginTop: hp('-1'),
    },
})
export default FamousPlaces;
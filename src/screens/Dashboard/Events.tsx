import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base"
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import Constant from "../../utils/Constant";
import i18n from "../../utils/i18n";
import styles from "./styles";
import { wp } from "../../utils/Responsive";
import { useDispatch } from "react-redux";
import { sagaActions } from "../../redux/saga/sagaActions";
import Url from "../../utils/Url";
import { axiosRequest } from "../../utils/ApiRequest";
import { LIST_OBJECT } from "../../types";
import moment from "moment";
import {default as style}  from "./styles";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";


const Events: any = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [data, setData] = useState<LIST_OBJECT[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const styles = useThemedStyles(style);
    useEffect(() => {
        getEventData();
    }, []);

    const getEventData = (searchText: string = ""): void => {
        setLoading(true);

        const params = {
            categoryID: 9,
            subCategoryID: 30,
            pageID:1,
            userID: -1,
            formID: -1,
            type: 1,
            searchText
        }

        axiosRequest(Url.LIST_DATA, Constant.API_REQUEST_METHOD.GET, params).then(res => {

            setData(res.data);

            setLoading(false);

        }).catch(err => {
            setLoading(false);
        });
    }
    const onWebService = (urlData: any) => {
        navigation.navigate('ImageWebView', urlData);
    };
    const onPress = (data: any): void => {
        console.log('onPress');
        console.log(data);
        let params: Object = {
            extraData: data
        };
        navigation.navigate('DetailView', params)
    }
    return (
        <>
            <View style={styles.deskBox2}>
                <Text style={styles.textHead}>{i18n.t('DashBoard.EVENTS')}</Text>
            </View>
            <View style={styles.deskBox}>
                <ScrollView horizontal={true}>
                    {data.map(item => {
                        return (
                            <TouchableOpacity 
                                onPress={() => onPress(item)}>
                                <View style={styles.imageListView}>
                                    <View style={styles.imageContainer3}>
                                        <Image
                                            source={{uri: `data:image/png;base64,${item.galleryImage}`}}
                                            style={styles.imagelist}></Image>
                                    </View>
                                    <Text numberOfLines={2} style={styles.imageText}>
                                        {i18n.t(item.appCompName)}
                                    </Text>
                                    <Text numberOfLines={1} style={styles.imageText1}>
                                        {moment(item.eventdate).utc().format('DD-MM-YY')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

            </View>
        </>
    )
}

export default Events;
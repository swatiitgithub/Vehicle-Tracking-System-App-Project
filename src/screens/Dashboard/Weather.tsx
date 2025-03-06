import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base"
import React, { useEffect, useState } from "react";
import { PermissionsAndroid, StyleSheet, TouchableOpacity } from "react-native";
import Constant from "../../utils/Constant";
import { hp, wp } from "../../utils/Responsive";
import useThemedStyles from "../../config/theme/hooks/useThemedStyles";
import useTheme from "../../config/theme/hooks/useTheme";
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppStyleConstant from "../../utils/AppStyleConstant";
import { axiosRequestThirdParty } from "../../utils/ApiRequestThirdParty";
import { findCoordinates } from "../../utils/Helper";


const Weather: any = () => {
    const navigation = useNavigation();
    const styles = useThemedStyles(style);
    const theme = useTheme();
    const [weather, setWeather] = useState(0);
    const [location, setLocation] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getLocation();
        getWhether();
    }, []);

    const getLocation = (): void => {
        findCoordinates().then((coordinates: any) => {
            const { coords } = coordinates;
            setLocation(coords)
            // dispatch({ type: sagaActions.GET_LOCATION,
            //   payload: {
            //       params: coords
            //   },})
        });
    };
    const getWhether = (): number => {
        const params = {
            current_weather: true,
            hourly: 'temperature_2m',
            latitude: (location.latitude != 0 ? location.latitude : 26.47),//26.47,
            longitude: location.longitude,//80.35,
        }
        //console.log(JSON.stringify(params))
        axiosRequestThirdParty('https://api.open-meteo.com/v1/forecast', Constant.API_REQUEST_METHOD.GET, params).then(res => {
            const weather = res.data.current_weather.temperature;
            // console.log(JSON.stringify(res.data))
            setWeather(weather);
            setLoading(false);

        }).catch(err => {
            setLoading(false);
        });
        return weather
        //`${weather}°C`
    }

    const permission = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        getWhether()
    }
    return (
        <>
            <View style={styles.deskBox3}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                onPress={permission}>
                    <Fontisto name='day-snow' size={25} style={{ color: '#87CEEB' }} />
                    <Text style={{ color: theme.colors.TEXT }}>{getWhether() + '°C'}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
const style = (theme: any) => StyleSheet.create({
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
    servicesIcon: {
        width: wp("13"),
        height: hp("6"),
        alignItems: 'center',
        marginVertical: hp("2"),
    },
})
export default Weather;
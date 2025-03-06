import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    Linking,
    Platform,
    Text,
    View,
    ToastAndroid,
    Alert,
    PermissionsAndroid
} from 'react-native';

import {
    responsiveHeight as hp,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import NetInfo from '@react-native-community/netinfo';
import Colors from './Colors';
import Constant from './Constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Images from './Images';
import { LIST_BG, LIST_OBJECT } from '../types';
import Geolocation from '@react-native-community/geolocation';


export async function checkConnection() {
    NetInfo.fetch().then(state => {
        console.log('NetInfo, is ' + (state.isConnected ? 'online' : 'offline'));
        return state.isConnected;
    });
};

export function noDataView() {
    return (
        <View style={{ height: '100%', alignSelf: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: '#777777' }}>No Data</Text>
        </View>
    );
}

export const BackArrow = () => {
    return (
        <AntDesign name="arrowleft" size={18} color={'#ffffff'} />
    )
}

export function headerWithLogo() {
    return (
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
            {/* <ResponsiveImage
                initWidth={hp(25)}
                initHeight={hp(10)}
                resizeMode="contain"
                source={require('../../assests/images/logo/logo.png')}
            /> */}
        </View>
    );
}



export function loaderWithButton(status: boolean) {
    return (
        <ActivityIndicator size="large" animating={status} color={Colors.primary} />
    );
}


export function isEmailvalidate(email: string) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
        return false;
    } else {
        return true;
    }
}

export function toast(msg: string) {
    if (Platform.OS == "android") {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        Alert.alert(msg);
    }
}

// { bg: Images.BG_1, bgImage: true };
// { bg: 'white', bgImage: false };
export function getBackground(categoryName: string): LIST_BG {
    switch (categoryName) {

        case 'BANK':
            return { bg: 'white', bgImage: false };
            // return { bg: Images.BG_1, bgImage: true };

        case 'HOSPITAL':
            return { bg: 'white', bgImage: false };
            // return { bg: Images.BG_1, bgImage: true };

        default:
            return { bg: 'white', bgImage: false };
    }
}

export function openLocation(lat: string, lng: string): void {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url: any = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    console.log(url)
    Linking.openURL(url);
}


export function notLoginAlert(navigation: any) {
    Alert.alert('Message', 'You are not login. Please login.', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'Login', onPress: () => navigation.navigate("Login") },
    ]);
}


export async function findCoordinates() {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Alter',
                message: `We want your location to help you to find things`,
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return new Promise((resolve, reject) => {
                Geolocation.getCurrentPosition(position => {
                    resolve(position)
                });
            })
        }

    } catch (err) {
        console.warn(err);
    }


}


export function camelize(str: string) {
    console.log('str---------------');
    console.log(str);
    console.log('str---------------');

    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
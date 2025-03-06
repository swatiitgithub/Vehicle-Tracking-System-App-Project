import React, { Component, useState } from 'react';
import {
    Keyboard,
    Image,
    View,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    Modal,
    Alert,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import AppStyleSheet from '../src/utils/AppStyleSheet';
import { getUrl } from './utils/ApiRequest';
import { hp, wp } from './utils/Responsive';

export default class SplashScreen extends Component {

    componentDidMount() {

        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 3000);
    }

    render() {
        return (
            <ImageBackground
                style={AppStyleSheet.imgBackground}
                resizeMode='cover'
                source={require('./assets/images/screenn.jpg')}
                >
                    {/* <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('DrawerStack')}
                    style={{position:'absolute',bottom:hp('9'),alignSelf:'center',height:hp('8'),width:wp('74')}}>
                    </TouchableOpacity> */}
            </ImageBackground>
        );
    }


}




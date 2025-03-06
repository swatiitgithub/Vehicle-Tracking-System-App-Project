import { StyleSheet } from 'react-native';
import Colors from './Colors';
import AppStyleConstant from './AppStyleConstant';
import {
    responsiveHeight as hp,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

const AppStyleSheet = StyleSheet.create({

    errorText: {
        color: 'red',
    },

    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabImgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
    },

    tabContainerHeight: {
        height: '85%',
    },

    screenContainerHeight: {
        height: '97%',
    },

    cardRadious: {
        padding: hp(4),
        borderTopLeftRadius: hp(8.2),
        borderTopRightRadius: hp(8.2),
        backgroundColor: 'white',

    },

    scrollContainer: {
        flex: 1,
    },

    inputText: {
        fontFamily: AppStyleConstant.FONT_FAMILY,
        height: hp(6),
        width: '100%',
        fontSize: responsiveFontSize(2.2),
    },

    inputItem: {
        borderColor: Colors.primary,
    },

    inputDropDown: {
        height: hp(7),
        width: '100%',
    },

    dropDownTextStyle: {
        color: '#4c4c4c',
        fontSize: responsiveFontSize(3),
    },

    button: {
        backgroundColor: Colors.primary,
        height: hp(7),
        width: '100%',
        borderRadius: hp(0.7),
        justifyContent: 'center',
    },

    buttonText: {
        fontFamily: AppStyleConstant.FONT_FAMILY,
        textAlign: 'center',
        color: 'white',
        fontSize: responsiveFontSize(2.5),
    },

});

export default AppStyleSheet;

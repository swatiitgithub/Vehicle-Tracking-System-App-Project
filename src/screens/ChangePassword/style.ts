import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import {
    responsiveHeight as hp,
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
  } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    headerContainer: {
        flex: 0.8,
        alignItems: 'center'
    },
    loginText: {
        fontSize: 30,
        marginTop: hp(3),
        color: Colors.primary,
        fontWeight: '700'
    },
    desContainer: {
        marginHorizontal: hp(5),
        marginVertical: hp(2)
    },
    logo: {
        height: hp(10),
        width: hp(10)
    },
    formContainer: {
        flex: 2,
        paddingHorizontal: hp(2),
        marginVertical: hp(1)
    },

    forgotPassword: {
        textAlign: 'right',
        paddingVertical: hp(10)
    },

    loginBtn: { marginVertical: hp(3) },

    signUpText: {
        textAlign: 'center',
        paddingVertical: hp(3),
        textDecorationLine: 'underline'
    },

    footerImage: {
        height: "100%",
        width: "100%"
    }
});

export default styles;

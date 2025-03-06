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
        marginTop: hp(5),
        color: Colors.primary,
        fontWeight: '700'
    },
    desContainer: {
        marginHorizontal: hp(8),
        marginVertical: hp(8)
    },
    logo: {
        height: hp(10),
        width: hp(10)
    },
    formContainer: {
        flex: 2,
        paddingHorizontal: hp(5),
        marginVertical: hp(3)
    },

    forgotPassword: {
        textAlign: 'right',
        paddingVertical: hp(5)
    },

    loginBtn: { marginVertical: hp(6) },
    loginBtn1: { marginVertical: hp(6),backgroundColor:Colors.greygrey },

    signUpText: {
        textAlign: 'center',
        paddingVertical: hp(6),
        textDecorationLine: 'underline'
    },

    footerImage: {
        height: "100%",
        width: "100%"
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },
      textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
      },
});

export default styles;

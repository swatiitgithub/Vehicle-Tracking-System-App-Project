import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Colors from '../../utils/Colors';


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
        marginTop: heightPercentageToDP(2),
        color: Colors.primary,
        fontWeight: '700'
    },
    desContainer: {
        marginHorizontal: heightPercentageToDP(5),
        marginVertical: heightPercentageToDP(2)
    },
    logo: {
        height: heightPercentageToDP(15),
        width: heightPercentageToDP(15)
    },
    formContainer: {
        flex: 2,
        paddingHorizontal: heightPercentageToDP(4),
        marginVertical: heightPercentageToDP(1.3)
    },

    forgotPassword: {
        textAlign: 'right',
        paddingVertical: heightPercentageToDP(2)
    },

    loginBtn: { marginVertical: heightPercentageToDP(5) },

    signUpText: {
        textAlign: 'center',
        paddingVertical: 15,
        textDecorationLine: 'underline'
    },

    footerImage: {
        height: "100%",
        width: "100%"
    }
});

export default styles;

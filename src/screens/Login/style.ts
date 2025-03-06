
import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import { hp, wp } from '../../utils/Responsive';


const styles = (theme: any) => StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: theme.colors.BACKGROUND,
    // },

    headerContainer: {
        flex: 0.8,
        alignItems: 'center'
    },
    loginText: {
        fontSize: 30,
        marginTop: hp('1'),
        // color: theme.colors.PRIMARY,
        color: "black",
        fontWeight: '700'
    },
    desContainer: {
        marginHorizontal: hp('10'),
        marginVertical: hp('2')
    },
    // logo: {
    //     height: hp('10'),
    //     width: hp('10')
    // },
    formContainer: {
        flex: 1.5,
        paddingHorizontal: hp('5'),
        marginVertical: hp('5'),
    },

    forgotPassword: {
        textAlign: 'right',
    },

    loginBtn: {
        marginTop: hp('2'),
        backgroundColor: '#FF7A1A',
        borderRadius: 27,
        // marginHorizontal: wp('5'),
        alignSelf: 'center',
        width: wp('80'),
    },
    otherBtn: {
        color: '#fff',
        borderRadius: 27,
        width: wp('40'),
    },
    buttonPressed: {
        transform: [{ translateY: 2 }],
        shadowOffset: { width: 0, height: 0 },
        borderBottomWidth: 0,
    },

    connectWith: {
        textAlign: 'center',
        paddingVertical: hp('2'),
        textDecorationLine: 'underline'
    },

    footerImage: {
        height: hp('25'),
        width: wp('100'),
    },
    deskBox: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        elevation: 5,
        borderRadius: 48,
        height: hp('6'),
        alignItems: 'center',
        marginBottom: hp('2'),
        marginHorizontal: wp('3'),
    },
    rememberDeskBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp('2.5')
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10,
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 80,
        resizeMode: 'contain',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card: {
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#eee',
        margin: 10,
        padding: 15,
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    },
    cardHovered: {
        transform: [{ scale: 1.05 }],
        shadowColor: '#3b5998',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
    },
    inputContainer: {
        borderRadius: 10,
        backgroundColor: '#eee',
        margin: 10,
        paddingHorizontal: 5,
        width: '85%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        fontSize: 16,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#0066cc',
        borderRadius: 10,
        padding: 15,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    errorStyle: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: Colors.red,
        textAlign: 'left',
        paddingLeft:20
    },
    deskBox1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        width: '80%',
        alignSelf: 'center'
    },
     scrollContent: {
    padding: 20,
  },
  
});

export default styles;

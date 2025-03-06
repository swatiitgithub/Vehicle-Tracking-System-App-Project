
import { StyleSheet } from 'react-native';
import { hp, wp } from '../../../utils/Responsive';
import Colors from '../../../utils/Colors';


const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND,
    },

    headerContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop:10
        // backgroundColor:'red'
    },
    loginText: {
        height:40,
        fontSize: 25,
        justifyContent:'center',
        textAlignVertical:'center',
        marginTop: hp('1'),
        // color: theme.colors.PRIMARY,
        fontWeight: '700'
    },
    desContainer: {
        marginHorizontal: hp('10'),
        marginVertical: hp('2')
    },
    logo: {
        height: hp('10'),
        width: hp('10')
    },
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
        // backgroundColor: '#FF7A1A',
        borderRadius: 27,
        // marginHorizontal: wp('5'),
        alignSelf:'center',
        width: wp('80'),
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
});

export default styles;

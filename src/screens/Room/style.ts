
import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import { hp, wp } from '../../utils/Responsive';
import { responsiveFontSize } from 'react-native-responsive-dimensions';


const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND,
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
        // backgroundColor: Colors.darkgrey
    },
    loginText: {
        height: 40,
        fontSize: 30,
        justifyContent: 'center',
        textAlignVertical: 'center',
        marginTop: hp('1'),
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
        borderRadius: 27,
        alignSelf: 'center',
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
    icon: {
        fontSize: responsiveFontSize(3.3)
    },

    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        height: 140,
        marginTop: -4
    },

    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'white',
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    item: {
        padding: 2,
        flexDirection: 'row'
    },
    header: {
        fontSize: responsiveFontSize(2.5),
        backgroundColor: "#fff",
        fontWeight: 'bold'
    },
    title: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400',
        marginTop: 5
    },
    subTitle: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400'
    },
    headerIcon: {
        width: 17,
        height: 20,
        justifyContent: 'center'
    },
    headerText: {
        width: "87%",
        fontSize: 18,
        fontWeight: '500',
        paddingVertical: 5,
        color: theme.colors.TEXT,
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        marginLeft: 30
    },

    subHeaderTextContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    subHeaderText: {
        fontSize: 13,
        color: theme.colors.TEXT,
    }
});

export default styles;
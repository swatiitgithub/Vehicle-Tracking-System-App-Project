
import { StyleSheet } from 'react-native';
import { hp, wp } from '../../../utils/Responsive';
import Colors from '../../../utils/Colors';
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
        backgroundColor: Colors.darkgrey
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
        fontSize: 15,
        fontWeight: '500',
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 10,
        width: wp("50"),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: Colors.blue,
        alignItems: 'flex-end',
        width: wp("49")
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    rate: {
        marginLeft: wp('2'), flexDirection: 'row'
    },
    textRate: {
        textAlign: 'center',
        fontSize: 50,
        color: Colors.black,
    },
    rate1: {
        flex: 1, justifyContent: 'center'
    },
    arrow: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 2,
        marginRight: wp('5'),
    },
    header1: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    subHead: {
        flex: 1,
    },
    subHead1: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 20,
        justifyContent: 'flex-end'

    },
    head1: {
        paddingHorizontal: wp('2'),
        paddingVertical: hp('2'),
    },
    head2: {
        fontWeight: '700',
        color: Colors.black,
        fontSize: 20,
        marginLeft: wp('2'),
    },
    head3: {
        fontWeight: '400',
        fontSize: 12,
        justifyContent: 'flex-start',
        marginLeft: wp('2'),
        marginBottom: hp('2'),
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
       
    },
    text: {
        fontSize: 42,
    },
    text1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    text2: {
        color: 'white',
        fontSize: 16,
    },
    header: {
        height: hp('40'),
        borderBottomLeftRadius: 40,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
    },
    map: {
        marginVertical: hp('3'),
        marginHorizontal: wp('1'),
        height: hp('20'),
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.primary,
    },
    map1: {
        position: 'absolute',
        top: hp('8.5'),
        // left: wp('10'),
    },
    map2: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        width: wp("100")
    },

    headerBG: {
        height: hp('40'),
    },
    text3: {
        textAlign: 'center',
        marginBottom: hp('2'),
    },

    headerContainer: {
        flex: 1,
    },

    titleContainer: {
        width: wp('80'),
        alignItems: 'center',
    },
    feedback: {
        position: 'absolute',
        width: wp('25'),
        bottom: hp('4'),
        right: wp('3'),
    },

    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF',
        width: wp('75'),
    },

    mapBox: {
        height: hp('20'),
    },

    card1: {
        width: '98%',
        height: hp('8'),
        backgroundColor: '#0500FF0D',
        marginTop: hp('-1'),
        borderRadius: 8,
        marginVertical: hp('5'),
        marginLeft: wp('5'),
        paddingVertical: hp('1'),
        paddingHorizontal: wp('2'),
        justifyContent: 'center',
    },
    back: {
        backgroundColor: '#0500FF0D',
        borderRadius: 10,
        marginVertical: 5,
        padding:6
    },
    card3: {
        width: '100%',
        height: hp('8'),
        backgroundColor: '#0500FF0D',
        marginTop: hp('-1'),
        borderRadius: 8,
        marginVertical: hp('5'),
        marginLeft: wp("1"),
        paddingVertical: hp('1'),
        paddingHorizontal: wp('4'),
        justifyContent: 'center',
    },
    cardDetail: {
        flex: 1,
        marginTop: hp('1'),
        borderRadius: 8,
        marginHorizontal: wp('1'),
        justifyContent: 'center',
    },
    cardDetail1: {
        flex: 1,
        marginTop: hp('1'),
        borderRadius: 8,
        marginHorizontal: wp('1'),
        paddingHorizontal: wp('2'),
        justifyContent: 'center',
    },
    elevation: {
        elevation: 20,
        shadowColor: '#0500FF0D',
    },
    image: {
        width: wp('100'),
        height: hp('25'),
        borderRadius: 20,
    },
    imageList: {
        width: wp('22'),
        height: hp('10'),
    },
    imageContainer3: {
        overflow: 'hidden',
        width: wp('22'),
        height: hp('10'),
        marginHorizontal: wp('1'),
        borderRadius: 10,
    },
    imageListView: {
        width: wp('24'),
        borderRadius: 5,
        marginTop: wp('2'),
    },
    card: {
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 10,
    },
    card2: {
        flex: 1,
        flexDirection: 'row'
    },
    icontext: {
        color: Colors.white,
        fontWeight: '700',
        fontSize: 10,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: hp("0.5")
    },
    servicesicon: {
        width: wp("13"),
        height: hp("5"),
        alignItems: 'center',
        marginVertical: hp("1.5"),
        justifyContent: 'center'
    },
    twitter: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: wp("1.5"),
        marginTop: hp("0.625"),
        backgroundColor: Colors.twitter,
        // width: wp("15"),
        flex: 1,
    },
    instagram: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: wp("1.5"),
        marginTop: hp("0.625"),
        backgroundColor: Colors.instagram,
        // width: wp("15"),
        flex: 1,
    },
    website: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: wp("1.5"),
        marginTop: hp("0.625"),
        backgroundColor: "black",
        // width: wp("15"),
        flex: 1,
    },
    facebook: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: wp("1.5"),
        marginTop: hp("0.625"),
        backgroundColor: Colors.facebook,
        // width: wp("15"),
        flex: 1,
    },
    deskBox: {
        flexDirection: 'row',
        paddingVertical: hp('2')
    }
});

export default styles;

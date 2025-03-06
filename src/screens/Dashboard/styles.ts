
import { Dimensions, StyleSheet } from 'react-native';
import AppStyleConstant from '../../utils/AppStyleConstant';
import Colors from '../../utils/Colors';
import { fontSize, hp, wp } from '../../utils/Responsive';
const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const styles = (theme: any) => StyleSheet.create({
    
    
    scrollViewContainer:
    {
        paddingHorizontal: wp('2'),
        backgroundColor: theme.colors.BACKGROUND,
    },
    imageContainer: {
        width: '100%',  
        height: '70%',  
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5, 
      },
    IMGBg: {
        width: wp("100"),
        height: '100%',
    },
    imageContainer1: {
        overflow: 'hidden',
        borderRadius: 20,
        width: wp("93"),
        height: hp("25"),
    },
    image: {
        width: wp("100"),
        height: hp("25"),
        borderRadius: 20
    },
    imagelist: {
        width: wp("21"),
        height: hp("10"),
    },
    imageContainer3: {
        overflow: 'hidden',
        width: wp("21"),
        height: hp("10"),
        marginHorizontal: wp("1"),
        elevation: 10,
        elevationColor: 'grey',
        backgroundColor: Colors.white,
        borderRadius: 10,
    },
    imageListView: {
        width: wp("23.4"),
        backgroundColor: theme.colors.BACKGROUND,
        borderRadius: 5,
        marginTop: wp('2'),
    },
    imageListView1: {
        height: hp("28"),
        // backgroundColor: theme.colors.BACKGROUND,
        borderRadius: 8,
        marginTop: hp('-1'),
    },
    menuContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    menuIcon: {
        width: 20,
    },
    menuLabel: {
        marginLeft: 5,
        color: theme.colors.TEXT,
        fontSize: 14,
        fontWeight: '700',
    },
    servicesIcon: {
        width: wp("13"),
        height: hp("6"),
        alignItems: 'center',
        marginVertical: hp("2"),
    },
    servicesIconViewB: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: hp("0.625"),
        backgroundColor: theme.colors.BACKGROUND,
        elevation: 10,
        flex: 1,
    },
    servicesIconViewO: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: wp("1"),

        backgroundColor: theme.colors.CARD_BACKGROUND,
        elevation: 10,
        flex: 1,
    },
    iconText: {
        paddingTop: hp("1"),
        color: theme.colors.TEXT,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
        width: wp("20"),
        lineHeight: 15,
    },
    head: {
        fontSize: 20,
        color: Colors.black,
        fontWeight: '500',
        textDecorationStyle: 'solid',
    },
    textHead: {
        fontSize: 16,
        color: theme?.colors.TEXT,
        fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
    },
    textHead1: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: '400',
        textAlign: 'center'
    },
    textHead2: {
        fontSize: 15,
        color: Colors.black,
        fontWeight: '400',
        textAlign: 'center'
    },
    populationView: {
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: theme.colors.BACKGROUND,
        height: hp("6"),
        justifyContent: 'center',
        elevation: 5,
        marginHorizontal: wp('1.5'),
        flex: 1,
    },
    rightHeader: {
        width: wp("85"),
        height: hp("8"),
        flexDirection: 'row',
        paddingLeft: wp("4"),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.DASHBOARD_HEADER_BACKGROUND,
    },
    deskBox: {
        flexDirection: 'row',
        paddingTop: hp("2"),
        marginRight: wp('1'),
        // backgroundColor:'blue',
        // backgroundColor:'blue',
        // width:wp("100"),

    },
    deskBox1: {
        flexDirection: 'row',
        paddingTop: hp("0.5"),
    },
    deskBox2: {
        marginTop: hp("2"),
        flexDirection: 'row',
        paddingVertical: hp("1"),
        paddingLeft: 15,
        backgroundColor: theme.colors.LABEL_BACKGROUND,
        alignContent: 'center',
        borderTopLeftRadius: 28,
        borderBottomRightRadius: 28
    },
    deskBox3: {
        marginTop: hp("2"),
        flexDirection: 'row',
        paddingVertical: hp("1"),
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    searchBox: {
        textDecorationColor: Colors.backgroundGrey,
        backgroundColor: theme.colors.BACKGROUND,
        width: wp("75"),
        marginVertical: hp("1"),
        borderRadius: 10,
        height: hp("6"),
        elevation: 10,
        marginRight: wp("0.69"),
        marginLeft: wp("1"),
        textAlign: 'left',
    },
    // searchIcon: {
    //     backgroundColor: Colors.orangebtn,
    //     borderRadius: 10,
    //     width: wp("15"),
    //     height: hp("6"),
    //     alignItems: 'center',
    //     marginVertical: hp("1"),
    //     marginLeft: wp("0.18"),
    //     elevation: 10,
    //     justifyContent: 'center',
    // },
    textAbout: {
        textAlign: 'left',
        fontWeight: '400',
        fontSize: fontSize("2"),
        color: theme.colors.TEXT,
        paddingTop: hp("2"),
        marginHorizontal: wp('2')
    },
    headerImageContainer: {
        width: wp("65"),
        height: hp("5"),
        justifyContent:'center',
        // backgroundColor:'#0EA293', 
        // backgroundColor: 'red'
    },
    headerImage: {
        resizeMode:'contain',
        marginTop: hp("1"),
        width: wp("50"),
        height: hp("5"),
        backgroundColor:'#0EA293',
    },
    imageText: {
        paddingTop: hp('1'),
        width: wp('23'),
        height: hp('6'),
        textAlign: 'center',
        alignSelf: 'center',
        color: theme.colors.TEXT,
        fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
        lineHeight: 16,
    },
    imageText1: {
        width: wp('21.5'),
        // height: hp('6'),
        textAlign: 'center',
        alignSelf: 'center',
        color: theme.colors.TEXT,
        fontFamily: AppStyleConstant.ROBOTO_SLAB_EB,
        lineHeight: 16,
        fontSize: 10
    },

    centeredView: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: hp("80"),
        width: wp("80"),
        marginTop: hp("10"),
        paddingTop: hp("5"),
        backgroundColor: theme.colors.BACKGROUND,
        borderRadius: 10,
    },
    modalView: {
        marginHorizontal: wp("5"),
        marginVertical: hp("5"),
        backgroundColor: theme.colors.BACKGROUND,

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
        borderRadius: 100,
        // padding: 10,
        // elevation: 2,
        marginTop: hp("8"),
        marginLeft: wp("86"),
        position: 'absolute',
        backgroundColor: theme.colors.BACKGROUND,
        height: hp("3"),
        width: wp("6"),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button1: {
        // borderRadius: 10,
        padding: 10,
        // elevation: 2,
        alignSelf: 'center',
    },
    buttonClose: {
        // width:wp('15'),
        // backgroundColor: '#9296F5',
        zIndex: 999
    },
    buttonClose1: {
        width: wp('70'),
        backgroundColor: '#9296F5',
    },
    buttonMore: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    textModal: {
        // width:wp('10'),
        fontSize: 40,
        color: Colors.event,
        fontWeight: '700',
        textAlign: 'center'
    },
    modalImageContainer: {
        width: wp('60'),
        height: hp('30')

    },
    modalImage: {
        width: wp('20'),
        height: hp('10'),
        borderRadius: 100,
    },
    sosButtonTextStyle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: wp('1'),
        paddingVerticle: hp('2'),
        fontFamily: AppStyleConstant.ROBOTO_SLAB_B,
        elevation: 10,
    },
    modalCard: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: Colors.event,
        width: wp('70'),
        marginTop: hp('2'),
        paddingVertical: hp('1'),
        paddingLeft: wp('3')
    },
    guestNameHead: {
        marginLeft: wp('5'),
        fontSize: 23,
        color: Colors.facebook,
        fontWeight: '700',
    },
    separatorLine: {
        width: wp('30'),
        borderWidth: 2,
        marginLeft: wp('5'),
        borderColor: Colors.darkblue,
    },
    modalIconView: {
        flexDirection: 'row',
        alignContent: 'center',
        width: wp('70'),
        marginTop: hp('1'),
    },
    clickMore: {
        backgroundColor: Colors.white,
        width: wp('50'),
        textAlign: 'center',
        borderRadius: 10,
        fontSize: 15,
        color: 'black',
    },
    modalTextDetailView: {
        backgroundColor: Colors.event,
        width: wp('80'),
        height: hp('35'),
        borderRadius: 10,
        marginTop: hp('2'),
        paddingTop: hp('2'),
    },
    modalMoreButton: {
        backgroundColor: Colors.red,
        width: wp('30'),
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: hp('6'),
        height: hp('4'),
        justifyContent: 'center',
    },
    header: {
        height: hp('40'),
        borderBottomLeftRadius: 40,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
    },
    headerBG: {
        height: hp('40'),
    },
    header1: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    imageList: {
        width: wp('22'),
        height: hp('10'),
    },
    dashboardCircle:{
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        width:wp('96'),
        height:hp('47'),
        marginTop:hp('1.5'),
        flex:1,
        borderRadius:360,
    },
    labelText:{
        width:wp('29'),
        textAlign:'center'
    },
    bgImageStyle:{
        flex:1,
        paddingVertical: 2,
        borderRadius: 35,
        elevation: 20,
    },
    container: {
        marginBottom: 16,
    },
    gradient: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    scrollViewContent: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    cardRow: {
        flexDirection: 'row',
        marginBottom: 1
       
    },
    card: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 18,
        marginVertical: 5,
        marginLeft: -5, 
        width: Dimensions.get('window').width * 0.45,  // Fixed width (45% of the screen)
        height: 110,  // Fixed height
        flexDirection: 'column',  // Arrange children vertically
        alignItems: 'center',
        shadowRadius: 5,
        elevation: 5,
      },
      textContainer: {
        flex: 1,  // Occupy the remaining half of the card
        justifyContent: 'center',
        alignItems: 'center',
      },
    badge: {
        position: 'absolute',
        top: -5, 
        right: -5, 
        backgroundColor: 'red',
        borderRadius: 10, 
        width: 20, 
        height: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
      },
      badgeText: {
        color: 'white', 
        fontSize: 12, 
        fontWeight: 'bold', 
      },


    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    headingCard: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 20,
        textAlign: 'center',
    },
    pieChartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
      },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    icon: {
        marginBottom: 10,
    },
    progressBarsContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      },
      chartTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
      },
      statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        alignSelf: 'flex-start',
      },
      detailsContainer: {
        marginTop: 18,
        padding: 10, 
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, 
    },
    detailText: {
        fontSize: 13, 
        marginVertical: 2, 
        color: '#111', 
        fontWeight: '500', 
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    
    iconImage: {
        width: '100%',  // Full width of the image container
        height: '100%',  // Full height of the image container
        resizeMode: 'contain',  // Ensures the image scales proportionally
      },
   
    touchableOverlay: {
        position: 'absolute',
        width: screenWidth,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliceTouchable: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliceText: {
        fontSize: 10, 
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // chartTitle: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    //   },
      touchableContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      touchableWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 10,
        alignItems: 'center',
      },
      touchableLabel: {
        backgroundColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
      },
    //   labelText: {
    //     color: '#000',
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //   },
      touchableValue: {
        backgroundColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: 10,
      },
      valueText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      },


      cardText: {
        fontSize: 16,  // Adjust font size as necessary
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
      },
    chartContainer: {
        position: 'relative',
        width: 300, // Width of the pie chart container
        height: 300, // Height of the pie chart container
        borderRadius: 150, // Make it circular to fit the pie chart
        backgroundColor: '#eee', // Background color of the pie chart container
      },
      errorText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 16,
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#40E0D0',
      },
      closeButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
      },
      closeButtonText: {
        color: 'white',
        fontSize: 16,
      },
      modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#1B3B5F",
    },
    
   
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    horizontalScroll: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    verticalScroll: {
        flex: 1,
    },
      tableHeaderRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#87CEEB',
        paddingVertical: 8,
    },
    tableHeader: {
        fontWeight: 'bold',
        fontSize: 14,
        width: 100,
        textAlign: 'center',
        color: '#1B3B5F',
        paddingBottom: 8,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 12,
    },
    tableCell: {
        fontSize: 12,
        width: 100,
        textAlign: 'center',
        paddingTop: 8,
    },
    headerContainer: {
       
        zIndex: 1, 
        backgroundColor: 'white', 
    },
    iconn: {
        width: 20,
        height: 20,
        marginRight: 5,
      },
      imageStyle: {
        borderRadius: 10, // Optional: Rounds image corners
      },
      
      carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f7fa',
        paddingHorizontal: 0, // No horizontal padding to avoid space on the sides
      },
      carouselImage: {
        width: width, // Set the width to the screen width
        height: width / 2, // Proportional height
        borderRadius: 0, // Removed borderRadius to make the image fully cover the screen
        resizeMode: 'cover', // Ensures the image covers the area without distortion
      },
      carouselWrapper: {
        marginBottom: 20,
      },
      loaderOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',  // Optional: semi-transparent background
        zIndex: 1,
    },
    bottomTab: {
        height: 60, // Adjust height as needed
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    
     

    



});

export default styles;
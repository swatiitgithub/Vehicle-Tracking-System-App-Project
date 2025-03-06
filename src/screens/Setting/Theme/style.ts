import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";



const styles = (theme: any) => StyleSheet.create({
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
    container: {
        flex: 1,
        marginHorizontal: 16,
        backgroundColor:theme.colors.BACKGROUND
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        marginHorizontal:5
    },
    headerIcon: {
        width: 17,
        height: 20,
        justifyContent: 'center'
    },
    headerText: {
        width: "87%",
        paddingHorizontal: 15,
        paddingVertical: 8,
        fontSize: 14,
        fontWeight: '500',
        color:theme.colors.TEXT,
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
        color:theme.colors.TEXT,
    }

});


export default styles;
import { useRoute } from "@react-navigation/native";
import { View } from "native-base"
import React from "react";
import { StyleSheet, Text, ViewBase } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import ActionBar from "../../components/ActionBar";
import CustomDropDown from "../../components/widgets/CustomDropDown";
import Colors from "../../utils/Colors"
import { fontSize, hp, wp } from '../../utils/Responsive';

const data: any = [
    {
        name: 'adec'
    },
    {
        name: 'adec1'
    }
]
const ShowComplaint : React.FC = () => {
    const route: any = useRoute();
    const  details : any = route.params;
    const categoryName:any = route.params.data;
    console.log("my route data \n"+categoryName)
    return (
        <>
        <ActionBar />
            <View
                style={styles.container}>
                <View style={[styles.card, styles.elevation]}>
                    <View style={styles.parentDescBox}>
                        <View style={styles.descBox}>
                            
                            <View style={styles.date}>
                                <Text style={styles.textHead} >
                                    {`Name`}
                                </Text>
                            </View>
                            <View style={styles.date1}>
                                <Text style={styles.textValue} >
                                    {`${details.personName}`}
                                </Text>
                            </View>

                        </View>
                        <View style={styles.descBox}>
                            <View style={styles.date}>
                                <Text style={styles.textHead} >
                                    {`Mobile No`}
                                </Text>
                            </View>
                            <View style={styles.date1}>
                                <Text style={styles.textValue} >
                                    {details.mobileNo}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.descBox}>
                            <View style={styles.date}>
                                <Text style={styles.textHead} >
                                    {`E-mail`}
                                </Text>
                            </View>
                            <View style={styles.date1}>
                                <Text style={styles.textValue} >
                                    {details.emailID}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.descBox}>
                            <View style={styles.date}>
                                <Text style={styles.textHead} >
                                    {`Address`}
                                </Text>
                            </View>
                            <View style={styles.date1}>
                                <Text numberOfLines={1} style={styles.textValue} >
                                    {`${details.houseNo} ${details.locality} ${details.sectorArea} ${details.landMark}`}

                                </Text>
                            </View>
                        </View>

                        <View style={styles.descBox}>
                            <View style={styles.date}>
                                <Text style={styles.textHead} >
                                    {`Complaint Name`}
                                </Text>
                            </View>
                            <View style={styles.date1}>
                                <Text style={styles.textValue} >
                                    {`Solid Waste`}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.descBox}>
                            <View style={styles.date}>
                                <Text style={styles.textHead} >
                                    {`Description`}
                                </Text>
                            </View>
                            <View style={styles.date1}>
                                <Text numberOfLines={2} style={styles.textValue} >
                                    {details.caseDesc}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.descBox}>
                            <View style={styles.date}>
                                <Text style={styles.textHead} >
                                    {`Type`}
                                </Text>
                            </View>
                            <View style={styles.date1}>
                                <Text numberOfLines={2} style={styles.textValue} >
                                    {details.caseDesc}
                                </Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </View>
        </>
    )
}
export default ShowComplaint;

const styles = StyleSheet.create({
    date: {
        flex: 1
    },
    date1: {
        flex: 2
    },

    detail: {
        flex: 1, flexDirection: 'row'
    },
    name: {
        flex: 1
    },

    subDescBox: {
        flex: 1
    },
    parentDescBox: {
        flexDirection: 'column', marginVertical: hp("2")
    },
    container: {
        height: hp("100"),
        marginHorizontal: wp("2"),
    },
    card: {
        height: hp("100"),
        backgroundColor: Colors.white,
        borderRadius: 8,
        width: '100%',
        marginVertical: hp("1"),
    },
    head: {
        fontWeight: '500',
        fontSize: 15,
        color: Colors.black,
    },
    descBox: {
        paddingTop: hp("1"),
        flexDirection: 'row',
    },
    descBox1: {
        paddingTop: hp("1"),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginEnd: wp('10'),
    },
    textHead: {
        marginLeft: wp("2"),
        fontWeight: '500',
        fontSize: 12,
        color: Colors.black,
    },

    textValue: {
        fontSize: 12,
        fontWeight: '500',
        paddingVertical: hp("0.3"),
        marginLeft: wp("1"),
        color: Colors.greygrey2,
    },
    textValue1: {
        fontSize: 10,
        fontWeight: '500',
        color: Colors.white,
    },
    elevation: {
        elevation: 20,
        shadowColor: Colors.backgroundGrey,
    },
    vbutton: {
        height: hp("3"),
        width: wp("15"),
        borderRadius: 10,
        backgroundColor: Colors.darkblue,
        borderWidth: 1,
        borderColor: Colors.lessdarkgrey,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: hp("2"),
    },
    vbuttonS: {
        height: hp("3"),
        width: wp("15"),
        borderRadius: 10,
        backgroundColor: Colors.darkgreen,
        borderWidth: 1,
        borderColor: Colors.lessdarkgrey,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp("5"),
    },

})
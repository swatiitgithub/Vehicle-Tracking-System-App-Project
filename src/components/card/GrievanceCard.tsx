import { View } from "native-base"
import {  StyleSheet, Text, ViewBase } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Colors from "../../utils/Colors"
import { fontSize, hp, wp } from '../../utils/Responsive';

const GrievanceCard = ({ item, onPress }: any) => {
    //console.log(item)
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}>

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
                                    {`${item.personName}`}
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
                                    {item.mobileNo}
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
                                    {item.emailID}
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
                                    {`${item.houseNo} ${item.locality} ${item.sectorArea} ${item.landMark}`}
                                    
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
                                    {item.caseDesc}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.descBox1]}>
                            <View
                                style={[styles.vbutton]}>
                                <Text style={styles.textValue1}>{'Pending'}</Text>
                            </View>
                            <View
                                style={[styles.vbutton]}>
                                <Text style={styles.textValue1}>{'Process'}</Text>
                            </View>
                            <View
                                style={[styles.vbuttonS]}>
                                <Text style={styles.textValue1}>{'Solved'} </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
export default GrievanceCard;

const styles = StyleSheet.create({
    date:{
        flex:1
    },
    date1:{
        flex:2   
     },

    detail:{
        flex:1,flexDirection:'row'
    },
    name:{
        flex:1
    },

    subDescBox:{
        flex:1
    },
    parentDescBox:{
        flexDirection: 'column',marginVertical:hp("2")
    },
    container: {
        height: hp("34"),
        marginHorizontal: wp("2"),
    },
    card: {
        height: hp("32"),
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
        paddingTop:hp("1"),
        flexDirection: 'row',
    },
    descBox1: {
        paddingTop:hp("1"),
        flexDirection: 'row',
        justifyContent:'space-between',
        marginEnd:wp('10'),
    },
    textHead: {
        marginLeft:wp("2"),
        fontWeight: '500',
        fontSize: 12,
        color:Colors.black,
    },

    textValue: {
        fontSize: 12,
        fontWeight: '500',
        paddingVertical:hp("0.3"),
        marginLeft:wp("1"),
        color:Colors.greygrey2,
    },
    textValue1: {
        fontSize: 10,
        fontWeight: '500',
        color:Colors.white,
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
        alignItems:'center',
        marginHorizontal:hp("2"),
    },
    vbuttonS: {
        height: hp("3"),
        width: wp("15"),
        borderRadius: 10,
        backgroundColor: Colors.darkgreen,
        borderWidth: 1,
        borderColor: Colors.lessdarkgrey,
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:wp("5"),
    },

})
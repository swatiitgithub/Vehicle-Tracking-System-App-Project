
import { StyleSheet } from 'react-native';
import { hp, wp } from '../../../utils/Responsive';
import Colors from '../../../utils/Colors';


const viewStyles = (theme: any) => StyleSheet.create({
    container: {
        paddingTop:10,
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND,
        paddingHorizontal:wp('4')
    },
    deskBox:{
        flexDirection:'row',
        borderWidth:0.2,
        borderColor:Colors.darkgrey,
        borderRadius:4,
        paddingVertical:3,
        paddingLeft:5
    },
    textHead:{
        width: "45%",
        fontSize:16,
        fontWeight:'700',
        color:Colors.black 
    },
    textValue:{
        width: "55%",
        fontSize:16,
        color:Colors.greygrey 
    },
    avatarContainer:{
        alignSelf:'center',
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 0.1,
        marginTop: hp("3"),
        overflow: 'hidden',
    }
});

export default viewStyles;

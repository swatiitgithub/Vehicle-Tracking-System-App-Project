import { View, Text, TextInput, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Colors from "../../utils/Colors";

const CustomRating = (props: any) => {


      
    return (
        <View style={styles.verticalSpacing}>
            <Text style={[styles.label]}>
                {props.label}
            </Text>
            
            <View style={{
                width:155,
                marginTop:10
            }}>
            <AirbnbRating
                defaultRating={11}
                size={25}
                showRating={false}
                onFinishRating={props.onFinishRating}
            />
            </View>
           
            {props.error && (
                <Text style={styles.errorStyle}>{props?.error}</Text>
            )}
        </View>
    )
}


export default CustomRating;

const styles = StyleSheet.create({
    verticalSpacing: {
        marginTop: 16,
    },
    label: {
        fontSize: 15,
    },
    inputText: {
        height: 46,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 8,
    },
    errorStyle: {
        color: Colors.red,
        fontSize: 12,
        marginTop: 4,
    },
    textArea: {
        height: 150,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 8,
        textAlignVertical: 'top'
    }
})
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import { hp, wp } from "../../utils/Responsive";
import Feather from 'react-native-vector-icons/Feather';
import React from "react";

const CustomInputText = (props: any) => {

    return (
        <View style={styles.verticalSpacing}>
            <Text style={[styles.label,props.labelStyle]}>
                {props.label}
            </Text>
            
                <TextInput
                    autoCapitalize={`${props.autoCapitalize ? props.autoCapitalize:'none'}`}
                    keyboardType={`${props.keyboardType ? props.keyboardType:'default'}`}
                    style={[styles.label,props.inputStyle, props.type == 'textarea' ? styles.textArea : styles.inputText]}
                    {...props}
                />
            {props.error && (
                <Text style={styles.errorStyle}>{props?.error}</Text>
            )}
        </View>
    )
}


export default CustomInputText;

const styles = StyleSheet.create({
    verticalSpacing: {
        marginTop: 16,
    },
    label: {
        flex:1,
        fontSize: 15,
    },
    inputText: {
        borderWidth: 1,
        height: hp('6'),
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
        textAlignVertical: 'top',
        marginTop: 8,
    },
    deskBox: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        elevation: 5,
        borderRadius: 49,
        height: hp('6'),
        alignItems: 'center',
        marginTop: hp('2'),

    }
})
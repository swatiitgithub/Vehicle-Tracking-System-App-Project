import { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import React from "react";

const CustomDatePicker = (props: any) => {
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    return (
        <View style={styles.verticalSpacing}>

            <Text style={[styles.label]}>
                {props.label}
            </Text>
            <TouchableOpacity
                style={props.containerStyle}
                onPress={() => { setOpenDatePicker(true) }}
            >
                <TextInput
                    style={[styles.label, styles.inputText, {}]}
                    editable={false}
                    {...props}
                />
            </TouchableOpacity>
            {props.errors && props?.touched && (
                <Text style={styles.errorStyle}>{props?.errors}</Text>
            )}

            <DatePicker
                modal
                select="range"
                title={props?.title}
                open={openDatePicker}
                date={date}
                mode="date"
                // minimumDate={moment().toDate()}
                {...props}
                onDateChange={(date)=>(setDate(date))}
                onConfirm={(date: any) => {
                    setOpenDatePicker(false);
                    props.onConfirm(date);
                    setDate(date)
                }}
                onCancel={() => {
                    setOpenDatePicker(false);
                }}
            />
        </View>
    )
}


export default CustomDatePicker;

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
})
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../../utils/Colors";
import BottomModal from "./BottomModel/BottomModal";
import React from "react";

const CustomDropDown = (props: any) => {
    const [modelPopup, setModelPopup] = useState<boolean>(false);
    const [selectedVal, setSelectedVal] = useState<string>(props?.defaultValue);

    const onSelect = (item: any) => {
        setSelectedVal(item.name)
        setModelPopup(false)
        props.onSelectItem(item)
    }

    const dropDownModal = () => {
        return (
            <BottomModal onDrop={() => setModelPopup(false)} visible={modelPopup}>
                <View style={{ padding: 8, maxHeight: 400 }}>
                    <ScrollView>
                        {props.data && props.data.map((item: any, index: any) => (
                            <TouchableOpacity
                                key={`key${index}`}
                                onPress={() => {
                                    onSelect(item)
                                }}
                                style={styles.labelContainer}>
                                <Text
                                    style={styles.dropDownLabel}
                                >
                                    {item?.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </BottomModal>
        );
    };

    const renderButtonDropDown = () => {
        return props.renderButton
    }

    const renderTextInputDropDown = () => {
        return (
            <View style={styles.verticalSpacing}>
                <Text style={[styles.label]}>
                    {props.label}
                </Text>

                <TextInput
                    style={[styles.label, styles.inputText, {}]}
                    value={selectedVal}
                    editable={false}
                    {...props}
                />

                {props.error && (
                    <Text style={styles.errorStyle}>{props?.error}</Text>
                )}
            </View>
        )
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setModelPopup(true)} >
                {props.type == 'button' ? renderButtonDropDown() : renderTextInputDropDown()}
            </TouchableOpacity>
            {dropDownModal()}
        </View>
    )
}


export default CustomDropDown;

const styles = StyleSheet.create({
    verticalSpacing: {
        marginTop: 16,
    },
    label: {
        fontSize: 15,
    },
    dropDownLabel: {
        fontSize: 15,
        fontWeight:'600',
        color:Colors.black
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
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        paddingVertical: 13,
    }
})
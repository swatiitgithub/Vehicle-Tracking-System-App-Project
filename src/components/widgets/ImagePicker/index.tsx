import { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Colors from "../../../utils/Colors";
import Images from "../../../utils/Images";
import BottomModal from "../BottomModel/BottomModal";
import { Avatar, ScrollView } from "native-base";
import ImagePicker from 'react-native-image-crop-picker';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { showMessage } from "react-native-flash-message";
import React from "react";

const imageChoices = [
    {
        label: 'Gallery'
    },
    {
        label: 'Camera'
    }
];

const actionsMixed = {
    width: 300,
    height: 400,
    cropping: false,
    cropperCircleOverlay: false,
    forceJpg: true,
    showCropGuidelines: false,
    showCropFrame: false,
    multiple: false,
    includeBase64: true
};

const CustomImagePicker = (props: any) => {

    const [blogImage, setBlogImage] = useState(`data:image/png;base64,${props?.defaultImage}`);
    const [imageModel, setImageModel] = useState<any>(false);

    const updateBlobImage = async (image: any) => {

        const fileResponse = {
            uri: image?.path,
            type: image?.mime,
            name: image.path.split("/").pop(),
        };
        setBlogImage(fileResponse?.uri);
        props.onSelectedImage(image);

    }

    const profileImageValidation = () => {
        showMessage({
            message: 'Max. file size allowed is 5MB',
            type: 'danger',
        });
    }

    const addBlogImage = async (options: any, type: string) => {
        let result: any = {};
        if (type == "Camera") {
            ImagePicker.openCamera(options).then((image: any) => {
                if (image.size <= 5000000) {
                    updateBlobImage(image)
                }
                else {
                    profileImageValidation()
                }
            }).catch(error => {
                console.log(error);
            });;

        }
        if (type == "Gallery") {
            ImagePicker.openPicker(options).then((image: any) => {
                if (image.size <= 5000000) {
                    updateBlobImage(image)
                }
                else {
                    profileImageValidation()
                }
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const onSelectImageSource = (item: any) => {
        addBlogImage(actionsMixed, item.label);
        setImageModel(false);
    }

    const imageDropDownModal = () => {
        return (
            <BottomModal onDrop={() => setImageModel(false)} visible={imageModel}>
                <View style={{ padding: 8, maxHeight: 400 }}>

                    <ScrollView>
                        {imageChoices.map((item: any, index: any) => (
                            <TouchableOpacity
                            key={`key${index}`}
                                onPress={() => {
                                    onSelectImageSource(item)
                                }}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 1,
                                    paddingVertical: 8,
                                }}>
                                <Text
                                    style={[
                                        styles.radioText,
                                        {
                                            color: '#000000',
                                        }
                                    ]}>
                                    {item?.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </BottomModal>
        );
    };


    const NormalPicker = () => {
        return (
            <>
                <View>
                    <TouchableOpacity
                        style={styles.attachBtn}
                        onPress={() => { setImageModel(true) }}
                    >
                        <Text style={{ color: 'white' }}>{props.btnTitle?props.btnTitle:'Attach Image'}</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={styles.imgBox}
                >
                    {blogImage != '' ? (
                        <Image
                            source={{ uri: blogImage }}
                            style={styles.img}
                        />
                    ) : (
                        <Image
                            source={Images.BG_1}
                            resizeMode={'stretch'}
                            style={styles.img}
                        />
                    )}
                </View>
            </>
        )
    }

    const ProfileImagePicker = () => {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => { setImageModel(true) }}>
                    <Avatar
                        source={props?.defaultImage ? { uri: blogImage } : Images.PROFILE}
                        size={'2xl'}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 2,
                            left: 90
                        }}
                    >
                        <IconFontAwesome5 name={'edit'} size={22} color={"#000000"} />

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            {props.type === "profile" ? <ProfileImagePicker /> : <NormalPicker />}

            {imageDropDownModal()}

        </View>
    )
}


export default CustomImagePicker;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginVertical: 10,
        paddingTop: 10,
    },

    imgBox: {
        height: 100,
        width: 100,
        borderColor: '#6C6C6C',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: Colors.backgroundGrey,
        overflow: 'hidden',
        marginVertical: 20
    },

    img: {
        height: 100,
        width: 100,
        borderColor: '#6C6C6C',
    },
    radioText: {
        fontSize: 14,
        marginVertical: 5,
        paddingHorizontal: 0,
    },

    attachBtn: {
        width: 100,
        backgroundColor: Colors.primary,
        padding: 7,
        borderRadius: 6
    }
})
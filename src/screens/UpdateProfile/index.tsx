import { Text, TouchableOpacity, View, ActivityIndicator, Image, Keyboard } from "react-native";
import CustomInputText from "../../components/widgets/CustomInputText";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "./style";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "native-base";
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../redux/store";
import { sagaActions } from "../../redux/saga/sagaActions";
import CustomImagePicker from "../../components/widgets/ImagePicker";
import { showMessage } from 'react-native-flash-message';
import { getTodayDate } from "../../utils/common/Date";
import React from "react";
import { axiosRequest } from "../../utils/ApiRequest";
import Constant from "../../utils/Constant";
import CustomDatePicker from "../../components/widgets/CustomDatePicker";
import Url from "../../utils/Url";

const UpdateProfile = ({ item }: any) => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { userData, loading } = useSelector((state: RootState) => state.user);
    const [docsList, setDocsList] = useState<any>([]);
    const [profileImage, setProfileImage] = useState<any>("");
    useEffect(() => {
        getUserDetails();
        getUserDetails("1");
        // console.log({docsList:profileImage})
    }, [profileImage])

    const validation = yup.object().shape({

        firstName: yup
            .string()
            .nullable()
            .required("This field is required"),

        dob: yup
            .string()
            .nullable()
            .required("This field is required"),
    });

    const getUserDetails = async (type: any = "2") => {
        const params = {
            "candidateID": userData?.verifiedUser?.userID,
            "userID": userData?.verifiedUser?.userID,
            "formID": "-1",
            "type": type
        }
        axiosRequest(Url.GET_CANDIDATE_DOC, Constant.API_REQUEST_METHOD.POST, params).then(res => {
            const { data } = res
            // console.log(data.data[0])
            if (type == 2)
                setDocsList(data.data)
            else
                setProfileImage(data?.data[0].profileImage)
        }).catch(err => (console.log(err)))
    }
    const submit = (values: any) => {
        console.log(values)
        const instituteUserParams = {
            ...values,
            userID: "-1",
            formID: '10',
            type: "2",
            otp: "",
            emailID: "email",
            mobileNo: "9999999999",
            userPassword: "password",
            genderID: "1",
        }
        axiosRequest("/Institute/AddInstituteUser", Constant.API_REQUEST_METHOD.POST, instituteUserParams).then(res => {
            if (!res?.data?.isSuccess) {
                showMessage({
                    message: res.data.msg,
                    type: 'danger',
                });
            } else {
                showMessage({
                    message: res.data.msg,
                    type: 'success',
                });
            }
        }).catch((error) => { console.log(error) })

    }
    const addCandidateImage = async (imgString: any = "") => {
        const params = {
            "candidateID": userData?.verifiedUser?.userID,
            "profileImage": imgString,
            "userID": userData?.verifiedUser?.userID,
            "formID": "-1",
            "type": "1"
        }
        try {
            axiosRequest(Url.UPDATE_USER_PROFILE_IMAGE, Constant.API_REQUEST_METHOD.POST, params).then(res => {
                console.log(res.data);
                const { msg } = res?.data
                if (res.data.isSuccess === "False") {
                    showMessage({
                        message: msg,
                        type: 'danger',
                    });
                }
                else
                    showMessage({
                        message: msg,
                        type: 'success',
                    });
            }).catch(err => {
                console.log(err)
            });
        } catch (error) {
            console.log({ error });
        }
    };
    const uploadDocs = async (imgString: any = "", item: any) => {
        console.log({ item: item })
        const params = {
            "candidateID": userData?.verifiedUser?.userID,
            "userID": userData?.verifiedUser?.userID,
            "formID": "-1",
            "type": "1",
            docExt: "img",
            docImage: `data:image/png;base64,${imgString}`,
            docName: "",
            docTypeID: item?.docTypeID
        }
        try {
            axiosRequest(Url.ADD_CANDIDATE_DOC, Constant.API_REQUEST_METHOD.POST, params).then(res => {
                console.log(res.data);
                const { msg } = res?.data
                if (res.data.isSuccess === "False") {
                    showMessage({
                        message: msg,
                        type: 'danger',
                    });
                }
                else
                    showMessage({
                        message: msg,
                        type: 'success',
                    });
            }).catch(err => {
                console.log(err)
            });
        } catch (error) {
            console.log({ error });
        }
    };


    return (
        <>
            <Formik
                validationSchema={validation}
                initialValues={{
                    firstName: userData?.verifiedUser.firstName,
                    middleName: userData?.verifiedUser.middleName,
                    surName: userData?.verifiedUser.surName,
                    dob: userData?.verifiedUser.dob,
                }}
                enableReinitialize={true}
                onSubmit={async values => {
                    submit(values)
                }}>
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                }) => (

                    <View style={styles.container}>
                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.headerContainer} >
                                <Text style={styles.loginText} >{'Update Profile'}</Text>
                            </View>

                            <View style={styles.formContainer}>
                                {profileImage && <CustomImagePicker
                                    type={'profile'}
                                    defaultImage={profileImage}
                                    onSelectedImage={(image: any) => {
                                        addCandidateImage(`data:image/png;base64,${image.data}`)
                                        //handleChange('profileImage')(image.data)
                                    }}
                                />}
                                {!profileImage && <CustomImagePicker
                                    type={'profile'}
                                    onSelectedImage={(image: any) => {
                                        addCandidateImage(`data:image/png;base64,${image.data}`)
                                        //handleChange('profileImage')(image.data)
                                    }}
                                />}

                                <CustomInputText
                                    label="First Name"
                                    editable={userData?.verifiedUser.userTypeID == 1 ? false : true}
                                    placeholder={'Please Enter Your Name'}
                                    value={values.firstName}
                                    error={errors['firstName']}
                                    onChangeText={(value: any) => { handleChange('firstName')(value) }}
                                />

                                <CustomInputText
                                    editable={userData?.verifiedUser.userTypeID == 1 ? false : true}
                                    label="Middle Name"
                                    placeholder={'Please Enter Your Middle Name'}
                                    value={values.middleName}
                                    error={errors['middleName']}
                                    onChangeText={(value: any) => { handleChange('middleName')(value) }}
                                />

                                <CustomInputText
                                    editable={userData?.verifiedUser.userTypeID == 1 ? false : true}
                                    label="Last Name"
                                    placeholder={'Please Enter Your Last Name'}
                                    value={values.surName}
                                    error={errors['surName']}
                                    maxLength={12}
                                    onChangeText={(value: any) => { handleChange('surName')(value) }}
                                />

                                <CustomDatePicker
                                    label="DOB"
                                    placeholder={'Please Select DOB'}
                                    value={moment(values.dob).format("DD-MMM-YYYY")}
                                    error={errors['dob']}
                                    onConfirm={(value: any) => {
                                        handleChange('dob')(value.toISOString());
                                    }}
                                />
                                


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {docsList.map((item: any, index: number) => {
                                        return (
                                            <>
                                                <CustomImagePicker
                                                    key={`key_${index}`}
                                                    defaultImage={item?.docImage}
                                                    // type={'profile'}
                                                    btnTitle={'Add Pan'}
                                                    onSelectedImage={(image: any) => {
                                                        uploadDocs(image.data, item)
                                                    }}
                                                />
                                                {/* <CustomImagePicker
                                                    // type={'profile'}
                                                    btnTitle={'Add Aadhaar'}
                                                    onSelectedImage={(image: any) => {
                                                        handleChange('profileImageBase64')(image.data)
                                                    }}
                                                /> */}
                                            </>
                                        )
                                    })}
                                </View>
                                <Button
                                    disabled={userData?.verifiedUser.userTypeID == 1}
                                    style={userData?.verifiedUser.userTypeID == 1 ? styles.loginBtn1 : styles.loginBtn}
                                    size='lg'
                                    isLoading={loading}
                                    onPress={() => { handleSubmit() }}
                                >Update Profile</Button>
                                {/* <TouchableOpacity
                                    style={styles.buttonStyle}
                                    activeOpacity={0.5}
                                    onPress={uploadDocs}
                                >
                                    <Text style={styles.buttonTextStyle}>Upload File</Text>
                                </TouchableOpacity> */}
                            </View>
                        </KeyboardAwareScrollView>
                    </View>)}
            </Formik>

        </>
    )
}

export default UpdateProfile;
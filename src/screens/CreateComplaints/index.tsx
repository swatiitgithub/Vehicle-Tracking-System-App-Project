import { Text, TouchableOpacity, View, AsyncStorage, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ActionBar from "../../components/ActionBar";
import CustomDatePicker from "../../components/widgets/CustomDatePicker";
import CustomDropDown from "../../components/widgets/CustomDropDown";
import CustomInputText from "../../components/widgets/CustomInputText";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "./style";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import CustomImagePicker from "../../components/widgets/ImagePicker";
import { AnyIfEmpty } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../redux/store";
import { sagaActions } from "../../redux/saga/sagaActions";
import { notLoginAlert } from "../../utils/Helper";
import { Button } from "native-base";
import { axiosRequest } from "../../utils/ApiRequest";
import Constant from "../../utils/Constant";
import Url from "../../utils/Url";
import { showMessage } from "react-native-flash-message";
import { getTodayDate } from "../../utils/common/Date";
import { hp } from "../../utils/Responsive";
import React from "react";

const CreateComplaints = ({ item }: any) => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { response, userData } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState<boolean>(false);

    const complaintData: any = [
        {
            name: 'Solid Waste Complaint',
        },
        {
            name: 'Street Light Complaint'
        },
        {
            name: 'Water Supply Complaint'
        },
        {
            name: 'Road Repair Complaint'
        },
        {
            name: 'Spray Animal Complaint'
        },
        {
            name: 'Illegal Holding Complaint'
        },
        {
            name: 'Food Adulteration Complaint'
        }
    ]
    
    const complaintTypeData: any = [
        {
            name: 'Not working'
        },
        {
            name: 'Break'
        },
        {
            name: 'No Supply'
        },
        {
            name: 'To much Animals'
        },
        {
            name: 'Illegal work'
        },
        {
            name: 'Food quality worst'
        },
        {
            name: 'Dump of garbage'
        }
    ]

    let ComplaintsList: any = [];

    useEffect(() => {
        if (!userData) {
            notLoginAlert(navigation);
        }
    }, [])
    const validation = yup.object().shape({

        personName: yup
            .string()
            .nullable()
            .required("This field is required"),

        mobileNo: yup
            .string()
            .nullable()
            .required("This field is required"),

        houseNo: yup
            .string()
            .nullable()
            .required("This field is required"),

        locality: yup
            .string()
            .nullable()
            .required("This field is required"),

        sectorArea: yup
            .string()
            .nullable()
            .required("This field is required"),

        landMark: yup
            .string()
            .nullable()
            .required("This field is required"),

        caseDesc: yup
            .string()
            .nullable()
            .required("This field is required"),
    });

    const setComplaints = async (value: any) => {
        let tempcomplaint: any = [];
        ComplaintsList = [];
        tempcomplaint = JSON.parse(await AsyncStorage.getItem('complaintData'));
        if (tempcomplaint) {
            tempcomplaint.map((item: any) => {
                ComplaintsList.push(item);
            });
        }
        ComplaintsList.push(value);
        await AsyncStorage.setItem('complaintData', JSON.stringify(ComplaintsList));
        console.log(ComplaintsList);
        navigation.goBack();
    }

    const submitComplaints = (values: any) => {
        const defaults = {
            dob: getTodayDate(),
            complaintDate: getTodayDate(),
            genderID: 0,
            districtID: 0,
            appComplaintID: 0,
            categoryID: 0,
            subCategoryID: 0,
            formID: 0,
            type: 0,
            userID: userData?.userID,
            compDocBase64: "",
            ...values
        }

        setLoading(true);
        axiosRequest(Url.ADD_COMPLAINT, Constant.API_REQUEST_METHOD.POST, defaults).then(res => {
            const { data } = res;
            console.log(data);
            setLoading(false);
            if (data.isSuccess === "True") {

                showMessage({
                    message: data.msg,
                    type: 'success',
                });

                setTimeout(() => { navigation.goBack() }, 2000);

            } else {
                showMessage({
                    message: data.msg,
                    type: 'danger',
                });
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }


    return (
        <>
            <ActionBar
                title={'Create Complaints'}
            />

            <Formik
                validationSchema={validation}
                initialValues={{

                    personName: '',//userData.firstName,
                    mobileNo: '',//userData.mobileNo,
                    alternateMobileNo: "",
                    emailID: "",
                    houseNo: "",
                    locality: "",
                    sectorArea: "",
                    landMark: "",
                    caseDesc: "",
                    compImageBase64: "",
                    departmentName:"",
                    complaintType:"",

                }}
                enableReinitialize={true}
                onSubmit={async values => {
                    console.log("{ userData }-----");
                    console.log({ values });
                    setComplaints(values);
                    navigation.o
                    if (!userData) {
                        notLoginAlert(navigation);
                    } else {
                        submitComplaints(values);
                    }

                }}>
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                }) => (

                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 9, paddingHorizontal: hp('2') }}>
                            <KeyboardAwareScrollView
                                contentContainerStyle={{ paddingBottom: hp('10') }}
                                showsVerticalScrollIndicator={false}
                            >

                                <CustomDropDown
                                    label="Department name*"
                                    placeholder={'select Department'}
                                    data={complaintData}
                                    onSelectItem={(): any => {}}
                                    onChangeText={(value: any) => { handleChange('departmentName')(value) }}
                                    //value={values.departmentName}
                                />
                                <CustomDropDown
                                    label="Complaint type*"
                                    placeholder={'select Complaint type'}
                                    data={complaintTypeData}
                                    onSelectItem={(): any => { complaintTypeData }}
                                    onChangeText={(value: any) => { handleChange('complaintType')(value) }}
                                    //value={values.complaintType}
                                />
                                <CustomInputText
                                    label="Person Name *"
                                    placeholder={'Please Your  Name'}
                                    value={values.personName}
                                    error={errors['personName']}
                                    onChangeText={(value: any) => { handleChange('personName')(value) }}
                                />

                                <CustomInputText
                                    label="Phone Number *"
                                    placeholder={'Please Your Phone Number'}
                                    value={values.mobileNo}
                                    error={errors['mobileNo']}
                                    keyboardType={'number-pad'}
                                    onChangeText={(value: any) => { handleChange('mobileNo')(value) }}
                                />

                                <CustomInputText
                                    label="Alternate Phone Number"
                                    placeholder={'Please Your Alternate Phone Number'}
                                    value={values.alternateMobileNo}
                                    error={errors['alternateMobileNo']}
                                    keyboardType={'number-pad'}
                                    onChangeText={(value: any) => { handleChange('alternateMobileNo')(value) }}
                                />

                                <CustomInputText
                                    label="House Number *"
                                    placeholder={'Please Enter'}
                                    value={values.houseNo}
                                    error={errors['houseNo']}
                                    onChangeText={(value: any) => { handleChange('houseNo')(value) }}
                                />

                                <CustomInputText
                                    label="Locality *"
                                    placeholder={'Please Enter'}
                                    value={values.locality}
                                    error={errors['locality']}
                                    onChangeText={(value: any) => { handleChange('locality')(value) }}
                                />

                                <CustomInputText
                                    label="Sector/Area *"
                                    placeholder={'Please Enter'}
                                    value={values.sectorArea}
                                    error={errors['sectorArea']}
                                    onChangeText={(value: any) => { handleChange('sectorArea')(value) }}
                                />
                                <CustomInputText
                                    label="LandMark *"
                                    placeholder={'Please Enter'}
                                    value={values.landMark}
                                    error={errors['landMark']}
                                    onChangeText={(value: any) => { handleChange('landMark')(value) }}
                                />


                                <CustomInputText
                                    label="Description *"
                                    value={values.caseDesc}
                                    error={errors['caseDesc']}
                                    multiline={true}
                                    numberOfLines={4}
                                    type={'textarea'}
                                    onChangeText={(value: any) => { handleChange('caseDesc')(value) }}
                                />

                                <CustomImagePicker
                                    onSelectedImage={(image: any) => {
                                        handleChange('compImageBase64')(image.data)
                                    }}
                                />

                            </KeyboardAwareScrollView>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.row, styles.createGrpAction]}>
                                <TouchableOpacity
                                    style={[styles.flex1, styles.hCenter, { height: 50 }]}
                                    onPress={() => { }}
                                >
                                    <Text style={[styles.fs16]}>{'Cancel'}</Text>
                                </TouchableOpacity>

                                <Button
                                    variant="ghost"
                                    isLoading={loading}
                                    onPress={() => { handleSubmit() }}
                                >
                                    {'Submit'}
                                </Button>
                            </View>
                        </View>
                    </View>)}
            </Formik>

        </>
    )
}

export default CreateComplaints;
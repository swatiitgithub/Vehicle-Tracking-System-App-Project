

import { useEffect, useRef, useState } from 'react';
import CustomInputText from '../../../components/widgets/CustomInputText';
import { Button, Image, ScrollView, Select, Text, View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../../../utils/Images';
import { hp, wp } from '../../../utils/Responsive';
import { default as style } from '../styles/style';
import useThemedStyles from '../../../config/theme/hooks/useThemedStyles';
import { axiosRequest } from '../../../utils/ApiRequest';
import Constant from '../../../utils/Constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { showMessage } from 'react-native-flash-message';
import CustomDatePicker from '../../../components/widgets/CustomDatePicker';
import CustomDropDown from '../../../components/widgets/CustomDropDown';
import Url from '../../../utils/Url';
import * as yup from 'yup';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';




const AddInstituteUser = (props: any) => {
    const styles = useThemedStyles(style);
    const isActivate = props.route.params
    const [loading, setLoading] = useState(false)
    const [gender, setGender] = useState<any>([])
    const [marital, setMarital] = useState<any>([])
    const [branch, setBranch] = useState<any>([{ value: 1, label: "Branch 1" }])
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    const [emailID, setEmailID] = useState<string>("");
    const [mobileNo, setMobileNo] = useState<string>("");
    const { userData } = useSelector(
        (state: RootState) => state.user,
    );
    const [isOtpVisible, setOTPVisible] = useState(false);
    
    useEffect(() => {
        console.log(props.route.params);
        getGender();
    }, [])



    const getGender = async () => {
        axiosRequest(Url.GET_GENDER, Constant.API_REQUEST_METHOD.GET).then(res => {
            const { data } = res.data
            const dataMaskForDropdown = data?.map((item: any) => {
                return { value: item.genderID, name: item.genderName }
            })
            // console.log({ dataMaskForDropdown })
            setGender(dataMaskForDropdown)
        }).catch(() => {
            setLoading(false);
        });
    }
    const addInstituteUser = async (values: any) => {
        console.log(JSON.stringify(values, null, 1))
        try {
            setLoading(true)
            axiosRequest(Url.ADD_INSTITUTE_USER, Constant.API_REQUEST_METHOD.POST, values).then(res => {
                const { msg } = res?.data
                console.log(res?.data);
                if (res.data.isSuccess == "False") {
                    showMessage({
                        message: msg,
                        type: 'danger',
                    });
                    setLoading(false)

                }
                if (res.data.isSuccess == "True") {
                    showMessage({
                        message: msg,
                        type: 'success',
                    });
                    setEmailID(values.emailID);
                    setMobileNo(values.mobileNo);
                    setOTPVisible(true);
                    setLoading(false)
                    if(res.data.msg=="USER ACTIVATED SUCCESSFULLY")
                    props.navigation.goBack();
                }
            }).catch(() => {
                setLoading(false);
            });
        } catch (error) {
            setLoading(false)
            console.log({ error });
        }
    };

    const validation = yup.object().shape({
        firstName: yup.string().nullable().required('This field is required'),
        lastName: yup.string().nullable().required('This field is required'),
        mobileNo: yup.string().matches(/(\d){10}\b/, 'Enter a valid phone number')
            .required('Mobile No is required'),
        emailID: yup.string().email("Please enter valid email")
            .required('This field is required'),
        genderID: yup.string().nullable().required('Please select gender'),
        dob: yup.string().nullable().required('Please select DOB'),
        userPassword: yup.string().nullable().required('This field is required'),
    });
    const activateCandidateValidation = yup.object().shape({
        mobileNo: yup.string().matches(/(\d){10}\b/, 'Enter a valid phone number')
            .required('Mobile No is required'),
        emailID: yup.string().email("Please enter valid email")
            .required('This field is required'),
    });

    const ActivateInstituteUser = () => {
        return (
            <View>
                <Formik
                    validationSchema={activateCandidateValidation}
                    initialValues={
                        {
                            firstName: "",
                            middleName: "",
                            lastName: "",
                            genderID: "-1",
                            userPassword: "",
                            mobileNo: mobileNo,
                            emailID: emailID,
                            dob: new Date(),
                            userID: "-1",
                            formID: '10',
                            type: 4,
                            otp: ""
                        }
                    }
                    // enableReinitialize={true}
                    onSubmit={async values => {
                        addInstituteUser(values);
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View style={{ justifyContent: 'center', paddingHorizontal: 40, height: "100%" }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, paddingBottom: 20 }}>
                                {'Activate Institute-User'}</Text>
                            <CustomInputText
                                labelStyle={{ flex: 0 }}
                                inputStyle={{ flex: 0 }}
                                keyboardType={"number-pad"}
                                label="Mobile No"
                                maxLength={10}
                                inputMode={'numeric'}
                                placeholder={'Please Enter Mobile No'}
                                error={errors['mobileNo']}
                                onChangeText={(value: any) => {
                                    handleChange('mobileNo')(value);
                                }}
                            />
                            <CustomInputText
                                inputStyle={{ flex: 0 }}
                                labelStyle={{ flex: 0 }}
                                label="Email"
                                placeholder={'Please Enter Email'}
                                error={errors['emailID']}
                                onChangeText={(value: any) => {
                                    handleChange('emailID')(value);
                                }}
                            />
                            <Button
                                style={styles.loginBtn}
                                size="lg"
                                isLoading={loading}
                                onPress={() => {
                                    handleSubmit();
                                }}>
                                Submit
                            </Button>
                            <Button
                                style={styles.loginBtn}
                                size="lg"
                                isLoading={loading}
                                onPress={() =>props.navigation.goBack()}
                                >
                                Cancel
                            </Button>
                        </View>
                    )}
                </Formik></View>
        )
    }
    const addOtpForm = () => {
        return (
            <Formik
            
                initialValues={
                    {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        genderID: "-1",
                        userPassword: "",
                        mobileNo: mobileNo,
                        emailID: emailID,
                        dob: new Date(),
                        userID: "-1",
                        formID: '10',
                        type: 4,
                        otp: ""
                    }
                }
                // enableReinitialize={true}
                onSubmit={async values => {
                    addInstituteUser(values);
                }}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <View style={{ justifyContent: 'center', paddingHorizontal: 20, height: "100%" }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, paddingBottom: 20 }}>
                            {'OTP Verification'}</Text>
                        <CustomInputText
                            labelStyle={{ flex: 0 }}
                            inputStyle={{ flex: 0 }}
                            label="OTP"
                            placeholder={'Please Enter Otp'}
                            // value={values.otp}
                            error={errors['otp']}
                            onChangeText={(value: any) => {
                                handleChange('otp')(value);
                            }}
                        />
                        <Button
                            style={styles.loginBtn}
                            size="lg"
                            isLoading={loading}
                            onPress={() => {
                                handleChange('type')("5")
                                handleSubmit();
                            }}>
                            Submit
                        </Button>
                        <Text style={{ alignSelf: 'center', paddingTop: 20 }}>Didn't get it?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                handleChange('type')("4")
                                handleSubmit();
                            }}>
                            <Text style={{ textDecorationLine: 'underline', color: '#69b1ff', alignSelf: 'center', paddingTop: 20 }}>Resend otp</Text>
                        </TouchableOpacity>
                        {/* {isOtpVisible&&ActivateInstituteUser()} */}
                    </View>
                )}
            </Formik>
        )
    }
    const addInstituteUserForm = () => {
        return (
            <>

                {!isActivate && <Formik
                    validationSchema={validation}
                    initialValues={
                        {
                            firstName: "",
                            middleName: "",
                            lastName: "",
                            genderID: "",
                            userPassword: "",
                            mobileNo: "",
                            emailID: "",
                            dob: new Date(),
                            userID: "-1",
                            formID: '10',
                            type: 1,
                            otp: ""
                        }
                    }
                    // enableReinitialize={true}
                    onSubmit={async values => {
                        console.log(values)
                        addInstituteUser(values);
                    }}
                >

                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>

                            <KeyboardAwareScrollView
                                contentContainerStyle={{}}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.loginText}>{'InstituteUser Registration'}</Text>
                                </View>
                                <View style={{ height: hp("2"), alignItems: 'center', margin: hp("5"), }}>
                                    <Image alt='unable to load' source={Images.PROFILE} style={{ width: wp("30"), height: hp("15"), borderRadius: 100 }}></Image>
                                </View>


                                <View style={styles.formContainer}>
                                    <CustomInputText
                                        label="First name"
                                        placeholder={'Please Enter First Name'}
                                        value={values.firstName}
                                        error={errors['firstName']}
                                        onChangeText={(value: any) => {
                                            handleChange('firstName')(value);
                                        }}
                                    />

                                    <CustomInputText
                                        label="Middle name"
                                        placeholder={'Please Enter Middle Name'}
                                        value={values.middleName}
                                        error={errors['middleName']}
                                        onChangeText={(value: any) => {
                                            handleChange('middleName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Last name"
                                        placeholder={'Please Enter LastName'}
                                        value={values.lastName}
                                        error={errors['lastName']}
                                        onChangeText={(value: any) => {
                                            handleChange('lastName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        secureTextEntry={true}
                                        label="Password"
                                        placeholder={'Please Enter Password'}
                                        value={values.userPassword}
                                        error={errors['userPassword']}
                                        onChangeText={(value: any) => {
                                            handleChange('userPassword')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Mobile No"
                                        keyboardType="phone-pad"
                                        placeholder={'Please Enter Mobile No'}
                                        value={values.mobileNo}
                                        maxLength={10}
                                        error={errors['mobileNo']}
                                        onChangeText={(value: any) => {
                                            handleChange('mobileNo')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Email"
                                        placeholder={'Please Enter Email'}
                                        value={values.emailID}
                                        error={errors['emailID']}
                                        onChangeText={(value: any) => {
                                            handleChange('emailID')(value);
                                        }}
                                    />
                                    <CustomDatePicker
                                        label="Date of Birth"
                                        placeholder={'Please Select DOB'}
                                        value={moment(values.dob).format('DD-MMM-YYYY')}
                                        error={errors['dob']}
                                        onConfirm={(value: any) => {
                                            handleChange('dob')(value.toISOString());
                                            console.log(value)
                                        }}
                                    />
                                    <CustomDropDown
                                        label="Gender"
                                        placeholder={'Please Select Gender'}
                                        data={gender}
                                        error={errors['genderID']}
                                        onSelectItem={(value: any) => {
                                            handleChange('genderID')(value.value);
                                        }}
                                    />
                                    <Button
                                        style={styles.loginBtn}
                                        size="lg"
                                        isLoading={loading}
                                        onPress={() => {
                                            handleSubmit();
                                        }}>
                                        Submit
                                    </Button>
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    )}
                </Formik>}
                {!isActivate && <View style={{ height: hp('18.5') }}></View>}
            </>
        )
    }


    return (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            {!isOtpVisible ? addInstituteUserForm() : addOtpForm()}
            {(isActivate === true) ? <ActivateInstituteUser /> : null}
        </ScrollView>
    );
};

export default AddInstituteUser;
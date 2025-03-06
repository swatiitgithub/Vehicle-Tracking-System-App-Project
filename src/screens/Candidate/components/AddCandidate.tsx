import { useEffect, useRef, useState } from 'react';
import CustomInputText from '../../../components/widgets/CustomInputText';
import { Button, Image, ScrollView, Select, Text, View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../../../utils/Images';
import { hp, wp } from '../../../utils/Responsive';
const moment = require('moment');
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
import { TouchableOpacity } from 'react-native';
import Colors from '../../../utils/Colors';
import * as yup from 'yup';



const dateFormat = 'YYYY/MM/DD';

const AddCandidate = (props: any) => {
    const styles = useThemedStyles(style);
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState()
    const [selectedState, setSelectedState] = useState<any>()
    const [district, setDistrict] = useState<any>([])
    const [city, setCity] = useState<any>([])
    const [area, setArea] = useState<any>([])
    const [gender, setGender] = useState<any>([])
    const [marital, setMarital] = useState<any>([])
    const [branch, setBranch] = useState<any>([{ value: "1", name: "BRANCH1" }])
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    const [isOtpVisible, setOTPVisible] = useState(false);
    const [mobileNo, setMobileNo] = useState<string>("");
    const [emailID, setEmailID] = useState<string>("");
    const isActivate = props.route.params
    const { response, userData } = useSelector(
        (state: RootState) => state.user,
    );

    const validation = yup.object().shape({
        firstName: yup.string().nullable().required('This field is required'),
        lastName: yup.string().nullable().required('This field is required'),
        mobileNo: yup.string().matches(/(\d){10}\b/, 'Enter a valid phone number')
            .required('Mobile No is required'),
        emailID: yup.string().email("Please enter valid email")
            .required('This field is required'),
        genderID: yup.string().nullable().required('Please select gender'),
        dob: yup.string().nullable().required('Please select DOB'),
        candPassword: yup.string().nullable().required('This field is required'),
        panNo: yup.string().matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/,'Enter a valid pan number')
            .required('Mobile No is required'),
        aadhaarNo: yup.string().matches(/(\d){12}\b/, 'Enter a valid Aadhaar number')
            .required('Aadhaar No is required'),
        instName: yup.string().nullable().required('Institute name is required'),
        candidateAddress: yup.string().nullable().required('Candidate address is required'),
        instUiqueID: yup.string().nullable().required('Institute Id is required'),
        instAddress: yup.string().nullable().required('Institute Address is required'),
        maritalStatusID: yup.string().nullable().required('Please select marital status'),
        branchID: yup.string().nullable().required('Please select Branch'),
        stateID: yup.string().nullable().required('Please select state'),
        districtID: yup.string().nullable().required('Please select district'),
        areaID: yup.string().nullable().required('Please select area')
    });
    const activateCandidateValidation = yup.object().shape({
        mobileNo: yup.string().matches(/(\d){10}\b/, 'Enter a valid phone number')
            .required('Mobile No is required'),
        emailID: yup.string().email("Please enter valid email")
            .required('This field is required'),
    });


    useEffect(() => {
        getState();
        getCity();
        getMarital();
        getBranch();
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
        }).catch(err => {
            setLoading(false);
        });
    }

    const getMarital = async () => {
        axiosRequest(Url.GET_MARITAL, Constant.API_REQUEST_METHOD.GET).then(res => {
            const { data } = res.data
            const dataMaskForDropdown = data?.map((item: any) => {
                return { value: item.maritalStatusID, name: item.maritalStatusName }
            })
            // console.log({ dataMaskForDropdown })
            setMarital(dataMaskForDropdown)
        }).catch(err => {
            setLoading(false);
        });
    }


    const getBranch = async () => {
        axiosRequest(Url.GET_BRANCH, Constant.API_REQUEST_METHOD.POST).then(res => {
            const dataMaskForDropdown = res?.data?.map((item: any) => {
                return { value: item.branchID, name: item.branchName }
            })
            console.log({ dataMaskForDropdown })
            console.log(dataMaskForDropdown.length)
            // if(dataMaskForDropdown.length>0)
            // setBranch(dataMaskForDropdown)
        }).catch(err => {
            setLoading(false);
        });
    }


    const getState = async () => {
        axiosRequest(Url.GET_STATE, Constant.API_REQUEST_METHOD.POST).then(res => {
            const dataMaskForDropdown = res?.data?.map((item: any) => {
                return { value: item.stateID, name: item.stateName }
            })
            // console.log({ dataMaskForDropdown })
            setState(dataMaskForDropdown)
        }).catch(err => {
            setLoading(false);
        });
    }

    const getDistrict = async (item: any) => {
        axiosRequest(`${Url.GET_DISTRICT}DistrictID=-1&StateID=${item.value}`,
            Constant.API_REQUEST_METHOD.POST).then(res => {
                const dataMaskForDropdown = res?.data?.map((item: any) => {
                    return { value: item.districtID, name: item.districtName }
                })
                // console.log({ dataMaskForDropdown })
                setDistrict(dataMaskForDropdown)
            }).catch(err => {
                setLoading(false);
            });
    }

    const getCity = async () => {
        axiosRequest(Url.GET_CITY, Constant.API_REQUEST_METHOD.POST).then(res => {
            const dataMaskForDropdown = res?.data?.map((item: any) => {
                return { value: item.cityID, name: item.cityName }
            })
            // console.log({ dataMaskForDropdown })
            setCity(dataMaskForDropdown)
        }).catch(err => {
            setLoading(false);
        });
    }

    const getArea = async (value: any) => {
        axiosRequest(`${Url.GET_AREA}&DistrictID=${value.value}&StateID=${selectedState?.value}`,
            Constant.API_REQUEST_METHOD.POST).then(res => {
                const dataMaskForDropdown = res?.data?.map((item: any) => {
                    return { value: item.areaID, name: item.areaName }
                })
                // console.log({ dataMaskForDropdown })
                setArea(dataMaskForDropdown)
            }).catch(err => {
                setLoading(false);
            });
    }

    const addCandidate = async (values: any) => {
        try {
            setLoading(true)
            axiosRequest("/Candidate/AddCandidate", Constant.API_REQUEST_METHOD.POST, values).then(res => {
                console.log(res.data);
                console.log(mobileNo);
                const { msg } = res?.data
                if (res.data.isSuccess === "False") {
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
            }).catch(err => {
                setLoading(false);
            });
        } catch (error) {
            setLoading(false)
            console.log({ error });
        }
    };
    const ActivateInstituteUser = () => {
        return (
            <>
                <Formik
                    validationSchema={activateCandidateValidation}
                    initialValues={
                        {
                            candidateID: "-1",
                            firstName: "",
                            middleName: "",
                            lastName: "",
                            emailID: emailID,
                            mobileNo: mobileNo,
                            candPassword: "",
                            dob: new Date(),
                            panNo: "",
                            aadhaarNo: "",
                            maritalStatusID: "0",
                            genderID: "0",
                            candidateAddress: "",
                            instUiqueID: "",
                            branchID: "0",
                            otherBranchName: "",
                            instName: "",
                            instAddress: "",
                            stateID: "0",
                            districtID: "0",
                            cityID: "0",
                            areaID: "0",
                            landmark: "",
                            sessionName: "",
                            profileImage: "",
                            userID: "-1",
                            formID: 2,
                            type: 1,
                            otp: ""
                        }
                    }
                    // enableReinitialize={true}
                    onSubmit={async values => {
                        addCandidate(values);
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View style={{ justifyContent: 'center', paddingHorizontal: 40, height: "100%" }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, paddingBottom: 20 }}>
                                {'Activate Candidate'}</Text>
                            <CustomInputText
                                labelStyle={{ flex: 0 }}
                                inputStyle={{ flex: 0 }}
                                label="Mobile No"
                                maxLength={10}
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
                </Formik></>
        )
    }
    const addOtpForm = () => {
        return (
            <Formik
                initialValues={
                    {
                        candidateID: "-1",
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        emailID: emailID,
                        mobileNo: mobileNo,
                        candPassword: "",
                        dob: new Date(),
                        panNo: "",
                        aadhaarNo: "",
                        maritalStatusID: "0",
                        genderID: "0",
                        candidateAddress: "",
                        instUiqueID: "",
                        branchID: "0",
                        otherBranchName: "",
                        instName: "",
                        instAddress: "",
                        stateID: "0",
                        districtID: "0",
                        cityID: "0",
                        areaID: "0",
                        landmark: "",
                        sessionName: "",
                        profileImage: "",
                        userID: "-1",
                        formID: 2,
                        type: 1,
                        otp: ""
                    }
                }
                // enableReinitialize={true}
                onSubmit={async values => {
                    addCandidate(values);
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
    const addCandidateForm = () => {
        return (
            <>

                {!isActivate && <Formik
                    validationSchema={validation}
                    initialValues={
                        {
                            candidateID: "-1",
                            firstName: "",
                            middleName: "",
                            lastName: "",
                            emailID: "",
                            mobileNo: "",
                            candPassword: "",
                            dob: new Date(),
                            panNo: "",
                            aadhaarNo: "",
                            maritalStatusID: "",
                            genderID: "",
                            candidateAddress: "",
                            instUiqueID: "",
                            branchID: "0",
                            otherBranchName: "",
                            instName: "",
                            instAddress: "",
                            stateID: "",
                            districtID: "",
                            cityID: "0",
                            areaID: "",
                            landmark: "",
                            sessionName: "",
                            profileImage: "",
                            userID: "-1",
                            formID: 2,
                            type: 1,
                            otp: ""
                        }
                    }
                    // enableReinitialize={true}
                    onSubmit={async values => {
                        console.log(JSON.stringify(values, null, 1))
                        addCandidate(values);
                    }}
                >

                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View >

                            <KeyboardAwareScrollView
                                contentContainerStyle={{}}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.loginText}>{'Candidate Registration'}</Text>
                                </View>
                                <View style={{ height: hp("2"), alignItems: 'center', margin: hp("5"), }}>
                                    <Image alt='unable to load' source={Images.PROFILE} style={{ width: wp("30"), height: hp("15"), borderRadius: 100 }}></Image>
                                </View>


                                <View style={styles.formContainer}>
                                    <CustomInputText
                                        label="First Name"
                                        placeholder={'Please Enter First Name'}
                                        value={values.firstName}
                                        error={errors['firstName']}
                                        onChangeText={(value: any) => {
                                            handleChange('firstName')(value);
                                        }}
                                    />

                                    <CustomInputText
                                        label="Middle Name"
                                        placeholder={'Please Enter Middle Name'}
                                        value={values.middleName}
                                        error={errors['middleName']}
                                        onChangeText={(value: any) => {
                                            handleChange('middleName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Last Name"
                                        placeholder={'Please Enter Last Name'}
                                        value={values.lastName}
                                        error={errors['lastName']}
                                        onChangeText={(value: any) => {
                                            handleChange('lastName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Password"
                                        placeholder={'Please Enter Password'}
                                        value={values.candPassword}
                                        secureTextEntry={true}
                                        error={errors['candPassword']}
                                        onChangeText={(value: any) => {
                                            handleChange('candPassword')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        keyboardType="phone-pad"
                                        label="Mobile No"
                                        maxLength={10}
                                        placeholder={'Please Enter Mobile No'}
                                        value={values.mobileNo}
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
                                        label="DOB"
                                        placeholder={'Please Select DOB'}
                                        value={moment(values.dob).format('DD-MMM-YYYY')}
                                        error={errors['dob']}
                                        onConfirm={(value: any) => {
                                            handleChange('dob')(value.toISOString());
                                            console.log(value)
                                        }}
                                    />
                                    <CustomInputText
                                        label="Pan No"
                                        autoCapitalize="characters"
                                        placeholder={'Please Enter Pan No'}
                                        value={values.panNo}
                                        error={errors['panNo']}
                                        onChangeText={(value: any) => {
                                            handleChange('panNo')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Aadhaar No"
                                        keyboardType="phone-pad"
                                        maxLength={12}
                                        placeholder={'Please Enter Aadhaar No'}
                                        value={values.aadhaarNo}
                                        error={errors['aadhaarNo']}
                                        onChangeText={(value: any) => {
                                            handleChange('aadhaarNo')(value);
                                        }}
                                    />
                                    <CustomDropDown
                                        label="Marital Status"
                                        placeholder={'Please Select Marital Status'}
                                        data={marital}
                                        error={errors['maritalStatusID']}
                                        onSelectItem={(value: any) => {
                                            handleChange('maritalStatusID')(value.value);
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
                                    <CustomInputText
                                        label="Institute Unique ID"
                                        placeholder={'Please Enter institute Unique ID'}
                                        value={values.instUiqueID}
                                        error={errors['instUiqueID']}
                                        onChangeText={(value: any) => {
                                            handleChange('instUiqueID')(value);
                                        }}
                                    />
                                    <CustomDropDown
                                        label="Branch"
                                        placeholder={'Please Select Branch'}
                                        data={branch}
                                        error={errors['branchID']}
                                        onSelectItem={(value: any) => {
                                            handleChange('branchID')(value.value);
                                            // console.log(value)
                                        }}
                                    />
                                    <CustomInputText
                                        label="Other Branch Name"
                                        placeholder={'Please Enter Other Branch Name'}
                                        value={values.otherBranchName}
                                        error={errors['otherBranchName']}
                                        onChangeText={(value: any) => {
                                            handleChange('otherBranchName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Institute Name"
                                        placeholder={'Please Enter Institute Name'}
                                        value={values.instName}
                                        error={errors['instName']}
                                        onChangeText={(value: any) => {
                                            handleChange('instName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Candidate Address"
                                        placeholder={'Please Enter Address'}
                                        value={values.candidateAddress}
                                        error={errors['candidateAddress']}
                                        onChangeText={(value: any) => {
                                            handleChange('candidateAddress')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Institute Address"
                                        placeholder={'Please Enter Institute Address'}
                                        value={values.instAddress}
                                        error={errors['instAddress']}
                                        onChangeText={(value: any) => {
                                            handleChange('instAddress')(value);
                                        }}
                                    />
                                    <CustomDropDown
                                        label="State"
                                        placeholder={'Please Select State'}
                                        data={state}
                                        error={errors['stateID']}
                                        onSelectItem={(value: any) => {
                                            getDistrict(value),
                                                setSelectedState(value),
                                                handleChange('stateID')(value.value);
                                        }}
                                    />
                                    <CustomDropDown
                                        label="District"
                                        placeholder={'Please Enter District'}
                                        data={district}
                                        onSelectItem={(value: any) => {
                                            handleChange('districtID')(value.value)
                                            getArea(value)
                                        }}
                                        error={errors['districtID']}
                                    />
                                    <CustomDropDown
                                        label="City"
                                        placeholder={'Please Select City'}
                                        data={city}
                                        onSelectItem={(value: any) => { handleChange('cityID')(value.value); }}
                                        error={errors['cityID']}
                                    />
                                    <CustomDropDown
                                        label="Area"
                                        placeholder={'Please Select Area'}
                                        data={area}
                                        onSelectItem={(value: any) => { handleChange('areaID')(value.value); }}
                                        error={errors['areaID']}
                                    />
                                    <CustomInputText
                                        label="Landmark"
                                        placeholder={'Please Enter Landmark'}
                                        value={values.landmark}
                                        error={errors['landmark']}
                                        onChangeText={(value: any) => {
                                            handleChange('landmark')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Session Name"
                                        placeholder={'Please Enter Session Name'}
                                        value={values.sessionName}
                                        error={errors['sessionName']}
                                        onChangeText={(value: any) => {
                                            handleChange('sessionName')(value);
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
                </Formik>
                }
                {!isActivate && <View style={{ height: hp('18.5') }}></View>}
            </>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            {!isOtpVisible ? addCandidateForm() : addOtpForm()}
            {(isActivate === true) ? <ActivateInstituteUser /> : null}
        </ScrollView>
    );
};

export default AddCandidate;
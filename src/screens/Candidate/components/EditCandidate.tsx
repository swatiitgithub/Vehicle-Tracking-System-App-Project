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
import CustomImagePicker from '../../../components/widgets/ImagePicker';
import * as yup from 'yup';



const dateFormat = 'YYYY/MM/DD';

const EditCandidate = (props: any) => {
    // console.log(props.route.params)
    const data = props.route.params;
    const styles = useThemedStyles(style);
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState()
    const [selectedState, setSelectedState] = useState<any>()
    const [district, setDistrict] = useState<any>([])
    const [city, setCity] = useState<any>([])
    const [area, setArea] = useState<any>([])
    const [gender, setGender] = useState<any>([])
    const [marital, setMarital] = useState<any>([{ value: data?.maritalStatusID, name: data?.maritalStatusName }])
    const [branch, setBranch] = useState<any>([{ value: "1", name: "BRANCH1" }])
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    const { response, userData } = useSelector(
        (state: RootState) => state.user,
    );


    useEffect(() => {
        console.log({profileImage:data.profileImage})
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
                setArea(dataMaskForDropdown)
            }).catch(err => {
                setLoading(false);
            });
    }

    const addCandidate = async (values: any) => {
        try {
            setLoading(true)
            axiosRequest("/Candidate/AddCandidate", Constant.API_REQUEST_METHOD.POST, values).then(res => {
                // console.log(res.data);
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
                setLoading(false)
            }).catch(err => {
                setLoading(false);
            });
        } catch (error) {
            setLoading(false)
            console.log({ error });
        }
    };
    const addCandidateImage = async (imgString: any="") => {
        const params = {
            "candidateID": data?.candidateID,
            "profileImage": imgString,
            "userID": data?.candidateID,
            "formID": "-1",
            "type": "1"
        }
        try {
            setLoading(true)
            axiosRequest(Url.UPDATE_USER_PROFILE_IMAGE, Constant.API_REQUEST_METHOD.POST, params).then(res => {
                // console.log(res.data);
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
                setLoading(false)
            }).catch(err => {
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


    return (
        <ScrollView>
            <LinearGradient colors={['#f9c58d', '#f492f0',]}>
                <Formik
                    validationSchema={validation}
                    initialValues={
                        {
                            candidateID: data?.candidateID,
                            firstName: data?.firstName,
                            middleName: data?.middleName,
                            lastName: data?.lastName,
                            emailID: data?.emailID,
                            mobileNo: data?.mobileNo,
                            candPassword: "",
                            dob: data?.dob,
                            panNo: data?.panNo,
                            aadhaarNo: data?.aadhaarNo,
                            maritalStatusID: data?.maritalStatusID,
                            genderID: data?.genderID,
                            candidateAddress: data?.candidateAddress,
                            instUiqueID: data?.instUiqueID,
                            branchID: data?.branchID,
                            otherBranchName: data?.otherBranchName,
                            instName: data?.instName,
                            instAddress: data?.instAddress,
                            stateID: data?.stateID,
                            districtID: data?.districtID,
                            cityID: data?.cityID,
                            areaID: "0",
                            landmark: data?.landmark,
                            sessionName: data?.sessionName,
                            profileImage: data?.profileImage,
                            userID: data?.candidateID,
                            formID: 2,
                            type: 2,
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
                        <View>

                            <KeyboardAwareScrollView
                                contentContainerStyle={{ flex: 1 }}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.loginText}>{'Profile Update'}</Text>
                                </View>
                                <View style={{ height: hp("10"), alignItems: 'center', margin: hp("3"), }}>
                                    <CustomImagePicker
                                        type={'profile'}
                                        defaultImage={data.profileImage}
                                        onSelectedImage={(image: any) => {
                                            addCandidateImage(`data:image/png;base64,${image.data}`)
                                            //handleChange('profileImage')(image.data)
                                        }}
                                    />
                                    {/* <Image alt='unable to load'
                                        source={Images.PROFILE}
                                        style={{
                                            width: wp("30"),
                                            height: hp("15"),
                                            borderRadius: 100
                                        }}>
                                    </Image> */}
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
                                        label="MiddleName"
                                        placeholder={'Please Enter MiddleName'}
                                        value={values.middleName}
                                        error={errors['middleName']}
                                        onChangeText={(value: any) => {
                                            handleChange('middleName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="lastName"
                                        placeholder={'Please Enter LastName'}
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
                                        label="Mobile No"
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
                                        value={values.dob}
                                        error={errors['dob']}
                                        onConfirm={(value: any) => {
                                            handleChange('dob')(value.toISOString());
                                            console.log(value)
                                        }}
                                    />
                                    <CustomInputText
                                        label="PanNo"
                                        placeholder={'Please Enter PanNo'}
                                        value={values.panNo}
                                        error={errors['panNo']}
                                        onChangeText={(value: any) => {
                                            handleChange('panNo')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="AadhaarNo"
                                        placeholder={'Please Enter AadhaarNo'}
                                        value={values.aadhaarNo}
                                        error={errors['aadhaarNo']}
                                        onChangeText={(value: any) => {
                                            handleChange('aadhaarNo')(value);
                                        }}
                                    />
                                    <CustomDropDown
                                        label="MaritalStatus"
                                        placeholder={'Please Select Marital Status'}
                                        data={marital}
                                        error={errors['maritalStatusID']}
                                        defaultValue={data?.maritalStatusName}
                                        onSelectItem={(value: any) => {
                                            handleChange('maritalStatusID')(value.value);
                                        }}
                                    />
                                    <CustomDropDown
                                        label="Gender"
                                        placeholder={'Please Select Gender'}
                                        data={gender}
                                        defaultValue={data?.genderName}
                                        error={errors['genderID']}
                                        onSelectItem={(value: any) => {
                                            handleChange('genderID')(value.value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="institute Unique ID"
                                        placeholder={'Please Enter instUiqueID'}
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
                                        label="OtherBranchName"
                                        placeholder={'Please Enter OtherBranch Name'}
                                        value={values.otherBranchName}
                                        error={errors['otherBranchName']}
                                        onChangeText={(value: any) => {
                                            handleChange('otherBranchName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="InstName"
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
                                        defaultValue={data?.stateName}
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
                                        defaultValue={data?.districtName}
                                        onSelectItem={(value: any) => {
                                            handleChange('districtID')(value.value)
                                            getArea(value)
                                        }}
                                        error={errors['districtID']}
                                    />
                                    <CustomDropDown
                                        label="City"
                                        placeholder={'Please Enter City'}
                                        data={city}
                                        defaultValue={data?.cityName}
                                        onSelectItem={(value: any) => { handleChange('cityID')(value.value); }}
                                        error={errors['cityID']}
                                    />
                                    <CustomDropDown
                                        label="Area"
                                        placeholder={'Please Enter Area'}
                                        data={area}
                                        defaultValue={data?.areaName}
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
                                        label="sessionName"
                                        placeholder={'Please Enter sessionName'}
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
                                        Login
                                    </Button>
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    )}
                </Formik>
                <View style={{ height: hp('18.5') }}></View>
            </LinearGradient>
        </ScrollView>
    );
};

export default EditCandidate;
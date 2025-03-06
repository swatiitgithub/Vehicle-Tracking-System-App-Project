

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
import * as yup from 'yup';



const dateFormat = 'YYYY/MM/DD';

const AddInstitute = ({ visible, onClose, selectedRows, isEditable, onSaveSuccess }: any) => {
    const styles = useThemedStyles(style);
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState()
    const [selectedState, setSelectedState] = useState<any>()
    const [district, setDistrict] = useState<any>([])
    const [city, setCity] = useState<any>([])
    const [area, setArea] = useState<any>([])
    const [gender, setGender] = useState<any>([])
    const [marital, setMarital] = useState<any>([])
    const [branch, setBranch] = useState<any>([{ value: 1, label: "Branch 1" }])
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    const  {cords}  = useSelector((state: any) => state.location);
    const { response, userData } = useSelector(
        (state: any) => state.user,
    );


    useEffect(() => {
        console.log({Drawer:cords})
        // getState();
        // getCity();
    }, [])

    const convertDate = (inputDateString: string) => {
        // Parse the input date string using Moment.js
        const parsedDate = moment(inputDateString, 'YYYY-MM-DD HH:mm:ss');
        // Format the parsed date in the desired format
        const formattedDate = parsedDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        console.log(formattedDate);
        return formattedDate
    }

    // const getState = async () => {
    //     axiosRequest(Url.GET_STATE, Constant.API_REQUEST_METHOD.POST).then(res => {
    //         const dataMaskForDropdown = res?.data?.map((item: any) => {
    //             return { value: item.stateID, name: item.stateName }
    //         })
    //         console.log({ dataMaskForDropdown })
    //         setState(dataMaskForDropdown)
    //     }).catch(err => {
    //         setLoading(false);
    //     });
    // }

    // const getDistrict = async (item: any) => {
    //     axiosRequest(`${Url.GET_DISTRICT}DistrictID=-1&StateID=${item.value}`,
    //         Constant.API_REQUEST_METHOD.POST).then(res => {
    //             const dataMaskForDropdown = res?.data?.map((item: any) => {
    //                 return { value: item.districtID, name: item.districtName }
    //             })
    //             // console.log({ dataMaskForDropdown })
    //             setDistrict(dataMaskForDropdown)
    //         }).catch(err => {
    //             setLoading(false);
    //         });
    // }

    // const getCity = async () => {
    //     axiosRequest(Url.GET_CITY,Constant.API_REQUEST_METHOD.POST).then(res => {
    //         const dataMaskForDropdown = res?.data?.map((item: any) => {
    //             return { value: item.cityID, name: item.cityName }
    //         })
    //         console.log({ dataMaskForDropdown })
    //         setCity(dataMaskForDropdown)
    //     }).catch(err => {
    //         setLoading(false);
    //     });
    // }
    // const getLatLong = async () => {
    //     const location = window.navigator && window.navigator.geolocation
    //     if (location) {
    //         location.getCurrentPosition((position) => {
    //             setLatitude(position.coords.latitude.toString());
    //             setLongitude(position.coords.longitude.toString());
    //             console.log(latitude)
    //         })
    //     }
    // }

    // const getArea = async (value: any) => {
    //     axiosRequest(`${Url.GET_AREA}&DistrictID=${value.value}&StateID=${selectedState?.value}`,
    //         Constant.API_REQUEST_METHOD.POST).then(res => {
    //             const dataMaskForDropdown = res?.data?.map((item: any) => {
    //                 return { value: item.areaID, name: item.areaName }
    //             })
    //             // console.log({ dataMaskForDropdown })
    //             setArea(dataMaskForDropdown)
    //         }).catch(err => {
    //             setLoading(false);
    //         });
    // }

    const addInstitute = async (values: any) => {
        try {
            setLoading(true)
            axiosRequest("Institute/AddInstitute", Constant.API_REQUEST_METHOD.POST, values).then(res => {
                console.log(res.data);
                const { msg } = res?.data
                if (!res.data.isSuccess) {
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

    const closeDrawer = () => {
        onClose();
    }
    const validation = yup.object().shape({
        instituteName: yup.string().nullable().required('This field is required'),
        instituteCode: yup.string().nullable().required('This field is required'),
        mobileNo: yup.string().matches(/(\d){10}\b/, 'Enter a valid mobile number')
                    .required('Mobile No is required'),
        emailID: yup.string().email("Please enter valid email")
                    .required('This field is required'),
        stateID: yup.string().nullable().required('Please select state'),
        districtID: yup.string().nullable().required('Please select district'),
        cityID: yup.string().nullable().required('Please select city'),
        areaID: yup.string().nullable().required('Please select area'),
        estdDate: yup.string().nullable().required('Please select estimated date'),
        website: yup.string().url().required('This field is required'),
        noOfFaculty: yup.string().matches(/\d/, "No of faculties must have a number")
                        .required('This field is required'),
        noOfStudent: yup.string().matches(/\d/, "No of student must have a number")
                            .required('This field is required'),
        overAllRanking: yup.string().matches(/\d/, "OverallRanking must have a number")
                            .required('This field is required'),
    });



    return (
        <ScrollView>
            <LinearGradient colors={['#f9c58d', '#f492f0',]}>
                <Formik
                    validationSchema={validation}
                    initialValues={
                        {
                            instituteName: "",
                            instituteCode: "",
                            instituteAddress: "",
                            mobileNo: "",
                            phoneNo: "",
                            emailID: "",
                            landMark: "",
                            stateID: "",
                            districtID: "",
                            cityID: "",
                            areaID: "",
                            estdDate: "",
                            website: "https://",
                            campusArea: "",
                            noOfFaculty: "",
                            noOfStudent: "",
                            longitude: `"${cords?.longitude}"`,
                            latitude: `"${cords?.latitude}"`,
                            overAllRanking: "",
                            "userID": "-1",
                            "formID": "-1",
                            "instituteID": "-1",
                            "faxNo": "0",
                            "type": "1"
                        }
                    }
                    enableReinitialize={true}
                    onSubmit={async values => {
                        console.log(values)
                        addInstitute(values);
                    }}
                >

                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>

                            <KeyboardAwareScrollView
                                contentContainerStyle={{ flex: 1 }}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.loginText}>{'Create New Institute'}</Text>
                                </View>
                                <View style={{ height: hp("2"), alignItems: 'center', margin: hp("5"), }}>
                                    <Image alt='unable to load' source={Images.PROFILE} style={{ width: wp("30"), height: hp("15"), borderRadius: 100 }}></Image>
                                </View>


                                <View style={styles.formContainer}>
                                    <CustomInputText
                                        label="Institute Name"
                                        placeholder={'Please Enter Institute Name'}
                                        value={values.instituteName}
                                        error={errors['instituteName']}
                                        onChangeText={(value: any) => {
                                            handleChange('instituteName')(value);
                                        }}
                                    />

                                    <CustomInputText
                                        label="Institute Code"
                                        placeholder={'Please Enter Institute Code'}
                                        value={values.instituteCode}
                                        error={errors['instituteCode']}
                                        secureTextEntry={true}
                                        onChangeText={(value: any) => {
                                            handleChange('instituteCode')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Mobile No"
                                        maxLength={10}
                                        keyboardType="phone-pad"
                                        placeholder={'Please Enter Mobile No'}
                                        value={values.mobileNo}
                                        error={errors['mobileNo']}
                                        onChangeText={(value: any) => {
                                            handleChange('mobileNo')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="PhoneNo"
                                        placeholder={'Please Enter PhoneNo'}
                                        value={values.phoneNo}
                                        error={errors['phoneNo']}
                                        onChangeText={(value: any) => {
                                            handleChange('phoneNo')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        type="email"
                                        label="Email"
                                        placeholder={'Please Enter Email'}
                                        value={values.emailID}
                                        error={errors['emailID']}
                                        onChangeText={(value: any) => {
                                            handleChange('emailID')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Website"
                                        placeholder={'Please Enter Website'}
                                        value={values.website}
                                        error={errors['website']}
                                        onChangeText={(value: any) => {
                                            handleChange('website')(value);
                                        }}
                                    />
                                    <CustomDatePicker
                                        label="Established Date"
                                        placeholder={'Please Select Established Date'}
                                        value={moment(values.estdDate).format('DD-MMM-YYYY')}
                                        error={errors['estdDate']}
                                        onConfirm={(value: any) => {
                                            handleChange('estdDate')(value.toISOString());
                                            console.log(value)
                                        }}
                                    />
                                    <CustomInputText
                                        keyboardType="phone-pad"
                                        label="No of Faculties"
                                        placeholder={'Please Enter No of Faculties'}
                                        value={values.noOfFaculty}
                                        error={errors['noOfFaculty']}
                                        onChangeText={(value: any) => {
                                            handleChange('noOfFaculty')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        keyboardType="phone-pad"
                                        label="No of Students"
                                        placeholder={'Please Enter No of Students'}
                                        value={values.noOfStudent}
                                        error={errors['noOfStudent']}
                                        onChangeText={(value: any) => {
                                            handleChange('noOfStudent')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        keyboardType="phone-pad"
                                        label="OverAllRanking"
                                        placeholder={'Please Enter OverAllRanking'}
                                        value={values.overAllRanking}
                                        error={errors['overAllRanking']}
                                        onChangeText={(value: any) => {
                                            handleChange('overAllRanking')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Longitude"
                                        placeholder={'Please Enter Longitude'}
                                        value={values.longitude}
                                        error={errors['longitude']}
                                        onChangeText={(value: any) => {
                                            handleChange('longitude')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Latitude"
                                        placeholder={'Please Enter Latitude'}
                                        value={values.latitude}
                                        error={errors['latitude']}
                                        onChangeText={(value: any) => {
                                            handleChange('latitude')(value);
                                        }}
                                    />
                                    {/* <CustomDropDown
                                        label="State"
                                        placeholder={'Please Select State'}
                                        data={state}
                                        error={errors['stateID']}
                                        onSelectItem={(value: any) => {
                                            getDistrict(value),
                                            setSelectedState(value),
                                            handleChange('stateID')(value.value);
                                        }}
                                    /> */}
                                    {/* <CustomDropDown 
                                        label="District"
                                        placeholder={'Please Enter District'}
                                        data={district}
                                        onSelectItem={(value: any) => {
                                            handleChange('districtID')(value.value)
                                            getArea(value)
                                        }}
                                        error={errors['districtID']}
                                    /> */}
                                    <CustomDropDown
                                        label="City"
                                        placeholder={'Please Enter City'}
                                        data={city}
                                        onSelectItem={(value: any) => { handleChange('cityID')(value.value);}}
                                        error={errors['cityID']}
                                    />
                                    <CustomDropDown
                                        label="Area"
                                        placeholder={'Please Enter Area'}
                                        data={area}
                                        onSelectItem={(value: any) => {handleChange('areaID')(value.value); }}
                                        error={errors['areaID']}
                                    />
                                    <CustomInputText
                                        label="Landmark"
                                        placeholder={'Please Enter Landmark'}
                                        value={values.landMark}
                                        error={errors['landMark']}
                                        onChangeText={(value: any) => {
                                            handleChange('landMark')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Institute Address"
                                        placeholder={'Please Enter Institute Address'}
                                        value={values.instituteAddress}
                                        error={errors['instituteAddress']}
                                        onChangeText={(value: any) => {
                                            handleChange('instituteAddress')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="Campus Area"
                                        placeholder={'Please Enter Campus Area'}
                                        value={values.campusArea}
                                        error={errors['campusArea']}
                                        onChangeText={(value: any) => {
                                            handleChange('campusArea')(value);
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
                <View style={{ height: hp('18.5') }}></View>
            </LinearGradient>
        </ScrollView>
    );
};

export default AddInstitute;
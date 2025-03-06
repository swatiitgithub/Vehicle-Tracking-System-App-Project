

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




const EditInstituteUser = (props) => {
    const styles = useThemedStyles(style);
    const [loading, setLoading] = useState(false)
    const [gender, setGender] = useState<any>([])
    const [marital, setMarital] = useState<any>([])
    const [branch, setBranch] = useState<any>([{ value: 1, label: "Branch 1" }])
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    const { userData } = useSelector(
        (state: RootState) => state.user,
    );


    useEffect(() => {
        getGender();
    }, [])



    const getGender = async () => {
        axiosRequest(Url.GET_GENDER, Constant.API_REQUEST_METHOD.GET).then(res => {
            const {data}=res.data
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
        console.log(JSON.stringify(values,null,1))
        try {
            setLoading(true)
            axiosRequest(Url.ADD_INSTITUTE_USER, Constant.API_REQUEST_METHOD.POST, values).then(res => {
                console.log(res);
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
            }).catch(() => {
                setLoading(false);
            });
        } catch (error) {
            setLoading(false)
            console.log({ error });
        }
    };


    return (
        <ScrollView>
            <LinearGradient colors={['#f9c58d', '#f492f0',]}>
                <Formik
                    // validationSchema={validation}
                    initialValues={
                        {
                            firstName: "",
                            middleName: "",
                            lastName: "",
                            genderID: "",
                            userPassword:"",
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
                                contentContainerStyle={{ flex: 1 }}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.loginText}>{'Create New Institute_User'}</Text>
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
                                        label="Institute Middle Name"
                                        placeholder={'Please Enter Middle Name>'}
                                        value={values.middleName}
                                        error={errors['middleName']}
                                        secureTextEntry={true}
                                        onChangeText={(value: any) => {
                                            handleChange('middleName')(value);
                                        }}
                                    />
                                    <CustomInputText
                                        label="LastName"
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
                                        value={values.userPassword}
                                        error={errors['userPassword']}
                                        onChangeText={(value: any) => {
                                            handleChange('userPassword')(value);
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
                                        label="Date of Birth"
                                        placeholder={'Please Select DOB'}
                                        value={values.dob}
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
                </Formik>
                <View style={{ height: hp('18.5') }}></View>
            </LinearGradient>
        </ScrollView>
    );
};

export default EditInstituteUser;
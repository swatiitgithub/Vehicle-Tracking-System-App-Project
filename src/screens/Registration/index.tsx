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
import { getTodayDate } from "../../utils/common/Date";
import CustomDropDown from "../../components/widgets/CustomDropDown";

const Registration = ({ item }: any) => {


    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { userData, loading } = useSelector((state: RootState) => state.user);


    const validation = yup.object().shape({

        firstName: yup
            .string()
            .nullable()
            .required("This field is required"),

        email: yup
            .string()
            .nullable()
            .required("This field is required"),

        mobileNo: yup
            .string()
            .nullable()
            .required("This field is required"),

        userPassword: yup
            .string()
            .nullable()
            .required("This field is required"),

        confirmPassword: yup
            .string()
            .nullable()
            .required("This field is required")
            .oneOf([yup.ref('userPassword')], 'Your passwords do not match.')


    });


    const submitResgistration = (values: any) => {

        const defaultParams = {
            ...values,
            dob: getTodayDate(),
            genderID: 0,
            profileImageBase64: '',
            userID: 0,
            formID: 0,
            type: 1
        }

        dispatch({
            type: sagaActions.POST_REGISTRATION_DATA,
            payload: {
                params: defaultParams,
            },
        });

    }


    return (
        <>
            <Formik
                validationSchema={validation}
                initialValues={{
                    firstName: '',
                    middleName: 'middleName',
                    surName: 'surName',
                    email: '',
                    mobileNo: '',
                    userPassword: '',
                    confirmPassword: '',

                }}
                enableReinitialize={true}
                onSubmit={async values => {
                    submitResgistration(values)
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
                                <Text style={styles.loginText} >{'Registration'}</Text>
                                <View
                                    style={styles.desContainer}
                                >
                                    <Text
                                        style={{
                                            color: Colors.primary,
                                            textAlign: 'center',
                                        }}
                                    >{'By signup in you are agreeing our Term and Privacy Policy'}</Text>
                                </View>

                                <Image
                                    style={styles.logo}
                                    source={Images.LOGIN_LOGO}
                                />

                            </View>

                            <View style={styles.formContainer}>

                                <CustomInputText
                                    label="Person Name"
                                    placeholder={'Please Enter Your Name'}
                                    value={values.firstName}
                                    error={errors['firstName']}
                                    onChangeText={(value: any) => { handleChange('firstName')(value) }}
                                />

                                <CustomInputText
                                    label="Email"
                                    placeholder={'Please Enter Your Email'}
                                    value={values.email}
                                    error={errors['email']}
                                    onChangeText={(value: any) => { handleChange('email')(value) }}
                                />

                                <CustomInputText
                                    label="Contact Number"
                                    placeholder={'Please Enter Your Contact Number'}
                                    value={values.mobileNo}
                                    error={errors['mobileNo']}
                                    keyboardType={'phone-pad'}
                                    maxLength={12}
                                    onChangeText={(value: any) => { handleChange('mobileNo')(value) }}
                                />

                                <CustomDropDown
                                    label="Drop down"
                                    placeholder={'Please Enter Your Contact Number'}
                                    value={values.mobileNo}
                                    error={errors['mobileNo']}
                                    keyboardType={'phone-pad'}
                                    maxLength={12}
                                    onChangeText={(value: any) => { handleChange('mobileNo')(value) }}
                                />

                                <CustomInputText
                                    label="Password"
                                    placeholder={'Please Enter Your password'}
                                    value={values.userPassword}
                                    error={errors['userPassword']}
                                    secureTextEntry={true}
                                    onChangeText={(value: any) => { handleChange('userPassword')(value) }}
                                />

                                <CustomInputText
                                    label="Confirm Password"
                                    placeholder={'Please Enter Your Confirm Password'}
                                    value={values.confirmPassword}
                                    error={errors['confirmPassword']}
                                    secureTextEntry={true}
                                    onChangeText={(value: any) => { handleChange('confirmPassword')(value) }}
                                />

                                <Button
                                    style={styles.loginBtn}
                                    size='lg'
                                    isLoading={loading}
                                    onPress={() => { handleSubmit() }}
                                >Registration</Button>

                                <TouchableOpacity>
                                    <Text
                                        style={styles.signUpText}
                                    >{'Sign in here'}</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>)}
            </Formik>

        </>
    )
}

export default Registration;
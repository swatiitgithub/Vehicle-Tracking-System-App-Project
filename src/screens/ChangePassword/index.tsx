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
import React from "react";

const ChangePassword = ({ item }: any) => {


    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { userData, loading } = useSelector((state: RootState) => state.user);
    // console.log(userData.verifiedUser.loginName);


    const validation = yup.object().shape({


        LoginName: yup
            .string()
            .nullable()
            .required("This field is required"),

        OldPwd: yup
            .string()
            .nullable()
            .required("This field is required"),

        NewPwd: yup
            .string()
            .nullable()
            .required("This field is required")
            //.oneOf([yup.ref('oldPwd')], 'Your passwords matched with old.')


    });


    const submitPassord = (values: any) => {
        const defaultParams = {
            ...values,
        }
        
        dispatch({
            type: sagaActions.CHANGE_PASSWORD,
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
                    LoginName: userData?.verifiedUser?.loginName,
                    OldPwd: '',
                    NewPwd: '',
                }}
                enableReinitialize={true}
                onSubmit={async values => {
                    submitPassord(values);
                    console.log(values);
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
                                <Text style={styles.loginText} >{'Change Password'}</Text>
                                <View
                                    style={styles.desContainer}
                                >
                                </View>

                                <Image
                                    style={styles.logo}
                                    source={Images.LOGIN_LOGO}
                                />

                            </View>

                            <View removeClippedSubviews={true} style={styles.formContainer}>

                                <CustomInputText
                                    editable={userData.verifiedUser.userTypeID==1 ? true : false}
                                    label="Email/Username"
                                    placeholder={'Please Enter Your email'}
                                    value={values.LoginName}
                                    error={errors['LoginName']}
                                    onChangeText={(value: any) => { handleChange('LoginName')(value) }}
                                />

                                <CustomInputText
                                    label="Old Password"
                                    placeholder={'Please Enter Your Old password'}
                                    value={values.OldPwd}
                                    error={errors['OldPwd']}
                                    secureTextEntry={true}
                                    onChangeText={(value: any) => { handleChange('OldPwd')(value) }}
                                />

                                <CustomInputText
                                    label="New Password"
                                    placeholder={'Please Enter Your New Password'}
                                    value={values.NewPwd}
                                    error={errors['NewPwd']}
                                    secureTextEntry={true}
                                    onChangeText={(value: any) => { handleChange('NewPwd')(value) }}
                                />

                                <Button
                                    style={styles.loginBtn}
                                    size='lg'
                                    isLoading={loading}
                                    onPress={() => { handleSubmit() }}
                                >ChangePassword</Button>

                            </View>
                        </KeyboardAwareScrollView>
                    </View>)}
            </Formik>

        </>
    )
}

export default ChangePassword;
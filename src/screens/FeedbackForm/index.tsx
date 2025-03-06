import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ActionBar from "../../components/ActionBar";
import CustomDatePicker from "../../components/widgets/CustomDatePicker";
import CustomDropDown from "../../components/widgets/CustomDropDown";
import CustomInputText from "../../components/widgets/CustomInputText";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "./style";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from "moment";
import CustomImagePicker from "../../components/widgets/ImagePicker";
import CustomRating from "../../components/widgets/CustomRating";
import { useState } from "react";
import Constant from "../../utils/Constant";
import Url from "../../utils/Url";
import { axiosRequest } from "../../utils/ApiRequest";
import { showMessage } from 'react-native-flash-message';


const FeedbackForm = ({ item }: any) => {

    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const route: any = useRoute();
    const appCompID  = route.params;


    const validation = yup.object().shape({

        MobileNo: yup
            .string()
            .nullable()
            .required("This field is required")
            .matches(/^[0-9]+$/, "Please enter valid characters"),


        Rating: yup
            .string()
            .nullable()
            .required("This field is required"),

        ReviewText: yup
            .string()
            .nullable()
            .required("This field is required"),

        Mac: yup
            .string()
            .nullable()
            .required("This field is required"),

    });

    const submitFeedback = (values: any) => {
        setLoading(true);
        axiosRequest(Url.ADD_FEEDBACK, Constant.API_REQUEST_METHOD.GET, values).then(res => {
            const { data } = res;
            console.log(data);
            setLoading(false);
            if (data.isSuccess === "1") {
                navigation.goBack();
                showMessage({
                    message: data.msg,
                    type: 'success',
                });
            }else{
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
                title={'FeedBack'}
            />

            <Formik
                validationSchema={validation}
                initialValues={{
                    MobileNo: '',
                    AppCompID: appCompID,
                    Rating: '5',
                    ReviewText: '',
                    Mac: '',
                    UserID: '1',
                    FormID: '1',
                    Type: '1'
                }}
                enableReinitialize={true}
                onSubmit={async values => {
                    console.log({ values });
                    submitFeedback(values)
                }}>
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                }) => (

                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 9, paddingHorizontal: 15 }}>
                            <KeyboardAwareScrollView
                                contentContainerStyle={{ paddingBottom: 100 }}
                                showsVerticalScrollIndicator={false}
                            >

                                <CustomInputText
                                    label="Phone Number *"
                                    placeholder={'Please Your Contact Number'}
                                    value={values.MobileNo}
                                    error={errors['MobileNo']}
                                    keyboardType={'phone-pad'}
                                    maxLength={12}
                                    onChangeText={(value: any) => { handleChange('MobileNo')(value) }}
                                />

                                <CustomRating
                                    label="Rating *"
                                    error={errors['Rating']}
                                    onFinishRating={
                                        (rating: string) => {
                                            handleChange('Rating')("" + rating)
                                        }
                                    }
                                />

                                <CustomInputText
                                    label="Review Text *"
                                    placeholder={'Please Enter Your Review'}
                                    value={values.ReviewText}
                                    error={errors['ReviewText']}
                                    onChangeText={(value: any) => { handleChange('ReviewText')(value) }}
                                />

                                <CustomInputText
                                    label="Description *"
                                    value={values.Mac}
                                    error={errors['Mac']}
                                    multiline={true}
                                    numberOfLines={4}
                                    type={'textarea'}
                                    onChangeText={(value: any) => { handleChange('Mac')(value) }}
                                />


                            </KeyboardAwareScrollView>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.row, styles.createGrpAction]}>
                                <TouchableOpacity
                                    style={[styles.flex1, styles.hCenter, { height: 50, width: '50%' }]}
                                    onPress={() => { }}
                                >
                                    <Text style={[styles.fs16]}>{'Cancel'}</Text>
                                </TouchableOpacity>
                                <View style={[styles.hCenter, { height: 50, width: '50%' }]}>
                                    {!loading ?
                                        <TouchableOpacity
                                            onPress={() => { handleSubmit() }}
                                        >
                                            <Text style={[{ ...styles.fs16, textAlign: 'right' }]}>
                                                {'Submit Feedback'}
                                            </Text>
                                        </TouchableOpacity> :
                                        <ActivityIndicator size={'large'} />
                                    }
                                </View >


                            </View>
                        </View>
                    </View>)}
            </Formik>

        </>
    )
}

export default FeedbackForm;
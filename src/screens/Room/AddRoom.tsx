

import { useEffect, useRef, useState } from 'react';
import { Button, Image, ScrollView, Select, Text, View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Formik, useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import CustomDatePicker from '../../components/widgets/CustomDatePicker';
import CustomDropDown from '../../components/widgets/CustomDropDown';
import { RootState } from '../../redux/store';
import { axiosRequest } from '../../utils/ApiRequest';
import Constant from '../../utils/Constant';
import Images from '../../utils/Images';
import { hp, wp } from '../../utils/Responsive';
import Url from '../../utils/Url';
import CustomInputText from '../../components/widgets/CustomInputText';
import { default as style } from "./style"
import useThemedStyles from '../../config/theme/hooks/useThemedStyles';




const AddRoom = (props: any) => {
    const styles = useThemedStyles(style);
    const isActivate = props.route.params
    const [loading, setLoading] = useState(false)
    const [roomType, setRoomType] = useState<any>([])
    const [rateType, setRateType] = useState<any>([])
    const [row, setRow] = useState(1);
    const [col, setCol] = useState(1);
    const [capacity, setCapacity] = useState(1);
    const {params}=props.route;

    const { userData } = useSelector(
        (state: RootState) => state.user,
    );
    const [isOtpVisible, setOTPVisible] = useState(false);

    useEffect(() => {
        console.log(params);
        getRoomType();
        getRateType();
    }, [])



    const getRoomType = async () => {
        axiosRequest(Url.GET_ROOM_TYPE, Constant.API_REQUEST_METHOD.POST).then(res => {
            const { data } = res
            const dataMaskForDropdown = data?.map((item: any) => {
                return { value: item.roomTypeID.toString(), name: item.roomTypeName }
            })
            // console.log({ dataMaskForDropdown })
            setRoomType(dataMaskForDropdown)
        }).catch(() => {
            setLoading(false);
        });
    }
    const getRateType = async () => {
        axiosRequest(Url.GET_RATE_TYPE, Constant.API_REQUEST_METHOD.POST).then(res => {
            const { data } = res
            const dataMaskForDropdown = data?.map((item: any) => {
                return { name: item.rateTypeName, value: item.rateTypeID }
            })
            setRateType(dataMaskForDropdown)
        }).catch(() => {
            setLoading(false);
        });
    }
    const addRoom = async (values: any) => {
        console.log(JSON.stringify(values, null, 1))
        try {
            setLoading(true)
            axiosRequest(Url.ADD_ROOM, Constant.API_REQUEST_METHOD.POST, values).then(res => {
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
                    setLoading(false)
                    if (res.data.isSuccess == "True")
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
        roomName: yup.string().nullable().required('This field is required'),
        roomCapacity: yup.string().nullable().required('This field is required'),
        noOfCol: yup.string().required('Column no is required'),
        noOfRow: yup.string().required('This field is required'),
        roomTypeID: yup.string().nullable().required('Please select room type'),
        rateTypeID: yup.string().nullable().required('Please select rate type'),
        roomSize: yup.string().nullable().required('This field is required'),
        rate: yup.string().nullable().required('This field is required'),
        disCountPercent: yup.string().nullable().required('This field is required'),
    });
    const onRowEnter = (e: any) => {
        setRow(e)
        setCapacity(e*col)
        let roomCapacity1 = (e) * col
        // form.setFieldsValue({
        //     roomCapacity: roomCapacity1
        // })
    }
    const onColumnEnter = (e: any) => {
        console.log(e)
        setCol(e)
        setCapacity(e*row)
    }

    return (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            <>
            <Formik
                validationSchema={validation}
                initialValues={
                    {
                        "instituteID": params?.instituteID,
                        "roomTypeID": "0",
                        "roomName": "",
                        "roomCapacity":capacity,
                        "noOfRow": "",
                        "noOfCol": "",
                        "roomSize": "",
                        "rateTypeID": "",
                        "rate": "",
                        "disCountPercent": "",
                        "roomID": "-1",
                        "userID": "-1",
                        "formID": -1,
                        "type": 1,
                    }
                }
                // enableReinitialize={true}
                onSubmit={async values => {
                    console.log(values)
                    addRoom(values);
                }}
            >

                {({ handleChange, handleSubmit, values, errors }) => (
                    <View>

                        <KeyboardAwareScrollView
                            contentContainerStyle={{}}
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.loginText}>{'Create a New Room'}</Text>
                            </View>
                            {/* <View style={{ height: hp("2"), alignItems: 'center', margin: hp("5"), }}>
                                <Image alt='unable to load' source={Images.PROFILE} style={{ width: wp("30"), height: hp("15"), borderRadius: 100 }}></Image>
                            </View> */}


                            <View style={styles.formContainer}>
                                <CustomInputText
                                    editable={false}
                                    label="Institute"
                                    placeholder={'Please enter institute name'}
                                    value={values.instituteID}
                                    error={errors['instituteID']}
                                    onChangeText={(value: any) => {
                                        handleChange('instituteID')(value);
                                    }}
                                />
                                <CustomDropDown
                                    label="Room Type"
                                    placeholder={'Please select room type'}
                                    data={roomType}
                                    error={errors['roomTypeID']}
                                    onSelectItem={(value: any) => {
                                        handleChange('roomTypeID')(value.value);
                                    }}
                                />
                                <CustomInputText
                                    label="Room name"
                                    placeholder={'Please enter room name'}
                                    value={values.roomName}
                                    error={errors['roomName']}
                                    onChangeText={(value: any) => {
                                        handleChange('roomName')(value);
                                    }}
                                />
                                <CustomInputText
                                    keyboardType="phone-pad"
                                    label="No of rows"
                                    placeholder={'Please enter no of rows'}
                                    value={values.noOfRow}
                                    error={errors['noOfRow']}
                                    onChangeText={(value: any) => {
                                        onRowEnter(value);
                                        handleChange('noOfRow')(value);
                                        handleChange('roomCapacity')((value*col).toString());
                                    }}
                                />
                                <CustomInputText
                                    keyboardType="phone-pad"
                                    label="No of columns"
                                    placeholder={'Please enter no of columns'}
                                    value={values.noOfCol}
                                    error={errors['noOfCol']}
                                    onChangeText={(value: any) => {
                                        onColumnEnter(value);
                                        handleChange('noOfCol')(value);
                                        handleChange('roomCapacity')((value*row).toString());
                                    }}
                                />
                                <CustomInputText
                                    editable={false}
                                    label="Room Capacity"
                                    keyboardType="phone-pad"
                                    placeholder={'Room capacity'}
                                    value={values.roomCapacity}
                                    error={errors['roomCapacity']}
                                    onChangeText={(value: any) => {
                                        handleChange('roomCapacity')(value);
                                    }}
                                />
                                <CustomInputText
                                    label="Room Size"
                                    placeholder={'Please enter room size'}
                                    value={values.roomSize}
                                    error={errors['roomSize']}
                                    onChangeText={(value: any) => {
                                        handleChange('roomSize')(value);
                                    }}
                                />

                                <CustomDropDown
                                    label="Rate Type"
                                    placeholder={'Please select rate type'}
                                    data={rateType}
                                    error={errors['rateTypeID']}
                                    onSelectItem={(value: any) => {
                                        handleChange('rateTypeID')(value.value);
                                    }}
                                />
                                <CustomInputText
                                    label="Rate"
                                    placeholder={'Please enter rate'}
                                    value={values.rate}
                                    error={errors['rate']}
                                    onChangeText={(value: any) => {
                                        handleChange('rate')(value);
                                    }}
                                />
                                <CustomInputText
                                    label="Discount Percent"
                                    placeholder={'Please enter discount percent'}
                                    value={values.disCountPercent}
                                    error={errors['disCountPercent']}
                                    onChangeText={(value: any) => {
                                        handleChange('disCountPercent')(value);
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
            </>
        </ScrollView>
    );
};

export default AddRoom;
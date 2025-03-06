import {
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Image,
    Keyboard,
    ImageBackground,
    TextInput

} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import styles from './style';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Constant from '../../utils/Constant';
import Url from '../../utils/Url';
import { axiosRequest } from '../../utils/ApiRequest';
import { showMessage } from 'react-native-flash-message';
import { Button, Checkbox } from 'native-base';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { sagaActions } from '../../redux/saga/sagaActions';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { hp, wp } from '../../utils/Responsive';
import LinearGradient from 'react-native-linear-gradient';
import useThemedStyles from '../../config/theme/hooks/useThemedStyles';
import { default as style } from './style';
import { setUserData } from '../../redux/slices/userSlice';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';


const Login = (props: any) => {
    const navigation = useNavigation<any>();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const dispatch = useDispatch();
    const { response, userData, loading } = useSelector(
        (state: any) => state.user,
    );
    const [getUserData, setUserData] = useState(userData)
    const styles = useThemedStyles(style);


    useEffect(() => {
        // console.log({ props: props })
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    const validation = yup.object().shape({
        username: yup.string().nullable().required('Username is required'),

        password: yup.string().nullable().required('Password is required'),
    });

    useEffect(() => {
        if (userData !== null) {
            setUserData(userData);
        }
    }, [userData]);


    const submitLogin = (values: any) => {
        // navigation.navigate('DrawerStack');

        // console.log({myvalues:values})
        dispatch({

            type: sagaActions.FETCH_USER_DATA,

            payload: {
                params: values,
            },
        });
        axiosRequest(Url.LOGIN, Constant.API_REQUEST_METHOD.POST, values).then(res => {
            const { listPackages } = res?.data
            // console.log(JSON.stringify(res.data.status, null, 1))
            // console.log(JSON.stringify(res.data.verifiedUser?.isVerify))
            if (res?.data) {
                if (!res?.data?.status) {
                    showMessage({
                        message: 'Login Failed. Invalid Credentials',
                        type: 'danger',
                    });
                }
                else {
                    // if (userData) {
                    navigation.navigate('DrawerStack');
                    showMessage({
                        message: 'Login successfully',
                        type: 'success',
                    });
                    // }
                }
            }
        })

    };
    const [isSelected, setSelection] = useState(false);

    return (
        <>
            <ScrollView style={{ backgroundColor: '#DCDCDC', }}>
                <Formik
                    validationSchema={validation}
                    initialValues={{
                        "email": "",
                        "id": "",
                        "token": "",
                        rememberMe: true,
                        username: 'knn',
                        password: 'knnvts@56a',
                    }}
                    enableReinitialize={true}
                    onSubmit={async values => {
                        submitLogin(values);
                        
                    }}
                >

                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View >
                            <KeyboardAwareScrollView
                                contentContainerStyle={{ flex: 1 }}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.loginText}>{'Vehicle Tracking System'}</Text>
                                </View>

                                <View style={styles.logoContainer}>
                                    <Image
                                        source={require('../Dashboard1/Image/ssr.png')} 
                                        style={styles.logo}
                                    />
                                </View>


                               
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <Text style={[styles.loginText, { color: 'white', marginBottom: 10 }]}>
                {'Login'}
            </Text>
                <Text style={[styles.errorStyle, { color: 'white' }]}>{'Username'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Please Enter Username'}
                        placeholderTextColor="gray"
                        value={values.username}
                        onChangeText={(value: any) => {
                            handleChange('username')(value);
                        }}
                    />
                </View>
                <Text style={styles.errorStyle}>{errors['username']}</Text>

                <Text style={[styles.errorStyle, { color: 'white' }]}>{'Password'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Please enter password'}
                        placeholderTextColor="gray"
                        value={values.password}
                        secureTextEntry={true}
                        onChangeText={(value: any) => {
                            handleChange('password')(value);
                        }}
                    />
                </View>
                <Text style={styles.errorStyle}>{errors['password']}</Text>
                <Button
                    style={styles.button}
                    size="lg"
                    // isLoading={loading}
                    onPress={() => {
                        handleSubmit();
                    }}
                >
                    Login
                </Button>
            </LinearGradient>
        
                            </KeyboardAwareScrollView>
                        </View>
                    )}
                </Formik>
            </ScrollView >
        </>
    );
};

export default Login;

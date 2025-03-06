
import { Form } from 'formik';
import { Select, View } from 'native-base';
// import RadioGroup, { RadioButton } from 'react-native-radio-buttons-group';
import React, { useEffect, useMemo, useState } from 'react';
import { Text } from 'react-native';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: 64,
    paddingInline: 50,
    // lineHeight: '64px',
    backgroundColor: '#ffffff',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    // lineHeight: '120px',
    backgroundColor: '#ffffff',
    paddingTop: 110
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#ffffff',
};


const Package: React.FC = () => {

    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const [currentUser, setCurrentUser] = useState<any>();
    const navigation = useNavigation();
    const [packageList, setPackageList] = useState<any>({
        id: '1',
        label: 'package 1',
        value: 'option2'
    });
    const { response, userData, loading } = useSelector(
        (state: RootState) => state.user,
    );


    // const onPackageChange = (value: string) => {
    //     setTimeout(() => {
    //         // this.setState({ success: false });
    //         flushSync(() => {
    //             setInitialState((s: any) => {
    //                 s.currentUser['selectedPackageId'] = value
    //                 return { ...s }
    //             });
    //         });
    //         setPackageId(value);
    //         const urlParams = new URL(window.location.href).searchParams;
    //         history.push(urlParams.get('redirect') || '/');
    //     }, 100);
    // };


    useEffect(() => {
        setPackages()
        // setCurrentUser(initialState?.currentUser);
        // setPackageList();
    }, [])

    const onFinish = (values: any) => {
        console.log(values);
    };
    const setSelectedID = (value: any) => {
        console.log({value:value})
        let packageid: Object = {
            extraData: value
        };
        navigation.navigate('DrawerStack', value)
    };

    const setPackages = () => {
        let packages = userData?.listPackages.map((item: any, index: number) => ({ label: item.packagE_NAME, id: item.packagE_ID, value: item.packagE_ID }));
        setPackageList(packages)
    };



    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Option 1',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Option 2',
            value: 'option2'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {userData?.listPackages.map((item: { packagE_ID: string; packagE_NAME: string | undefined; }, index: number) => {
                return (
                    <View key={`key${index}`} style={{flexDirection:'row', alignItems: 'center', marginLeft: '30%' }}>
                        <RadioButton
                            // containerStyle={{ }}
                            onPress={()=>setSelectedID(item.packagE_ID)}
                            value={item.packagE_ID}
                            // label={item.packagE_NAME}
                        />
                        <Text>{item?.packagE_NAME}</Text>
                    </View>
                );
            })}
        </View>
    )
};

export default Package;

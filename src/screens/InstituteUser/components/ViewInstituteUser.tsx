

import { useEffect, useRef, useState } from 'react';

const moment = require('moment');
import { ScrollView, View } from 'native-base';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import ActionBar from '../../../components/ActionBar';
import { default as style } from '../styles/viewInstituteUserStyle';
import useThemedStyles from '../../../config/theme/hooks/useThemedStyles';
import Images from '../../../utils/Images';
import Colors from '../../../utils/Colors';
import { axiosRequest } from '../../../utils/ApiRequest';
import Url from '../../../utils/Url';
import Constant from '../../../utils/Constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


const dateFormat = 'YYYY/MM/DD';

const ViewInstituteUser = (props: any) => {
    const styles = useThemedStyles(style);

    // console.log(JSON.stringify(props?.route?.params, null, 1))
    // const data = props?.route?.params;
    const name = props?.route?.params?.data?.subItem.name;
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { userData } = useSelector(
        (state: RootState) => state.user,
      );



    useEffect(() => {
        if (name == "Candidate Profile")
            getCandidateDetail()
        else 
            setData(props?.route?.params)
        console.log(userData?.verifiedUser?.userID)
        console.log(name)
    }, []);

    const getCandidateDetail = () => {
        setLoading(true)
        const params = {
            "candidateID": userData?.verifiedUser?.userID,
            "uniqueNo": "",
            "emailID": "",
            "mobileNo": "",
            "dob": "",
            "panNo": "",
            "aadhaarNo": "",
            "genderID": "-1",
            "stateID": "-1",
            "districtID": "-1",
            "cityID": "-1",
            "areaID": "-1",
            "searchText": "",
            "userID": "-1",
            "formID": "-1",
            "type": "1"
        }
        axiosRequest(Url.GET_CANDIDATE_LIST, Constant.API_REQUEST_METHOD.POST, params).then(res => {
            console.log(JSON.stringify(res.data.data[0], null, 1))
            const { data } = res?.data
            setData(res?.data?.data[0])
            setLoading(false);

        }).catch(() => {
            setLoading(false);
        });
    }

    return (
        data&& <ScrollView contentContainerStyle={{ paddingBottom: 20, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => props.navigation.navigate("EditCandidate", data)} style={styles.avatarContainer}>
            <Image
                source={{ uri: `data:image/png;base64,${data.profileImage}` }}
                style={{ height: 100, width: 100 }}
                resizeMode='contain'
            />
        </TouchableOpacity>

        <View style={styles.container}>
            {
                console.log(data.candidateID)
            }
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`ID :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.candidateID}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`First Name :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.firstName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Middle Name :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.middleName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Last Name :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.lastName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Email :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.emailID}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`MobileNo :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.mobileNo}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`DOB :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.dob}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`PAN No :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.panNo}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Aadhaar No :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.aadhaarNo}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Marital Status :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.maritalStatusName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Gender :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.genderName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Inst UniqueID :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.instUiqueID}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Inst. Name :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.instName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Inst. Address :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.instAddress}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Branch Name :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.branchName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Other Branch Name :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.otherBranchName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`State :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.stateName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`District :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.districtName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`City :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.cityName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Area :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.areaName}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Landmark :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.landmark}
                </Text>
            </View>
            <View style={styles.deskBox}>
                <Text style={styles.textHead}>
                    {`Candidate Address :`}
                </Text>
                <Text style={styles.textValue}>
                    {data?.candidateAddress}
                </Text>
            </View>
        </View>
    </ScrollView>
    );
};

export default ViewInstituteUser;
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { axiosRequest } from '../../utils/ApiRequest';
import Url from '../../utils/Url';
import Constant from '../../utils/Constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import { default as style } from "./styles/style"
import useThemedStyles from '../../config/theme/hooks/useThemedStyles';
import useTheme from '../../config/theme/hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { BackButton } from '../../components/BackButton';
import ImageView from 'react-native-image-viewing';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import { Image } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import { wp, hp } from '../../utils/Responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { convertDate } from '../../utils/common/Date';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';



const InstituteDetails: React.FC = ({ state }: any) => {
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState(false)
    const [instituteData, setInstituteData] = useState<any>({});
    const [roomData, setRoomData] = useState<any>([]);
    const theme = useTheme();
    const styles = useThemedStyles(style);
    const [imageSlider, setImageSlider] = useState<any>([]);
    const [imageSilderIndex, setImageSilderIndex] = useState<number>(0);
    const [visibleImage, setVisibleImage] = useState(false);
    const route: any = useRoute();
    const institute: any = route.params;
    const [fromDate, setFromDate] = useState(convertDate(new Date()));
    const [toDate, setToDate] = useState(convertDate(new Date()));


    useEffect(() => {
        console.log(institute)
        getDetails();
    }, []);


    const getDetails = async () => {
        try {
            const values = {
                "instituteID": institute?.instituteID,
                "roomID": "-1",
                "userID": "-1",
                "formID": "-1",
                "type": "1",
                "fromdate": fromDate,
                "todate": toDate,
                "slotID": -1
            };
            setLoading(true);
            axiosRequest(Url.GET_INST_DETAILS, Constant.API_REQUEST_METHOD.POST, values).then(response => {
                setLoading(false)
                // console.log(JSON.stringify(response,null,1));
                if (response?.data.isSuccess) {
                    const details: any = response?.data?.result;
                    setInstituteData(details);
                    const slider = details?.lstInstittueImageRespDTO.map((item: any) => ({
                        uri: `${item.instituteImage}`,
                    }));
                    setImageSlider(slider);
                    setRoomData(details?.lstInstituteRoomRespDTO);
                    return;
                }
            })
        } catch (error) {
            setLoading(false)
            console.log({ error });
        }
    };

    const onPressRoom = (item: any) => {
        navigation.navigate('RoomWithSeat', { item, fromDate, toDate });
    }
    const onDeleteRoom = (item: any) => {
        console.log(JSON.stringify(item.instituteID,null,1));
        const params = {
            "instituteID": item?.instituteID,
            "roomTypeID": "-1",
            "roomName": "name",
            "roomCapacity": "-1",
            "noOfRow": "-1",
            "noOfCol": "-1",
            "roomSize": "-1",
            "rateTypeID": "-1",
            "rate": "0",
            "disCountPercent": "0",
            "roomID": item?.roomID,
            "userID": "-1",
            "formID": -1,
            "type": 3,
        }
        axiosRequest(Url.ADD_ROOM, Constant.API_REQUEST_METHOD.POST, params).then(res => {
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
            }
        }).catch(() => {
            setLoading(false);
        });
    }


    const roomView = () => {

        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: '800', color: '#000000' }}>
                        {`Rooms`}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddRoom', institute)}
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#35bdfc',
                            borderRadius: 4,
                            padding: 5
                        }}>
                        <Ionicons name={"add"} color={'white'} size={25} />
                        <Text style={{ textAlignVertical: 'center', color: 'white' }}>Add Room</Text>
                    </TouchableOpacity>
                </View>

                {roomData.length === 0 && <Text style={{ fontSize: 18, color: '#000000', paddingVertical: 10 }}>
                    {`No Room Available`}
                </Text>}

                {roomData.map((item: any, index: number) => {
                    return (
                        <View
                            key={`room_${index}`}
                        >
                            <TouchableOpacity
                                onPress={() => { onPressRoom(item) }}
                                style={{
                                    marginVertical: 5,
                                    backgroundColor: '#0500FF0D',
                                    borderRadius: 5
                                }}>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 5
                                }}>
                                    <View style={{ width: "85%" }}>
                                        <Text style={styles.headerText}>
                                            {`${item?.roomName} (${item?.roomTypeName})`}
                                        </Text>
                                        <Text>
                                            {`${item?.lstRoomRateLinkRespDTO[0]?.rate} INR`}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>onDeleteRoom(item)}>
                                        <MaterialIcons name={"delete"} size={25} color={'red'} />
                                    </TouchableOpacity>
                                    <IconFeather name={"chevron-right"} size={25} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        )
    }



    const Header = () => {
        return (
            <View style={styles.header}>
                <ImageBackground
                    style={styles.headerBG}
                    resizeMode="cover"
                    imageStyle={{ opacity: 0.7 }}
                    source={imageSlider.length > 0 ? { uri: imageSlider[0].uri } : Images.DETAILS_BG_3}>
                    <View style={styles.header1}>
                        <BackButton />
                    </View>
                    <View style={styles.subHead}>
                        <View style={styles.subHead1}>
                            <Text style={styles.text1}>{instituteData?.instituteName}</Text>
                            <Text style={styles.text2} numberOfLines={2}> {instituteData?.mobileNo}</Text>
                            <Text style={styles.text2} numberOfLines={2}> {instituteData?.emailID}</Text>
                            <Text style={styles.text2} numberOfLines={2}> {instituteData?.website}</Text>
                            <Text style={styles.text2} numberOfLines={2}> {instituteData?.instituteAddress}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const ImageGallery = () => {
        return (
            <View>
                {imageSlider.length > 0 && (
                    <ImageView
                        images={imageSlider}
                        imageIndex={imageSilderIndex}
                        visible={visibleImage}
                        animationType={'fade'}
                        onRequestClose={() => setVisibleImage(false)}
                    />
                )}
            </View>
        );
    };

    const onSelectedImage = (index: number) => {
        setImageSilderIndex(index);
        setVisibleImage(true);
    };

    const ImageSilderView = () => {
        return (
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {imageSlider.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity
                                key={`imgsl${index}`}
                                onPress={() => onSelectedImage(index)}>
                                <View style={styles.imageListView}>
                                    <View style={styles.imageContainer3}>
                                        <Image
                                            source={{ uri: item.uri }}
                                            style={styles.imageList}></Image>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    };

    const renderViewMore = (onPress: any) => {
        return (
            <Text onPress={onPress} style={{ fontWeight: '700', color: Colors.blue, marginBottom: hp("1"), marginLeft: wp("2"), }}>View more</Text>
        )
    }
    const renderViewLess = (onPress: any) => {
        return (
            <Text onPress={onPress} style={{ fontWeight: '700', color: Colors.blue, marginBottom: hp("1"), marginLeft: wp("2") }}>View less</Text>
        )
    }

    const Description = ({ title, value }: any) => {
        return (
            <View style={{ width: "32%" }}>
                <Text style={{ fontWeight: 'bold', color: '#000000' }}>
                    {title}
                </Text>
                <Text style={{}}>
                    {value}
                </Text>
            </View>
        )
    }

    const BasicDetail = () => {
        return (
            <View style={styles.back}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Description
                        title="Email"
                        value={instituteData?.emailID}
                    />
                    <Description
                        title="Phone No"
                        value={instituteData?.phoneNo}
                    />
                    <Description
                        title="Mobile No"
                        value={instituteData?.mobileNo}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Description
                        title="Establish Date"
                        value={moment(instituteData?.estdDate).format('DD-MMM-YYYY')}
                    />
                    <Description
                        title="website"
                        value={instituteData?.website}
                    />
                    <Description
                        title="Campus Area"
                        value={instituteData?.campusArea}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Description
                        title="No of Faculty"
                        value={instituteData?.noOfFaculty}
                    />
                    <Description
                        title="No of Student"
                        value={instituteData?.noOfStudent}
                    />
                    <Description
                        title="Ranking"
                        value={instituteData?.overAllRanking}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Description
                        title="State"
                        value={instituteData?.stateName}
                    />
                    <Description
                        title="District"
                        value={instituteData?.districtName}
                    />
                    <Description
                        title="City"
                        value={instituteData?.cityName}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Description
                        title="Area Name"
                        value={instituteData?.areaName}
                    />
                    {/* <Description
                        title="Address"
                        value={instituteData?.landMark}
                    /> */}
                </View>
            </View>
        );
    };

    const AddressAndDetail = () => {
        return (
            <View style={styles.back}>
                <ViewMoreText
                    numberOfLines={2}
                    renderViewMore={renderViewMore}
                    renderViewLess={renderViewLess}
                >
                    <View style={{ width: wp("95"), }}>
                        <View style={{ flexDirection: 'row', marginTop: hp("0.5") }}>
                            <View style={{ flexDirection: 'row', marginLeft: wp("2"), marginTop: hp("0.025") }}><Entypo name="location" size={15} color={'black'} />
                                <Text style={{ fontWeight: '700', color: 'black', marginTop: hp("0.025") }}>{`   `}Address:-</Text></View>
                        </View>
                        <Text style={{ textAlign: 'justify', width: wp("95"), marginLeft: wp('1'), paddingHorizontal: wp("2"), }}>{`${instituteData?.instituteAddress}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: wp("95") }}>
                        <Text style={{ marginLeft: wp('2') }}>State:-{instituteData?.stateName}</Text>
                        <Text style={{ marginLeft: wp('2') }}>District:-{instituteData?.districtName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: wp("95") }}>
                        <Text style={{ marginLeft: wp('2') }}>
                            Area name:-{instituteData?.areaName}
                        </Text>
                        <Text style={{ marginLeft: wp('2') }}>
                            Landmark:-{instituteData?.landMark}
                        </Text>
                    </View>
                </ViewMoreText>
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size={'large'} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Header />
                    <View style={{ paddingHorizontal: 5 }}>
                        <ImageSilderView />
                        <BasicDetail />
                        <AddressAndDetail />
                        {roomView()}
                    </View>
                    {/* <Content />  */}
                </ScrollView>
            )}
            <ImageGallery />
        </SafeAreaView>
    );
};
export default InstituteDetails;
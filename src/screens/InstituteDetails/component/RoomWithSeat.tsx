import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { axiosRequest } from '../../../utils/ApiRequest';
import Url from '../../../utils/Url';
import Constant from '../../../utils/Constant';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import { default as style } from "../styles/style"
import useThemedStyles from '../../../config/theme/hooks/useThemedStyles';
import useTheme from '../../../config/theme/hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";
import AntDesign from 'react-native-vector-icons/AntDesign';

const RoomWithSeat: React.FC = ({ state }: any) => {
    const route: any = useRoute();
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState(false)
    const [instituteData, setInstituteData] = useState<any>([]);
    const [roomData, setRoomData] = useState<any>([]);
    const theme = useTheme();
    const styles = useThemedStyles(style);
    const { lstRoomSeatRespDTO } = route.params?.item;
    const { fromDate, toDate } = route.params;
    const room: any = route.params?.item;

    useEffect(() => {
        console.log(JSON.stringify(route.params, null, 1))
    }, []);


    const onPressSeat = (item: any) => {
        if (!item?.isFree) {
            showMessage({
                message: "Already Booked",
                type: "warning",
            });
        } else {
            console.log({ fromDate, toDate })
            navigation.navigate('SeatDetails', { seat: item, room, fromDate, toDate });
        }
    }


    const seatView = () => {

        return (
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 100 }}
                    data={lstRoomSeatRespDTO}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => { onPressSeat(item); }}
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                height: 80,
                                margin: 5,
                                borderColor: 'white',
                                borderRadius: 5,
                                backgroundColor: item?.isFree ? 'white' : '#dcdcdc',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.30,
                                shadowRadius: 4.65,

                                elevation: 8,
                            }}>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                backgroundColor: Colors.newblue,
                                borderTopRightRadius: 5,
                                borderTopLeftRadius: 5,
                                color: "#000000"
                            }}>
                                {`Seat ${item?.seatID}`}
                            </Text>

                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    paddingHorizontal: 3,
                                    fontSize: 13,

                                }}>
                                    {item?.isFree ? item?.commonName : "Booked"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    numColumns={4}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{
                    backgroundColor: Colors.newblue,
                    padding: 4,
                    flexDirection: 'row'
                }}>
                <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20 }} onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={22} color={'#000000'} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '800', color: '#000000' }}>
                            {room?.roomName}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>
                            {room?.roomTypeName}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>
                            {room?.lstRoomRateLinkRespDTO?.[0]?.rate}{' INR'}
                        </Text>
                    </View>
                </View>
            </View>
            {seatView()}

        </View>
    );
};
export default RoomWithSeat;
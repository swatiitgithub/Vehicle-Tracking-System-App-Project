import React, { ReactElement, useEffect, useState } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import GrievanceCard from '../../components/card/GrievanceCard';
import ActionBar from '../../components/ActionBar';
import ReviewCard from './reviewCard';
import Url from '../../utils/Url';
import { axiosRequest } from '../../utils/ApiRequest';
import Constant from '../../utils/Constant';
import { REVIEW_OBJECT } from '../../types';


const DATA = [
    {
        name: 'Shivendra Tewari',
        rating: '3',
        date: 'March 19,2023',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum autem eius officia veniam maiores, exercitationem voluptatem odit aspernatur deleniti assumenda iusto neque doloremque consequuntur expedita dolor ratione libero dolore quidem.',
    },
    {
        name: 'Rohit Kumar',
        rating: '4.5',
        date: 'February 26,2022',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum autem eius officia veniam maiores, exercitationem voluptatem odit aspernatur deleniti assumenda iusto neque doloremque consequuntur expedita dolor ratione libero dolore quidem.',
    },
    {
        name: 'Harsh Bharti',
        rating: '5',
        date: 'February 26,2022',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum autem eius officia veniam maiores, exercitationem voluptatem odit aspernatur deleniti assumenda iusto neque doloremque consequuntur expedita dolor ratione libero dolore quidem.',
    },
    {
        name: 'Ankit Verma',
        rating: '2',
        date: 'February 26,2022',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum autem eius officia veniam maiores, exercitationem voluptatem odit aspernatur deleniti assumenda iusto neque doloremque consequuntur expedita dolor ratione libero dolore quidem.',
    },
    {
        name: 'Akansha Srivastava',
        rating: '4',
        date: 'February 26,2022',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum autem eius officia veniam maiores, exercitationem voluptatem odit aspernatur deleniti assumenda iusto neque doloremque consequuntur expedita dolor ratione libero dolore quidem.',
    },

];


const onPress = (data: any): void => {
    console.log('onPress');
    console.log(data);
    let params: Object = {
        extraData: data
    };
}

const renderItemCard = ({ item }: any): ReactElement => {
    return <ReviewCard item={item} onPress={onPress} />;
}

const ReviewList = () => {
    const route: any = useRoute();
    const appCompID  = route.params;
    console.log("route data======================="+appCompID)
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<REVIEW_OBJECT[]>([]);
    let [pg, setPg] = useState(1);

    useEffect(() => {
        getReviewList();
    }, [])
    const navigation = useNavigation<any>();




    const getReviewList = (searchText: string = "", pageID: number = pg): void => {
        console.log("apppcompiddddddd======================="+appCompID)
        setLoading(true);

        const params = {
            appcompid: appCompID,
            userID: -1,
            formID: -1,
            type: 1,
            searchText
        }

        axiosRequest(Url.REVIEW_LIST, Constant.API_REQUEST_METHOD.POST, params).then(res => {
            console.log(res.data)
            const { data } = res.data;
            if (data.length > 0 && pageID > 1) {
                setData(data);
                // setData([...data, ...res.data]);
                // console.log([...data, ...res.data]);
            }
            else {
                setData(data);
            }

            setLoading(false);
            console.log(data)

        }).catch(err => {
            setLoading(false);
        });
    }

    return (
        <View style={styles.container}>
            <ActionBar
                title={"Review List"} />
            <FlatList
                data={data}
                renderItem={renderItemCard}
                keyExtractor={data => data.ratingID}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ReviewList;
import React, { ReactElement, useEffect } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../utils/Colors';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import GrievanceCard from '../../components/card/GrievanceCard';
import ActionBar from '../../components/ActionBar';
import { hp, wp } from '../../utils/Responsive';
import { Button } from 'native-base';


const ComplaintList = () => {
    const route: any = useRoute();
    const { subCategoryName, } = route.params.data.subItem;
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    useEffect(() => {
        getAllComplaintsData();
    }, [isFocused])

    const onPress = (data: any): void => {
        console.log('onPress');
        
        let params: Object = {
            complaintName: subCategoryName
        };
        console.log(params);
        navigation.navigate('ShowComplaint',data)
    }

    const renderItemCard = ({ item }: any): ReactElement => {
        return <GrievanceCard item={item} onPress={onPress} />
    }

    const [userComplaint, setUserComplaint] = React.useState();
    const getAllComplaintsData = async () => {
        let userComplaints: any = []
        userComplaints = await AsyncStorage.getItem('complaintData');
        if (userComplaints) {
            setUserComplaint(JSON.parse(userComplaints));
        }
    };
    //console.log(userComplaint);

    const FeedbackButton = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    width: wp("35"),
                    bottom: hp("4"),
                    right: wp("3"),
                }}>
                    
                <Button
                    colorScheme={'blue'}
                    size={'md'}
                    rounded={'3xl'}
                    onPress={() =>
                        navigation.navigate('CreateComplaints',)
                    }>
                    Add Complaint
                </Button>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ActionBar
                title={subCategoryName} />
            {/* <TouchableOpacity
                onPress={() => navigation.navigate('CreateComplaints')}>
                <IonIcons name='add-outline' size={50} color={Colors.orange} />
            </TouchableOpacity> */}
            <FlatList
                data={userComplaint}
                renderItem={renderItemCard}
                keyExtractor={item => item.mobileNo}
            />
            <FeedbackButton/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ComplaintList;
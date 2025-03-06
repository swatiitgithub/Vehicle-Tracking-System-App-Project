import React, { ReactElement, useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import BankDetailsCard from "./card/BankDetailsCard";
import { axiosRequest } from "../utils/ApiRequest";
import Constant from "../utils/Constant";
import { LIST_BG, LIST_OBJECT } from "../types";
import AccommodationCard from "./card/InstituteCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { wp } from "../utils/Responsive";
import Colors from "../utils/Colors";
import useTheme from "../config/theme/hooks/useTheme";
import useThemedStyles from "../../src/config/theme/hooks/useThemedStyles";
import ActionBar1 from "./ActionBar1";
import FilterOption from "./Filter";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const ListData: React.FC = () => {
    const [data, setData] = useState<LIST_OBJECT[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filterVisible, setFilterVisible] = useState<boolean>(true);
    const navigation = useNavigation();
    const route: any = useRoute();
    const { subCategoryName, categoryID, subCategoryID } = route.params.data.subItem;
    const backgroundList: LIST_BG = route.params.background;
    const [cinemaList, setCinemaList] = useState<any[]>([]);
    const styles = useThemedStyles(style);
    const theme = useTheme();
    const { response, userData } = useSelector(
        (state: RootState) => state.user,
    );
     let [pg, setPg] = useState(1);

    useEffect(() => {
        getInstituteList();
    }, []);
    const params ={
        roomCapacityTo:"1000",
        roomRateTo:"9999",
        roomTypeID:"-1",
        fromDate:"2000-10-04",
        toDate:new Date(),
        slotID:"-1",
        roomRateFrom:"0",
        roomCapacityfrom:"0"
    }
    const getInstituteList = (searchText:string="",filters:any=params) => {
        setLoading(true)
        const params = {
            instituteID: "-1",
            searchText: searchText,
            mobileNo: "",
            emailID: "",
            phoneNo: "",
            stateID: "-1",
            districtID: "-1",
            cityID: "-1",
            areaID: "-1",
            smallerESTDDate: new Date(),
            smallerThanRank: "",
            greatorThanFaculty: "",
            greatorThanStudent: "",
            roomTypeID: filters?.roomTypeID,
            roomCapacityfrom: filters?.roomCapacityfrom,
            roomCapacityTo: filters?.roomCapacityTo,
            roomRateFrom: filters?.roomRateFrom,
            roomRateTo: filters?.roomRateTo,
            userID: "-1",
            formID: "-1",
            type: "1",
            fromDate: filters?.fromDate,
            toDate: filters?.toDate,
            slotID: filters?.slotID,
        }
        console.log(params)
        axiosRequest(`/Institute/GetInstituteList`, Constant.API_REQUEST_METHOD.POST, params).then(res => {
            // console.log(JSON.stringify(res.data,null,1))
            
            setData(res?.data?.data?.institutelist2s)
            setLoading(false);
            
        }).catch(err => {
            setLoading(false);
        });
    }

    const onPress = (data: any): void => {
        navigation.navigate('InstituteDetails', data)
    }

    const renderItemCard = ({ item, index }: any): ReactElement => {
        switch (subCategoryName) {

            case 'BANK':
                return <BankDetailsCard item={item} onPress={onPress} />;
            default:
                return <AccommodationCard item={item} onPress={onPress} />;
        }
    }

    

    const onSearch = (value: any): void => {
        console.log(value)
        if (value.length > 0) {
            getInstituteList(value);
        } else {
            getInstituteList();
        }
    }
    const onFilter = (filter: any): void => {
        // console.log("filters" + JSON.stringify(filter))
            getInstituteList("",filter);
    }

    const onRefresh = () => {
        pg = 1;
        getInstituteList();
    }
    const onLoadMore = (value: number): void => {
        pg = ++value;
        setPg(pg);
        if (data.length >= 25)
            getInstituteList();
    }

    const RenderWithBackground = ({ children }: any): ReactElement => {
        return (
            <>
                {backgroundList.bgImage ?
                    <ImageBackground style={{ flex: 1 }} source={backgroundList.bg}>
                        {children}
                    </ImageBackground>
                    :
                    <View style={{ flex: 1, backgroundColor: backgroundList.bg }}>
                        {children}
                    </View>
                }
            </>

        )
    }


    const EmptyListMessage = (): ReactElement => {
        return (
            // Flat List Item
            <Text
                style={styles.emptyListStyle}
                onPress={() => getInstituteList()}>
                {''}
            </Text>
        );
    };

    const renderLoader = () => {
        return (
            (data.length) < 25 ? null :
                <TouchableOpacity
                    onPress={() => onLoadMore(pg)}
                    style={{ paddingTop: 10, alignSelf: 'flex-end', flexDirection: 'row', marginRight: wp('4'), elevation: 10 }}>
                    <FontAwesome name='chevron-down' size={18} color={Colors.blue}></FontAwesome>
                    <Text style={{ paddingHorizontal: 5, fontWeight: '700', color: Colors.blue, fontSize: 16 }}>{'More'}</Text>
                </TouchableOpacity>

        );
    };


    return (
        <>
            <ImageBackground style={{ flex: 1 }} source={backgroundList.bg}>
                <ActionBar1
                    title={`Institute List`}
                    search={true}
                    onCloseSearch={() => getInstituteList()}
                    onChangeText={onSearch}
                    containerStyle={{
                        backgroundColor:'#5263B7'
                    }}
                />
                
                {filterVisible&&<FilterOption onChange={(value: any) => onFilter(value)} />}
                <FlatList
                    data={data}
                    renderItem={renderItemCard}
                    contentContainerStyle={{
                        paddingBottom: 30
                    }}
                    refreshing={loading}
                    onRefresh={() => onRefresh()}
                    ListEmptyComponent={EmptyListMessage}
                    // ListFooterComponent={renderLoader}
                    // onEndReached={renderLoader}
                    onEndReachedThreshold={0}
                    onScroll={(e)=>setFilterVisible(false)}
                    onMomentumScrollEnd={()=>setFilterVisible(true)}
                //onEndReachedThreshold={0}
                />
            </ImageBackground>
        </>
    )
}


const style = (theme: any) => StyleSheet.create({

    textValue: {
        fontSize: 14,
        paddingBottom: 4,
    },

    descBox: {
        flexDirection: 'row',
        marginTop: 5,
    },
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
    },
})

export default ListData;
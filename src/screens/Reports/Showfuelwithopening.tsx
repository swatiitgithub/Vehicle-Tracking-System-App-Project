import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Button,
    Alert,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native';
import moment from 'moment';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import Images from '../../utils/Images';
import { axiosRequest } from '../../utils/ApiRequest';
import Constant from '../../utils/Constant';
import Url from '../../utils/Url';

function Showfuelwithopening(params: any) {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState('');
    const [originalData, setOriginalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);



    useEffect(() => {
        fetchVehicleTrackData();
    }, []);

    const handleSearch = (text: any) => {
        setSearchQuery(text);
        const filtered = data.filter((item: any) => {
            return (
                (item.vehicleNo && item.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
                (item.vehicleType && item.vehicleType.toLowerCase().includes(text.toLowerCase()))

            );
        });
        const sorted = filtered.sort((a: any, b: any) => {
            const aMatch = (
                (a.vehicleNo && a.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
                (a.vehicleType && a.vehicleType.toLowerCase().includes(text.toLowerCase()))
            );
            const bMatch = (
                (b.vehicleNo && b.vehicleType.toLowerCase().includes(text.toLowerCase())) ||
                (b.vehicleType && b.vehicleType.toLowerCase().includes(text.toLowerCase()))
            );
            return bMatch - aMatch;
        });

        setFilteredData(sorted);
    };


    const fetchVehicleTrackData = () => {
        setIsLoading(true);
        // const url = 'http://103.12.1.132:8166/api/VehicleMoving/VehicleMovingTrackStatusdetnew';
        // console.log(JSON.stringify(params?.route?.params,null,1))
        const requestBody =params?.route?.params;
         axiosRequest(Url.Fuelconsumptionwithopening, Constant.API_REQUEST_METHOD.POST, requestBody)
              .then((response) => {
                console.log('Response', response?.data);
                setData(response?.data);
                setFilteredData(response?.data);
              })
              .catch((error) => {
                console.error('Error:', error.message);
                Alert.alert('Error', `Failed to fetch data: ${error.message}`);
              })
              .finally(() => {
                setIsLoading(false);
              });
          };
    
    return (
        <View style={styles.container}>
            <ActionBar title="Show Fuel Consp with Opening" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholder="Search"
                />
                <TouchableOpacity style={styles.searchIcon}>
                    <Feather name="search" size={18} color="#888" />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading data...</Text>
                </View>
            ) : (
                <ScrollView>
                    <ScrollView horizontal={true}>
                        <View style={styles.table}>
                            {/* Header Row */}
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeader}><Image source={Images.Starttime} style={styles.icon} />Date</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Vehicle No</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Type</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Starttime} style={styles.icon} />Duration</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Distance} style={styles.icon} />Distance (km)</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Speed} style={styles.icon} />Fuel (km/hr)</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Speed} style={styles.icon} />Fuel (ltr/hr)</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Fuel} style={styles.icon} />Fuel Cons</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Fuel} style={styles.icon} />Fuel Allot</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Balance} style={styles.icon} />Fuel Bal</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Balance} style={styles.icon} />Opening Bal</Text>
                            </View>

                            {/* Data Rows */}
                            {filteredData.length > 0 ? (
                                filteredData.map((item: any, index: any) => (
                                    <View style={styles.tableRow} key={index}>
                                        <Text style={styles.tableCell}>
                                            {new Date(item.trackDate).getFullYear()} {new Date(item.trackDate).getDate()}{' '}
                                            {new Date(item.trackDate).toLocaleString('default', { month: 'short' })}
                                        </Text>
                                        <Text style={styles.tableCell}>{item.vehicleNo}</Text>
                                        <Text style={styles.tableCell}>{item.vehicleType}</Text>
                                        <Text style={styles.tableCell}>{item.running}</Text>
                                        <Text style={styles.tableCell}>{item.distanceKM}</Text>
                                        <Text style={styles.tableCell}>{item.kmPerLitre}</Text>
                                        <Text style={styles.tableCell}>{item.litrePerHr}</Text>
                                        <Text style={styles.tableCell}>{item.fuelConsumption}</Text>
                                        <Text style={styles.tableCell}>{item.fuelAlloted}</Text>
                                        <Text style={styles.tableCell}>{item.fuelBalance}</Text>
                                        <Text style={styles.tableCell}>{item.openingBalance}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text>No data found</Text>
                            )}
                        </View>
                    </ScrollView>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    // header: {
    //   fontSize: 24,
    //   fontWeight: 'bold',
    //   marginBottom: 20,
    //   color: '#009688',
    //   textAlign: 'center',
    // },
    table: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#87CEEB',
        paddingVertical: 12,
    },
    tableHeader: {
        fontWeight: 'bold',
        fontSize: 14,
        width: 100,
        textAlign: 'center',
        color: "#1B3B5F",
    },
    tableCell: {
        fontSize: 12,
        width: 100,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    searchInput: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingLeft: 10,
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
});

export default Showfuelwithopening;

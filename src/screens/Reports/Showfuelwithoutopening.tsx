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

function Showfuelwithoutopening(params: any) {
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
                (item.vehicleName && item.vehicleName.toLowerCase().includes(text.toLowerCase()))

            );
        });
        const sorted = filtered.sort((a: any, b: any) => {
            const aMatch = (
                (a.vehicleNo && a.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
                (a.vehicleName && a.vehicleName.toLowerCase().includes(text.toLowerCase()))
            );
            const bMatch = (
                (b.vehicleNo && b.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
                (b.vehicleName && b.vehicleName.toLowerCase().includes(text.toLowerCase()))
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
           axiosRequest(Url.Fuelconsumptionwithoutopening, Constant.API_REQUEST_METHOD.POST, requestBody)
                .then((response) => {
                //   console.log('Response', response?.data);
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
            <ActionBar title="Show Fuel Consp without Opening" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
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
                                <Text style={styles.tableHeader}><Image source={Images.date} style={styles.icon} />Date</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Vehicle No</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Driver} style={styles.icon} />Vehicle Name</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Fuel} style={styles.icon} />Fuel Alloted</Text>
                                <Text style={styles.tableHeader}><Image source={Images.km} style={styles.icon} />Km / Litre</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Starttime} style={styles.icon} />Tot Days</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Fuel} style={styles.icon} />Total Fuel Alltd</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Distance} style={styles.icon} />Actual Cons.</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Distance} style={styles.icon} />Distance Allot</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Distance} style={styles.icon} />Actual Dist.</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Balance} style={styles.icon} />Balance Dist.</Text>
                                <Text style={styles.tableHeader}><Image source={Images.Balance} style={styles.icon} />Balance Fuel</Text>
                            </View>

                            {/* Data Rows */}
                            {filteredData.length > 0 ? (
                                filteredData.map((item: any, index: any) => (
                                    <View style={styles.tableRow} key={index}>
                                        <Text style={styles.tableCell}>
                                            {new Date(item.trackDate).toLocaleDateString('default', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </Text>
                                        <Text style={styles.tableCell}>{item.vehicleNo}</Text>
                                        <Text style={styles.tableCell}>{item.vehicleName}</Text>
                                        <Text style={styles.tableCell}>{item.fuelAlloted}</Text>
                                        <Text style={styles.tableCell}>{item.kmPerLitre}</Text>
                                        <Text style={styles.tableCell}>{item.totDays}</Text>
                                        <Text style={styles.tableCell}>{item.totFuelAllot}</Text>
                                        <Text style={styles.tableCell}>{item.actualFuelCons}</Text>
                                        <Text style={styles.tableCell}>{item.distanceAsAllot}</Text>
                                        <Text style={styles.tableCell}>{item.actualDistance}</Text>
                                        <Text style={styles.tableCell}>{item.balanceDist}</Text>
                                        <Text style={styles.tableCell}>{item.balanceFuel}</Text>
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

export default Showfuelwithoutopening;

import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    ActivityIndicator,
} from 'react-native';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import Images from '../../utils/Images';
import { axiosRequest } from '../../utils/ApiRequest';
import Url from '../../utils/Url';
import Constant from '../../utils/Constant';

function Showprobablewire(params: any) {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [originalData, setOriginalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchVehicleTrackData();
    }, []);

    const handleSearch = (text: any) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setData(originalData);
        } else {
            const filteredData = originalData.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(text.toLowerCase())
                )
            );
            setData(filteredData);
        }
    };

    const fetchVehicleTrackData = () => {
        setIsLoading(true);
        // const url = 'http://103.12.1.132:8166/api/VehicleMoving/VehicleMovingTrackStatusdetnew';
        // console.log(JSON.stringify(params?.route?.params,null,1))
        const requestBody = params?.route?.params;
        axiosRequest(Url.Probablewiretempering, Constant.API_REQUEST_METHOD.POST, requestBody)
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
            <ActionBar title="Show Probable with Tampering" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
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
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}><Image source={Images.date} style={styles.icon} />Date</Text>
                            <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Vehicle No</Text>
                            <Text style={styles.tableHeader}><Image source={Images.Distance} style={styles.icon} />Department</Text>
                            <Text style={styles.tableHeader}><Image source={Images.deviceid} style={styles.icon} />Device ID</Text>
                        </View>

                        {filteredData.length > 0 ? (
                            filteredData.map((item: any, index: any) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>
                                        {item.trackDate ? new Date(item.trackDate).toLocaleDateString() : 'N/A'}
                                    </Text>
                                    <Text style={styles.tableCell}>{item.vehicleNo || 'N/A'}</Text>
                                    <Text style={styles.tableCell}>{item.department || 'N/A'}</Text>
                                    <Text style={styles.tableCell}>{item.devId || 'N/A'}</Text>
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
        paddingBottom: 8,
      },
      tableCell: {
        fontSize: 12,
        width: 100,
        textAlign: 'center',
        paddingTop: 8,
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
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    noDataText: {
        fontSize: 16,
        color: '#888',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Showprobablewire;

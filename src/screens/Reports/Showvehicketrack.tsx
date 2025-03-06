import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Images from '../../utils/Images';
import { axiosRequest } from '../../utils/ApiRequest';
import Constant from '../../utils/Constant';
import Url from '../../utils/Url';

function ShowVehicleTrack(params: any) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVehicleTrackData();
  }, []);

  const handleSearch = (text: any) => {
    setSearchQuery(text);
    const filtered = data.filter((item: any) => {
      return (
        (item.vehicleNo && item.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
        (item.empName && item.empName.toLowerCase().includes(text.toLowerCase())) 
        
      );
    });
    const sorted = filtered.sort((a: any, b: any) => {
      const aMatch = (
        (a.vehicleNo && a.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
        (a.empName && a.empName.toLowerCase().includes(text.toLowerCase()))
      );
      const bMatch = (
        (b.vehicleNo && b.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
        (b.empName && b.empName.toLowerCase().includes(text.toLowerCase()))
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
     axiosRequest(Url.Vehicletrack, Constant.API_REQUEST_METHOD.POST, requestBody)
          .then((response) => {
            // console.log('Response', response?.data);
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
      <ActionBar title="Show Vehicle Track" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
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
                <Text style={styles.tableHeader}><Image source={Images.Driver} style={styles.icon} />Driver</Text>
                <Text style={styles.tableHeader}><Image source={Images.Mobile} style={styles.icon} />Mobile</Text>
                <Text style={styles.tableHeader}><Image source={Images.Department} style={styles.icon} />Department</Text>
                <Text style={styles.tableHeader}><Image source={Images.Vehicletype} style={styles.icon} />Type</Text>
                <Text style={styles.tableHeader}><Image source={Images.Distance} style={styles.icon} />Distance</Text>
                <Text style={styles.tableHeader}><Image source={Images.Running} style={styles.icon} />Running</Text>
                <Text style={styles.tableHeader}><Image source={Images.Idle} style={styles.icon} />Idle</Text>
                <Text style={styles.tableHeader}><Image source={Images.Starttime} style={styles.icon} />Start Time</Text>
                <Text style={styles.tableHeader}><Image source={Images.Starttime} style={styles.icon} />End Time</Text>
                <Text style={styles.tableHeader}><Image source={Images.Fuel} style={styles.icon} />Fuel Consume</Text>
                <Text style={styles.tableHeader}><Image source={Images.Fuel} style={styles.icon} />Fuel Allotted</Text>
                <Text style={styles.tableHeader}><Image source={Images.Balance} style={styles.icon} />Opening Balance</Text>
              </View>

              {/* Data Rows */}
              {filteredData.length > 0 ? (
                filteredData.map((item: any, index: any) => (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>
                      {new Date(item.trackDate).toLocaleDateString('default', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                    <Text style={styles.tableCell}>{item.vehicleNo}</Text>
                    <Text style={styles.tableCell}>{item.driverName}</Text>
                    <Text style={styles.tableCell}>{item.mobileNo}</Text>
                    <Text style={styles.tableCell}>{item.department}</Text>
                    <Text style={styles.tableCell}>{item.vehicleType}</Text>
                    <Text style={styles.tableCell}>{item.distanceKM}</Text>
                    <Text style={styles.tableCell}>{item.running}</Text>
                    <Text style={styles.tableCell}>{item.idle}</Text>
                    <Text style={styles.tableCell}>{item.startTime}</Text>
                    <Text style={styles.tableCell}>{item.endTime}</Text>
                    <Text style={styles.tableCell}>{item.fuelConsumption}</Text>
                    <Text style={styles.tableCell}>{item.fuelAlloted}</Text>
                    <Text style={styles.tableCell}>{item.openingBal}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No data found</Text>
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
    color: "#87CEEB",
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
  noDataText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#999',
  },
});

export default ShowVehicleTrack;

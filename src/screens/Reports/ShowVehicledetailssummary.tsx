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
  Image,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import Images from '../../utils/Images';
import { axiosRequest } from '../../utils/ApiRequest';
import Constant from '../../utils/Constant';
import Url from '../../utils/Url';

function ShowVehicledetailssummary(params: any) {
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
    // const [isLoading, setIsLoading] = useState(false);
    // const [data, setData] = useState(null);
  
    // Assuming params?.route?.params holds the request body
    const requestBody = params?.route?.params;
  
    setIsLoading(true);
  
    axiosRequest(Url.Vehicledetails, Constant.API_REQUEST_METHOD.POST, requestBody)
      .then((response) => {
        // console.log('Response:========', response?.data);
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
      <ActionBar title="Show Vehicle Details Summary" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
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
                <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Vehicle Model</Text>
                <Text style={styles.tableHeader}><Image source={Images.Driver} style={styles.icon} />Driver</Text>
                <Text style={styles.tableHeader}><Image source={Images.deviceid} style={styles.icon} />Device ID</Text>
                <Text style={styles.tableHeader}><Image source={Images.Distance} style={styles.icon} />Distance</Text>
                <Text style={styles.tableHeader}><Image source={Images.Running} style={styles.icon} />Running</Text>
                <Text style={styles.tableHeader}><Image source={Images.Idle} style={styles.icon} />Idle</Text>
                <Text style={styles.tableHeader}><Image source={Images.stop} style={styles.icon} />Stop</Text>
                <Text style={styles.tableHeader}><Image source={Images.Speed} style={styles.icon} />Speed (Avg)</Text>
                <Text style={styles.tableHeader}><Image source={Images.Speed} style={styles.icon} />Speed (Max)</Text>
                <Text style={styles.tableHeader}><Image source={Images.Starttime} style={styles.icon} />Start Time</Text>
                <Text style={styles.tableHeader}><Image source={Images.Starttime} style={styles.icon} />End Time</Text>
              </View>

              {/* Data Rows */}
              {filteredData.length > 0 ? (
                filteredData.map((item: any, index: any) => (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>
                      {new Date(item.trackDate).getFullYear()} {new Date(item.trackDate).getDate()} {new Date(item.trackDate).toLocaleString('default', { month: 'short' })}
                    </Text>
                    <Text style={styles.tableCell}>{item.vehicleNo}</Text>
                    <Text style={styles.tableCell}>{item.modelNo}</Text>
                    <Text style={styles.tableCell}>{item.driverName}</Text>
                    <Text style={styles.tableCell}>{item.devId}</Text>
                    <Text style={styles.tableCell}>{item.distanceKM}</Text>
                    <Text style={styles.tableCell}>{item.running}</Text>
                    <Text style={styles.tableCell}>{item.idle}</Text>
                    <Text style={styles.tableCell}>{item.stopTime}</Text>
                    <Text style={styles.tableCell}>{item.avgSpeed}</Text>
                    <Text style={styles.tableCell}>{item.maxSpeed}</Text>
                    <Text style={styles.tableCell}>{item.startTime}</Text>
                    <Text style={styles.tableCell}>{item.endTime}</Text>
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

export default ShowVehicledetailssummary;

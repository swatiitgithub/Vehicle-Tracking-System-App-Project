import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import axios from 'axios';
import { axiosRequest } from '../../utils/ApiRequest';
import Constant from '../../utils/Constant';
import Url from '../../utils/Url';
import Feather from 'react-native-vector-icons/Feather';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Images from '../../utils/Images';

// const API_URL = 'http://103.12.1.132:8166/api/NTRead/GetRunningStatus';
const { width: screenWidth } = Dimensions.get('window');

const Stooped = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      // Directly use the path parameter in the URL
      const url = 'https://vtsapi.mssplonline.in/api/NTRead/GetRunningStatus/stat=stop';
  
      // Make the GET request using axios
      const response = await axios.get(url);
  
      if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        setData(response.data.data);
        setFilteredData(response.data.data);
        console.log("Data received:", response.data.data);
      } else {
        console.error('No data found or data is empty');
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);  // Log specific error message
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    // Filter the data based on the search query
    const filtered = data.filter((item: any) => {
      // Search in vehicleNo, empName, and other fields
      return (
        (item.vehicleNo && item.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
        (item.empName && item.empName.toLowerCase().includes(text.toLowerCase())) ||
        (item.Department && item.Department.toLowerCase().includes(text.toLowerCase())) ||
        (item.vehicleTypename && item.vehicleTypename.toLowerCase().includes(text.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  };

  const renderTableHeader = () => (
    <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.Serial} style={styles.icon} />Sr No</Text>
      <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.Vehicle} style={styles.icon} />Vehicle No</Text>
      <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.Driver} style={styles.icon} />Driver</Text>
      <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.Driver} style={styles.icon} />Mobile No</Text>
      <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.Department} style={styles.icon} />Department</Text>
      <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.Vehicletype} style={styles.icon} />Vehicle Type</Text>
      <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.status} style={styles.icon} />Status</Text>
      <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.Speed} style={styles.icon} />Speed</Text>
      <Text style={[styles.headerText, styles.headerColumn]}><Image source={Images.Fuel} style={styles.icon} />Fuel</Text>
    </View>
  );

  const renderTableRow = (item: any, index: any) => (
    <View style={styles.row}>
      <Text style={[styles.cellText, styles.cellColumn]}>{index + 1}</Text>
      <Text style={[styles.cellText, styles.cellColumn]}>{item.vehicleNo }</Text>
      <Text style={[styles.cellText, styles.cellColumn]}>{item.empName}</Text>
      <Text style={[styles.cellText, styles.cellColumn]}>{item.empMobileNo}</Text>
      <Text style={[styles.cellText, styles.cellColumn]}>{item.departmentName}</Text>
      <Text style={[styles.cellText, styles.cellColumn]}>{item.vehicleTypename }</Text>
      <Text style={[styles.cellText, styles.cellColumn]}>{item.flag}</Text>
      <Text style={[styles.cellText, styles.cellColumn]}>{item.speed }</Text>
      <Text style={[styles.cellText, styles.cellColumn]}>{item.fuel && !isNaN(item.fuel) ? item.fuel.toFixed(2) : 'N/A'}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActionBar title="Stopped Vehicle" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
      {/* Search bar */}
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

      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.headerContainer}>{renderTableHeader()}</View>
          <ScrollView>
            {/* Table Rows */}
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => renderTableRow(item, index)}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    color: '#003366',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
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
  headerContainer: {
    backgroundColor: '#87CEEB',
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerText: {
    color: '#1B3B5F',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  headerColumn: {
    width: 120, // Set fixed width for each column
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    height: 50,
  },
  cellText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
  },
  cellColumn: {
    width: 120, 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 18,
    color: '#555',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default Stooped;

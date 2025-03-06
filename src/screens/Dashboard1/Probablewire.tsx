import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Image } from 'react-native';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import Images from '../../utils/Images';

type DataItem = {
  srno?: string;
  vehicleNo?: string;
  departmentName?: string;
  date?: string;
};

function Probablewire() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  const fetchData = async () => {
    try {
      const currentDate = new Date();
  
      // Format date as YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(currentDate.getDate()).padStart(2, '0');
  
      const formattedDate = `${year}-${month}-${day}`;
  
      // Construct the URL with the formatted date
      const url = `https://vtsapi.mssplonline.in/api/NTRead/ProbWireTamp/date=${formattedDate}`;
      console.log('Requesting data from:', url);
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log('API Response:', json);
  
      if (json.data) {
        setData(json.data); 
      } else {
        throw new Error('Data not found in response');
      }
    } catch (error:any) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = data.filter((item) => {
      return (
        (item.vehicleNo && item.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
        (item.departmentName && item.departmentName.toLowerCase().includes(text.toLowerCase())) ||
        (item.date && item.date.toLowerCase().includes(text.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActionBar title="Probable Wire" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={styles.loadingText}>Loading data, please wait...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActionBar title="Probable Wire" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
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
      <ScrollView>
        <ScrollView horizontal={true}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}><Image source={Images.Serial} style={styles.icon} />Sr No</Text>
              <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Vehicle No</Text>
              <Text style={styles.tableHeader}><Image source={Images.Department} style={styles.icon} />Department</Text>
              <Text style={styles.tableHeader}><Image source={Images.date} style={styles.icon} />Time Stamp in Last Signal</Text>
            </View>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{item.srno || '-'}</Text>
                  <Text style={styles.tableCell}>{item.vehicleNo || '-'}</Text>
                  <Text style={styles.tableCell}>{item.departmentName || '-'}</Text>
                  <Text style={styles.tableCell}>{item.date || '-'}</Text>
                </View>
              ))
            ) : (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>No Data Available</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  table: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 120,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 12,
    width: 120,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default Probablewire;

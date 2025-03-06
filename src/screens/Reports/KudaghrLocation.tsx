import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';

const KudaghrLocation = () => {
  // State for checkboxes
  const [allKudaghrChecked, setAllKudaghrChecked] = useState(false);
  const [wardwiseKudaghrChecked, setWardwiseKudaghrChecked] = useState(false);

  // State for dropdown data and kudaghr locations
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  const [kudaghrLocations, setKudaghrLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Coordinates for Kanpur, India
  const kanpurLocation = {
    latitude: 26.4499,
    longitude: 80.3319,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Fetch data for "All Kudaghr" checkbox
  const getAllData = () => {
    const collectData = {
      orderby: "",
      pageNo: 0,
      pageSize: 0,
      intnotnullvalue1: 0,
      userId: "",
      str1: "",
      str2: "",
      str3: "",
      str4: "",
      str5: "",
      intvalue1: 0,
      intvalue2: 0,
      intvalue3: 0,
      intvalue4: 0,
      intnotnullvalue2: 0,
      intnotnullvalue3: 0,
      date1: new Date().toISOString(),
      date2: new Date().toISOString(),
      date3: new Date().toISOString(),
      date4: new Date().toISOString(),
      dec1: 0,
      dec2: 0,
      dec3: 0,
      dec4: 0,
      flag: false,
      data: "",
      success: true,
      error: "",
      selectPerindex: 0,
      show: true,
    };

    setLoading(true);
    axios
      .post('http://103.12.1.132:8166/api/Dashboard/GetAllBins', collectData)
      .then((res) => {
        if (res?.data) {
          const allBin = res?.data?.rowCount;
          const data = res?.data?.data;

          if (data && data.length > 0) {
            const arr = data.map((item:any) => ({
              latitude: item.latitude,
              longitude: item.longitude,
              id: item.binLocID,
              binLocName: item.locationName, // Full address from API
              binLocID: item.binLocID,
              icon: "https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-green-wheelie-bin-clip-art-png-image_11591537.png",
            }));

            setKudaghrLocations(arr);
          } else {
            console.error("No bin data found.");
          }
        } else {
          console.error(
            "API request failed:",
            res?.data?.message || "Unknown error"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching bin data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch data for dropdown (Wardwise Kudaghr)
  const getWard = () => {
    const collectData = {
      where: "",
      orderby: "",
      pageNo: 0,
      pageSize: 0,
      intnotnullvalue1: 0,
      userId: "",
      parameterValues: [""],
      str1: "",
      str2: "",
      str3: "",
      str4: "",
      str5: "",
      intvalue1: 0,
      intvalue2: 0,
      intvalue3: 0,
      intvalue4: 0,
      intnotnullvalue2: 0,
      intnotnullvalue3: 0,
      date1: new Date().toISOString(),
      date2: new Date().toISOString(),
      date3: new Date().toISOString(),
      date4: new Date().toISOString(),
      dec1: 0,
      dec2: 0,
      dec3: 0,
      dec4: 0,
      flag: true,
      data: "",
      success: true,
      error: "",
      selectPerindex: 0,
      show: true,
    };

    setLoading(true);
    axios
      .post('http://103.12.1.132:8166/api/AreaWardMaster/GetAreaWardMaster', collectData)
      .then((res) => {
        if (res?.data) {
          const arr = res.data.data.map((item:any) => ({
            label: item.areaName,
            value: item.areaID,
          }));
          setDropdownData(arr);
        } else {
          console.error("No dropdown data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching dropdown data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch data for Wardwise Kudaghr when a dropdown value is selected
  const getWardMap = (data:any) => {
    const collectData = {
      where: data?.label,
      orderby: "",
      pageNo: 0,
      pageSize: 0,
      intnotnullvalue1: 0,
      userId: "string",
      parameterValues: [data?.value, data?.label],
      str1: "",
      str2: "",
      str3: "",
      str4: "",
      str5: "",
      intvalue1: 0,
      intvalue2: 0,
      intvalue3: 0,
      intvalue4: 0,
      intnotnullvalue2: 0,
      intnotnullvalue3: 0,
      date1: new Date().toISOString(),
      date2: new Date().toISOString(),
      date3: new Date().toISOString(),
      date4: new Date().toISOString(),
      dec1: 0,
      dec2: 0,
      dec3: 0,
      dec4: 0,
      flag: true,
      data: "",
      success: true,
      error: "",
      selectPerindex: 0,
      show: true,
    };

    setLoading(true);
    axios
      .post('http://103.12.1.132:8166/api/Dashboard/GetMapBinsWardWise', collectData)
      .then((res) => {
        if (res?.data) {
          const data = res?.data?.data;

          if (data && data.length > 0) {
            const arr = data.map((item:any) => ({
              latitude: item.latitude,
              longitude: item.longitude,
              id: item.binLocID,
              binLocName: item.binLocName, // Full address from API
              binLocID: item.binLocID,
              icon: "https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-green-wheelie-bin-clip-art-png-image_11591537.png",
            }));

            setKudaghrLocations(arr);
          } else {
            console.error("No bin data found.");
          }
        } else {
          console.error(
            "API request failed:",
            res?.data?.message || "Unknown error"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching wardwise bin data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Effect to fetch data when "All Kudaghr" is checked
  useEffect(() => {
    if (allKudaghrChecked) {
      getAllData();
    } else {
      setKudaghrLocations([]); // Clear Kudaghr locations when unchecked
    }
  }, [allKudaghrChecked]);

  // Effect to fetch data when "Wardwise Kudaghr" is checked
  useEffect(() => {
    if (wardwiseKudaghrChecked) {
      getWard(); // Fetch dropdown data
    } else {
      setDropdownData([]); // Clear dropdown data when unchecked
      setSelectedDropdownValue(null); // Reset selected value
    }
  }, [wardwiseKudaghrChecked]);

  // Effect to fetch wardwise data when a dropdown value is selected
  useEffect(() => {
    if (selectedDropdownValue) {
      const selectedItem:any = dropdownData.find((item:any) => item.value === selectedDropdownValue);
      if (selectedItem) {
        getWardMap({ label: selectedItem.label, value: selectedItem.value });
      }
    }
  }, [selectedDropdownValue]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <ActionBar
              title="Kudaghr Location"
              containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }}
            />

      {/* Checkbox Container */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => {
            setAllKudaghrChecked(!allKudaghrChecked);
            setWardwiseKudaghrChecked(false); // Uncheck the other checkbox
          }}
        >
          <View style={[styles.checkboxBox, allKudaghrChecked && styles.checkedBox]}>
            {allKudaghrChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>All Kudaghr</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => {
            setWardwiseKudaghrChecked(!wardwiseKudaghrChecked);
            setAllKudaghrChecked(false); // Uncheck the other checkbox
          }}
        >
          <View style={[styles.checkboxBox, wardwiseKudaghrChecked && styles.checkedBox]}>
            {wardwiseKudaghrChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Wardwise Kudaghr</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Input Field (Visible only when Wardwise Kudaghr is checked) */}
      {wardwiseKudaghrChecked && (
        <View style={styles.dropdownContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#007BFF" />
          ) : (
            <Picker
              selectedValue={selectedDropdownValue}
              onValueChange={(itemValue) => setSelectedDropdownValue(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a zone" value={null} />
              {dropdownData.map((item:any, index:any) => (
                <Picker.Item key={index} label={item.label} value={item.value} />
              ))}
            </Picker>
          )}
        </View>
      )}

      {/* Map */}
      <MapView style={styles.map} initialRegion={kanpurLocation}>
        {/* Markers for Kudaghr Locations */}
        {kudaghrLocations.map((location:any, index:any) => (
          <Marker
            key={index}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.binLocName} // Title of the marker
            description={location.binLocName} // Full address displayed in the description
          >
            <Image
              source={{ uri: location.icon }} // Use the icon URL from the API response
              style={{ width: 24, height: 24 }} // Reduced size for the icon
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  dropdownContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
});

export default KudaghrLocation;
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import axios from 'axios';

const Tracking = () => {
  const [vehicles, setVehicles] = useState([]);
  const [center, setCenter] = useState({
    latitude: 26.4499, // Latitude for Kanpur, Uttar Pradesh
    longitude: 80.3319, // Longitude for Kanpur, Uttar Pradesh
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getDashData = () => {
    const collectData = {
      fencId: null,
      fenceName: null,
      lsVehType: [], // Replace with actual vehicle types if needed
      lsVehNos: [],  // Replace with actual vehicle numbers if needed
      dateSaveFr: new Date().toISOString(),
      dateSaveTo: new Date().toISOString(),
    };

    axios.post('http://103.12.1.132:8166/api/NTRead/GetDashData', collectData)
      .then((res) => {
        const arr = res?.data?.data?.listNTSumm.map((item: any) => ({
          vehicleNo: item.vehicleno || "No ID",
          lat: item.lattitude,
          lng: item.longitude,
          id: item.id,
          speed: item.speed,
          tracktime: formatTrackTime(item.tracktime),
          departmentname: item.departmentname,
          empName: item.empName,
          vehicleTypename: item.vehicleTypename,
          icon: item.speed === 0
            ? "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-red-truck-transportation-png-image_11507611.png" // Smaller red truck icon
            : "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-green-truck-transport-png-image_11508688.png", // Smaller green truck icon
        }));
        setVehicles(arr);
        setCenter(calculateCenter(arr));

        if (arr.length > 0) {
          adjustZoomLevel(arr);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const formatTrackTime = (trackTime: any) => {
    // Implement your time formatting logic here
    return trackTime;
  };

  const calculateCenter: any = (locations: any) => {
    if (locations.length === 0) return center;

    let lat = 0, lng = 0;
    locations.forEach(location => {
      lat += location.lat;
      lng += location.lng;
    });

    return {
      latitude: lat / locations.length,
      longitude: lng / locations.length,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  const adjustZoomLevel = (locations) => {
    // Implement your zoom level adjustment logic here
  };

  useEffect(() => {
    getDashData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <ActionBar
        title="Map View"
        containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }}
      />

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={center}
          region={center} // Ensure the map is centered correctly
        >
          {/* Markers for vehicles */}
          {vehicles.map((vehicle: any) => (
            <Marker
              key={vehicle.id}
              coordinate={{ latitude: vehicle.lat, longitude: vehicle.lng }}
              title={vehicle.vehicleNo}
              description={`Speed: ${vehicle.speed}, Track Time: ${vehicle.tracktime}`}
            >
              <Image
                source={{ uri: vehicle.icon }}
                style={{ width: 20, height: 20 }} // Set the size of the icon
              />
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007bff', // Header background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Header text color
  },
  mapContainer: {
    flex: 1, // Map takes up the remaining space
  },
  map: {
    flex: 1, // Map fills the container
  },
});

export default Tracking;
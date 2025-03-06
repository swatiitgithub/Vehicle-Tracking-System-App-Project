import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';

export default function Notification() {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View>
       <ActionBar title="Notification" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  // header: {
  //   height: 60,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   elevation: 3,
  // },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

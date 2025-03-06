import React, { ReactElement, useRef, useState } from 'react';

import { DataTable, useTheme } from 'react-native-paper';
import Constant from '../../utils/Constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ScrollView } from 'react-native-gesture-handler';
import ActionBar1 from '../../components/ActionBar1';
import { axiosRequest } from '../../utils/ApiRequest';
import { FlatList, StyleSheet, Text } from 'react-native';
import BankDetailsCard from '../../components/card/BankDetailsCard';
import InstituteCard from "../../components/card/InstituteCard";
import { useNavigation } from '@react-navigation/native';
import useThemedStyles from '../../config/theme/hooks/useThemedStyles';

const Institute: React.FC = (props) => {
  const [openEditInstitute, setOpenEditInstitute] = useState(false);
  const [openAddInstitute, setOpenAddInstitute] = useState(false);
  const [openViewInstitute, setOpenViewInstitute] = useState(false);
  const [openUploadInstitute, setOpenUploadInstitute] = useState(false);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const actionRef = useRef<any>();
  const [selectedRows, setSelectedRows] = useState<Object>({});
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const { userData } = useSelector(
    (state: RootState) => state.user,
  );
  const styles = useThemedStyles(style);
    const theme = useTheme();
  const [filterVisible, setFilterVisible] = useState<boolean>(true);

  const navigation = useNavigation();
  const data1 = props.route.params



  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 10]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[3]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  React.useEffect(() => {
  console.log(loading)

    getInstituteList();
    setPage(0);
  }, [itemsPerPage]);
  const getInstituteList = () => {
    setLoading(true)
    const params = {
      instituteID: "-1",
      searchText: "",
      mobileNo: "",
      emailID: "",
      phoneNo: "",
      stateID: "-1",
      districtID: "-1",
      cityID: "-1",
      areaID: "-1",
      smallerESTDDate: new Date(),
      smallerThanRank: "",
      greatorThanFaculty: "",
      greatorThanStudent: "",
      roomTypeID: "-1",
      roomCapacityfrom: "0",
      roomCapacityTo: "1000",
      roomRateFrom: "0",
      roomRateTo: "9999",
      userID: "-1",
      formID: "-1",
      type: "1",
      fromDate: "2022-09-29T07:22:52.579Z",
      toDate: new Date(),
      slotID: "-1",
    }
    axiosRequest(`/Institute/GetInstituteList`, Constant.API_REQUEST_METHOD.POST, params).then(res => {
      // console.log(JSON.stringify(res.data, null, 1))
      setData(res?.data?.data?.institutelist2s)
      setLoading(false);

    }).catch(err => {
      setLoading(false);
    });
  }
  const EmptyListMessage = (): ReactElement => {
    return (
        // Flat List Item
        <Text
            style={style.emptyListStyle}
            onPress={() => getInstituteList()}>
            {''}
        </Text>
    );
};
const onRefresh = () => {
  getInstituteList();
}
const renderItemCard = ({ item, index }: any): ReactElement => {
  return <InstituteCard item={item} onPress={onPress} />;
}
const onPress = (data: any): void => {
  navigation.navigate('InstituteDetails', data)
}

  return (
    <>
      <ActionBar1
        title={data1?.data.subItem.name}
        addButton={true}
        onAddVisible={() => props.navigation.navigate("AddInstitute", data1)}
      />
      {/* <DataTable>
      <DataTable.Header>
        <DataTable.Title>Institute Name</DataTable.Title>
        <DataTable.Title >Mobile No</DataTable.Title>
        <DataTable.Title >Website</DataTable.Title>
      </DataTable.Header>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>

        {data?.slice(from, to).map((item: any) => (
          <DataTable.Row onPress={()=>props.navigation.navigate("InstituteDetailView", item)}
            key={item.instituteName}>
            <DataTable.Cell>{item.instituteName}</DataTable.Cell>
            <DataTable.Cell >{item.mobileNo}</DataTable.Cell>
            <DataTable.Cell >{item.website}</DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${data.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </ScrollView>
    </DataTable> */}
      <FlatList
        data={data}
        renderItem={renderItemCard}
        contentContainerStyle={{
          paddingBottom: 30
        }}
        refreshing={loading}
        onRefresh={() => onRefresh()}
        ListEmptyComponent={EmptyListMessage}
        // ListFooterComponent={renderLoader}
        // onEndReached={renderLoader}
        onEndReachedThreshold={0}
        onScroll={(e) => setFilterVisible(false)}
        onMomentumScrollEnd={() => setFilterVisible(true)}
        />
    </>
  );
};
const style = (theme: any) => StyleSheet.create({

  textValue: {
      fontSize: 14,
      paddingBottom: 4,
  },

  descBox: {
      flexDirection: 'row',
      marginTop: 5,
  },
  emptyListStyle: {
      padding: 10,
      fontSize: 18,
      textAlign: 'center',
  },
})

export default Institute;
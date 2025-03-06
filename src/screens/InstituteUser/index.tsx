import React, { ReactElement, useRef, useState } from 'react';

import { DataTable } from 'react-native-paper';
import Constant from '../../utils/Constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Url from '../../utils/Url';
import ActionBar1 from '../../components/ActionBar1';
import { ImageBackground, Text } from 'react-native';
import FilterOption from '../../components/Filter';
import i18n from '../../utils/i18n';
import BankDetailsCard from '../../components/card/BankDetailsCard';
import Images from '../../utils/Images';
import { axiosRequest } from '../../utils/ApiRequest';

const InstituteUser: React.FC = (props) => {
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
  const data1 = props.route.params
  // console.log(props.navigation)

  const addInstituteImages = (record: any) => {
    console.log(record)
    setOpenUploadInstitute(true)
    setSelectedRows(record)
  };

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 10]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[3]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  React.useEffect(() => {
    getCandidateList();
    setPage(0);
  }, [itemsPerPage]);

  const getCandidateList = () => {
    setLoading(true)
    const params = {
      "candidateID": "-1",
      "uniqueNo": "",
      "emailID": "",
      "mobileNo": "",
      "dob": "",
      "panNo": "",
      "aadhaarNo": "",
      "genderID": "-1",
      "stateID": "-1",
      "districtID": "-1",
      "cityID": "-1",
      "areaID": "-1",
      "searchText": "",
      "userID": "-1",
      "formID": "-1",
      "type": "1"
    }
    axiosRequest(Url.GET_CANDIDATE_LIST, Constant.API_REQUEST_METHOD.POST, params).then(res => {
      // console.log(JSON.stringify(res.data.data,null,1))
      const { data } = res?.data
      setData(res?.data?.data)
      setLoading(false);

    }).catch(err => {
      setLoading(false);
    });
  }

  const renderItemCard = ({ item, index }: any): ReactElement => {
    return <BankDetailsCard item={item} onPress={onPress} />;

  }
  const onRefresh = () => {
    getCandidateList();
  }
  const onPress = (data: any): void => {
    console.log('onPress');
    let params: Object = {
      extraData: data
    };
    props.navigation.navigate('ViewInstituteUser', data)
  }
  const EmptyListMessage = (): ReactElement => {
    return (
      // Flat List Item
      <Text
        // style={styles.emptyListStyle}
        onPress={() => getCandidateList()}>
      </Text>
    );
  };

  return (
    <>
      <ActionBar1
        title={data1.data.subItem.name}
        addButton={true}
        onAddVisible={() => props.navigation.navigate("AddInstituteUser")}
      />
      {/* <DataTable>
        <DataTable.Header>
          <DataTable.Title>Candidate Name</DataTable.Title>
          <DataTable.Title >Mobile No</DataTable.Title>
          <DataTable.Title >Email</DataTable.Title>
        </DataTable.Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>

          {data?.slice(from, to).map((item: any) => (
            <DataTable.Row onPress={() => props.navigation.navigate("ViewInstituteUser", item)}
              key={item.candidateID}>
              <DataTable.Cell>{item.firstName}</DataTable.Cell>
              <DataTable.Cell >{item.mobileNo}</DataTable.Cell>
              <DataTable.Cell >{item.emailID}</DataTable.Cell>
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
      <ImageBackground style={{ flex: 1 }} source={Images.BG_1}>
      
        <FlatList
          data={data}
          renderItem={renderItemCard}
          contentContainerStyle={{
            paddingBottm: 30
          }}
          refreshing={loading}
          onRefresh={() => onRefresh()}
          ListEmptyComponent={EmptyListMessage}
          // ListFooterComponent={renderLoader}
          // onEndReached={renderLoader}
          onEndReachedThreshold={0}
        //onEndReachedThreshold={0}
        />
      </ImageBackground>
      </>
  );
};

export default InstituteUser;
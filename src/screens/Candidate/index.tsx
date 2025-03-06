import React, { ReactElement, useRef, useState } from 'react';

import { DataTable } from 'react-native-paper';
import Constant from '../../utils/Constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Url from '../../utils/Url';
import ActionBar1 from '../../components/ActionBar1';
import { ActivityIndicator, ImageBackground, Text } from 'react-native';
import FilterOption from '../../components/Filter';
import i18n from '../../utils/i18n';
import BankDetailsCard from '../../components/card/BankDetailsCard';
import Images from '../../utils/Images';
import { axiosRequest } from '../../utils/ApiRequest';

const Candidate: React.FC = (props) => {
  const [openEditInstitute, setOpenEditInstitute] = useState(false);
  const [openAddInstitute, setOpenAddInstitute] = useState(false);
  const [openViewInstitute, setOpenViewInstitute] = useState(false);
  const [openUploadInstitute, setOpenUploadInstitute] = useState(false);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Object>({});
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const { userData } = useSelector(
    (state: RootState) => state.user,
  );
  const data1 = props.route.params


  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 10]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[3]
  );


  React.useEffect(() => {
  console.log(loading)

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
      // console.log(JSON.stringify(res.data.data, null, 1))
      const { data } = res?.data
      setData(res?.data?.data)
      setLoading(false);

    }).catch(() => {
      setLoading(false);
    });
  }

  const renderItemCard = ({ item }: any): ReactElement => {
    return <BankDetailsCard item={item} onPress={onPress} />;

  }
  const onRefresh = () => {
    getCandidateList();
  }
  const onPress = (data: any): void => {
    console.log('onPress');
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
      {loading ? <ActivityIndicator style={{flex: 1,justifyContent: 'center',}} size="large" color="#0000ff" />
      :<ImageBackground style={{ flex: 1 }} source={Images.BG_1}>
      <ActionBar1
        title={data1.data.subItem.name}
        addButton={true}
        onAddVisible={() => props.navigation.navigate("AddCandidate")}
      />
        <FlatList
          data={data}
          renderItem={renderItemCard}
          contentContainerStyle={{
            paddingBottm: 30
          }}
          refreshing={loading}
          onRefresh={() => onRefresh()}
          ListEmptyComponent={EmptyListMessage}
          onEndReachedThreshold={0}
        />
      </ImageBackground>}
    </>

  );
};

export default Candidate;
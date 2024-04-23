import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView,  TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from "@expo/vector-icons"

const provinces = [
  'Toàn Quốc',
  'Hà Nội',
  'Hồ Chí Minh',
  'Hải Phòng',
  'Đà Nẵng',
  'Cần Thơ',
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bắc Giang',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Dương',
  'Bình Định',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cao Bằng',
  'Đắk Lắk',
  'Đắk Nông',
  'Đà Lạt',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hậu Giang',
  'Hòa Bình',
  'Khánh Hòa',
  'Kon Tum',
  'Kiên Giang',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phan Thiết',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Phúc',
  'Vĩnh Long',
  'Yên Bái'
];
const Homepage = ({ navigation }) => {

  const data = [
    {
      id: '0',
      name: 'TAKATO - Nhận ngay 845.000đ khi chụp ảnh review',
      count: '35',
      image: 'https://d1hv1msmiluehs.cloudfront.net/campaign/617f66661adba880657392.png?bust=1694287915790',
      field: 'Ẩm thực',
      gender: 'Nữ',
      communication: 'Facebook',
      deadline: '18/10/2024',
      cast: 'Tiền mặt : 845.000đ (đã bao gồm chi phí mua sản phẩm khoảng 345.000đ)',
      requirement: ' Mua sản phẩm tại cửa hàng concung \n Chụp ảnh cùng bé trải nghiệm sản phẩm \n Đăng bài lên FB cá nhân \n Nhãn hàng sử dụng hình ảnh có chạy quảng cáo trong vòng 3 tháng',
      place: 'hà nội',
      hearts: false,
    },
    {
      id: '1',
      name: 'LaVie - Tặng 350.000đ khi chụp ảnh review sản phẩm',
      count: '328',
      image: 'https://d1hv1msmiluehs.cloudfront.net/campaign/618a4e708869f199002392.jpg?bust=1694287915790',
      field: 'Âm nhạc',
      gender: 'Nữ,Nam',
      communication: 'Facebook',
      deadline: '10/06/2024',
      cast: '	LaVie - Tặng 350.000đ khi chụp ảnh review sản phẩm',
      place: 'Toàn quốc',
      hearts: false,
      requirement: 'Bạn tự mua sản phẩm (theo dòng sản phẩm nhãn hàng yêu cầu) \n Chụp ảnh cùng sản phẩm \n iết nội dung và đăng bài lên trang Facebook cá nhân ở chế độ công khai \n Like và check in page'
    },
    {
      id: '2',
      name: 'YVES ROCHER - Tặng set sản phẩm 990.000đ và 300.000đ tiền mặt khi quay video Tiktok',
      count: '5',
      image: 'https://d1hv1msmiluehs.cloudfront.net/campaign/64f9e5ca47f56300457505.png?bust=1694417271545',
      field: 'Sức khỏe',
      gender: 'Nữ,Nam',
      communication: 'Tiktok',
      deadline: '10/12/2023',
      place: 'Hồ Chí Minh',
      hearts: false,
      cast: '	YVES ROCHER - Tặng set sản phẩm 990.000đ và 300.000đ tiền mặt ',
      requirement: "Reviewer nhận sản phẩm từ nhãn hàng \n Bài review phải được duyệt trước khi post \n Quay video cùng sản phẩm và đăng bài lên trang Tiktok cá nhân ở chế độ công khai"
    },
    {
      id: '3',
      name: 'ORLISTAT STADA 120mg - Tặng 700.000đ tiền mặt khi quay video review trên Tiktok',
      count: '40',
      image: 'https://d1hv1msmiluehs.cloudfront.net/campaign/64c0d113033b3733691755.png?bust=1694417271545',
      field: 'Làm đẹp',
      gender: 'Nữ,Nam',
      communication: 'Tiktok',
      place: 'Đà Nẵng',
      deadline: '5/10/2023',
      hearts: false,
      cast: '	Tặng 700.000đ tiền mặt ',
      requirement: "Sử dụng đủ và đúng các keyword \n Nội dung không so sánh với thương hiệu khác \n Thời hạn đăng bài: theo định hướng đính kèm \n Viết bài review theo style riêng của bạn, không sao chép hình ảnh và bài review của người khác từ trang chiến dịch"
    },
    {
      id: '4',
      name: 'YIBUL - Tặng bộ chăn giường trị giá từ 1.700.000đ trở lên khi quay video Tiktok',
      count: '20',
      image: 'https://d1hv1msmiluehs.cloudfront.net/campaign/65016b45626da660020671.png?bust=1694749094519',
      field: 'Mẹ và bé',
      gender: 'Nữ',
      communication: 'Tiktok',
      place: 'Toàn quốc',
      hearts: false,
      deadline: '5/10/2023',
      cast: 'Tặng bộ chăn giường trị giá từ 1.700.000đ trở lên',
      requirement: "Reviewer nhận sản phẩm từ nhãn hàng \n Quay video trải nghiệm sản phẩm và đăng bài lên trang Tiktok cá nhân ở chế độ công khai \n Gắn Tiktok shop \n Bài review phải được duyệt trước khi post"
    },
    {
      id: '5',
      name: 'YIBUL - Tặng bộ chăn giường trị giá từ 1.700.000đ trở lên khi quay video Tiktok',
      count: '20',
      image: 'https://d1hv1msmiluehs.cloudfront.net/campaign/65016b45626da660020671.png?bust=1694749094519',
      field: 'Mẹ và bé',
      gender: 'Nữ',
      communication: 'Tiktok',
      deadline: '5/10/2023',
      hearts: false,
      place: 'Cần Thơ',
      cast: 'Tặng bộ chăn giường trị giá từ 1.700.000đ trở lên',
      requirement: "Reviewer nhận sản phẩm từ nhãn hàng \n Quay video trải nghiệm sản phẩm và đăng bài lên trang Tiktok cá nhân ở chế độ công khai \n Gắn Tiktok shop \n Bài review phải được duyệt trước khi post"
    },


  ]

  const communications = [
    'FaceBook',
    'TikTok',
    'Instagram',
    'YouTube',
  ];


  const handleInputFocus = () => {
    navigation.navigate('SearchScreen');
  }

  const [place, setPlace] = useState('');
  const [communication, setCommunication] = useState('');
  const data1 = data
  const [data2, setData2] = useState(data)
  const [prvs, setPrvs] = useState(provinces)
  const [isClear, setIsClear] = useState(false)

  useEffect(() => {
    setData2(data1.filter((value) => { return value.place.toLowerCase().includes(place.toLowerCase()) && (value.communication.toLowerCase().includes(communication.toLowerCase())) }))
    place == '' ? setIsClear(true) : setIsClear(false)
  }, [place, communication])
  const handleClearFilter = () => {
    setIsClear(true)
    setPrvs(provinces)
    setPlace('')
    setCommunication('')
  }


  return (
    <View>
      <SafeAreaView style={{ backgroundColor: '#CC3333', flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            padding: 8,
            width: '70%',
            margin: 10,
            height: 40,
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor: '#CC3333',
            borderRadius: 10,
            backgroundColor: '#fff',
          }}

          placeholder='search'
          onFocus={handleInputFocus}>
          <FontAwesome name='search' size={22} color='#000'></FontAwesome>
          <Text style={{ color: '#ccc' }}>  search here</Text>
        </TextInput>
        <MaterialIcons name='notifications' size={30} color='#fff' style={{ marginLeft: 30 }}>
        </MaterialIcons>

      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.scrollViewContainer}
      >
        <SelectDropdown
          data={prvs}
          onSelect={(selectedItem) => {
            setPlace(selectedItem);
          }}
          defaultButtonText='Tỉnh thành'
          buttonTextAfterSelection={(selectedItem,) => {
            return isClear ? 'Tỉnh thành' : selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;

          }}
          buttonStyle={styles.dropdown1BtnStyle1}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition='right'
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          selectedRowStyle={styles.dropdown1SelectedRowStyle}
          search
          searchInputStyle={styles.dropdown1searchInputStyleStyle}
          searchPlaceHolder='Search here'
          searchPlaceHolderColor='darkgrey'
          renderSearchInputLeftIcon={() => {
            return <FontAwesome name={'search'} color={'#444'} size={18} />;
          }}

        />
        <SelectDropdown
          data={communications}
          onSelect={(selectedItem) => {
            setCommunication(selectedItem)
          }}
          defaultButtonText='Nền tảng'
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition='right'
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          selectedRowStyle={styles.dropdown1SelectedRowStyle}
          search
          searchInputStyle={styles.dropdown1searchInputStyleStyle}
          searchPlaceHolder='Search here'
          searchPlaceHolderColor='darkgrey'
          renderSearchInputLeftIcon={() => {
            return <FontAwesome name={'search'} color={'#444'} size={18} />;
          }}
        />
        <TouchableOpacity onPress={handleClearFilter} style={{ marginLeft: 20, justifyContent: 'center', alignContent: 'center' }}>
          <FontAwesome name='close' size={33} color='#CC3333' ></FontAwesome>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        style={{ marginBottom: 250, }}
        data={data2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Pressable style={{ borderRadius: 10, margin: 15, flexDirection: 'row', backgroundColor: '#fff' }}
            >
              <View>
                <Image style={{ width: 150, height: 250, borderRadius: 10, }} source={{ uri: item.image }}></Image>
              </View>
              <View style={{ width: '60%' }}>
                <View style={{ height: 100 }}>
                  <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold', color: '#CC3333' }}>{item.name}</Text>
                </View>
                <Text style={{ paddingLeft: 10 }}>Nền tảng: <Text style={{ color: '#00BB00', fontWeight: 'bold' }}>{item.communication}</Text></Text>
                <Text style={{ paddingLeft: 10 }}>Giới tính: {item.gender}</Text>
                <Text style={{ paddingLeft: 10, color: '#0000CD', fontWeight: 'bold' }}>{item.place}</Text>
                <Text style={{ paddingLeft: 10, }}>Hạn ứng tuyển: <Text style={{ color: '#CC3333' }}>{item.deadline}</Text></Text>
                <View style={{ flex: 1, marginLeft: 65, width: '60%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                  <FontAwesome
                    name='heart-o'
                    size={28}
                    color='#CC3333'
                  ></FontAwesome>

                </View>
              </View>
            </Pressable>
          )
        }}
      ></FlatList>

    </View>
  );
};

export default Homepage;


const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingVertical: '5%',
    flexDirection: 'row',
    marginLeft: 12,

  },


  dropdown1BtnStyle: {
    width: '35%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnStyle1: {
    marginLeft: 20,
    width: '38%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },


})
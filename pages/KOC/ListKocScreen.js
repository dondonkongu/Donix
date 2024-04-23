import { StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput } from 'react-native'
import { Text } from 'react-native-elements'
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import React from 'react'
import { useState, useEffect } from 'react'
import { firestore } from '../../firebase'
import SelectDropdown from 'react-native-select-dropdown'

const ListKocScreen = ({ navigation }) => {
  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'
  const [dataKoc, setDataKoc] = useState([])
  const [data1, setdata1] = useState([])
  const [fields, setFields] = useState('')
  const [textSearch, setTextSearch] = useState('')
  const [province, setProvince] = useState('')
  const [price,setPrice]= useState('')
  const dataFields = [
    { id: 1, name: "Ẩm thực" },
    { id: 2, name: "Làm đẹp" },
    { id: 3, name: "Thời trang" },
    { id: 4, name: "Sức khỏe" },
    { id: 5, name: "Lifestyle" },
    { id: 6, name: "Mẹ và bé" },
    { id: 7, name: "Du lịch" },
    { id: 8, name: "Công nghệ" },
    { id: 9, name: "Giải trí" },
    { id: 10, name: "Thể thao" },
    { id: 11, name: "Giáo dục" },
    { id: 12, name: "Kinh doanh" },
    { id: 13, name: "Tài chính" },
    { id: 14, name: "Nông nghiệp" },
    { id: 15, name: "Sách" },
    { id: 16, name: "Thú cưng" },
    { id: 17, name: "Nghệ thuật" },
    { id: 18, name: "Âm nhạc & nhảy" },
    { id: 19, name: "Xe cộ" },
    { id: 20, name: "Mẫu ảnh/Live" },
    { id: 21, name: "Gia dụng" },
    { id: 22, name: "Nội thất" },
    { id: 23, name: "Đồ chơi" },
    { id: 24, name: "Tất cả" }
  
]
  const dataProvince = [
      {id:0,name:"Toàn quốc"},
      {id:1,name:"Hà Nội"},
      {id:2,name:"Thành phố Hồ Chí Minh"},
      {id:3,name:"An Giang"},
      {id:4,name:"Bà Rịa – Vũng Tàu"},
      {id:5,name:"Bắc Giang"},
      {id:6,name:"Bắc Kạn"},
      {id:7,name:"Bạc Liêu"},
      {id:8,name:"Bắc Ninh"},
      {id:9,name:"Bến Tre"},
      {id:10,name:"Bình Định"},
      {id:11,name:"Bình Dương"},
      {id:12,name:"Bình Phước"},
      {id:13,name:"Bình Thuận"},
      {id:14,name:"Cà Mau"},
      {id:15,name:"Cần Thơ"},
      {id:16,name:"Cao Bằng"},
      {id:17,name:"Đà Nẵng"},
      {id:18,name:"Đắk Lắk"},
      {id:19,name:"Đắk Nông"},
      {id:20,name:"Điện Biên"},
      {id:21,name:"Đồng Nai"},
      {id:22,name:"Đồng Tháp"},
      {id:23,name:"Gia Lai"},
      {id:24,name:"Hà Giang"},
      {id:25,name:"Hà Nam"},
      {id:26,name:"Hà Tĩnh"},
      {id:27,name:"Hải Dương"},
      {id:28,name:"Hải Phòng"},
      {id:29,name:"Hậu Giang"},
      {id:30,name:"Hòa Bình"},
      {id:31,name:"Hưng Yên"},
      {id:32,name:"Khánh Hòa"},
      {id:33,name:"Kiên Giang"},
      {id:34,name:"Kon Tum"},
      {id:35,name:"Lai Châu"},
      {id:36,name:"Lâm Đồng"},
      {id:37,name:"Lạng Sơn"},
      {id:38,name:"Lào Cai"},
      {id:39,name:"Long An"},
      {id:40,name:"Nam Định"},
      {id:41,name:"Nghệ An"},
      {id:42,name:"Ninh Bình"},
      {id:43,name:"Ninh Thuận"},
      {id:44,name:"Phú Thọ"},
      {id:45,name:"Phú Yên"},
      {id:46,name:"Quảng Bình"},
      {id:47,name:"Quảng Nam"},
      {id:48,name:"Quảng Ngãi"},
      {id:49,name:"Quảng Ninh"},
      {id:50,name:"Quảng Trị"},
      {id:51,name:"Sóc Trăng"},
      {id:52,name:"Sơn La"},
      {id:53,name:"Tây Ninh"},
      {id:54,name:"Thái Bình"},
      {id:55,name:"Thái Nguyên"},
      {id:56,name:"Thanh Hóa"},
      {id:57,name:"Thừa Thiên Huế"},
      {id:58,name:"Tiền Giang"},
      {id:59,name:"Trà Vinh"},
      {id:60,name:"Tuyên Quang"},
      {id:61,name:"Vĩnh Long"},
      {id:62,name:"Vĩnh Phúc"},
      {id:63,name:"Yên Bái"}
    
    ];
  const dataPrice = [
      { id: 1, name: '300,000đ-500,000đ' },
      { id: 2, name: '500,000đ-1,000,000đ' },
      { id: 3, name: '1,000,000đ-2,000,000đ' },
      { id: 4, name: '2,000,000đ-5,000,000đ' },
      { id: 5, name: '5,000,000đ-10,000,000đ' },
      { id: 6, name: '10,000,000đ-20,000,000đ' },
      { id: 7, name: 'Trên 20,000,000đ' },
      {id:8,name:'Tất cả'}


  ]
  useEffect(() => {
    const unsubscribe = firestore.collection('users').onSnapshot((snapshot) => {
      const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setdata1(userData)
    })
    return () => unsubscribe
  },[])
 useEffect(() => {
  const filteredUsersKoc = fields === ''|| fields === 'Tất cả'
    ? province === '' || province === 'Toàn quốc'
    ? price === '' || price === 'Tất cả'?data1.filter((item) => item.role === 'KOC' && item.block !== true):data1.filter((item) => item.role === 'KOC' && item.block !== true && item.price === price)
    :price ===''|| price ==='Tất cả'?data1.filter((item)=>item.role==='KOC'&&item.block!==true&&item.address===province)
    :data1.filter((item) => item.role === 'KOC' && item.block !== true && item.address === province && item.price === price && item.name.toLowerCase().indexOf(textSearch.toLowerCase()) > -1)
    :province === '' || province === 'Toàn quốc'
    ? price === '' || price === 'Tất cả'?data1.filter((item) => item.role === 'KOC' && item.block !== true && item.fields === fields && item.name.toLowerCase().indexOf(textSearch.toLowerCase()) > -1)
    :data1.filter((item) => item.role === 'KOC' && item.block !== true && item.fields === fields && item.name.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 && item.price === price)
    :price ===''|| price ==='Tất cả'?data1.filter((item) => item.role === 'KOC' && item.block !== true &&item.address===province&& item.fields === fields && item.name.toLowerCase().indexOf(textSearch.toLowerCase()) > -1) 
    :data1.filter((item) => item.role === 'KOC' && item.block !== true &&item.address===province&& item.fields === fields && item.name.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 && item.price === price);
  setDataKoc(filteredUsersKoc);

}, [data1, fields, province,price]);
  const onSearch = (text) => {
    const listDataSearch = fields==='Tất cả'||fields===''?
    price === '' || price === 'Tất cả'?
    province === '' || province === 'Toàn quốc'?
    data1.filter((item) => {
      const itemData = item.name ? item.name.toLowerCase() : ''.toLocaleLowerCase()
      const textData = text.toLowerCase()
      return itemData.indexOf(textData) > -1 &&
        item.role === 'KOC' && item.block !== true
    })
    :data1.filter((item) => {
      const itemData = item.name ? item.name.toLowerCase() : ''.toLocaleLowerCase()
      const textData = text.toLowerCase()
      const provinceData = item.address ? item.address.toLowerCase() : ''.toLocaleLowerCase()
      return itemData.indexOf(textData) > -1 &&
        item.role === 'KOC' && item.block !== true && provinceData.indexOf(province.toLowerCase())  > -1
    })
    :data1.filter((item) => {
      const itemData = item.name ? item.name.toLowerCase() : ''.toLocaleLowerCase()
      const textData = text.toLowerCase()
      const priceData = item.price ? item.price.toLowerCase() : ''.toLocaleLowerCase()
      return itemData.indexOf(textData) > -1 &&
        item.role === 'KOC' && item.block !== true && priceData.indexOf(price.toLowerCase())  > -1
    })
    :data1.filter((item) => { 
      const itemData = item.name ? item.name.toLowerCase() : ''.toLocaleLowerCase()
      const textData = text.toLowerCase()
      const fieldsData = item.fields ? item.fields.toLowerCase() : ''.toLocaleLowerCase()
      return itemData.indexOf(textData) > -1 &&
        item.role === 'KOC' && item.block !== true && fieldsData.indexOf(fields.toLowerCase())  > -1
    }
    )
    setDataKoc(listDataSearch)
  }
  const renderKoc = (item) => {

    return (

      <View style={{ flexDirection: 'column', alignItems: 'center', borderRadius: 5, backgroundColor: '#fff', marginHorizontal: 30, marginVertical: 20, shadowColor: '#000', elevation: 5 }}>
        <TouchableOpacity

          onPress={() => { navigation.navigate('ProfileWallDetail', { profileId: item.id }) }}>
          <View style={{
            alignItems: 'center'
          }}>
            <Image
              source={{ uri: item.avatar ? item.avatar : noAvatar }}
              style={{ width: 130, height: 130, borderColor: '#ccc', borderTopLeftRadius: 5, borderTopRightRadius: 5, borderWidth: 1 }}
            ></Image>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: 130 }}>
            <View style={{ flexDirection: 'column' }}>
              {item.legit === 'duyệt' ? (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2 }}>
                <Text style={{ fontSize: 15, textAlign: 'center', marginLeft: 10, fontWeight: 'bold', color: '#CC3333', alignItems: 'center' }} numberOfLines={1}>{item.name}
                </Text>
                <MaterialIcons name='verified' size={15} color='#15a7ff' style={{ marginLeft: 0 }}></MaterialIcons>

              </View>) : (<Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', color: '#CC3333', }} numberOfLines={2}>{item.name}</Text>)}
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: '#7f7f7f' }} numberOfLines={1}>{item.fields ? item.fields : ''}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#CC3333', height: 93, alignItems: 'center' }}>
        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Tìm kiếm KOC</Text>
          <Text >    </Text>
        </View>
      </View>
      <View style={{ flex: 1, }}>
        <View >
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 15 }}>Dánh sách KOC</Text>
          </View>
          <View>
            <TextInput style={{ backgroundColor: '#fff', fontSize: 15, marginHorizontal: 15, marginVertical: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 5 }} placeholder='Nhập tên KOC bạn muốn tìm'
              onChangeText={(text) => { onSearch(text)
                setTextSearch(text)
              }}
            ></TextInput>
            <View style={{flexDirection:'row'}}>
            <SelectDropdown
              data={dataFields}
              onSelect={(selectedItem, index) => {
                setFields(selectedItem.name)
              }}
              defaultButtonText={fields ? fields : 'Lĩnh vực'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={{
                width: '45%',
                height: 40,
                backgroundColor: '#FFF',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#444',
                marginLeft: 15,
              }}
              buttonTextStyle={{ color: '#444', textAlign: 'left', fontSize: 15 }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'left'}
              dropdownStyle={{ backgroundColor: '#EFEFEF' }}
              rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' }}
              rowTextStyle={{ color: '#444', textAlign: 'left' }}
            />


            <SelectDropdown
              data={dataProvince}
              onSelect={(selectedItem, index) => {selectedItem.name === 'Toàn quốc' ? setProvince('') :
                setProvince(selectedItem.name)
              }}
              defaultButtonText={province ? province : 'Tỉnh thành'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={{
                width: '44%',
                height: 40,
                backgroundColor: '#FFF',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#444',
                marginLeft: 15,
              }}
              buttonTextStyle={{ color: '#444', textAlign: 'left', fontSize: 15 }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'left'}
              dropdownStyle={{ backgroundColor: '#EFEFEF' }}
              rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' }}
              rowTextStyle={{ color: '#444', textAlign: 'left' }}
            />
            </View>
            <SelectDropdown
              data={dataPrice}
              onSelect={(selectedItem, index) => 
                setPrice(selectedItem.name)
              }
              defaultButtonText={price ? price : 'Mức giá'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={{
                marginTop:10,
                width: '45%',
                height: 40,
                backgroundColor: '#FFF',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#444',
                marginLeft: 15,
              }}
              buttonTextStyle={{ color: '#444', textAlign: 'left', fontSize: 15 }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'left'}
              dropdownStyle={{ backgroundColor: '#EFEFEF' }}
              rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' }}
              rowTextStyle={{ color: '#444', textAlign: 'left' }}
            />
          </View>
         
        </View>
        <FlatList
          style={{marginLeft:5}}
            data={dataKoc}
            renderItem={({ item }) => renderKoc(item)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          ></FlatList>

      </View>

    </SafeAreaView>
  )
}

export default ListKocScreen

const styles = StyleSheet.create({})
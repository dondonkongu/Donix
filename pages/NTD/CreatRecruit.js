import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from 'react-native-vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { auth, database, storage } from '../../firebase'
import { Dimensions } from 'react-native'
import * as ImagePicker from "expo-image-picker"

const CreatRecruit = ({ navigation }) => {
  const [dataRecruits, setDataRecruits] = useState({
    nameRe: '',
    countRe: '',
    fieldsRe: '',
    placeRe: '',
    genderRe: '',
    socialsRe: '',
    deadlineTimeRe: '',
    salaryRe: '',
    statusRe: 'đang chờ',
    imageProduct: null
  })
  const [nameReError, setNameReError] = useState(false)
  const [countReError, setCountReError] = useState(false)
  const [fieldsReError, setFieldsReError] = useState(false)
  const [placeReError, setPlaceReError] = useState(false)
  const [genderReError, setGenderReError] = useState(false)
  const [socialsReError, setSocialsReError] = useState(false)
  const [deadlineTimeReEror, setDeadlineTimeReEror] = useState(false)
  const [salaryReError, setSalaryReError] = useState(false)




  const nobanner = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'

  const windowWidth = Dimensions.get('window').width;



  const dataProvinces = [
    "Hà Nội",
    "Thành phố Hồ Chí Minh",
    "An Giang",
    "Bà Rịa – Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ",
    "Cao Bằng",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái"
  ]
  const dataFields = [
    "Ẩm thực",
    "Làm đẹp",
    "Thời trang",
    "Sức khỏe",
    "Lifestyle",
    "Mẹ và bé",
    "Du lịch",
    "Công nghệ",
    "Giải trí",
    "Thể thao",
    "Giáo dục",
    "Kinh doanh",
    "Tài chính",
    "Nông nghiệp",
    "Sách",
    "Thú cưng",
    "Nghệ thuật",
    "Âm nhạc & nhảy",
    "Xe cộ",
    "Mẫu ảnh/Live",
    "Gia dụng",
    "Nội thất",
    "Đồ chơi",
    "Khác"
]
  const dataPrice = [
    '300,000đ-500,000đ',
    '500,000đ-1,000,000đ',
    '1,000,000đ-2,000,000đ',
    '2,000,000đ-5,000,000đ',
    '5,000,000đ-10,000,000đ',
    '10,000,000đ-20,000,000đ',
    'Trên 20,000,000đ',
]
  const dataGender = [
    'Tất cả giới tính',
    'Nam',
    'Nữ',
    'Khác',
  ]
  const dataSocials = [
    'Facebook',
    'Tiktok',
    'Instagram',
    'Youtube',

  ]
  const handleSelectedImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      setDataRecruits({ ...dataRecruits, imageProduct: result.assets[0].uri })
    }
  }

  const handleNavigationRecruit = async () => {
    if (dataRecruits.nameRe === '') {
      alert('Vui lòng nhập tên');
      setNameReError(true);
    }
    else if (dataRecruits.countRe < 1) {
      alert('Số lượng tuyển chưa hợp lệ');
      setCountReError(true);
    }
    else if (dataRecruits.fieldsRe === '') {
      alert('Vui lòng chọn lĩnh vực');
      setFieldsReError(true);
    }
    else if (dataRecruits.placeRe === '') {
      alert('Vui lòng chọn địa điểm');
      setPlaceReError(true);
    }
    else if (dataRecruits.genderRe === '') {
      alert('Vui lòng chọn giới tính');
      setGenderReError(true);
    }
    else if (dataRecruits.socialsRe === '') {
      alert('Vui lòng chọn nền tảng');
      setSocialsReError(true);
    }
    else if (dataRecruits.deadlineTimeRe === '') {
      alert('Vui lòng nhập hạn nộp hồ sơ');
      setDeadlineTimeReEror(true);
    }
    else if (dataRecruits.salaryRe === '') {
      alert('Vui lòng nhập mức lương');
      setSalaryReError(true);
    }
    else {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid
          const recruitsRef = await database.ref(`ListRecuits/${userId}`)
            .push()
          const recruitsId = recruitsRef.key;
          if (dataRecruits.imageProduct) {

            const responseImageproduct = await fetch(dataRecruits.imageProduct)

            const blobImageProduct = await responseImageproduct.blob()
            console.log('111')

            const ImageProductRef = storage.ref().child(`imageProducts/${userId}/${recruitsId}`)
            await ImageProductRef.put(blobImageProduct)
            const imageProductUrl = await ImageProductRef.getDownloadURL();


            recruitsRef.set({
              nameRe: dataRecruits.nameRe,
              countRe: dataRecruits.countRe,
              placeRe: dataRecruits.placeRe,
              fieldsRe: dataRecruits.fieldsRe,
              genderRe: dataRecruits.genderRe,
              socialsRe: dataRecruits.socialsRe,
              deadlineTimeRe: dataRecruits.deadlineTimeRe,
              salaryRe: dataRecruits.salaryRe,
              imageProduct: imageProductUrl,
              statusRe: dataRecruits.statusRe

            });

            navigation.navigate('CreatRecruitPageTwo', { recruitsId });


          }
        }
      } catch (error) {
        console.log('loi db', error)
      }
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ backgroundColor: '#CC3333', height: 93, alignItems: 'center' }}>

        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Tạo tin tuyển dụng</Text>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>1/2</Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#fff' }}>

        <ScrollView style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 70 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>1. Thông tin chung</Text>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 16 }}>Tên tin đăng</Text>
              <TextInput
                placeholder='Vui lòng nhập'
                value={dataRecruits.nameRe}
                onChangeText={(text) => {
                  setDataRecruits({ ...dataRecruits, nameRe: text })
                  setNameReError(false)
                }}
                style={nameReError ? { marginTop: 8, fontSize: 15, borderRadius: 5, borderWidth: 1, borderColor: '#FF0000', height: 40, paddingLeft: 15, width: '95%' } : { marginTop: 8, fontSize: 15, borderRadius: 5, borderWidth: 1, borderColor: '#444', height: 40, paddingLeft: 15, width: '95%' }}></TextInput>
            </View>
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 16 }}>Số lượng tuyển</Text>
              <TextInput
                placeholder='0'
                value={dataRecruits.countRe}
                onChangeText={(text) => {
                  setDataRecruits({ ...dataRecruits, countRe: text })
                  setCountReError(false)
                }}
                style={countReError ? { marginTop: 8, fontSize: 15, borderRadius: 5, borderWidth: 1, borderColor: '#FF0000', height: 40, paddingLeft: 15, width: '95%' } : { marginTop: 8, fontSize: 15, borderRadius: 5, borderWidth: 1, borderColor: '#444', height: 40, paddingLeft: 15, width: '95%' }}
              ></TextInput>
            </View>
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 16 }}>Lĩnh vực</Text>
              <View >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  alwaysBounceVertical={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'left',
                    paddingTop: 8,
                    paddingBottom: 15
                  }}>
                  <SelectDropdown
                    data={dataFields}
                    onSelect={(selectedItem) => {
                      setDataRecruits({ ...dataRecruits, fieldsRe: selectedItem })
                      setFieldsReError(false)
                    }}

                    defaultButtonText={'vui lòng chọn'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}

                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={fieldsReError ? {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#FF0000',
                    } : {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#444',
                    }}
                    buttonTextStyle={{ color: '#444', textAlign: 'left' }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={{ backgroundColor: '#EFEFEF', marginTop: -40 }}
                    rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', height: 40 }}
                    rowTextStyle={{ color: '#444', textAlign: 'left' }}
                  />
                </ScrollView>
              </View>
            </View>
            <View >
              <Text style={{ fontSize: 16 }}>Địa điểm</Text>
              <View >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  alwaysBounceVertical={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'left',
                    paddingTop: 8,
                    paddingBottom: 15,
                  }}>
                  <SelectDropdown
                    data={dataProvinces}
                    onSelect={(selectedItem) => {
                      setDataRecruits({ ...dataRecruits, placeRe: selectedItem })
                      setPlaceReError(false)
                    }}
                    defaultButtonText={'vui lòng chọn'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={placeReError ? {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#FF0000',
                    } : {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#444',
                    }}
                    buttonTextStyle={{ color: '#444', textAlign: 'left' }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={{ backgroundColor: '#EFEFEF', marginTop: -40 }}
                    rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', height: 40 }}
                    rowTextStyle={{ color: '#444', textAlign: 'left' }}
                  />
                </ScrollView>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Giới tính</Text>
              <View >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  alwaysBounceVertical={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'left',
                    paddingTop: 8,
                    paddingBottom: 15,
                  }}>
                  <SelectDropdown
                    data={dataGender}
                    onSelect={(selectedItem) => {
                      setDataRecruits({ ...dataRecruits, genderRe: selectedItem })
                      setGenderReError(false)
                    }}
                    defaultButtonText={'vui lòng chọn'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={genderReError ? {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#FF0000',
                    } : {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#444',
                    }}
                    buttonTextStyle={{ color: '#444', textAlign: 'left' }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={{ backgroundColor: '#EFEFEF', marginTop: -40 }}
                    rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', height: 40 }}
                    rowTextStyle={{ color: '#444', textAlign: 'left' }}
                  />
                </ScrollView>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Nền tảng</Text>
              <View >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  alwaysBounceVertical={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'left',
                    paddingTop: 8,
                    paddingBottom: 15,
                  }}>
                  <SelectDropdown
                    data={dataSocials}
                    onSelect={(selectedItem) => {
                      setDataRecruits({ ...dataRecruits, socialsRe: selectedItem })
                      setSocialsReError(false)
                    }}
                    defaultButtonText={'vui lòng chọn'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={socialsReError ? {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#FF0000',
                    } : {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#444',
                    }}
                    buttonTextStyle={{ color: '#444', textAlign: 'left' }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={{ backgroundColor: '#EFEFEF', marginTop: -40 }}
                    rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', height: 40 }}
                    rowTextStyle={{ color: '#444', textAlign: 'left' }}
                  />
                </ScrollView>
              </View>
            </View>
            <View >
              <Text style={{ fontSize: 16 }}>Giá Cast</Text>
              <View >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  alwaysBounceVertical={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'left',
                    paddingTop: 8,
                    paddingBottom: 15
                  }}>
                  <SelectDropdown
                    data={dataPrice}
                    onSelect={(selectedItem) => {
                      setDataRecruits({ ...dataRecruits, salaryRe: selectedItem })
                      setFieldsReError(false)
                    }}

                    defaultButtonText={'vui lòng chọn'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}

                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={salaryReError ? {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#FF0000',
                    } : {
                      width: '95%',
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#444',
                    }}
                    buttonTextStyle={{ color: '#444', textAlign: 'left' }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={{ backgroundColor: '#EFEFEF', marginTop: -40 }}
                    rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', height: 40 }}
                    rowTextStyle={{ color: '#444', textAlign: 'left' }}
                  />
                </ScrollView>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Hạn nộp hồ sơ</Text>
              <TextInput
                onChangeText={(text) => {
                  setDataRecruits({ ...dataRecruits, deadlineTimeRe: text })
                  setDeadlineTimeReEror(false)
                }}
                style={deadlineTimeReEror ? { marginTop: 8, fontSize: 15, borderRadius: 5, borderWidth: 1, borderColor: '#FF0000', height: 40, paddingLeft: 15, width: '95%' } : { marginTop: 8, fontSize: 15, borderRadius: 5, borderWidth: 1, borderColor: '#444', height: 40, paddingLeft: 15, width: '95%' }}>
              </TextInput>
            </View>
            

          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 60, marginTop: 30 }}>
            <Text>Chọn hình ảnh đại diện cho sản phẩm </Text>
            <TouchableOpacity onPress={handleSelectedImage}>
              <Image source={{ uri: dataRecruits.imageProduct ? dataRecruits.imageProduct : nobanner }}
                style={{ height: 220, width: windowWidth, borderWidth: 1, borderColor: '#ccc', marginTop: 10 }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 80, }}>
            <TouchableOpacity style={{ backgroundColor: '#CC3333', width: '50%', padding: 15, borderRadius: 10, alignItems: 'center', flexDirection: 'row' }}
              onPress={handleNavigationRecruit}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 16, marginLeft: 35 }}>Tiếp tục  </Text>
              <FontAwesome name='arrow-right' size={20} color='#fff'></FontAwesome>

            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CreatRecruit

const styles = StyleSheet.create({})
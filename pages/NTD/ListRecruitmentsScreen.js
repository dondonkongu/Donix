import { StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput } from 'react-native'
import { Text } from 'react-native-elements'
import { FontAwesome } from 'react-native-vector-icons'
import React, { useEffect, useState } from 'react'
import { database } from '../../firebase'
import SelectDropdown from 'react-native-select-dropdown'
const ListRecruitmentsScreen = ({ navigation }) => {
  const nobanner = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'
  const dataFields = [
    {
      id: 1,
      name: 'Ẩm thực'
    },
    {
      id: 2,
      name: 'Làm đẹp'
    },
    {
      id: 3,
      name: 'Công nghệ'
    },
    {
      id: 4,
      name: 'Thời trang'
    },
    {
      id: 5,
      name: 'Du lịch'
    },
    {
      id: 6,
      name: 'Công nghệ'
    },
    {
      id: 7,
      name: 'Thể thao'
    },
    {
      id: 8,
      name: 'Âm nhạc'
    },
    {
      id: 9,
      name: 'Mẹ và bé'
    },
    {
      id: 10,
      name: 'Thú cưng'
    },
    {
      id: 11,
      name: 'Khoa học'
    },
    {
      id: 12,
      name: 'Phụ kiện'
    },
    {
      id: 13,
      name: 'Xe cộ'
    },
    {
      id: 14,
      name: 'Nội thất'
    },
    {
      id: 15,
      name: 'Nông nghiệp'
    },
    {
      id: 16,
      name: 'Thủ công'
    },
    {
      id: 17,
      name: 'Thiết kế'
    },
    {
      id: 18,
      name: 'Giáo dục'
    },
    {
      id: 19,
      name: 'Nghệ thuật'
    },
    {
      id: 20,
      name: 'Sách'
    },
    {
      id: 21,
      name: 'Thương mại'
    },
    {
      id: 22,
      name: 'Tất cả'
    },

  ]
  const dataProvince = [
    { id: 0, name: "Toàn quốc" },
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Thành phố Hồ Chí Minh" },
    { id: 3, name: "An Giang" },
    { id: 4, name: "Bà Rịa – Vũng Tàu" },
    { id: 5, name: "Bắc Giang" },
    { id: 6, name: "Bắc Kạn" },
    { id: 7, name: "Bạc Liêu" },
    { id: 8, name: "Bắc Ninh" },
    { id: 9, name: "Bến Tre" },
    { id: 10, name: "Bình Định" },
    { id: 11, name: "Bình Dương" },
    { id: 12, name: "Bình Phước" },
    { id: 13, name: "Bình Thuận" },
    { id: 14, name: "Cà Mau" },
    { id: 15, name: "Cần Thơ" },
    { id: 16, name: "Cao Bằng" },
    { id: 17, name: "Đà Nẵng" },
    { id: 18, name: "Đắk Lắk" },
    { id: 19, name: "Đắk Nông" },
    { id: 20, name: "Điện Biên" },
    { id: 21, name: "Đồng Nai" },
    { id: 22, name: "Đồng Tháp" },
    { id: 23, name: "Gia Lai" },
    { id: 24, name: "Hà Giang" },
    { id: 25, name: "Hà Nam" },
    { id: 26, name: "Hà Tĩnh" },
    { id: 27, name: "Hải Dương" },
    { id: 28, name: "Hải Phòng" },
    { id: 29, name: "Hậu Giang" },
    { id: 30, name: "Hòa Bình" },
    { id: 31, name: "Hưng Yên" },
    { id: 32, name: "Khánh Hòa" },
    { id: 33, name: "Kiên Giang" },
    { id: 34, name: "Kon Tum" },
    { id: 35, name: "Lai Châu" },
    { id: 36, name: "Lâm Đồng" },
    { id: 37, name: "Lạng Sơn" },
    { id: 38, name: "Lào Cai" },
    { id: 39, name: "Long An" },
    { id: 40, name: "Nam Định" },
    { id: 41, name: "Nghệ An" },
    { id: 42, name: "Ninh Bình" },
    { id: 43, name: "Ninh Thuận" },
    { id: 44, name: "Phú Thọ" },
    { id: 45, name: "Phú Yên" },
    { id: 46, name: "Quảng Bình" },
    { id: 47, name: "Quảng Nam" },
    { id: 48, name: "Quảng Ngãi" },
    { id: 49, name: "Quảng Ninh" },
    { id: 50, name: "Quảng Trị" },
    { id: 51, name: "Sóc Trăng" },
    { id: 52, name: "Sơn La" },
    { id: 53, name: "Tây Ninh" },
    { id: 54, name: "Thái Bình" },
    { id: 55, name: "Thái Nguyên" },
    { id: 56, name: "Thanh Hóa" },
    { id: 57, name: "Thừa Thiên Huế" },
    { id: 58, name: "Tiền Giang" },
    { id: 59, name: "Trà Vinh" },
    { id: 60, name: "Tuyên Quang" },
    { id: 61, name: "Vĩnh Long" },
    { id: 62, name: "Vĩnh Phúc" },
    { id: 63, name: "Yên Bái" }

  ];
  const dataPrice = [
    { id: 1, name: '300,000đ-500,000đ' },
    { id: 2, name: '500,000đ-1,000,000đ' },
    { id: 3, name: '1,000,000đ-2,000,000đ' },
    { id: 4, name: '2,000,000đ-5,000,000đ' },
    { id: 5, name: '5,000,000đ-10,000,000đ' },
    { id: 6, name: '10,000,000đ-20,000,000đ' },
    { id: 7, name: 'Trên 20,000,000đ' },
    { id: 8, name: 'Tất cả' }


  ]
  const dataSocials = [
    {id:1,name:'Facebook'},
    {id:2,name:'Tiktok'},
    {id:3,name:'Instagram'},
    {id:4,name:'Youtube'},
    {id:5,name:'Tất cả'}

  ]
  const [data, setData] = useState([])
  const [textSearch, setTextSearch] = useState('')
  const [price, setPrice] = useState('')
  const [province, setProvince] = useState('')
  const [fields, setFields] = useState('')
  const [socialsRe, setSocialsRe] = useState('')
  const [dataRecruits, setDataRecruits] = useState([])
  useEffect(() => {
    const hh = database.ref('ListRecuits').once('value')
      .then((snapshot) => {
        const recruits = snapshot.val();
        if (recruits) {
          const allJobData = [];
          Object.keys(recruits).forEach((userId) => {
            const jobIds = Object.keys(recruits[userId]);
            jobIds.forEach((jobId) => {
              const jobData = recruits[userId][jobId];
              jobData.userId = userId
              jobData.jobId = jobId
              allJobData.push(jobData);
            });
          });
          setData(allJobData);
        }
      })
      .catch((error) => {
        console.log('Đã xảy ra lỗi: ', error);
      });
    return () => hh;
  }, []);
  useEffect(() => {
    const filteredRecruit = fields === '' || fields === 'Tất cả'
      ? province === '' || province === 'Toàn quốc'
        ? price === '' || price === 'Tất cả' ? data.filter((item) => item.statusRe === 'đã duyệt') : data.filter((item) => item.statusRe === 'đã duyệt' && item.salaryRe === price)
        : price === '' || price === 'Tất cả' ? data.filter((item) => item.statusRe === 'đã duyệt'  && item.placeRe === province)
          : data.filter((item) => item.statusRe === 'đã duyệt' && item.placeRe === province && item.salaryRe === price && item.nameRe.toLowerCase().indexOf(textSearch.toLowerCase()) > -1)
      : province === '' || province === 'Toàn quốc'
        ? price === '' || price === 'Tất cả' ? data.filter((item) => item.statusRe === 'đã duyệt' && item.fieldsRe === fields && item.nameRe.toLowerCase().indexOf(textSearch.toLowerCase()) > -1)
          : data.filter((item) => item.statusRe === 'đã duyệt' && item.fieldsRe === fields && item.nameRe.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 && item.salaryRe === price)
        : price === '' || price === 'Tất cả' ? data.filter((item) => item.statusRe === 'đã duyệt' && item.placeRe === province && item.fieldsRe === fields && item.nameRe.toLowerCase().indexOf(textSearch.toLowerCase()) > -1)
          : data.filter((item) => item.statusRe === 'đã duyệt' && item.placeRe === province && item.fieldsRe === fields && item.nameRe.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 && item.salaryRe === price);
    setDataRecruits(filteredRecruit);

  }, [data, fields, province, price]);
  const onSearch = (text) => {
    const listDataSearch = fields === 'Tất cả' || fields === '' ?
      price === '' || price === 'Tất cả' ?

        data.filter((item) => {
          const itemData = item.nameRe ? item.nameRe.toLowerCase() : ''.toLocaleLowerCase()
          const textData = text.toLowerCase()
          return itemData.indexOf(textData) > -1 &&
            item.statusRe === 'đã duyệt'
        })
        :
        data.filter((item) => {
          const itemData = item.nameRe ? item.nameRe.toLowerCase() : ''.toLocaleLowerCase()
          const textData = text.toLowerCase()
          const priceData = item.salaryRe ? item.salaryRe.toLowerCase() : ''.toLocaleLowerCase()
          return itemData.indexOf(textData) > -1 &&
            item.statusRe === 'đã duyệt' && priceData.indexOf(price.toLowerCase()) > -1
        })
      : data.filter((item) => {
        const itemData = item.nameRe ? item.nameRe.toLowerCase() : ''.toLocaleLowerCase()
        const textData = text.toLowerCase()
        const fieldsData = item.fieldsRe ? item.fieldsRe.toLowerCase() : ''.toLocaleLowerCase()
        return itemData.indexOf(textData) > -1 &&
          item.statusRe === 'đã duyệt' && fieldsData.indexOf(fields.toLowerCase()) > -1
      }
      )
    setDataRecruits(listDataSearch)
  }
  const renderRecruitsments = (item) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, borderRadius: 10, borderWidth: 0.5, borderColor: '#ccc' }}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailsRecruitments', { detailRecruitId: item.jobId, profileRecruitId: item.userId })}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: item.imageProduct ? item.imageProduct : nobanner }} style={{ width: 110, height: 114, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}></Image>
            <View style={{ flexDirection: 'column', maxWidth: '80%', marginLeft: 5 }}>
              <Text style={{ color: '#CC3333', fontSize: 16, fontWeight: 700 }}>{item.nameRe}</Text>
              <Text style={{ fontSize: 14, }}>{item.socialsRe}</Text>
              <Text style={{ fontSize: 14, }}>{item.placeRe}</Text>
              <Text style={{ fontSize: 14, }}>{item.salaryRe}</Text>
              <Text style={{ fontSize: 14, }}>số lượt ứng tuyển: <Text style={{ color: '#22bb33' }}>{item.countApply}</Text>/<Text>{item.countRe}</Text></Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#CC3333', height: 90, alignItems: 'center' }}>
        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Tìm kiếm tin tuyển dụng</Text>
          <Text >    </Text>
        </View>
      </View>
      <View style={{ flex: 1, marginBottom: 5 }}>
        <View >
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 15 }}>Dánh sách tin tuyển dụng</Text>
          </View>
          <View>
            <TextInput style={{ backgroundColor: '#fff', fontSize: 15, marginHorizontal: 15, marginVertical: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 5 }} placeholder='Nhập tên tin tuyển dụng bạn muốn tìm'
              onChangeText={(text) => {
                onSearch(text)
                setTextSearch(text)
              }}
            ></TextInput>
            <View style={{ flexDirection: 'row' }}>
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
                onSelect={(selectedItem, index) => {
                  selectedItem.name === 'Toàn quốc' ? setProvince('') :
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
            <View style={{flexDirection:'row'}}>
            <SelectDropdown
              data={dataPrice}
              onSelect={(selectedItem, index) =>
                setPrice(selectedItem.name)
              }
              defaultButtonText={price ? price : 'castxe'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={{
                marginTop: 10,
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
              data={dataSocials}
              onSelect={(selectedItem, index) =>
                setPrice(selectedItem.name)
              }
              defaultButtonText={socialsRe ? socialsRe : 'nền tảng'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={{
                marginTop: 10,
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
         
        </View>
        <FlatList
            style={{ marginLeft: 5 }}
            data={dataRecruits}
            renderItem={({ item }) => renderRecruitsments(item)}
            keyExtractor={(item) => item.jobId}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          ></FlatList>

      </View>

    </SafeAreaView>
  )
}

export default ListRecruitmentsScreen

const styles = StyleSheet.create({})
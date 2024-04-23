import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView,Alert } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import SelectDropdown from 'react-native-select-dropdown'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import {auth,firestore} from '../../firebase'

const BankCard = ({ navigation }) => {
  const [listBank, setListBank] = useState([])
  const [moreInforData, setMoreInforData] = useState({
    bank: '',
    branch: '',
    name: '',
    accountNumber: '',
    date: '',
    place: '',
    idNumber: '',

  })
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fdate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setMoreInforData({ ...moreInforData, date: fdate })
  }

  useEffect(() => {
    fetch('https://api.vietqr.io/v2/banks')
      .then((response) => response.json())
      .then((json) => { setListBank(json.data) }
      )

  }, [])

  useEffect(() => {
    const unsubscribe = firestore.collection('users').doc(auth.currentUser.uid).onSnapshot((snapshot) => {
      const userData = snapshot.data()
      setMoreInforData({
        bank: userData.bank,
        branch: userData.branchBank,
        name: userData.nameAcountbank,
        accountNumber: userData.accountNumberBank,
        date: userData.dateBank,
        place: userData.placeBank,
        idNumber: userData.idNumberBank,
      })
    })
    return () => unsubscribe
  },[])
  const handleSave =async()=>{
    
   await firestore.collection('users').doc(auth.currentUser.uid).update({
      bank:moreInforData.bank,
      branchBank:moreInforData.branch,
      nameAcountbank:moreInforData.name,
      accountNumberBank:moreInforData.accountNumber,
      dateBank:moreInforData.date,
      placeBank:moreInforData.place,
      idNumberBank:moreInforData.idNumber,
    })
    Alert.alert('Thông báo','Lưu thông tin thành công',[{text:'OK',onPress:()=>navigation.goBack()}])
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#fff', height: 93, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }}>
        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#000'></FontAwesome>
          </TouchableOpacity>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ color: '#000', fontSize: 19, fontWeight: 600, }}>Thông tin thanh toán</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ marginTop: 15, marginLeft: 20 }}>
          <Text style={{ fontSize: 16 }}>Ngân hàng</Text>
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
                data={listBank.map(item => item.shortName)}
                onSelect={(selectedItem, index) => {
                  setMoreInforData({ ...moreInforData, bank: selectedItem })
                }}
                defaultButtonText={moreInforData.bank?moreInforData.bank:'Chọn ngân hàng'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  width: '94%',
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
                dropdownStyle={{ backgroundColor: '#EFEFEF', marginTop: -45 }}
                rowStyle={{ backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', height: 40 }}
                rowTextStyle={{ color: '#444', textAlign: 'left' }}
                selectedRowStyle={styles.dropdown1SelectedRowStyle}
                search
                searchInputStyle={styles.dropdown1searchInputStyleStyle}
                searchPlaceHolder={'Tìm kiếm ngân hàng'}
                searchPlaceHolderColor={'darkgrey'}
                renderSearchInputLeftIcon={() => {
                  return <FontAwesome name={'search'} color={'#444'} size={18} />;
                }}
              />
            </ScrollView>
          </View>
        </View>
        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '90%', alignSelf: 'center' }}></View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View>
            <Text style={{ fontSize: 16 }}>Chi nhánh</Text>
          </View>
          <TextInput placeholder={moreInforData.branch ? moreInforData.branch : 'Nhập chi nhánh ngân hàng'}
            value={moreInforData.branch}
            onChangeText={(text) => { setMoreInforData({ ...moreInforData, branch: text }) }}
          ></TextInput>
        </View>
        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '90%', alignSelf: 'center' }}></View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View>
            <Text style={{ fontSize: 16 }}>Tên chủ tài khoản</Text>
          </View>
          <TextInput placeholder={moreInforData.name ? moreInforData.name : 'Họ tên đầy đủ'}
            value={moreInforData.name}
            onChangeText={(text) => { 
              let cleanedText =text.toLocaleUpperCase()
              setMoreInforData({ ...moreInforData, name: cleanedText }) }}
          ></TextInput>
        </View>
        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '90%', alignSelf: 'center' }}></View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View>
            <Text style={{ fontSize: 16 }}>Số tài khoản</Text>
          </View>
          <TextInput placeholder={moreInforData.accountNumber ? moreInforData.accountNumber : 'Nhập số tài khoản'}
            value={moreInforData.accountNumber}
            keyboardType='numeric'
            onChangeText={(text) => {
              let cleanedText = text.replace(/[^0-9]/g, '')
              { setMoreInforData({ ...moreInforData, accountNumber: cleanedText }) }
            }}
          ></TextInput>
        </View>
        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '90%', alignSelf: 'center' }}></View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View>
            <Text style={{ fontSize: 16 }}>Ngày cấp</Text>
          </View>
          <TouchableOpacity onPress={() => setShow(true)}>
            <Text style={{ color: '#818181', paddingVertical: 4 }}>{moreInforData.date ? moreInforData.date : 'ngay cap'}</Text>
          </TouchableOpacity>
          {show && (<DateTimePicker
            mode='date'
            value={date}
            display="default"
            onChange={onChangeDate}
          >

          </DateTimePicker>)}
        </View>
        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '90%', alignSelf: 'center' }}></View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View>
            <Text style={{ fontSize: 16 }}>Nơi cấp</Text>
          </View>
          <TextInput placeholder={moreInforData.place ? moreInforData.place : 'Nhập nơi cấp'}
            value={moreInforData.place}
            onChangeText={(text) => { setMoreInforData({ ...moreInforData, place: text }) }}
          ></TextInput>
        </View>
        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '90%', alignSelf: 'center' }}></View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View>
            <Text style={{ fontSize: 16 }}>Số CMND/CCCD</Text>
          </View>
          <TextInput placeholder={moreInforData.idNumber ? moreInforData.idNumber : 'Nhập số CMND/CCCD'}
            keyboardType='numeric'
            value={moreInforData.idNumber}
            onChangeText={(text) => {
              let cleanedText = text.replace(/[^0-9]/g, '')
              { setMoreInforData({ ...moreInforData, idNumber: cleanedText }) }
            }}
          ></TextInput>
        </View>
        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '90%', alignSelf: 'center' }}></View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View>
            <Text style={{ fontSize: 16 }}>Scan ảnh chứng minh nhân dân hai mặt</Text>
          </View>

        </View>
        <View style={{ alignItems: 'center',
                           }}>
          <TouchableOpacity style={{
                            backgroundColor: '#1877F2',
                            marginTop:50,
                            padding: 15,
                            borderRadius: 10,
                            alignItems: 'center',
                            width: '50%',
                        }}
                        onPress={handleSave}
                        >
            <Text style={{fontSize:17, fontWeight:'bold',color:'#fff'}}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default BankCard

const styles = StyleSheet.create({})
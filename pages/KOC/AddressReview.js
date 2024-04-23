import { StyleSheet,  View,SafeAreaView,TouchableOpacity ,Alert} from 'react-native'
import { Text } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { firestore,auth } from '../../firebase'

const AddressReview = ({navigation}) => {
  const [dataReview, setDataReview] = useState({
    name:'',
    phone:'',
    detailAddress:'',
  })

  useEffect(()=>{
    const subscriber=firestore.collection('users').doc(auth.currentUser.uid).onSnapshot((doc)=>{
      const data=doc.data()
      setDataReview({
        name:data.nameReview,
        phone:data.phoneReview,
        detailAddress:data.detailAddress
      })
    })
    return subscriber
  },[])
  const handleSave=async()=>{
    await firestore.collection('users').doc(auth.currentUser.uid).update({
      nameReview:dataReview.name,
      phoneReview:dataReview.phone,
      detailAddress:dataReview.detailAddress
    })
    Alert.alert('Thông báo','Lưu thành công',[{text:'ok',onPress:()=>navigation.goBack()}])
    
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={{ backgroundColor: '#fff', height: 93, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }}>
      <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center' }}>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
          <FontAwesome name='chevron-left' size={22} color='#000'></FontAwesome>
        </TouchableOpacity>
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: '#000', fontSize: 19, fontWeight: 600, }}>Địa chỉ nhận hàng reiview</Text>
        </View>
      </View>
    </View>
    <View style={{marginTop:20,marginHorizontal:15}}>
      <View style={{marginVertical:10}}>
        <Text style={{fontSize:15,fontWeight:'bold'}}>Tên người nhận</Text>
        <TextInput 
        style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:5,marginTop:5}}
        placeholder={dataReview.name?dataReview.name:'Nhập tên người nhận'}
        value={dataReview.name}
        onChangeText={(text)=>setDataReview({...dataReview,name:text})}
        />
      </View>
      <View style={{marginVertical:10}}>
        <Text style={{fontSize:15,fontWeight:'bold'}}>Số điện thoại</Text>
        <TextInput 
        style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:5,marginTop:5}}
        placeholder={dataReview.phone?dataReview.phone:'Nhập số điện thoại'}
        value={dataReview.phone}
        keyboardType='numeric'
        onChangeText={(text)=>{
          let newText = text.replace(/[^0-9]/g, '')
          setDataReview({...dataReview,phone:newText})}}
        />
      </View>
      <View style={{marginVertical:10}}>
        <Text style={{fontSize:15,fontWeight:'bold'}}>Địa chỉ chi tiết</Text>
        <TextInput 
        style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:5,marginTop:5}}
        placeholder={dataReview.detailAddress?dataReview.detailAddress:' nhập địa chỉ chi tiết'}
        value={dataReview.detailAddress}
        onChangeText={(text)=>setDataReview({...dataReview,detailAddress:text})}
        />
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
    </View>

    </SafeAreaView>
  )
}

export default AddressReview

const styles = StyleSheet.create({})
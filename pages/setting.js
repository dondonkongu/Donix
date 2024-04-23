import { View, Text, TouchableOpacity, ScrollView, } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { MaterialIcons } from "@expo/vector-icons"
import Back from '../shared/Back'



const Setting = ({navigation}) => {

  const navigateToEditProfile =()=>{
    navigation.navigate('Edit profile')
  }
  const navigateToSecurity =()=>{
    
  }
  const navigateToNotifications =()=>{
    
  }
  const navigateToPrivacy =()=>{
    
  }
  const navigationToDieuKhoanDichVu=()=>{
          navigation.navigate('DieuKhoanDichVu')
  }
  const navigationToChinhSachQuyenRiegTu=()=>{

  }
  const navigationToChinhSachCookie=()=>{

  }
  const navigationToproblem=()=>{

  }
  const addAccount=()=>{

  }
  const logout=()=>{

  }
  const navigationToTieuChuanCongDong=()=>{

  }
  const navigationToGioiThieu =()=>{

  }

  const accountItems=[
    {icon: 'person-outline', text:'Edit profile',action: navigateToEditProfile },
    {icon: 'security', text:'Security',action: navigateToSecurity },
    {icon: 'notifications-none', text:'Notifications',action: navigateToNotifications},
    {icon: 'lock-outline', text:'Privacy',action: navigateToPrivacy },
  ]

  const supportItems=[
    {icon:'assignment',text:'Điều khoản dịch vụ',action:navigationToDieuKhoanDichVu},
    {icon:'privacy-tip',text:'Chính sách quyền riêng tư',action:navigationToChinhSachQuyenRiegTu},
    {icon:'change-history',text:'Chính sách cookie',action:navigationToChinhSachCookie},
    {icon:'check-circle-outline',text:'Tiêu chuẩn cộng đồng',action:navigationToTieuChuanCongDong},
    {icon:'info-outline',text:'Giới thiệu',action:navigationToGioiThieu},



  ]
  const actionItems=[
    {icon:'outlined-flag', text:'Report a problem',action:navigationToproblem},
    {icon:'people-outline',text:'Add account', action:addAccount},
    {icon:'logout',text:'Log out',action:logout}
  ]

  const renderItemsSeting = ({icon,text,action})=>{
    return(
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:8,
        paddingLeft:12,
        backgroundColor:'#CCCCCC'
      }}
    >
      <MaterialIcons name={icon} size={24} color='#000'></MaterialIcons>

        <Text style={{
          marginLeft:20,
          fontWeight:'500',
          fontSize:16,
        }}>{text}</Text>


    </TouchableOpacity>
    )
  }
  return (
  <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>

    <View style={{marginHorizontal:12,
                  flexDirection:'row',
                  justifyContent:'center',
                  alignItems:'center'
          }}>

      <Text style={{fontSize:20,fontWeight:'bold'}}>Setting</Text>

    </View>
    <ScrollView style={{marginHorizontal:12}}>
    <View style={{marginBottom:12}}>
      <Text style={{fontSize:15,marginVertical:10,fontWeight:'bold'}}>Account</Text>
      <View style={{borderRadius:12,backgroundColor:'#fff'}}>
        {
        accountItems.map((item,index)=>(
          <React.Fragment key={index} >
              {renderItemsSeting(item)}
          </React.Fragment>
        ))
        }
      </View>

    </View>
    <View style={{marginBottom:12}}>
      <Text style={{fontSize:16,marginVertical:10,fontWeight:'600'}}>Tiêu chuẩn cộng đồng và chính sách pháp lý</Text>
      <View style={{borderRadius:12,backgroundColor:'#fff'}}>
        {
        supportItems.map((item,index)=>(
          <React.Fragment key={index} >
              {renderItemsSeting(item)}
          </React.Fragment>
        ))
        }
      </View>

    </View>
    <View style={{marginBottom:12}}>
      <Text style={{fontSize:15,marginVertical:10,fontWeight:'bold'}}>Action</Text>
      <View style={{borderRadius:12,backgroundColor:'#fff'}}>
        {
        actionItems.map((item,index)=>(
          <React.Fragment key={index} >
              {renderItemsSeting(item)}
          </React.Fragment>
        ))
        }
      </View>

    </View>
    </ScrollView>
    </SafeAreaView>  
    
  )
}

export default Setting
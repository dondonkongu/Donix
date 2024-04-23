import { View, TouchableOpacity, ScrollView, SafeAreaView,Alert} from 'react-native'
import { Text } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import { FontAwesome, MaterialCommunityIcons,Foundation} from "@expo/vector-icons"
import { auth } from '../firebase';
import { UserContext } from '../navigation/UserContext';
import { useContext } from 'react';
import { ImageBackground } from 'react-native';



const ProfileUser = ({navigation}) => {

  const { setUserRole } = useContext(UserContext);

  const navigateToRecruiment =()=>{
    navigation.navigate('ApplyRecruit')
  }
  const navigateToRecruimentSaved =()=>{
    navigation.navigate('SavedRecruitments')
  }
  const navigateToRecruimentInvited =()=>{
    
  }
  const navigateToEditProfile=()=>{
    navigation.navigate('EditProfile')

  }
  const navigateToDownload=()=>{

  }
  const navigateToMoreInfor=()=>{
        navigation.navigate('MoreInfor')
  }
  const navigateToDetailsProfile=()=>{
    navigation.navigate('DetailsProfile')

  }
  const navigateToChangePassword=()=>{

  }
  const navigateToUpToLegit=()=>{
    navigation.navigate('UpToLegit')
  }
  const logout= async()=>{
    try{
      await auth.signOut();
      console.log('dang xuat thanh cong')
    }catch(error){
      console.log('loi dang xuat', error)
    }
    Alert.alert( 'Thông báo', 'Bạn đã đăng xuất thành công', [ { text: 'OK', onPress: () => navigation.navigate('Login') } ])
    setUserRole('')

  }

  const menuItems=[
    {icon: 'text-box-check-outline', text:'Việc làm đã ứng tuyển',action: navigateToRecruiment },
    {icon: 'heart', text:'Việc làm đã lưu',action: navigateToRecruimentSaved },
    {icon: 'hand-wave-outline', text:'Việc làm được mời tham gia',action: navigateToRecruimentInvited},
    
  ]

  const supportItems=[
    {icon:'file-document-edit-outline',text:'Chỉnh sửa hồ sơ',action:navigateToEditProfile},
    {icon:'cloud-download-outline',text:'Tải xuống',action:navigateToDownload},
    {icon:'text-box-plus-outline',text:'Thông tin bổ sung',action:navigateToMoreInfor},

  ]
  const actionItems=[
    {icon:'account-box-outline', text:'Xem profile',action:navigateToDetailsProfile},
    {icon:'key-change',text:'Đổi mật khẩu', action:navigateToChangePassword},
    {icon:'account-check',text:'Nâng cấp tài khoản',action:navigateToUpToLegit},
    {icon:'logout',text:'Log out',action:logout}
  ]

  const renderItemsSeting = ({icon,text,action})=>{
    return(
      <View style={{borderRadius:20, backgroundColor:'#fff',
    }}>
    
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection:'row',
        alignItems:'center',
        paddingTop: 11,
        paddingVertical:8,
        paddingLeft:12,
      }}
    >
      <View style={{flex:1, flexDirection:'row',
        alignItems:'center',}}>
      <MaterialCommunityIcons name={icon} size={24} color='#CC3333'></MaterialCommunityIcons>

        <Text style={{
          marginLeft:20,
          fontWeight:'500',
          fontSize:16,
        }}>{text==='Nâng cấp tài khoản'?(<View style={{flexDirection:'row'}}><Text style={{fontWeight:'500',
        fontSize:16,}}>{text}  </Text><Foundation name='burst-new' size={24} color='#CC3333'/></View>):text}</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' size={20} color='#ccc' style={{marginRight:15}} ></MaterialCommunityIcons>


    </TouchableOpacity>
    </View>
    )
  }
  return (
  <SafeAreaView style={{flex:1}}>
     <ImageBackground source={require('../assets/image/redimage.jpg')} resizeMode='cover'>
    <View style={{ height:95, alignItems:'center'}}>
     

<View style={{marginTop:55,flexDirection:'row',width:'95%', alignItems:'center', justifyContent:'space-between'}}>
  
<TouchableOpacity style={{marginLeft:10}} onPress={()=>{navigation.goBack()}}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
        </TouchableOpacity>
      <Text style={{color:'#fff',fontSize:20, fontWeight:700}}>Tôi</Text>
      <Text >    </Text>
      
</View>
</View>  
</ImageBackground>

    <ScrollView style={{backgroundColor:'#f6f6f6'}}>
      <View style={{marginHorizontal:12}}>
    <View style={{marginBottom:12}}>
      <Text style={{fontSize:15,marginVertical:10,fontWeight:'bold'}}>Quản lí việc làm</Text>
      <View style={{borderRadius:12,backgroundColor:'#fff', shadowColor: '#52006A', elevation: 6,}}>
        {
        menuItems.map((item,index)=>(
          <React.Fragment key={index} >
              {renderItemsSeting(item)}
          </React.Fragment>
        ))
        }
      </View>

    </View>
    <View style={{marginBottom:12}}>
      <Text style={{fontSize:15,marginVertical:10,fontWeight:'bold'}}>Quản lí hồ sơ</Text>
      <View style={{borderRadius:12,backgroundColor:'#fff', shadowColor: '#52006A', elevation: 6,}}>
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
      <Text style={{fontSize:15,marginVertical:10,fontWeight:'bold'}}>Quản lí tài khoản</Text>
      <View style={{borderRadius:12,backgroundColor:'#fff', shadowColor: '#52006A', elevation: 6,}}>
        {
        actionItems.map((item,index)=>(
          <React.Fragment key={index} >
              {renderItemsSeting(item)}
          </React.Fragment>
        ))
        }
      </View>

    </View>
    </View>
    </ScrollView>
    </SafeAreaView>  
    
  )
}

export default ProfileUser

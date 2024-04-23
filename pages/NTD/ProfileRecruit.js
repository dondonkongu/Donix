import { StyleSheet, View ,SafeAreaView,ScrollView, TouchableOpacity,ImageBackground} from 'react-native'
import { Text } from 'react-native-elements'
import React from 'react'
import { Foundation, MaterialCommunityIcons,FontAwesome} from "@expo/vector-icons"
import { useContext } from 'react'
import { UserContext } from '../../navigation/UserContext'
import { auth } from '../../firebase'

const ProfileRecruit = ({navigation}) => {
  const {setUserRole} = useContext(UserContext)

  const navigationToCreateRecruits=()=>{
        navigation.navigate('CreateRecruit')
  }
  const navigationToFileRecruits=()=>{
       navigation.navigate('FileRecruit')
  }

  const navigationToFileCandidates =()=>{
      navigation.navigate('Candidate')
  }
  const navigationToReportRecruits=()=>{
    
  }
  const navigationToEditProfileRecruits =()=>{
    navigation.navigate('EditProfileRecruitment')
  }
  const navigationToDetailProfileRecruits = ()=>{
    navigation.navigate('DetailsProfileRecruitment')

     
  }
  const navigationToSearchKoc =()=>{
    navigation.navigate('ListKocScreen')
  }
  const navigationToSavedKoc=()=>{
    navigation.navigate('LikeKocs')
    
  }
  const navigationToPayment =()=>{

  }
  const handleLogout= async()=>{
    try{
      await auth.signOut();
      console.log('dang xuat thanh cong')
    }catch(error){
      console.log('loi dang xuat', error)
    }

    navigation.navigate('Login')
    setUserRole('')

  }
  const navigateToUpToLegit=()=>{
      navigation.navigate('UpToLegit')
  }

  
  const searchKoc =[
    {icon:'account-search',text:'Tìm kiếm Koc',action:navigationToSearchKoc},
    {icon:'account-multiple-check',text:'Danh sách Koc đã lưu',action:navigationToSavedKoc},
  ]
  const manageRecruitmentsItems=[
    {icon:'briefcase-plus',text:'Tạo tin tuyển dụng',action:navigationToCreateRecruits},
    {icon:'clipboard-file',text:'Hồ sơ tin tuyển dụng ',action:navigationToFileRecruits},
    {icon:'human-male-board-poll',text:'Ứng Viên đã ứng tuyển',action:navigationToFileCandidates},
    {icon:'file-check',text:'Báo cáo chiến dịch ',action:navigationToReportRecruits},
  ]

  const profileItems=[
    {icon:'briefcase-edit-outline', text:'Cập nhật hồ sơ', action:navigationToEditProfileRecruits},
    {icon:'briefcase-account',text:'Xem hồ sơ', action:navigationToDetailProfileRecruits},
    {icon:'wallet', text:'Gói dịch vụ và thanh toán',action:navigationToPayment},
    {icon:'briefcase-check',text:'Nâng cấp tài khoản',action:navigateToUpToLegit},
    {icon:'logout',text:'Đăng xuất', action : handleLogout},
  ]
  const renderItemManage =({icon,text,action})=>{
    return(
    <View style={{borderRadius:20,backgroundColor:'#fff'}}>
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
      <MaterialCommunityIcons name={icon} size={24} color='#f9530b'></MaterialCommunityIcons>

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
     
     <ImageBackground source={require('../../assets/image/redimage.jpg')} resizeMode='cover'>
    <View style={{ height:80, alignItems:'center'}}>
     

<View style={{marginTop:45,flexDirection:'row',width:'95%', alignItems:'center', justifyContent:'space-between'}}>
  
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
        <Text style={{fontSize:15,marginVertical:10,fontWeight:'bold'}}>Koc</Text>
        <View style={{borderRadius:12,backgroundColor:'#fff', shadowColor: '#52006A', elevation: 6,}}>
          {
          searchKoc.map((item,index)=>(
            <React.Fragment key={index} >
                {renderItemManage(item)}
            </React.Fragment>
          ))
          }
        </View>
  
      </View>
      <View style={{marginBottom:12}}>
        <Text style={{fontSize:15,marginVertical:10,fontWeight:'bold'}}>Quản lí tuyển dụng</Text>
        <View style={{borderRadius:12,backgroundColor:'#fff', shadowColor: '#52006A', elevation: 6,}}>
          {
          manageRecruitmentsItems.map((item,index)=>(
            <React.Fragment key={index} >
                {renderItemManage(item)}
            </React.Fragment>
          ))
          }
        </View>
  
      </View>
      <View style={{marginBottom:12}}>
        <Text style={{fontSize:15,marginVertical:10,fontWeight:'bold'}}>Quản lí tài khoản</Text>
        <View style={{borderRadius:12,backgroundColor:'#fff', shadowColor: '#52006A', elevation: 6,}}>
          {
          profileItems.map((item,index)=>(
            <React.Fragment key={index} >
                {renderItemManage(item)}
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

export default ProfileRecruit

const styles = StyleSheet.create({})
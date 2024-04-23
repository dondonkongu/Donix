import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import Back from '../../shared/Back';
import { useEffect } from 'react';
import { auth, firestore,database } from '../../firebase';
import {  MaterialCommunityIcons} from "@expo/vector-icons"
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ProfileWallRecruit = ({ navigation }) => {
    const route=useRoute()
    const profileId=route.params.idNtd
  const windowWidth = Dimensions.get('window').width;
  const windowHeight =  Dimensions.get('window').height;

  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w';
  const nobanner ='https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'

  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [recruitments,setRecruitments] = useState([])
  const [dataBrand,setDataBrand]=useState({
    name:'',
    tax:'',
    address:'',
    website:'',
    intro:'',
    legit:'',
})
const [dataContact,setDataContact]=useState({
  namecontact:'',
  phonenumber:'',
  emailcontact:'',
})
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userId = profileId
        firestore
          .collection('users')
          .doc(userId)
          .get()
          .then(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setBanner(userData.banner);
              setAvatar(userData.avatar);
              setDataBrand({
                name:userData.name,
                tax:userData.tax,
                address:userData.address,
                website:userData.website,
                intro:userData.intro,
                legit:userData.legit,

              })
              setDataContact({
                namecontact:userData.namecontact,
                phonenumber:userData.phonenumber,
                emailcontact:userData.emailcontact,
              }
                )
            }
          })
          .catch(error => {
            console.log("loi truy van thong tin", error);
          })
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const user = auth.currentUser
    if(user){const userId=profileId
    database.ref(`ListRecuits/${userId}`).once('value')
      .then((snapshot) => {
        const recruits = snapshot.val()
        const recruitments = []
        Object.keys(recruits).map((key) => {
          const recruit = recruits[key]
          recruit.id = key
          recruit.userId=userId
          recruitments.push(recruit)
          

        })
        setRecruitments(recruitments)

      
      })
      .catch((error) => {
        console.log('Đã xảy ra lỗi o day: ', error);
      });}
  }, []);


  const handleImagePress = (image) => {
    setSelectedImage(image);
    setImageModalVisible(true);
  };
  const renderRecruitsments=({item})=>{

    return (
      <View style={{backgroundColor:'#fff', borderRadius:5, margin:10,width:windowWidth-20, shadowColor: '#000', elevation: 5,  }} >
      <TouchableOpacity onPress={()=>{navigation.navigate('DetailsRecruitments',{detailRecruitId:item.id,profileRecruitId:item.userId})}} style={{flexDirection:'row'}}>
        <View>
      <Image source={{uri:item.imageProduct?item.imageProduct:noAvatar}} style={{height:100,width:100,marginRight:10,borderBottomLeftRadius:5,borderTopLeftRadius:5}}></Image>
      </View>
      <View style={{flexDirection:'column',margin:10,width:windowWidth-145}}>
        <Text style={{fontSize:15, fontWeight:'600',color:'#CC3333'}}>{item.nameRe}</Text>
        <Text style={{color:'#6e7a73'}}>Nền tảng:<Text style={{color:'#00719c'}}>{item.socialsRe}</Text></Text>
        <Text style={{color:'#6e7a73'}}>Mở đến:<Text style={{color:'#00719c'}}> {item.deadlineTimeRe}</Text></Text>
      </View>
      </TouchableOpacity>
    </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeeee'}}>
      <Back navigation={navigation} />
      
      <ScrollView>
        <View style={{backgroundColor:'#fff',borderBottomEndRadius:5,borderBottomStartRadius:5}}>
        <View>
          <TouchableOpacity onPress={() => handleImagePress(banner)}>
            <Image
              source={{ uri: banner?banner:nobanner }}
              resizeMode='cover'
              style={{ height: 200, width: windowWidth}}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-start',flexDirection:'row'}}>
          <TouchableOpacity onPress={() => handleImagePress(avatar ? avatar : noAvatar)}
        >
            <Image
              source={{ uri: avatar ? avatar : noAvatar }}
              resizeMode='cover'
              style={{
                height: 130,
                width: 130,
                borderWidth: 1,
                borderColor: '#fff',
                marginTop: -50
              }}
            />
          </TouchableOpacity>
        
        <View style={{
                marginLeft: 5,
                flexDirection: 'column',
               }}
                >
                {dataBrand.legit==='duyệt'?(
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                  <Text style={{fontSize: 18,
                fontWeight: '800',
                textAlign: 'left',
                marginLeft: 10,
                color:'#CC3333'}}>{dataBrand.name}</Text>
                <MaterialCommunityIcons name='bookmark-check' size={22} color='#ffce00' style={{marginLeft:1}} ></MaterialCommunityIcons>

                </View>):(<Text style={{fontSize: 18,
                marginTop:18,
                fontWeight: '800',
                textAlign: 'left',
                marginLeft: 10,
                color:'#CC3333'}}>{dataBrand.name}</Text>)}
          
          <View style={{flexDirection:'row',alignItems:'center',marginTop:5,marginLeft:5}}>
          <MaterialCommunityIcons name='map-marker'size={22}></MaterialCommunityIcons>
          <Text style={{
              	fontSize:16,
                textAlign: 'left',
                color:'#4a80f5',
                }} >{dataBrand.address}</Text>    
                </View>  
        </View>
        </View>
        
        </View>
        <View style={{backgroundColor:'#fff',borderRadius:5,marginTop:15}}>
          <View style={{alignItems:'center'}}>
          <Text style={{fontSize:18,fontWeight:'700',marginTop:10,color:'#8c4083'}}>Giới thiệu công ty</Text>
          </View>
          <Text style={{fontSize:15,marginHorizontal:10,marginVertical:10}}>{dataBrand.intro?dataBrand.intro:'#default#'}</Text>
        </View>
        <View style={{backgroundColor:'#fff',borderRadius:5,marginTop:15}} >
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:18,fontWeight:'700',marginTop:10,color:'#8c4083'}} >Thông tin liên hệ</Text>
            </View>
            <View style={{marginHorizontal:10}}>
            <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
                <MaterialCommunityIcons name='account-outline' size={22} color='#009bd6'></MaterialCommunityIcons>
                <Text style={{width:'40%',marginLeft:20,fontSize:16}}>Người liên hệ:</Text>
                <Text style={{fontSize:16,color:'#154362',fontWeight:'500'}}>{dataContact.namecontact?dataContact.namecontact:'#default '}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
            <MaterialCommunityIcons name='email-outline' size={22} color='#009bd6'></MaterialCommunityIcons>
                <Text style={{width:'40%',marginLeft:20,fontSize:16}}>Email:</Text>
                <Text style={{fontSize:16,color:'#154362',fontWeight:'500'}}>{dataContact.emailcontact?dataContact.emailcontact:'#default '}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
            <MaterialCommunityIcons name='phone-outline' size={22} color='#009bd6'></MaterialCommunityIcons>
                <Text style={{width:'40%',marginLeft:20,fontSize:16}}>Điện thoại:</Text>
                <Text style={{fontSize:16,color:'#154362',fontWeight:'500'}}>{dataContact.phonenumber?dataContact.phonenumber:'#default '}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',marginTop:10,marginBottom:10}}>
            <MaterialCommunityIcons name='web' size={22} color='#009bd6'></MaterialCommunityIcons>
                <Text style={{width:'40%',marginLeft:20,fontSize:16}}>Website:</Text>
                <Text style={{fontSize:16,color:'#154362',fontWeight:'500'}}>{dataBrand.website?dataBrand.website:'#default '}</Text>
            </View>
            </View>
        </View>
        <View style={{backgroundColor:'#fff',borderRadius:5,marginTop:15}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:18,fontWeight:'700',marginTop:10,color:'#8c4083'}}>Tuyển dụng</Text>
          </View>
          <ScrollView horizontal={true} style={{marginTop:10}}>
          <FlatList
            data={recruitments}
            renderItem={renderRecruitsments}
            keyExtractor={(item)=>item.id}
          >

          </FlatList>
          </ScrollView>
        </View>
        <Modal visible={isImageModalVisible} transparent={true} >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#000'}}
            onPress={() => setImageModalVisible(false)}
          >
            <MaterialCommunityIcons name='close' size={25} color='#000' style={{
              marginTop:85,marginLeft:-300,backgroundColor:'#ccc'
            }}>

            </MaterialCommunityIcons>
            <Image
              source={{ uri: selectedImage }}
              style={{ width: '100%', height: '100%' }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </Modal>

       
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default ProfileWallRecruit;

const styles = StyleSheet.create({});
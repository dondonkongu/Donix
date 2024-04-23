import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, ScrollView,Alert } from 'react-native'
import { Text } from 'react-native-elements';
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { auth, firestore,database } from '../../firebase';
import { MaterialCommunityIcons, Feather,MaterialIcons } from 'react-native-vector-icons'

import Back from '../../shared/Back';
import { useRoute } from '@react-navigation/native'
import GalleryWall from './GalleryWall';
import { UserContext } from '../../navigation/UserContext'
import TopTabBar from '../../navigation/TopTabBar';


const ProfileWallDetail = ({ navigation }) => {
  const nobanner = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'

  const route = useRoute()
  const profileId = route.params.profileId
  const { userRole } = useContext(UserContext)
  const [userName, setUserName] = useState('')
  const [avatar, setAvatar] = useState('../assets/image/person-default.jpg')
  const [address, setAddress] = useState('')
  const [fields, setFields] = useState('')
  const [legit, setLegit] = useState('')
  
  const [loading, setLoading] = useState(true)
  const [banner, setBanner] = useState('')
  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w';

  const [isSaved,setIsSaved]=useState(false)
  useEffect(() => {
    const unsubscribe = database.ref(`ListSavedKocs/${auth.currentUser.uid}/${profileId}`).on('value',snapshot=>{
      if(snapshot.exists()){
        setIsSaved(snapshot.val().status)
      }
    })
    return () => unsubscribe
  },[])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        firestore
          .collection('users')
          .doc(profileId)
          .get()
          .then(doc => {
            if (doc.exists) {
              const userData = doc.data()
              setUserName(userData.name)
              setAvatar(userData.avatar)
              setAddress(userData.address)
              setFields(userData.fields)
              setBanner(userData.banner)
             
              setLegit(userData.legit)
              setLoading(false)
             
            }
          })
          .catch(error => { console.log("loi truy van thong tin", error) })
      }
    })
    return () => unsubscribe();
  }, [])

 
  const handleLikeKocs=()=>{
    database.ref(`ListSavedKocs/${auth.currentUser.uid}/${profileId}`).update({
      status:true
    })
  }
const handleUnLikeKocs=()=>{
  database.ref(`ListSavedKocs/${auth.currentUser.uid}/${profileId}`).update({
    status:false
  })
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
              <Back navigation={navigation}></Back>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (<View
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View >
          <View >
            <Image
              source={{uri:banner?banner:nobanner}}
              resizeMode='cover'
              style={{
                height: 200,
                width: '100%'
              }}
            >
            </Image>
          </View>
          <View style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
            <Image
              source={{ uri: avatar ? avatar : noAvatar }}
              resizeMode='cover'
              style={{
                height: 120,
                width: 120,
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: '#fff',
                marginTop: -50
              }}
            ></Image>
            <View style={{
            alignItems: "flex-start",
            flexDirection: 'column',
            marginTop: 6,
            marginLeft:10,

          }}>{legit==='duyệt'?(<View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{userName}</Text>
            <MaterialIcons name='verified' color='#15a7ff' size={22} style={{marginLeft:5}}></MaterialIcons>

          </View>):(<View>
            <Text style={{
              fontSize: 18,
              fontWeight: '800',
              textAlign: 'left',
              marginLeft: 0,
              color: '#CC3333'

            }}>{userName}</Text>
          </View>)}
          {fields&&(  
            <View style={{ marginTop: 5 }}>
              <Text style={{ textAlign: 'left', marginLeft: 5 }}>{fields}</Text>
            </View>)}
            {address&&( <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <MaterialCommunityIcons
                name={address ? 'map-marker-outline' : ''}
                size={22}>
              </MaterialCommunityIcons>
              <Text style={{ marginLeft: 5, textAlign: 'left' }}>{address}</Text>
            </View>)}
           
          </View>

          </View>

          {userRole === 'NTD' && (<View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity style={{ marginHorizontal: 53, backgroundColor: '#CC3333', width: '30%', padding: 10, borderRadius: 10, alignItems: 'center', flexDirection: 'row' }}
              onPress={() => { navigation.navigate('Chat', { chatId: profileId,chatname:userName })}}
            >
              <Feather name='send' color='#fff' size={17}></Feather>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 16, marginLeft: 12 }}>Liên hệ</Text>
            </TouchableOpacity>
            {isSaved?(<TouchableOpacity style={{ backgroundColor: '#fff', width: '30%', padding: 10, borderRadius: 10, borderWidth: 2, borderColor: '#CC3333', alignItems: 'center', flexDirection: 'row' }}
              onPress={handleUnLikeKocs}
            >
              <MaterialCommunityIcons name='cards-heart' color='#CC3333' size={22} ></MaterialCommunityIcons>
              <Text style={{ color: '#CC3333', fontWeight: '700', fontSize: 16, marginLeft: 5 }}>Bỏ thích</Text>
            </TouchableOpacity>):(<TouchableOpacity style={{ backgroundColor: '#fff', width: '30%', padding: 10, borderRadius: 10, borderWidth: 2, borderColor: '#CC3333', alignItems: 'center', flexDirection: 'row' }}
              onPress={handleLikeKocs}
            >
              <MaterialCommunityIcons name='cards-heart-outline' color='#CC3333' size={22} ></MaterialCommunityIcons>
              <Text style={{ color: '#CC3333', fontWeight: '700', fontSize: 16, marginLeft: 5 }}>Yêu thích</Text>
            </TouchableOpacity>)}
          </View>)}
        </View>
        <View style={{flex:1,  }}>
          <TopTabBar profileId={profileId} />
        </View>
      </View>)}
    </SafeAreaView>

  )
}

export default ProfileWallDetail

const styles = StyleSheet.create({})
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { Text } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { auth, firestore } from '../firebase';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons'

import Back from '../shared/Back';
import TopTabBar from '../navigation/TopTabBar';


const DetailsProfile = ({ navigation }) => {
  const nobanner = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'


  const [userName, setUserName] = useState('')
  const [avatar, setAvatar] = useState('../assets/image/person-default.jpg')
  const [address, setAddress] = useState('')
  const [fields, setFields] = useState('')
  const [banner, setBanner] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [legit, setLegit] = useState('')
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState('')
  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-avatar.png?alt=media&token=f38e4aab-a824-4529-9416-29e90278ff8e&_gl=1*1oalg4q*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NjEzMTU5OS40MS4xLjE2OTYxMzI0OTMuMzkuMC4w'

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid;
        firestore
          .collection('users')
          .doc(userId)
          .get()
          .then(doc => {
            if (doc.exists) {
              const userData = doc.data()
              setUserName(userData.name)
              setAvatar(userData.avatar)
              setAddress(userData.address)
              setBanner(userData.banner)
              setFields(userData.fields)
              setTiktok(userData.tiktok)
              setLegit(userData.legit)
              setLoading(false)
              setPrice(userData.price)
            }
          })
          .catch(error => { console.log("loi truy van thong tin", error) })
      }
    })
    return () => unsubscribe();
  }, [])

 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      {loading ? (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (<SafeAreaView
        style={{ flex: 1, backgroundColor: '#fff' }}
      >

        <Back navigation={navigation}></Back>
        <View>
          <Image
            source={{ uri: banner ? banner : nobanner }}
            resizeMode='cover'
            style={{
              height: 180,
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
            alignItems: "center",
            flexDirection: 'column',
            marginTop: 6,
            marginLeft: 10

          }}>
            {legit === 'duyệt' ? (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{userName}</Text>
              <MaterialIcons name='verified' color='#15a7ff' size={22} style={{ marginLeft: 5 }}></MaterialIcons>

            </View>) : (<View>
              <Text style={{
                fontSize: 20,
                fontWeight: '800',
                textAlign: 'left',
                marginLeft: 0,
                color: '#CC3333'

              }}>{userName}</Text>
            </View>)}

            <Text style={{ textAlign: 'left', marginLeft: 5 }}>{fields}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <MaterialCommunityIcons
                name={address ? 'map-marker-outline' : ''}
                size={22}>
              </MaterialCommunityIcons>
              <Text style={{ marginLeft: 1, textAlign: 'left' }}>{address}</Text>
            </View>
          </View>
        </View>


        <View style={{ flex: 1 }}>
          <TopTabBar profileId={auth.currentUser.uid} />
        </View>

      </SafeAreaView>)}

    </SafeAreaView>

  )
}

export default DetailsProfile

const styles = StyleSheet.create({})
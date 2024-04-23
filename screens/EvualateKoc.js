import { SafeAreaView, StyleSheet, View,Dimensions ,TouchableOpacity} from 'react-native'
import { Text } from 'react-native-elements'
import React, { useEffect } from 'react'
import { auth, database } from '../firebase'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'

const EvualateKoc = ({ navigation}) => {

  const windowWidth = Dimensions.get('window').width;

  const route = useRoute();
  const profileId=route.params.profileId
  const [dataEvualate, setDataEvualate] = useState([])

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      database.ref(`User/${profileId}/evalute`).on('value', (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const data1 = []
          Object.keys(data).map((recruitId) => {
            const data3 = data[recruitId]
            data3.recruitId = recruitId
            
            data1.push(data3)

          })
          setDataEvualate(data1)
          console.log('data',data1)
          
        }
      })
    }
  }, [])
  return (
    <SafeAreaView style={{flex:1,  backgroundColor: '#fff' }}>
      <View style={{flex:1}}>
      {dataEvualate.map((item, index) => {
        return(
         <View key={index} style={{ margin: 10, flexDirection: 'collumn', width: windowWidth, backgroundColor: '#fff', borderRadius: 10 }}>
         <View style={{ marginRight:20}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('DetailsRecruitments',{detailRecruitId:item.recruitId,profileRecruitId:item.idbrand})}}> 
           <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.nameRecruit}</Text>
           </TouchableOpacity>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            
             <AntDesign name={item.star1 ? 'star' : 'staro'} size={24} color="#FFD700" />
             <AntDesign name={item.star2 ? 'star' : 'staro'} size={24} color="#FFD700" />
             <AntDesign name={item.star3 ? 'star' : 'staro'} size={24} color="#FFD700" />
             <AntDesign name={item.star4 ? 'star' : 'staro'} size={24} color="#FFD700" />
             <AntDesign name={item.star5 ? 'star' : 'staro'} size={24} color="#FFD700" />
           </View>
           <View>
           <Text>{item.danhgia}</Text>
         </View>
         </View>
         
       </View>)
      })}
      </View>
     
     
    </SafeAreaView>
  )
}

export default EvualateKoc

const styles = StyleSheet.create({})
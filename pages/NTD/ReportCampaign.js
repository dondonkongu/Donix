import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import { FontAwesome } from "@expo/vector-icons"
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useEffect } from 'react'
import { useState } from 'react'
import { database, auth, firestore } from '../../firebase'
import Loading from '../../screens/Loading'
import { Pressable } from 'react-native'

const ReportCampaign = ({ navigation }) => {
  const route = useRoute()
  const recruitName = route.params.recruitName
  const candidateName = route.params.KocName
  const reportText = route.params.reportText
  const linkVideo = route.params.linkvideo
  const idRecruit = route.params.idRecruit
  const idKoc = route.params.idKoc
  const [legit,setLegit]=useState('')
  const [dataAnalytic, setDataAnalytic] = useState({
    view:'',
    like:'',
    share:'',
    comment:'',
  })
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleAnalytic = () => {
    setIsModalVisible(true)
  }
  const handleEvalute =()=>{
    navigation.navigate('Evalute',{idRecruit:idRecruit,idKoc:idKoc,nameRecruit:recruitName,nameKoc:candidateName})
  }
  useEffect(()=>{
      try {
        const user = auth.currentUser
        if (user) {
          const userId = user.uid
          database.ref(`Candidate/${userId}/${idRecruit}/${idKoc}`).on('value', (snapshot) => {
            const data = snapshot.val()
            if (data) {
              setDataAnalytic({
                view: data.view,
                like: data.like,
                share: data.share,
                comment: data.comment,
              })
              setLoading(false)
            }
          })
          firestore.collection('users').doc(userId).get().then(doc=>{
            if(doc.exists){
              const userData = doc.data()
              setLegit(userData.legit)
            }
          }
            
            )
          
        }
      } catch (error) {
        console.log('loi truy van analytic', error) 
      }
    

  },[])
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#CC3333', height: 93, alignItems: 'center' }}>
        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Chi tiết báo cáo</Text>
          <Text >    </Text>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 15 }}>Tên chiến dịch: <Text style={{ color: '#0e5aef' }}>{recruitName}</Text></Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, marginLeft: 15 }}>Tên KOC: <Text style={{ color: '#CC3333' }}>{candidateName}</Text></Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 15, marginLeft: 15 }}>Nội dung báo cáo: </Text>
          <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15 }}>{reportText}</Text>
        </View>
        <View style={{ marginTop: 25, marginHorizontal: 15 }}>
          <View style={{}}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Link video</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={{ textDecorationLine: 'underline', marginTop: 15, fontSize: 15 }}>{linkVideo}</Text>
            </TouchableOpacity>
          </View>
        </View>
      
        <View style={{flexDirection:'row', marginTop: 30, alignItems: 'center', justifyContent: 'space-around'}}>
          <TouchableOpacity style={{ backgroundColor: '#CC3333', width: '40%', padding: 15, borderRadius: 10, alignItems: 'center' }}
            onPress={handleAnalytic}
          >
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}> Số liệu phân tích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#CC3333', width: '40%', padding: 15, borderRadius: 10, alignItems: 'center' }}
            onPress={handleEvalute}
          >
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>Đánh giá</Text>
          </TouchableOpacity>
          
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}>
            <View style={{
              marginTop: 250,
              margin: 30,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
              
              {legit==='duyệt'?loading?(<Loading></Loading>):(  <View>
                <Text style={styles.text}>Lượt xem: {dataAnalytic.view}</Text>
                <Text style={styles.text}>Lượt thích: {dataAnalytic.like}</Text>
                <Text style={styles.text}>Lượt chia sẻ: {dataAnalytic.share}</Text>
                <Text style={styles.text}>Lượt bình luận: {dataAnalytic.comment}</Text>
               
              </View>):(<View>
                  <Text>Bạn phải nâng cấp tài khoản mới sử dụng được dịch vụ này !! </Text>

              </View>)}
            
              <Pressable>
                <Text style={{ color: '#CC3333', fontSize: 20, fontWeight: 'bold', marginTop: 20 }} onPress={() => setIsModalVisible(false)}>Đóng</Text>
              </Pressable>
            </View>

          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReportCampaign

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginBottom: 5,
  },
})
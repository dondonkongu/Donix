import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput,Alert } from 'react-native'
import { FontAwesome } from 'react-native-vector-icons'
import React,{useState} from 'react'
import { useRoute } from '@react-navigation/native'
import { auth, database } from '../../firebase'

const SubmitJobs = ({ navigation }) => {
  const route = useRoute()
  const idBrand = route.params.profileRecruitId
  const idDetails = route.params.detailRecruitId
  const [textReport,setTextReport] = useState('')
  const [linkVideo,setLinkVideo] = useState('')
  const [textReportError,setTextReportError] = useState(false)
  const [linkVideoError,setLinkVideoError] = useState(false)

  const handleSubmit = () => {
    if(textReport===''){
      setTextReportError(true)
      Alert.alert('Thông báo','nội dung báo cáo không được để trống')
    }
    else if(linkVideo===''){
      setLinkVideoError(true)
      Alert.alert('Thông báo','link video không được để trống')
      
    }
    else{
    try {
      const user = auth.currentUser
      if(user){
        const userId = user.uid
        const ref = database.ref(`User/${userId}/apllyRecruit/${idDetails}/`)
        ref.update({textReport:textReport,linkVideo:linkVideo,status:'đã nộp'})
        const ref2 = database.ref(`Candidate/${idBrand}/${idDetails}/${userId}`) 
        ref2.update({textReport:textReport,linkVideo:linkVideo,status:'đã nộp',view:0,like:0,share:0,comment:0})
        database.ref(`ListRecuits/${idBrand}/${idDetails}`).once('value')
        .then((snapshot)=>{
          const data = snapshot.val()
          const counteport = data.countReport
          database.ref(`ListRecuits/${idBrand}/${idDetails}`).update({countReport:counteport+1})
        })
      }
      Alert.alert('Thông báo ','nộp báo cáo thành công')
      navigation.navigate('ApplyRecruit')
      
    } catch (error) {
      console.log('loi submit',error)
    }
  }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#CC3333', height: 93, alignItems: 'center' }}>
        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Nộp báo cáo</Text>
          <Text >    </Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 16 }}>Bạn nộp báo cáo, link video, hoặc bài viết theo yêu cầu của nhà tuyển dụng ở đây nhé, báo cáo của bạn sẽ được nhãn hàng xem xét để trao cast </Text>
        </View>
        <View style={textReportError?{ height: 100,
          height: 100,
          borderRadius: 5,
          backgroundColor: '#fff',
          borderColor: 'red',
          borderWidth: 1,
          marginVertical: 10,
          marginHorizontal: 10,
          paddingHorizontal: 5
        }:{height: 100,
          height: 100,
          borderRadius: 5,
          backgroundColor: '#fff',
          borderColor: '#ccc',
          borderWidth: 1,
          marginVertical: 10,
          marginHorizontal: 10,
          paddingHorizontal: 5}}>
          <TextInput
            placeholder='nội dung báo cáo'
            multiline={true}
            value={textReport}
            onChangeText={(text)=>setTextReport(text)}
            style={{ padding: 1, marginTop: 1, fontSize: 15 }}
          ></TextInput>
        </View>
        <View style={{ margin: 10 }}>
          <Text>nộp link video hoặc bài viết ở đây (bạn nhớ đọc kỹ yêu cầu của nhà tuyển dụng nhé) :</Text>
        </View>
        <TextInput
          placeholder='link video hoặc bài viết'
          multiline={true}
          value={linkVideo}
          onChangeText={(text)=>setLinkVideo(text)}
          style={linkVideoError?{ fontSize: 15, borderWidth: 1, borderColor: 'red', borderRadius: 5, marginVertical: 10, marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 5 }:{ fontSize: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginVertical: 10, marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 5 }}
        ></TextInput>
        <View style={{marginTop:20}}>
          <TouchableOpacity style={{ backgroundColor: '#b06ab3', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginHorizontal: 10 }}
            onPress={handleSubmit}
          >
            <Text style={{ color: '#fff', fontSize: 16,fontWeight:'bold' }}>nộp báo cáo</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default SubmitJobs

const styles = StyleSheet.create({})
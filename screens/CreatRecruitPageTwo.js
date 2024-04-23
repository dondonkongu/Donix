import { StyleSheet, Text, View,SafeAreaView,ScrollView, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import {FontAwesome} from 'react-native-vector-icons'
import { TextInput } from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { auth, database } from '../firebase'


const CreatRecruitPageTwo = ({navigation}) => {
    const route = useRoute();
    const recruitsId = route.params.recruitsId;


    const [dataRecruits,setDataRecruits]=useState({
        describeRe:'',
        requireRe:'',
        castRe:'',
    })

    const handleSubmit=async()=>{
        try {
            const user = auth.currentUser;
            if (user) {
              const userId = user.uid;
              await database.ref(`ListRecuits/${userId}/${recruitsId}`)
                .update({
                describeRe:dataRecruits.describeRe,
                requireRe:dataRecruits.requireRe,
                castRe:dataRecruits.castRe,
                countApply:0,
                countApprove:0,
                countReport:0,
                countDone:0,
                });
            }
            Alert.alert('thông báo',' tạo tin thành công')
          } catch {error=>{console.log('loi'),error}
          Alert.alert('thông báo','khong the tao tin')
          }


    }
  return (
    <SafeAreaView style={{flex:1}}>
       
    <View style={{backgroundColor:'#CC3333', height:93, alignItems:'center'}}>

     <View style={{marginTop:55,flexDirection:'row',width:'95%', alignItems:'center', justifyContent:'space-between'}}>
        <TouchableOpacity style={{marginLeft:10}} onPress={()=>{navigation.goBack()}}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
        </TouchableOpacity>
      <Text style={{color:'#fff',fontSize:20, fontWeight:700}}>Tạo tin tuyển dụng</Text>
      <Text style={{color:'#fff',fontSize:20, fontWeight:700}}>2/2</Text>
      </View>
    </View>
    <View style={{backgroundColor:'#fff',flex:1}}>
    
    <ScrollView style={{marginHorizontal:15, marginTop:8,marginBottom:70}}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}>
            <View>
                <View>
                    <View>
                        <Text style={{fontSize:19,fontWeight:600}}>2. Mô tả công việc</Text>
                        <Text style={{fontSize:16,marginTop:20}}>Thông tin cho vị trí công việc yêu cầu, trách nhiệm mà ứng viên có thể đảm nhận khi làm việc cho doanh nghiệp bạn.</Text>
                    </View>
                    <View >
                    <TextInput  
                       multiline={true}
                       value={dataRecruits.describeRe}
                       onChangeText={(text)=>{setDataRecruits({...dataRecruits,describeRe:text})}}
                       style={{
                         padding: 5,
                         marginTop: 20,
                         fontSize: 17,
                         height: 250,
                         borderRadius: 10,
                         backgroundColor: '#fff',
                         borderColor: '#ccc',
                         borderWidth: 1,
                         marginVertical: 10,
                         paddingHorizontal: 5,
                         textAlignVertical: 'top'}} >

                        </TextInput>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{fontSize:19,fontWeight:600}}>3. Yêu cầu công việc</Text>
                        <Text style={{fontSize:16,marginTop:20}}>Kỹ năng chuyên môn hoặc kĩ năng mềm cần thiết với công việc mà ứng viên cần quan tâm.</Text>
                    </View>
                    <View >
                    <TextInput  
                       multiline={true}
                       value={dataRecruits.requireRe}
                       onChangeText={(text)=>{setDataRecruits({...dataRecruits,requireRe:text})}}
                       style={{
                         padding: 5,
                         marginTop: 20,
                         fontSize: 17,
                         height: 250,
                         borderRadius: 10,
                         backgroundColor: '#fff',
                         borderColor: '#ccc',
                         borderWidth: 1,
                         marginVertical: 10,
                         paddingHorizontal: 5,
                         textAlignVertical: 'top'}} >

                        </TextInput>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{fontSize:19,fontWeight:600}}>4. Quyền lợi</Text>
                        <Text style={{fontSize:16,marginTop:20}}>Những quyền lợi, lợi ích với công việc cho ưng viên với công việc đăng tuyển</Text>
                    </View>
                    <View >
                    <TextInput  
                       multiline={true}
                       value={dataRecruits.castRe}
                       onChangeText={(text)=>{setDataRecruits({...dataRecruits,castRe:text})}}
                       style={{
                         padding: 5,
                         marginTop: 20,
                         fontSize: 17,
                         height: 250,
                         borderRadius: 10,
                         backgroundColor: '#fff',
                         borderColor: '#ccc',
                         borderWidth: 1,
                         marginVertical: 10,
                         paddingHorizontal: 5,
                         textAlignVertical: 'top'}} >

                        </TextInput>
                    </View>
                </View>
                <View style={{marginTop:30}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:50}}>
                    <TouchableOpacity style={{ backgroundColor: '#CC3333',width: '50%',padding: 15,borderRadius: 10,alignItems:'center'}}
                        onPress={handleSubmit}
                   
                    >
                        <Text style={{color: 'white',fontWeight: '700',fontSize: 16,}}>Tạo mới</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default CreatRecruitPageTwo

const styles = StyleSheet.create({})
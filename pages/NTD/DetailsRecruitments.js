import { StyleSheet, View, TouchableOpacity, Image,Dimensions } from 'react-native'
import { Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons'
import { useState, useContext } from 'react'
import { database, firestore, auth } from '../../firebase'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { UserContext } from '../../navigation/UserContext'


const DetailsRecruitments = ({ navigation }) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeigh = Dimensions.get('window').height;
  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'

  const route = useRoute()
  const detailRecruitId = route.params.detailRecruitId
  const idDetails = route.params.detailRecruitId
  const profileRecruitId = route.params.profileRecruitId
  const idBrand = route.params.profileRecruitId


  const [isSaved, setIsSaved] = useState(false)
  const [isApplied, setIsApplied] = useState('')
  const { userRole } = useContext(UserContext)


  const [dataDetailsRecruit, setDataDetailsRecruit] = useState({
    nameRe: '',
    countRe: '',
    fieldsRe: '',
    placeRe: '',
    genderRe: '',
    socialsRe: '',
    deadlineTimeRe: '',
    salaryRe: '',
    describeRe: '',
    castRe: '',
    requireRe: '',
    imageProduct: '',
    countpply: '',

  })
  const [dataBrand, setDataBrand] = useState({
    name: '',
    avatar: '',
    intro: '',
    legit: '',
  })
  const handleSave = async () => {
    try {
      const user = auth.currentUser
      if (user) {
        const userId = user.uid
        await database.ref(`User/${userId}/savedRecruit/${idDetails}`).update({
          status: !isSaved
        })
        setIsSaved(!isSaved)


      }
    } catch (error) {
      console.log('loi luu tin', error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser
        if (user) {
          const userId = user.uid
          const snapshot = await database.ref(`User/${userId}/savedRecruit/${idDetails}`).once('value')
          const data = snapshot.val()
          if (data && data.status !== null && typeof data.status !== 'undefined') {
            setIsSaved(data.status);
          } else {
            setIsSaved(false);
          }
        }
      } catch (error) {
        console.log('Lỗi khi truy xuất cơ sở dữ liệu:', error);
      }
    };

    fetchData();
  }, [idDetails]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser
        if (user) {
          const userId = user.uid
          const snapshot = await database.ref(`User/${userId}/apllyRecruit/${idDetails}`).once('value')
          const data = snapshot.val()
          if (data && data.status !== null && typeof data.status !== 'undefined') {
            setIsApplied(data.status);
          } else {
            setIsSaved('');
          }
        }
      } catch (error) {
        console.log('Lỗi khi truy xuất cơ sở dữ liệu:', error);
      }
    };

    fetchData();
  }, [idDetails]);


  const handleApply = async () => {
    try {
      const user = auth.currentUser
      if (user) {
        const userId = user.uid
        await database.ref(`User/${userId}/apllyRecruit/${idDetails}`).update({
          status: 'đang chờ'

        })
        setIsApplied('đang chờ')
        alert('ứng tuyển thành công')
        await database.ref(`Candidate/${idBrand}/${idDetails}/${userId}`).update({
          status: 'đang chờ'
        })
        await database.ref(`ListRecuits/${idBrand}/${idDetails}`).update({
          countApply: dataDetailsRecruit.countpply + 1,
        })
      }
    }
    catch (error) {
      console.log('loi ung tuyen', error)
    }
  }
  const handleReport = () => {
    navigation.navigate('SubmitJobs', { detailRecruitId: detailRecruitId, profileRecruitId: profileRecruitId })
  }
  useEffect(() => {
    const okok = firestore.collection('users').doc(profileRecruitId).get().then(doc => {
      if (doc.exists) {
        const userData = doc.data()
        setDataBrand({
          name: userData.name,
          avatar: userData.avatar,
          intro: userData.intro,
          legit: userData.legit,
        })
      }
    })
    return () => okok
  }, [])
  useEffect(() => {
    const hihi = database.ref(`ListRecuits/${profileRecruitId}/${detailRecruitId}`).on('value', (snapshot) => {
      const data = snapshot.val()
      setDataDetailsRecruit({
        nameRe: data.nameRe,
        countRe: data.countRe,
        fieldsRe: data.fieldsRe,
        placeRe: data.placeRe,
        genderRe: data.genderRe,
        socialsRe: data.socialsRe,
        deadlineTimeRe: data.deadlineTimeRe,
        salaryRe: data.salaryRe,
        describeRe: data.describeRe,
        requireRe: data.requireRe,
        castRe: data.castRe,
        imageProduct: data.imageProduct,
        countpply: data.countApply,

      })
    })
    return () => hihi
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#fff', height: 80, alignItems: 'center',borderBottomWidth:1,borderColor:'#ccc' }}>

        <View style={{ marginTop: 45, flexDirection: 'row', width: '95%', alignItems: 'center', }}>

          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={20} color='#050505'></FontAwesome>
          </TouchableOpacity>
          <View style={{ marginLeft:20 }}>
          <Text style={{ color: '#050505', fontSize: 19, fontWeight: 700, }}>Chi tiết tuyển dụng</Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
      <View style={{ backgroundColor: '#FFF', borderWidth: 0.5, borderColor: '#EEEEEE' }}>
        <View style={{  }}>
          <Image source={{ uri: dataDetailsRecruit.imageProduct ? dataDetailsRecruit.imageProduct : noAvatar }} style={{ height:200 , width: '100%', }} resizeMode='cover'></Image>
          <View style={{ width: '90%', flexDirection: 'column', margin: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{dataBrand.name}</Text>
                {dataBrand.legit === 'duyệt' ? <MaterialCommunityIcons name='bookmark-check' size={22} color='#ffce00' style={{ marginLeft: 1 }} ></MaterialCommunityIcons> : null}
              </View>
              {userRole === 'KOC' && (<TouchableOpacity onPress={handleSave}>
                {isSaved ? <FontAwesome name='heart' size={30} color='#CC3333'></FontAwesome> : <FontAwesome name='heart-o' size={30} color='#CC3333'></FontAwesome>}
              </TouchableOpacity>)}
            </View>
            <Text style={{ fontSize: 16 }}>{dataDetailsRecruit.nameRe}</Text>
           
          </View>

        </View>
      </View>
      
        <View style={{ backgroundColor: '#fff', marginTop: 5 }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chi tiết tuyển dụng</Text>
          </View>
          <View style={{ marginVertical: 10, marginLeft: 10 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: 600, }}>Thông tin chung</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
              <MaterialCommunityIcons name='account-multiple' size={40} color='#CC3333'></MaterialCommunityIcons>
              <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Số lượng tuyển</Text>
                <Text style={{ marginTop: 5 }}>{dataDetailsRecruit.countRe} người</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
              <FontAwesome name='tags' size={40} color='#CC3333'></FontAwesome>
              <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Lĩnh vực</Text>
                <Text style={{ marginTop: 5 }}>{dataDetailsRecruit.fieldsRe}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
              <MaterialCommunityIcons name='map-marker-multiple' size={40} color='#CC3333'></MaterialCommunityIcons>
              <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Địa điểm</Text>
                <Text style={{ marginTop: 5 }}>{dataDetailsRecruit.placeRe}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
              <MaterialCommunityIcons name='gender-male-female' size={40} color='#CC3333'></MaterialCommunityIcons>
              <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Giới tính</Text>
                <Text style={{ marginTop: 5 }}>{dataDetailsRecruit.genderRe}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
              <MaterialCommunityIcons name='spotify' size={40} color='#CC3333'></MaterialCommunityIcons>
              <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Nền tảng</Text>
                <Text style={{ marginTop: 5 }}>{dataDetailsRecruit.socialsRe}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
              <MaterialCommunityIcons name='timer' size={40} color='#CC3333'></MaterialCommunityIcons>
              <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Hạn nộp hồ sơ</Text>
                <Text style={{ marginTop: 5 }}>{dataDetailsRecruit.deadlineTimeRe}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
              <MaterialCommunityIcons name='account-cash' size={40} color='#CC3333'></MaterialCommunityIcons>
              <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Mức lương</Text>
                <Text style={{ marginTop: 5 }}>{dataDetailsRecruit.salaryRe}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10, marginLeft: 10 }}>
            <View >
              <Text style={{ fontSize: 17, fontWeight: 600, }}>Mô tả công việc</Text>
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 15 }}>{dataDetailsRecruit.describeRe}</Text>
            </View>
            <View>
              <Text></Text>
            </View>
          </View>
          <View style={{ marginVertical: 10, marginLeft: 10 }}>
            <View >
              <Text style={{ fontSize: 17, fontWeight: 600, }}>Yêu cầu công việc</Text>
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 15 }}>{dataDetailsRecruit.requireRe}</Text>
            </View>
            <View>
              <Text></Text>
            </View>
          </View>
          <View style={{ marginVertical: 10, marginLeft: 10 }}>
            <View >
              <Text style={{ fontSize: 17, fontWeight: 600, }}>Quyền lợi</Text>
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 15 }}>{dataDetailsRecruit.castRe}</Text>
            </View>
            <View>
              <Text></Text>
            </View>
          </View>

        </View>

        <View style={{ backgroundColor: '#fff', marginTop: 7 }}>
          <View style={{ marginVertical: 10, marginLeft: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 17, fontWeight: 600, }}>Giới thiệu công ty</Text>
              <TouchableOpacity style={{ width: '50%', alignItems: 'flex-end', marginRight: 5 }}
                onPress={() => { navigation.navigate('ProfileWallRecruit', { idNtd: idBrand }) }}>
                <MaterialCommunityIcons name='arrow-right' size={24} color='#ccc' ></MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 5 }}>
              <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1 }} />
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16 }}>{dataBrand.intro}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {userRole === 'KOC' && (
        <View style={{ backgroundColor: '#ccc' }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10, }}>
            {isApplied === 'đang chờ' ? <TouchableOpacity style={{ backgroundColor: '#EE6363', width: '40%', padding: 10, borderRadius: 10, alignItems: 'center', }}
              onPress={() => { alert('bạn đã ứng tuyển tin này rồi -.-') }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Đã ứng tuyển</Text>
            </TouchableOpacity> : isApplied === 'đã duyệt' ? <TouchableOpacity style={{ backgroundColor: '#5a66ff', width: '40%', padding: 10, borderRadius: 10, alignItems: 'center', }}
              onPress={handleReport}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Nộp báo cáo</Text>
                <FontAwesome name='send' size={24} color='#fff' style={{ marginLeft: 10 }}></FontAwesome>
              </View>
            </TouchableOpacity> : isApplied === 'đã nộp' ? <TouchableOpacity style={{ backgroundColor: '#5a66ff', width: '40%', padding: 10, borderRadius: 10, alignItems: 'center', }}
              onPress={() => { alert('bạn đã nộp báo cáo rồi -.-') }}><Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Đã nộp báo cáo</Text></TouchableOpacity> : isApplied === 'từ chối' ? <TouchableOpacity style={{ backgroundColor: '#EE6363', width: '40%', padding: 10, borderRadius: 10, alignItems: 'center', }}
                onPress={() => { alert('bạn đã bị từ chối -.-') }}><Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Từ chối</Text></TouchableOpacity> : isApplied === 'đã đánh giá' ? <TouchableOpacity style={{ backgroundColor: '#EE6363', width: '40%', padding: 10, borderRadius: 10, alignItems: 'center', }} onPress={() => { }}><Text style={{ color:'#fff', fontSize:15, fontWeight:'bold' }}>Đã hoàn thành</Text></TouchableOpacity> : <TouchableOpacity style={{ backgroundColor: '#CC3333', width: '40%', padding: 10, borderRadius: 10, alignItems: 'center', }}
                  onPress={handleApply}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Ứng tuyển ngay</Text>
                </TouchableOpacity>}

            <TouchableOpacity style={{ backgroundColor: '#fff', width: '40%', padding: 10, borderRadius: 10 }}
              onPress={handleSave}
            >
              {isSaved ? <View style={{ marginLeft: 10, alignItems: 'center', flexDirection: 'row' }}>
                <FontAwesome name='heart' size={24} color='#CC3333' ></FontAwesome>
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ color: '#CC3333', fontSize: 16, fontWeight: 600 }}>Bỏ lưu</Text>
                </View>
              </View> : <View style={{ marginLeft: 10, alignItems: 'center', flexDirection: 'row' }}>
                <FontAwesome name='heart-o' size={24} color='#CC3333' ></FontAwesome>
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ color: '#CC3333', fontSize: 16, fontWeight: 600 }}>Lưu tin</Text>
                </View>
              </View>}
            </TouchableOpacity>
          </View>
        </View>)}
    </SafeAreaView>
  )
}

export default DetailsRecruitments

const styles = StyleSheet.create({})
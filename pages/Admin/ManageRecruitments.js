import { StyleSheet, View, ActivityIndicator, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { Text } from 'react-native-elements'
import { useState, useEffect } from 'react'
import { database } from '../../firebase'
import { FontAwesome } from 'react-native-vector-icons'


const ManageRecruitments = ({ navigation }) => {

  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'

  const [listRecruitments, setListRecruitments] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const hh = database.ref('ListRecuits').once('value')
      .then((snapshot) => {
        const recruits = snapshot.val();
        if (recruits) {
          const allJobData = [];
          Object.keys(recruits).forEach((userId) => {
            const jobIds = Object.keys(recruits[userId]);
            jobIds.forEach((jobId) => {
              const jobData = recruits[userId][jobId];
              jobData.userId = userId
              jobData.jobId = jobId
              allJobData.push(jobData);
            });
          });
          setListRecruitments(allJobData);
          setLoading(false)

        }
      })
      .catch((error) => {
        console.log('Đã xảy ra lỗi: ', error);
      });
    return () => hh;
  }, []);

  const handleSubmit = (userId, jobId) => {
    Alert.alert(
      'Xác nhận duyệt tin',
      'Duyệt tin tuyển dụng này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'duyệt',
          style: 'destructive',
          onPress: async () => {
            try {

              await database.ref(`ListRecuits/${userId}/${jobId}`).update({
                statusRe: 'đã duyệt'
              });
              const updatedListRecruitments = listRecruitments.map((item) => {
                if (item.userId === userId && item.jobId === jobId) {
                  return { ...item, statusRe: 'đã duyệt' };
                }
                return item;
              });

              setListRecruitments(updatedListRecruitments);

              console.log('duyệt tin thành công');
            } catch (error) {
              console.error('Lỗi ', error);
            }
          },
        },
      ])
  }
  const handleCancel = (userId, jobId) => {
    Alert.alert(
      'Xác nhận hủy bỏ tin này ',
      'tin tuyển dụng này sẽ không thể kích hoạt lại nữa?',
      [
        {
          text: 'Bỏ',
          style: 'cancel',
        },
        {
          text: 'Hủy',
          style: 'destructive',
          onPress: async () => {
            try {

              await database.ref(`ListRecuits/${userId}/${jobId}`).update({
                statusRe: 'đã hủy'
              });
              const updatedListRecruitments = listRecruitments.map((item) => {
                if (item.userId === userId && item.jobId === jobId) {
                  return { ...item, statusRe: 'đã hủy' };
                }
                return item;
              });

              setListRecruitments(updatedListRecruitments);

              console.log('hủy bỏ tin thành công');
            } catch (error) {
              console.error('Lỗi ', error);
            }
          },
        },
      ])
  }
  const renderRecruitsments = ({ item }) => {

    return (
      <View style={{ backgroundColor: '#fff', borderRadius: 5, margin: 10, width: '95%', shadowColor: '#52006A', elevation: 4, }} >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { navigation.navigate('DetailsRecruitments', { detailRecruitId: item.jobId, profileRecruitId: item.userId }) }} style={{ flexDirection: 'row' }} >
            <View>
              <Image source={{ uri: item.imageProduct ? item.imageProduct : noAvatar }} style={{ height: 90, width: 90, margin: 10 }}></Image>
            </View>
            <View style={{ flexDirection: 'column', margin: 10, width: '40%' }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#CC3333' }}>{item.nameRe}</Text>
              <Text>{item.socialsRe}</Text>
              <Text>{item.deadlineTimeRe}</Text>
            </View>
          </TouchableOpacity>

          {item.statusRe === 'đang chờ' ? (<View style={{ marginTop: 10, flexDirection: 'column',marginRight:10 }}>
            <Text style={{ backgroundColor: 'orange', padding: 4 }}>{item.statusRe}</Text>
            <TouchableOpacity style={{ backgroundColor: '#00EE76', padding: 5, marginTop: 20, borderRadius: 5, alignItems: 'center', width: 70 }}
              onPress={() => handleSubmit(item.userId, item.jobId)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Duyệt</Text>
            </TouchableOpacity>
          </View>) : item.statusRe === 'đã duyệt' ? (<View style={{ marginTop: 10, flexDirection: 'column',marginRight:10 }}>
            <Text style={{ backgroundColor: 'blue', color: '#fff', padding: 4 }}>{item.statusRe}</Text>
            <TouchableOpacity style={{ backgroundColor: 'red', marginTop: 20, padding: 5, borderRadius: 5, width:'auto' , alignItems: 'center' }}
              onPress={() => handleCancel(item.userId, item.jobId)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Hủy</Text>
            </TouchableOpacity>
          </View>) : (<View style={{ marginTop: 10, flexDirection: 'column', marginRight:10 }}>
            <Text style={{ backgroundColor: 'red', color: '#fff', padding: 4,marginRight:10 }}>{item.statusRe}</Text>
          </View>)}


        </View>
      </View>
    )

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#CC3333', height: 93, alignItems: 'center' }}>
        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Quản lí tin tuyển dụng</Text>
          <Text >    </Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>DANH SÁCH TIN TUYỂN DỤNG</Text>
        </View>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#CC3333" />
          </View>
        ) : listRecruitments.length > 0 ? (

          <FlatList
            showsVerticalScrollIndicator={false}
            data={listRecruitments}
            renderItem={renderRecruitsments}
            key={(item) => item.id}
          />


        ) : (
          <Text >Không có tin tuyển dụng nào</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default ManageRecruitments

const styles = StyleSheet.create({})
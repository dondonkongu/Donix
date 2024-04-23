import { FlatList, StyleSheet,  View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { FontAwesome, MaterialIcons,MaterialCommunityIcons } from 'react-native-vector-icons'
import { firestore } from '../../firebase'

const MangeAccounts = ({ navigation }) => {
  const [users, setUsers] = useState([])
  const [filterUsers, setFilterUsers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = firestore.collection('users').onSnapshot((snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData)
      setLoading(false)
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const filterUsers = users.filter((user) => user.legit === 'đang chờ')
    setFilterUsers(filterUsers)
  }, [users])
  const handleCancleLegit = (userId) => {
    try {
      firestore.collection('users').doc(userId).update({
        legit: 'đã phế'
      });
      alert('Phế thành công')

    } catch (error) {
      console.log('loi truy van thong tin', error);
    }
  }

  const renderKocLegit = ({ item }) => {
    if (item.legit === 'đang chờ') {
      return (
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={()=> navigation.navigate('ProfileWallDetail', { profileId: item.id })}>
            <Text style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('DataUpLegit', { IdUser: item.id, userName: item.name }) }} >
              <Text style={{ color: 'blue', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}> xem chi tiết </Text>
            </TouchableOpacity>

          </View>
        </View>
      )
    }
  }
  const renderIsLegit = ({ item }) => {
    if (item.legit === 'duyệt') {
      return (
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
              {item.role==='KOC'?(<MaterialIcons name='verified' size={17} color='#15a7ff' style={{ marginLeft: 1 }}></MaterialIcons>):(
                       <MaterialCommunityIcons name='bookmark-check' size={18} color='#ffce00' style={{ marginLeft: 1 }}></MaterialCommunityIcons>
              )}
       
            </View>
            <View style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TouchableOpacity onPress={() => handleCancleLegit(item.id)} style={{
                backgroundColor: '#CC3333',
                width: '100%',
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
              }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Phế</Text>
              </TouchableOpacity >
            </View>
          </View>
        </View>
      )
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#CC3333', height: 93, alignItems: 'center' }}>

        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>

          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Quản lí người dùng</Text>
          <Text >    </Text>

        </View>
      </View>
      <View style={{ backgroundColor: '#fff', borderRadius: 5, marginHorizontal: 5 }}>
        <Text style={{ fontSize: 16 }}>YÊU CẦU NÂNG CẤP TÀI KHOẢN</Text>
        {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#CC3333" />
        </View>) : filterUsers.length > 0 ? (<FlatList
          data={filterUsers}
          renderItem={renderKocLegit}
          keyExtractor={(item) => item.id}
        />) : (<View><Text>không có yêu cầu nào </Text></View>)}

      </View>
      <View style={{ backgroundColor: '#fff', borderRadius: 5, marginHorizontal: 5, marginTop: 10 }}>
        <View>
          <Text>CÁC TÀI KHOẢN ĐÃ ĐƯỢC XÁC THỰC</Text>
        </View>
        <View style={{ margin: 10 }}>
          <FlatList
            data={users}
            renderItem={renderIsLegit}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MangeAccounts

const styles = StyleSheet.create({})
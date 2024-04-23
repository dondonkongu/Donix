import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button, FlatList, StyleSheet, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { firestore } from '../../firebase';
import { FontAwesome } from 'react-native-vector-icons'

const ManageUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)
  const [koc,setKoc]=useState([])
  const [ntd,setNtd]=useState([])

  useEffect(() => {
    const unsubscribe = firestore.collection('users').onSnapshot((snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData)
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const filteredKOC =users.filter((item) => (item.role === 'KOC'))
    setKoc(filteredKOC)
  }, [users]);
  useEffect(()=>{
    const filteredNTD=users.filter((item)=>(item.role==='NTD')) 
    setNtd(filteredNTD)
  },[users])

  const blockUser = (userId) => {
    Alert.alert(
      'Xác nhận chặn người dùng',
      'Bạn có chắc chắn muốn chặn người dùng này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'block',
          style: 'destructive',
          onPress: async () => {
            try {

              await firestore.collection('users').doc(userId).update({
                block: true
              });

              console.log('block user thành công');
            } catch (error) {
              console.error('Lỗi ', error);
            }
          },
        },
      ]
    );
  };


  const unblockUser = (userId) => {
    Alert.alert(
      'Xác nhận bỏ chặn người dùng',
      'Bạn có chắc chắn muốn bỏ chặn người dùng này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Gỡ',
          style: 'destructive',
          onPress: async () => {
            try {

              await firestore.collection('users').doc(userId).update({
                block: false
              });

              console.log('unblock user thành công');
            } catch (error) {
              console.error('Lỗi ', error);
            }
          },
        },
      ]
    );
  };


  const renderKOc = ({ item }) => {
    if (item.id === 'RQp1EVncydXv6QHUsAr6PqxyeQs2') {
      return null;
    }
    return (
      <View style={styles.userContainer}>
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.userName}>{item.name}</Text>
        {item.legit==='duyệt'&&(<MaterialIcons name='verified' size={18} color='#15a7ff' style={{marginLeft:0}}></MaterialIcons>)}
        </View>
        {item.block ? (<Button color='#CC3333' title="unblock" onPress={() => unblockUser(item.id)} />) :
          (<Button color='#2196F3' title="block" onPress={() => blockUser(item.id)} />)}

      </View>
    );
  };

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
      <View style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 45,
        backgroundColor: '#fff',
      }}>
        <Text style={styles.title}>Danh sách người dùng:</Text>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#CC3333" />
          </View>
        ) : koc.length > 0 ? (
          <FlatList
            data={koc}
            renderItem={renderKOc}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noUsersText}>Không có người dùng nào</Text>
        )}
        <Text style={styles.title}>Danh sách Nhà tuyển dụng:</Text>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#CC3333" />
          </View>
        ) : ntd.length > 0 ? (
          <FlatList
            data={ntd}
            renderItem={renderKOc}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noUsersText}>Không có người dùng nào</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 6,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
  },
  noUsersText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default ManageUsers;
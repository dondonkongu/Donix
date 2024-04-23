import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../../firebase'
import { UserContext } from '../../navigation/UserContext'
import { useContext } from 'react'


const AdminScreen = ({ navigation }) => {

  const { setUserRole } = useContext(UserContext)


  const handleLogout = async () => {
    try {
      await auth.signOut()
      console.log('dang xuat thanh cong')
    } catch (error) {
      console.log('loi dang xuat', error)
    }
    navigation.navigate('Login')
    setUserRole('')
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, marginTop: 45, backgroundColor: '#ccc', alignItems: 'center' }}>
        <TouchableOpacity style={{ backgroundColor: '#fff', height: '15%', width: '80%', borderRadius: 10, marginTop: 50 }}
          onPress={() => { navigation.navigate('ManageUsers') }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Quản lí người dùng</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: '#fff', height: '15%', width: '80%', borderRadius: 10, marginTop: 50 }}
          onPress={() => { navigation.navigate('ManageRecruitments') }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Quản lí tin tuyển dụng</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#fff', height: '15%', width: '80%', borderRadius: 10, marginTop: 50 }}
          onPress={() => { navigation.navigate('ManageAccounts') }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Quản lí tài khoản</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: '#fff', height: '15%', width: '80%', borderRadius: 10, marginTop: 50 }}
          onPress={handleLogout}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default AdminScreen

const styles = StyleSheet.create({})
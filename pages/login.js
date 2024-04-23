import { View, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import { Text } from 'react-native-elements';
import React, { useContext, useState } from 'react'
import { Modal } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Divider from '../shared/Divider.js';
import { auth, firestore } from '../firebase.js';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../navigation/UserContext.js';
import { Switch } from 'react-native-elements';



export default function Login() {

  const { setUserRole } = useContext(UserContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigation = useNavigation()


  const handleLogin = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        if (user) {
          const userId = user.uid;
          firestore
            .collection('users')
            .doc(userId)
            .get()
            .then(doc => {
              if (doc.exists) {
                const userData = doc.data()
                setUserRole(userData.role)
                if (userData.block === true) {
                  Alert.alert('Thông báo', 'Tài khoản của bạn đã bị khóa', [{
                    text: 'OK',
                    style: 'cancel'
                  }])
                }
                else {
                  navigation.navigate('BottomTabnavigation')
                }

              }

            })
            .catch(error => { console.log("loi truy van thong tin", error) })
        }

        console.log(user.email)
        setEmail('')
        setPassword('')



      })
      .catch(error => {
        let errorMessage = ' đã xảy ra lỗi';
        switch (error.code) {
          case 'auth/wrong-password':
            errorMessage = 'Mật khẩu không chính xác'
            break
          case 'auth/user-not-found':
            errorMessage = 'Người dùng không tồn tại.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Email không hợp lệ.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Tài khoản này đã bị vô hiệu hóa.';
            break;
          default:
            errorMessage = ' Đã xảy ra lỗi'
        }
        Alert.alert('thông báo', errorMessage, [{
          text: 'OK',
          style: 'cancel'

        }])
        console.log('lỗi đăng nhập', errorMessage, error.code)
      });
  }


  const handleForgotPassword = () => {
    setIsModalVisible(true)
  }
  const closePopUpResetPassword = () => {
    setIsModalVisible(false)
  }
  const resetPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        closePopUpResetPassword()
        alert("okkk")
        setEmail('')
      })
      .catch(error => {
        let errorMessage = ' đã xảy ra lỗi';
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'Người dùng không tồn tại.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Email không hợp lệ.';
            break;
          default:
            errorMessage = ' Đã xảy ra lỗi'
        }
        Alert.alert('Thông báo', errorMessage, [{
          text: 'OK',
          style: 'cancel'

        }])
      });
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }



  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <Image style={styles.banner} resizeMode='stretch' source={require('./../assets/image/banner-home-one.png')} />
      <KeyboardAvoidingView style={styles.container}
        behavior='padding'>
        <Text style={styles.welcomeText}>Welcome to<Text style={{ color: '#CC3333', fontWeight: 'bold' }}> DONIX</Text></Text>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <AntDesign name='mail' size={20} color="#CC3333" style={{ marginRight: 10 }} />
            <TextInput placeholder='Enter your email'
              value={email}
              style={{ flex: 1 }}
              onChangeText={text => setEmail(text)}
            ></TextInput>
          </View>
          <View style={styles.input}>
            <AntDesign name='key' size={20} color="#CC3333" style={{ marginRight: 10 }} />
            <TextInput placeholder='Enter your password'
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={!showPassword}
              style={{ flex: 1 }}
            ></TextInput>
            <View style={{ marginLeft: 20 }}>
              <TouchableOpacity onPress={handleShowPassword}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color='#CC3333'></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={styles.textPassword}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={styles.textForgotPassword}
            >Forgot your password ?</Text>
          </TouchableOpacity>
          <Modal visible={isModalVisible} animationType='slide' transparent >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ width: '80%', backgroundColor: 'white', padding: 40 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Reset Password</Text>
                <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }}>Nhập email của bạn để đặt lại mật khẩu</Text>
                <TextInput placeholder='email' style={styles.textModal}
                  value={email}
                  onChangeText={text => setEmail(text)}></TextInput>
                <View style={styles.buttonModal}>
                  <TouchableOpacity onPress={resetPassword} style={{backgroundColor:'#189ad3',padding:10,borderRadius:5}}>
                    <Text style={{color:'#fff'}}>Gửi</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={closePopUpResetPassword}style={{backgroundColor:'#189ad3',padding:10,borderRadius:5}}>
                    <Text style={{color:'#fff'}}>Hủy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Divider />

        <TouchableOpacity style={styles.buttonGg}>
          <AntDesign name="google" size={24} color="#CC3333" style={{ marginRight: 10 }} />
          <Text style={styles.textGg}>Sign in with Google</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
      <View style={styles.containerRegister}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('register')
        }}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>

  )


}
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeText:
  {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
  },
  banner: {
    width: 480,
    height: 245,
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CC3333',
    marginTop: 20,
    alignItems: 'center',

  },

  textPassword: {
    alignSelf: 'flex-end',
  },
  textForgotPassword: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#CC3333',
    marginRight: 32,
    marginTop: 15,

  },
  modal: {

    padding: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  buttonModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,

  },
  textModal: {
    width: "100%",
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CC3333',
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,

  },
  button: {
    backgroundColor: '#CC3333',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonGg: {
    marginTop: 15,
    backgroundColor: 'white',
    height: 60,
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#CC3333',


  },
  textGg: {
    color: '#CC3333',
    fontWeight: '700'
  },
  containerRegister: {
    marginTop: 5,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontWeight: 'bold',
    color: '#CC3333',
    fontSize: 17,
  },

})
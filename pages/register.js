import { View,Image, Text, StyleSheet,Modal,Button,  TextInput, TouchableOpacity, KeyboardAvoidingView  } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { auth, firestore } from '../firebase';
import {Picker} from '@react-native-picker/picker';


const Register = ({navigation}) => {

  const [name,setName]= useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [modalMessage,setModalMessage] = useState('')
  const [selectedRole,setSelectedRole] = useState('KOC')

  const handleSignup =()=>{
    auth
    .createUserWithEmailAndPassword(email,password)
    .then(userCredentials =>{
      const user =userCredentials.user;
      console.log(user.email);
      firestore
      .collection('users')
      .doc(user.uid)
      .set({
        name:name,
        email:email,
        role:selectedRole,
        legit:'not'
      })
      .then(()=>{
      setModalMessage('Đăng kí thành công!')
      setIsModalVisible(true)
      setName('')
      setEmail('')
      setPassword('')
      })
      .catch(error => {
            setModalMessage('Đăng ký không thành công!');
            setIsModalVisible(true)
            console.log(error)})
    })
    .catch(error => {
      setModalMessage('Đăng ký không thành công!');
      setIsModalVisible(true)});
   
   
  };
  const handleCloseModal =()=>{
    setIsModalVisible(false);
    navigation.navigate('Login')

  };


  return (
    <View style={{backgroundColor:'white', height:'100%'}}> 
    <Image style={styles.signupImage} resizeMode='stretch' source={require('./../assets/image/banner-home-two.png')}/>
    <KeyboardAvoidingView style={styles.container}
    behavior='padding'>
   
    <Text style={styles.createAccount}>Create an account!!</Text>
    <View style={styles.inputContainer}>
        <View style={styles.input}>
            <AntDesign name='user' size={20} color="#CC3333" style={{marginRight:10}}/>
            <TextInput placeholder='Enter your name'
                value={ name}
                onChangeText={text=>setName(text)}
                ></TextInput>
        </View>
        <View style={styles.input}>
            <AntDesign name='mail' size={20} color="#CC3333" style={{marginRight:10}}/>
            <TextInput placeholder='Enter your email'
                value={ email}
                onChangeText={text=>setEmail(text)}
                ></TextInput>
        </View>
        <View style={styles.input}>     
          <AntDesign name='key' size={20} color="#CC3333" style={{marginRight:10}}/>
            <TextInput placeholder='Enter your password'
                value={ password}
                onChangeText={text=>setPassword(text)}
                secureTextEntry></TextInput>  
        </View> 
        <View style={{flexDirection:'row', marginTop:20, alignItems:'center'}}>
          <Text style={{fontSize:17}}>Bạn là : </Text>
          <Picker
        selectedValue={selectedRole}
        style={{  width: 200 }}
        onValueChange={(itemValue) => setSelectedRole(itemValue)}
      >
        <Picker.Item label="KOC/Influencer" value="KOC" />
        <Picker.Item label="Nhà tuyển dụng" value="NTD" />
      </Picker>
        </View>
    </View>
  
    
    <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleSignup}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Sign up</Text>
                
            </TouchableOpacity>     
            <Modal visible={isModalVisible} animationType='slide' transparent >
              <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: 'white', padding: 40 }}>
            <Text style={{fontSize:15, padding:10,marginBottom:20}}>{modalMessage}</Text>
            <Button  title="Đóng" onPress={handleCloseModal} />
                </View>
              </View>
            </Modal>  
    </View>    

    
  </KeyboardAvoidingView> 
  <View style={styles.containerRegister}>
      <Text style={styles.haveText}>Already have an account? </Text>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Login')
      }}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  </View>
       )
}

export default Register

const styles = StyleSheet.create({
  container: {
    paddingTop: 30, 
    marginTop: -25,
    backgroundColor:'#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    justifyContent:'center',
    alignItems:'center',
},
  inputContainer:{
    width:'80%'
},
signupImage:{
    width:480,
    height:245,
},
input:{
    flexDirection:'row',
    backgroundColor:'#fff',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    borderWidth:2,
    borderColor:'#CC3333',
    marginTop:15,
    alignItems:'center',

    
},
createAccount:
        {fontSize:25,
        textAlign:'center',
        fontWeight:'bold',
        marginBottom:20,
    },


buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
    
},
button:{
    backgroundColor: '#CC3333',
    width:'100%',
    padding:15,
    borderRadius:10,
    alignItems:'center',
},
buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
},

containerRegister: {
    
    marginTop:50,
    marginLeft:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontWeight:'bold',
    color:'#CC3333',
    fontSize:17,

  },
  
})
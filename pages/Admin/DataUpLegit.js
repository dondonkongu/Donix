import { StyleSheet,  View, TouchableOpacity, Image ,Modal,ImageBackground} from 'react-native'
import { Text } from 'react-native-elements'
import React from 'react'
import { FontAwesome } from "@expo/vector-icons"
import { useRoute } from '@react-navigation/native'
import { firestore, storage } from '../../firebase'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import Loading from '../../screens/Loading'

const DataUpLegit = ({navigation}) => {
    const route = useRoute()
    const userId = route.params.IdUser
    const userName = route.params.userName
    const [listImage, setListImage] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [userDatas,setUserDatas]=useState({
        name:'',
        email:'',
        phone:'',
        address:'',
    
    })
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                const storageRef = storage.ref();
                const imagesRef = storageRef.child(`imageUpToLegits/${userId}`);

                const imageList = await imagesRef.listAll();

                const downloadPromises = imageList.items.map(async (item) => {
                    const url = await item.getDownloadURL();
                    return url;
                });

                const urls = await Promise.all(downloadPromises);
                setListImage(urls)
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        fetchImageUrls();
    }, [])
    useEffect(()=>{
            try {
             firestore.collection('users').doc(userId).get()
                .then((doc) => {
                    if (doc.exists) {
                       const userDatas = doc.data();
                       setUserDatas({
                             name:userDatas.name,
                             email:userDatas.email,
                             phone:userDatas.phoneNumber,
                             address:userDatas.address,
                       })
                       setLoading(false)

        
                    } })
            } catch (error) {
                console.log('loi truy van thong tin', error);
            }
       
        
    },[])
    const handleImagePress = (url) => {
        setSelectedImage(url);
    }
    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    const handleAccept=()=>{
        try {
            firestore.collection('users').doc(userId).update({
                legit:'duyệt'
                
            });
            alert('duyệt thành công')
            navigation.goBack()

        } catch (error) {
            console.log('loi truy van thong tin', error);
        }
    }
    const handleReject=()=>{
        try {
            firestore.collection('users').doc(userId).update({
                legit:'từ chối'
            });
            alert('từ chối thành công')
        } catch (error) {
            console.log('loi truy van thong tin', error);
        }
    }
  
    return (
        <SafeAreaView style={{flex:1}}>
             <ImageBackground source={require('../../assets/image/legit.jpg')} resizeMode='cover'>
                <View style={{ height: 95, alignItems: 'center' }}>


                    <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
                            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{userName}</Text>
                        <Text >    </Text>
                    </View>
                </View>
            </ImageBackground>
            {loading?(<Loading></Loading>):( <><View>
            <View style={{margin:10}}>
                <Text style={{fontSize:16,color:'#CC3333',fontWeight:'bold'}}>Ảnh người dùng cung cấp để xác thực</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {listImage.map((url, index) => (
                    <TouchableOpacity key={index} onPress={() => handleImagePress(url)}>
                        <Image
                            source={{ uri: url }}
                            style={{ width: 120, height: 110, margin: 5, borderWidth: 1, borderColor: '#ccc' }}
                        />
                    </TouchableOpacity>
                ))}
            </View>
          
        </View>
        <Modal visible={selectedImage !== null} transparent={true}>
        <TouchableOpacity style={{ flex:1 }} onPress={handleCloseModal} >

                <View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: selectedImage }} style={{ width: 385.2, height:243  }} resizeMode="cover" />
                    </View>    
                </View>
                </TouchableOpacity>
            </Modal>

            <View>
                <View style={{margin:10}}>
                    <Text style={{fontSize:16,color:'#CC3333',fontWeight:'bold'}}>Thông tin hồ sơ người dùng</Text>
                </View>
                <View style={{ padding:10}}>
                    <Text>Họ và tên: <Text style={{color:'#3b5998', fontWeight:'bold'}}>{userDatas.name}</Text> </Text>
                    <Text>Email: <Text style={{color:'#3b5998', fontWeight:'bold'}}>{userDatas.email}</Text> </Text>
                    <Text>Số điện thoại: <Text style={{color:'#3b5998', fontWeight:'bold'}}>{userDatas.phone}</Text> </Text>
                    <Text>Địa chỉ: <Text style={{color:'#3b5998', fontWeight:'bold'}}>{userDatas.address}</Text> </Text>
                </View>
            </View>
            <View style={{flexDirection:'row', marginTop:50}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:50}} >
                <TouchableOpacity style={{backgroundColor: '#1877F2',width: '50%',padding: 15,borderRadius: 10,alignItems:'center'}} 
                        onPress={handleAccept}>
                    <Text style={{color: 'white',fontWeight: '700',fontSize: 16,}}>Đồng ý</Text>
                </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:50}}>
                <TouchableOpacity  style={{  backgroundColor: '#1877F2',width: '50%',padding: 15,borderRadius: 10,alignItems:'center'}}
                        onPress={handleReject}>
                    <Text style={{color: 'white',fontWeight: '700',fontSize: 16,}}>Từ chối</Text>
                </TouchableOpacity>
                </View>
                
                </View>            
            
            </>)}
       
        </SafeAreaView>
    )
}

export default DataUpLegit

const styles = StyleSheet.create({})
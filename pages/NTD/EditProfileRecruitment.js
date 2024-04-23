
import { SafeAreaView, ScrollView, StyleSheet,  TouchableOpacity, View ,Image, TextInput} from 'react-native'
import { Text } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { useEffect, useState } from 'react'
import Divide from '../../shared/Divide'
import { Dimensions } from 'react-native'
import Back from '../../shared/Back'
import { auth, firestore,storage } from '../../firebase'
import Loading from '../../screens/Loading'


const EditProfileRecruitment = ({navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const [selectedImage, setSelectedImage] = useState(null)
    const [banner,setBanner] =useState(null)
    const [loading,setLoading]=useState(true)
    const noAvatar ='https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'
    const nobanner ='https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'
    const [dataBrand,setDataBrand]=useState({
        name:'',
        tax:'',
        address:'',
        website:'',
        intro:'',
    })
    const [dataContact,setDataContact]=useState({
        namecontact:'',
        phonenumber:'',
        emailcontact:'',
    })
    const handlebannerImageSelector=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[3,2],
            quality:1,
        })
        if(!result.canceled){
            setBanner(result.assets[0].uri)
        }
    }

    const handleImageSelector=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1
        })
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        }
    }
const handleSubmit = async()=>{
    try {
        const user =auth.currentUser
        if(user){
            const userId=user.uid
            if (selectedImage ) {
                const responseAvatar = await fetch(selectedImage)
                const blobAvatar = await responseAvatar.blob()
                const avatarRef = storage.ref().child(`avatars/${userId}`)
                await avatarRef.put(blobAvatar)
                const avatarUrl = await avatarRef.getDownloadURL();

                const responseBanner = await fetch(banner);
                const blobBanner = await responseBanner.blob();
                const bannerRef = storage.ref().child(`banners/${userId}`);
                await bannerRef.put(blobBanner);
                const bannerUrl = await bannerRef.getDownloadURL();

                await firestore
                        .collection('users')
                        .doc(userId)
                        .update({
                            avatar:avatarUrl,
                            banner: bannerUrl,
                            name:dataBrand.name,
                            intro:dataBrand.intro,
                            tax:dataBrand.tax,
                            address:dataBrand.address,
                            website:dataBrand.website,
                            namecontact:dataContact.namecontact,
                            phonenumber:dataContact.phonenumber,
                            emailcontact:dataContact.emailcontact

                        })

            }

            console.log('Thông tin người dùng đã được cập nhật thành công!');
            alert('Cập nhật thành công!')
            
        }
    }
    catch{(error)=>{console.log('loi truy van thong tin hahah',error)
   }
    alert('Cập nhật không thành công! Vui lòng xem lai')}

}
useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
        if(user){
            const userId=user.uid
            firestore
                .collection('users')
                .doc(userId)
                .get()
                .then(doc=>{
                    if(doc.exists){
                        const userData = doc.data()
                        setSelectedImage(userData.avatar)
                        setBanner(userData.banner)
                        setDataBrand({
                            name:userData.name,
                            tax:userData.tax,
                            address:userData.address,
                            website:userData.website,
                            intro:userData.intro,

                        })
                        setDataContact({
                            namecontact:userData.namecontact,
                            phonenumber:userData.phonenumber,
                            emailcontact:userData.emailcontact,
                        })
                        setLoading(false)
                    }
                })
                .catch(error=>{
                    console.log('loi truy van thong tin',error)
                })
        }
    })
    return ()=>unsubscribe()
},[])
    

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EEEEEE' }} >
        {loading?(<Loading></Loading>):( <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE'}}>
        <Back navigation={navigation}></Back>
        <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        
            <View style={{alignItems:"center" }}>
                <TouchableOpacity onPress={handlebannerImageSelector}>
                    <Image
                        source={{uri:banner?banner:nobanner}}
                        style={{height:220,width:windowWidth, }}
                    ></Image>
                    <View
                    style={{position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 999,}}
                    >
                        <MaterialIcons name="photo-camera" size={32} color="#000" />
                    </View>

                </TouchableOpacity>
                <View >
                <TouchableOpacity
                style={{marginLeft:-180}}
                    onPress={handleImageSelector}>
                    <Image
                        source={{uri:selectedImage?selectedImage:noAvatar}}
                        style={{
                            marginTop:-70,
                            height: 130,
                            width: 130,  
                            backgroundColor:'#fff',
                            borderWidth: 0.5,
                            borderColor: '#000'
                        }}
                    >

                    </Image>
                    <View  style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 50,
                                zIndex: 9999
                            }}>
                        <MaterialIcons 
                                name='photo-camera'
                                size={32}
                                color='#000'>

                        </MaterialIcons>
                    </View >
                </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop:10,}}><Divide></Divide></View>
            <View style={{paddingHorizontal:20}}>
            <View>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:18, fontWeight:700}}>Giới thiệu</Text>
                </View>
                <View style={{ height: 100,
                        borderRadius: 10,
                        backgroundColor:'#fff',
                        borderColor: '#ccc',
                        borderWidth: 1,
                        marginVertical: 10,
                        paddingHorizontal: 5}}>
                <TextInput 
                        placeholder={dataBrand.intro?dataBrand.intro:'Giới thiệu công ty của bạn'}
                        multiline={true}
                        style={{padding:5,marginTop:1,fontSize:17}}                       
                        value={dataBrand.intro}
                        onChangeText={(text) =>{setDataBrand({...dataBrand,intro:text})}}
                        ></TextInput>        
                </View>
               
            </View>
            <View style={{marginTop:10}}><Divide></Divide></View>

            <View>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:18, fontWeight:700}}>Thông tin công ty</Text>
                </View>
                <View  style={{marginTop:10}}>
                    <Text style={{fontSize:16}}>Tên công ty</Text>
                    <TextInput 
                        placeholder={dataBrand.name?dataBrand.name:'nhập tên công ty'}
                        style={{borderRadius:11,borderWidth:1,borderColor:'#ccc',fontSize:17,backgroundColor:'#fff',padding:10,marginTop:7}}  
                        value={dataBrand.name}                     
                        onChangeText={(text) =>{setDataBrand({...dataBrand,name:text})}}
                        ></TextInput>
                    
                </View>
                <View  style={{marginTop:10}}>
                    <Text style={{fontSize:16}}>Mã số thuế</Text>
                    <TextInput 
                        placeholder={dataBrand.tax?dataBrand.tax:'nhập mã số thuế'}
                        style={{borderRadius:11,borderWidth:1,fontSize:17,borderColor:'#ccc',backgroundColor:'#fff',padding:10,marginTop:7}}                       
                        value={dataBrand.tax}
                        onChangeText={(text) =>{setDataBrand({...dataBrand,tax:text})}}
                        ></TextInput>
                    
                </View>
                <View style={{marginTop:10}}>
                <Text style={{fontSize:16}}>Địa chỉ cụ thể</Text>
                    <TextInput 
                        placeholder={dataBrand.address?dataBrand.address:'nhập địa chỉ công ty'}
                        style={{borderRadius:11,borderWidth:1,fontSize:17,borderColor:'#ccc',backgroundColor:'#fff',padding:10,marginTop:7}}                       
                         value={dataBrand.address}
                        onChangeText={(text) =>{setDataBrand({...dataBrand,address:text})}}
                        ></TextInput>
                </View>
                <View style={{marginTop:10}}>
                <Text style={{fontSize:16}}>Website</Text>
                    <TextInput 
                        placeholder={dataBrand.website?dataBrand.website:'Vui lòng nhập website'}
                        style={{borderRadius:11,borderWidth:1,fontSize:17,borderColor:'#ccc',backgroundColor:'#fff',padding:10,marginTop:7}}                       
                         value={dataBrand.website}
                        onChangeText={(text) =>{setDataBrand({...dataBrand,website:text})}}
                        ></TextInput>
                </View>
            </View>
            <View style={{marginTop:10}}><Divide></Divide></View>
            <View> 
                <View style={{alignItems:'center'}}>
                <Text style={{fontSize:18, fontWeight:700}}>Thông tin liên lạc</Text>
                </View>
                <View style={{marginTop:10}}>
                <Text style={{fontSize:16}}>Họ và tên</Text>
                    <TextInput 
                        placeholder={dataContact.namecontact?dataContact.namecontact:'nhập họ và tên'}
                        style={{borderRadius:11,borderWidth:1,fontSize:17,borderColor:'#ccc',backgroundColor:'#fff',padding:10,marginTop:7}}                       
                         value={dataContact.namecontact}
                        onChangeText={(text) =>{setDataContact({...dataContact,namecontact:text})}}
                        ></TextInput>
                </View>
                <View style={{marginTop:10}}>
                <Text style={{fontSize:16}}>Số điện thoại</Text>
                    <TextInput 
                        placeholder={dataContact.phonenumber?dataContact.phonenumber:'nhập số điện thoại'}
                        style={{borderRadius:11,borderWidth:1,fontSize:17,borderColor:'#ccc',backgroundColor:'#fff',padding:10,marginTop:7}}                       
                         value={dataContact.phonenumber}
                        onChangeText={(text) =>{setDataContact({...dataContact,phonenumber:text})}}
                        ></TextInput>
                </View>
                <View style={{marginTop:10}}>
                <Text style={{fontSize:16}}>Mail liên hệ</Text>
                    <TextInput 
                        placeholder={dataContact.emailcontact?dataContact.emailcontact:'nhập mail liên hệ'}
                        style={{borderRadius:11,borderWidth:1,fontSize:17,color:'#000',borderColor:'#ccc',backgroundColor:'#fff',padding:10,marginTop:7}}                       
                         value={dataContact.emailcontact}
                        onChangeText={(text) =>{setDataContact({...dataContact,emailcontact:text})}}
                        ></TextInput>
                </View>

            </View>
        
            
            <View style={{marginTop:10}}><Divide></Divide></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:50}}>
                    <TouchableOpacity style={{ backgroundColor: '#1877F2',width: '50%',padding: 15,borderRadius: 10,alignItems:'center'}}
                    onPress={handleSubmit}
                    >
                        <Text style={{color: 'white',fontWeight: '700',fontSize: 16,}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
   
        </ScrollView>
        </SafeAreaView>)}
       

    </SafeAreaView>
  )
}

export default EditProfileRecruitment

const styles = StyleSheet.create({})
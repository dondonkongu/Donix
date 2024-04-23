import { StyleSheet,Alert, Text, View, ImageBackground, TouchableOpacity,Dimensions, SafeAreaView, FlatList, Image } from 'react-native'
import { FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState,useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import {  MaterialCommunityIcons} from "@expo/vector-icons"
import { auth, firestore, storage } from '../../firebase';
import { UserContext } from '../../navigation/UserContext';


const UpToLegit = ({ navigation }) => {


    const {userRole} = useContext(UserContext)

    const [imageUris, setImageUris] = useState([]);
    const [isLegit, setIsLegit] = useState('');
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Cần có quyền', 'Vui lòng cấp quyền cho cuộn camera để chọn hình ảnh.');
            }
        })();
    }, []);
    const handleChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImageUris = result.assets.map(asset => asset.uri);
            setImageUris(selectedImageUris);
        }
    }
    useEffect(()=>{
        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                firestore.collection('users').doc(userId).get()
                .then((doc) => {
                    if (doc.exists) {
                       const userDatas = doc.data();
                       setIsLegit(userDatas.legit)
                    } })                   
                }
            
            
        } catch (error) {
            console.log('loi truy van thong tin', error);
        }
    },[isLegit])
    const handleUploadImages = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                if (imageUris.length > 0) {
                    const uploadPromises = imageUris.map(async imageUri => {
                        const response = await fetch(imageUri);
                        const blob = await response.blob();
                        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
                        const ref = storage.ref().child(`imageUpToLegits/${userId}/${filename}`);
                        await ref.put(blob);
                        const imageUrl = await ref.getDownloadURL();
                        
                        await firestore.collection('users').doc(userId).update({
                            legit:'đang chờ'
                        });

                        return { imageUri, success: true };
                    });

                    const uploadResults = await Promise.all(uploadPromises);
                    const successfulUploads = uploadResults.filter(result => result.success);
                    const failedUploads = uploadResults.filter(result => !result.success);

                    Alert.alert(
                        'Upload Results',
                        `Upload thành công: ${successfulUploads.length}\n uploads thất bại: ${failedUploads.length}`
                    );
                }
            }
        } catch (error) {
            console.log('Error uploading images', error);
        }
    }
    const renderImage = ({ item }) => (
        <Image source={{ uri: item }} style={{ width: Dimensions.get('window').width / 3.5, height: 150, margin: 5 }} />
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/image/legit.jpg')} resizeMode='cover'>
                <View style={{ height: 95, alignItems: 'center' }}>
                    <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
                            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Nâng cấp tài khoản</Text>
                        <Text >    </Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {isLegit === 'đang chờ' ?(<View><Text>Yêu cầu của bạn đang được xem xét</Text></View>):isLegit==='duyệt'?(
                <View style={{alignItems:'center', justifyContent:'center'}}>
               <Image source={require('../../assets/image/success1.jpg')} style={{height:400,width:400}}></Image>
               <View style={{marginTop:20}}>
                <Text style={{fontSize:30, fontWeight:'bold',textAlign:'center',color:'#43c501'}}>Tài khoản của bạn đã được xác thực <MaterialCommunityIcons name='check-all' size={30} color='#43c501'></MaterialCommunityIcons></Text>
                </View>
                </View>
                ):userRole==='KOC'?(<View><View style={{margin:10}}>
                    <Text style={{fontWeight:'bold',fontSize:16}}>Quý khách vui lòng cung cấp giấy tờ để xác thực tài khoản </Text>
                    
                </View>
                <View style={{marginLeft:15,marginTop:15}}>
                    <Text style={{marginBottom:7}}>File ảnh cung cấp bao gồm </Text>
                    <Text>1. CMND/CCCD mặt trước</Text>
                    <Text>2. CMND/CCCD mặt sau</Text>
                    <Text>3. Ảnh chân dung (cam thường, không qua chỉnh sửa)</Text>
                </View>
                <View>
                    <View style={{ height: 160, backgroundColor: '#f6f6f6', borderRadius: 10, borderWidth: 1, borderColor: '#ccc', margin: 10 }}>
                        <FlatList
                            data={imageUris}
                            renderItem={renderImage}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={3}
                        />
                          <View style={{
                            position: 'absolute',
                        alignItems: 'flex-end',                       
                    }}>
                        <TouchableOpacity onPress={handleChooseImage}>
                            <MaterialCommunityIcons name='image-plus' size={30} color='#262323'></MaterialCommunityIcons>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginLeft:15}}>
                    <Text style={{fontSize:15,marginBottom:7}}>Quyền lợi khi nâng cấp account lên <Text style={{color:'blue', fontWeight:'bold',fontSize:15}}>premium</Text></Text>
                    <Text>1. Được xác thực tài khoản</Text>
                    <Text>2. Được ưu tiên khi tìm kiếm việc làm</Text>
                    <Text>3. Được ưu tiên khi ứng tuyển việc làm</Text>
                    <Text>4. Hồ sơ cá nhân khác biệt</Text>
                            
                </View>
                <View style={{alignItems:'center'}}>
                    <View >
                        <TouchableOpacity onPress={handleUploadImages}
                        style={{
                            backgroundColor: '#1877F2',
                            marginTop:50,
                            padding: 15,
                            paddingHorizontal: 40,
                            borderRadius: 10,
                            alignItems: 'center',
    
                        }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
</View>):(<View><View style={{margin:10}}>
                    <Text style={{fontWeight:'bold',fontSize:16}}>Nhãn hàng, cty vui lòng cung cấp giấy tờ để chúng tôi nâng cấp tài khoản </Text>
                    
                </View>
                <View style={{marginLeft:15,marginTop:15}}>
                    <Text style={{marginBottom:7}}>File ảnh cung cấp bao gồm </Text>
                    <Text>1. CMND/CCCD mặt trước người đại diện</Text>
                    <Text>2. CMND/CCCD mặt sau người đại diện</Text>
                    <Text>3. Ảnh nhãn hàng hoặc cty hoặc một số giấy tờ khác</Text>
                </View>
                <View>
                    <View style={{ height: 160, backgroundColor: '#f6f6f6', borderRadius: 10, borderWidth: 1, borderColor: '#ccc', margin: 10 }}>
                        <FlatList
                            data={imageUris}
                            renderItem={renderImage}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={4}
                        />
                          <View style={{
                            position: 'absolute',
                        alignItems: 'flex-end',                       
                    }}>
                        <TouchableOpacity onPress={handleChooseImage}>
                            <MaterialCommunityIcons name='image-plus' size={30} color='#262323'></MaterialCommunityIcons>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginLeft:15}}>
                    <Text style={{fontSize:16,marginBottom:7}}>Quyền lợi khi nâng cấp account lên <Text style={{color:'blue', fontWeight:'bold',fontSize:15}}>premium</Text></Text>
                    <Text>1. Được xác thực tài khoản</Text>
                    <Text>2. Không giới hạn đăng tin tuyển dụng</Text>
                    <Text>3. Xem được số liệu phân tích bài nộp, số liệu phân tích kênh của ứng viên </Text>
                    <Text>4. Hồ sơ công ty khác biệt</Text>
                            
                </View>
                <View style={{alignItems:'center'}}>
                    <View >
                        <TouchableOpacity onPress={handleUploadImages}
                        style={{
                            backgroundColor: '#1877F2',
                            marginTop:50,
                            padding: 15,
                            paddingHorizontal:40,
                            borderRadius: 10,
                            alignItems: 'center',
    
                        }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
</View>) }
                
                  
                
            </View>
        </SafeAreaView>
    )
}

export default UpToLegit

const styles = StyleSheet.create({})
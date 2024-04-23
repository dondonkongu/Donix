import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Dimensions, Alert } from 'react-native'
import React from 'react'
import { auth, firestore, database, storage } from '../../firebase'
import { useState, useEffect } from 'react'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const Upposts = ({ navigation }) => {
    const [avatar, setAvatar] = useState(null)
    const [name, setName] = useState(null)
    const [imageUris, setImageUris] = useState([])
    const [content, setContent] = useState('')
    const [legit, setLegit] = useState('')


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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userId = user.uid;
                firestore
                    .collection('users')
                    .doc(userId)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            const userData = doc.data()
                            setAvatar(userData.avatar)
                            setName(userData.name)
                            setLegit(userData.legit)
                        }
                    })
                    .catch(error => { console.log("loi truy van thong tin", error) })
            }
        })
        return () => unsubscribe();
    }, [])

    const renderImage = ({ item }) => (<View style={{ borderWidth: 1, borderColor: '#ccc' }}>
        <Image source={{ uri: item }} style={{ width: Dimensions.get('window').width, height: 300, resizeMode: 'cover' }} />
        <TouchableOpacity style={{ position: 'absolute', top: 1, right: 1 }} onPress={() => setImageUris(null)}>
            <AntDesign name='closesquare' size={34} color='#fff' ></AntDesign>
        </TouchableOpacity>
    </View>
    );

    const handleUpPost = async () => {
       

        if ((content.length > 0) || (imageUris.length > 0)) {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;

                if (imageUris.length > 0) {
                    imageUris.map(async imageUri => {
                        const response = await fetch(imageUri);
                        const blob = await response.blob();
                        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
                        const ref = storage.ref().child(`users/${userId}/PostImages/${filename}`);
                        await ref.put(blob);
                        const imageUrl = await ref.getDownloadURL();

                        await database.ref(`Posts/${userId}`).push({
                            content: content,
                            imageUrl: imageUrl?imageUrl:'',
                            time: new Date().getTime(),
                            userId: userId,
                            like: 0,
                            comment: 0,
                            avatar: avatar,
                            name: name,
                            legit: legit

                        });
                        Alert.alert('Thông báo','Đăng bài thành công')


                    })
                }
            }
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{ backgroundColor: '#fff', height: 93, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }}>
                <View style={{ flexDirection: 'row', marginTop: 55, width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name='close' size={24} color='#000' style={{ marginLeft: 20 }}></AntDesign>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ color: '#000', fontSize: 19, fontWeight: 600, }}>Tạo bài viết</Text>
                    </View>
                    <TouchableOpacity onPress={handleUpPost} style={{ backgroundColor: '#0866ff', borderRadius: 5, paddingHorizontal: 12, paddingVertical: 5, }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: avatar }} style={{ height: 50, width: 50, borderRadius: 99, borderWidth: 1, borderColor: '#ccc' }} ></Image>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>{name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Fontisto name='earth' size={18} color='#333' style={{ marginLeft: 10 }}></Fontisto>
                            <Text> Công khai</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 0, width: '100%', }}>
                    <View style={{
                        height: 'auto',
                        marginVertical: 10,
                        paddingHorizontal: 5
                    }}
                    >
                        <TextInput
                            style={{ fontSize: 15 }}
                            multiline={true}
                            placeholder={'bạn đang nghĩ gì? '}
                            onChangeText={text => setContent(text)}
                        />
                    </View>

                </View>
                <View>
                    <FlatList
                        data={imageUris}
                        renderItem={renderImage}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                    />
                    <TouchableOpacity onPress={handleChooseImage}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                            <AntDesign name='picture' size={24} color='#333' style={{ marginLeft: 10 }}></AntDesign>
                            <Text style={{ marginLeft: 10, fontSize: 16, color: '#333' }}>Ảnh/Video</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                            <AntDesign name='addusergroup' size={24} color='#333' style={{ marginLeft: 10 }}></AntDesign>
                            <Text style={{ marginLeft: 10, fontSize: 16, color: '#333' }}>Tag bạn bè</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                            <AntDesign name='smileo' size={24} color='#333' style={{ marginLeft: 10 }}></AntDesign>
                            <Text style={{ marginLeft: 10, fontSize: 16, color: '#333' }}>Cảm xúc/Hoạt động</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Upposts

const styles = StyleSheet.create({})
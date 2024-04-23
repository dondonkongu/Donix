import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert, Dimensions, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/firestore';
import { auth, firestore, storage } from '../firebase';
import Back from '../shared/Back';

const ImagesSelect = ({navigation}) => {
  const [imageUris, setImageUris] = useState([]);

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
  };

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
            const ref = storage.ref().child(`users/${userId}/images/${filename}`);
            await ref.put(blob);
            const imageUrl = await ref.getDownloadURL();
            const imageInfoRef = firestore.collection('images').doc(userId);
            await imageInfoRef.set({
              imageUrl,
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
      console.error('Error uploading images:', error);
    }
  };
  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={{ width: Dimensions.get('window').width / 3.5, height: 150, margin: 5 }} />
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#F0F2F5', flex: 1 , marginTop:35}}>
                    <Back navigation={navigation}/>
      <View style={{ marginTop: 30, flexDirection: 'column' }}>
        <View>
          <Text style={{ fontSize: 16, marginBottom: 10, marginLeft:20, fontWeight: "600" }}>  Choose your photos to display on your wall !!</Text>
        </View>
        <View style={{ height: '80%', backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#ccc', margin: 10 }}>
          <FlatList
            data={imageUris}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-around', }}>
          <View style={{
            backgroundColor: '#1877F2',
            width: '40%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}>
            <TouchableOpacity onPress={handleChooseImage}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>Chọn hình ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            backgroundColor: '#1877F2',
            width: '40%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}>
            <TouchableOpacity onPress={handleUploadImages}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>Upload hình ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ImagesSelect
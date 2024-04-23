import { StyleSheet, View, Image, TouchableOpacity, Modal,Dimensions } from 'react-native'
import { Text } from 'react-native-elements'
import React from 'react'
import { useState, useEffect } from 'react'
import { auth, storage, database } from '../firebase'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native';


const Pictures = ({}) => {


  const windowHeight = Dimensions.get('window').height
  const route = useRoute();
  
  const  profileId  = route.params.profileId;
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const storageRef = storage.ref();
          const imagesRef = storageRef.child(`users/${profileId}/images`);
          const imageList = await imagesRef.listAll();

          const downloadPromises = imageList.items.map(async (item) => {
            const url = await item.getDownloadURL();
            return url;
          });

          const urls = await Promise.all(downloadPromises);
          setImageUrls(urls);
        }
      } catch (error) {
        console.error('loi set images', error);
      }
    };

    fetchImageUrls();
  }, [])
  const handleImagePress = (url) => {
    setSelectedImage(url);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  const handleDeleteImage = async () => {
    try {
      const user = auth.currentUser;
      if (user && selectedImage) {
        const imageRef = storage.refFromURL(selectedImage);
        await imageRef.delete();
        const updatedImageUrls = imageUrls.filter((url) => url !== selectedImage);
        setImageUrls(updatedImageUrls);
        handleCloseModal();
      }
    } catch (error) {
      console.error('loi xoa anh:', error);
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, flexDirection: 'collumn', width: '100%', backgroundColor: '#fff', borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {imageUrls.map((url, index) => (
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
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: selectedImage }} style={{ width: '100%', height:windowHeight-200  }} resizeMode="center" />
          </View>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
          {auth.currentUser.uid === profileId && (<TouchableOpacity onPress={handleDeleteImage} style={{ position: 'absolute', top: 30, right: 20 }}>
            <MaterialCommunityIcons name="delete" size={40} color="#fff" />
          </TouchableOpacity>)}
          
        </View>
      </Modal>
    </View>
  )
}

export default Pictures

const styles = StyleSheet.create({})
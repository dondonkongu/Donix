import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, TouchableOpacity, Animated, Modal } from 'react-native';
import { Text } from 'react-native-elements';
import { auth,storage } from '../../firebase';

const GalleryWall = ({profileId}) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [showPhotos, setShowPhotos] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

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
                console.error('Error fetching image URLs:', error);
            }
        };

        fetchImageUrls();
    }, []);

    const handleShowPhotos = () => {
        if (!showPhotos) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: -100,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowPhotos(true);
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        }
    };

    const handleShowReels = () => {
        if (showPhotos) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 100,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowPhotos(false);
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        }
    };

    const handleImagePress = (url) => {
        setSelectedImage(url);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    
    return (
        <View style={{marginBottom:85}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginBottom:5 }}>
                <TouchableOpacity onPress={ handleShowReels} style={showPhotos ? { backgroundColor:'#fff',padding:8 ,marginTop:5} : {backgroundColor:'#B0E0E6',borderRadius:15,padding:8,marginTop:5}}>
                        <Text style={ {  fontSize: 16 }}>  Đánh giá  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShowPhotos} style={showPhotos ? {backgroundColor:'#B0E0E6',borderRadius:15,padding:8,marginTop:5} :{ backgroundColor:'#fff' ,padding:8 ,marginTop:5} }>
                    <Text style={ {  fontSize: 16  }}>  Ảnh  </Text>
                </TouchableOpacity>
            </View>
            <View
      style={{flexDirection: 'row', alignItems: 'center',marginTop:2,marginBottom:5 
      }}
    >
      <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1,flex: 1, marginHorizontal:5,
        }}
      />
    </View>
            <View >
                {showPhotos ? (
                    <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                        style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}
                    >
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
                    </Animated.ScrollView>
                ) : (
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }],justifyContent:'center',alignItems:'center' }}>
                        <Text style={{marginTop:50}}>Trong đây là bài viết</Text>
                    </Animated.View>
                )}
            </View>
            <Modal visible={selectedImage !== null} transparent={true}>
  <View style={{flex:1,backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
    <TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '120%' }} resizeMode="contain" />
    </View>
    <TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
    
  </View>
</Modal>
        </View>
    );
};

export default GalleryWall;
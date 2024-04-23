import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, TouchableOpacity, Animated, Modal } from 'react-native';
import { Text } from 'react-native-elements';
import { auth, storage, database } from '../firebase';
import { AntDesign } from '@expo/vector-icons'

const Gallery = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [showPhotos, setShowPhotos] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const [dataEvualate, setDataEvualate] = useState([])
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid
            database.ref(`User/${userId}/evalute`).on('value', (snapshot) => {
                const data = snapshot.val()
                if (data) {
                    const data1 = []
                    Object.keys(data).map((key) => {
                        data1.push(data[key])
                    })
                    setDataEvualate(data1)
                }
            })
        }

    }, [])

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const storageRef = storage.ref();
                    const imagesRef = storageRef.child(`users/${userId}/images`);

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
            console.error('Error deleting image:', error);
        }
    };
   

    return (
        <View style={{ marginBottom: 85 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                <TouchableOpacity onPress={handleShowReels} style={showPhotos ? { backgroundColor: '#fff' } : { backgroundColor: '#ccc', borderRadius: 10 }}>
                    <Text style={{ fontSize: 16 }}>  Đánh giá  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShowPhotos} style={showPhotos ? { backgroundColor: '#ccc', borderRadius: 10 } : { backgroundColor: '#fff' }}>
                    <Text style={{ fontSize: 16 }}>  Ảnh  </Text>
                </TouchableOpacity>
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
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }], justifyContent: 'center', alignItems: 'center' }}>
                        {dataEvualate.map((item, index) => {
                            return (
                                <View key={index} style={{ margin: 10, flexDirection: 'collumn', width: '90%', backgroundColor: '#fff', borderRadius: 10 }}>
                                    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',}}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.nameRecruit}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <AntDesign name={item.star1 ? 'star' : 'staro'} size={24} color="#FFD700" />
                                            <AntDesign name={item.star2 ? 'star' : 'staro'} size={24} color="#FFD700" />
                                            <AntDesign name={item.star3 ? 'star' : 'staro'} size={24} color="#FFD700" />
                                            <AntDesign name={item.star4 ? 'star' : 'staro'} size={24} color="#FFD700" />
                                            <AntDesign name={item.star5 ? 'star' : 'staro'} size={24} color="#FFD700" />
                                        </View>
                                    </View>
                                    <View>
                                        <Text>{item.danhgia}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </Animated.View>
                )}
            </View>
            <Modal visible={selectedImage !== null} transparent={true}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '120%' }} resizeMode="contain" />
                    </View>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
                    <TouchableOpacity onPress={handleDeleteImage} style={{ position: 'absolute', top: 20, right: 20, backgroundColor: '#ccc' }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Xóa ảnh</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default Gallery;
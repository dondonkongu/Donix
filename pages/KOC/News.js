import { StyleSheet, View, SafeAreaView, TouchableOpacity, Modal, Image, FlatList } from 'react-native'
import { Text } from 'react-native-elements'
import React, { Component } from 'react'
import { auth, firestore, database } from '../../firebase'
import { useState, useEffect } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

const News = ({ navigation }) => {

    const nobanner = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'


    const [avatarH, setAvatarH] = useState(null)
    const [dataPost, setDataPost] = useState([])
    const [dataLikePosts, setDataLikePosts] = useState([])
    const [change, setChange] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        database.ref(`LikePosts/${auth.currentUser.uid}`).once('value').then((snapshot) => {
            const data = snapshot.val()
            setDataLikePosts(data ? Object.keys(data) : [])
        }
        )
    }, [change])

    useEffect(() => {
        const hh = database.ref('Posts').once('value')
            .then((snapshot) => {
                const dataPost = snapshot.val();
                if (dataPost) {
                    const allPostData = [];
                    Object.keys(dataPost).forEach((userId) => {
                        const postIds = Object.keys(dataPost[userId]);
                        postIds.forEach((postId) => {
                            const postData = dataPost[userId][postId];
                            postData.userId = userId
                            postData.postId = postId
                            allPostData.push(postData)
                        });
                    });
                    setDataPost(allPostData)
                }
            })
            .catch((error) => {
                console.log('Đã xảy ra lỗi: ', error);
            });
        return () => hh;
    }, [change]);

    useEffect(() => {
        if (dataPost.length > 0) {
            const sortedData = [...dataPost].sort((a, b) => {
                const timeA = new Date(a.time);
                const timeB = new Date(b.time);
                return timeB - timeA;
            });
            setData(sortedData);
        }

    }, [dataPost])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userId = auth.currentUser.uid;
                firestore
                    .collection('users')
                    .doc(userId)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            const userData = doc.data()

                            setAvatarH(userData.avatar)
                        }
                    })
                    .catch(error => { console.log("loi", error) })
            }
        })
        return () => unsubscribe();
    }, [])
    const handleHeart = async (postId, like, userId) => {
        const likedPost = dataLikePosts.includes(postId)
        setChange(!change)

        if (likedPost) {
            await database.ref(`LikePosts/${auth.currentUser.uid}/${postId}`).remove()
                .then(() => {
                })
                .catch(error => {
                    console.log('Đã xảy ra lỗi khi bỏ thích bài viết:', error);
                });
            await database.ref(`Posts/${userId}/${postId}`).update({
                like: like - 1
            })
        } else {
            await database.ref(`LikePosts/${auth.currentUser.uid}/${postId}`).update({
                status: true
            })
                .then(() => { })
                .catch(error => {
                    console.log('Đã xảy ra lỗi khi thích bài viết:', error);
                });
            await database.ref(`Posts/${userId}/${postId}`).update({
                like: like + 1
            })

        }
    }

    const renderPost = ({ item }) => {
        const formatTime = (timestamp) => {
            const timeUpload = new Date(timestamp)
            const currentDate = new Date();

            if (
                timeUpload.getDate() === currentDate.getDate() &&
                timeUpload.getMonth() === currentDate.getMonth() &&
                timeUpload.getFullYear() === currentDate.getFullYear()
            ) {
                if (currentDate.getMinutes() - timeUpload.getMinutes() === 0) {
                    return `Vừa xong`
                }
                if (currentDate.getHours() - timeUpload.getHours() === 0) {
                    return `${currentDate.getMinutes() - timeUpload.getMinutes()} phút trước`
                }
                else {
                    return `${currentDate.getHours() - timeUpload.getHours()} giờ trước`
                }
            }
            else {
                return timeUpload.getDate() + ' Tháng ' + (timeUpload.getMonth() + 1) + ', ' + timeUpload.getFullYear()
            }
        };
        return (
            <View style={{ backgroundColor: '#fff', marginTop: 7 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 5 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileWallDetail', { profileId: item.userId })}>
                        <Image
                            source={{ uri: item.avatar ? item.avatar : nobanner }}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 60,
                                borderWidth: 1,
                                borderColor: '#ccc',
                            }}
                        ></Image>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10 }}><View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.name} </Text>
                        {item.legit === 'duyệt' ? <MaterialIcons name="verified" size={17} color="#15a7ff" /> : null}
                    </View>
                        <Text style={{ fontSize: 12, color: '#65676b' }}>{formatTime(item.time)}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginLeft: 6 }}>
                    <Text style={{ fontSize: 16 }}>{item.content}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{
                            width: '100%',
                            height: 300,
                            resizeMode: 'cover',
                            borderWidth: 1,
                            borderColor: '#ccc',
                        }}
                    >

                    </Image>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} onPress={() => handleHeart(item.postId, item.like, item.userId)}>
                        {dataLikePosts.includes(item.postId) ? <AntDesign name="heart" size={25} color="red" /> : <AntDesign name="hearto" size={25} color="black" />}
                        <Text style={{ marginLeft: 5, fontSize: 17 }}>{item.like}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailPost', { postId: item.postId, userId: item.userId })}>
                        <Text style={{ marginRight: 10, fontSize: 15 }}>{item.comment} Bình luận</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#fff', height: 80, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }}>
                <View style={{ marginTop: 45, width: '95%', alignItems: 'center' }}>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ color: '#000', fontSize: 19, fontWeight: 600, }}>Bảng tin</Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={{ height: 'auto', backgroundColor: '#fff' ,borderBottomColor:'#ccc',borderBottomWidth:1}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsProfile', { profileId: auth.currentUser.id })}>
                            <Image
                                source={{ uri: avatarH }}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 60,
                                    borderWidth: 1,
                                    borderColor: '#ccc'
                                }}
                            ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.navigate('Upposts')}>
                            <Text style={{ fontSize: 16 }}>Bạn đang nghĩ gì </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={{ flex: 1, backgroundColor: '#ccc', marginBottom: 70 }}>

                <FlatList
                    data={data}
                    renderItem={renderPost}
                    keyExtractor={item => item.postId}
                />
            </View>





        </SafeAreaView>
    )
}

export default News

const styles = StyleSheet.create({})
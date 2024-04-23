import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { Text } from 'react-native-elements'
import { AntDesign, Ionicons,MaterialIcons } from '@expo/vector-icons'
import { database, auth, firestore } from '../../firebase'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';

const DetailPost = ({ navigation }) => {
    const nobanner = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'


    const route = useRoute();
    const postId = route.params.postId;
    const userId = route.params.userId;
    const [change, setChange] = useState(false)
    const [dataPost, setDataPost] = useState([])
    const [dataLikePosts, setDataLikePosts] = useState([])
    const [avatarCmt, setAvatarCmt] = useState(null)
    const [nameCmt, setNameCmt] = useState(null)
    const [legitCmt, setLegitCmt] = useState(null)
    const [comment, setComment] = useState('')
    const [commentData, setCommentData] = useState([])


    useEffect(() => {
        firestore.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data()
                if (data) {
                    setAvatarCmt(data.avatar)
                    setNameCmt(data.name)
                    setLegitCmt(data.legit)
                }
            }
        })
    }, [])

    useEffect(() => {
        database.ref(`Comments/${postId}`).on('value', (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const allCommentData = [];
                Object.keys(data).forEach((userId) => {
                    const commentIds = Object.keys(data[userId]);
                    commentIds.forEach((commentId) => {
                        const commentData = data[userId][commentId];
                        commentData.userId = userId
                        commentData.commentId = commentId
                        allCommentData.push(commentData)
                    });
                });

                setCommentData(allCommentData)
            }
        })
    }, [])



    useEffect(() => {
        database.ref(`Posts/${userId}/${postId}`).once('value').then((snapshot) => {
            const data = snapshot.val()
            setDataPost(data)
        })
    }, [change])
    useEffect(() => {
        database.ref(`LikePosts/${auth.currentUser.uid}`).once('value').then((snapshot) => {
            const data = snapshot.val()
            setDataLikePosts(data ? Object.keys(data) : [])
        }
        )
    }, [change])



    const handleHeart = async (postId, like, userId) => {
        const likedPost = dataLikePosts.includes(postId)
        setChange(!change)

        if (likedPost) {
            await database.ref(`LikePosts/${auth.currentUser.uid}/${postId}`).remove()
                .then(() => {
                    console.log(1);
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
                .then(() => { console.log(2); })
                .catch(error => {
                    console.log('Đã xảy ra lỗi khi thích bài viết:', error);
                });
            await database.ref(`Posts/${userId}/${postId}`).update({
                like: like + 1
            })

        }
    }
    const handleSendCmt = async () => {
        if (comment.trim() === '') return;
        await database.ref(`Comments/${postId}/${auth.currentUser.uid}`).push({
            content: comment,
            userId: auth.currentUser.uid,
            avatar: avatarCmt,
            name: nameCmt,
            legit: legitCmt
        })
        await database.ref(`Posts/${userId}/${postId}`).update({
            comment: dataPost.comment + 1
        })
        setComment('')
        setChange(!change)
    }
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ marginTop: 50 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Image source={{ uri: dataPost.avatar ? dataPost.avatar : nobanner }} style={{ height: 50, width: 50, borderRadius: 99, borderWidth: 0.5, borderColor: '#ccc' }}></Image>
                        <View style={{ marginLeft: 8 }}>
                            <Text style={{ fontSize: 15 }}>{dataPost.name}</Text>
                            <Text style={{ fontSize: 13, color: '#65676b' }}>{formatTime(dataPost.time)}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View>
                    <Text style={{ fontSize: 16, marginLeft: 10, marginTop: 10, marginBottom: 5 }}>{dataPost.content}</Text>
                    <Image source={{ uri: dataPost.imageUrl }} style={{ width: '100%', height: 300, resizeMode: 'cover', borderWidth: 1, borderColor: '#ccc' }}></Image>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} onPress={() => handleHeart(postId, dataPost.like, dataPost.userId)}>
                        {dataLikePosts.includes(postId) ? <AntDesign name="heart" size={25} color="red" /> : <AntDesign name="hearto" size={25} color="black" />}
                        <Text style={{ marginLeft: 5, fontSize: 17 }}>{dataPost.like}</Text>
                    </TouchableOpacity>
                    <Text style={{ marginRight: 10, fontSize: 15 }}>{dataPost.comment} Bình luận</Text>
                </View>
                <View>
                    {commentData.map((item, index) => (
                        
                        <View key={index} style={{ flexDirection: 'row',marginTop:10,marginHorizontal:10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ProfileWallDetail', { profileId: item.userId })}>
                            <Image source={{ uri: item.avatar }} style={{ height: 40, width: 40, borderRadius: 99, borderWidth: 0.5, borderColor: '#ccc' }}>

                            </Image>
                            </TouchableOpacity>
                            <View style={{ marginLeft:10,marginRight:30, borderRadius:10, backgroundColor:'#f0f2f5' ,padding:5,height:'auto'}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{ fontSize: 15, fontWeight: '700' }}>{item.name}</Text>
                                {item.legit==='duyệt' ? <MaterialIcons name="verified" size={17} color="#15a7ff" /> : null}
                                </View>
                                
                                <Text style={{ fontSize: 13, color: '#050505' }}>{item.content}</Text>
                             </View>   

                        </View>



                    ) )
                    }
                </View>
            </ScrollView>
            <View style={{ bottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <TextInput style={{ width: '100%', flex: 1, borderWidth: 1.5, marginRight: 10, padding: 8, borderRadius: 10, borderColor: '#CC3333' }}
                        onChangeText={(text) => { setComment(text) }}
                        placeholder="Viết bình luận..."></TextInput>
                    <TouchableOpacity onPress={handleSendCmt}>
                        <Ionicons name="send" size={24} color="#CC3333"></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DetailPost

const styles = StyleSheet.create({})
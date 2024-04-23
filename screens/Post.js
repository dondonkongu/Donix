import { StyleSheet,  View, Image, TouchableOpacity,ActivityIndicator, ScrollView,Alert } from 'react-native'
import { Text } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { auth, database, firestore } from '../firebase';
import FacebookIcon from '../component/IconSocials/FacebookIcon'
import TiktokIcon from '../component/IconSocials/TiktokIcon';
import InstagramIcon from '../component/IconSocials/InstagramIcon';
import { Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons,AntDesign } from '@expo/vector-icons';


const Post = ({navigation}) => {
  const route = useRoute();
  const profileId = route.params.profileId;
  const [change, setChange] = useState(false)
  const [data,setData]=useState([])
  const [intro,setIntro] = useState('')
  const [facebook,setFacebook]=useState('')
  const [flFacebook, setFlFacebook] = useState('')
  const [tiktok,setTiktok]=useState('')
  const [instagram,setInstagram]=useState('')
  const [flTiktok, setFlTiktok] = useState('')
  const [flInstagram, setFlInstagram] = useState('')
  const [flYoutube, setFlYoutube] = useState('')
  const [loading,setLoading]=useState(true)
  const [price,setPrice]=useState('')
  const [dataPost,setDataPost]=useState([])
  const [dataLikePosts, setDataLikePosts] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const doc = await firestore.collection('users').doc(profileId).get();
          if (doc.exists) {
            const data = doc.data();
            setIntro(data.intro)
            setFacebook(data.facebook)
            setFlFacebook(data.flFacebook)
            setTiktok(data.tiktok)
            setFlTiktok(data.flTiktok)
            setInstagram(data.instagram)
            setFlInstagram(data.flInstagram)
            setFlYoutube(data.flYoutube)
            setPrice(data.price)
            setLoading(false)
          }
        }
      } catch (error) {
        console.error('loi truy van thong tin', error);
      }
    };
    fetchPost();
  }, [profileId])
  useEffect(() => {
    database.ref(`Posts/${profileId}`).once('value').then((snapshot) => {
      const data = snapshot.val()
      if(data){
        const allPostData = [];
        Object.keys(data).forEach((postID) => {
          const postData = data[postID];
          postData.postId = postID;
          allPostData.push(postData);
        });
        setDataPost(allPostData); 
      }     
    }
    )    
  }, [change])

  useEffect(() => {
      database.ref(`LikePosts/${auth.currentUser.uid}`).once('value').then((snapshot) => {
          const data = snapshot.val()
              setDataLikePosts(data ? Object.keys(data) : [])
          }
      )
  }, [change])

  useEffect(()=>{
      if(dataPost.length>0){
        const dataTime = dataPost.sort((a, b) => b.time - a.time)
        setData(dataTime)
      }
  },[dataPost])
  
  const handleFacebookLink = () => {

    Linking.canOpenURL(`${facebook}`)
      .then((suported) => {
        if (suported) {
          Linking.openURL(`${facebook}`)
        } else {
          Linking.openURL(facebook);
        }
      })
      .catch(() => {
        Alert.alert('Thông báo','người này chưa cập nhật thông tin')
      })
  }
  
  const handleTiktokLink = () => {
    Linking.canOpenURL(`${tiktok}`)
      .then((suported) => {
        if (suported) {
          Linking.openURL(`${tiktok}`)
        } else {
          Linking.openURL(tiktok);
        }
      })
      .catch(() => {
        Alert.alert('Thông báo','người này chưa cập nhật thông tin')
      })
  }
  const handleInstagramLink = () => {
    Linking.canOpenURL(`${instagram}`)
      .then((suported) => {
        if (suported) {
          Linking.openURL(`${instagram}`)
        } else {
          Linking.openURL(instagram);
        }
      })
      .catch(() => {
        Alert.alert('Thông báo','người này chưa cập nhật thông tin')
      })
  }
  const handleHeart = async(postId,like,userId) => {
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
            .then(() => {                })
            .catch(error => {
                console.log('Đã xảy ra lỗi khi thích bài viết:', error);
            });
            await database.ref(`Posts/${userId}/${postId}`).update({
            like: like + 1
        })    

    }
}
  
  return (
    <SafeAreaView >
        <ScrollView >
          {loading?<ActivityIndicator size='large' color='black' style={{marginTop:200}}></ActivityIndicator>:
          <View style={{height:'auto',backgroundColor:'#fff'}}>
    
      <View style={{ marginTop:10, marginHorizontal:15}}>
        <Text style={{fontSize:15}}>{intro}</Text>
      </View>
      <View style={{marginHorizontal:15,marginTop:5}}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Giá Booking: <Text>{price?price:'liên hệ để nhận báo giá'}</Text></Text>
          </View>
    <Text style={{fontSize:16,fontWeight:'bold',marginTop:15,marginLeft:15}}>Mạng xã hội của tôi</Text>
      <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:15,marginBottom:5}} >
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={handleFacebookLink}>
        <FacebookIcon size={35} color='#1877F2'></FacebookIcon>
        </TouchableOpacity>
        <View style={{marginLeft:5}}>
        <Text style={{fontSize:14,fontWeight:'700'}}>Facebook</Text>
        <Text>{flFacebook?flFacebook:'0'}</Text>
        </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}} >
        <TouchableOpacity onPress={handleTiktokLink}>
          <TiktokIcon size={35} color='black'></TiktokIcon>
        </TouchableOpacity>
        <View style={{marginLeft:5}}>
        <Text style={{fontSize:14,fontWeight:'700'}}>Tiktok</Text>
        <Text>{flTiktok?flTiktok:'0'}</Text>
        </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}} >
        <TouchableOpacity onPress={handleInstagramLink}>
          <InstagramIcon size={35} ></InstagramIcon>
        </TouchableOpacity>
        <View style={{marginLeft:5}}>
        <Text style={{fontSize:14,fontWeight:'700'}}>Instagram</Text>
        <Text>{flInstagram?flInstagram:'0'}</Text>
        </View>
        </View>
        
      </View>
      <View style={{backgroundColor:'#ccc'}}>
      {data.map((item, index) => {
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
      }
      return (
            <View key={index} style={{marginTop:7,backgroundColor:'#fff'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 10 }}>
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
                <View style={{ marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.name} </Text>
                  {item.legit==='duyệt' ? <MaterialIcons name="verified" size={17} color="#15a7ff" /> : null}
                </View>
                  <Text style={{ fontSize: 12, color: '#65676b' }}>{formatTime(item.time)}</Text>
                </View>
                
              </View>
              <View style={{ marginTop: 10 ,marginLeft:6}}>
                    <Text style={{fontSize:16}}>{item.content}</Text>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height:50,alignItems:'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' ,marginLeft:10}} onPress={() => handleHeart(item.postId,item.like,item.userId)}>
                        {dataLikePosts.includes(item.postId) ? <AntDesign name="heart" size={25} color="red" /> : <AntDesign name="hearto" size={25} color="black" />}
                        <Text style={{ marginLeft: 5,fontSize:17 }}>{item.like}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('DetailPost',{postId:item.postId,userId:item.userId})}>
                        <Text style={{ marginRight: 10, fontSize:15}}>{item.comment} Bình luận</Text>
                    </TouchableOpacity>

                </View>
              </View>

          )})}
          </View>

          </View>
      
      
         }

      
      
      
      
     
    </ScrollView>
    </SafeAreaView>
  )
}

export default Post

const styles = StyleSheet.create({})
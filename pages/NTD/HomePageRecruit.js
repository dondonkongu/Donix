import { SafeAreaView, Dimensions, StyleSheet, View, TextInput, FlatList, Image, ScrollView, ImageBackground } from 'react-native'
import { Text } from 'react-native-elements'
import { FontAwesome, MaterialIcons } from 'react-native-vector-icons'
import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import {auth, database, firestore } from '../../firebase'
import { TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { UserContext } from '../../navigation/UserContext'


const HomePageRecruit = ({ navigation }) => {

  const { userRole } = useContext(UserContext)
  const handleInputFocus = () => {
    navigation.navigate('SearchScreen')
  }
  const windowWidth = Dimensions.get('window').width
  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'
  const [users, setUsers] = useState([])
  const [usersKoc, setUserKoc] = useState([])

  const [listRecruitments, setListRecruitments] = useState([])
  const [displayListRe, setDisplayListRe] = useState([])
  const [suggestList, setSuggestList] = useState([])
  const [fieldsSuggest, setFieldsSuggest] = useState('')


  useEffect( () => {
     const unsubscribe =  firestore.collection('users').onSnapshot((snapshot) => {
      const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setUsers(userData)
    })

    return () => unsubscribe
  }, [])
  useEffect( () => {
    const userId = auth.currentUser.uid;
    const unsubscribe = firestore.collection('users').doc(userId).onSnapshot((doc) => {
      const userData = doc.data()
      if (userData) {
        setFieldsSuggest(userData.fields)
      }
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const hh = database.ref('ListRecuits').once('value')
      .then((snapshot) => {
        const recruits = snapshot.val();
        if (recruits) {
          const allJobData = [];
          Object.keys(recruits).forEach((userId) => {
            const jobIds = Object.keys(recruits[userId]);
            jobIds.forEach((jobId) => {
              const jobData = recruits[userId][jobId];
              jobData.userId = userId
              jobData.jobId = jobId
              allJobData.push(jobData);
            });
          });
          setListRecruitments(allJobData);
        }
      })
      .catch((error) => {
        console.log('Đã xảy ra lỗi: ', error);
      });
    return () => hh;
  }, []);

  useEffect(() => {
    const filteredUsersKoc = users.filter((user) =>(user.role === 'KOC'&&user.block!==true));
    setUserKoc(filteredUsersKoc);
  }, [users]);
  useEffect(  () => {
    const filteredRecruit = listRecruitments.filter((recruit) => recruit.statusRe === 'đã duyệt');
    setDisplayListRe(filteredRecruit);
  }, [listRecruitments]);


  useEffect( () => {
    const listsuggsss =  displayListRe.filter((recruit) => recruit.fieldsRe === fieldsSuggest);
    setSuggestList(listsuggsss);
  },[displayListRe] )



  const renderKOC = ({ item }) => {
    return (

      <View style={{flexDirection: 'column', alignItems: 'center', borderRadius: 5,backgroundColor:'#fff', marginHorizontal: 14, marginVertical: 5,shadowColor:'#000',elevation:5 }}>
        <TouchableOpacity

          onPress={() => { navigation.navigate('ProfileWallDetail', { profileId: item.id }) }}>
          <View style={{alignItems: 'center'
          }}>
            <Image
              source={{ uri: item.avatar ? item.avatar : noAvatar }}
              style={{ width: 100, height: 100,  borderColor: '#000' ,borderTopLeftRadius:5,borderTopRightRadius:5}}
            ></Image>
          </View>
          <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' ,width:100}}>
            <View style={{flexDirection:'column'}}>
              {item.legit==='duyệt'?(<View style={{ flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:4}}>
                  <Text style={{ fontSize: 13, textAlign: 'center',marginLeft:10, fontWeight: 'bold', color: '#CC3333',alignItems:'center' }} numberOfLines={1}>{item.name}
                  </Text>
                  <MaterialIcons name='verified' size={15} color='#15a7ff' style={{marginLeft:0}}></MaterialIcons>

              </View>):( 
              <View style={{}}><Text style={{ fontSize: 13, fontWeight: 'bold', color: '#CC3333' }} numberOfLines={1}>{item.name}</Text>
              
              </View>)}
           <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:12,color:'#7f7f7f'}} numberOfLines={1}>{item.fields?item.fields:''}</Text>
          </View>
          </View>
          </View>
        </TouchableOpacity>
      </View>
    )

  };
  const renderRecruitsments = ({ item }) => {

    return (
      <View style={{ borderRadius: 5, marginHorizontal: 5, marginVertical: 5, width: windowWidth / 2.5, }} >
        <TouchableOpacity onPress={() => { navigation.navigate('DetailsRecruitments', { detailRecruitId: item.jobId, profileRecruitId: item.userId }) }} style={{ flexDirection: 'column' }}>
          <View>
            <Image source={{ uri: item.imageProduct ? item.imageProduct : noAvatar }} style={{ height: 130, width: '89%', margin: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ececec' }}></Image>
          </View>
          <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#CC3333' }} numberOfLines={2} >{item.nameRe}</Text>
            <Text style={{ fontSize: 12, color: '#696969' }}>{item.socialsRe}</Text>
            <Text style={{ fontSize: 12, color: '#696969' }}>Mở đến {item.deadlineTimeRe}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )

  }
  const number = Math.ceil(usersKoc.length / 2)
  const number2 = Math.ceil(displayListRe.length)

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/image/redimage.jpg')} resizeMode='cover'>

        <View style={{ height: 100, alignItems: 'center' }}>

          <View style={{ marginTop: 50, flexDirection: 'row', width: '95%', alignItems: 'center' }}>
            <TextInput
              style={{
                padding: 8,
                width: '83%',
                height: 40,
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: '#CC3333',
                borderRadius: 5,
                backgroundColor: '#fff',
              }}

              placeholder='search'
              onFocus={handleInputFocus}
            >
              <FontAwesome name='search' size={22} color='#000'></FontAwesome>
              <Text style={{ color: '#ccc' }}> Tìm kiếm tuyển dụng</Text>
            </TextInput>
            <MaterialIcons name='notifications' size={30} color='#fff' style={{ marginLeft: 25 }}>
            </MaterialIcons>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={{
        flex: 1,
      }}>
        <View >
          <Swiper height={windowWidth/2} autoplay>
            <View style={{ flex: 1, width: windowWidth }}>
              <Image source={require('../../assets/image/influxreview.jpg')} resizeMode='cover' style={{ width: '100%', height: 200 }}></Image>
            </View>
            <View style={{ flex: 1, width: windowWidth }}>
              <Image source={require('../../assets/image/shoppee1.jpg')} resizeMode='cover' style={{ width: '100%', height: 200 }}></Image>
            </View>
            <View style={{ flex: 1, width: windowWidth }}>
              <Image source={require('../../assets/image/banner1.png')} resizeMode='cover' style={{ width: '100%', height: 200 }}></Image>
            </View>
            <View style={{ flex: 1, width: windowWidth }}>
              <Image source={require('../../assets/image/banner2.png')} resizeMode='cover' style={{ width: '100%', height: 200 }}></Image>
            </View>
            <View style={{ flex: 1, width: windowWidth }}>
              <Image source={require('../../assets/image/shoppee2.jpg')} resizeMode='cover' style={{ width: '100%', height: 200 }}></Image>
            </View>
            <View style={{ flex: 1, width: windowWidth }}>
              <Image source={require('../../assets/image/shoppee3.jpg')} resizeMode='cover' style={{ width: '100%', height: 200 }}></Image>
            </View>
            <View style={{ flex: 1, width: windowWidth }}>
              <Image source={require('../../assets/image/banner3.png')} resizeMode='cover' style={{ width: '100%', height: 200 }}></Image>
            </View>
            <View style={{ flex: 1, width: windowWidth }}>
              <Image source={require('../../assets/image/shoppe4.jpg')} resizeMode='cover' style={{ width: '100%', height: 200 }}></Image>
            </View>
          </Swiper>
        </View>
        <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
          <View style={{ paddingHorizontal: 12, marginTop: 15, }}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{ fontSize: 15, color: '#CC3333', fontWeight: 'bold' }}>DANH SÁCH KOC </Text>
            <View>
              <TouchableOpacity onPress={() => { navigation.navigate('ListKocScreen') }}>
              <Text style={{ fontSize: 14, color: '#696969' }}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            </View>
            
            <View style={{
              borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, marginHorizontal: 5, marginTop: 10,
            }}
            />
            {users.length > 0 ? (
              <ScrollView
                style={{ marginBottom: 25, marginTop: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
              >
                <FlatList
                  scrollEnabled={false}
                  contentContainerStyle={{ alignSelf: 'flex-start' }}
                  numColumns={number}
                  key={number}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={usersKoc}
                  renderItem={renderKOC}
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>



            ) : (
              <Text >Không có người dùng nào</Text>
            )}
          </View>
        </View>
        <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:10}}>

            <Text style={{ fontSize: 15, color: '#CC3333', fontWeight: 'bold' }}>DANH SÁCH TIN TUYỂN DỤNG</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('ListRecruitmentsScreen') }}>
              <Text style={{ fontSize: 14, color: '#696969' }}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, marginHorizontal: 5, marginTop: 10,
            }}
            />
            {displayListRe.length > 0 ? (
              <ScrollView
                style={{ marginBottom: 2 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
              >
                <FlatList
                  numColumns={number2}
                  key={number2}
                  data={displayListRe}
                  renderItem={renderRecruitsments}
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>
            ) : (
              <Text >Không có tin tuyển dụng nào</Text>
            )}
          </View>
        </View>
        {userRole==='KOC'? <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
          <View style={{ marginTop: 10, marginBottom: 60}}>
            <Text style={{ fontSize: 15, marginLeft: 10, color: '#CC3333', fontWeight: 'bold' }}>ĐỀ XUẤT CHO BẠN </Text>
            <View style={{
              borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, marginHorizontal: 5, marginTop: 10,
            }}
            />
             {suggestList.length > 0 ? (
              <ScrollView
                style={{ marginBottom: 2 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
              >
                <FlatList
                  numColumns={number2}
                  key={number2}
                  data={suggestList}
                  renderItem={renderRecruitsments}
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>
            ) : (
              <Text >Không có tin tuyển dụng nào</Text>
            )}
            

          </View>
        </View>:<View style={{ marginBottom:40 }}></View>}
       
      </ScrollView>


    </SafeAreaView>
  )
}

export default HomePageRecruit

const styles = StyleSheet.create({})
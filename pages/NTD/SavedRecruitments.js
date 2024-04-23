import { View , Text,TouchableOpacity,FlatList,Image,SafeAreaView,ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import {FontAwesome} from 'react-native-vector-icons'



const SavedRecruitments = ({ navigation }) => {
  const [listRecruitmentsTrue, setListRecruitmentsTrue] = useState([]);
  const [listRecruitments,setListRecruitments]= useState([])
  const [displayListSavedRe,setDisplayListSavedRe] = useState([])

  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'


  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const ref = database.ref(`User/${userId}/savedRecruit/`);
      
      const handleDataChange = (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const updatedList = Object.keys(data)
            .filter(recruitmentId => data[recruitmentId].status === true);
          setListRecruitmentsTrue(updatedList);
        } else {
          setListRecruitmentsTrue([]);
        }
      };

      ref.on('value', handleDataChange);

      return () => {
        ref.off('value', handleDataChange);
      };
    }
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
              jobData.userId =userId
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
  useEffect(()=>{
    const filteredRecruitments = listRecruitments.filter((jobData) => listRecruitmentsTrue.includes(jobData.jobId)); 
    setDisplayListSavedRe(filteredRecruitments)
 },[listRecruitments,listRecruitmentsTrue])
  const renderSavedRecruitsments =({item})=>{
    return (
        <View style={{backgroundColor:'#fff', borderRadius:5, margin:10,width:340, shadowColor: '#52006A', elevation: 6,  }} >
        <TouchableOpacity onPress={()=>{navigation.navigate('DetailsRecruitments',{detailRecruitId:item.jobId,profileRecruitId:item.userId})}} style={{flexDirection:'row'}}>
          <View>
        <Image source={{uri:item.imageProduct?item.imageProduct:noAvatar}} style={{height:90,width:90,margin:10}}></Image>
        </View>
        <View style={{flexDirection:'column',margin:10, width:200}}>
          <Text style={{fontSize:17, fontWeight:'600',color:'#CC3333'}}>{item.nameRe}</Text>
          <Text>{item.socialsRe}</Text>
          <Text>{item.deadlineTimeRe}</Text> 
        </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1 }}>
    <View style={{backgroundColor:'#CC3333', height:93, alignItems:'center'}}>

          <View style={{marginTop:55,flexDirection:'row',width:'95%', alignItems:'center', justifyContent:'space-between'}}>
            
          <TouchableOpacity style={{marginLeft:10}} onPress={()=>{navigation.goBack()}}>
                      <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
                  </TouchableOpacity>
                <Text style={{color:'#fff',fontSize:20, fontWeight:700}}>Việc làm đã lưu</Text>
                <Text >    </Text>
          </View>
          </View>  
          <View style={{backgroundColor:'#fff',flex:1}}>
            <View style={{marginTop:20}}>
        <Text style={{fontSize:18}}>DANH SÁCH TIN TUYỂN DỤNG ĐÃ LƯU</Text>
        </View>
      {displayListSavedRe.length > 0 ? (
        <ScrollView 
        style={{marginBottom:50}}
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
      >
        <FlatList
          data={displayListSavedRe}
          renderItem={renderSavedRecruitsments}
          key={(item)=>item.id}
        />
         </ScrollView>
      
     

      ) : (
        <Text >Không có tin tuyển dụng nào</Text>
        
      )}
      </View>      
    </SafeAreaView>
  );
};

export default SavedRecruitments;

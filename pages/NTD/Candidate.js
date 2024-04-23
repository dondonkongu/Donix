import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from 'react-native-vector-icons'
import { auth, database, firestore } from '../../firebase';

const Candidate = ({ navigation }) => {
  const [listCandidate, setListCandidate] = useState([]);
  const [recruitNames, setRecruitNames] = useState({});
  const [candidateInfo, setCandidateInfo] = useState({})
  const [count,setCount] =useState(0)
  const [countApprove,setCountApprove]=useState({
    countApprove:''
  })
  const nobanner = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-product-image1.png?alt=media&token=5775a422-1fbb-4913-8df7-4260fad2feef'
  
  useEffect(() => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;

        database.ref(`Candidate/${userId}`).once('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const allData = [];
            Object.keys(data).forEach((idRecruit) => {
              const idKocs = Object.keys(data[idRecruit]);
              idKocs.forEach((idKoc) => {
                const data1 = data[idRecruit][idKoc];
                data1.idRecruit = idRecruit;
                data1.idKoc = idKoc;
                allData.push(data1);
              });
            });
            setListCandidate(allData);
            setCount(allData.length) 

          }
        });

        database.ref(`ListRecuits/${userId}`).once('value', (snapshot) => {
          const data2 = snapshot.val();
          if (data2) {
            setRecruitNames(data2);
          }
        });
        
        firestore.collection('users').get()
          .then((snapshot) => {
            const data4 = {}
            snapshot.forEach((doc) => {
              data4[doc.id] = doc.data()
            })
            setCandidateInfo(data4)
          })
      }
    } catch (error) {
      console.log('loi truy van thong tin candidate', error);
    }
  }, []);
  const handleApprove = (idRecruit, idKoc) => {
    try {
      const user = auth.currentUser
      if (user) {
        const userId = user.uid
        database.ref(`Candidate/${userId}/${idRecruit}/${idKoc}`).update({
          status: 'đã duyệt'
        })
        database.ref(`User/${idKoc}/apllyRecruit/${idRecruit}`).update({
          status: 'đã duyệt'
        })
        database.ref(`ListRecuits/${userId}/${idRecruit}`).once('value', (snapshot) => {
          const data = snapshot.val()
          if (data) {
            const countpprove = data.countApprove
            database.ref(`ListRecuits/${userId}/${idRecruit}`).update({
              countApprove: countpprove + 1
            })
          }
        })
        setListCandidate((prevList) =>
          prevList.map((item) =>
            item.idRecruit === idRecruit && item.idKoc === idKoc
              ? { ...item, status: 'đã duyệt' }
              : item
          )
        )

      }

    } catch (error) {
      console.log('loi khi duyet', error)
    }
    console.log(`Duyệt ứng viên - idRecruit: ${idRecruit}, idKoc: ${idKoc}`);
  };

  const handleReject = (idRecruit, idKoc) => {
    try {
      const user = auth.currentUser
      if (user) {
        const userId = user.uid
        database.ref(`Candidate/${userId}/${idRecruit}/${idKoc}`).update({
          status: 'từ chối'
        })
        database.ref(`User/${idKoc}/apllyRecruit/${idRecruit}`).update({
          status: 'từ chối'
        })
        setListCandidate((prevList) =>
          prevList.map((item) =>
            item.idRecruit === idRecruit && item.idKoc === idKoc
              ? { ...item, status: 'từ chối' }
              : item
          )
        )
      }

    } catch (error) {
      console.log('loi khi duyet', error)
    }
    console.log(`Từ chối ứng viên - idRecruit: ${idRecruit}, idKoc: ${idKoc}`);
  };

  const renderItemRecruit = ({ item }) => {
    const recruitInfo = recruitNames[item.idRecruit];
    const imageProduct = recruitInfo ? recruitInfo.imageProduct : nobanner
    const recruitName = recruitInfo ? recruitInfo.nameRe : 'N/A';
    const candidateName = candidateInfo[item.idKoc]


    return (
      <View style={{
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 16,
        backgroundColor: '#fff'
      }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: imageProduct?imageProduct:nobanner }} style={{
            height: 80,
            width: 80,
          }}></Image>
          <View style={{ width: '79%', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{recruitName}</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('ProfileWallDetail', { profileId: item.idKoc }) }}>
              <Text>Tên ứng viên: <Text style={{ color: '#000', fontSize: 15, fontWeight: '600' }}>{candidateName ? candidateName.name : 'N/A'}</Text></Text>
            </TouchableOpacity>
            <Text>Trạng thái:<Text style={item.status === 'đang chờ' ? { color: '#ff6400' } : item.status === 'đã duyệt' ? { color: '#43c501' } : { color: '#3e577d' }}> {item.status}</Text></Text>
          </View>
        </View>
        <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1,flex: 1, marginTop:15,
        }}
      />
        {item.status === 'đang chờ' ? (
       
          <View style={{  flexDirection: 'row',marginTop: 13,alignItems:'center',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={() => handleApprove(item.idRecruit, item.idKoc)}>
              <Text style={styles.button}>Duyệt</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReject(item.idRecruit, item.idKoc)}>
              <Text style={styles.button1}>Từ chối</Text>
            </TouchableOpacity>
          </View>
        ):item.status==='đã nộp'?(<View style={{marginTop:13,alignItems:'flex-end',justifyContent:'flex-end'}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('ReportCampaign',{idRecruit:item.idRecruit,idKoc:item.idKoc,recruitName:recruitName,KocName:candidateName.name,reportText:item.textReport,linkvideo:item.linkVideo})}}>
            <Text style={{textDecorationLine:'underline',color:'red'}}>Xem báo cáo</Text>
          </TouchableOpacity>
        </View>):null}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'#fffd9b'}}>
      <View style={{ backgroundColor: '#CC3333', height: 93, alignItems: 'center' }}>
        <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Ứng viên đã ứng tuyển</Text>
          <Text >    </Text>
        </View>
      </View>

      <View style={{
        flex:1,
        marginTop: 8,
        width:'90%',
        marginLeft:20,
      }}>
        <Text style={styles.header}>Số lượt đã ứng tuyển <Text style={{color:'#0e5aef'}}>{count}</Text></Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listCandidate}
          renderItem={renderItemRecruit}
          keyExtractor={(item) => `${item.idRecruit}-${item.idKoc}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default Candidate;

const styles = StyleSheet.create({
  
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  button: {
    width:100,
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: 4,
    textAlign: 'center',
    fontWeight:'bold'
  },
  button1: {
    padding: 8,
    width:100,
    marginHorizontal: 8,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 4,
    textAlign: 'center',
    fontWeight:'bold'

  },
});

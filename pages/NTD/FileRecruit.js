import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import { FontAwesome, } from '@expo/vector-icons'
import React from 'react'
import { useState, useEffect } from 'react'
import { auth, database } from '../../firebase'

const FileRecruit = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'
    const [dataRecruits, setDataRecruits] = useState([])
    useEffect(() => {
        const user = auth.currentUser
        if (user) {
            const userId = user.uid
            database.ref(`ListRecuits/${userId}`).once('value')
                .then((snapshot) => {
                    const recruits = snapshot.val()
                    const recruitments = []
                    Object.keys(recruits).map((key) => {
                        const recruit = recruits[key]
                        recruit.id = key
                        recruit.userId = userId
                        recruitments.push(recruit)
                    })
                    setDataRecruits(recruitments)
                    console.log(recruitments)
                })
                .catch((error) => {
                    console.log('Đã xảy ra lỗi o day: ', error)
                });
        }
    }, []);

    const renderRecruit = (item) => {
        return (
            <View style={{ backgroundColor: '#fff', borderRadius: 5, margin: 10, maxWidth: windowWidth, shadowColor: '#000', elevation: 5, }} >
                <TouchableOpacity onPress={() => { navigation.navigate('DetailsRecruitments', { detailRecruitId: item.id, profileRecruitId: item.userId }) }} style={{ flexDirection: 'row',width:windowWidth }}>
                    <View>
                        <Image source={{ uri: item.imageProduct ? item.imageProduct : noAvatar }} style={{ height: 100, width: 100, marginRight: 8, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}></Image>
                    </View>
                    <View style={{ flexDirection: 'column',width:130,margin:5 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#CC3333' }} numberOfLines={2}>{item.nameRe}</Text>
                        <Text style={{ color: '#6e7a73' }}>Nền tảng:<Text style={{ color: '#00719c' }}>{item.socialsRe}</Text></Text>
                        <Text style={{ color: '#6e7a73' }}>Mở đến:<Text style={{ color: '#00719c' }}> {item.deadlineTimeRe}</Text></Text>
                        <Text>{item.statusRe}</Text>
                    </View>
                    {item.statusRe==='đã duyệt'&&(<View style={{ flexDirection: 'column',marginTop:10}}>
                        <Text style={{fontSize:13,color:'#050505'}}>Đã ứng tuyển:<Text style={{ color:'green',fontWeight:'bold' }}>{item.countApply}</Text>/{item.countRe}</Text>
                        <Text style={{fontSize:13,color:'#050505'}}>Đã duyệt: {item.countApprove}</Text>
                        <Text style={{fontSize:13,color:'#050505'}}>Đã nộp báo cáo: {item.countReport}</Text>
                        <Text style={{fontSize:13,color:'#050505'}}>Đã done: {item.countDone}</Text>
                    </View>)}
                    
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#CC3333', height: 80, alignItems: 'center' }}>
                <View style={{ marginTop: 45, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
                        <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Hồ sơ tuyển dụng</Text>
                    <Text >    </Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={dataRecruits}
                    renderItem={({ item }) => renderRecruit(item)}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default FileRecruit

const styles = StyleSheet.create({})
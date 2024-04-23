import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, FlatList, Pressable } from 'react-native'
import { Text } from 'react-native-elements'
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import React, { useEffect, useState } from 'react'
import { auth, database, firestore } from '../../firebase'

const LikeKocs = ({ navigation }) => {
    const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'
    const [dataKocSaved, setDataKocSaved] = useState([])
    const [listDataKoc, setListDataKoc] = useState([])
    const [dataKoc, setDataKoc] = useState([])
    useEffect(() => {
        firestore.collection('users').onSnapshot((snapshot) => {
            const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setListDataKoc(userData)
        })
    }, [])
    useEffect(() => {
        database.ref(`ListSavedKocs/${auth.currentUser.uid}`).once('value', (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const dataKoc = []
                Object.keys(data).forEach((item) => {
                    if (data[item].status === true) {
                        dataKoc.push(item)
                    }
                })
                setDataKocSaved(dataKoc)
            }
        })
    }, [dataKocSaved])
    useEffect(() => {
        const filteredKoc = listDataKoc.filter((item) => dataKocSaved.includes(item.id))
        setDataKoc(filteredKoc)
    }, [dataKocSaved])
    const renderKoc = (item) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end',paddingTop:5 }}>
                        <View>
                            <Image source={{ uri: item.avatar?item.avatar:noAvatar }} style={{ width: 60, height: 60,borderRadius:30,borderWidth:1,borderColor:'#ccc' }}></Image>
                        </View>
                        <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                            {item.legit==='duyệt'?(<MaterialIcons name='verified' size={15} color='#15a7ff' style={{marginLeft:0}}></MaterialIcons>):null}
                            </View>
                            <Text>{item.address}</Text>
                        </View>
                    </View>
                    <View >
                        <Pressable onPress={() => { navigation.navigate('ProfileWallDetail', { profileId: item.id }) }}>
                            <View style={{ backgroundColor: '#fff', width: 100, alignItems: 'flex-end' }} >
                                <MaterialIcons name='keyboard-arrow-right' size={30} color='#000'></MaterialIcons>
                            </View>
                        </Pressable>
                    </View>

                </View>
                <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '100%', alignSelf: 'center', marginTop: 5 }}></View>


            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#fff', height: 93, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }}>
                <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
                        <FontAwesome name='chevron-left' size={22} color='#000'></FontAwesome>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 50 }}>
                        <Text style={{ color: '#CC3333', fontSize: 20, fontWeight: 'bold', }}>Danh sách Koc đã lưu</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginHorizontal: 20,  }}>
                {dataKoc.length > 0 ? (<FlatList
                    data={dataKoc}
                    renderItem={({ item }) => renderKoc(item)}
                    keyExtractor={(item) => item.id}>
                </FlatList>) : (
                    <View style={{alignItems:'center'}}>
                        <Image source={require('../../assets/image/nullList.png')}
                            style={{ width: 400, height: 400 }}
                        ></Image>
                    </View>
                )}

            </View>
        </SafeAreaView>
    )
}

export default LikeKocs

const styles = StyleSheet.create({})
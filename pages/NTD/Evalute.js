import { StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput,Alert } from 'react-native'
import { Text } from 'react-native-elements'
import { FontAwesome, AntDesign } from "@expo/vector-icons"
import { useState } from 'react'
import React from 'react'
import { database,auth} from '../../firebase'

const Evalute = ({ route, navigation }) => {
    const { idRecruit, idKoc, nameRecruit, nameKoc } = route.params
    const [[star1, star2, star3, star4, star5], setStar] = useState([false, false, false, false, false])
    const [danhgia, setDanhgia] = useState('')
    const handleStar1 = () => {
        setStar([true, false, false, false, false])
    }
    const handleStar2 = () => {
        setStar([true, true, false, false, false])
    }
    const handleStar3 = () => {
        setStar([true, true, true, false, false])
    }
    const handleStar4 = () => {
        setStar([true, true, true, true, false])
    }
    const handleStar5 = () => {
        setStar([true, true, true, true, true])
    }
    const handleDone = async() => {
        if (star1 || star2 || star3 || star4 || star5) {
            if (danhgia.trim() === '') {
                alert('Bạn chưa nhập đánh giá')
            } else {
                database.ref(`User/${idKoc}/apllyRecruit/${idRecruit}`).update({
                    status:'đã đánh giá'
                  })                
                  database.ref(`User/${idKoc}/evalute/${idRecruit}`).update({
                    star1: star1,
                    star2: star2,
                    star3: star3,
                    star4: star4,
                    star5: star5,
                    danhgia: danhgia,
                    
                    nameRecruit:nameRecruit,
                    idbrand:auth.currentUser.uid})
                await database.ref(`Candidate/${auth.currentUser.uid}/${idRecruit}/${idKoc}`).update({
                    status:'đã đánh giá'
                })
                await database.ref(`ListRecuits/${auth.currentUser.uid}/${idRecruit}`).once('value', (snapshot) => {
                    const data = snapshot.val()
                    if (data) {
                      const countdone = data.countDone
                      database.ref(`ListRecuits/${auth.currentUser.uid}/${idRecruit}`).update({
                        countDone: countdone + 1
                      })
                    }
                  })
                Alert.alert('Thông báo','Đánh giá thành công')
                navigation.navigate('Candidate')
               
            }
        } else {
            Alert.alert('Thông báo','Đánh giá không thành công')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#fff', height: 93, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CC3333' }}>
                <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
                        <FontAwesome name='chevron-left' size={22} color='#CC3333'></FontAwesome>
                    </TouchableOpacity>
                    <Text style={{ color: '#050505', fontSize: 20, fontWeight: 700 }}>Viết đánh giá</Text>
                    <Text >    </Text>
                </View>
            </View>
            <View style={{ margin: 20 }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16 }}>Tên KOC: <Text style={{ fontWeight: 'bold' }}>{nameKoc}</Text></Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16 }}>Tên chiến dịch: <Text style={{ fontWeight: 'bold' }}>{nameRecruit}</Text></Text>
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={handleStar1}>
                        <AntDesign name={star1 ? 'star' : 'staro'} size={24} color="#FFD700" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleStar2}>
                        <AntDesign name={star2 ? 'star' : 'staro'} size={24} color="#FFD700" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleStar3}>
                        <AntDesign name={star3 ? 'star' : 'staro'} size={24} color="#FFD700" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleStar4}>
                        <AntDesign name={star4 ? 'star' : 'staro'} size={24} color="#FFD700" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleStar5}>
                        <AntDesign name={star5 ? 'star' : 'staro'} size={24} color="#FFD700" />
                    </TouchableOpacity>

                </View>
            </View>
            <View>
                <Text style={{ margin: 20, fontSize: 16 }}>Đánh giá của bạn</Text>
                <View style={{
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    borderColor: '#ccc',
                    borderWidth: 1,
                    marginVertical: 10,
                    paddingHorizontal: 5
                }}>
                    <TextInput
                        placeholder='nhập đánh giá của bạn'
                        multiline={true}
                        style={{ padding: 5, marginTop: 1, fontSize: 17 }}
                        onChangeText={(text) => { setDanhgia(text) }}
                    >
                    </TextInput>
                </View>
            </View>
            <View>
                <TouchableOpacity style={{ backgroundColor: '#CC3333', width: '40%', padding: 15, borderRadius: 10, alignItems: 'center' }}
                    onPress={handleDone}
                >
                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>Done</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Evalute

const styles = StyleSheet.create({})
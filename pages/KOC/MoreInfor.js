import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import React from 'react'
import { Text } from 'react-native-elements'
const MoreInfor = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#fff', height: 93, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }}>
                <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
                        <FontAwesome name='chevron-left' size={22} color='#000'></FontAwesome>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ color: '#000', fontSize: 19, fontWeight: 600, }}>Thông tin bổ sung</Text>
                    </View>
                </View>
            </View>
            <View >
                <TouchableOpacity style={{ width: '90%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}
                    onPress={() => { navigation.navigate('BankCard') }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name='credit-card' size={24} color='#000'></MaterialIcons>
                        <Text style={{ padding: 15, fontSize: 17 }}>Thông tin thanh toán</Text>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={24} color='#000'></MaterialIcons>
                </TouchableOpacity>
                <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, width: '90%', alignSelf: 'center' }}></View>
                <TouchableOpacity style={{ width: '90%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}
                    onPress={() => { navigation.navigate('AddressReview') }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='home-edit-outline' size={26} color='#000'></MaterialCommunityIcons>
                        <Text style={{ padding: 15, fontSize: 17 }}>Địa chỉ nhận hàng review</Text>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={24} color='#000'></MaterialIcons>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default MoreInfor

const styles = StyleSheet.create({})
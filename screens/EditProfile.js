import { SafeAreaView, Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity, View, TextInput, ActivityIndicator,Alert } from 'react-native'
import { Text } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import { MaterialIcons,FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { auth, firestore, storage } from '../firebase';
import Back from '../shared/Back';
import SelectDropdown from 'react-native-select-dropdown';

const EditProfile = ({ navigation }) => {
    const imageDataUri = ''
    const windowWidth = Dimensions.get('window').width;
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(imageDataUri[0])
    const [banner, setBanner] = useState(null)
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [intro, setIntro] = useState('')
    const [facebook, setFacebook] = useState('')
    const [tiktok, setTiktok] = useState('')
    const [instagram, setInstagram] = useState('')
    const [youtube, setYoutube] = useState('')
    const [flFacebook, setFlFacebook] = useState('')
    const [flTiktok, setFlTiktok] = useState('')
    const [flInstagram, setFlInstagram] = useState('')
    const [flYoutube, setFlYoutube] = useState('')
    const [fields, setFields] = useState('')
    const [price, setPrice] = useState('')
    const nobanner = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'
    const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-avatar.png?alt=media&token=f38e4aab-a824-4529-9416-29e90278ff8e&_gl=1*1oalg4q*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NjEzMTU5OS40MS4xLjE2OTYxMzI0OTMuMzkuMC4w'

    const dataFields = [
        { id: 1, name: "Ẩm thực" },
        { id: 2, name: "Làm đẹp" },
        { id: 3, name: "Thời trang" },
        { id: 4, name: "Sức khỏe" },
        { id: 5, name: "Lifestyle" },
        { id: 6, name: "Mẹ và bé" },
        { id: 7, name: "Du lịch" },
        { id: 8, name: "Công nghệ" },
        { id: 9, name: "Giải trí" },
        { id: 10, name: "Thể thao" },
        { id: 11, name: "Giáo dục" },
        { id: 12, name: "Kinh doanh" },
        { id: 13, name: "Tài chính" },
        { id: 14, name: "Nông nghiệp" },
        { id: 15, name: "Sách" },
        { id: 16, name: "Thú cưng" },
        { id: 17, name: "Nghệ thuật" },
        { id: 18, name: "Âm nhạc & nhảy" },
        { id: 19, name: "Xe cộ" },
        { id: 20, name: "Mẫu ảnh/Live" },
        { id: 21, name: "Gia dụng" },
        { id: 22, name: "Nội thất" },
        { id: 23, name: "Đồ chơi" },
        { id: 24, name: "Khác" }
    ]
    const dataProvince = [
        { id: 1, name: 'Hà Nội' },
        { id: 2, name: 'Hồ Chí Minh' },
        { id: 3, name: 'Hải Phòng' },
        { id: 4, name: 'Đà Nẵng' },
        { id: 5, name: 'Cần Thơ' },
        { id: 6, name: 'An Giang' },
        { id: 7, name: 'Bà Rịa - Vũng Tàu' },
        { id: 8, name: 'Bắc Giang' },
        { id: 9, name: 'Bắc Ninh' },
        { id: 10, name: 'Bến Tre' },
        { id: 11, name: 'Bình Dương' },
        { id: 12, name: 'Bình Định' },
        { id: 13, name: 'Bình Phước' },
        { id: 14, name: 'Bình Thuận' },
        { id: 15, name: 'Cà Mau' },
        { id: 16, name: 'Cao Bằng' },
        { id: 17, name: 'Đắk Lắk' },
        { id: 18, name: 'Đắk Nông' },
        { id: 19, name: 'Đà Lạt' },
        { id: 20, name: 'Đồng Nai' },
        { id: 21, name: 'Đồng Tháp' },
        { id: 22, name: 'Gia Lai' },
        { id: 23, name: 'Hậu Giang' },
        { id: 24, name: 'Hòa Bình' },
        { id: 25, name: 'Khánh Hòa' },
        { id: 26, name: 'Kon Tum' },
        { id: 27, name: 'Kiên Giang' },
        { id: 28, name: 'Lai Châu' },
        { id: 29, name: 'Lâm Đồng' },
        { id: 30, name: 'Lạng Sơn' },
        { id: 31, name: 'Lào Cai' },
        { id: 32, name: 'Long An' },
        { id: 33, name: 'Nam Định' },
        { id: 34, name: 'Nghệ An' },
        { id: 35, name: 'Ninh Bình' },
        { id: 36, name: 'Ninh Thuận' },
        { id: 37, name: 'Phan Thiết' },
        { id: 38, name: 'Phú Yên' },
        { id: 39, name: 'Quảng Bình' },
        { id: 40, name: 'Quảng Nam' },
        { id: 41, name: 'Quảng Ngãi' },
        { id: 42, name: 'Quảng Ninh' },
        { id: 43, name: 'Quảng Trị' },
        { id: 44, name: 'Sóc Trăng' },
        { id: 45, name: 'Sơn La' },
        { id: 46, name: 'Tây Ninh' },
        { id: 47, name: 'Thanh Hóa' },
        { id: 48, name: 'Thừa Thiên Huế' },
        { id: 49, name: 'Tiền Giang' },
        { id: 50, name: 'Trà Vinh' },
        { id: 51, name: 'Tuyên Quang' },
        { id: 52, name: 'Vĩnh Phúc' },
        { id: 53, name: 'Vĩnh Long' },
        { id: 54, name: 'Yên Bái' },
          ];
    const dataPrice = [
        { id: 1, name: '300,000đ-500,000đ' },
        { id: 2, name: '500,000đ-1,000,000đ' },
        { id: 3, name: '1,000,000đ-2,000,000đ' },
        { id: 4, name: '2,000,000đ-5,000,000đ' },
        { id: 5, name: '5,000,000đ-10,000,000đ' },
        { id: 6, name: '10,000,000đ-20,000,000đ' },
        { id: 7, name: 'Trên 20,000,000đ' },


    ]      
    
 
    const handlebannerImageSelector = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            setBanner(result.assets[0].uri)
        }
    }



    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                if (selectedImage) {
                    const response = await fetch(selectedImage)
                    const blob = await response.blob()
                    const avatarRef = storage.ref().child(`avatars/${userId}`)
                    await avatarRef.put(blob);
                    const avatarUrl = await avatarRef.getDownloadURL();
                    const responseBanner = await fetch(banner);
                    const blobBanner = await responseBanner.blob();
                    const bannerRef = storage.ref().child(`banners/${userId}`);
                    await bannerRef.put(blobBanner);
                    const bannerUrl = await bannerRef.getDownloadURL();

                    await firestore
                        .collection('users')
                        .doc(userId)
                        .update({
                            avatar: avatarUrl,
                            banner: bannerUrl,
                            name: name,
                            age: age,
                            address: address,
                            height: height,
                            weight: weight,
                            phoneNumber: phoneNumber,
                            intro: intro,
                            facebook: facebook,
                            tiktok: tiktok,
                            instagram: instagram,
                            youtube: youtube,
                            flFacebook: flFacebook,
                            flTiktok: flTiktok,
                            flInstagram: flInstagram,
                            flYoutube: flYoutube,
                            fields: fields,
                            price: price


                        });
                }
                else {
                    await firestore
                        .collection('users')
                        .doc(userId)
                        .update({
                            avatar: avatarUrl,
                            name: name,
                            age: age,
                            address: address,
                            height: height,
                            weight: weight,
                            phoneNumber: phoneNumber,
                            intro: intro,
                            facebook: facebook,
                            tiktok: tiktok,
                            instagram: instagram,
                            youtube: youtube,
                            flFacebook: flFacebook,
                            flTiktok: flTiktok,
                            flInstagram: flInstagram,
                            flYoutube: flYoutube,
                            fields: fields,
                            price: price

                        });
                }
                console.log('Thông tin người dùng đã được cập nhật thành công!');
                Alert.alert('Thông báo','Cập nhật thành công!')
            }
        } catch (error) {
            console.log('Lỗi khi cập nhật thông tin người dùng:', error);
            Alert.alert('Thông báo','Cập nhật không thành công! Vui lòng xem lại')

        }
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userId = user.uid;
                firestore
                    .collection('users')
                    .doc(userId)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            const userData = doc.data();
                            setName(userData.name)
                            setAge(userData.age)
                            setBanner(userData.banner)
                            setAddress(userData.address)
                            setHeight(userData.height)
                            setWeight(userData.weight)
                            setPhoneNumber(userData.phoneNumber)
                            setIntro(userData.intro)
                            setFacebook(userData.facebook)
                            setTiktok(userData.tiktok)
                            setSelectedImage(userData.avatar)
                            setInstagram(userData.instagram)
                            setYoutube(userData.youtube)
                            setFlFacebook(userData.flFacebook)
                            setFlTiktok(userData.flTiktok)
                            setFlInstagram(userData.flInstagram)
                            setFlYoutube(userData.flYoutube)
                            setFields(userData.fields)
                            setLoading(false)
                            setPrice(userData.price)

                        }
                    })
                    .catch(error => { console.log(" loi truy van thon tin", error); })

            }
        })
        return () => unsubscribe();
    }, [])

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        })
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <>
                    <SafeAreaView style={{
                    }}>
                        <Back navigation={navigation} />
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{
                                alignItems: 'center',
                                backgroundColor: '#fff',
                            }}>
                                <TouchableOpacity onPress={handlebannerImageSelector}>
                                    <Image
                                        source={{ uri: banner ? banner : nobanner }}
                                        style={{ height: 220, width: windowWidth, borderWidth: 1, borderColor: '#ccc' }}
                                    ></Image>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            zIndex: 999,
                                        }}
                                    >
                                        <MaterialIcons name="photo-camera" size={32} color="#000" style={{ marginRight: 12 }} />
                                    </View>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleImageSelection}
                                    style={{ marginTop: -40 }}>
                                    <Image
                                        source={{ uri: selectedImage?selectedImage:noAvatar }}
                                        style={{
                                            height: 130,
                                            width: 130,
                                            borderRadius: 85,
                                            borderWidth: 2,
                                            borderColor: '#ccc'
                                        }}>

                                    </Image>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 10,
                                            zIndex: 9999
                                        }}
                                    >
                                        <MaterialIcons
                                            name='photo-camera'
                                            size={32}
                                            color='#000'
                                        >
                                        </MaterialIcons>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginTop: 20, width: '90%', }}>
                                    <Text style={{ fontSize: 19, fontWeight: '900', textAlign: 'center', color: '#CC3333' }}>Giới thiệu bản thân</Text>
                                    <View style={{
                                        height: 80,
                                        borderRadius: 5,
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        marginVertical: 10,
                                        paddingHorizontal: 5
                                    }}
                                    >
                                        <TextInput
                                            style={{ fontSize: 15 }}
                                            multiline={true}
                                            placeholder={intro ? intro : 'ghi một vài dòng tiểu sử'}
                                            value={intro}
                                            onChangeText={(text) => { setIntro(text) }}

                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
                                <View style={{ marginHorizontal: 18 }}>

                                    <View>
                                        <Text style={{ fontSize: 19, fontWeight: '900', textAlign: 'center', color: '#CC3333' }}>Thông tin chi tiết</Text>
                                        <View style={{}}>
                                            <View style={{
                                                flexDirection: 'column',
                                                marginBottom: 6,
                                                marginLeft: 20,
                                                width: '90%'
                                            }}>
                                                <Text style={{ fontSize: 17, fontWeight: '700' }}>Họ và tên</Text>
                                                <TextInput placeholder={name ? name : 'Tên'}
                                                    style={{ borderBottomWidth: 1, borderColor: '#ccc', padding: 2 }}
                                                    value={name}
                                                    onChangeText={(text) => { setName(text) }}>
                                                </TextInput>
                                                <Text style={{ fontSize: 17, fontWeight: '700' }}>Tuổi</Text>
                                                <TextInput placeholder={age ? age : 'Tuổi'}
                                                    style={{ borderBottomWidth: 1, borderColor: '#ccc', padding: 2 }}
                                                    value={age}
                                                    onChangeText={(text) => { setAge(text) }}>
                                                </TextInput>
                                                <Text style={{ fontSize: 17, fontWeight: '700' }}>Chiều cao</Text>
                                                <TextInput placeholder={height ? height : 'cm'}
                                                    style={{ borderBottomWidth: 1, borderColor: '#ccc', padding: 2 }}
                                                    value={height}
                                                    onChangeText={(text) => { setHeight(text) }}>
                                                </TextInput>
                                                <Text style={{ fontSize: 17, fontWeight: '700' }}>Cân nặng</Text>
                                                <TextInput placeholder={weight ? weight : 'Kg'}
                                                    style={{ borderBottomWidth: 1, borderColor: '#ccc', padding: 2 }}
                                                    value={weight}
                                                    onChangeText={(text) => { setWeight(text) }}>
                                                </TextInput>
                                                <Text style={{ fontSize: 17, fontWeight: '700' }}>Điện thoại</Text>
                                                <TextInput placeholder={phoneNumber ? phoneNumber : 'Sdt'}
                                                    style={{ borderBottomWidth: 1, borderColor: '#ccc', padding: 2 }}
                                                    value={phoneNumber}
                                                    onChangeText={(text) => { setPhoneNumber(text) }}>
                                                </TextInput>
                                                <Text style={{ fontSize: 17, fontWeight: '700' }}>Địa chỉ</Text>
                                                <SelectDropdown
                                                    data={dataProvince}
                                                    onSelect={(selectedItem, index) => {
                                                        setAddress(selectedItem.name)                                                    }}
                                                    defaultButtonText={address ? address : 'Tỉnh/Thành phố'}
                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        return selectedItem.name;
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        return item.name;
                                                    }}
                                                    buttonStyle={{  width: '100%',
                                                    height: 40,
                                                    backgroundColor: '#FFF',
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    borderColor: '#444',}}
                                                    buttonTextStyle={{color: '#444', textAlign: 'left', fontSize:15}}
                                                    renderDropdownIcon={isOpened => {
                                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                                    }}
                                                    dropdownIconPosition={'left'}
                                                    dropdownStyle={{backgroundColor: '#EFEFEF'}}
                                                    rowStyle={{backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'}}
                                                    rowTextStyle={{color: '#444', textAlign: 'left'}}
                                                />
                                                <Text style={{ fontSize: 17, fontWeight: '700' }}>Lĩnh vực</Text>
                                                <SelectDropdown
                                                    data={dataFields}
                                                    onSelect={(selectedItem, index) => {
                                                        setFields(selectedItem.name)                                                    }}
                                                    defaultButtonText={fields ? fields : 'Chọn lĩnh vực'}
                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        return selectedItem.name;
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        return item.name;
                                                    }}
                                                    buttonStyle={{  width: '100%',
                                                    height: 40,
                                                    backgroundColor: '#FFF',
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    borderColor: '#444',}}
                                                    buttonTextStyle={{color: '#444', textAlign: 'left', fontSize:15}}
                                                    renderDropdownIcon={isOpened => {
                                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                                    }}
                                                    dropdownIconPosition={'left'}
                                                    dropdownStyle={{backgroundColor: '#EFEFEF'}}
                                                    rowStyle={{backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'}}
                                                    rowTextStyle={{color: '#444', textAlign: 'left'}}
                                                />
                                                <Text style={{ fontSize: 17, fontWeight: '700' }}>Giá Booking</Text>
                                                <SelectDropdown
                                                    data={dataPrice}
                                                    onSelect={(selectedItem, index) => {
                                                        setPrice(selectedItem.name) }}
                                                    defaultButtonText={price ? price : 'chọn Giá Booking'}
                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        return selectedItem.name;
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        return item.name;
                                                    }}
                                                    buttonStyle={{  width: '100%',
                                                    height: 40,
                                                    backgroundColor: '#FFF',
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    borderColor: '#444',}}
                                                    buttonTextStyle={{color: '#444', textAlign: 'left', fontSize:15}}
                                                    renderDropdownIcon={isOpened => {
                                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                                    }}
                                                    dropdownIconPosition={'left'}
                                                    dropdownStyle={{backgroundColor: '#EFEFEF'}}
                                                    rowStyle={{backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'}}
                                                    rowTextStyle={{color: '#444', textAlign: 'left'}}
                                                />

                                            </View>
                                        </View>
                                    </View>
                                </View>


                            </View>
                            <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
                                <View style={{ marginHorizontal: 18 }}>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontSize: 19, fontWeight: 'bold', marginLeft: 100, color: '#CC3333' }}>Nền tảng hoạt động</Text>
                                        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '60%' }}>
                                                <Text style={{ width: '100', fontSize: 16, fontWeight: '700', color: '#3360ff' }}>Facebook</Text>

                                                <TextInput style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ccc', width: '200', height: 40, paddingHorizontal: 10 }}
                                                    placeholder={facebook ? facebook : 'Ex:https://www.example.com'}
                                                    value={facebook}
                                                    onChangeText={(text) => setFacebook(text)}></TextInput>
                                            </View>


                                            <View style={{ width: '30%' }} >
                                                <Text style={{ fontSize: 16, fontWeight: '700' }}>Follow</Text>
                                                <TextInput style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ccc', width: '100%', height: 40, paddingHorizontal: 10 }}
                                                    placeholder={flFacebook ? flFacebook : 'Ex:10000'}
                                                    value={flFacebook?flFacebook:''}
                                                    onChangeText={(text) => {
                                                        let cleanedText = text.replace(/[^0-9]/g, '')
                                                        setFlFacebook(cleanedText)
                                                    }}
                                                    keyboardType='numeric'
                                                ></TextInput>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '60%' }} >
                                                <Text style={{ width: '100', fontSize: 16, fontWeight: '700', color: '#040000' }}>Tiktok</Text>
                                                <TextInput style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ccc', width: '250', height: 40, paddingHorizontal: 10 }}
                                                    placeholder={tiktok ? tiktok : 'Ex:https:xample.com'}
                                                    value={tiktok}
                                                    onChangeText={(text) => setTiktok(text)}></TextInput>
                                            </View>

                                            <View style={{ width: '30%' }} >
                                                <Text style={{ fontSize: 16, fontWeight: '700' }}>Follow</Text>
                                                <TextInput style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ccc', width: '100%', height: 40, paddingHorizontal: 10 }}
                                                    placeholder={flTiktok ? flTiktok : 'Ex:10000'}
                                                    value={flTiktok?flTiktok:''}
                                                    onChangeText={(text) => {
                                                        let cleanedText = text.replace(/[^0-9]/g, '')
                                                        setFlTiktok(cleanedText)
                                                    }}
                                                    keyboardType='numeric'
                                                ></TextInput>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '60%' }} >
                                                <Text style={{ width: '100', fontSize: 16, fontWeight: '700', color: '#e56969' }}>Instagram</Text>
                                                <TextInput style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ccc', width: '250', height: 40, paddingHorizontal: 10 }}
                                                    placeholder={instagram ? instagram : 'Ex:https:xample.com'}
                                                    value={instagram?instagram:''}
                                                    onChangeText={(text) => setInstagram(text)}></TextInput>
                                            </View>

                                            <View style={{ width: '30%' }} >
                                                <Text style={{ fontSize: 16, fontWeight: '700' }}>Follow</Text>
                                                <TextInput style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ccc', width: '100%', height: 40, paddingHorizontal: 10 }}
                                                    placeholder={flInstagram ? flInstagram : 'Ex:10000'}
                                                    value={flInstagram}
                                                    onChangeText={(text) => {
                                                        let cleanedText = text.replace(/[^0-9]/g, '')
                                                        setFlInstagram(cleanedText)
                                                    }}
                                                    keyboardType='numeric'
                                                ></TextInput>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '60%' }} >
                                                <Text style={{ width: '100', fontSize: 16, fontWeight: '700', color: '#ee0f0f' }}>Youtube</Text>
                                                <TextInput style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ccc', width: '250', height: 40, paddingHorizontal: 10 }}
                                                    placeholder={youtube ? youtube : 'Ex:https://www.example.com'}
                                                    value={youtube}
                                                    onChangeText={(text) => setYoutube(text)}></TextInput>
                                            </View>

                                            <View style={{ width: '30%' }} >
                                                <Text style={{ fontSize: 16, fontWeight: '700' }}>Follow</Text>
                                                <TextInput style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ccc', width: '100%', height: 40, paddingHorizontal: 10 }}
                                                    placeholder={flYoutube ? flYoutube : 'Ex:10000'}
                                                    value={flYoutube?flYoutube:''}
                                                    onChangeText={(text) => {
                                                        let cleanedText = text.replace(/[^0-9]/g, '')
                                                        setFlYoutube(cleanedText)
                                                    }}
                                                    keyboardType='numeric'
                                                ></TextInput>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>

                            <View style={{ backgroundColor: '#fff' }} >
                                <TouchableOpacity style={{ width: 200, height: 20, flexDirection: 'row', alignItems: 'stretch', marginLeft: 200, marginTop: 20 }}
                                    onPress={() => { navigation.navigate('ImagesSelect') }}
                                >
                                    <Text style={{ fontSize: 16, color: '#1877F2' }}> Upload hình ảnh </Text>
                                    <MaterialIcons name='arrow-forward' size={20} color='#1877F2'></MaterialIcons>
                                </TouchableOpacity>

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={handleSave} style={{
                                        marginTop: 80,
                                        marginBottom: 50,
                                        backgroundColor: '#CC3333',
                                        width: '60%',
                                        padding: 15,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>

                    </SafeAreaView>
                </>
            )}
        </SafeAreaView>

    )
}

export default EditProfile

const styles = StyleSheet.create({})
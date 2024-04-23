import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, SafeAreaView, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from 'react-native-elements';
import { auth, database, firestore } from '../firebase';

const Message = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState({});
  const [avatars, setAvatars] = useState({});
  const noAvatar = 'https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Ffacebook-profile-picture-no-pic-avatar.jpg?alt=media&token=5210a6c4-9eff-4dd6-be48-c3c9bf6ae425&_gl=1*13boug7*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjEzMjAuNTAuMC4w'

  useEffect(() => {
    let unsubscribeUsers;

    const fetchUsers = async () => {
      try {
        const querySnapshot = await firestore.collection('users').get();
        const usersData = {};
        const usersDataAvatar = {};
        querySnapshot.forEach((doc) => {
          usersDataAvatar[doc.id] = doc.data().avatar;
          usersData[doc.id] = doc.data().name;
        });
        setAvatars(usersDataAvatar);
        setUsers(usersData);
      } catch (error) {
        console.error('loi', error);
      }
    };
  
    const chatRef = database.ref(`Chatss/${auth.currentUser.uid}`);
    const onChatDataReceived = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataChats = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setChats(dataChats);
      }
    };
  
    fetchUsers();
    chatRef.on('value', onChatDataReceived);
  
    const cleanup = () => {
      chatRef.off('value', onChatDataReceived);
      if (typeof unsubscribeUsers === 'function') {
        unsubscribeUsers();
      }
    };
  
    return cleanup;
  
  }, []);
  

  const renderItem = ({ item }) => {
    const messageIds = Object.keys(item).filter(key => key.startsWith('messageId'));
    const lastMessageId = messageIds[messageIds.length - 1];
    const lastMessage = item[lastMessageId];
    const timestamp = lastMessage?.timestamp || 0;
    const senderName = users[lastMessage.sender] || 'Unknown';
    const chatName = users[item.id] || 'Unknown';
    const avatar = avatars[item.id] || noAvatar;

    const formatTime = (timestamp) => {
      const messageDate = new Date(timestamp);
      const currentDate = new Date();

      if (
        messageDate.getDate() === currentDate.getDate() &&
        messageDate.getMonth() === currentDate.getMonth() &&
        messageDate.getFullYear() === currentDate.getFullYear()
      ) {
        return `${messageDate.getHours()}:${messageDate.getMinutes()}`;
      } else {
        return messageDate.toLocaleDateString();
      }
    };

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId: item.id, chatname: chatName })}>
        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
          <View>
            <Image source={{ uri: avatar }} style={{ width: 60, height: 60, borderRadius: 999 }} />
          </View>
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{chatName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {senderName === chatName ? (
                <Text style={{ fontSize: 14, color: '#9a9a9a' }}>{lastMessage?.text} </Text>
              ) : (
                <Text style={{ fontSize: 14, color: '#9a9a9a' }}>Bạn: {lastMessage?.text} </Text>
              )}
              <Text style={{ fontSize: 14, color: '#ccc', marginLeft: 4 }}>{formatTime(timestamp)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#CC3333', height: 80, alignItems: 'center' }}>
        <View style={{ marginTop: 45, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Message</Text>
          <Text >    </Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#fff' }}>
        {chats.length > 0 ? (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        ) : (
          <View >
            <Image source={require('../assets/image/nullList.png')} style={{ height: 400, width: 400 }} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Message;

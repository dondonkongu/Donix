import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, Dimensions, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { database, auth } from '../firebase';
import { FontAwesome } from '@expo/vector-icons';

const Chat = ({ route, navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const { chatId, chatname } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    const chatRef = database.ref(`Chatss/${auth.currentUser.uid}/${chatId}`);

    const onMessageReceived = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const chatMessages = Object.keys(data).map((key) => data[key]);
        setMessages(chatMessages);
        scrollToBottom();
      }
    };

    chatRef.on('value', onMessageReceived);

    return () => {
      chatRef.off('value', onMessageReceived);
    };
  }, [chatId]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const timestamp = new Date().getTime();
    const messageId = `messageId${timestamp}`;

    const messageData = {
      [messageId]: {
        sender: auth.currentUser.uid,
        text: newMessage,
        timestamp: timestamp,
      },
    };

    database.ref(`Chatss/${auth.currentUser.uid}/${chatId}`).update(messageData);
    database.ref(`Chatss/${chatId}/${auth.currentUser.uid}`).update(messageData);

    setNewMessage('');
  };

  const handleDeleteMessage = (timestamp) => {
    Alert.alert(
      'Xác nhận xóa tin nhắn',
      'Bạn có chắc chắn muốn xóa tin nhắn này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            const updatedMessages = messages.filter((message) => message.timestamp !== timestamp);
            setMessages(updatedMessages);

            const messageUpdates = {};
            updatedMessages.forEach((message) => {
              messageUpdates[`messageId${message.timestamp}`] = {
                sender: message.sender,
                text: message.text,
                timestamp: message.timestamp,
              };
            });

            database.ref(`Chatss/${auth.currentUser.uid}/${chatId}`).set(messageUpdates);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleDeleteMessage(item.timestamp)}
      style={{ padding: 10 }}
    >
      {item.sender === auth.currentUser.uid ? (
        <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
          <View style={{ maxWidth: windowWidth / 2, backgroundColor: '#CC3333', borderRadius: 10, padding: 8 }}>
            <Text style={{ color: '#fff', fontSize: 15 }}>{item.text}</Text>
          </View>
        </View>
      ) : (
        <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
          <View style={{ maxWidth: windowWidth / 2, backgroundColor: '#EAEAEA', borderRadius: 10, padding: 8 }}>
            <Text>{item.text}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#fff', height: 80, alignItems: 'center', borderWidth: 0.5, borderBottomColor: '#050505' }}>
        <View style={{ marginTop: 45, flexDirection: 'row', width: '95%', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginLeft: 10, paddingRight: 25 }} onPress={() => navigation.goBack()}>
            <FontAwesome name='arrow-left' size={22} color='#CC3333'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#050505', fontSize: 20, fontWeight: '500' }}>{chatname}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={renderItem}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1.5, marginRight: 10, padding: 8,borderRadius: 10, borderColor: '#CC3333'}}
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          />
          <Button title="Gửi" onPress={handleSend} color='#CC3333'/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

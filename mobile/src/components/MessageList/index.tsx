import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { io } from 'socket.io-client';

// components
import { Message, MessageProps } from '../Message';

// bakcend
import { api } from '../../services/api';

// styles
import { styles } from './styles';

let messageQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (message) => {
  messageQueue.push(message);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function refreshMessages() {
    try {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3');

      if (messagesResponse.data.length) {
        setCurrentMessages(messagesResponse.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  async function onRefesh() {
    setRefreshing(true);
    await refreshMessages();
    setRefreshing(false);
  }

  useEffect(() => {
    async function fetchMessages() {
      await refreshMessages();
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length > 0) {
        setCurrentMessages((prevMessages) => [
          messageQueue[0],
          prevMessages[0],
          prevMessages[1],
        ]);
        messageQueue.shift();
      }

      return () => clearInterval(timer);
    }, 3000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefesh} />
      }
    >
      {currentMessages.map((message) => {
        return message && <Message key={message.id} data={message} />;
      })}
    </ScrollView>
  );
}

import React, { useState } from 'react';
import { Alert, Keyboard, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

// components
import { Button } from '../Button';

// backend
import { api } from '../../services/api';

// styles
import { styles } from './styles';
import { COLORS } from '../../theme';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function handleMessageSubmit() {
    const formattedMessage = message.trim();

    if (formattedMessage.length > 0) {
      setSending(true);

      try {
        await api.post('/messages', { message: formattedMessage });

        setMessage('');
        Keyboard.dismiss();
        setSending(false);
        Alert.alert(
          'Mensagem enviada!',
          'Sua mensagem foi enviada com sucesso.'
        );

        return;
      } catch (error) {
        console.error(error);

        Alert.alert('Erro!', 'Foi mal, mas sua mensagem não pode ser enviada.');
      }
    }

    Alert.alert('Epa, pera lá!', 'Antes de enviar, escreva uma mensagem.');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance='dark'
        placeholder='Qual sua expectativa para o evento?'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        editable={!sending}
        value={message}
        onChangeText={setMessage}
      />

      <Button
        title='ENVIAR MENSAGEM'
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        isLoading={sending}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}

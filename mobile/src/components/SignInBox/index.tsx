import React from 'react';
import { View } from 'react-native';

// components
import { Button } from '../Button';

// hooks
import { useAuth } from '../../hooks/auth';

// styles
import { styles } from './styles';
import { COLORS } from '../../theme';

export function SignInBox() {
  const { signIn, isSigning } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        title='ENTRAR COM O GITHUB'
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon='github'
        onPress={signIn}
        isLoading={isSigning}
      />
    </View>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// components
import LogoSvg from '../../assets/logo.svg';
import { UserPhoto } from '../UserPhoto';

// hooks
import { useAuth } from '../../hooks/auth';

// styles
import { styles } from './styles';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.signOutButton}>
        {user && (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.signOutText}>Sair</Text>
          </TouchableOpacity>
        )}

        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import auth from '@react-native-firebase/auth';

export default function TabAccountScreen() {

  let user = auth().currentUser;

  function logout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Minha Conta</ThemedText>
      </ThemedView>
      
      <ThemedText>E-mail: {user?.email}</ThemedText>      

      <Button onPress={logout} title='LogOut' />
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

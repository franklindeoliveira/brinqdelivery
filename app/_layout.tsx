import { DarkTheme, DefaultTheme, Link, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ThemedView } from '@/components/ThemedView';
import { Button, Text, TextInput } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  let [email, setEmail] = useState<string>("")
  let [pass, setPass] = useState<string>("")
  let [isLogin, setIsLogin] = useState(true);
  let [mensagem, setMensagem] = useState("")
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // // Handle user state changes
  // function onAuthStateChanged(user: any) {
  //   console.log("==> ", "onAuthStateChanged", user)
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // function register() {    
  //   auth()
  //     .createUserWithEmailAndPassword(email, pass)
  //     .then(() => {
  //       console.log('User account created & signed in!');
  //     })
  //     .catch(error => {
  //       let mensagemErro = "Ocorreu um erro no cadastro."
  //       if (error.code === 'auth/email-already-in-use') {
  //         mensagemErro = 'That email address is already in use!'          
  //       }
  //       if (error.code === 'auth/invalid-email') {
  //         mensagemErro = 'That email address is invalid!'
  //       }        
  //       setMensagem(mensagemErro)
  //       console.log(mensagemErro);
  //       console.error(error);
  //     });
  // }

  // function login() {
  //   auth()
  //     .signInWithEmailAndPassword(email, pass)
  //     .then(() => {
  //       console.log('signed in!');
  //     })
  //     .catch(error => {
  //       let mensagemErro = "Ocorreu um erro no login."
  //       if (error.code === 'auth/email-already-in-use') {
  //         mensagemErro = 'That email address is already in use!'          
  //       }
  //       if (error.code === 'auth/invalid-email') {
  //         mensagemErro = 'That email address is invalid!'
  //       }        
  //       setMensagem(mensagemErro)
  //       console.log(mensagemErro);
  //       console.error(error);
  //     });
  // }

  // function logout() {
  //   auth()
  //     .signOut()
  //     .then(() => console.log('User signed out!'));
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // function changeLoginLogout() {
  //   setIsLogin(!isLogin)
  // }

  // if (initializing) return null;

  // if (!user) {
  //   return (
  //     <ThemedView style={{ margin: 10, justifyContent: "center", alignItems: "center", height: "100%" }}>
  //       <Text style={{ color: "red" }}>{mensagem}</Text>
  //       <TextInput value={email} onChangeText={setEmail} style={{ borderColor: "gray", borderStyle: "solid", borderWidth: 1, width: "100%" }} />
  //       <TextInput value={pass} onChangeText={setPass} style={{ borderColor: "gray", borderStyle: "solid", borderWidth: 1, width: "100%" }} />
  //       { isLogin ?
  //         <>
  //         <Button onPress={login} title='Login' />
  //         <Text onPress={changeLoginLogout}>Ainda não tem uma conta? Então cadastre clicando aqui.</Text>
  //         </>:
  //         <>
  //         <Button onPress={register} title='Cadastrar' /> 
  //         <Text onPress={changeLoginLogout}>Já tem uma conta? Então faça login clicando aqui.</Text>
  //         </> }        
  //     </ThemedView>
  //   );
  // }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />        
      </Stack>
    </ThemeProvider>
  );
}

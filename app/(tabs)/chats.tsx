import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';

export default function TabChatsScreen() {

  let idUser = 1

  let [ chats, setChats ] = useState<any[]>([])
  let [ chatSelecionado, setChatSelecionado ] = useState<any[]>([])
  let [ mensagem, setMensagem ] = useState("")
  let [ selectedChatUser, setSelectedChatUser ] = useState("")
  let [ showChat, setShowChat ] = useState(false)  
  let [ mensagemParaEnviar, setMensagemParaEnviar ] = useState("")

  useEffect(() => {
    // database()
    //   .ref('/chats/1/mensagens/1/conteudo')
    //   .on('value', snapshot => {
    //     let mensagemAtualizada = snapshot.val()
    //     console.log(mensagemAtualizada)
    //     setMensagem(mensagemAtualizada)
    //   });
    database()
      .ref("/chats")
      .on('value', snapshot => {
        let chatsBd = snapshot.val()
        
        let chatsFinal: any[] = []
        
        console.log("chatsBd: ")
        console.log(chatsBd)

        chatsBd.forEach((chatBd: any) => {
          if (chatBd == null) return
          if (chatBd.id_user1 == idUser || chatBd.id_user2 == idUser) {
            chatsFinal.push(chatBd)
          }
        });
        console.log("chatsFinal: ")
        console.log(chatsFinal)
        setChats(chatsFinal)

        // let idUser2 = 2
        // let chatsComUser2 = chatsComTodosUsers.filter((chat: any) => chat != null && (chat.id_user1 == idUser2 || chat.id_user2 == idUser2))

        // chatsComUser2.forEach((chat: any) => {
        //   chat.mensagens.forEach((mensagem: any) => {
        //     if (mensagem == null) return
        //     console.log("conteudo: ", mensagem.conteudo)
        //     console.log("id_user:", mensagem.id_user)
        //     console.log("timestamp:", mensagem.timestamp)
        //   })
        // });
      });
    // database()
    //   .ref('/chats')
    //   .on('value', snapshot => {
    //     let chats: any = snapshot.val()
    //     let chatsComTodosUsers = chats.filter((chat: any) => chat != null && (chat.id_user1 == idUser || chat.id_user2 == idUser))

    //     let idUser2 = 2
    //     let chatsComUser2 = chatsComTodosUsers.filter((chat: any) => chat != null && (chat.id_user1 == idUser2 || chat.id_user2 == idUser2))

    //     chatsComUser2.forEach((chat: any) => {
    //       chat.mensagens.forEach((mensagem: any) => {
    //         if (mensagem == null) return
    //         console.log("conteudo: ", mensagem.conteudo)
    //         console.log("id_user:", mensagem.id_user)
    //         console.log("timestamp:", mensagem.timestamp)
    //       })
    //     });
    //   });
  }, [])

  function showChatHandle(event: any) {
    let idUserSelecionado = event._dispatchInstances.memoizedProps.children
    setSelectedChatUser(idUserSelecionado)
    setShowChat(true)
    let chatSelecionadoTemp:any = []
    console.log("chats: 123")
    console.log(chats)
    chats.forEach(chat => {
      if ((chat.id_user1 == idUser && chat.id_user2 == idUserSelecionado) || (chat.id_user2 == idUser && chat.id_user1 == idUserSelecionado)) {
        console.log("chat?.mensagens: ")
        console.log(chat?.mensagens)
        Object.values(chat.mensagens).forEach((mensagem: any) => {
          if (mensagem == null) return
          console.log("conteudo: ", mensagem.conteudo)
          console.log("id_user:", mensagem.id_user)
          console.log("timestamp:", mensagem.timestamp)
          chatSelecionadoTemp.push(mensagem)
        })
      }
    })
    console.log("chatSelecionadoTemp: ")
    console.log(chatSelecionadoTemp)
    setChatSelecionado(chatSelecionadoTemp)
    //  selectedChatUser
  }

  function hideChatHandle() {
    setShowChat(false)
  }

  function enviarMensagem() {
    console.log("enviando mensagem")
    console.log(mensagemParaEnviar)

    const newReference = database().ref('/chats/1/mensagens').push();

    console.log('Auto generated key: ', newReference.key);

    newReference
      .set({
        id_user: idUser,
        conteudo: mensagemParaEnviar,
        timestamp: new Date().getTime()
      })
      .then(() => {
        console.log('Data updated.')
        console.log(chatSelecionado)
      });   

  }

  if (showChat == true) {
    return (
      <>
      <View style={{height: "100%", margin: 10}}>
        <ThemedText style={{marginTop: 50}} onPress={hideChatHandle}>Voltar</ThemedText>
        <ThemedText type="title">Mensagens com {selectedChatUser}</ThemedText>
        { chatSelecionado.map(chat => 
          <>
          <Text style={{ color: chat.id_user == idUser ? "red" : "blue", textAlign: chat.id_user == idUser ? "right" : "left" }}>{chat.conteudo} ({chat.id_user == idUser ? "Você" : chat.id_user})</Text>
          </>
        ) }
      </View>
      <View style={{position: 'absolute', bottom: 0, width: "100%"}}>
        <TextInput value={mensagemParaEnviar} onChangeText={setMensagemParaEnviar} style={{ borderColor: "gray", borderStyle: "solid", borderWidth: 1}} />
        <Button onPress={enviarMensagem} title='Enviar' /> 
      </View>
      </>
    )
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Chat</ThemedText>
      </ThemedView>
      <ThemedText>Entre em contato diretamente com as locadoras.</ThemedText>

      { chats.map(chat => 
        <View key={chat.idUser}>
          <ThemedText onPress={showChatHandle} type='subtitle'>{chat.id_user1 != idUser ? chat.id_user1 : chat.id_user2 }</ThemedText>
          <ThemedText>123</ThemedText>
        </View>
      ) }
      
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

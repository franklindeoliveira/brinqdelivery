import { Image, StyleSheet, TextInput, View, FlatList, Text, Linking, Button } from 'react-native';

import { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Feather } from '@expo/vector-icons';
import { getCurrentPositionAsync, LocationObject, requestForegroundPermissionsAsync, reverseGeocodeAsync } from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import firestore from "@react-native-firebase/firestore"
// import { locadoras } from "@/mock/bd" 

export default function HomeScreen() {
  const [location, setLocation] = useState<LocationObject>()
  
  let [locadoras, setLocadoras] = useState<any[]>([])

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPostion = await getCurrentPositionAsync()
      setLocation(currentPostion)
    }
  }

  useEffect(() => {
    requestLocationPermissions()
    getLocadoras()
  }, [])

  async function getLocadoras() {
    let locadorasModel = []
    let locadorasFs = await firestore().collection('locadoras').get();    
    let locadorasFsDocs = locadorasFs.docs
    for (let index = 0; index < locadorasFsDocs.length; index++) {
      const locadoraFs = locadorasFsDocs[index];
      const brinquedoesFs = await locadoraFs.ref.collection("brinquedoes").get();
      const brinquedoesFsDocs = brinquedoesFs.docs
      let brinquedoesModel = []
      for (let index = 0; index < brinquedoesFsDocs.length; index++) {
        let brinquedaoFs = brinquedoesFsDocs[index];
        brinquedoesModel.push({
          id: brinquedaoFs.id,
          nome: brinquedaoFs.get("nome"),
          imagem: brinquedaoFs.get("imagem")
        })        
      }

      const enderecoFs = (await locadoraFs.ref.collection("enderecos").get()).docs[0];
      locadorasModel.push({
        id: locadoraFs.id,
        nome: locadoraFs.get("nome"),
        imagem: locadoraFs.get("imagem"),
        telefone: locadoraFs.get("telefone"),
        endereco: {
          id: enderecoFs.id,
          logradouro: enderecoFs.get("logradouro"),
          cep: enderecoFs.get("cep"),
          latitude: enderecoFs.get("latitude"),
          longitude: enderecoFs.get("longitude"),
        },
        brinquedoes: brinquedoesModel
      })      
    }

    setLocadoras(locadorasModel)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Alugue Brinquedões</ThemedText>
      </ThemedView>
      <ThemedText type="default">Veja abaixo os brinquedões (em zul) mais próximos de sua região e entre em contato via WhatsApp.</ThemedText>

        {/* <ThemedView style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Feather name="search" size={24}></Feather>
          <TextInput placeholder="Rua X, Jd. X, CEP 99999-999" />
        </ThemedView> */}

      { location &&
      <MapView
        style={{ flex: 1, width: "100%", height: 300 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}>
          
        <Marker 
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }}
          key="eu"
          title='Você está aqui!'
        />
        
        { locadoras.map(locadora =>
        <Marker 
          coordinate={{
            latitude: locadora.endereco.latitude,
            longitude: locadora.endereco.longitude
          }}
          pinColor={'blue'}
          key={locadora.id}
          title={locadora.nome}
          description={locadora.telefone}
        />
        )}        
      </MapView>
      }

      { locadoras.map(locadora =>
        <View style={{ marginTop: 10 }} key={locadora.id}>
          <ThemedText type="subtitle">{locadora.nome}</ThemedText>
          <ThemedText>{locadora.endereco.logradouro} - CEP {locadora.endereco.cep}</ThemedText>
          <View style={{ height: 10 }} />
          <Button title={"Enviar mensagem"} color={'green'} />
          <View style={{ height: 10 }} />
          <FlatList
            data={locadora.brinquedoes}
            horizontal={true}
            renderItem={brinquedao => 
              <View>
                <Image source={require('@/assets/images/logo.png')} style={styles.imgBrinq} />
                <Text>{brinquedao.item.nome}</Text>                    
              </View>
            }
          />
        </View>
      )}
      
    </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  imgBrinq: {
    width: 200,
    height: 200,
    marginRight: 10
  },
  separador: {
    height: 20
  }
});

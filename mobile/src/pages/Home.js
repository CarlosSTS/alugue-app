import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import New from '../components/New';
import House from '../components/House';
import Recommended from '../components/Recommended';

import api from '../service/api';

export default function Home() {
  const navigation = useNavigation();

  const [house, setHouse] = useState([]);

  const [nameHouse, setNameHouse] = useState([]);
  const [name, setName] = useState('');

  async function loadHouses() {
    const response = await api.get('house')
    setHouse(response.data)
  }

  useEffect(() => {
    loadHouses()
  }, []);

  async function searchHouses() {
    try {

      const response = await api.get('/search', {
        params: { name }
      });
      setNameHouse([...nameHouse, ...response.data])
    } catch {
      Alert.alert('Aviso', 'Error')
    }
  }

  function navigationToDetail(house) {
    navigation.navigate('detail', { house })
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#FFF' }}
      >

        <View style={styles.header}>
          <View style={styles.inputArea}>
            <Button title="Procurar" onPress={searchHouses} />

            <Feather name="search" size={24} color="black" />

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="O que está procurando?"
              style={styles.input}
            />
          </View>
        </View>
        {nameHouse.map(nameHouses => (
          <View key={nameHouses._id} style={{ paddingHorizontal: 15, }}>


            <View style={styles.contentNew}>
              <Text style={[styles.title, { color: 'green' }]}>{`${nameHouses.name} está disponivel`}</Text>
            </View>

            <New
              cover={{ uri: nameHouses.image1 }}
              value={nameHouses.value}
              name={nameHouses.name}
              description={house.description}
              onPress={() => navigationToDetail(nameHouses)}
            />

          </View>
        ))}
        <View style={styles.contentNew}>
          <Text style={styles.title}>Novidades</Text>
        </View>

        <FlatList
          style={{ paddingHorizontal: 15, }}
          data={house}
          keyExtractor={house => String(house._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={loadHouses}
          onEndReachedThreshold={0.2}
          renderItem={({ item: house }) => (
            house.young === true ? (
              <New
                cover={{ uri: house.image1 }}
                value={house.value}
                name={house.name}
                description={house.description}
                onPress={() => navigationToDetail(house)}
              />
            ) : (<></>)
          )}
        />

        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
          <Text style={[styles.title, { marginTop: 20 }]}>Próximo de você</Text>
        </View>


        <FlatList
          style={{ paddingHorizontal: 15, }}
          data={house}
          keyExtractor={house => String(house._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={loadHouses}
          onEndReachedThreshold={0.2}
          renderItem={({ item: house }) => (
            <House
              cover={{ uri: house.image1 }}
              value={house.value}
              name={house.name}
              description={house.description}
            />

          )}
        />

        <Text style={[styles.title, { marginTop: 20 }]}>
          Dica do dia
    </Text>

        <FlatList
          style={{ paddingHorizontal: 15, }}
          data={house}
          keyExtractor={house => String(house._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={loadHouses}
          onEndReachedThreshold={0.2}
          renderItem={({ item: house }) => (

            <Recommended
              cover={{ uri: house.image1 }}
              house={house.name}
              offer={house.offer}
            />
          )}
        />

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
  },
  inputArea: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    backgroundColor: '#FFF',
    elevation: 2,
    paddingHorizontal: 10,
    height: 37,
    borderRadius: 10,
  },
  input: {
    fontFamily: 'Montserrat_500Medium',
    paddingHorizontal: 10,
    fontSize: 13,
    width: '90%'
  },
  contentNew: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  title: {
    paddingHorizontal: 15,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#4f4a4a'
  }
});
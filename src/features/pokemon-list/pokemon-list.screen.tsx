/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PokemonCard from './pokemon-card';
import Sort from './sort';

let pokemonNumber = 0;
let isFirstTimeRender = true;
const PokemonList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listPokemon, setListPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [listSearchPokemon, setListSearchPokemon] = useState([]);
  const [pokemonAPIArr, setPokemonAPIArr] = useState([listPokemon]);
  const flatListRef = React.useRef();

  //console.log('Re-render')

  useEffect(() => {
    handleGetListPokemon();
  }, []);
  const handleGetListPokemon = async () => {
    try {
      const {data: responseData} = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${pokemonNumber}&limit=20`,
      );
      const pokemonArray = responseData.results;
      setPokemonAPIArr(pokemonAPIArr.concat(pokemonArray));
      const pokemonIdArr = [
        ...new Set(
          pokemonArray.map(p => p.url).map(str => str.replace(/[^0-9]/g, '')),
        ),
      ].map(str => {
        return {['id']: str.slice(1)};
      });
      const newPokemonArr = pokemonArray.map((obj, index) => {
        return {
          ['name']: obj.name,
          ['url']: obj.url,
          ['id']: pokemonIdArr[index].id,
        };
      });
      setListPokemon([...listPokemon, ...newPokemonArr]);
      setListSearchPokemon(newPokemonArr);
      isFirstTimeRender = false;
      pokemonNumber += 20;
    } catch (e) {
      console.log(e);
    }
  };

  const onLoadPokemonAPI = () => {
    handleGetListPokemon();
  };

  const SearchPokemon = keyword => {
    const searchedPokemon = listSearchPokemon.filter(p => {
      return p.name.includes(keyword.toLowerCase()) || p.id.includes(keyword);
    });

    if (keyword) {
      setListPokemon(searchedPokemon);
    } else {
      setListPokemon(listSearchPokemon);
    }
  };

  const ScrollToTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item}: any) => {
    return <PokemonCard name={item.name} id={item.id} />;
  };

  return (
    <View style={{backgroundColor: '#DC0A2D', width: '100%', height: '100%'}}>
      <View>
        <View
          style={{
            marginTop: 18,
            marginBottom: 14,
            marginHorizontal: 18,
            flexDirection: 'row',
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../../res/images/pokeball.png')}
          />
          <Text
            style={{
              width: 160,
              height: 32,
              paddingLeft: 18,
              lineHeight: 32,
              color: '#FFFFFF',
              fontSize: 30,
              fontWeight: '900',
              // fontFamily: 'DesignerVN-Poppins-Regular',
            }}>
            Pokédex
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image
            source={require('../../../res/images/search.png')}
            style={{
              position: 'absolute',
              top: 8,
              left: 30,
              width: 24,
              height: 24,
              zIndex: 1,
            }}
          />
          <TextInput
            editable={true}
            placeholder="Search"
            value={searchQuery}
            onChangeText={text => {
              setSearchQuery(text);
              SearchPokemon(text);
            }}
            style={{
              backgroundColor: 'white',
              marginHorizontal: 18,
              width: 320,
              height: 36,
              borderRadius: 20,
              paddingLeft: 45,
              paddingTop: 10,
              fontSize: 13,
            }}
          />
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{
                backgroundColor: 'white',
                width: 36,
                height: 36,
                borderRadius: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 20,
                color: '#DC0A2D',
              }}>
              #
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Sort
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSortByName={() => {
          setListPokemon([
            ...listPokemon.sort((a, b) => a.name.localeCompare(b.name)),
          ]);
          ScrollToTop();
        }}
        onSortByNumber={() => {
          setListPokemon([...listPokemon.sort((a, b) => a.id - b.id)]);
          ScrollToTop();
        }}
      />
      <View
        style={{
          backgroundColor: '#FFFFFF',
          // height: 686,
          // width: 404,
          marginTop: 65,
          marginBottom: 3,
          marginHorizontal: 4,
          borderRadius: 16,
          flex: 1,
        }}>
        <FlatList
          ref={flatListRef}
          data={listPokemon}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          numColumns={2}
          contentContainerStyle={{
            paddingLeft: 12,
            paddingVertical: 16,
          }}
          onEndReached={() => {
            if (isFirstTimeRender === false) {
              onLoadPokemonAPI();
            }
          }}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
};

export default PokemonList;

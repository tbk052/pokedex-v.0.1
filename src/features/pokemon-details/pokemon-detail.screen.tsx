/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PokeSprite from './pokemon-sprites';
// var _ = require('lodash');

const PokemonDetail = ({route}) => {
  const id = route.params;
  const [idPokemon, setIdPokemon] = useState(id);
  const [pokemonStatsDetail, setPokemonStatsDetail] = useState({});

  useEffect(() => {
    callPokemonStatsAPI();
  }, [idPokemon]);
  const callPokemonStatsAPI = async () => {
    try {
      const {data} = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`,
      );
      setPokemonStatsDetail(data);
      // console.log('Re-render stats');
    } catch (e) {
      console.log(e);
    }
  };

  const [pokemonSpecies, setPokemonSpecies] = useState({});
  useEffect(() => {
    callPokemonSpecies();
  }, [idPokemon]);
  const callPokemonSpecies = async () => {
    try {
      const {data} = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`,
      );
      setPokemonSpecies(data);
      // console.log('Re-render color');
    } catch (e) {
      console.log(e);
    }
  };

  //
  const increaseId = () => {
    if (idPokemon > 0 && idPokemon < 10277) {
      setIdPokemon(idPokemon + 1);
    }
    if (idPokemon === 1025) {
      setIdPokemon(10001);
    }
  };
  const decreaseId = () => {
    if (idPokemon >= 2) {
      setIdPokemon(idPokemon - 1);
    }
  };
  // pokemon stats

  const pokeTypes = pokemonStatsDetail?.types
    ?.map((p: {type: any}) => p.type)
    ?.map((p: {name: any}) => p.name);

  //
  let pokeBgColor = '#ffffff';
  switch (pokeTypes?.slice(0, 1)?.join('')) {
    case 'normal':
      pokeBgColor = '#AAA67F';
      break;
    case 'fighting':
      pokeBgColor = '#C03028';
      break;
    case 'flying':
      pokeBgColor = '#A890F0';
      break;
    case 'poison':
      pokeBgColor = '#A040A0';
      break;
    case 'ground':
      pokeBgColor = '#E0C068';
      break;
    case 'rock':
      pokeBgColor = '#B8A038';
      break;
    case 'bug':
      pokeBgColor = '#A7B723';
      break;
    case 'ghost':
      pokeBgColor = '#70559B';
      break;
    case 'steel':
      pokeBgColor = '#B7B9D0';
      break;
    case 'fire':
      pokeBgColor = '#F57D31';
      break;
    case 'water':
      pokeBgColor = '#6493EB';
      break;
    case 'grass':
      pokeBgColor = '#74CB48';
      break;
    case 'electric':
      pokeBgColor = '#F9CF30';
      break;
    case 'psychic':
      pokeBgColor = '#FB5584';
      break;
    case 'ice':
      pokeBgColor = '#98D8D8';
      break;
    case 'dragon':
      pokeBgColor = '#7038F8';
      break;
    case 'dark':
      pokeBgColor = '#705848';
      break;
    case 'fairy':
      pokeBgColor = '#EE99AC';
      break;
    case 'unknown':
      pokeBgColor = '#68A090';
      break;
    case 'shadow':
      pokeBgColor = '#5A4968';
      break;
  }
  const pokeMoves = pokemonStatsDetail?.moves
    ?.map((p: {move: any}) => p.move)
    ?.map((p: {name: any}) => p.name)
    ?.sort(() => 0.5 - Math.random())
    ?.slice(0, 2);
  // const pokeRenderMoves = _.chunk(
  //   pokemonStatsDetail?.moves
  //     ?.map((p: {move: any}) => p.move)
  //     ?.map((p: {name: any}) => p.name),
  //   2,
  // );
  // let index = 0;
  // const RenderMoves = () => {
  //   console.log(index);
  //   console.log(pokeRenderMoves[index]);
  //   index += 1;
  //   console.log(index);
  // };

  // setInterval(() => {
  //   RenderMoves();
  // }, 5000);
  const pokeDescrip = [
    ...new Set(
      pokemonSpecies?.flavor_text_entries?.map(
        (p: {flavor_text: any}) => p.flavor_text,
      ),
    ),
  ]
    ?.slice(0, 2)
    ?.join(' ')
    ?.replace(/\s+/g, ' ');

  const pokeBaseStatsName = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'];
  const pokeBaseStats = pokeBaseStatsName?.map((name, index) => ({
    name,
    value: pokemonStatsDetail?.stats?.map(
      (p: {base_stat: any}) => p?.base_stat,
    )[index],
  }));

  //
  const navigation = useNavigation<any>();
  return (
    <View style={{backgroundColor: pokeBgColor, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{width: 50, flex: 1}}>
          <Image
            source={require('../../../res/images/arrow_back.png')}
            style={{marginLeft: 12, width: 35, height: 35}}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 5,
            paddingLeft: 6,
            fontSize: 27,
            fontWeight: '800',
            color: '#FFFFFF',
            textTransform: 'capitalize',
          }}>
          {pokemonStatsDetail.name}
        </Text>
        <Text
          style={{
            flex: 2,
            textAlign: 'center',
            paddingTop: 10,
            fontSize: 15,
            fontWeight: '800',
            color: '#FFFFFF',
          }}>
          #{idPokemon}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          decreaseId();
        }}
        style={{
          zIndex: 1,
          top: 180,
          left: 30,
          width: 30,
          height: 45,
        }}>
        <Image
          source={require('../../../res/images/chevron_left.png')}
          style={{width: 20, height: 40, alignSelf: 'center'}}
        />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          right: 6,
          top: 6,
        }}>
        <Image
          source={require('../../../res/images/pokeball_background.png')}
          style={{width: 250, height: 250}}
        />
      </View>
      <View
        style={{
          top: -10,
          alignSelf: 'center',
          zIndex: 1,
        }}>
        <Image
          src={
            // pokemonStatsDetail?.sprites?.other?.['official-artwork']
            //   ?.front_default ||
            // pokemonStatsDetail?.sprites?.other?.['official-artwork']
            //   ?.front_shiny
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png` ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shi
            ny/${idPokemon}.png`
          }
          style={{width: 250, height: 250}}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          increaseId();
        }}
        style={{
          zIndex: 1,
          top: -115,
          right: -350,
          width: 30,
          height: 45,
        }}>
        <Image
          source={require('../../../res/images/chevron_right.png')}
          style={{width: 20, height: 40, alignSelf: 'center'}}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          marginTop: -120,
          borderRadius: 8,
          width: '98%',
          marginVertical: 4,
          marginHorizontal: 4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            top: 70,
          }}>
          {pokeTypes?.map(props => {
            return (
              <Text
                style={{
                  height: 26,
                  paddingLeft: 10,
                  paddingRight: 8,
                  marginHorizontal: 8,
                  borderRadius: 16,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontWeight: '800',
                  textTransform: 'capitalize',
                  color: '#FFFFFF',
                  backgroundColor: pokeBgColor,
                }}>
                {props}
              </Text>
            );
          })}
        </View>
        <Text
          style={{
            top: 90,
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 18,
            color: pokeBgColor,
          }}>
          About
        </Text>
        <View style={{flexDirection: 'row', marginHorizontal: 30, top: 100}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', marginVertical: 13}}>
              <Image
                source={require('../../../res/images/weight.png')}
                style={{marginLeft: 15, width: 20, height: 20}}
              />
              <Text style={{marginLeft: 10, fontSize: 14, marginTop: -1}}>
                {pokemonStatsDetail.weight / 10} kg
              </Text>
            </View>
            <Text style={{textAlign: 'center', fontSize: 12}}>Weight</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderLeftWidth: 0.25,
              borderRightWidth: 0.2,
            }}>
            <View style={{flexDirection: 'row', marginVertical: 13}}>
              <Image
                source={require('../../../res/images/straighten.png')}
                style={{marginLeft: 15, width: 20, height: 20}}
              />
              <Text style={{marginLeft: 10, fontSize: 14, marginTop: -1}}>
                {pokemonStatsDetail.height / 10} m
              </Text>
            </View>
            <Text style={{textAlign: 'center', fontSize: 12}}>Height</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            {pokeMoves?.map(
              (
                move:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined,
              ) => {
                return (
                  <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
                    {move}
                  </Text>
                );
              },
            )}
            <Text style={{textAlign: 'center', marginTop: 8, fontSize: 12}}>
              Moves
            </Text>
          </View>
        </View>
        <ScrollView
          style={{
            marginTop: 120,
            marginHorizontal: 20,
          }}>
          <View>
            <Text
              // numberOfLines={3}
              // ellipsizeMode="tail"
              style={{
                textAlign: 'justify',
                fontSize: 14,
                fontWeight: '600',
                zIndex: -1,
              }}>
              {pokeDescrip}
            </Text>
          </View>
          <Text
            style={{
              top: 10,
              textAlign: 'center',
              fontWeight: '800',
              fontSize: 18,
              color: pokeBgColor,
            }}>
            Base Stats
          </Text>
          <View style={{marginBottom: 20}}>
            {pokeBaseStats?.map(p => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    top: 10,
                    marginLeft: 20,
                    marginRight: 30,
                    height: 28,
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontWeight: '900',
                      fontSize: 13,
                      borderRightWidth: 0.45,
                      color: pokeBgColor,
                    }}>
                    {p.name}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontWeight: '600',
                      fontSize: 13,
                    }}>
                    {p.value}
                  </Text>
                  <View
                    style={{
                      flex: 5,
                      backgroundColor: '#D3D3D3',
                      height: 6,
                      marginTop: 12,
                      borderRadius: 12,
                    }}>
                    <View
                      style={{
                        backgroundColor: pokeBgColor,
                        position: 'absolute',
                        borderRadius: 12,
                        height: 6,
                        width: p.value,
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
          <PokeSprite pokeBgColor={pokeBgColor} idPokemon={idPokemon} />
        </ScrollView>
      </View>
    </View>
  );
};
export default PokemonDetail;

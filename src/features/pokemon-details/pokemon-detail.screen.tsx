/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const pokeData = ['Mega-Punch', 'Fire-Punch'];
const pokeMovesData = ['Mega-Punch', 'Fire-Punch'];
const pokeStats = [
  {stat: 'HP', value: 80},
  {stat: 'ATK', value: 125},
  {stat: 'DEF', value: 30},
  {stat: 'SATK', value: 60},
  {stat: 'SDEF', value: 45},
  {stat: 'SPD', value: 45},
];
// const pokeStatsName = pokeStats.map(pokemon => pokemon.stat);
// const pokeStatsValue = pokeStats.map(pokemon => pokemon.valuy);
const pokeBgColor = '#F57D31';

const PokemonDetail = ({route}) => {
  const name = route.params;
  const [pokemonStatsDetail, setPokemonStatsDetail] = useState({});
  useEffect(() => {
    callPokemonStatsAPI();
  }, []);
  const callPokemonStatsAPI = async () => {
    try {
      const {data} = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
      );
      setPokemonStatsDetail(data);
    } catch (e) {
      console.log(e);
    }
  };

  const pokePropsData = pokemonStatsDetail.types
    ?.map(p => p.type)
    ?.map(p => p.name);
  console.log(pokePropsData);
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
          style={{width: 50}}>
          <Image
            source={require('../../../res/images/arrow_back.png')}
            style={{marginLeft: 12, width: 35, height: 35}}
          />
        </TouchableOpacity>
        <Text
          style={{
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
            marginLeft: 130,
            textAlign: 'right',
            paddingTop: 10,
            fontSize: 15,
            fontWeight: '800',
            color: '#FFFFFF',
          }}>
          #{pokemonStatsDetail.order}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          right: 6,
          top: 6,
          zIndex: -1,
        }}>
        <Image
          source={require('../../../res/images/pokeball_background.png')}
          style={{width: 250, height: 250}}
        />
      </View>
      <View
        style={{
          top: 30,
          alignSelf: 'center',
          zIndex: 1,
        }}>
        <Image
          src={
            pokemonStatsDetail?.sprites?.other?.['official-artwork']
              ?.front_default
          }
          style={{width: 250, height: 250}}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          marginTop: -40,
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
          {pokemonStatsDetail.types
            ?.map(p => p.type)
            ?.map(p => p.name)
            ?.map(props => {
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
            {pokeMovesData.map(move => {
              return <Text style={{fontSize: 14}}>{move}</Text>;
            })}
            <Text style={{textAlign: 'center', marginTop: 3, fontSize: 12}}>
              Moves
            </Text>
          </View>
        </View>
        <View style={{marginTop: 140, marginHorizontal: 20}}>
          <Text style={{textAlign: 'justify', fontSize: 14, fontWeight: '400'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </Text>
        </View>
        <Text
          style={{
            top: 35,
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 18,
            color: pokeBgColor,
          }}>
          Base Stats
        </Text>
        {pokeStats.map(pokemon => {
          return (
            <View
              style={{
                flexDirection: 'row',
                top: 50,
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
                {pokemon.stat}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontWeight: '600',
                  fontSize: 13,
                }}>
                {pokemon.value}
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
                    width: pokemon.value,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default PokemonDetail;

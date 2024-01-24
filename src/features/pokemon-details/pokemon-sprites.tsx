/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const PokeSprite = ({pokeBgColor, idPokemon}: any) => {
  return (
    <View style={{marginBottom: 20}}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 18,
            color: pokeBgColor,
            marginBottom: 20,
          }}>
          Sprites
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <FastImage
          resizeMode="contain"
          style={{flex: 2, width: 70, height: 70}}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${idPokemon}.gif`,
          }}
        />
        <FastImage
          resizeMode="contain"
          style={{flex: 2, width: 70, height: 70}}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${idPokemon}.gif`,
          }}
        />
        <View style={{flex: 1}} />
        <FastImage
          resizeMode="contain"
          style={{flex: 2, width: 70, height: 70}}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${idPokemon}.gif`,
          }}
        />
        <FastImage
          resizeMode="contain"
          style={{flex: 2, width: 70, height: 70}}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/${idPokemon}.gif`,
          }}
        />
      </View>
    </View>
  );
};

export default PokeSprite;

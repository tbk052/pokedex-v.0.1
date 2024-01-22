/* eslint-disable react-native/no-inline-styles */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

interface PokemonCardProps {
  id: number;
  name: string;
}
const PokemonCard = ({name, id}: PokemonCardProps) => {
  const navigation = useNavigation<any>();
  // const [pokemonDetail, setPokemonDetail] = useState({});
  // useEffect(() => {
  //   handleGetPokemonDetail();
  // });
  // const handleGetPokemonDetail = async () => {
  //   if (!name) {
  //     return;
  //   }
  //   try {
  //     const {data} = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${name}`,
  //     );
  //     setPokemonDetail(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <TouchableOpacity
      // activeOpacity={1}
      onPress={() => {
        navigation.push('PokemonDetail', Number(id));
      }}>
      <View
        style={{
          borderWidth: 2,
          borderColor: 'grey',
          borderRadius: 16,
          marginVertical: 12,
          marginHorizontal: 12,
          width: 168,
          height: 168,
          flex: 1,
        }}>
        <Text
          style={{
            textAlign: 'right',
            paddingRight: 12,
            paddingTop: 4,
            paddingBottom: 4,
          }}>
          #{id}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            src={
              // pokemonDetail?.sprites?.other['official-artwork'].front_default
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shi+ny/${id}.png`
            }
            style={{
              width: 120,
              height: 120,
              zIndex: 1,
            }}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 15,
            paddingTop: 6,
            paddingBottom: 6,
            textTransform: 'capitalize',
          }}>
          {name}
        </Text>
        <View
          style={{
            bottom: 0,
            height: '40%',
            width: '100%',
            backgroundColor: 'grey',
            borderRadius: 14,
            opacity: 0.15,
            position: 'absolute',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

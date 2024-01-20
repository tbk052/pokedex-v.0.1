import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PokemonList from '../features/pokemon-list/pokemon-list.screen';
import PokemonDetail from '../features/pokemon-details/pokemon-detail.screen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Pokédex" component={PokemonList} options={{}} />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetail}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

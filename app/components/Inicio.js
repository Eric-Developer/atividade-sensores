import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Inicio() {
 
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Icon name="smile-o" size={100} color="#008000" style={styles.icone} />
      <Text style={styles.titulo}>Bem-vindo!</Text>
      <Text style={styles.subtitulo}>Seja bem-vindo ao nosso aplicativo.</Text>
      <Text style={styles.subtitulo}>Aqui Você Pode Criar Metas De Movimentos Com seu celular.</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Movimentos')} style={styles.botao}>
        <Text style={styles.textoBotao}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icone: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  botao: {
    backgroundColor: '#008000', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textoBotao: {
    fontSize: 18,
    color: '#fff',
  },
});

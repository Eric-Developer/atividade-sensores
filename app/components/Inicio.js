import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';

// Abre ou cria o banco de dados
async function openDatabase() {
  const db = await SQLite.openDatabaseAsync('filmesDB');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS filmes (
      id INTEGER PRIMARY KEY NOT NULL, 
      titulo TEXT NOT NULL, 
      ano INTEGER
    );
  `);
  return db;
}

export default function App() {
  const [db, setDb] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [filmes, setFilmes] = useState([]);

  // Inicializa o banco de dados
  useEffect(() => {
    async function initializeDatabase() {
      const database = await openDatabase();
      setDb(database);
      carregarFilmes(database);
    }
    initializeDatabase();
  }, []);

  // Carrega os filmes do banco de dados
  const carregarFilmes = async (database) => {
    const allRows = await database.getAllAsync('SELECT * FROM filmes');
    setFilmes(allRows);
  };

  // Função para cadastrar um novo filme
  const cadastrarFilme = async () => {
    if (titulo.length > 0 && ano.length > 0) {
      const result = await db.runAsync('INSERT INTO filmes (titulo, ano) VALUES (?, ?)', titulo, parseInt(ano));
      console.log(result.lastInsertRowId, result.changes);
      await carregarFilmes(db);
      setTitulo('');
      setAno('');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  // Função para excluir um filme
  const excluirFilme = async (id) => {
    await db.runAsync('DELETE FROM filmes WHERE id = ?', id);
    await carregarFilmes(db);
  };

  // Renderiza cada item da lista de filmes com ícone de exclusão
  const renderItem = ({ item }) => (
    <View style={styles.filmeItem}>
      <Text style={styles.filmeTitulo}>{item.titulo} ({item.ano})</Text>
      <TouchableOpacity onPress={() => excluirFilme(item.id)}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Filmes</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do Filme"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Ano de Lançamento"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />

      <Button title="Cadastrar Filme" onPress={cadastrarFilme} />

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  lista: {
    marginTop: 20,
  },
  filmeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filmeTitulo: {
    fontSize: 18,
  },
});

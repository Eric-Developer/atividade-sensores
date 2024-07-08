import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Feather } from '@expo/vector-icons';

export default function Movimentos() {
  const [contagemMovimentos, setContagemMovimentos] = useState(0);
  const [estaMovendo, setEstaMovendo] = useState(false);
  const [valorAnimacao] = useState(new Animated.Value(0));
  const [meta, setMeta] = useState(10); 
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const assinaturaAcelerometro = Accelerometer.addListener(dadosAcelerometro => {
      const { x, y, z } = dadosAcelerometro;
      const aceleracao = Math.sqrt(x * x + y * y + z * z);

      if (!estaMovendo && aceleracao > 1.2) {
        setEstaMovendo(true);
        animarMovimento(true);
      } else if (estaMovendo && aceleracao < 1.0) {
        setEstaMovendo(false);
        setContagemMovimentos(prevContagem => prevContagem + 1);
        animarMovimento(false);
        atualizarProgresso(); 
      }
    });

    return () => {
      assinaturaAcelerometro.remove();
    };
  }, [estaMovendo]);

  useEffect(() => {
    if (contagemMovimentos === meta) {
      Alert.alert(
        'Parabéns!',
        'Você atingiu a meta!',
        [{ text: 'OK', onPress: () => { setMeta(prevMeta => prevMeta + 10); setContagemMovimentos(0); } }]
      );
    }
  }, [contagemMovimentos, meta]);

  const animarMovimento = (iniciar) => {
    Animated.timing(valorAnimacao, {
      toValue: iniciar ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const resetarContagem = () => {
    setContagemMovimentos(0);
    setProgresso(0);
  };

  const atualizarProgresso = () => {
    const novoProgresso = (contagemMovimentos / meta) * 100;
    setProgresso(novoProgresso);
  };

  const ajustarMeta = (novaMeta) => {
    if (novaMeta < 10) {
      setMeta(10);
    } else {
      setMeta(novaMeta);
    }
  };

  return (
    <View style={styles.container}>
      <Feather name="activity" size={80} color="black" style={styles.icone} />
      <View style={styles.containerContador}>
        <Text style={styles.textoContador}>Movimentos: {contagemMovimentos}</Text>
        <View style={styles.metaContainer}>
          <TouchableOpacity style={styles.iconeMeta} onPress={() => ajustarMeta(meta - 10)}>
            <Feather name="minus-circle" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.textoContador}>Meta: {meta}</Text>
          <TouchableOpacity style={styles.iconeMeta} onPress={() => ajustarMeta(meta + 10)}>
            <Feather name="plus-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.textoContador}>Progresso: {progresso.toFixed(2)}%</Text>
      </View>
      <TouchableOpacity onPress={resetarContagem} style={styles.botao}>
        <Text style={styles.textoBotao}>Zerar Movimentos</Text>
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
  containerContador: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoContador: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  botao: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  textoBotao: {
    fontSize: 16,
    color: '#fff',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconeMeta:{
    marginBottom:10,
    marginLeft: 5,
    marginRight: 5

  }
});

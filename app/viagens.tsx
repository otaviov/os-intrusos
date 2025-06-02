import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const viagens = [
  {
    id: 1,
    horaSaida: '08:00',
    horaChegada: '08:50',
    preco: '18,00 R$',
    carro: 'Hyundai Creta',
    tempo: '0h50',
    icone: require('../assets/images/carro-suv.png'),
  },
  {
    id: 2,
    horaSaida: '10:30',
    horaChegada: '11:45',
    preco: '20,00 R$',
    carro: 'Renault Sandero',
    tempo: '1h15',
    icone: require('../assets/images/carro-4portas.png'),
  },
  {
    id: 3,
    horaSaida: '11:00',
    horaChegada: '11:55',
    preco: '15,50 R$',
    carro: 'Fiat Doblo',
    tempo: '0h55',
    icone: require('../assets/images/minivan.png'),
  },
  {
    id: 4,
    horaSaida: '12:00',
    horaChegada: '13:30',
    preco: '25,00 R$',
    carro: 'Hyundai HB20',
    tempo: '1h30',
    icone: require('../assets/images/carro-4portas.png'),
  },
  {
    id: 5,
    horaSaida: '13:00',
    horaChegada: '13:30',
    preco: '10,00 R$',
    carro: 'Chevrolet Tracker',
    tempo: '0h30',
    icone: require('../assets/images/carro-suv.png'),
  },
  {
    id: 6,
    horaSaida: '14:30',
    horaChegada: '15:30',
    preco: '30,00 R$',
    carro: 'Fiat Pulse',
    tempo: '2h00',
    icone: require('../assets/images/carro-suv.png'),
  },
  {
    id: 7,
    horaSaida: '15:00',
    horaChegada: '18:30',
    preco: '55,00 R$',
    carro: 'Hyundai Chevrolet Spin',
    tempo: '3h30',
    icone: require('../assets/images/minivan.png'),
  },
];

export default function Viagens() {
  const router = useRouter();

  // Adicione estes estados para receber os parâmetros da tela anterior
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');

  // Efeito para pegar os parâmetros da navegação
  useEffect(() => {
    if (router.params) {
      setOrigem(router.params.origem || '');
      setDestino(router.params.destino || '');
    }
  }, [router.params]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Viagens Disponíveis</Text>

        {origem && destino && (
          <View style={styles.rotaContainer}>
            <View style={styles.rotaItem}>
              <Image
                source={require('../assets/images/seta-baixo.png')}
                style={styles.iconeRota}
              />
              <Text style={styles.cidade}>{origem.split(',')[0]}</Text>
            </View>
            <View style={styles.rotaItem}>
              <Image
                source={require('../assets/images/seta-cima.png')}
                style={styles.iconeRota}
              />
              <Text style={styles.cidade}>{destino.split(',')[0]}</Text>
            </View>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {viagens.map((v) => (
            <View key={v.id} style={styles.card}>
              <View style={styles.horarioContainer}>
                <View style={styles.horarioInfo}>
                  <View style={styles.horaContainer}>
                    <Text style={styles.hora}>{v.horaSaida}</Text>
                    {/* Adicione o ícone de partida */}
                    <Image
                      source={require('../assets/images/ponto-partida.png')}
                      style={styles.iconePonto}
                    />
                  </View>
                  <Text style={styles.tempo}>{v.tempo}</Text>
                  <View style={styles.horaContainer}>
                    <Text style={styles.hora}>{v.horaChegada}</Text>
                    {/* Adicione o ícone de chegada */}
                    <Image
                      source={require('../assets/images/ponto-chegada.png')}
                      style={styles.iconePonto}
                    />
                  </View>
                </View>

                <Text style={styles.preco}>{v.preco}</Text>
              </View>

              <View style={styles.infoRowComIcones}>
                <View style={styles.infoRow}>
                  <Image source={v.icone} style={styles.carroImg} />
                  <Text style={styles.carro}>{v.carro}</Text>
                </View>

                <View style={styles.iconesExtras}>
                  <Image source={require('../assets/images/patas.png')} style={styles.iconeExtra} />
                  <Image source={require('../assets/images/wi-fi.png')} style={styles.iconeExtra} />
                  <Image source={require('../assets/images/tomada.png')} style={styles.iconeExtra} />
                  {/* <Image source={require('../assets/images/cigarro.png')} style={styles.iconeExtra} /> */}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
          <Text style={{ color: '#fff' }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  horarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  horarioInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  hora: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tempo: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  infoRowComIcones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  carroImg: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
  carro: {
    fontSize: 16,
    fontWeight: '600',
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  iconesExtras: {
    flexDirection: 'row',
    gap: 8,
  },
  iconeExtra: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  botaoVoltar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  rotaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    rotaItem: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    iconeRota: {
        width: 20,
        height: 20,
        //tintColor: '#000',
    },
    cidade: {
        fontSize: 16,
        fontWeight: '600',
    },
    horaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    iconePonto: {
        width: 16,
        height: 16,
        //tintColor: '#555',
    },
});
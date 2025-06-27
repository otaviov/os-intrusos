import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function Viagens() {
  const router = useRouter();

  const viagens = [
    {
      id: 1,
      horaSaida: '08:00',
      horaChegada: '08:50',
      preco: 'R$ 18,00',
      carro: 'Hyundai Creta',
      tempo: '0h50',
      icone: require('../assets/images/carro-suv.png'),
    },
    {
      id: 2,
      horaSaida: '10:30',
      horaChegada: '11:45',
      preco: 'R$ 20,00',
      carro: 'Renault Sandero',
      tempo: '1h15',
      icone: require('../assets/images/carro-4portas.png'),
    },
    {
      id: 3,
      horaSaida: '11:00',
      horaChegada: '11:55',
      preco: 'R$ 15,50',
      carro: 'Fiat Doblo',
      tempo: '0h55',
      icone: require('../assets/images/minivan.png'),
    },
    {
      id: 4,
      horaSaida: '12:00',
      horaChegada: '13:30',
      preco: 'R$ 25,00',
      carro: 'Hyundai HB20',
      tempo: '1h30',
      icone: require('../assets/images/carro-4portas.png'),
    },
    {
      id: 5,
      horaSaida: '13:00',
      horaChegada: '13:30',
      preco: 'R$ 10,00',
      carro: 'Chevrolet Tracker',
      tempo: '0h30',
      icone: require('../assets/images/carro-suv.png'),
    },
    {
      id: 6,
      horaSaida: '14:30',
      horaChegada: '15:30',
      preco: 'R$ 30,00',
      carro: 'Fiat Pulse',
      tempo: '2h00',
      icone: require('../assets/images/carro-suv.png'),
    },
    {
      id: 7,
      horaSaida: '15:00',
      horaChegada: '18:30',
      preco: 'R$ 55,00',
      carro: 'Hyundai Chevrolet Spin',
      tempo: '3h30',
      icone: require('../assets/images/minivan.png'),
    },
  ];

  const {
    origem = '',
    destino = '',
    data = '',
    vagas = '1',
  } = useLocalSearchParams() as {
    origem?: string;
    destino?: string;
    data?: string;
    vagas?: String;
  };

  const formatarData = (dataString: string) => {
    if (!dataString) return 'Data não especificada';

    try {
      const dataObj = new Date(dataString);
      return dataObj.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    }
    catch {
      return 'Data inválida';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Viagens Disponíveis</Text>

        <View style={styles.diasEVagas}>
          <Text style={styles.textDiasEVagas}>
            {data ? formatarData(data) : 'Data não especificada'} • {vagas} reserva
            {vagas !== '1' ? 's' : ''}
          </Text>
        </View>

        {/* {origem && destino && (

           <View style={styles.rotaContainerCompleto}>
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
              </View> 
              )}  */}

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {viagens.map((v) => (
            <TouchableOpacity
              key={v.id}
              onPress={() => router.push({
                pathname: "/detalhes-viagem",
                params: {
                  viagem: JSON.stringify(v),
                  origem: origem,
                  destino: destino,
                  data: data,
                  vagas: String(vagas) // Passa o número de vagas
                }
              })}
            >
              <View style={styles.card}>
                <View style={styles.horarioContainer}>
                  <View style={styles.horarioInfo}>
                    <View style={styles.horaContainer}>
                      <Text style={styles.hora}>{v.horaSaida}</Text>
                      {/* Adicione o ícone de partida */}
                      <Image
                        source={require('../assets/images/ponto-partida.png')}
                        style={styles.iconePonto}
                      />
                      <Text style={styles.cidade}>{origem.split(',')[0]}</Text>
                    </View>
                    <Text style={styles.tempo}>{v.tempo}</Text>
                    <View style={styles.horaContainer}>
                      <Text style={styles.hora}>{v.horaChegada}</Text>
                      {/* Adicione o ícone de chegada */}
                      <Image
                        source={require('../assets/images/ponto-chegada.png')}
                        style={styles.iconePonto}
                      />
                      <Text style={styles.cidade}>{destino.split(',')[0]}</Text>
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
            </TouchableOpacity>
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
    padding: 24,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginVertical: 30,
    textAlign: 'center',
    color: '#1E293B',
  },
  //  rotaContainerCompleto: {
  //   flexDirection: 'column',
  //   justifyContent: 'space-around',
  //   marginBottom: 10,
  //   padding: 15,
  //   backgroundColor: '#f5f5f5',
  //   borderRadius: 12,
  //   elevation: 2,
  // },
  // rotaContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   marginBottom: 15,
  // },
  // rotaItem: {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   gap: 8,
  // },
  // iconeRota: {
  //   width: 20,
  //   height: 20,
  // },
  diasEVagas: {
    alignItems: 'center',
    marginBottom: 30,
  },
  textDiasEVagas: {
    fontSize: 16,
    color: '#828282',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  horarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  horarioInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  hora: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000113',
  },
  tempo: {
    fontSize: 12,
    color: '#828282',
    marginVertical: 4,
  },
  infoRowComIcones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
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
    color: '#000113',
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
  horaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconePonto: {
    width: 16,
    height: 16,
  },
  cidade: {
    fontSize: 16,
    fontWeight: '600',
  },
  botaoVoltar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#000113',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});
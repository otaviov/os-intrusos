import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalhesViagem() {
  const router = useRouter();
  const { viagem } = useLocalSearchParams() as { viagem?: string };
  const viagemData = viagem ? JSON.parse(viagem) : null;

  if (!viagemData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Nenhuma informação de viagem disponível</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Detalhes da Viagem</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.horarioContainer}>
            <View style={styles.horaContainer}>
              <Text style={styles.hora}>{viagemData.horaSaida}</Text>
              <Image
                source={require('../assets/images/ponto-partida.png')}
                style={styles.iconePonto}
              />
            </View>
            <Text style={styles.tempo}>{viagemData.tempo}</Text>
            <View style={styles.horaContainer}>
              <Text style={styles.hora}>{viagemData.horaChegada}</Text>
              <Image
                source={require('../assets/images/ponto-chegada.png')}
                style={styles.iconePonto}
              />
            </View>
          </View>

          <View style={styles.infoRow}>
            <Image source={viagemData.icone} style={styles.carroImg} />
            <Text style={styles.carro}>{viagemData.carro}</Text>
          </View>

          <Text style={styles.preco}>Preço: {viagemData.preco}</Text>

          <View style={styles.detalhesSection}>
            <Text style={styles.sectionTitle}>Serviços incluídos:</Text>
            <View style={styles.servicosContainer}>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/patas.png')} style={styles.iconeServico} />
                <Text>Aceita animais</Text>
              </View>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/wi-fi.png')} style={styles.iconeServico} />
                <Text>Wi-Fi disponível</Text>
              </View>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/tomada.png')} style={styles.iconeServico} />
                <Text>Tomadas USB</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.botaoReservar}
          onPress={() => alert('Reserva confirmada!')}
        >
          <Text style={styles.botaoTexto}>Reservar Viagem</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  horarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  horaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hora: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tempo: {
    fontSize: 14,
    color: '#888',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },
  detalhesSection: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  servicosContainer: {
    gap: 10,
  },
  servicoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconeServico: {
    width: 24,
    height: 24,
  },
  botaoReservar: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoVoltar: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Confira detalhes da sua reserva</Text>
          <Text style={styles.subtitle}>Terça-Feira, 3 de Junho</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.horarioContainer}>
            <View style={styles.horaContainer}>
              <Text style={styles.horaGrande}>{viagemData.horaSaida}</Text>
              <Image
                source={require('../assets/images/ponto-partida.png')}
                style={styles.iconePontoGrande}
              />
            </View>
            <Text style={styles.tempoGrande}>{viagemData.tempo}</Text>
            <View style={styles.horaContainer}>
              <Text style={styles.horaGrande}>{viagemData.horaChegada}</Text>
              <Image
                source={require('../assets/images/ponto-chegada.png')}
                style={styles.iconePontoGrande}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preços</Text>
            <View style={styles.precoItem}>
              <Text>2 reservas</Text>
              <Text>R$ 36,00</Text>
            </View>
            <View style={styles.precoItem}>
              <Text>Valores de taxas de serviço</Text>
              <Text>R$ 0,00</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/patas.png')} style={styles.iconeServico} />
              <Text>Proibido animais</Text>
            </View>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/wi-fi.png')} style={styles.iconeServico} />
              <Text>WI-fi disponível</Text>
            </View>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/tomada.png')} style={styles.iconeServico} />
              <Text>Carregadores usb</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/patas.png')} style={styles.iconeServico} />
              <Text>Proibido animais</Text>
            </View>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/ar-condicionado.png')} style={styles.iconeServico} />
              <Text>Ar-condicionado</Text>
            </View>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/comida-nao.png')} style={styles.iconeServico} />
              <Text>Comida não</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/compartilhar.png')} style={styles.iconeServico} />
              <Text>Compartilhar esta carona</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.servicoItem}>
              <Image source={viagemData.icone} style={styles.iconeCarro} />
              <Text>{viagemData.carro}</Text>
            </View>
          </View>

          <Text style={styles.infoText}>
            Entre em contato com a nossa Central de Atendimento para esclarecer dúvidas ou obter mais informações sobre sua viagem.
          </Text>

          <View style={styles.section}>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/whatsapp.png')} style={styles.iconeServico} />
              <Text>Nosso Whatsapp</Text>
            </View>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/email.png')} style={styles.iconeServico} />
              <Text>Nosso E-mail</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.botaoReservar}
          onPress={() => alert('Reserva confirmada!')}
        >
          <Text style={styles.botaoTexto}>Reservar Viagem</Text>
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
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    //marginBottom: 20,
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 30,
    marginBottom: 8,
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#828282',
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  horaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horaGrande: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  tempoGrande: {
    fontSize: 12,
    color: '#888',
  },
  iconePontoGrande: {
    width: 16,
    height: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  precoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  servicoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconeServico: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  iconeCarro: {
    width: 30,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  infoText: {
    marginBottom: 20,
    color: '#666',
  },
  botaoReservar: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
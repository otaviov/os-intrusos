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

  // Função para formatar o preço
  const formatarPreco = (preco: string) => {
    // Se já contém R$, retorna como está
    if (preco.includes('R$')) return preco;
    // Caso contrário, formata com R$
    return `R$ ${preco}`;
  };

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

          <View style={{ height: 30 }} />
          <View style={styles.section}>
            <Text style={styles.precoTitle}>Preços</Text>
            <View style={{ height: 5 }} />
            <View style={styles.precoItem}>
              <Text style={styles.textPreco}>2 reservas</Text>
              <View style={styles.precoValorContainer}>
                <Text style={styles.precoValor}>{formatarPreco(viagemData.preco)}</Text>
                <Image source={require('../assets/images/detalhes.png')} style={styles.iconePreco} />
              </View>
            </View>
            <View style={{ height: 10 }} />
            <View style={styles.precoItem}>
              <Text style={styles.textPreco}>Valores de taxas de serviço</Text>
              <View style={styles.precoValorContainer}>
                <Text style={styles.precoValor}>R$ 0,00</Text>
                <Image source={require('../assets/images/detalhes.png')} style={styles.iconePreco} />
              </View>
            </View>
          </View>

          <View style={styles.linhaServicos}>
            <View style={styles.colunaServicos}>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/patas.png')} style={styles.iconeServico} />
                <Text style={styles.textServicos}>Proibido animais</Text>
              </View>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/wi-fi.png')} style={styles.iconeServico} />
                <Text style={styles.textServicos}>Wi-fi Disponível</Text>
              </View>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/tomada.png')} style={styles.iconeServico} />
                <Text style={styles.textServicos}>Carregadores USB</Text>
              </View>
            </View>

            <View style={styles.colunaServicos}>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/nao-fume.png')} style={styles.iconeServico} />
                <Text style={styles.textServicos}>Proibido fumar</Text>
              </View>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/ar-condicionado.png')} style={styles.iconeServico} />
                <Text style={styles.textServicos}>Ar-condicionado</Text>
              </View>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/comida-nao.png')} style={styles.iconeServico} />
                <Text style={styles.textServicos}>Comida não</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.servicoItem}>
              <Image source={require('../assets/images/compartilhar.png')} style={styles.iconeServico} />
              <Text style={styles.textShare}>Compartilhar esta carona</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.servicoItem}>
              <Image source={viagemData.icone} style={styles.iconeCarro} />
             <Text style={styles.textCarro}>{viagemData.carro}</Text>
            </View>
          </View>

          <Text style={styles.infoText}>
            Entre em contato com a nossa Central de Atendimento para esclarecer dúvidas ou obter mais informações sobre sua viagem.
          </Text>

          <View style={styles.section}>
            <View style={styles.servicoContato}>
              <Image source={require('../assets/images/whatsapp.png')} style={styles.iconeContato} />
              <Text>Nosso Whatsapp</Text>
            </View>
            <View style={styles.servicoContato}>
              <Image source={require('../assets/images/email.png')} style={styles.iconeContato} />
              <Text>Nosso E-mail</Text>
            </View>
          </View>
        </View>

      </ScrollView>
      <TouchableOpacity
        style={styles.botaoReservar}
        onPress={() => alert('Reserva confirmada!')}
      >
        <Text style={styles.botaoTexto}>Reservar Viagem</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 25,
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
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  horarioContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
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
    color: '#000113',
  },
  precoTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E293B',
  },
  precoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    color: '#000113',
  },
  textPreco: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textServicos: {
    color: '#828282',
  },
  precoValorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  precoValor: {
    marginRight: 18,
    textAlign: 'right',
    minWidth: 60,
    fontWeight: 'bold',
  },
  iconePreco: {
    width: 20,
    height: 20,
  },
  linhaServicos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginVertical: 30,
  },
  colunaServicos: {
    flex: 1,
    marginHorizontal: 5,
  },
  textShare: {
    fontWeight: 'bold',
    fontSize: 15,
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
    height: 30,
    marginRight: 8,
    resizeMode: 'contain',
  },
  textCarro: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  infoText: {
    marginBottom: 35,
    marginVertical: 10,
    color: '#1E293B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicoContato: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconeContato: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  botaoReservar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#000113',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
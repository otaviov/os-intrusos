import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalhesViagem() {
  const router = useRouter();
  const [modalCompartilharVisible, setModalCompartilharVisible] = React.useState(false);
  const [confirmacaoVisible, setConfirmacaoVisible] = React.useState(false);
  const [mensagemConfirmacao, setMensagemConfirmacao] = React.useState('');
  const {
    viagem,
    origem = '',
    destino = '',
    data = '',
    vagas = '1',

  } = useLocalSearchParams() as {
    viagem?: string;
    origem?: string;
    destino?: string;
    data?: string;
    vagas?: string;
  };

  const viagemData = viagem ? JSON.parse(viagem) : null;

  if (!viagemData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Nenhuma informação de viagem disponível</Text>
      </SafeAreaView>
    );
  }

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

  // Função para formatar o preço
  {/*}
  const formatarPreco = (preco: string) => {
    // Se já contém R$, retorna como está
    if (preco.includes('R$')) return preco;
    // Caso contrário, formata com R$
    return `R$ ${preco}`;
  };
  */}

  // Função para o calculo do preço 
  const extrairValorNumerico = (preco: string): number => {
    return parseFloat(
      preco.replace('R$', '').replace(',', '.').trim()
    ) || 0;
  }

  const calcularTotal = (preco: string, vagas: string): string => {
    const total = extrairValorNumerico(preco) * parseInt(vagas, 10) || 1;
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }


  return (
    <SafeAreaView style={styles.safeArea} >
      <ScrollView contentContainerStyle={styles.scrollContainer} >
        <View style={styles.header}>
          <Text style={styles.title}>Confira detalhes da sua reserva</Text>
          <Text style={styles.subtitle}>
            {data ? formatarData(data) : 'Data não especificada'}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.horarioContainer}>
            <View style={styles.horaContainer}>
              <Text style={styles.horaGrande}>{viagemData.horaSaida}</Text>
              <Image
                source={require('../assets/images/ponto-partida.png')}
                style={styles.iconePontoGrande}
              />
              <Text style={styles.cidade}>{origem.split(',')[0]}</Text>
            </View>
            <Text style={styles.tempoGrande}>{viagemData.tempo}</Text>
            <View style={styles.horaContainer}>
              <Text style={styles.horaGrande}>{viagemData.horaChegada}</Text>
              <Image
                source={require('../assets/images/ponto-chegada.png')}
                style={styles.iconePontoGrande}
              />
              <Text style={styles.cidade}>{destino.split(',')[0]}</Text>
            </View>
          </View>

          <View style={{ height: 30 }} />
          <View style={styles.section}>
            <Text style={styles.precoTitle}>Preços</Text>
            <View style={{ height: 5 }} />
            <View style={styles.precoItem}>
              <Text style={styles.textPreco}>{vagas} reserva{vagas !== '1' ? 's' : ''}</Text>
              <View style={styles.precoValorContainer}>
                <Text style={styles.precoValor}>{calcularTotal(viagemData.preco, vagas)}</Text>
                <TouchableOpacity onPress={() => router.push('/taxa-reserva')}>
                  <Image source={require('../assets/images/detalhes.png')} style={styles.iconePreco} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }} />
            <View style={styles.precoItem}>
              <Text style={styles.textPreco}>Valores de taxas de serviço</Text>
              <View style={styles.precoValorContainer}>
                <Text style={styles.precoValor}>R$ 0,00</Text>
                <TouchableOpacity onPress={() => router.push('/taxa-servico')}>
                  <Image source={require('../assets/images/detalhes.png')} style={styles.iconePreco} />
                </TouchableOpacity>
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
            <TouchableOpacity onPress={() => setModalCompartilharVisible(true)}>
              <View style={styles.servicoItem}>
                <Image source={require('../assets/images/compartilhar.png')} style={styles.iconeServico} />
                <Text style={styles.textShare}>Compartilhar esta carona</Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={styles.section}>
            <TouchableOpacity>
              <View style={styles.servicoItem}>
                <Image source={viagemData.icone} style={styles.iconeCarro} />
                <Text style={styles.textCarro}>{viagemData.carro}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.infoText}>
            Entre em contato com a nossa Central de Atendimento para esclarecer dúvidas ou obter mais informações sobre sua viagem.
          </Text>

          <View style={styles.section}>
            <View style={styles.servicosContatoContainer}>
              <TouchableOpacity
                style={styles.botaoContato}
                onPress={() => Linking.openURL('https://wa.me/+5581998502797')}
                >
                <Image source={require('../assets/images/whatsapp.png')} style={styles.iconeContato} />
                <Text style={styles.textoContato}>Nosso Whatsapp</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botaoContato}
              onPress={() => Linking.openURL('tel:+5581998502797')}
              >
                <Image source={require('../assets/images/ligar.png')} style={styles.iconeContato} />
                <Text style={styles.textoContato}>Ligue pra gente</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botaoContato}
              onPress={() => Linking.openURL('mailto:otavioveira32@gmail.com?subject=Duvida sobre viagem')}
              >
                <Image source={require('../assets/images/email.png')} style={styles.iconeContato} />
                <Text style={styles.textoContato}>Nosso E-mail</Text>
              </TouchableOpacity>
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

      {/*a partir de agora é todo o visual do botao compartilhar viagem */}
      {/* Modal de Compartilhamento */}
      {modalCompartilharVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Compartilhar viagem</Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setMensagemConfirmacao('Viagem compartilhada no WhatsApp!');
                setModalCompartilharVisible(false);
                setConfirmacaoVisible(true);
              }}
            >
              <Image source={require('../assets/images/whatsapp.png')} style={styles.modalIcon} />
              <Text style={styles.modalOptionText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setMensagemConfirmacao('Viagem compartilhada no Facebook!');
                setModalCompartilharVisible(false);
                setConfirmacaoVisible(true);
              }}
            >
              <Image source={require('../assets/images/facebook.png')} style={styles.modalIcon} />
              <Text style={styles.modalOptionText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setMensagemConfirmacao('Link copiado para a área de transferência!');
                setModalCompartilharVisible(false);
                setConfirmacaoVisible(true);
              }}
            >
              <Image source={require('../assets/images/link.png')} style={styles.modalIcon} />
              <Text style={styles.modalOptionText}>Copiar link</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalCompartilharVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Modal de Confirmação */}
      {confirmacaoVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalConfirmacaoContainer}>
            <Image
              source={require('../assets/images/confirmado.png')}
              style={styles.modalConfirmacaoIcon}
            />
            <Text style={styles.modalConfirmacaoText}>{mensagemConfirmacao}</Text>

            <TouchableOpacity
              style={styles.modalConfirmacaoBotao}
              onPress={() => setConfirmacaoVisible(false)}
            >
              <Text style={styles.modalConfirmacaoBotaoTexto}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* FINAL DO BOTAO COMPARTILHAMENTO */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
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
        marginBottom: 8,
        borderWidth: 0.5,
        borderColor: '#e2e8f0',
        elevation: 1, 
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
    gap: 10,
  },
  horaGrande: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000113',
  },
  tempoGrande: {
    fontSize: 12,
    color: '#828282',
  },
  iconePontoGrande: {
    width: 16,
    height: 16,
    marginVertical: 10,
  },
  cidade: {
    fontSize: 16,
    fontWeight: '600',
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
  servicosContatoContainer: {
    flexDirection: 'column',
  },
  botaoContato: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  textoContato: {
    //marginLeft: 8,
  },
  iconeContato: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  // Estilos para ambos os modals
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  // Estilos do modal de compartilhamento
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E293B',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#1E293B',
  },
  modalIcon: {
    width: 24,
    height: 24,
  },
  modalCancel: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#000113',
    fontWeight: 'bold',
  },
  // Estilos do modal de confirmação
  modalConfirmacaoContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalConfirmacaoIcon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  modalConfirmacaoText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E293B',
    lineHeight: 24,
  },
  modalConfirmacaoBotao: {
    backgroundColor: '#000113',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalConfirmacaoBotaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
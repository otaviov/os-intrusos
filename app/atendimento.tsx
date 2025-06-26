import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AtendimentosScreen() {
  const router = useRouter();

  // Dados mockados conforme a imagem
  const atendimentos = [
    {
      id: '3211',
      assunto: 'Cancelamento de Reserva',
      data: '26/06/2025 às 10:00',
      status: 'Em andamento'
    },
    {
      id: '3085',
      assunto: 'Trocar Horario',
      data: '15/06/2025 às 13:12',
      status: 'Resolvido'
    },
    {
      id: '2165',
      assunto: 'Pagamento via Pix',
      data: '12/05/2025 às 18:48',
      status: 'Não Respondido'
    },
    {
      id: '2154',
      assunto: 'Apagar minha conta',
      data: '12/04/2025 às 14:16',
      status: 'Resolvido'
    },
    {
      id: '2122',
      assunto: 'Horario de funcionamento',
      data: '11/04/2025 às 11:57',
      status: 'Resolvido'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.tituloPrincipal}>Seus Atendimentos</Text>
      
      {/* Lista de Atendimentos */}
      <ScrollView style={styles.listaContainer}>
        {atendimentos.map((atendimento) => (
          <TouchableOpacity 
            key={atendimento.id}
            style={styles.atendimentoItem}
            onPress={() => router.push(`/chat-suporte?id=${atendimento.id}`)}
          >
            <View style={styles.cabecalhoItem}>
              <Text style={styles.idAtendimento}>#{atendimento.id}</Text>
            </View>
            
            <Text style={styles.assuntoAtendimento}>{atendimento.assunto}</Text>
            
            <View style={styles.rodapeItem}>
              <Text style={styles.dataAtendimento}>{atendimento.data}</Text>
              <View style={[
                styles.statusBadge,
                atendimento.status === 'Em andamento' && styles.statusAndamento,
                atendimento.status === 'Resolvido' && styles.statusResolvido,
                atendimento.status === 'Não Respondido' && styles.statusNaoRespondido
              ]}>
                <Text style={styles.statusTexto}>{atendimento.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botão Novo Atendimento */}
      <TouchableOpacity 
        style={styles.botaoNovo}
        onPress={() => router.push('/novo-atendimento')}
      >
        <Text style={styles.botaoTexto}>Novo Atendimento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  tituloPrincipal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  listaContainer: {
    flex: 1,
    marginBottom: 20,
  },
  atendimentoItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cabecalhoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  idAtendimento: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  assuntoAtendimento: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  rodapeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataAtendimento: {
    fontSize: 13,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusAndamento: {
    backgroundColor: '#fef9c3',
  },
  statusResolvido: {
    backgroundColor: '#dcfce7',
  },
  statusNaoRespondido: {
    backgroundColor: '#fee2e2',
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '500',
  },
  botaoNovo: {
    backgroundColor: '#000113',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
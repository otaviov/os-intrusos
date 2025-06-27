import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Atendimento() {
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
            assunto: 'Trocar horario',
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
        <SafeAreaView style={styles.safeArea}>
            {/* Cabeçalho */}
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Seus Atendimentos</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
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

            {/* Botao de Novo atendimento */}
            <View style={styles.footer}>
            <TouchableOpacity
                style={styles.botaoNovo}
                onPress={() => router.push('/novo-atendimento')}
            >
                <Text style={styles.botaoTexto}>Novo Atendimento</Text>
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
    scrollContainer: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    cabecalho: {
        padding: 16,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B',
        marginVertical: 30,
        marginBottom: 8,
        textAlign: 'center',
    },
    atendimentoItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 15,
        marginBottom: 8,
        borderWidth: 0.5,
        borderColor: '#e2e8f0',
        elevation: 1,
    },
    cabecalhoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    idAtendimento: {
        fontSize: 14,
        color: '#000113',
        fontWeight: '500',
    },
    assuntoAtendimento: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000113',
        marginBottom: 12,
    },
    rodapeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dataAtendimento: {
        fontSize: 12,
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
        color: '#000113', // Cor padrão do texto
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    botaoNovo: {
        backgroundColor: '#000113',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});


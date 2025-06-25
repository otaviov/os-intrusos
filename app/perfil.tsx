import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const imagens = {
    avatar: require('../assets/images/avatar.png'),
    configuracoes: require('../assets/images/configuracoes.png'),
    preferencias: require('../assets/images/preferencias.png'),
    cupons: require('../assets/images/cupons.png'),
    historico: require('../assets/images/historico.png'),
    ajuda: require('../assets/images/ajuda.png'),
    termos: require('../assets/images/termos.png'),
    sair: require('../assets/images/sair.png'),
};

export default function PerfilScreen() {
    const router = useRouter();

    const opcoesSuperiores = [
        { nome: 'Configurações', icone: 'configuracoes' },
        { nome: 'Suas Preferências', icone: 'preferencias' },
        { nome: 'Cupons e Promoções', icone: 'cupons' },
        { nome: 'Históricos de Reservas', icone: 'historico' },
        { nome: 'Ajuda e Suporte', icone: 'ajuda' },
        { nome: 'Termos e Condições', icone: 'termos' },
    ];

    const opcoesInferiores = [
        { nome: 'Sair da Conta', icone: 'sair' },
    ];

    return (
        <View style={styles.container}>
            {/* Cabeçalho do Perfil */}
            <View style={styles.cabecalho}>
                <Image
                    source={imagens.avatar}
                    style={styles.avatar}
                />
                <Text style={styles.nomeUsuario}>Otávio Ribeiro de Oliveira</Text>
            </View>

            {/* Opções do Perfil - Parte superior */}
            <View style={styles.opcoesContainer}>
                {opcoesSuperiores.map((opcao, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.opcaoItem}
                        onPress={() => { }}
                    >
                        <View style={styles.opcaoConteudo}>
                            <Image
                                source={imagens[opcao.icone]}
                                style={styles.opcaoIcone}
                            />
                            <Text style={styles.opcaoTexto}>{opcao.nome}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Opções no final da tela */}
            <View style={styles.opcoesInferioresContainer}>
                {opcoesInferiores.map((opcao, index) => (
                    <TouchableOpacity
                        key={`inf-${index}`}
                        style={[
                            styles.opcaoItem,
                            opcao.nome === 'Sair da Conta' && styles.sairItem
                        ]}
                        onPress={() => opcao.nome === 'Sair da Conta' && router.push('/login')}
                    >
                        <View style={styles.opcaoConteudo}>
                            <Image
                                source={imagens[opcao.icone]}
                                style={[
                                    styles.opcaoIcone,
                                    opcao.nome === 'Sair da Conta' && { tintColor: '#FF3B30' }
                                ]}
                            />
                            <Text style={[
                                styles.opcaoTexto,
                                opcao.nome === 'Sair da Conta' && styles.sairTexto
                            ]}>
                                {opcao.nome}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        paddingHorizontal: 30,
    },
    cabecalho: {
        alignItems: 'center',
        paddingVertical: 30,
        //marginVertical: 25,
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    nomeUsuario: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    opcoesContainer: {
        flex: 1,
        marginTop: 10,
    },
    opcoesInferioresContainer: {
        marginBottom: 40,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    opcaoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
    },
    opcaoConteudo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    opcaoIcone: {
        width: 24,
        height: 24,
        marginRight: 15,
        tintColor: '#1E293B',
    },
    opcaoTexto: {
        fontSize: 16,
        color: '#1E293B',
    },
    sairItem: {
       borderBottomWidth: 0
    },
    sairTexto: {
        fontSize: 16,
        color: '#FF3B30', // Vermelho para "Sair"
    },
});
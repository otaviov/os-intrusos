import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ChatSuporte() {
    const router = useRouter();
    const [mensagem, setMensagem] = useState('');
    const [mensagens, setMensagens] = useState([
        {
            texto: 'Gostaria de cancelar minha reserva, queria remarcar para amanhã as 12h. hoje não poderei ir',
            hora: 'Você 13:45',
            enviado: true
        },
        {
            texto: 'Claro, irei realizar seu cancelamento. Para amanhã tenho apenas 2 carros disponíveis',
            hora: 'Suporte Incentral 14:45',
            enviado: false
        },
        {
            texto: 'Obrigado!',
            hora: 'Você 14:51',
            enviado: true
        }
    ]);

    const scrollViewRef = useRef<ScrollView>(null);

    const enviarMensagem = () => {
        if (mensagem.trim() === '') return;

        const novaMensagem = {
            texto: mensagem,
            hora: 'Agora',
            enviado: true
        };

        setMensagens([...mensagens, novaMensagem]);
        setMensagem('');
    };

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [mensagens]);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Cabeçalho */}
            <View style={styles.cabecalhoContainer}>
                <View style={styles.cabecalhoSuperior}>
                    <Image
                        source={require('../assets/images/in.png')}
                        style={styles.iconeSuporte}
                    />
                    <Text style={styles.titulo}>Suporte Incentral</Text>
                </View>

                <Text style={styles.subTitle}>
                    Você está conversando com o suporte da Incentral devido a alta demanda pode ser que demore mais do que o esperado...
                </Text>
            </View>

            {/* Área de mensagens */}
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {mensagens.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.mensagemBubble,
                            msg.enviado ? styles.mensagemEnviada : styles.mensagemRecebida
                        ]}
                    >
                        <Text style={msg.enviado ? styles.mensagemTextoEnviada : styles.mensagemTextoRecebida}>
                            {msg.texto}
                        </Text>
                        <Text style={msg.enviado ? styles.mensagemHoraEnviada : styles.mensagemHoraRecebida}>
                            {msg.hora}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Input de mensagem */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    value={mensagem}
                    onChangeText={setMensagem}
                    placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity
                    style={styles.botaoEnviar}
                    onPress={enviarMensagem}
                    disabled={mensagem.trim() === ''}
                >
                    <Text style={styles.botaoTexto}>Enviar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
    cabecalhoContainer: {
        padding: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    cabecalhoSuperior: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginVertical: 20,
    },
    iconeSuporte: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    subTitle: {
        fontSize: 15,
        color: '#64748b',
        lineHeight: 22,
    },
    divisor: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 8,
    },
    mensagemBubble: {
        maxWidth: '80%',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    mensagemEnviada: {
        alignSelf: 'flex-end',
        backgroundColor: '#000113',
        borderBottomRightRadius: 2,
    },
    mensagemRecebida: {
        alignSelf: 'flex-start',
        backgroundColor: '#f3f4f6',
        borderBottomLeftRadius: 2,
    },
    mensagemTextoEnviada: {
        color: '#fff',
        fontSize: 15,
    },
    mensagemTextoRecebida: {
        color: '#1E293B',
        fontSize: 15,
    },
    mensagemHoraEnviada: {
        color: '#d1d5db',
        fontSize: 11,
        marginTop: 4,
        textAlign: 'right',
    },
    mensagemHoraRecebida: {
        color: '#6b7280',
        fontSize: 11,
        marginTop: 4,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 12,
        fontSize: 15,
        color: '#1E293B',
    },
    botaoEnviar: {
        backgroundColor: '#000113',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

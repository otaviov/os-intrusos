import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function NovoTicketScreen() {
    const router = useRouter();
    const [assunto, setAssunto] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleEnviar = () => {
        // Lógica para criar novo ticket
        router.push('/chat-suporte'); // Redireciona para o chat
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Cabeçalho */}
                <Text style={styles.title}>Criar Novo Atendimento</Text>
                <Text style={styles.subtitle}>
                    A seguir especifique o motivo/assunto e você será direcionado para um chat ao vivo com nossa central.
                </Text>

                {/* Formulário */}

                <Text style={styles.label}>Assunto</Text>
                <TextInput
                    style={styles.inputProblema}
                    placeholder="Ex: Problema com reserva"
                    value={assunto}
                    onChangeText={setAssunto}
                    placeholderTextColor="#9ca3af"
                />

                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={[styles.inputDescricao]}
                    placeholder="Descreva seu problema..."
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline
                    numberOfLines={4}
                    placeholderTextColor="#9ca3af"
                />
            </ScrollView>
            <TouchableOpacity
                style={styles.botaoEnviar}
                onPress={handleEnviar}
            >
                <Text style={styles.botaoTexto}>Enviar Mensagem</Text>
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
        paddingHorizontal: 24,
        paddingBottom: 100,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B',
        marginTop: 30,
        marginBottom: 8,
        textAlign: 'center',

    },
    subtitle: {
        fontSize: 16,
        color: '#828282',
        // textAlign: 'center',
        marginBottom: 60,
        paddingHorizontal: 20,
        //lineHeight: 22,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 8,
        marginTop: 16,
    },
    inputProblema: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#000113',
        paddingHorizontal: 12,
        fontSize: 15,
        marginBottom: 16,
    },
    inputDescricao: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        padding: 14,
        fontSize: 15,
        color: '#1E293B',
        minHeight: 190,
        textAlignVertical: 'top',
    },
    botaoEnviar: {
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
        fontSize: 16,
    },
});
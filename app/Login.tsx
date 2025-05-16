
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const router = useRouter();

    return (
        <View style={styles.container}>

            <Image
                source={require('../assets/images/Brand.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>


            <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                style={styles.input}
                defaultValue="prototipo@gmail.com"
            />
            <TextInput
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity onPress={() => console.log('Esqueceu a senha?')}>
                <Text style={styles.forgot}>Esqueceu?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,

        backgroundColor: '#fff',
    },
    logo: {
        width: 250,
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginBottom: 24,

    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    forgot: {
        textAlign: 'right',
        color: '#050DA6',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#000113',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

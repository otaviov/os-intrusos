import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EsqueceuSenha() {
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleRecuperarSenha = () => {
    // recuperação de senha
    alert(`Link de recuperação enviado para: ${email}`);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Remove o behavior no Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Ajuste para iOS
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            flexGrow: 1,
            paddingBottom: keyboardVisible ? 20 : 0 // Ajusta o padding quando o teclado está visível
          }
        ]}
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
      >
        {!keyboardVisible && (
          <Image
            source={require('../assets/images/in.png')}
            style={styles.logo}
          />
        )}

        <View style={styles.formContainer}>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>Digite seu e-mail para receber o link de recuperação</Text>

          <TextInput
            placeholder="E-mail cadastrado"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleRecuperarSenha}
          >
            <Text style={styles.buttonText}>Enviar Link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Voltar para o login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#000113',
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    padding: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
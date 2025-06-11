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
            placeholderTextColor="#828282"
            style={styles.email}
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
    position: 'relative',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 25,
  },
  formContainer: {
    flex: 1,
    marginVertical: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#828282',
    textAlign: 'center',
    marginBottom: 50,
    padding: 4,
    
  },
  email: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#000113',
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
});
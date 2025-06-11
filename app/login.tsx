// login.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          <TextInput
            placeholder="Email ou CPF"
            placeholderTextColor="#aaa"
            style={styles.email}
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.senha}
          />

          <TouchableOpacity onPress={() => router.push('/esqueceu-senha')}>
            <Text style={styles.forgot}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.or}>Ou entre pelas suas redes sociais</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../assets/images/google-icon.png')} style={styles.socialIcon} />
              <Text>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../assets/images/facebook-icon.png')} style={styles.socialIcon} />
              <Text>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.newAccount}>
            <Text style={styles.footerText}>Não tem conta?</Text>
            <TouchableOpacity onPress={() => router.push('/cadastro')}>
              <Text style={styles.link}> Crie uma agora</Text>
            </TouchableOpacity>
          </View>
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
    //justifyContent: 'center',
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
    marginBottom: 60,
  },
  email: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#000113',
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  senha: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  forgot: {
    textAlign: 'right',
    color: '#007bff',
    marginBottom: 24,
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
  or: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#828282',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    right: 5,
  },
  footerText: {
    textAlign: 'center',
    color: '#828282',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  newAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
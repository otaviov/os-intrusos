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
import FakeCheckbox from '../../components/FakeCheckbox';

export default function Cadastro() {
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

  const [form, setForm] = useState({
    nome: '',
    sexo: '',
    email: '',
    celular: '',
    cpfCnpj: '',
    senha: '',
  });

  const [aceitaTermos, setAceitaTermos] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCadastro = () => {
    if (!aceitaTermos) {
      alert('Você precisa aceitar os termos de uso!');
      return;
    }
    alert('Cadastro feito com sucesso!');
    router.replace('/screens/login'); // troca para a tela de login

  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView
        contentContainerStyle={[styles.container, { minHeight: '100%' }]}
        keyboardShouldPersistTaps="handled"
      >
        {!keyboardVisible && (
          <Image
            source={require('../../assets/images/in.png')}
            style={styles.logo}
          />
        )}

        <View style={styles.formContainer}>
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>Preencha os dados para criar sua conta</Text>


          <TextInput style={styles.input} placeholder="Nome Completo" onChangeText={v => handleChange('nome', v)} />
          <TextInput style={styles.input} placeholder="Sexo" onChangeText={v => handleChange('sexo', v)} />
          <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" onChangeText={v => handleChange('email', v)} />
          <TextInput style={styles.input} placeholder="Celular" keyboardType="phone-pad" onChangeText={v => handleChange('celular', v)} />
          <TextInput style={styles.input} placeholder="CPF / CNPJ" keyboardType="numeric" onChangeText={v => handleChange('cpfCnpj', v)} />
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={v => handleChange('senha', v)} />

          <View style={styles.checkboxContainer}>
            <FakeCheckbox value={aceitaTermos} onChange={setAceitaTermos} />
            <Text style={styles.checkboxLabel}>
              Li e aceito os{' '}
              <Text style={styles.link} onPress={() => console.log('Termos de Uso')}>
                Termos de Uso
              </Text>{' '}
              e{' '}
              <Text style={styles.link} onPress={() => router.push('/screens/login')}>
                Política de Privacidade
              </Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
            <Text style={styles.textoBotao}>Entrar</Text>
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
    //marginBottom: 40,
    //marginTop: 40, 
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 60,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 8,
  },
  checkboxLabel: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
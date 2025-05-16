import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FakeCheckbox from '../../components/FakeCheckbox'; // ou o caminho certo aí

export default function Cadastro() {
  const router = useRouter();

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
   <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>🚗 Os Intrusos</Text>
      <Text style={styles.titulo}>Cadastro</Text>
      <Text style={styles.subtitulo}>Conforto e Cuidado</Text>

      <TextInput style={styles.input} placeholder="Nome Completo" onChangeText={v => handleChange('nome', v)} />
      <TextInput style={styles.input} placeholder="Sexo" onChangeText={v => handleChange('sexo', v)} />
      <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" onChangeText={v => handleChange('email', v)} />
      <TextInput style={styles.input} placeholder="Celular" keyboardType="phone-pad" onChangeText={v => handleChange('celular', v)} />
      <TextInput style={styles.input} placeholder="CPF / CNPJ" keyboardType="numeric" onChangeText={v => handleChange('cpfCnpj', v)} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={v => handleChange('senha', v)} />

      <View style={styles.checkboxContainer}>
        <FakeCheckbox value={aceitaTermos} onChange={setAceitaTermos} />
        <Text style={styles.checkboxLabel}>
          Li e aceito os <Text style={styles.link}>Termos de Uso</Text> e <Text style={styles.link}>Política de Privacidade</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    fontWeight: 'bold',
    color: '#000',
  },
  botao: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
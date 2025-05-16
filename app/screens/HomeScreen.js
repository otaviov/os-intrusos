import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const chaveAPI = 'pk.60997858859c4d9a1cf9c77d4b8dca83';  // Substitua pela sua chave de API do LocationIQ

const buscarLocalizacoes = async (texto, limite = 10) => {
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${chaveAPI}&q=${encodeURIComponent(texto)}&format=json&countrycodes=BR&limit=${limite}`
    );

    // mostrar resultado no terminal
    //console.log('Resposta da API do LocationIQ:', response.data);

    if (response.data && response.data.length > 0) {
      return response.data.map((item) => {
        const nome = item.display_name || '';
        
        // Dividindo o display_name por vírgulas
        const partes = nome.split(',').map((parte) => parte.trim());

        // A cidade é o primeiro item
        const cidade = partes[0];

        // O estado está no sexto item (índice 5)
        let estado = partes.length > 3 ? partes[3] : '';

        // Garantir que o estado não tenha algo como "Estado de"
        if (estado && estado.includes('Estado de')) {
          estado = estado.replace('Estado de', '').trim();
        }

        return {
          nome: `${cidade}, ${estado}`, // Exibe cidade e estado
          latitude: item.lat,
          longitude: item.lon,
        };
      });
    } else {
      console.log('Nenhum resultado encontrado para:', texto);
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar localizações:', error.message);
    return [];
  }
};

export default function HomeScreen() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [vagas, setVagas] = useState('');
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [campoFocado, setCampoFocado] = useState(null);

  const debounceTimeout = useRef(null); // Ref para controlar o debounce
  const carregando = useRef(false); // Ref para controle de requisições pendentes

  // Função que faz a busca da cidade de forma eficiente
  const buscarCidades = async (texto, tipo) => {
    if (texto.trim() === '') return; // Evitar buscar quando o campo está vazio

    // Se já está carregando a pesquisa anterior, não inicia outra
    if (carregando.current) return;

    try {
      carregando.current = true; // Bloqueia novas requisições enquanto uma está sendo feita

      // Limitar o número de resultados (exemplo: 10 resultados)
      const resultados = await buscarLocalizacoes(texto, 10);

      if (tipo === 'origem') {
        setSugestoesOrigem(resultados);
      } else {
        setSugestoesDestino(resultados);
      }
    } catch (err) {
      console.error("Erro ao buscar localizações:", err);
    } finally {
      carregando.current = false; // Libera para futuras requisições
    }
  };

  // Função de debounce para reduzir o número de requisições
  const handleChange = useCallback((text, tipo) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Limpa o debounce anterior
    }

    // Atualiza o valor do campo sem acionar a busca imediatamente
    if (tipo === 'origem') {
      setOrigem(text);
    } else {
      setDestino(text);
    }

    // Realiza a requisição após 700ms
    debounceTimeout.current = setTimeout(() => {
      buscarCidades(text, tipo);
    }, 700); // Aumentando o debounce para 700ms
  }, []);

  // Função para selecionar a sugestão
  const selecionarSugestao = (item, tipo) => {
    if (tipo === 'origem') {
      setOrigem(item.nome);
      setSugestoesOrigem([]); // Limpa as sugestões após a seleção
    } else {
      setDestino(item.nome);
      setSugestoesDestino([]); // Limpa as sugestões após a seleção
    }
  };

  const buscarViagens = () => {
    alert(`Buscando ${vagas} vaga(s) de ${origem} para ${destino}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OS INTRUSOS</Text>

      <View style={styles.form}>
        {/* Campo de Origem */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Cidade de origem"
            value={origem} // Vinculado ao estado
            onChangeText={(text) => handleChange(text, 'origem')}
            onFocus={() => setCampoFocado('origem')}
            autoCapitalize="none" // Desabilita a capitalização automática
            autoCorrect={false} // Desabilita correção automática
            keyboardType="default"
          />
          {sugestoesOrigem.length > 0 && (
            <FlatList
              style={styles.sugestoes}
              data={sugestoesOrigem}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selecionarSugestao(item, 'origem')}>
                  <Text style={styles.sugestao}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Campo de Destino */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Cidade de destino"
            value={destino} // Vinculado ao estado
            onChangeText={(text) => handleChange(text, 'destino')}
            onFocus={() => setCampoFocado('destino')}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
          />
          {sugestoesDestino.length > 0 && (
            <FlatList
              style={styles.sugestoes}
              data={sugestoesDestino}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selecionarSugestao(item, 'destino')}>
                  <Text style={styles.sugestao}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Campo de Vagas */}
        <TextInput
          style={styles.input}
          placeholder="Quantidade de vagas"
          value={vagas}
          onChangeText={setVagas}
          keyboardType="numeric"
        />

        {/* Botão Buscar */}
        <TouchableOpacity style={styles.button} onPress={buscarViagens}>
          <Text style={styles.buttonText}>Buscar Viagens</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    width: '100%',
  },
  sugestoes: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
  },
  sugestao: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
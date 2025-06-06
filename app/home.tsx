// home.tsx
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

type Localizacao = {
  nome: string;
  latitude: string;
  longitude: string;
};

const chaveAPI = 'pk.60997858859c4d9a1cf9c77d4b8dca83';

const buscarLocalizacoes = async (texto: string | number | boolean, limite = 10) => {
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/autocomplete.php?key=${chaveAPI}&q=${texto}&format=json&countrycodes=BR&limit=${limite}`
    );

    if (response.data && response.data.length > 0) {
      return response.data.map((item: { display_name: string; lat: any; lon: any; }) => {
        const nome = item.display_name || '';
        const partes = nome.split(',').map((parte: string) => parte.trim());
        const cidade = partes[0];
        let estado = partes.length > 3 ? partes[3] : '';

        if (estado && estado.includes('Estado de')) {
          estado = estado.replace('Estado de', '').trim();
        }

        return {
          nome: `${cidade}, ${estado}`,
          latitude: item.lat,
          longitude: item.lon,
        };
      });
    } else {
      console.log('Nenhum resultado encontrado para:', texto);
      return [];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao buscar localizações:', error.message);
    } else {
      console.error('Erro desconhecido ao buscar localizações:', error);
    }
  }
};

export default function HomeScreen() {
  const router = useRouter();



  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vagas, setVagas] = useState(1);
  const [sugestoesOrigem, setSugestoesOrigem] = useState<Localizacao[]>([]);
  const [sugestoesDestino, setSugestoesDestino] = useState<Localizacao[]>([]);
  const [mostrarSugestoesOrigem, setMostrarSugestoesOrigem] = useState(false);
  const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const carregando = useRef(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const buscarCidades = async (texto: string, tipo: string) => {
    if (texto.trim() === '') return;
    if (carregando.current) return;

    try {
      carregando.current = true;
      const resultados = await buscarLocalizacoes(texto, 10);
      if (tipo === 'origem') {
        setSugestoesOrigem(resultados);
        setMostrarSugestoesOrigem(true);
      } else {
        setSugestoesDestino(resultados);
        setMostrarSugestoesDestino(true);
      }
    } catch (err) {
      console.error("Erro ao buscar localizações:", err);
    } finally {
      carregando.current = false;
    }
  };

  const handleChange = useCallback((text: string, tipo: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (tipo === 'origem') {
      setOrigem(text);
      if (text === '') {
        setMostrarSugestoesOrigem(false);
      }
    } else {
      setDestino(text);
      if (text === '') {
        setMostrarSugestoesDestino(false);
      }
    }
    debounceTimeout.current = setTimeout(() => {
      buscarCidades(text, tipo);
    }, 700);
  }, []);

  const selecionarSugestao = (item: Localizacao, tipo: string) => {
    if (tipo === 'origem') {
      setOrigem(item.nome);
      setMostrarSugestoesOrigem(false);
    } else {
      setDestino(item.nome);
      setMostrarSugestoesDestino(false);
    }
    Keyboard.dismiss();
  };

  const fecharSugestoes = () => {
    setMostrarSugestoesOrigem(false);
    setMostrarSugestoesDestino(false);
    Keyboard.dismiss();
  };

  const buscarViagens = () => {
    router.push('/viagens');
  };

  const aumentarVagas = () => {
    setVagas(prev => prev < 8 ? prev + 1 : 8);
  };

  const diminuirVagas = () => {
    setVagas(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <TouchableWithoutFeedback onPress={fecharSugestoes}>
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
              source={require('../assets/images/in.png')}
              style={styles.logo}
            />
          )}

          <View style={styles.formContainer}>
            <Text style={styles.title}>Where to today?</Text>
            <Text style={styles.subtitle}>Escolha para onde você quer ir</Text>

            {/* Campo de Origem */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Saindo de"
                placeholderTextColor="#aaa"
                value={origem}
                onChangeText={(text) => handleChange(text, 'origem')}
                onFocus={() => {
                  setMostrarSugestoesOrigem(true);
                  setMostrarSugestoesDestino(false);
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {mostrarSugestoesOrigem && sugestoesOrigem.length > 0 && (
                <Pressable
                  style={styles.sugestoesContainer}
                  onStartShouldSetResponder={() => true}
                >
                  <ScrollView
                    style={styles.sugestoes}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="always"
                  >
                    {sugestoesOrigem.map((item, index) => (
                      <TouchableOpacity
                        key={index.toString()}
                        onPress={() => selecionarSugestao(item, 'origem')}
                      >
                        <Text style={styles.sugestao}>{item.nome}</Text>
                      </TouchableOpacity>
                    ))}

                  </ScrollView>
                  <TouchableOpacity
                    style={styles.fecharSugestoes}
                    onPress={() => setMostrarSugestoesOrigem(false)}
                  >
                    <Text style={styles.fecharTexto}>Voltar</Text>
                  </TouchableOpacity>
                </Pressable>
              )}
            </View>

            {/* Campo de Destino */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Indo para"
                placeholderTextColor="#aaa"
                value={destino}
                onChangeText={(text) => handleChange(text, 'destino')}
                onFocus={() => {
                  setMostrarSugestoesDestino(true);
                  setMostrarSugestoesOrigem(false);
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {mostrarSugestoesDestino && sugestoesDestino.length > 0 && (
                <Pressable
                  style={styles.sugestoesContainer}
                  onStartShouldSetResponder={() => true}
                >
                  <ScrollView
                    style={styles.sugestoes}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="always"
                  >
                    {sugestoesDestino.map((item, index) => (
                      <TouchableOpacity
                        key={index.toString()}
                        onPress={() => selecionarSugestao(item, 'destino')}
                      >
                        <Text style={styles.sugestao}>{item.nome}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    style={styles.fecharSugestoes}
                    onPress={() => setMostrarSugestoesDestino(false)}
                  >
                    <Text style={styles.fecharTexto}>Voltar</Text>
                  </TouchableOpacity>
                </Pressable>
              )}
            </View>

            {/* Campo de Data */}
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text style={{ color: data ? '#000' : '#aaa' }}>
                  {data ? new Date(data).toLocaleDateString('pt-BR') : 'Data'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={data ? new Date(data) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setData(selectedDate.toISOString());
                  }}
                />
              )}
            </View>

            {/* Campo de Vagas */}
            <View style={styles.vagasContainer}>
              <TouchableOpacity
                onPress={diminuirVagas}
                style={styles.vagasBotao}
                disabled={vagas <= 1}
              >
                <Text style={[styles.vagasLabel, vagas <= 1 && styles.disabled]}>-</Text>
              </TouchableOpacity>

              <View style={styles.vagasDisplay}>
                <Text style={styles.vagasNumero}>{vagas}</Text>
              </View>

              <TouchableOpacity
                onPress={aumentarVagas}
                style={styles.vagasBotao}
                disabled={vagas >= 8}
              >
                <Text style={[styles.vagasLabel, vagas >= 8 && styles.disabled]}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Botão Buscar */}
            <TouchableOpacity
              style={styles.botao}
              onPress={() => router.push({
                pathname: '/viagens',
                params: {
                  origem: origem,
                  destino: destino,
                  data: data
                }
              })}
            >
              <Text style={styles.textoBotao}>Buscar Viagem</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    overflow: 'hidden',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
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
  inputWrapper: {
    position: 'relative',
    marginBottom: 24,
  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  sugestoesContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    zIndex: 10,
    elevation: 5,
  },
  sugestoes: {
    maxHeight: 200,
  },
  sugestao: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fecharSugestoes: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  fecharTexto: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  vagasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'right',
    marginBottom: 50,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  vagasBotao: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  vagasLabel: {
    fontSize: 20,
    color: '#111',
  },
  vagasDisplay: {
    minWidth: 50,
    alignItems: 'center',
  },
  vagasNumero: {
    fontSize: 16,
  },
  disabled: {
    color: '#ccc',
  } as TextStyle,
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
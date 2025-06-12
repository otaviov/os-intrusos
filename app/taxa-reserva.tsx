import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function TaxaServico() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Titulo principal (topo) */}
                <Text style={styles.tituloPrincipal}>Sobre o cálculo das Reservas</Text>
                {/* Descrição sobre a taxa de serviços */}
                <Text style={styles.paragrafo}>
                    Aqui, o preço que você vê é o preço final que paga. Simples assim! {'\n'}
                    Esse valor já inclui todos os custos, não há taxas extras ou surpresas
                </Text>
                {/* Titulo do porque exite uma taxa */}
                <Text style={styles.subtitulo}>Como é calculado o valor da sua viagem?</Text>
                {/* descrição da taxa */}
                <Text style={styles.paragrafo}>No nosso aplicativo, o preço
                    da sua reserva é calculado de forma simples e
                    transparente. Veja abaixo como funciona:
                </Text>

                {/* Lista de itens */}
                <View style={styles.listaItem}>
                    <Image source={require('../assets/images/real.png')} style={styles.iconeItem} />
                    <Text style={styles.itemTexto}>
                        <Text style={styles.itemDestaque}>Preço base da viagem</Text>
                        {"\n"}
                        Cada rota possui um valor fixo definido pela central
                        (ex: Carpina → Recife = Valor X por passageiro).
                    </Text>
                </View>

                <View style={styles.listaItem}>
                    <Image source={require('../assets/images/presente.png')} style={styles.iconeItem} />
                    <Text style={styles.itemTexto}>
                        <Text style={styles.itemDestaque}>Sem surpresas</Text>
                        {"\n"}
                        • Nenhuma taxa escondida{'\n'}
                        • Pagamento simplificado {'\n'}
                        • Nada muda depois do agendamento
                    </Text>
                </View>

                <View style={styles.listaItem}>
                    <Image source={require('../assets/images/calculadora.png')} style={styles.iconeItem} />
                    <Text style={styles.itemTexto}>
                        <Text style={styles.itemDestaque}>Cálculo para múltiplas reservas:</Text>
                        {"\n"}
                        Se você reservar vagas para mais de uma pessoa, 
                        o valor total será a soma dos preços individuais 
                        (já incluindo a taxa): {'\n'}
                        • 3 × R$ 20,00 (preço base) = R$ 60,00 {'\n'}
                        • Total a pagar: R$ 60,00
                    </Text>
                </View>

                <View style={styles.listaItem}>
                    <Image source={require('../assets/images/compromisso.png')} style={styles.iconeItem} />
                    <Text style={styles.itemTexto}>
                        <Text style={styles.itemDestaque}>
                            Nosso Compromisso
                        </Text>
                        {"\n"}
                        Queremos que você sinta segurança desde o primeiro toque no aplicativo. 
                        Por isso: {'\n'}
                        • Todos os valores são calculados automaticamente {'\n'}
                        • As rotas têm preços fixos e claros {'\n'}
                        • Qualquer dúvida, nossa central responde rápido
                    </Text>
                </View>

                {/* Link para Política */}
                <View style={styles.poliCancelamento}>
                    <Text style={styles.noLink}>Saiba mais sobre nossa</Text>
                    <TouchableOpacity>
                        <Text style={styles.link}> política de cancelamento</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 24,
        paddingBottom: 100,
    },
    tituloPrincipal: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 25,
        marginVertical: 30,
    },
    subtitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 15,
    },
    paragrafo: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 25,
        color: '#828282',
        marginBottom: 30,
    },
    listaItem: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    iconeItem: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    itemTexto: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#828282',
    },
    itemDestaque: {
        fontWeight: 'bold',
        color: '#1E293B',
    },
    poliCancelamento: {
        flexDirection: 'row',

    },
    noLink: {
        color: '#1E293B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        fontSize: 16,
        color: '#3B82F6',
        fontWeight: 'bold',
    },
});
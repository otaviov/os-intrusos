import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function TaxaServico() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Titulo principal (topo) */}
                <Text style={styles.tituloPrincipal}>Sobre a taxa de serviço</Text>
                {/* Descrição sobre a taxa de serviços */}
                <Text style={styles.paragrafo}>
                    Nosso objetivo é oferecer uma solução eficiente,
                    acessível e sem mensalidades para passageiros
                    e motoristas. Para tornar isso possível e manter o
                    sistema sustentável, aplicamos uma taxa de serviço
                    de 10% sobre o valor de cada viagem realizada.
                    Essa taxa já está inclusa no preço final exibido
                    ao passageiro sem cobranças surpresa
                </Text>
                {/* Titulo do porque exite uma taxa */}
                <Text style={styles.subtitulo}>Por que existe essa taxa?</Text>
                {/* descrição da taxa */}
                <Text style={styles.paragrafo}>A taxa de serviço é fundamental
                    para garantir que o aplicativo continue
                    funcionando bem e evoluindo.
                    Veja abaixo para onde vai esse valor:
                </Text>

                {/* Lista de itens */}
                <View style={styles.listaItem}>
                   <Image source={require('../assets/images/manutencao.png')} style={styles.iconeItem} />
                    <Text style={styles.itemTexto}>
                        <Text style={styles.itemDestaque}>Manutenção do Aplicativo</Text>
                        {"\n"}
                        Atualizações regulares, correções de bugs 
                        e compatibilidade com novas versões 
                        dos sistemas operacionais
                    </Text>
                </View>

                <View style={styles.listaItem}>
                   <Image source={require('../assets/images/servidores.png')} style={styles.iconeItem} />
                    <Text style={styles.itemTexto}>
                        <Text style={styles.itemDestaque}>Hospedagem e Segurança dos Dados</Text>
                        {"\n"}
                        Todos os dados de rotas, reservas e perfis são
                        armazenados em servidores seguros,
                        com alta disponibilidade
                    </Text>
                </View>

                <View style={styles.listaItem}>
                    <Image source={require('../assets/images/apoio-suporte.png')} style={styles.iconeItem} />
                    <Text style={styles.itemTexto}>
                        <Text style={styles.itemDestaque}>Suporte Técnico ao Usuário</Text>
                        {"\n"}
                        Atendimento para esclarecer dúvidas, resolver problemas
                        técnicos e auxiliar tanto usuários quanto a equipe da central.
                    </Text>
                </View>

                <View style={styles.listaItem}>
                    <Image source={require('../assets/images/melhorar.png')} style={styles.iconeItem} />
                    <Text style={styles.itemTexto}>
                        <Text style={styles.itemDestaque}>Melhorias Contínuas</Text>
                        {"\n"}
                        A taxa permite o desenvolvimento de novas funcionalidades,
                        com base no uso real e no feedback dos usuários.
                    </Text>
                </View>

                {/* Outro sub */}
                <Text style={styles.subtitulo}>Modelo sustentável e sem mensalidades</Text>

                <Text style={styles.paragrafo}>
                    Com esse modelo, conseguimos manter a operação do sistema sem
                    cobrar mensalidades ou taxas fixas dos passageiros
                    ou da central. Ou seja, o sistema "se paga sozinho",
                    conforme mais viagens forem realizadas tornando o projeto
                    viável, leve e escalável para todos.
                </Text>

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
        padding: 25,
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
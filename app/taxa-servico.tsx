import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';


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




              </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 25,
        paddingBottom: 100,
    }


});
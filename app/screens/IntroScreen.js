// app/screens/IntroScreen.js
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function IntroScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // ou qualquer que seja a tela principal
    }, 4000); // duração da animação antes de ir pra Home

    return () => clearTimeout(timer);
  }, []);

  return (
      <View style={styles.container}>
      <LottieView
        source={require('../animations/intro_carro_homem.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // ou branco, ou o que quiser
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
});
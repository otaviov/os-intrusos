import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      initialRouteName="intro" // <- força a primeira tela
      screenOptions={{ headerShown: false }}
    />
  );
}
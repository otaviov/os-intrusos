import { Stack } from 'expo-router';



export default function Layout() {
  return (
    <Stack
    initialRouteName="intro"
    screenOptions={{ headerShown: false }}
    />
  );
}

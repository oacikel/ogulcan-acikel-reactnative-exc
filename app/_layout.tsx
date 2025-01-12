import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: "minimal", // further reading see https://reactnavigation.org/docs/upgrading-from-6.x/#headerbacktitlevisible-is-removed-in-favor-of-headerbackbuttondisplaymode-in-stack-and-native-stack-navigators
      }}
    >
    </Stack>
  );
};

export default Layout;
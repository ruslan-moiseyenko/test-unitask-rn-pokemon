import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { PersistGate } from "redux-persist/integration/react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { persistor, store } from "@/store";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Pokédex",
              headerStyle: {
                backgroundColor: "#f3ce43"
              },
              headerTintColor: "#fff"
            }}
          />
          <Stack.Screen
            name="[name]"
            options={{
              title: "Pokemon Details",
              headerStyle: {
                backgroundColor: "#f3ce43"
              },
              headerTintColor: "#fff"
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}

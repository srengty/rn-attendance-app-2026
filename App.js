import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import IntroScreen from "./IntroScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { createStaticNavigation, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const rootRoutes = createNativeStackNavigator({
  screens: {
    Home: {
      screen: IntroScreen,
      options: { title: "Welcome" },
    },
  },
});
const MainNav = createStaticNavigation(rootRoutes);
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialScreen, setInitialScreen] = useState("Login");
  // const [imageLoadTime, setImageLoadTime] = useState(0);
  const handleImageLoad = () => {
    const endTime = performance.now();
    // setImageLoadTime(endTime - 0);
    console.log(`Image loaded in ${endTime - 0} ms`);
  };
  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setInitialScreen("Home");
        } else {
          setInitialScreen("Login");
        }
      } catch (error) {
        console.error("Error checking auth token:", error);
        setInitialScreen("Login");
      }
    };
    checkAuthToken();
    setTimeout(() => {
      setIsLoading(false);
      SplashScreen.hide();
    }, 3500);
  }, []);
  if(isLoading){
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Text>Add Your Own Custom SplashScreen</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (<NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen
          name="Home"
          component={IntroScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
      </Stack.Navigator>
    </NavigationContainer>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const ShieldIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"
      fill={color}
    />
  </Svg>
);

import React from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
// Import custom component (you'll need to create this)
import FeatureHighlight from "./components/FeatureHighlight";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const IntroScreen = () => {
  const handleGetStarted = () => {
    // Add navigation logic here
  };
  const handleSignIn = () => {
    // Add navigation logic here
  };
  const navigator = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3b86c3" />
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          source={require("./assets/icon.png")}
          style={[styles.logo,{alignSelf: 'flex-start'}]}
          resizeMode="contain"
        />
        <Button title="Logout" onPress={() => {
          AsyncStorage.removeItem("authToken").then(() => {
            navigator.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          });
        }} />
      </View>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require("./assets/temple.jpg")}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.mainTitle}>Welcome to MyApp</Text>
          <Text style={styles.subtitle}>
            Discover amazing features that will transform your daily routine
          </Text>
        </View>
      </View>
      {/* Feature Highlights */}
      <View style={styles.featuresSection}>
        <FeatureHighlight
          icon="rocket"
          title="Fast & Efficient"
          description="Get things done quickly with our streamlined interface"
        />
        <FeatureHighlight
          icon="shield"
          title="Secure & Private"
          description="Your data is protected with enterprise-level security"
          color="#7ED321"
        />
      </View>
      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleSignIn}>
          <Text style={styles.secondaryButtonText}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default IntroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 40,
  },
  heroSection: {
    position: "relative",
    height: 250,
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 20,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 15,
  },
  ctaSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: "#3b86c3",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: "#3b86c3",
    fontSize: 14,
  },
});

import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { Button, Text, TextInput, View } from "react-native";
/*
1. Fill in username and password fields
2. Verify with api call
3. On success, save auth token and navigate to home screen
4. On failure, show error message "Invalid credentials, please try again."
*/
export default function LoginScreen(){
    const navigator = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleLogin = async () => {
        try {
            const response = await fetch("http://192.168.1.199:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { email:username, password: password, device_name:'iphone17' }),
            });
            /* const response = {
                ok: true, 
                json: async () => ({ token: "dummy-auth-token" })
            }; */ // Mock response for demonstration
            const data = await response.json();
            if (response.ok) {
                // Save auth token (for simplicity, using AsyncStorage here)
                await AsyncStorage.setItem("authToken", data.token);
                // Navigate to home screen (assuming a navigate function is available)
                navigator.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                });
                console.log("Login successful, navigating to home screen.");
            }
            else {
                setErrorMessage("Invalid credentials, please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
        }
    };
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            />
            {errorMessage ? <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";

const AccountScreen = ({ navigation }) => {
  const { user, login, signup, logout } = useAuth();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async () => {
    console.log("Logging in with:", Email, password);
    await login(Email, password);
    if (user) {
      console.log("Login successful, navigating to HomeScreen");
      navigation.navigate("HomeScreen");
    } else {
      console.log("Login failed");
    }
  };

  const handleSignup = async () => {
    console.log("Signing up with:", first_name, last_name, Email, password);
    await signup(first_name, last_name, Email, password);
    if (user) {
      console.log("Signup successful, navigating to HomeScreen");
      navigation.navigate("HomeScreen");
    } else {
      console.log("Signup failed");
    }
  };

  const handleLogout = async () => {
    console.log("Logging out");
    await logout();
  };

  useEffect(() => {
    if (user) {
      console.log("User is logged in, navigating to HomeScreen");
      navigation.navigate("HomeScreen");
    }
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text style={styles.welcomeText}>Welcome, {user.username}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Text style={styles.header}>{isSignup ? "Sign Up" : "Login"}</Text>
          {isSignup && (
            <>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={first_name}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={last_name}
                onChangeText={setLastName}
              />
            </>
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={Email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button
            title={isSignup ? "Sign Up" : "Login"}
            onPress={isSignup ? handleSignup : handleLogin}
          />
          <Button
            title={isSignup ? "Switch to Login" : "Switch to Sign Up"}
            onPress={() => setIsSignup(!isSignup)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default AccountScreen;

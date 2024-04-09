import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
  Dimensions,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  ToastAndroid
} from "react-native";


import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    storeAsync();
  }, []);
  const storeAsync = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    
    if (user_id) {
      navigation.navigate("Bottom");
    }
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };
  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onSubmitFormHandler = async (event) => {

      if(!email){
        ToastAndroid.show("Please enter your email id", ToastAndroid.SHORT);
      }
      else if(!password){
        ToastAndroid.show("Please enter your password", ToastAndroid.SHORT);
      }
else{
    setIsLoading(true)
    try {
     
      const response = await axios.post(
        `https://computerworldgroup.com/track/api/login`,
        {
          email,
          password,
        },
        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );
      
      if (response.status === 200) {
        setIsLoading(false)
        await AsyncStorage.setItem("user_id", response.data.User.id);

        navigation.navigate("Bottom");

        // setEmail("");
        // setPassword("");
      } 
      // else {
      //   throw new Error("An error has occurred");
      // }
    } catch (error) {
     
      alert("Please Enter Valid Email id and Password");
      setIsLoading(false)
      navigation.navigate("Login");
    }
  }
  };

  return (
    !isLoading ?
 
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/chart.jpg")}
        style={
          {
            //justifyContent: "center",
          }
        }
      >
        <View
          style={{
            width: 150,
            height: 150,

            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ fontWeight: 900, fontSize: 30, padding: 10 }}>
            Login Here
          </Text>
        </View>
        <LinearGradient
          style={{
            backgroundColor: "red",
            height: Dimensions.get("window").height * 1,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
          // Button Linear Gradient
          colors={["#f39519", "#0258a2", "#197bcf"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 1 }}
        >
          <View>
            <TextInput
              style={{
                borderColor: "#000",
                borderWidth: 1,
                height: 40,
                padding: 8,
                marginTop: 30,
                borderRadius: 10,
                width: Dimensions.get("window").width * 0.8,
                alignSelf: "center",
              }}
              placeholder="Enter Your Email"
              value={email}
              onChangeText={onChangeEmailHandler}
            />
            <TextInput
              style={{
                borderColor: "#000",
                borderWidth: 1,
                height: 40,
                padding: 8,
                marginTop: 10,
                borderRadius: 10,
                width: Dimensions.get("window").width * 0.8,
                alignSelf: "center",
              }}
              placeholder="Enter Your Password"
              value={password}
              onChangeText={onChangePasswordHandler}
            />
            <TouchableOpacity onPress={onSubmitFormHandler}>
              <LinearGradient
                style={{
                  height: 40,
                  padding: 8,
                  marginTop: 10,
                  borderRadius: 10,
                  width: Dimensions.get("window").width * 0.8,
                  alignSelf: "center",
                  alignItems: "center",
                }}
                // Button Linear Gradient
                colors={["#4c669f", "#3467eb", "#192f6a"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                
                <Text style={{ color: "#ffffff" }}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
      
  :
  <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
  <ActivityIndicator size={50} color="green"/>
  
  </View>
  );
};

export default Login;

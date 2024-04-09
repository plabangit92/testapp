import React, { useEffect, useState } from "react";

import {
  
  AntDesign,
} from "@expo/vector-icons";
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
  StatusBar,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const EditProfile = ({ navigation }) => {
  const [employee_id, setEmployeeId] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeFullName = (fullName) => {
    setFullName(fullName)

  }
  const onChangeMobile = (mobile) => {
    setMobile(mobile)

  }
  const onChangeAddress = (address) => {
    setAddress(address)

  }
  

  const getProfile = async () => {
    setIsLoading(true)
    try {
      const savedUser_id = await AsyncStorage.getItem("user_id");
      const employee_id = JSON.parse(savedUser_id);
      setEmployeeId(employee_id);
      const response = await axios.get(
        `https://computerworldgroup.com/track/api/profile?employee_id=${employee_id}`,

        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );
      

      if (response.status === 200) {
        setIsLoading(false)
        setFullName(response.data.employee_details[0].employee_name);
        setMobile(response.data.employee_details[0].employee_mobile);
        setAddress(response.data.employee_details[0].address);
       
        navigation.navigate("EditProfile");
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, [employee_id]);



  const updateProfile = async ()=>{
    
    if(!fullName){
      
      ToastAndroid.show("Please enter your full name", ToastAndroid.SHORT);
    }
    else if(!mobile){
      ToastAndroid.show("Please enter your mobile no", ToastAndroid.SHORT);
    }
    

    else if(!address){
      ToastAndroid.show("Please enter your address", ToastAndroid.SHORT);
  } else{
    setIsLoading(true)
    try {
      
      const response = await axios.post(
        `https://computerworldgroup.com/track/api/profile`,
        {
          employee_id,
          fullName,
          mobile,
          address
         
        },
        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );
      
      if (response.status === 200) {
        setIsLoading(false)
        ToastAndroid.show("Profile Updated Successfully", ToastAndroid.SHORT);
        navigation.navigate("Profile");
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setIsLoading(false)
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }

  }
    
  }



  return (

    !isLoading ?
    fullName!==null?
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",

            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <LinearGradient
            style={{
              height: 40,

              width: Dimensions.get("window").width * 1,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
            colors={["#4c669f", "#3467eb", "#192f6a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: 700,
                fontSize: 20,
                padding: 5,
                color: "#fff",
              }}
            >
              Edit Profile
            </Text>
            <Text> </Text>
          </LinearGradient>
        </View>

        <View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 18, padding: 10 }}>
            Full Name
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
             
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.8,
              alignSelf: "center",
            }}
            placeholder="Enter Your Full Name"
            value={fullName}
            onChangeText={onChangeFullName}
          />
        </View>

        <View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 18, padding: 10 }}>
            Mobile No
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
              //marginTop: 10,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.8,
              alignSelf: "center",
            }}
            placeholder="Enter Your Mobile No"
            keyboardType="numeric"
            value={mobile}
            onChangeText={onChangeMobile}
          />
        </View>
        <View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 18, padding: 10 }}>
            Address
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,

              borderRadius: 10,
              width: Dimensions.get("window").width * 0.8,
              alignSelf: "center",
            }}
            placeholder="Enter Your Address"
            value={address}
            onChangeText={onChangeAddress}
          />
        </View>

        <View>
          <TouchableOpacity onPress={updateProfile}>
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
              <Text style={{ color: "#ffffff" }}>Update Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

:
<View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
<Text> Can't connect to server ! </Text>
</View>
:
<View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
<ActivityIndicator size={50} color="green"/>

</View>
  );
};

export default EditProfile;

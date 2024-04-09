import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
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
  ToastAndroid
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
const ChangePassword = ({ navigation }) => {
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setnewPassword] = useState("");
   const [confirmPassword, setconfirmPassword] = useState("");
   const [employee_id, setEmployeeId] = useState("");


  const onChangeOldPassword = (oldPassword)=>{
    
    setOldPassword(oldPassword);
    
  }
  const onChangeNewPassword = (newPassword)=>{
    setnewPassword(newPassword);
    
  }
  const onChangeConfirmPassword = (confirmPassword)=>{
    setconfirmPassword(confirmPassword);
    
  }
  const updatePassword = async ()=>{

    if(!oldPassword){
      ToastAndroid.show("Please enter Old Password", ToastAndroid.SHORT);
    }
    else if(!newPassword){
      ToastAndroid.show("Please enter New Password", ToastAndroid.SHORT);
    }
    

    else if(!confirmPassword){
      ToastAndroid.show("Please enter Confirm Password", ToastAndroid.SHORT);
  } else if(newPassword!=confirmPassword){
    ToastAndroid.show("New Password and Confirm Password must be Same", ToastAndroid.SHORT);
  }else{
    
    try {
      const savedUser_id = await AsyncStorage.getItem("user_id");
      const employee_id = JSON.parse(savedUser_id);
    
      setEmployeeId(employee_id);
      const response = await axios.post(
        `https://computerworldgroup.com/track/api/ChangePassword`,
        {
          employee_id,
          oldPassword,
          confirmPassword,
         
        },
        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );
      
      if (response.status === 200) {
        
        ToastAndroid.show("Password Updated Successfully", ToastAndroid.SHORT);
        navigation.navigate("Profile");
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      //console.log(error);
      ToastAndroid.show("Old Password is invalid", ToastAndroid.SHORT);
    }

  }
    
  }

  return (
    <ScrollView>
      <StatusBar />
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
              Change Password
            </Text>
            <Text> </Text>
          </LinearGradient>
        </View>

        {/* <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop:10 }}>
          <Text style={{ color: "#32a8a4" }}>
            Home&nbsp;
            <FontAwesome5 name="greater-than" size={12} color="black" />
            &nbsp;Profile&nbsp;
            <FontAwesome5 name="greater-than" size={12} color="black" />
            &nbsp;Change Password&nbsp;
          </Text>
        </View> */}

        <View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 18, padding: 10 }}>
            Old Password
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
            placeholder="Enter Your Old Password"
            value={oldPassword}
            onChangeText={onChangeOldPassword}
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
            New Password
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
            placeholder="Enter Your New Password"
            value={newPassword}
            onChangeText={onChangeNewPassword}
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
            Confirm Password
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
            placeholder="Enter Your Confirm Password"
            
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
          />
        </View>

        <View>
          <TouchableOpacity onPress={updatePassword}>
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
              <Text style={{ color: "#ffffff" }}>Update Password</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

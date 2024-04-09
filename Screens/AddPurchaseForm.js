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
const AddPurchaseForm = ({ navigation }) => {
  const [employee_id, setEmployeeId] = useState("");
  const [item_name, setitem_name] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  //const [isLoading, setIsLoading] = useState(false);

  const onChangeItemName = (item_name) => {
    setitem_name(item_name)

  }
  const onChangeQuantity = (quantity) => {
    setquantity(quantity)

  }
  const onChangePrice = (price) => {
    setprice(price)

  }
  

//   const getProfile = async () => {
//     setIsLoading(true)
//     try {
//       const savedUser_id = await AsyncStorage.getItem("user_id");
//       const employee_id = JSON.parse(savedUser_id);
//       setEmployeeId(employee_id);
//       const response = await axios.get(
//         `https://computerworldgroup.com/track/api/profile?employee_id=${employee_id}`,

//         { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
//       );
      

//       if (response.status === 200) {
//         //setIsLoading(false)
//         setFullName(response.data.employee_details[0].employee_name);
//         setMobile(response.data.employee_details[0].employee_mobile);
//         setAddress(response.data.employee_details[0].address);
       
//         navigation.navigate("EditProfile");
//       } else {
//         throw new Error("An error has occurred");
//       }
//     } catch (error) {
//       //setIsLoading(false)
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getProfile();
//   }, [employee_id]);



  const addInitialPurchase = async ()=>{
    
    if(!item_name){
      
      ToastAndroid.show("Please enter item name", ToastAndroid.SHORT);
    }
    else if(!quantity){
      ToastAndroid.show("Please enter quantity", ToastAndroid.SHORT);
    }
    

    else if(!price){
      ToastAndroid.show("Please enter price", ToastAndroid.SHORT);
  } else{
    //setIsLoading(true)
    try {
        const savedUser_id = await AsyncStorage.getItem("user_id");
              const employee_id = JSON.parse(savedUser_id);
              setEmployeeId(employee_id);
      const response = await axios.post(
        `https://computerworldgroup.com/track/api/purchase/initialpurchase`,
        {
          employee_id,
          item_name,
          quantity,
          price
         
        },
        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );
      
      if (response.status === 200) {
        //setIsLoading(false)
        ToastAndroid.show("Item Added Successfully", ToastAndroid.SHORT);
      
        {navigation.navigate("NewPurchase")}
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      //setIsLoading(false)
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }

  }
    
  }



  return (

    
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
              Add Purchase Form
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
            Item Name
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
            placeholder="Enter Item Name"
          
            onChangeText={onChangeItemName}
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
            Quantity
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
            placeholder="Enter Quantity"
            keyboardType="numeric"
           
            onChangeText={onChangeQuantity}
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
            Price
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
            placeholder="Enter Price"
            keyboardType="numeric"
            onChangeText={onChangePrice}
          />
        </View>

        <View>
          <TouchableOpacity onPress={addInitialPurchase}>
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
              <Text style={{ color: "#ffffff" }}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>




  );
};

export default AddPurchaseForm;

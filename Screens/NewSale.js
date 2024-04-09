import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
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
  FlatList
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";



const NewSale = ({ navigation }) => {
 
  const [customer_name, setCustomerName] = useState("");
  const [getData, setGetData] = useState([]);
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const onchangeCustomerName = (customer_name) => {
    setCustomerName(customer_name);
  };

  const fetchInitialSale = async () => {
    setIsLoading(true)
    try {
      const savedUser_id = await AsyncStorage.getItem("user_id");
      const employee_id = JSON.parse(savedUser_id);
      setEmployeeId(employee_id);
      const response = await axios.get(
        `https://computerworldgroup.com/track/api/sale/initialsale?employee_id=${employee_id}`,

        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );

      if (response.status === 200) {
        console.log(response);
        setGetData(response.data.get_initialsale);
        
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setGetData([]);
      
    }
  };

  

  const submitSale = async () => {
    if(!customer_name){
      
      ToastAndroid.show("Please enter customer name", ToastAndroid.SHORT);
    }
else{

    try {
      const savedUser_id = await AsyncStorage.getItem("user_id");
      const employee_id = JSON.parse(savedUser_id);
      setEmployeeId(employee_id);
      const response = await axios.post(
        `https://computerworldgroup.com/track/api/sale`,
        {
          employee_id,
          customer_name,
          item_name,
          quantity,
          price,
        },
        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );

      if (response.status === 200) {
        
        ToastAndroid.show("Item Sold Successfully", ToastAndroid.SHORT);
        navigation.navigate("Sale");
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log(error);
    }
  }
  };


  useEffect(() => {
    fetchInitialSale();
  }, [getData]);
  useEffect(() => {
    
  }, [getData]);
  return (
    <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }} >
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
              New Sale
            </Text>
            <Text> </Text>
          </LinearGradient>
        </View>
        <ScrollView horizontal={true} style={{ width: "100%" }}>
        <FlatList
          data={getData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                borderWidth: 2,
                margin: 4,
                shadowColor: "#03fc07",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 200,
              }}
            >
              <View style={{ padding: 10, flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
              <Text>Item Name</Text>
                <Text>{item.item_name}</Text>
              </View>
              <View style={{ padding: 10,flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
              <Text>Quantity</Text>
                <Text>{item.quantity}</Text>
              </View>
              <View style={{ padding: 10,flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
              <Text>Price</Text>
                <Text>{item.price}</Text>
              </View>
              <View style={{ padding: 10,flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
              <Text>Total Price</Text>
                <Text>{item.total_price}</Text>
              </View>
            </View>
          )}
        />
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddSaleForm")}
          >
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
              colors={["#4c669f", "#03fc2c", "#192f6a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#ffffff" }}>
                <Entypo name="plus" size={16} color="white" /> Add Item
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 18, padding: 10 }}>
            Customer Name
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
              //marginTop: 10,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.9,
              alignSelf: "center",
            }}
            value={customer_name}
            onChangeText={onchangeCustomerName}
            placeholder="Enter Customer Name"
          />
        </View>

        <View>
          <TouchableOpacity onPress={submitSale}>
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
              <Text style={{ color: "#ffffff" }}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewSale;

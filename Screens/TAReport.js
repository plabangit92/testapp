import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
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
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const TAReport = () => {
  const[from,setFrom] = useState([]);
  const[to, setTo] = useState([]);
  const[expense,setExpense] = useState([]);
  const[employee_id,setEmployeeId] = useState([]);
  const [rows,setRows] = useState([])
  
const onchangeFrom = (from) =>{

  setFrom(from)
}
const onchangeTo = (to) =>{
  setTo(to);
}
const onchangeExpense = (expense) =>{
  setExpense(expense)
}
 const SaveTAreport = async() =>{

  console.log('start');
  console.log(from);
  console.log('end');


 if(!from)
   ToastAndroid.show('Please enter from location',ToastAndroid.SHORT)
 
 else if(!to)
  ToastAndroid.show('Please enter to location',ToastAndroid.SHORT)

  else if(!expense)
  ToastAndroid.show('Please enter expense',ToastAndroid.SHORT)

 else{
  try {
    console.log('====================================');
    console.log(from);
    console.log('====================================');
    const savedUser_id = await AsyncStorage.getItem("user_id");
    const employee_id = JSON.parse(savedUser_id);
    setEmployeeId(employee_id);
    
    const response = await axios.post(
     
      `https://computerworldgroup.com/track/api/TAReport`,
     [ {
        employee_id:1,
        from:"halisahar",
        to:"kolkata",
        expense:100
        
      },
      {
        employee_id:2,
        from:"ee",
        to:"ee",
        expense:2
        
      } ],
      
      { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
    );
    

console.log('====================================');
console.log(response);
console.log('====================================');
    if (response.status ===200) {
     ToastAndroid.show('TA Report has been submitted successfully');
    } else {
      throw new Error("An error has occurred");
    }
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    //alert('Failed! Please try again later.')
  }
 }




  
 }
 
 const deleteRow = (number) => {
  setRows(rows.filter((item) => item.number !== number));
};
 

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
              alignSelf: "center",
              alignItems: "center",
            }}
            colors={["#4c669f", "#3467eb", "#192f6a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              style={{
                fontWeight: 700,
                fontSize: 20,
                padding: 5,
                color: "#fff",
              }}
            >
              Traveling Allowance
            </Text>
          </LinearGradient>
        </View>
         


        {/* <View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent:"space-between",
            padding:5,
            alignItems:"center",
            flexDirection:"row"
          }}
        >
          <View style={{ alignItems:"center" }}>
          <Text >
            From
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
              marginLeft:5,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.3,
             
            }}
            placeholder="Enter Source Location"
            onChangeText={onchangeFrom}
          
            
          />
        </View>
        <View style={{ alignItems:"center" }}>
          <Text >
            To
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
              marginLeft:5,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.3,
             
            }}
            placeholder="Enter Source Location"
            onChangeText={onchangeTo}
          
            
          />
        </View>
        <View style={{ alignItems:"center" }}>
          <Text >
            Expense
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
             marginLeft:5,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.3,
             
            }}
            placeholder="Enter Source Location"
            onChangeText={onchangeExpense}
          
            
          />
        </View>
        
        </View> */}
        {rows.map((item)=>(<View
          style={{
            height: Dimensions.get("window").height * 0.1,
            justifyContent:"space-between",
            padding:5,
            alignItems:"center",
            flexDirection:"row"
          }}
        >
          <View style={{ alignItems:"center" }}>
          <Text >
            From
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
              marginLeft:5,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.3,
              
             
            }}
            placeholder="Enter Source Location"
            onChangeText={()=>onchangeFrom(item.number)}
            key="{item}"
          
            
          />
        </View>
        <View style={{ alignItems:"center" }}>
          <Text >
            To
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
              marginLeft:5,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.3,
             
            }}
            placeholder="Enter Source Location"
            onChangeText={onchangeTo}
            key="{item}"
          
            
          />
        </View>
        <View style={{ alignItems:"center" }}>
          <Text >
            Expense
          </Text>

          <TextInput
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 40,
              padding: 8,
             marginLeft:5,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.2,
             
            }}
            placeholder="Enter Source Location"
            onChangeText={onchangeExpense}
            key="{item}"
          
            
          />
        </View>



        <View style={{ alignItems:"center" }}>
        <TouchableOpacity onPress={()=>deleteRow(item.number)} key="{item}" style={{ marginTop:8 }}>
            <LinearGradient
              style={{
                height: 40,
                padding: 8,
                marginTop: 10,
                borderRadius: 10,
                width: Dimensions.get("window").width * 0.1,
                alignSelf: "center",
                alignItems: "center",
              }}
              // Button Linear Gradient
              colors={["#9e0d0d", "#e31414", "#f04f4f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#ffffff" }}>-</Text>
            </LinearGradient>
          </TouchableOpacity>

          
        </View>
        
        </View>))}
        <View style={{ marginBottom:100 }}>
          <TouchableOpacity onPress={()=>setRows([...rows,{number:rows.length}])} >
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
              colors={["#4c669f", "#46db14", "#192f6a"]}
              start={{ x: 0, y: 2 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#ffffff" }}>+Add One</Text>
            </LinearGradient>
          </TouchableOpacity>
       
          <TouchableOpacity onPress={SaveTAreport}>
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

export default TAReport;

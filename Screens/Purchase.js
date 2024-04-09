import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
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
  FlatList,
  ActivityIndicator,
  
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Purchase = ({navigation}) => {
  
  const[employee_id, setEmployeeId] = useState("");
  const[getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPurchase = async () => {
    setIsLoading(true)
    try {
      const savedUser_id = await AsyncStorage.getItem("user_id");
      const employee_id = JSON.parse(savedUser_id);
      setEmployeeId(employee_id);
      
      const response = await axios.get(
       
        `https://computerworldgroup.com/track/api/purchase?employee_id=${employee_id}`,
        
        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );
      


      if (response.status === 200) {
        setIsLoading(false)
        setGetData(response.data.get_purchase)
      
      

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setGetData([]);
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getPurchase();
  }, []);

 
  return (
    !isLoading ?
    getData!==null?
       
    <ScrollView  nestedScrollEnabled={true} style={{ width: "100%" }}>
      <StatusBar/>
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
              Purchase
            </Text>
          </LinearGradient>
        </View>

        <View>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{marginLeft:5}} onPress={()=>navigation.navigate("NewPurchase")}>
            <LinearGradient
              style={{
                height: 40,
                padding: 8,
                marginTop: 10,
                borderRadius: 10,
                width: Dimensions.get("window").width * 0.4,
                //alignSelf: "center",
                //alignItems: "center",
              }}
              // Button Linear Gradient
              colors={["#4c669f", "#3467eb", "#192f6a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#ffffff" }}>
                <Feather name="plus-square" size={15} />&nbsp;
                New Purchase
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft:5,justifyContent:"center",alignItems:"right"}} onPress={getPurchase}>
            <LinearGradient
              style={{
                height: 30,
                padding: 6,
                marginTop: 10,
                borderRadius: 10,
                width: Dimensions.get("window").width * 0.1,
                //alignSelf: "center",
                alignItems: "center",
              }}
              // Button Linear Gradient
              colors={["#32a852", "#32a852", "#32a852"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
             
              <Feather name="refresh-ccw" size={16} color="black" />
              
            </LinearGradient>
          </TouchableOpacity>
          </View>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title >Sl No</DataTable.Title>
              <DataTable.Title >Sup Name</DataTable.Title>
              <DataTable.Title >Amount</DataTable.Title>
              {/* <DataTable.Title>Action</DataTable.Title> */}
            </DataTable.Header>
            <ScrollView horizontal={true} style={{ width: "100%" }}>
            <FlatList
        data={getData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
         
          <View style={{ padding: 16 }}>

      <DataTable.Row>
              <DataTable.Cell style={{ width: Dimensions.get("window").width * 0.3 }}>{item.id}</DataTable.Cell>
              <DataTable.Cell style={{ width: Dimensions.get("window").width * 0.3 }}>{item.supplier_name}</DataTable.Cell>
              <DataTable.Cell style={{ width: Dimensions.get("window").width * 0.3 }}>{item.total_price}</DataTable.Cell>
              {/* <DataTable.Cell>
                <TouchableOpacity  onPress={() => navigation.navigate("EditPurchase", item.id)}>
                <Feather name="edit" size={18} color="black" />
                </TouchableOpacity>
                <Feather name="trash" size={18} color="black" />
              </DataTable.Cell> */}
        </DataTable.Row>
            
           
          </View>
        )}
      />
          </ScrollView> 


           
          </DataTable>

          
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

export default Purchase;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 50,
    padding: 5,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
});

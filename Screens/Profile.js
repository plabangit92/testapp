import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
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
  Alert,
  ActivityIndicator
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
const Profile = ({ navigation }) => {
  const [gallery_permission,setGalleryPermission] = useState("");
  const [image, setImage] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [fullName, setfullName] = useState("");
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

 useEffect(() => {
    getUid();
    
  }, [uid]);

  useEffect(() => {

       getProfilePic();
     }, [uid]);





const getUid = async () => {
  try {
    const value = await AsyncStorage.getItem("user_id");

    if (value !== null) {

      setUid(JSON.parse(value));
      
    }
  } catch (e) {
   
    console.log("uid",e);
  }
};


const postImage = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append("employee_image", {
      uri: imageUri,
      name: "image0.jpg",
      type: "image/jpeg",
    });
    formData.append("employee_id", uid);

    const response = await axios.post(
      "https://computerworldgroup.com/track/api/profile_pic",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a",
        },
      }
    );

     console.log("POST Response:", response.data);

    // After successfully posting the image, fetch it from the server
    getProfilePic();
  } catch (error) {
    console.error("POST Error:", error);
  }
};





  const getProfilePic = async () => {
    setIsLoading(true)
    try {
      const savedUser_id = await AsyncStorage.getItem("user_id");
      const employee_id = JSON.parse(savedUser_id);
      setEmployeeId(employee_id);
      const response = await axios.get(
        `https://computerworldgroup.com/track/api/profile_pic?employee_id=${employee_id}`,

        { headers: { "x-api-key": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
      );
      
 
      if (response.status === 200) {

        setIsLoading(false)
        setImage(response.data.profile_pic);
        setfullName(response.data.employee_name);

       
       
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };
  

 
  

  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      postImage(result.assets[0].uri)
    }
  };

  const Logout =  () => {
    return Alert.alert(
      "Logout?",
      "Are You Sure To Log Out?",
      [
        {
        text: "Yes",
        onPress: async () => {
          try {
              const asyncitem = await AsyncStorage.clear();
              navigation.navigate("Login");
            } catch (error) {
              console.log(error);
            }
        },
        },
        {
          text: "No",
        },
      ]
    
    );
  };
  return (
    !isLoading ?
    image!==null?
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
            Profile
          </Text>
        </LinearGradient>
      </View>
      <ScrollView>
        <View
          style={{
            width: 150,
            height: 150,
            marginTop: 50,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
 {image ? (
              <Image source={{ uri: image }} style={{ width: "100%", height: "100%",borderRadius:100 }} />
            ):(
              <Image
            source={require("../assets/nouser.png")}
            style={{ width: "100%", height: "100%" }}
          />
            )}
       
          
             <TouchableOpacity style={{alignItems:"flex-end",top:-30}} onPress={pickImage}>
             <Entypo name="pencil" size={20} color="#3565a3" />
          </TouchableOpacity>
          
        </View>
        <View style={{ alignSelf: "center", justifyContent: "center" }}>
          <Text style={{ fontWeight: 700, fontSize: 20 }}>
            {fullName}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={{
            marginTop: 10,
            borderBottomColor: "#9df5ed",
            borderBottomWidth: 2,
            width: Dimensions.get("window").width * 1,
            elevation: 5,
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontWeight: 200, fontSize: 18, padding: 15 }}>
            <FontAwesome name="edit" size={18} color="black" />
            &nbsp; Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomColor: "#9df5ed",
            borderBottomWidth: 2,
            width: Dimensions.get("window").width * 1,
            elevation: 5,
            backgroundColor: "white",
            marginTop: 5,
          }}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={{ fontWeight: 200, fontSize: 18, padding: 15 }}>
            <MaterialCommunityIcons
              name="form-textbox-password"
              size={18}
              color="black"
            />
            &nbsp;Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomColor: "#9df5ed",
            borderBottomWidth: 2,
            width: Dimensions.get("window").width * 1,
            elevation: 5,
            backgroundColor: "white",
            marginTop: 5,
          }}
        >
          <Text style={{ fontWeight: 200, fontSize: 18, padding: 15 }}>
            <Entypo name="location-pin" size={18} color="black" />
            &nbsp;Visited Areas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomColor: "#9df5ed",
            borderBottomWidth: 2,
            width: Dimensions.get("window").width * 1,
            elevation: 5,
            backgroundColor: "white",
            marginTop: 5,
          }}
        >
          <Text style={{ fontWeight: 200, fontSize: 18, padding: 15 }}>
            <FontAwesome5 name="hands-helping" size={18} color="black" />
            &nbsp;Help
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomColor: "#9df5ed",
            borderBottomWidth: 2,
            width: Dimensions.get("window").width * 1,
            elevation: 5,
            backgroundColor: "white",
            marginTop: 5,
            
          }}
        >
          <Text style={{ fontWeight: 200, fontSize: 18, padding: 15 }}>
            <Entypo name="info-with-circle" size={18} color="black" />
            &nbsp;App Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomColor: "#9df5ed",
            borderBottomWidth: 2,
            width: Dimensions.get("window").width * 1,
            elevation: 5,
            backgroundColor: "white",
            marginTop: 5,
            marginBottom: 100,
          }}
          onPress={() => Logout()}
        >
          <Text style={{ fontWeight: 200, fontSize: 18, padding: 15 }}>
          <MaterialIcons name="logout" size={18} color="black" />
            &nbsp;Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

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

export default Profile;

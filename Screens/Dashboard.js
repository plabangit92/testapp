import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
const Dashboard = () => {
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
   const [employee_id, setEmployeeId] = useState(null);
  // const [accuracy, setAccuracy] = useState(null);
  // const [altitude, setAltitude] = useState(null);
  // const [altitudeAccuracy, setAltitudeAccuracy] = useState(null);
  // const [heading, setHeading] = useState(null);
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  // const [speed, setSpeed] = useState(null);
  // const [mocked, setMocked] = useState(null);
  // const [timestamp, setTimestamp] = useState(null);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     mylocation();
  //   trackLocation();
    
  //   }, 15000);
  //   return () => clearInterval(interval);
  // }, []);


//   const mylocation = async ()=>{
// //alert(1);
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         console.log(errorMsg);
//         BackHandler.exitApp();
//         //return;
//       } else if (status === "granted") {
//         let location = await Location.getCurrentPositionAsync({});

//         setLocation(location);
//         console.log(location);

//         setAccuracy(location.coords.accuracy);
//         setAltitude(location.coords.altitude);
//         setAltitudeAccuracy(location.coords.altitudeAccuracy);
//         setHeading(location.coords.heading);
//         setLatitude(location.coords.latitude);
//         setLongitude(location.coords.longitude);
//         setSpeed(location.coords.speed);
//         setMocked(location.mocked);
//         setTimestamp(location.timestamp);
        
        
//       }
      
//     })

//   }

  // useEffect(() => {
  //   //();
  //   trackLocation();
  //   mylocation();
  // }, []);

  // const trackLocation = async () => {
  //   try {
  //     const savedUser_id = await AsyncStorage.getItem("user_id");
  //     const employee_id = JSON.parse(savedUser_id);
  //     setEmployeeId(employee_id);
  //     const response = await axios.post(
  //       `https://computerworldgroup.com/track/api/location`,
  //       {
  //         employee_id,
  //         accuracy,
  //         altitude,
  //         altitudeAccuracy,
  //         heading,
  //         latitude,
  //         longitude,
  //         speed,
  //         mocked,
  //         timestamp,
  //       },
  //       { headers: { "X-API-KEY": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
  //     );
  //     console.log(response);
  //     if (response.data.status == "success") {
  //       alert("Location Sent");
  //     } else {
  //       throw new Error("An error has occurred");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };




  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const myLocation = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
       
       
        
        async position => {
          const { latitude, longitude,accuracy,altitude,altitudeAccuracy,heading,speed } = position.coords;
          // setRegion({
          //   latitude,
          //   longitude,
          //   latitudeDelta: position.coords.latitude,
          //   longitudeDelta: position.longitude,
            
          // });
         // console.log(position.coords)
         // console.log(longitude)
         const savedUser_id = await AsyncStorage.getItem("user_id");
      const employee_id = JSON.parse(savedUser_id);
      setEmployeeId(employee_id);
         //const employee_id = '2';
         let data = {
          "employee_id": employee_id,
          "accuracy": accuracy,
          "altitude": altitude,
          "altitudeAccuracy": altitudeAccuracy,
          "heading": heading,
          "latitude": latitude,
          "longitude": longitude,
          "speed": speed
          
        };
        try{
          const response = await axios.post(
          "https://computerworldgroup.com/track/api/location", data,
          { headers: { "X-API-KEY": "ae5d3d63fe8ed6893eec0f74f96d0a1a" } }
          );
         // console.log('>>>>>>', response);
        }
        catch(error){
          console.log('++++++++', error);
        }




        }
      );
      console.log(myLocation);
      return () => {
        myLocation.remove();
      };
    })();
  }, []);

  const [justifyContent, setJustifyContent] = useState("flex-start");

  return (
    <PreviewLayout
      label=""
      selectedValue={justifyContent}
      values={[
        "Total Purchase",
        "Total Sale",
        "Total Customer",
        "Total Supplier",
      ]}
      setSelectedValue={setJustifyContent}
    ></PreviewLayout>
  );
};

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
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
            Dashboard
          </Text>
        </LinearGradient>
      </View>
      {/* <Text style={styles.label}>{label}</Text> */}
      <View style={styles.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[styles.button, selectedValue === value && styles.selected]}
          >
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.container, { [label]: selectedValue }]}>
        {children}
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/india.jpg")}
          style={{ alignSelf: "center", height: 350 }}
        />
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    //backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#03e3fc",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
    height: 100,
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dashboard;





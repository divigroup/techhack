import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import backimage from "../../assets/back.png";

import AsyncStorage from "@react-native-community/async-storage";
const statusbarLength = StatusBar.currentHeight * 3;

export default function Profile({ navigation }) {
  const [batch, setBatch] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImagePress = (imageLink) => {
    setSelectedImage(imageLink);
    setModalVisible(true);
  };
  const updateDetails = () => {};
  const Boiler = async () => {
    const batch = await AsyncStorage.getItem("batch");
    const firstname = await AsyncStorage.getItem("firstname");
    const lastname = await AsyncStorage.getItem("lastname");
    const name = firstname + " " + lastname;
    const email = await AsyncStorage.getItem("email");
    let batchArray = [];
    if (batch) {
      batchArray = batch.split(",");
    }

    for (let i = 0; i < batchArray.length; i++) {
      let im = batchArray[i];
      if (im.length < 20) {
        batchArray[i] = String(
          `https://techhackbadgesbucket.s3.ap-south-1.amazonaws.com/badges/${im}.png`
        );
      }
    }
    setBatch(batchArray);
    setName(name);
    setEmail(email);
  };

  useEffect(() => {
    Boiler();
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "#fff" }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.navigate("Message");
            }}
          >
            <Image
              source={backimage}
              style={{
                height: StatusBar.currentHeight + 5,
                width: StatusBar.currentHeight * 2,
                maxWidth: 30,
                maxHeight: 30,
                marginTop:10,
                marginLeft:5
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.editableFieldsContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.badgesContainer}>
              <View
                style={{
                  flex: 1,

                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#d3d3d3",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 40,marginBottom:20 }}>Badges</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {batch.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleImagePress(image)}
                    >
                      <Image
                        source={{
                          uri: image,
                        }}
                        style={{ height: 150, width: 150 }}
                      />
                    </TouchableOpacity>
                  ))}

                  {/* {console.log(batch)} */}
                </View>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Image
                      source={{ uri: selectedImage }}
                      style={{ flex: 1, resizeMode: "contain" }}
                    />
                  </TouchableOpacity>
                </Modal>
              </View>
            </View>
            {/* <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                updateDetails();
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    paddingLeft: 6,

    width: StatusBar.currentHeight * 2,
    maxWidth: 41,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: StatusBar.currentHeight,
  },
  badgesContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  badge: {
    backgroundColor: "#d3d3d3",
    padding: 8,
    borderRadius: 8,
  },
  editableFieldsContainer: {
    marginBottom: 16,
  },
  fieldContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    marginRight: 16,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  // submitButton: {
  //   padding: 20,
  //   borderRadius: 10,
  //   justifyContent: "center",
  //   alignContent: "center",
  //   shadowColor: "black",
  //   shadowOpacity: 10,
  //   flex: 1,
  //   backgroundColor: "green",
  //   width: "30%",
  //   alignSelf: "center",
  //   alignItems: "center",
  // },
});

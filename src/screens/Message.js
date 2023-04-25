import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import GetLocation from "react-native-get-location";
import SideMenu from "react-native-side-menu-updated";
import MapView from "react-native-maps";
import LandingScreen from "./LandingScreen";
import LeftheaderItems from "./LeftheaderItems";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";

export default function Message({ navigation }) {
  const menu = <LeftheaderItems navigation={navigation} />;
  const h = StatusBar.currentHeight;
  const [openHeader, setOpenHeader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SideMenu
      menu={menu}
      isOpen={openHeader}
      onChange={() => setOpenHeader(openHeader ? false : true)}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{
              width: "12%",
              height: "15%",
              paddingLeft: 5,
              elevation: 3,
              zIndex: 3,
            }}
            onPress={() => {
              setOpenHeader(openHeader ? false : true);
            }}
          >
            <Image
              source={require("../../assets/control.png")}
              style={styles.icon}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "12%",
              height: "15%",

              elevation: 3,
              zIndex: 3,
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Image
              source={require("../../assets/add-group.png")}
              style={styles.icon}
            ></Image>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>

                <TextInput
                  placeholder="Group Name"
                  style={styles.input}
                ></TextInput>
                <TouchableOpacity></TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <LandingScreen navigation={navigation} />

        {/* <View style={styles.container}>
        <MapView
          style={{
            width: "100%",
            height: "100%",
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
      </SafeAreaView>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 10,
    marginVertical: 2,
    width: "90%",
    borderColor: "black",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },

  icon: {
    width: "25%",
    height: "25%",
    borderRadius: 3,
    padding: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  modalView: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

import { View, Text } from 'react-native'
import React from 'react'

export default function Verification() {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View
          style={{
            alignItems: "center",
            paddingVertical: 10,
            gap: 1,
          }}
        >
          <Text
            style={{
              color: "#d3d3d3",
              fontSize: 80,
              fontWeight: "bold",
              marginBottom: 80,
            }}
          >
            Forgot password
          </Text>
          <View style={{ flexDirection: "row", width: "88%", columnGap: 4 }}>
            <TextInput
              style={styles.smallinput}
              placeholder="First Name"
            //   onChangeText={setfirstName}
            />
            <TextInput
              style={styles.smallinput}
              placeholder="Last Name"
            //   onChangeText={setlastName}
            />
          </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight * 3,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  smallinput: {
    padding: 10,
    marginVertical: 2,
    marginLeft: -4,
    marginRight: 5,
    width: "50%",
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 50,
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    marginTop: 10,
    backgroundColor: "#1167b1",
    borderRadius: 20,
    marginBottom: 10,
  },
});
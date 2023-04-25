import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import LeftheaderItems from "./LeftheaderItems";
export default function Leftheader() {
  const [openHeader, setOpenHeader] = useState(false);
  return (
    <SafeAreaView style={{ position: "absolute", zIndex: 3, elevation: 3 }}>
      <TouchableOpacity onPress={() => setOpenHeader(true)}>
        <Text>Leftheader</Text>
      </TouchableOpacity>
      <View style={{ zIndex: 1, elevation: 100, height: "screen" }}>
        {openHeader ? <LeftheaderItems /> : <></>}
      </View>
    </SafeAreaView>
  );
}

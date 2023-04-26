import { View, Text,FlatList,Dimensions} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
const {height,width} = Dimensions.get('window')

export default function ImageSlider() {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <View>
        <FlatList data={[1,1,1,1,1]} renderItem={({item,index})=>{
            return(
                <View style={{width:width,height:height/2}}>
                    <TouchableOpacity style={{
                        width:'90%',
                        height:'90%',
                        backgroundColor:'green', 
                    }}>

                    </TouchableOpacity>

                </View>
            )
        }}
        />
      </View>
    </View>
  )
}
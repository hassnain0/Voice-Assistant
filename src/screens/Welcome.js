
import { View, Text, SafeAreaView, Image,TouchableOpacity } from 'react-native';
import React from 'react';
import Home from './Home';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Welcome = ({navigation}) => {
  return (
    <SafeAreaView className='flex-1 flex justify-around bg-white'>
      <View className='space-y-2'>
        <Text style={{fontSize:wp(10)}} className='text-center font-bold text-gray-700'>Botify</Text>
        <Text style={{fontSize:wp(4)}} className='text-center tracking-wide text-gray-600 font-semibold'>
          Your virtual assistant, always ready to lend an ear.
        </Text>
      </View>

      {/* Adjust the Image container for better alignment and scaling */}
      <View className='flex-row justify-center'>
        <Image
          source={require('../assets/images/195.jpg')}
          style={{height:hp(50), width:wp(100)}} // Adjust width/height for a more flexible fit
        />
      </View>


      <TouchableOpacity className='bg-emerald-400 mx-5  p-4 rounded-2xl' onPress={()=>{navigation.navigate("Home")}}>
        <Text className='text-center font-bold text-white text-2xl'>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;

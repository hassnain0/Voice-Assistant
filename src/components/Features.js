import { View, Text,Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Features = () => {
  return (
    <View style={{height:hp(60)}} className='space-y-2'>
      <Text style={{fontSize:wp(6.5)}} className='font-semibold text-gray-700'>Features</Text>

      <View className='bg-emerald-200 p-4 rounded-xl space-y-2 m-2'>
        <View className='flex-row items-center space-x-1'>
            <Image source={require('../assets/images/chatgpt.png')} style={{width:wp(7), height:hp(5)}} className='rounded-xl'></Image>
            <Text style={{fontSize:wp(4.8)}} className='font-samibold text-gray-700 m-2'>ChatGPT</Text>
        </View>
        <Text style={{fontSize:wp(3.8)}} className='text-gray-700 font-medium'>ChatGPT can provide you with instant and knowledgenable responses, assit you with creative idea on a wide renage of topics</Text>
      </View>
      <View className='bg-purple-200 p-4 rounded-xl  m-2'>
        <View className='flex-row items-center space-x-1'>
            <Image source={require('../assets/images/dalle.png')} style={{width:wp(7), height:hp(5)}} className='rounded-xl'></Image>
            <Text style={{fontSize:wp(4.8)}} className='font-samibold text-gray-700 m-2'>DALL-E</Text>
        </View>
        <Text style={{fontSize:wp(3.8)}} className='text-gray-700 font-medium'>DALL·E can generate stunning and imaginative images from text prompts, bringing your creative ideas to life with detailed and realistic visuals. Whether you need concept art, design inspiration, or surreal illustrations, DALL·E transforms words into captivating imagery.</Text>
      </View>
      <View className='bg-blue-200 p-4 rounded-xl space-y-2 m-2'>
        <View className='flex-row items-center space-x-1'>
            <Image source={require('../assets/images/deepSeek.png')} style={{width:wp(10), height:hp(4)}} className='rounded-xl'></Image>
            <Text style={{fontSize:wp(4.8)}} className='font-samibold text-gray-700 m-2'>Deep Seek</Text>
        </View>
        <Text style={{fontSize:wp(3.8)}} className='text-gray-700 font-medium'>ChatGPT can provide you with instant and knowledgenable responses, assit you with creative idea on a wide renage of topics</Text>
      </View>
    
    </View>
    
  )
}

export default Features

import { StyleSheet, Text,Image, View,SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Voice from '@react-native-community/voice';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import Features from '../components/Features';
  import { dummyMessages } from '../constants';

  export default function Home() {
    const [messages,setMessages]=useState(dummyMessages);
    const [recording,setRecording]=useState(false);
    const [speaking,setSpeaking]=useState(true);



    useEffect(()=>{
    
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults =speechResultsHandler;
    Voice.onSpeechError=speechErrorHandler;

    return(()=>{
      Voice.destroy().then(Voice.removeAllListeners);
    })
    });

    const stopSpeaking=()=>{
      setSpeaking(false);
    }

    //Clear Function
    const clear=()=>{
      setMessages([]);
    }

    const startRecording = async () => {
      setRecording(true);
      try {
        if (!Voice) {
          Alert.alert("Voice module is not initialized");
          return;
        }
        await Voice.start("en-US");
      } catch (e) {
        console.error("Error starting voice recognition", e);
      }
    };

    const stopRecording=async()=>{
      setRecording(false);
      try{
        await Voice.stop();
        setRecording(false);
      }
      catch(e){
        console.log("Error",e)
      }
    }

    const speechStartHandler=()=>{
      console.log("Speech Started");
    };

    const speechEndHandler=()=>{
      console.log("Speech Ended");
    }
    
    const speechResultsHandler=(e)=>{
      console.log("Results Handler",e);
    }

    const speechErrorHandler=(e)=>{
      console.log("Error Handler",e);
    }


    return (
      <View className='flex-1 bg-white'>
        <SafeAreaView className='flex-1 flex mx-5'>
          <View className='flex-row justify-center'>
            <Image source={require('../assets/images/195.jpg')} style={{width:wp(60),height:hp(20)}}/>
          </View>
          {
            messages.length>0?(
              <View className='space-y-2 flex-1 '>
                <Text className='text-gray-700 font-semibold ml-1'>Assistant</Text>
                <View style={{height:hp(58)}} className='bg-neutral-200 rounded-3xl p-4'>
  <ScrollView bounces={false} className='space-y-4' showsVerticalScrollIndicator={false}>

  {messages.map((msg,index)=>{

    if(msg.role=="assistant"){
      if(msg.content.includes("https")){
        return(
<View key={index} className='flex-row justify-start'>
  <View className='p-2 flex rounded-2xl bg-emerald-200 rounded-tl-none'>
<Image source={{uri:msg.content}} className='rounded-2xl' resizeMethod='contain' style={{height:hp(30),width:wp(70)}}></Image>

  </View>
   </View>
        )
      }
      else{
  return(
        <View key={index} className='flex-row justify-start mb-2'><View style={{width:wp(70)}} className='bg-emerald-100 rounded-xl p-2 rounded-tr-none'>
        <Text style={{color:'black'}} >{msg.content}</Text>
          </View></View>
  )
      }
    }
    else{

      return(
        <View key={index} className='flex-row justify-end mb-2'><View key={index} style={{width:wp(70)}} className='bg-white rounded-xl p-2 rounded-tl-none'>
          <Text style={{color:'black'}} >{msg.content}</Text>
            </View></View>
      )
    }
  })}  
  </ScrollView>
                </View>
              </View>
              
            )
            :(
              <Features/>
            )
          }      
          <View className='flex-row justify-center items-center mb-20'>

{
     speaking&&(
      <TouchableOpacity onPress={stopSpeaking}
        className='bg-red-400 rounded-3xl p-3 right-10'
      >
        <Text className='text-white font-semibold'>Stop</Text>
        </TouchableOpacity>

    )  
}
{
  recording?(
     <TouchableOpacity className=' bg-red-400 rounded-xl p-2' onPress={stopRecording}>
    <Image source={require('../assets/images/liveRecording.png')} style={{width:wp(7), height:hp(5)}}/>
      </TouchableOpacity>

):(

     // Recoding Start Button
   
   <TouchableOpacity  className=' bg-emerald-400 rounded-xl  p-2' onPress={startRecording}>
     <Image source={require('../assets/images/mic.png')} style={{width:wp(7), height:hp(5)}}></Image>
     </TouchableOpacity>
)
}
{
     messages.length>0&&(
      <TouchableOpacity onPress={clear}
      className='bg-neutral-400 rounded-3xl p-3 left-10'
    >
      <Text className='text-white font-semibold'>Clear</Text>
      </TouchableOpacity>
    )  
}

          </View>
        </SafeAreaView>
      </View>
    )
  }

  const styles = StyleSheet.create({})
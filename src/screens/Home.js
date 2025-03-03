import { StyleSheet, Text,Image, View,SafeAreaView, ScrollView, TouchableOpacity, Alert, PermissionsAndroid, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Voice from '@react-native-voice/voice';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import { apiCall } from '../api/openAI';

  export default function Home() {
    const [messages,setMessages]=useState([]);
    const [recording,setRecording]=useState(false);
    const [speaking,setSpeaking]=useState(true);
    const [results,setResults]=useState();

async function requestMicPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Microphone Permission",
        message: "App needs access to your microphone to recognize speech",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}
    useEffect(()=>{
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults =speechResultsHandler;
    Voice.onSpeechError=speechErrorHandler;

    return(()=>{
      Voice.destroy().then(Voice.removeAllListeners);
    })
    });
    
    const startRecording=async()=>{
     setRecording(true);
      if(!Voice){
        console.log("Voice not found");
      }

      try{
        console.log("Called");
        await Voice.start("en-GB");
      }
      catch(e){
        console.log("Error",e)
      }
    }

    const stopRecording=async()=>{
      try{
        await Voice.stop();

        setRecording(false);
        fetchResponse();
      }
      catch(e){
        console.log("Error",e)
      }
    }

    
    const speechStartHandler=()=>{
      requestMicPermission()
    };

    const speechEndHandler=()=>{
      console.log("Speech Ended");
    }

    const speechResultsHandler = (e) => {
      if (e.value && e.value.length > 0) {
        const text = e.value[0];
        console.log("Results from Speech",text)
        setResults(text);
     
      } else {
        console.log("No speech detected");
      }
    };
    
    const speechErrorHandler = (e) => {
      console.error("Error Handler:", e);
      if (e && e.code) {
        console.error(`Error Code: ${e.code}`);
      }
      if (e && e.message) {
        console.error(`Error Message: ${e.message}`);
      }
    };
    const fetchResponse=async()=>{
     
      if(results.trim().length>0){
        let newMessages=[...messages];
        newMessages.push({
          role:"user",
          content:results.trim()
        });
       console.log("New Messages",newMessages)
        setMessages([...newMessages]);
        apiCall(results.trim(),newMessages).then((response)=>{
         if(response.success) {
          setMessages([...response.messages]);
          setResults('');
         }
         else Alert.alert("Error",response.messages)
        })
      }
    }
    const clear=()=>{
      setMessages([]);
    }

    return (
      <ScrollView>
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
             <View className='flex-row justify-center items-center mb-20 mt-10'>

{
     speaking&&(
      <TouchableOpacity 
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

     // Recording Start Button
   
   <TouchableOpacity  className=' bg-emerald-400 rounded-xl  p-2' onPress={startRecording}>
     <Image source={require('../assets/images/mic.png')} style={{width:wp(7), height:hp(5)}}></Image>
     </TouchableOpacity>
)
}
{
     messages.length>0&&(
      <TouchableOpacity
      onPress={()=>clear()}
      className='bg-neutral-400 rounded-3xl p-3 left-10'
    >
      <Text className='text-white font-semibold'>Clear</Text>
      </TouchableOpacity>
    )  
}

          </View> 


        </SafeAreaView>
      </View>
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({})
import  React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { AntDesign, Ionicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function App({Stations,number,setnumber,stations}) {

  function previous(){
    if(number > stations.length){
      setnumber(number = 0)
      handlePreviousTrack()
      // handleAudioPlayPause()
    }
    else{
      setnumber(number + 1)
      handlePreviousTrack()
    }
    
  }
  function next(){
    if(number === 0){
      setnumber(number === stations.length)
      handleNextTrack()
    }else{
      setnumber(number + 1)
      handleNextTrack()
       async() => {
        const status = await playbackObject.loadAsync(
        { uri: Stations.uri },
        { shouldPlay: true }
      );
      setIsPlaying(true);
      return setPlaybackStatus(status);
      }
      
   //   handleAudioPlayPause()
    }
  }
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [radio, setRadio] = useState('')

  function async() {
    setCurrentIndex(currentIndex + 1)
    setStation(Station - 1)
  }

  const handlePreviousTrack = async () => {
    const {isLoaded} = await React.useContext.playbackObject.getStatusAsync();
    const isFirstAudio = context.currentAudioIndex <=0
    let audio =  context.audioFiles[context.currentAudioIndex - 1 ];
    let index;
    let status;
    
    if( !isLoaded && !isFirstAudio){
      index = context.currentAudioIndex - 1
      status = await play(context.playbackObject, audio.uri);
    }

    if( isLoaded && !isFirstAudio){
      index = context.currentAudioIndex - 1
      status = await playNext(context.playbackObject, audio.uri);
    }

    if(isFirstAudio){
      index =context.totalAudioCount - 1;
      audio = context.audioFiles[index];
      if(isLoaded){
        status = await playNext(context.playbackObject, audio.uri);
      }else{
        status = await play(context.playbackObject, audio.uri);
      }
    }

    context.updateState(context, {
      currentAudio : audio, 
      playbackObject : context.playbackObject, 
      soundObj: status, 
      isPlaying: true, 
      setCurrentIndex: index
    });
    storeAudioForNextOpening(audio, index);
  };


  const handleNextTrack = async () => {
    const {isLoaded} = await React.useContext.playbackObject.getStatusAsync();
    const isLastAudio = context.currentAudioIndex + 1 === context.totalAudioCount;
    let audio =  context.audioFiles[context.currentAudioIndex + 1 ];
    let index;
    let status;
    
    if( !isLoaded && !isLastAudio){
      index = context.currentAudioIndex + 1
      status = await play(context.playbackObject, audio.uri);
    }

    if( isLoaded && !isLastAudio){
      index = context.currentAudioIndex + 1
      status = await playNext(context.playbackObject, audio.uri);
    }

    if(isLastAudio){
      index =0;
      audio = context.audioFiles[index];
      if(isLoaded){
        status = await playNext(context.playbackObject, audio.uri);
      }else{
        status = await play(context.playbackObject, audio.uri);
      }
    }

    context.updateState(context, {
      currentAudio : audio, 
      playbackObject : context.playbackObject, 
      soundObj: status, 
      isPlaying: true, 
      setCurrentIndex: index
    });
    storeAudioForNextOpening(audio, index);
  };

  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);

  const componentDidMount = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

      this.loadAudio()
    } catch (problem) {
      console.log(problem)
    }
  }
  
 


  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);
  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      const status = await playbackObject.loadAsync(
        { uri: Stations.uri },
        { shouldPlay: true }
      );
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }

    if (playbackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }


    if (!playbackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };


  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);
  console.log(Stations.name)

  return (
    <View style={styles.container}>
     
     <View style={styles.icons}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <View style={{ marginLeft: 20 }}>
                <TouchableOpacity onPress={previous}>
                  <AntDesign name="stepbackward" size={37} color="red" backgroundColor='yellow' />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View>
                <TouchableOpacity>
                <Ionicons 
                  style={{ alignSelf: 'center', backgroundColor: 'yellow', padding: 10, borderRadius: 20, }} 
                  name={isPlaying ? 'pause' : 'play'} size={18} color='red' 
                  onPress={handleAudioPlayPause}/>
                  </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={{ marginRight: 20 }}>
                <TouchableOpacity onPress={next}>
                  <AntDesign name="stepforward" size={37} color="red" />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
   
    </View >
  );
}

const styles = StyleSheet.create({
container:{
    flexDirection:'row'
},
  icons: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
    marginTop: 10,
   // backgroundColor: 'black'
  },
name:{
    fontSize:20,
    fontWeight:'00'
}
}
);



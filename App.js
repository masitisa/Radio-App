import  React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView,StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons, FontAwesome5,Entypo,FontAwesome,Feather,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import List from './List';
import Record from './Record';
import Playing from './Playing';
import Play from './Play'
import Search from './Search'
//import Slider from '@react-native-community/slider';

export default function App(Station, setStation) {
  const Stations = [
    {
      name: 'Harvest fm',
      wave: 86.5,
      uri: 'http://node-08.zeno.fm/v0myu53ae3quv?zs=Qyh0r6OsRQ2IvATq1GO7Xw&zs=iJCqf_4VRoyHYF3Kw_5ZMw&rj-tok=AAABgXq4nFoAX6smAN5esSnQng&rj-ttl=5',
    },
    {
      name: 'Voice of God',
      wave: 86.5,
      uri: 'https://voiceofgodfm.co.ls/',
    },
    {
      name: 'Moafrika fm',
      wave: '86.5',
      uri: 'http://ca3.rcast.net:8040/;stream.mp3',
    },
    {
      name: 'Tsenolo fm',
      wave: 86.5,
      uri: 'http://onlineradiobox.com/ls/tsenolo/player/?cs=ls.tsenolo&played=1',
    },
    {
      name: "People's Choice Radio",
      wave: 86.5,
      uri: 'http://102.130.114.208:8000/pcfm',
    },
    {
      name: 'Radio Maria',
      uri: 'https://worldradiomap.com/ls/play/maria',
      wave: '103.3 MHz'
    }
  
];

  let [number, setnumber] = useState(0)
  const [body,setbody] = useState(<List Stations={Stations}/>)
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [radio, setRadio] = useState({uri: Stations[number].uri})

  function async() {
    setCurrentIndex(currentIndex + 1)
    setStation(Station - 1)
  }
  
  function playing(){
    setbody(<Playing stations={Stations[number]} />)
  }
  function list(){
    setbody(<List Stations={Stations} number={number} setnumber={setnumber}/>)
  }
  function play(){
    setbody(<Play />)
  }
  function search(){
    setbody(<Search/>)
  }

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

  //playing
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Entypo name="menu" size={28} color="#fff" />
        <Text style={styles.head}>Online Radio</Text>
        <MaterialCommunityIcons name="sort-variant" size={28} color="#fff" />
        <TouchableOpacity onPress={search}>
          <FontAwesome name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <Feather name="settings" size={24} color="#fff" />
      </View>
      <View style={styles.music_logo_view}>
          <Image source={require("./assets/bars1.jpg")} style={styles.image_view}/>
        </View>
        <View style={styles.name_of_song_View} >
          <Text style={styles.name_of_song_Text1}>{Stations[number].name}</Text>
          <Text style={styles.name_of_song_Text2}>98.9 MHz</Text>
        </View>
      <View style={styles.body}>
      <View style={styles.playing}>
        <TouchableOpacity >
          <View>
          <Play Stations={Stations[number]} number={number} setnumber={setnumber} stations={Stations}/>
           
          </View>    
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginBottom:5}}>
        
      
          { Stations.map((station, name)=>(
          <View key={name}>
            <TouchableOpacity >
              <View style={styles.recently_played_list}  >
                <Image source={require("./assets/bars1.jpg")} style={styles.recently_played_image} />
                <View style={styles.recently_played_list_text}>
                  <Text style={styles.recently_played_list_text2} name={isPlaying ? 'pause' : 'play'} onPress={() => {setnumber(number = Stations.findIndex(e => e.name == station.name))
                                                          setRadio({uri: Stations[number].uri})
                                                          handleAudioPlayPause()  }}>{station.name}</Text>
                 <Text style={styles.recently_played_list_text2}>{station.wave}</Text>
                </View>
               
             </View>
            </TouchableOpacity>
          </View>)
        )}
        
      </ScrollView>
      
        <Text>{number}</Text>
      </View>

     


     
      <StatusBar style='light-content'/>
     
    </View >
  );
}

const styles = StyleSheet.create({

  container:{
    height:'100%',
    width:'100%',
  },
  container: {
    width: '100%',
    flex:1,
    //justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
  },

  mainbar:{
    marginTop: 10,
    height:"10%",
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent: 'space-between'
    
  },
  now_playing_text:{
    fontSize:19,
    //marginLeft:10,
    color: "white" ,
    fontWeight: "bold"
  },
  music_logo_view:{
    height:"25%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
  },
  image_view:{
    height:"70%",
    width:"70%",
    borderRadius:10
  },
  name_of_song_View:{
    height:65,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
   // backgroundColor: "black"
  },
  name_of_song_Text1:{
    fontSize:19,
    fontWeight:"500",
    marginTop: 10,
    color: "white"

  },
  name_of_song_Text2:{
    color:"white",
    marginTop:10,
  },
  recently_played_view:{
    height:"43%",
    width:"100%",
  },
  recently_played_text:{
    fontWeight:"bold",
    fontSize:20,
    color:"white",
    marginLeft:20,
    marginTop:40
  },
  recently_played_list:{
    backgroundColor:"black",
    height:70,
    width:"90%",
    borderRadius:10,
    marginLeft:20,
    marginTop:15,
    alignItems:"center",
    flexDirection:"row",
  },
  recently_played_image:{
    height:"70%",
    width:"15%",
    borderRadius:10
  },
  recently_played_list_text:{
    height:"100%",
    width:"60%",
    justifyContent:"center"
  },
  recently_played_list_text1:{
    fontSize:15,
    marginLeft:10,
    color: "white"
  },
  recently_played_list_text2:{
    fontSize:16,
    color:"white",
    marginLeft: 10
  },
  header:{
    height:'7%',
    width:'100%',
    backgroundColor:'#000',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:5
  },
  body:{
    width:'100%',
    height:'70%',
    backgroundColor:'#000',
    padding:15
  },
  footer:{
    backgroundColor:'#bbb',
    width: '100%',
    height:'8%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  screen:{
    height: 50,
    width:50,
    backgroundColor:'#fff',
    borderRadius:10,
    elevation:10,
    borderBottomWidth:2,
    borderEndWidth:3
  
  },
  search:{
    padding:1,
    width:'70%',
    borderRadius:40,
    backgroundColor:'#fff'
  },
  playing:{
    height:'15%',
    width:'100%',
    backgroundColor:'#000',
    
    alignItems:'flex-start',
    padding:5,
    flexDirection:'row'
  },
  name:{
    fontWeight:'800',
    fontSize:20,
    color:'#fff',
    marginLeft:10
  },
  play:{ 
    alignSelf: 'center',
    backgroundColor: '#168e22',
    padding: 10, 
    borderRadius: 50, 
  },
  head:{
    fontWeight:'bold',
    fontSize:24,
    color:'#fff'
  },
  station:{
    width:'100%',
   
    borderColor:'#000',
    borderWidth:1,
    marginVertical:3,
    padding:10,
    borderRadius:10
  },
 
}
);




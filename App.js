
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { Header } from './src/Components/Header';
import Timer from './src/Components/Timer';
import { Audio } from 'expo-av';
import CustomTimeInput from './src/Components/CustomTimeInput';

const colores = ["#71E2D8","#CEEAAC","#FA6B66"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" || "SHORT" || "BREAK");
  const [isActive, setIsActive] = useState(false);
  

  useEffect(() => {
    let interval = null;

    
    
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 0.5);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setTime(getInitialTime(currentTime)); 
    }

    return () => clearInterval(interval);
  }, [isActive, time, currentTime]);

  function getInitialTime(index,item) {
    switch (index) {
      case 0:
        return 25 * 60; 
        break;
      case 1:
        return 5 * 60; 
        break;
      case 2:
        return 15 * 60; 
        break
      default:
        return null
    }
  }
  

  
 


  // Manipular El Btn 
  function handlerStartStop() {
    playSound();
    // Esctablecer el sonido !false--> true
    setIsActive(!isActive);
  }

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
      require('./assets/btnAudio.mp4')
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colores[currentTime] }]}>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setIsActive={ setIsActive}
        />

        <Timer time={time} />
        
        <TouchableOpacity style={styles.boton} onPress={handlerStartStop}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{isActive ? 'STOP' : 'START'}</Text>
        </TouchableOpacity>


        <CustomTimeInput setTime={setTime} /> 

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 37,
    fontWeight: "bold",
    textAlign:'center',
    marginTop:37,
    marginBottom:37,
  },
  boton:{
    alignItems: 'center',
    backgroundColor: '#C4F4AB',
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    marginTop: 15,
  }
});
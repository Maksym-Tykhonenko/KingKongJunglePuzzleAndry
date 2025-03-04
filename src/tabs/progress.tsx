import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, ScrollView } from 'react-native';
import { TabContext } from './navigation';
import {useFocusEffect} from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Progress({ navigation }: any) {
  const {points, setPoints} = useContext(TabContext);
  const {time, setTime} = useContext(TabContext);
  const {levels, setLevels} = useContext(TabContext);
  const [isSelectButton, setIsSelectButton] = useState(false);
  const LEVELS_NUMBER = 4;
  const MAX_POINTS = 1000;

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const asyncTime = await AsyncStorage.getItem('time');
        const asyncPoints = await AsyncStorage.getItem('points');
        if (asyncTime) {
          setTime(JSON.parse(asyncTime));
        }
        if (asyncPoints) {
          setPoints(JSON.parse(asyncPoints));
        }
      }
      fetchData();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../../assets/png/background.png')}
      resizeMode='cover'
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={styles.title}
        > 
          Your game progress
        </Text>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <AnimatedCircularProgress
            size={200}
            width={20}
            fill={(levels / LEVELS_NUMBER) * 100}
            tintColor="#24794D"
            backgroundColor="#D9D9D980"
            rotation={0}
            lineCap="round"
          />
          <AnimatedCircularProgress
            size={150}
            width={15}
            fill={time}
            tintColor="#6BC153"
            backgroundColor="#D9D9D980"
            rotation={0}
            lineCap="round"
            style={{ position: 'absolute' }}
          />
          <AnimatedCircularProgress
            size={110}
            width={10}
            fill={(points / MAX_POINTS) * 100}
            tintColor="#B2FFD0"
            backgroundColor="#D9D9D980"
            rotation={0}
            lineCap="round"
            style={{ position: 'absolute' }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.infoContainer}>
            <Text style={styles.subTitle}>
              Levels
            </Text>
            <Text style={[styles.title, {marginBottom: 10}]}>
              {(levels / LEVELS_NUMBER) * 100}%
            </Text>
            <Image
              source={require('../../assets/png/level-icon.png')}
              resizeMode='cover'
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.subTitle}>
              Points
            </Text>
            <Text style={[styles.title, {marginBottom: 10}]}>
              {points}
            </Text>
            <Image
              source={require('../../assets/png/points-icon.png')}
              resizeMode='cover'
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.subTitle}>
              Time
            </Text>
            <Text style={[styles.title, {marginBottom: 10}]}>
              {time}min
            </Text>
            <Image
              source={require('../../assets/png/time-icon.png')}
              resizeMode='cover'
            />
          </View>
        </View>
        <Pressable 
          style={[styles.selectButton, {backgroundColor: isSelectButton ? 'transparent' : '#FAC93E'}]}
          onPressIn={() => setIsSelectButton(true)}
          onPressOut={() => setIsSelectButton(false)}
        >
          <Text style={[styles.selectButtonText, {color: isSelectButton ? '#FAC93E' : '#141414'}]}>
            Play again
          </Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 80
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: '#F6F6F6',
    marginBottom: 40,
  },
  selectButton: {
    borderColor: '#FAC93E',
    width: '100%',
    height: 63,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  selectButtonText: {
    fontWeight: 600,
    fontSize: 18,
  },
  subTitle: {
    fontWeight: 500,
    fontSize: 16,
    color: '#F6F6F6BF'
  },
  infoContainer: {
    alignItems: 'center'
  }
});

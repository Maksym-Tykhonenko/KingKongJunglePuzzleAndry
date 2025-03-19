import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { TabContext } from './navigation';
import {useFocusEffect} from '@react-navigation/native';
import GoldCups from '../../assets/svg/gold-cups.svg';
import WhiteCups from '../../assets/svg/white-cups.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Awards({ navigation }: any) {
  const {awards, setAwards} = useContext(TabContext);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const asyncAwards = await AsyncStorage.getItem('awards');
        if (asyncAwards) {
          setAwards(JSON.parse(asyncAwards));
        }
      }
      fetchData();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../../assets/newDiz/Background.png')}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
          <View
            style={{width: '45%'}}
          >
            <ImageBackground
              source={awards >= 0 ? require('../../assets/png/green-awards.png') : require('../../assets/png/gray-awards.png')}
              resizeMode='cover'
              style={styles.cupsContainer}
            >
              {awards >= 0 ? 
                <GoldCups />
                :
                <WhiteCups />
              }
              <Text style={[styles.cupsText, {color: awards >= 0 ? '#92E3A9' : '#B2B3BD'}]}>
                Complete a level in under 30 seconds.
              </Text>
            </ImageBackground>
          </View>
          <View
            style={{width: '45%'}}
          >
            <ImageBackground
              source={awards >= 1 ? require('../../assets/png/green-awards.png') : require('../../assets/png/gray-awards.png')}
              resizeMode='cover'
              style={styles.cupsContainer}
            >
              {awards >= 1 ? 
                <GoldCups />
                :
                <WhiteCups />
              }
              <Text style={[styles.cupsText, {color: awards >= 1 ? '#92E3A9' : '#B2B3BD'}]}>
                Finish a level in more than 2 minutes.
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
          <View
            style={{width: '45%'}}
          >
            <ImageBackground
              source={awards >= 2 ? require('../../assets/png/green-awards.png') : require('../../assets/png/gray-awards.png')}
              resizeMode='cover'
              style={styles.cupsContainer}
            >
              {awards >= 2 ? 
                <GoldCups />
                :
                <WhiteCups />
              }
              <Text style={[styles.cupsText, {color: awards >= 2 ? '#92E3A9' : '#B2B3BD'}]}>
                Complete all 4 levels.
              </Text>
            </ImageBackground>
          </View>
          <View
            style={{width: '45%'}}
          >
            <ImageBackground
              source={awards >= 3 ? require('../../assets/png/green-awards.png') : require('../../assets/png/gray-awards.png')}
              resizeMode='cover'
              style={styles.cupsContainer}
            >
              {awards >= 3 ? 
                <GoldCups />
                :
                <WhiteCups />
              }
              <Text style={[styles.cupsText, {color: awards >= 3 ? '#92E3A9' : '#B2B3BD'}]}>
                Finish the first level without using any hints.
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
          <View
            style={{width: '45%'}}
          >
            <ImageBackground
              source={awards >= 4 ? require('../../assets/png/green-awards.png') : require('../../assets/png/gray-awards.png')}
              resizeMode='cover'
              style={styles.cupsContainer}
            >
              {awards >= 4 ? 
                <GoldCups />
                :
                <WhiteCups />
              }
              <Text style={[styles.cupsText, {color: awards >= 4 ? '#92E3A9' : '#B2B3BD'}]}>
                Complete 3 levels in a row without losing.
              </Text>
            </ImageBackground>
          </View>
          <View
            style={{width: '45%'}}
          >
            <ImageBackground
              source={awards >= 5 ? require('../../assets/png/green-awards.png') : require('../../assets/png/gray-awards.png')}
              resizeMode='cover'
              style={styles.cupsContainer}
            >
              {awards >= 5 ? 
                <GoldCups />
                :
                <WhiteCups />
              }
              <Text style={[styles.cupsText, {color: awards >= 5 ? '#92E3A9' : '#B2B3BD'}]}>
                Complete all levels without making any mistake.
              </Text>
            </ImageBackground>
          </View>
        </View>
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
    marginBottom: 20,
  },
  cupsContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: undefined,
    aspectRatio: 0.9,
    alignItems: 'center',
  },
  cupsText: {
    fontWeight: 400,
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});

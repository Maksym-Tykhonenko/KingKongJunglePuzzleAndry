import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import LevelOne from '../../assets/svg/level-1.svg';
import LevelTwo from '../../assets/svg/level-2.svg';
import LevelThree from '../../assets/svg/level-3.svg';
import LevelFour from '../../assets/svg/level-4.svg';
import { TabContext } from './navigation';

export default function Home({ navigation }: any) {
  const [isSelectButton, setIsSelectButton] = useState(false)
  const {levels, setLevels} = useContext(TabContext);

  return (
    <ImageBackground
      source={require('../../assets/png/background.png')}
      resizeMode='cover'
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View style={styles.container}>
        <Text
          style={styles.title}
        > 
          Choose game level:
        </Text>
        <Pressable 
          style={[styles.levelButton, {borderColor: levels === 0 ? '#24794D' : '#F6F6F6'}]}
          onPress={() => setLevels(0)}
        >
          <LevelOne />
          <View style={{marginLeft: 15}}>
            <Text style={[styles.bigText, {color: '#24794D'}]}>
              Vine Adventure
            </Text>
            <Text style={[styles.smallText, {color: '#24794DBF'}]}>
              Vine Adventure
            </Text>
          </View>
        </Pressable>
        <Pressable 
          style={[styles.levelButton, {borderColor: levels === 1 ? '#5E7924' : '#F6F6F6'}]}
          onPress={() => setLevels(1)}
        >
          <LevelTwo />
          <View style={{marginLeft: 15}}>
            <Text style={[styles.bigText, {color: '#5E7924'}]}>
              Cave of Mysteries
            </Text>
            <Text style={[styles.smallText, {color: '#5E7924BF'}]}>
              Vine Adventure
            </Text>
          </View>
        </Pressable>
        <Pressable 
          style={[styles.levelButton, {borderColor: levels === 2 ? '#8E7D39' : '#F6F6F6'}]}
          onPress={() => setLevels(2)}
        >
          <LevelThree />
          <View style={{marginLeft: 15}}>
            <Text style={[styles.bigText, {color: '#8E7D39'}]}>
              Lost Temple
            </Text>
            <Text style={[styles.smallText, {color: '#8E7D39BF'}]}>
              Vine Adventure
            </Text>
          </View>
        </Pressable>
        <Pressable 
          style={[styles.levelButton, {borderColor: levels === 3 ? '#76321D' : '#F6F6F6'}]}
          onPress={() => setLevels(3)}
        >
          <LevelFour />
          <View style={{marginLeft: 15}}>
            <Text style={[styles.bigText, {color: '#76321D'}]}>
              King’s Peak
            </Text>
            <Text style={[styles.smallText, {color: '#76321DBF'}]}>
              Vine Adventure
            </Text>
          </View>
        </Pressable>
        <Pressable 
          style={[styles.selectButton, {backgroundColor: isSelectButton ? 'transparent' : '#FAC93E'}]}
          onPressIn={() => setIsSelectButton(true)}
          onPressOut={() => setIsSelectButton(false)}
          onPress={() => navigation.navigate('Game')}
        >
          <Text style={[styles.selectButtonText, {color: isSelectButton ? '#FAC93E' : '#141414'}]}>
            Select
          </Text>
        </Pressable>
      </View>
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
  levelButton: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    borderWidth: 3,
  },
  bigText: {
    fontWeight: 500,
    fontSize: 18,
  },
  smallText: {
    fontWeight: 400,
    fontSize: 14,
    marginTop: 5,
  },
  selectButton: {
    borderColor: '#FAC93E',
    width: '100%',
    height: 63,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: {
    fontWeight: 600,
    fontSize: 18,
  }
});

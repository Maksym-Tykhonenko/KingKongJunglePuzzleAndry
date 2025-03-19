import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Image } from 'react-native';

export default function Loading({ navigation }: any) {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
    if (progress === 100) {
      navigation.navigate('Tabs')
    }
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/newDiz/Background.png')}
      resizeMode='cover'
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View
        style={styles.container}
      >
        <Text style={styles.logo}>
          Jungle Puzzle
        </Text>
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.progressContainer,
              {
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          >
            <View style={{ flex: 1, backgroundColor: '#FAC93E', borderRadius: 10, }} />
          </Animated.View>
        </View>
        <Text
          style={[styles.text, {textAlign: 'center'}]}
        >
          Loading...
        </Text>
      </View>
        
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center'
  },
  text: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19.2,
  },
  loadingContainer: {
    width: '70%',
    height: 20,
    backgroundColor: '#141414',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 10,
  },
  progressContainer: {
    height: '100%',
  },
  logoImg: {
    width: 300,
    resizeMode: 'contain',
    height: 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  logo: {
    color: '#D51500',
    fontWeight: 900,
    fontSize: 60,
    textAlign: 'center',
    textShadowColor: '#FAC93E',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4
  }
})

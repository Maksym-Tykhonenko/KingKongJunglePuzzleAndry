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
      source={require('../../assets/png/loading-bg.png')}
      resizeMode='cover'
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View
        style={styles.container}
      >
        <Image 
          source={require('../../assets/png/logo.png')}
          style={styles.logoImg}
        />
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
    width: '85%',
    resizeMode: 'contain',
  }
})

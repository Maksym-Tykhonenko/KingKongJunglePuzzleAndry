import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function Memorize(props: any) {
  const [isSelectButton, setIsSelectButton] = useState(false);

  return (
    <View>
      <Text style={styles.title}>
        {props.title}
      </Text>
      <Text style={styles.subTitle}>
        {props.subTitle}
      </Text>
      <Pressable 
        style={[styles.selectButton, {backgroundColor: isSelectButton ? 'transparent' : '#FAC93E'}]}
        onPressIn={() => setIsSelectButton(true)}
        onPressOut={() => setIsSelectButton(false)}
        onPress={() => props.setLevelCount(props.levelsCount + 1)}
      >
        <Text style={[styles.selectButtonText, {color: isSelectButton ? '#FAC93E' : '#141414'}]}>
          Next
        </Text>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 500,
    fontSize: 28,
    color: '#F6F6F6',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 40,
  },
  subTitle: {
    fontWeight: 400,
    fontSize: 18,
    color: '#F6F6F6',
    marginBottom: 30,
  },
  selectButton: {
    borderColor: '#FAC93E',
    width: '100%',
    height: 63,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  selectButtonText: {
    fontWeight: 600,
    fontSize: 18,
  },
});
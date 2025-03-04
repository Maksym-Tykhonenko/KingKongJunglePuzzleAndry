import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function Test(props: any) {
  const [isSelectButton, setIsSelectButton] = useState(false);
  const [pressed, setPressed] = useState(null)

  return (
    <View>
      <Text style={styles.title}>
        {props.title}
      </Text>
      <Text style={styles.subTitle}>
        {props.subTitle}
      </Text>
      {props.options.map((item, id) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.options, {backgroundColor: id === pressed ? (pressed === props.rightAnswer ? '#B2FFD0' : '#FF6B6B') : '#F6F6F6'}]}
            key={id}
            onPress={() => {
              if(pressed === null){
                setPressed(id)
                if(id === props.rightAnswer) {
                  props.setRightAnswers(props.rightAnswers + 1)
                }
              }
            }}
          >
            <Text style={styles.optionsText}>
              {item}
            </Text>
          </TouchableOpacity>
        )
      })}
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
  options: {
    backgroundColor: '#F6F6F6',
    marginBottom: 15,
    padding: 20,
    borderRadius: 20,
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
    marginBottom: 130,
  },
  selectButtonText: {
    fontWeight: 600,
    fontSize: 18,
  },
  optionsText: {
    fontWeight: 400,
    fontSize: 20,
    color: '#141414',
  }
});

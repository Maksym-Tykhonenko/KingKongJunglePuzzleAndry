import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function NextNumber(props: any) {
  const [isSelectButton, setIsSelectButton] = useState(false);
  const [pressed, setPressed] = useState(null)
  const [pressedArray, setPressedArray] = useState([])

  const arraysHaveSameItems = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return sorted1.every((value, index) => value === sorted2[index]);
};

  return (
    <View>
      <Text style={styles.title}>
        {props.title}
      </Text>
      <Text style={styles.subTitle}>
        {props.subTitle}
      </Text>
      <View style={styles.gridContainer}>
        {props.options.map((item, id) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.options, {backgroundColor: props.levels !== 1 ? (id === pressed ? (pressed === props.rightAnswer ? '#B2FFD0' : '#FF6B6B') : '#F6F6F6') : pressedArray.includes(id) ? (props.rightAnswer.includes(id) ? '#B2FFD0' : '#FF6B6B') : '#F6F6F6', width: props.levels === 1 ? '30%' : '48%'}]}
              key={id}
              onPress={() => {
                if(props.levels === 1) {
                  setPressedArray(prev => [...prev, id]);
                  if(arraysHaveSameItems(props.rightAnswer, pressedArray)) {
                    props.setRightAnswers(props.rightAnswers + 1)
                  }
                } else {
                  if(pressed === null){
                    setPressed(id)
                    if(id === props.rightAnswer) {
                      props.setRightAnswers(props.rightAnswers + 1)
                    }
                  }
                }
              }}
            >
              <Text style={[styles.optionsText, {color: id === pressed ? (pressed === props.rightAnswer && '#141414') : '#C2C2C2'}]}>
                {item}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <Pressable 
        style={[styles.selectButton, {backgroundColor: isSelectButton ? 'transparent' : '#FAC93E'}]}
        onPressIn={() => setIsSelectButton(true)}
        onPressOut={() => setIsSelectButton(false)}
        onPress={() => {
          props.setLevelCount(props.levelsCount + 1)
          if(props.levels === 1) {
            if(arraysHaveSameItems(props.rightAnswer, pressedArray)) {
              props.setRightAnswers(props.rightAnswers + 1)
            }
          }
        }}
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
    height: 100,
    borderRadius: 20,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionsText: {
    fontWeight: 400,
    fontSize: 40,
  }
});

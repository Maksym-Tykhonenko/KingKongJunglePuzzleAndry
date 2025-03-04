import React, {useContext, useState} from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Modal, Text, Image } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import { TabContext } from './navigation';
import Test from '../components/test';
import BackArrow from '../../assets/svg/back-arrow.svg';
import Hint from '../../assets/svg/hint.svg';
import Retry from '../../assets/svg/retry.svg';
import Home from '../../assets/svg/home.svg';
import Next from '../../assets/svg/next.svg';
import Banana from '../../assets/svg/banana.svg';
import Memorize from '../components/memorize';
import NextNumber from '../components/number';
import Puzzle from '../components/puzzle';
import Remembering from '../components/remembering';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Game({ navigation }: any) {
  const {levels, setLevels} = useContext(TabContext);
  const {points, setPoints} = useContext(TabContext);
  const {time, setTime} = useContext(TabContext);
  const {awards, setAwards} = useContext(TabContext);
  const [levelsCount, setLevelCount] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [hint, setHint] = useState('');
  const [isHint, setIsHint] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLevelCount(1)
    }, [])
  );

  function showHint() {
    if(levels === 0) {
      if(levelsCount === 1) {
        setHint('The answer is A')
      } else if(levelsCount === 2) {
        setHint('')
      } else if(levelsCount === 3) {
        setHint('15')
      } else if(levelsCount === 4) {
        setHint('The answer is B')
      } else if(levelsCount === 5) {
        setHint('Tiger, monkey, parrot, snake, jaguar')
      } 
    }
    if(levels === 1) {
      if(levelsCount === 1) {
        setHint('The answer is Jaguar')
      } else if(levelsCount === 2) {
        setHint('')
      } else if(levelsCount === 3) {
        setHint('The answer is C')
      } else if(levelsCount === 4) {
        setHint('5, 8, 3, 10, 7')
      } else if(levelsCount === 5) {
        setHint('The answer is Monkey')
      } 
    }
    if(levels === 2) {
      if(levelsCount === 1) {
        setHint('')
      } else if(levelsCount === 2) {
        setHint('The answer is 35')
      } else if(levelsCount === 3) {
        setHint('The answer is A')
      } else if(levelsCount === 4) {
        setHint('Jungle, River, Tree, Coconut, Elephant')
      } else if(levelsCount === 5) {
        setHint('26 bananas')
      } 
    }
    if(levels === 3) {
      if(levelsCount === 1) {
        setHint('The answer is C')
      } else if(levelsCount === 2) {
        setHint('The answer is C')
      } else if(levelsCount === 3) {
        setHint('The answer is 15')
      } else if(levelsCount === 4) {
        setHint('Yes')
      } 
    }
    setIsHint(true)
    setTimeout(() => {
      setIsHint(false)
    }, 3000);
  }

  async function setData(updatedPoints, updatedTime, updatedAwards) {
    await AsyncStorage.setItem('points', JSON.stringify(updatedPoints));
    await AsyncStorage.setItem('time', JSON.stringify(updatedTime));
    await AsyncStorage.setItem('awards', JSON.stringify(updatedAwards));
}

  function updateData() {
    setLevelCount(1)
    let newPoints = points;

    if (rightAnswers === 0) {
        newPoints -= 10;
    } else if (rightAnswers === 1) {
        newPoints += 5;
    } else if (rightAnswers === 2) {
        newPoints += 15;
    } else {
        newPoints += 25;
    }

    const newTime = time + 1;
    const newAwards = awards + 1;

    setPoints(newPoints);
    setTime(newTime);
    setAwards(newAwards);

    setTimeout(() => {
        setData(newPoints, newTime, newAwards);
    }, 100);
  }

  return (
    <ImageBackground
      source={require('../../assets/png/background.png')}
      resizeMode='cover'
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={styles.text}>
              {levelsCount} / {levels === 3 ? 4 : 5}
            </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((levelsCount) / (levels === 3 ? 4 : 5)) * 100}%`}
              ]}
            />
          </View>
        </View>
        <View>
          {isHint &&
            <View style={styles.hint}>
              <Text style={styles.hintText}>
                {hint}
              </Text>
            </View>
          }
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => showHint()}
          >
            <Hint />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {levels === 0 &&  
          <View>
            {levelsCount === 1 && 
              <Test 
                title={'Level 1: Easy Puzzles'} 
                subTitle={'You are walking through the jungle. There are three paths ahead. One leads to a river, one to a cave, and one to a tree. Where should you go to find water?'}
                options={['A) To a river', 'B) To a cave', 'C) To a tree']}
                rightAnswer={0}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
            {levelsCount === 2 && 
              <Memorize 
                title={'Level 1: Easy Puzzles'} 
                subTitle={'Memorize jungle animals: Tiger, monkey, parrot, snake, jaguar. Later we’ll ask you to repeat the list in the correct order.'}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
            {levelsCount === 3 && 
              <NextNumber
                title={'Level 1: Easy Puzzles'} 
                subTitle={'What is the next number?\n3, 6, 9, 12, ___'}
                options={['13', '18', '16', '15']}
                levelsCount={levelsCount}
                rightAnswer={3}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
            {levelsCount === 4 && 
              <Puzzle
                title={'Level 1: Easy Puzzles'} 
                subTitle={'A picture of a jungle is missing something...'}
                options={[require('../../assets/png/1-level-a.png'), require('../../assets/png/1-level-b.png'), require('../../assets/png/1-level-c.png')]}
                levelsCount={levelsCount}
                rightAnswer={1}
                setLevelCount={setLevelCount}
                full={require('../../assets/png/full-1-level.png')}
                notfull={require('../../assets/png/notfull-1-level.png')}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
            {levelsCount === 5 && 
              <Remembering
                title={'Level 1: Easy Puzzles'} 
                subTitle={'Remembering the Animals: write the list in the correct order which we asked you lately'}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
                setIsModal={setIsModal}
              />
            }
          </View>
        }
        {levels === 1 && 
          <View>
            {levelsCount === 3 && 
              <Test 
                title={'Level 2: Medium Puzzles'} 
                subTitle={'Identify the word that does not belong:\nJungle, River, Mountain, Banana'}
                options={['A) Jungle', 'B) River', 'C) Mountain', 'D) Banana']}
                rightAnswer={2}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
            {levelsCount === 2 && 
              <Memorize 
                title={'Level 2: Medium Puzzles'} 
                subTitle={'Memorize numbers: 5, 8, 3, 10, 7. Later we’ll ask you to repeat the list in the correct order.'}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
            {levelsCount === 4 && 
              <NextNumber
                title={'Level 2: Medium Puzzles'} 
                subTitle={'Remembering the Animals: write the list in the correct order which we asked you lately'}
                options={['8', '0', '3', '7', '9', '5', '10', '4', '1']}
                levelsCount={levelsCount}
                rightAnswer={[0, 2, 3, 5, 6]}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
                levels={levels}
              />
            }
            {levelsCount === 5 && 
              <Remembering
                title={'Level 2: Medium Puzzles'} 
                subTitle={'Identify the animal: I am small, I live in the jungle, I love bananas, and I often jump from tree to tree. Who am I?'}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
                setIsModal={setIsModal}
              />
            }
            {levelsCount === 1 && 
              <Remembering
                title={'Level 2: Medium Puzzles'} 
                subTitle={'Identify the animal: I am big and strong, have sharp teeth, and live in the jungle, but I’m not a tiger. Who am I?'}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
                setIsModal={setIsModal}
              />
            }
          </View>
        }
        {levels === 2 && 
          <View>
            {levelsCount === 4 && 
              <Remembering
              title={'Level 3: Harder Puzzles'} 
              subTitle={'Remembering the Animals: write the list in the correct order which we asked you lately'}
              levelsCount={levelsCount}
              setLevelCount={setLevelCount}
              setRightAnswers={setRightAnswers}
              rightAnswers={rightAnswers}
              setIsModal={setIsModal}
            />
            }
            {levelsCount === 1 && 
              <Memorize 
                title={'Level 3: Harder Puzzles'} 
                subTitle={'Memorize jungle animals: Jungle, River, Tree, Coconut, Elephant. Later we’ll ask you to repeat the list in the correct order.'}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
            {levelsCount === 2 && 
              <NextNumber
                title={'Level 3: Harder Puzzles'} 
                subTitle={'What is the next number\n7, 14, 21, 28, ___'}
                options={['41', '35', '34', '37']}
                levelsCount={levelsCount}
                rightAnswer={1}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
                levels={levels}
              />
            }
            {levelsCount === 5 && 
              <Remembering
                title={'Level 3: Harder Puzzles'} 
                subTitle={'A gorilla finds a pile of bananas in the jungle. He eats half of them, then gives 3 to his friend. After that, he eats half of what remains. Now, he has only 5 bananas left. How many bananas were there at the start?'}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
                setIsModal={setIsModal}
              />
            }
            {levelsCount === 3 && 
              <Puzzle
                title={'Level 3: Harder Puzzles'} 
                subTitle={'A picture of a jungle is missing something...'}
                options={[require('../../assets/png/3-level-a.png'), require('../../assets/png/3-level-b.png'), require('../../assets/png/3-level-c.png')]}
                levelsCount={levelsCount}
                rightAnswer={0}
                setLevelCount={setLevelCount}
                full={require('../../assets/png/notfull-3-level.png')}
                notfull={require('../../assets/png/notfull-3-level.png')}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
          </View>
        }
        {levels === 3 && 
          <View>
            {levelsCount === 2 && 
              <Test 
                title={'Level 4: Most Difficult Puzzles'} 
                subTitle={'Identify the word that does not belong:\nGorilla, Monkey, Lion, Elephant'}
                options={['A) Gorilla', 'B) Monkey', 'C) Lion', 'D) Elephant']}
                rightAnswer={2}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
            {levelsCount === 3 && 
              <NextNumber
                title={'Level 4: Most Difficult Puzzles'} 
                subTitle={'What is the next number? \n3, 6, 9, 12, ___'}
                options={['13', '18', '16', '15']}
                levelsCount={levelsCount}
                rightAnswer={3}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
                levels={levels}
              />
            }
            {levelsCount === 4 && 
              <Remembering
                title={'Level 4: Most Difficult Puzzles'} 
                subTitle={'A gorilla climbs a mountain at sunrise, reaches the top by sunset, and descends the next morning. Is there a moment when he is at the exact same spot both days?'}
                levelsCount={levelsCount}
                setLevelCount={setLevelCount}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
                setIsModal={setIsModal}
                levels={levels}
              />
            }
            {levelsCount === 1 && 
              <Puzzle
                title={'Level 4: Most Difficult Puzzles'} 
                subTitle={'A picture of a jungle is missing something...'}
                options={[require('../../assets/png/4-level-a.png'), require('../../assets/png/4-level-b.png'), require('../../assets/png/4-level-c.png')]}
                levelsCount={levelsCount}
                rightAnswer={0}
                setLevelCount={setLevelCount}
                full={require('../../assets/png/full-4-level.png')}
                notfull={require('../../assets/png/notfull-4-level.png')}
                setRightAnswers={setRightAnswers}
                rightAnswers={rightAnswers}
              />
            }
          </View>
        }
        {isModal && (
          <Modal animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={{position: 'absolute', top: -50}}>
                  <Image
                    source={rightAnswers === 0 ?
                      require('../../assets/png/try-again-star.png')
                    : rightAnswers === 1 ?
                      require('../../assets/png/nice-try-star.png')
                    : rightAnswers === 2 ?
                      require('../../assets/png/well-done-star.png')
                    : require('../../assets/png/amazing-star.png')}
                  />
                </View>
                <Text style={styles.modalTitle}>
                  {rightAnswers === 0 ?
                    'TRY AGAIN!'
                  : rightAnswers === 1 ?
                    'NICE TRY!'
                  : rightAnswers === 2 ?
                    'WELL DONE!'
                  : 'AMAZING!'
                  }
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.modalText}>
                    Reward
                    {rightAnswers === 0 ?
                      ' -10 '
                    : rightAnswers === 1 ?
                      ' +5 '
                    : rightAnswers === 2 ?
                      ' +15 '
                    : ' +25 '
                    }
                  </Text>
                  <Banana />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setRightAnswers(0)
                      setIsModal(false)
                      setLevelCount(1)
                      updateData()
                    }}
                  >
                    <Retry />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginHorizontal: 20}}
                    onPress={() => {
                      setRightAnswers(0)
                      setIsModal(false)
                      updateData()
                      navigation.navigate('Home')
                    }}
                  >
                    <Home />
                  </TouchableOpacity>
                  {levels < 2 &&
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setRightAnswers(0)
                        setIsModal(false)
                        updateData()
                        setLevels(levels + 1)
                      }}
                    >
                      <Next />
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: 32,
    marginTop: 50,
    color: '#141915',
    textAlign: 'center',
  },
  modalText: {
    fontWeight: 400,
    fontSize: 16,
    color: '#141915',
    textAlign: 'center',
    marginVertical: 20,
  },
  progressBar: {
    width: 150,
    height: 10,
    backgroundColor: '#141414',
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FAC93E',
    borderRadius: 10,
  },
  text: {
    fontWeight: 500,
    fontSize: 14,
    color: '#F6F6F6',
  },
  hint: {
    width: 150,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    left: -160,
    top: 7,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  hintText: {
    fontWeight: 400,
    fontSize: 12,
  }
});

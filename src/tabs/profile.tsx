import React, {useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, TouchableOpacity, Modal, Linking, Image, TextInput, ScrollView, Alert } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Support from '../../assets/svg/support.svg';
import ArrowDown from '../../assets/svg/arrow-down.svg';

export default function Profile({ navigation }: any) {
  const [isResetButton, setIsResetButton] = useState(false);
  const [isResetModal, setIsResetModal] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Female');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showSelectedDate, setShowSelectedDate] = useState<boolean>(false);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
          if (files) {
            setImageUri(files.path);
          } else {
            console.log(`File 'avatar.jpg' not found.`);
          }

          const nameAsync = await AsyncStorage.getItem('name');
          setName(nameAsync ? JSON.parse(nameAsync) : '');

          const lastNameAsync = await AsyncStorage.getItem('last-name');
          setLastName(lastNameAsync ? JSON.parse(lastNameAsync) : '');

          const genderAsync = await AsyncStorage.getItem('gender');
          setGender(genderAsync ? JSON.parse(genderAsync) : 'Female');

          const dateAsync = await AsyncStorage.getItem('date');
          if (dateAsync) {
            try {
              const parsedDate = JSON.parse(dateAsync);
              setSelectedDate(new Date(parsedDate));
              setShowSelectedDate(true);
            } catch (error) {
              console.error('Error parsing date from AsyncStorage:', error);
              setSelectedDate(new Date());
            }
          } else {
            setSelectedDate(new Date());
            setShowSelectedDate(false);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, []),
  );

  async function saveImage(uri: string) {
    try {
      const fileName = `image_${Date.now()}.jpg`;
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(uri, destinationPath);
      await RNFS.readDir(RNFS.DocumentDirectoryPath);
    } catch (error) {
      console.log('Error saving image:', error);
    }
  };

  function pickImage() {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        saveImage(selectedImage.uri);
      }
    });
  };

  function hideDatePicker() {
    setDatePickerVisible(false);
  };

  async function handleDatePickerConfirm(date: Date) {
    await AsyncStorage.setItem('date', JSON.stringify(date));
    hideDatePicker();
    setSelectedDate(date);
    setShowSelectedDate(true);
  };

  function saveAlert() {
    Alert.alert(
      'Your data is saved',
      '',
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const resetData = async () => {
    setIsResetModal(false);
    setImageUri('');
    setGender('Female');
    setName('');
    setLastName('');
    setShowSelectedDate(false);
    await AsyncStorage.setItem('name', JSON.stringify(''));
    await AsyncStorage.setItem('last-name', JSON.stringify(''));
    await AsyncStorage.setItem('gender', JSON.stringify('Female'));
    await AsyncStorage.setItem('date', JSON.stringify(new Date()));
  };

  async function saveData() {
    saveAlert();
    await AsyncStorage.setItem('name', JSON.stringify(name));
    await AsyncStorage.setItem('last-name', JSON.stringify(lastName));
    await AsyncStorage.setItem('gender', JSON.stringify(gender));
    await AsyncStorage.setItem('date', JSON.stringify(selectedDate));
  };

  function genderAlert() {
    Alert.alert(
      'What is your gender?',
      '',
      [
        {
          text: 'Female',
          onPress: () => {
            setGender('Female');
          },
        },
        {
          text: 'Male',
          onPress: () => {
            setGender('Male');
          },
        },
        {
          text: 'Other',
          onPress: () => {
            setGender('Other');
          },
        },
      ],
      {cancelable: false},
    );
  };

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
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL('mailto:aneckogri@gmail.com')}
          >
            <Support />
          </TouchableOpacity>
          <Text style={styles.title}>
            My Profile
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => saveData()}
          >
            <Text style={[styles.resetButtonText, {color: '#FAC93E'}]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{alignItems: 'center', marginVertical: 30}}
          >
            {!imageUri ? (
              <View style={styles.emptyImg}>
                <Text style={styles.imgText}>
                  {name && lastName ? `${name[0]}${lastName[0]}` : 'NL'}
                </Text>
              </View>
            ) : (
              <Image
                source={{uri: imageUri}}
                style={{
                  width: 136,
                  height: 136,
                  borderRadius: 100,
                }}
              />
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                pickImage();
              }}
            >
              <Text style={styles.uploadText}>
                Upload photo
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>
            Name
          </Text>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder='Name'
            onChangeText={(value: string) => setName(value)}
            placeholderTextColor={'#F6F6F6'}
          />
          <Text style={styles.label}>
            Last Name
          </Text>
          <TextInput
            style={styles.textInput}
            value={lastName}
            placeholder='Last Name'
            onChangeText={(value: string) => setLastName(value)}
            placeholderTextColor={'#F6F6F6'}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '45%'}}>
              <Text style={styles.label}>
                Date of Birth
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.textInput}
                onPress={() => {
                  setDatePickerVisible(true);
                }}>
                <Text
                  style={{
                    color: '#F6F6F6',
                  }}>
                  {showSelectedDate
                    ? moment(selectedDate).format('DD/MM/YY')
                    : 'DD/MM/YY'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '45%'}}>
              <Text style={styles.label}>
                Gender
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.textInput}
                onPress={() => {
                  genderAlert();
                }}>
                <Text style={{color: '#F6F6F6'}}>{gender}</Text>
              </TouchableOpacity>
              <ArrowDown
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 40,
                }}
              />
            </View>
          </View>
          <Pressable 
            style={[styles.resetButton, {backgroundColor: !isResetButton ? 'transparent' : '#FAC93E'}]}
            onPressIn={() => setIsResetButton(true)}
            onPressOut={() => setIsResetButton(false)}
            onPress={() => {
              setIsResetModal(true);
            }}
          >
            <Text style={[styles.resetButtonText, {color: !isResetButton ? '#FAC93E' : '#141414'}]}>
              Reset
            </Text>
          </Pressable>
          {isResetModal && (
          <Modal animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>
                  Are you sure that you want to reset all data?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: '#FAC93E',
                    },
                  ]}
                  onPress={() => resetData()}
                >
                  <Text
                    style={[
                      styles.resetButtonText,
                      {color: '#141414'},
                    ]}>
                    Rest
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.modalButton,
                    {backgroundColor: 'transparent'},
                  ]}
                  onPress={() => {
                    setIsResetModal(false);
                  }}>
                  <Text style={[styles.resetButtonText, {color: '#FAC93E'}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        </ScrollView>
      </View>
      <DateTimePickerModal
        date={new Date(selectedDate)}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDatePickerConfirm}
        onCancel={hideDatePicker}
        display="spinner"
      />
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
    fontSize: 24,
    color: '#F6F6F6',
  },
  resetButton: {
    borderColor: '#FAC93E',
    width: '100%',
    height: 63,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontWeight: 600,
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyImg: {
    width: 136,
    height: 136,
    borderRadius: 100,
    backgroundColor: '#004C38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgText: {
    fontWeight: 500,
    fontSize: 36,
    color: '#F6F6F6',
  },
  uploadText: {
    fontWeight: 500,
    fontSize: 18,
    color: '#92E3A9',
    marginTop: 15,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
    paddingVertical: 10,
    marginBottom: 30,
    color: '#F6F6F6'
  },
  label: {
    color: '#F6F6F680',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#141414',
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 30,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FAC93E'
  },
});

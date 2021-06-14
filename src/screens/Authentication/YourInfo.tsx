import { useWindowDimensions, View, Platform, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import {Button, Div, Text, Input, Icon} from 'react-native-magnus'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from 'lib/auth';
import {firestore} from 'lib/firebase'


export default function YourInfo({navigation}) {
    const onConfirmYourInfo = () => {
        console.log('Going to YourUsername page');
        if (!firstName || !lastName) {
            return alert('Please enter first and last name!');
            
        }
        console.log(firstName);
        console.log(lastName);
        navigation.navigate('YourUsername', {firstName, lastName});
    }

    const width = useWindowDimensions().width;

    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const authData = useAuth();

    useEffect(() => {
        async function isFirstLogin () {
            const uid = authData.userData.uid;
            const userDocument = await firestore.collection('users').doc(String(uid)).get();
            if (userDocument.exists) {
                console.log('found user document, is not first time user: ', uid);
                navigation.navigate('MainBottomTabNavigator');
            } else {
                console.log('unable to find user document id, so is first time user,: ', uid);
                setIsLoading(false);
                return;
            }
        }

        isFirstLogin();
        
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    return (
        isLoading ? 
        <View>
            <ActivityIndicator size='large'/>
        </View> 
        :
        <Div  alignItems='center' justifyContent='center' flex={1}>
        <View>
            <Div>
                <Div row mb={100}>
                    <Div flex={2} ml={50} mr={20}>
                        <Text fontSize={40} mb={10}>Your Info</Text>
                        <Text fontSize={15}>Please enter your name and upload a photo</Text>
                    </Div>
                    <Div flex={1}>
                        <TouchableOpacity onPress={pickImage}>
                        <Icon
                            name='camera'
                            rounded='circle'
                            fontSize='5xl'
                            bg='#d1d1d1'
                            w={80}
                            h={80}
                        />
                        </TouchableOpacity>
                    </Div>
                </Div>
                <Input fontSize={20} w={width * 0.9} mb={30} placeholder="First Name" bg='transparent' onChangeText={setFirstName}/>
                <Input fontSize={20} w={width * 0.9} mb={30} placeholder="Last Name" bg='transparent' onChangeText={setLastName}/>
                    
                <Button mt={100} onPress={onConfirmYourInfo} w={width * 0.9} rounded='circle' bg='#FAB77C'>
                    <Text fontSize={30}>Next</Text>
                </Button>
               
            </Div>
        </View>
        </Div>
    )
}
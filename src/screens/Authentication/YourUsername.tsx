import { useWindowDimensions, View } from 'react-native'
import {Button, Div, Text, Input} from 'react-native-magnus'
import React, {useState} from 'react'
import {firestore, auth} from 'lib/firebase'
import { useAuth } from 'lib/auth';

export default function YourUsername({route, navigation}) {
    const authData = useAuth();
    const {firstName, lastName} = route.params;
    const phoneNumber = auth.currentUser.phoneNumber;

    const onConfirmYourUsername = async () => {
        if (!username) return alert('Please enter a username!');

        console.log('Going to main bottom tab navigator');
        console.log('username', username);
        console.log('firstname', firstName);
        console.log('lastname', lastName);

        //check if username is not taken
        await firestore.collection('users').where('username', '==', username).get().then((querySnapshot)=>{
            console.log('other users with the same username: ', querySnapshot.size);
            if (querySnapshot.size != 0) {
                return alert('Username is already taken!');  
            } else {
                console.log('Username is unique! Continuing to next page');
                firestore.collection('users').doc(authData.userData.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    phoneNumber: phoneNumber
                });
                navigation.navigate('MainBottomTabNavigator');
            }
        });      
    }

    

    const [username, setUsername] = useState(null);

    const width = useWindowDimensions().width;
    return (
        <Div flex={1} justifyContent='center'>
        <View>
            <Div alignItems='center' justifyContent='center'>
                <Text fontSize={40} mb={20}>Your Username</Text>
                <Text fontSize={20} mb={20}>Enter your preferred username below</Text>
                <Input mt={100} fontSize={20} autoCapitalize='none' w={width * 0.9} mb={10} placeholder="Username" bg='transparent' onChangeText={setUsername}/>
                <Button mt={100} onPress={onConfirmYourUsername} alignSelf='center' w={width * 0.9} rounded='circle' bg='#FAB77C'>
                    <Text fontSize={30}>Next</Text>
                </Button>

            </Div>
        </View>
        </Div>
    )
}
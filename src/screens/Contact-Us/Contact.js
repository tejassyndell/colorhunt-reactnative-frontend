import { useState } from 'react';
import React  from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
export default function Contact() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        // Perform your API call or action here
        // For simplicity, I'm showing an alert instead of actual API calls
        Alert.alert(
            'Success',
            'Thank you! We will contact you soon.',
            [{ text: 'OK', onPress: () => console.log('Alert dismissed') }]
        );

        // Clear input fields after submission
        setUserName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ position: 'absolute' }}>
                {/* Replace with your image */}
                {/* <Image source={updateicon} style={{ height: 20, width: 20 }} /> */}
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image source={contectimg} style={{ height: 100, width: 100 }} /> */}

                <View>
                    <TextInput
                        placeholder="Name"
                        value={userName}
                        onChangeText={setUserName}
                        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
                    />
                    <TextInput
                        placeholder="Subject"
                        value={subject}
                        onChangeText={setSubject}
                        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
                    />
                    <TextInput
                        placeholder="Message"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300, height: 100 }}
                    />

                    <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 5, margin: 5, marginTop: 30 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }} onPress={handleSubmit}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

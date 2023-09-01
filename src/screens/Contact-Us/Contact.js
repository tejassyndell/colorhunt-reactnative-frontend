import { useState, navigation } from 'react';
import React from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { useLayoutEffect } from 'react';
import MenuBackArrow from '../../components/menubackarrow/menubackarrow'

export default function Contact(props) {
    const  {navigation} = props;
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const handleSubmit = async () => {
        // Perform your API call or action here
        // For simplicity, I'm showing an alert instead of actual API calls
        setShowValidationErrors(true)
        if (!userName || !email || !subject || !message) {
            Alert.alert('Validation Error.', 'Please fill in all fields before submitting.', [{ text: 'OK', onPress: () => console.log('Alert Dismissed') }]
            )
            return;
        }
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
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <MenuBackArrow
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                />
            ),
            headerTitle: () => (
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%"
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 25, fontWeight: 700, width: "100%"
                    }}>Contact Us</Text>
                </View>
            ),
        });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
            <TouchableOpacity>
                <View >
                    <Image source={require('../../../assets/ContactPagePNG/contact.png')} />
                </View>
            </TouchableOpacity>
            <View >
                <View>
                    <TextInput
                        placeholder="Name"
                        value={userName}
                        onChangeText={setUserName}
                        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
                    />
                    {showValidationErrors && userName === '' && <Text style={{color:'red'}}>This Field is Required</Text>}
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
                    />
                    {showValidationErrors && email === '' && <Text style={{color:'red'}}>This field is Required</Text>}
                    <TextInput
                        placeholder="Subject"
                        value={subject}
                        onChangeText={setSubject}
                        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
                    />
                    {showValidationErrors && subject === '' && <Text style={{color:'red'}}>This Field is Required</Text>}
                    <TextInput
                        placeholder="Message"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300, height: 100 }}
                    />
                    {showValidationErrors && message === '' && <Text style={{color:'red'}}>This Field is Required</Text>}
                    <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 5, margin: 5, marginTop: 30 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }} onPress={handleSubmit}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

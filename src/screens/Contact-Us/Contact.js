import { useState, navigation } from 'react';
import React from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { useLayoutEffect } from 'react';
import MenuBackArrow from '../../components/menubackarrow/menubackarrow'

export default function Contact(props) {
    const { navigation } = props;
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const handleSubmit = async () => {
        setShowValidationErrors(true)
        if (!userName || !email || !subject || !message) {
            // Alert.alert('Validation Error.', 'Please fill in all fields before submitting.', [{ text: 'OK', onPress: () => console.log('Alert Dismissed') }]
            // )
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
                        navigation.goBack();
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
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
                        style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 5, width: 300 }}
                    />
                    <View style={{position: 'absolute', top: 58, marginLeft:5}} >
                    {showValidationErrors && userName === '' && <Text style={{ color: 'red', fontSize:10 }}>This field is required</Text>}
                    </View>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 5, width: 300, marginTop: 20 }}
                    />
                    <View style={{position:'absolute', top:133, marginLeft:5}}>
                    {showValidationErrors && email === '' && <Text style={{ color: 'red', fontSize:10 }}>This field is required</Text>}
                    </View>
                    <TextInput
                        placeholder="Subject"
                        value={subject}
                        onChangeText={setSubject}
                        style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 5, width: 300, marginTop: 20 }}
                    />
                    <View style={{position:'absolute', top:207, marginLeft:5}}>
                    {showValidationErrors && subject === '' && <Text style={{ color: 'red', fontSize:10 }}>This field is required</Text>}
                    </View>
                    <TextInput
                        placeholder="Message"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 5, width: 300, marginTop: 20 }}
                    />
                    <View style={{position:'absolute',top:283, marginLeft:5}}>
                    {showValidationErrors && message === '' && <Text style={{ color: 'red', fontSize:10 }}>This field is required</Text>}
                    </View>
                    <View style={{  justifyContent: 'center', alignItems: 'center', marginTop:30 }}>
                        <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 5, width: 153, height: 47, justifyContent: 'center' }} onPress={handleSubmit}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Dimensions, Text, View, TouchableOpacity, TextInput, Image, Alert, StyleSheet } from 'react-native';
import MenuBackArrow from '../../components/menubackarrow/menubackarrow';
import { SendMail } from '../../api/api';
import ButtomNavigation from "../../components/AppFooter/ButtomNavigation";
import ResponsiveImage from 'react-native-responsive-image'; // Import the responsive image component

export default function Contact(props) {
    const { navigation } = props;
    const [username, setusername] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [inputWidth, setInputWidth] = useState();
    const [inputHeight, setInputHeight] = useState();
    const [buttonWidth, setButtonWidth] = useState(153); // Set the initial button width
    const [buttonFontSize, setButtonFontSize] = useState(18); // Set the initial button font size

    // Calculate the multiline TextInput height
    // Calculate the multiline TextInput height
    const numberOfLines = 4; // Set the number of lines for the multiline TextInput
    const lineHeight = 25; // Set the line height based on your design
    const multilineHeight = numberOfLines * lineHeight;

    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        let inputWidth = screenWidth * 0.9; // Default width
        let inputHeight = 40; // Default height
        let buttonWidth = 153; // Default button width
        let buttonFontSize = 18; // Default button font size

        if (screenWidth >= 768) {
            // Large screen (e.g., iPad)
            inputWidth = screenWidth * 0.6; // Adjust the width for larger devices
            inputHeight = 60; // Adjust the height for larger devices
            buttonWidth = screenWidth * 0.4; // Adjust the button width for larger devices
            buttonFontSize = 30; // Adjust the button font size for larger devices
        }

        // Update input dimensions based on screen width
        setInputWidth(inputWidth);
        setInputHeight(inputHeight);
        setButtonWidth(buttonWidth);
        setButtonFontSize(buttonFontSize);


    }, []);

    // Calculate the image dimensions based on screen size
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const aspectRatio = 239 / 234; // Image aspect ratio (width / height)
    const maxWidth = 0.6 * screenWidth; // Max width as a percentage of screen width
    const maxHeight = 0.6 * screenHeight; // Max height as a percentage of screen height

    let imageWidth = maxWidth; // Initialize image width to max width
    let imageHeight = maxWidth / aspectRatio; // Calculate initial height based on aspect ratio

    if (imageHeight > maxHeight) {
        // If the calculated height exceeds max height, adjust width and height
        imageHeight = maxHeight;
        imageWidth = maxHeight * aspectRatio;
    }


    const handleSubmit = async () => {
        console.log("Hello", username, email, subject, message)
        if (!username || !email || !subject || !message) {
            setShowValidationErrors(true);
            return;
        } else {
            setShowValidationErrors(false);
            Alert.alert(
                'Success',
                'Thank you! We will contact you soon.',
                [{ text: 'OK', onPress: () => console.log('Alert dismissed') }]
            );
            mail();
            // Clear input fields after submission
            setusername('');
            setEmail('');
            setSubject('');
            setMessage('');
        }
    };

    const mail = async () => {
        console.log(username, email, subject, message)
        const data = {
            username,
            email,
            subject,
            message
        }
        try {
            const result = await SendMail(data)
            if (result.status === 200) {
                const data = result.data
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                    }}>Contact us</Text>
                </View>
            ),
        });
    }, []);
    const styles = StyleSheet.create({
        submitButton: {
            backgroundColor: 'black',
            borderRadius: 6.711,
            width: buttonWidth,
            height: 47,
            justifyContent: 'center',
        },
        submitText: {
            color: 'white',
            textAlign: 'center',
            fontSize: buttonFontSize,
            fontWeight: 700,
        },
    });
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center', borderTopColor: "#828282", borderTopWidth: 1 }}>
                <ResponsiveImage source={require('../../../assets/ContactPagePNG/contact.png')} initWidth={imageWidth.toString()} initHeight={imageHeight.toString()} style={{ marginTop: 15 }} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View >
                    <View>
                        <View style={{ marginBottom: 5, height: 60 }}>
                            <TextInput
                                placeholder="User Name"
                                value={username}
                                onChangeText={setusername}
                                style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 5, width: inputWidth, height: inputHeight }}
                            />
                            {showValidationErrors && !username && <Text style={{ color: 'red', fontSize: 10, marginLeft: 10 }}>This field is required</Text>}
                        </View>
                        <View style={{ marginBottom: 5, height: 60 }}>
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 5, width: inputWidth, height: inputHeight }}
                            />
                            {showValidationErrors && !email && <Text style={{ color: 'red', fontSize: 10, marginLeft: 10 }}>This field is required</Text>}
                        </View>
                        <View style={{ marginBottom: 5, height: 60 }}>
                            <TextInput
                                placeholder="Subject"
                                value={subject}
                                onChangeText={setSubject}
                                style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 5, width: inputWidth, height: inputHeight }}
                            />
                            {showValidationErrors && !subject && <Text style={{ color: 'red', fontSize: 10, marginLeft: 10 }}>This field is required</Text>}
                        </View>
                        <View style={{ marginBottom: 5, height: multilineHeight }}>
                            <TextInput
                                placeholder='Message'
                                editable // Make the input editable
                                multiline // Allow multiple lines
                                numberOfLines={numberOfLines} // Set the number of lines to 4
                                maxLength={100} // Set the maximum character length to 100
                                value={message}
                                onChangeText={setMessage}
                                style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 8, paddingBottom: 70, margin: 5, width: inputWidth, height: multilineHeight }}
                            />
                            {showValidationErrors && !message && <Text style={{ color: 'red', fontSize: 10, marginLeft: 10 }}>This field is required</Text>}
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitText} >Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            >
                <ButtomNavigation isLoggedIn={true}  navigation={navigation} page="contactus" />
            </View>
        </View>
    )
}


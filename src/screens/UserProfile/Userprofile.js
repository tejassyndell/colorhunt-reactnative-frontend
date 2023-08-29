import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableHighlight } from 'react-native'
import styles from './style2'
import { Profiledata } from '../../api/api/api'
export default function Userprofile() {

    const [Profile, setprofile] = useState([])
    useEffect(()=>{
        fetchprofiledata()
    },[])
    const fetchprofiledata = async () => {
        try{
            const data = { party_id: 197}
            const response = await Profiledata(data);
            setprofile(response.data)
        } catch(err) {
            console.log(err,'error in fetching data')
        }
    }
    console.log(Profile)
    return (
        <>
            <View style={styles.TopContainer}>
                <TouchableHighlight>
                <View style={styles.Button}>
                    <Image source={require('../../../assets/Backbutton/menu_bar.jpg')} />
                </View>
                
                </TouchableHighlight>
                <TouchableHighlight>
                <View style={styles.Profile}>
                    <Image source={require('../../../assets/Profileicon/Frame 1171274903.png')}/>
                </View>
                </TouchableHighlight>
            </View>
            {Profile.map((item)=>(
                <View style={styles.BottomContainer} key={item.Id}>
                <View style={styles.hello}>
                    <Text style={styles.text} >{item.Name}</Text>
                </View>
                <View style={styles.hello}>
                    <Text style={styles.text} >{item.Address}</Text>
                </View>
                <View style={styles.hello}>
                    <Text style={styles.text} >{item.PhoneNumber}</Text>
                </View>
                <View style={styles.hello2}>
                    <View style={styles.abc}><Text style={styles.text}>{item.City}</Text></View>
                    <View style={styles.abc}><Text style={styles.text}>{item.State}</Text></View>
                </View>
                <View style={styles.hello2}>
                    <View style={styles.abc}><Text style={styles.text}>{item.Country}</Text></View>
                    <View style={styles.abc}><Text style={styles.text}>{item.PinCode}</Text></View>
                </View>
            </View>
            ))}
            
        </>
    )
}
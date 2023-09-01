import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableHighlight } from 'react-native'
import styles from './style2'
import { Profiledata } from '../../api/api'
<<<<<<< HEAD
export default function Userprofile() {

=======
import { useLayoutEffect } from 'react'
import MenuBackArrow from '../../components/menubackarrow/menubackarrow'
export default function Userprofile(props) {
    const  {navigation} = props;
>>>>>>> upstream/31_08_23
    const [Profile, setprofile] = useState([])
    useEffect(()=>{
        fetchprofiledata()
    },[])
    const fetchprofiledata = async () => {
        try{
<<<<<<< HEAD
            const data = { party_id: 197}
=======
            const data = { party_id:3}
>>>>>>> upstream/31_08_23
            const response = await Profiledata(data);
            setprofile(response.data)
        } catch(err) {
            console.log(err,'error in fetching data')
        }
    }
<<<<<<< HEAD
    console.log(Profile)
=======
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
                    }}>Profile</Text>
                </View>
            ),
        });
    }, []);
>>>>>>> upstream/31_08_23
    return (
        <>
            <View style={styles.TopContainer}>
                <TouchableHighlight>
                <View style={styles.Button}>
<<<<<<< HEAD
                    <Image source={require('../../../assets/Backbutton/menu_bar.jpg')} />
                </View>
                
=======
                    {/* <Image source={require('../../../assets/Backbutton/menu_bar.jpg')} /> */}
                </View>
>>>>>>> upstream/31_08_23
                </TouchableHighlight>
                <TouchableHighlight>
                <View style={styles.Profile}>
                <Image source={require('../../../assets/Profileicon/Frame_1171274903.png')}/>
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
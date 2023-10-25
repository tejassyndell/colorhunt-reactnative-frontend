import React, {
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Text,
    Dimensions,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import NetInfo from "@react-native-community/netinfo";

const App = () => {
    const [isOffline, setOfflineStatus] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });

        fetchUsers();

        return () => removeNetInfoSubscription();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        axios
            .get('https://picsum.photos/v2/list?page=0&limit=30')
            .then(({
                data
            }) => {
                setUsers(data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const Button = ({
        children,
        ...props
    }) => ( <
        TouchableOpacity style = {
            styles.button
        } {
            ...props
        } >
        <
        Text style = {
            styles.buttonText
        } > {
            children
        } < /Text> <
        /TouchableOpacity>
    );

    const NoInternetModal = ({
        show,
        onRetry,
        isRetrying
    }) => ( <
        Modal isVisible = {
            show
        }
        style = {
            styles.modal
        }
        animationInTiming = {
            600
        } >
        <
        View style = {
            styles.modalContainer
        } >
        <
        Text style = {
            styles.modalTitle
        } > Connection Error < /Text> <
        Text style = {
            styles.modalText
        } >
        Oops!Looks like your device is not connected to the Internet. <
        /Text> <
        Button onPress = {
            onRetry
        }
        disabled = {
            isRetrying
        } >
        Try Again <
        /Button> <
        /View> <
        /Modal>
    );

    const User = ({
        name,
        avatar
    }) => ( <
        View style = {
            styles.user
        } >
        <
        Image source = {
            {
                uri: avatar
            }
        }
        style = {
            styles.avatar
        }
        /> <
        View style = {
            styles.info
        } >
        <
        Text style = {
            styles.name
        } > {
            name
        } < /Text> <
        /View> <
        /View>
    );

    return ( <
        SafeAreaView style = {
            styles.container
        } >
        <
        FlatList onRefresh = {
            fetchUsers
        }
        refreshing = {
            isLoading
        }
        data = {
            users
        }
        renderItem = {
            ({
                item
            }) => ( <
                User name = {
                    item.author
                }
                avatar = {
                    item.download_url
                }
                />
            )
        }
        keyExtractor = {
            (item, index) => index.toString()
        }
        /> <
        NoInternetModal show = {
            isOffline
        }
        onRetry = {
            fetchUsers
        }
        isRetrying = {
            isLoading
        }
        /> <
        /SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    user: {
        width: Dimensions.get('screen').width - 32,
        alignSelf: 'center',
        marginVertical: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        marginLeft: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    name: {
        color: '#424242',
        fontSize: 16,
        fontWeight: '600',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '600',
    },
    modalText: {
        fontSize: 18,
        color: '#555',
        marginTop: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
});
export default App;

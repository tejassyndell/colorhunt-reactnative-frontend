import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Text, View, StyleSheet, TouchableOpacity, Image, Animated, Easing } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { getCategories } from "../../api/api";
import { useRef } from "react"
import {PanResponder } from "react-native";
export default function Filter({ onFilterChange, onCloseFilter, Scategories,
    minArticleRate,
    maxArticleRate, status }) {
    const [data, setData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(Scategories);
    const [selectedPriceRange, setSelectedPriceRange] = useState([minArticleRate, maxArticleRate]);
    const defaultPriceRange = [0, 700];
    const [isSliding, setIsSliding] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [positionY, setPositionY] = useState(Dimensions.get("window").height);
    console.log("{}{}{}{}{}{}{}{}{}");

    const Screenwidth = Dimensions.get('window').width
    const sliderlenghtinPercent = 60;
    const sliderLength = (Screenwidth * sliderlenghtinPercent) / 100;

    const getCategoriesname = async () => {
        try {
            const result1 = await getCategories();
            if (result1.status === 200) {
                setData(result1.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategoriesname();
    }, []);

    const handleCategorySelect = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const applyFilters = () => {
        onFilterChange(selectedCategories, selectedPriceRange);
        onCloseFilter(false)
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedPriceRange(defaultPriceRange);
        onFilterChange([], defaultPriceRange);
    };
    const closeFilter = () => {
        onCloseFilter(false)
    }

    const onValueChange = (newValues) => {
        setSelectedPriceRange(newValues);
        setIsSliding(true);
        console.log('Selected Price Range:', newValues);
    };

    const onSlidingStart = () => {
        setIsSliding(true);
    };

    const onSlidingComplete = () => {
        setIsSliding(false);
    };

    useEffect(() => {
        setSelectedCategories(Scategories)
    }, [Scategories])

    useEffect(() => {
        const slideUpAnimation = () => {
            Animated.timing(fadeAnim, {
                toValue: 2,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start(() => {
                setPositionY(0); // Set positionY to 0 after animation completes
            });
        };

        slideUpAnimation();
    }, []);
    const [thumb1Value, setThumb1Value] = useState(0);
    const [thumb2Value, setThumb2Value] = useState(100);
    const [thumb1Left, setThumb1Left] = useState(0);
    const [thumb2Left, setThumb2Left] = useState(200);

    const sliderWidth = 400; // Adjust the desired slider width
    const minValue = 155;
    const maxValue = 295; // Adjust the desired maximum value

    const handleMoveThumb1 = (gestureState) => {
        const { moveX } = gestureState;
        let newValue = (moveX / sliderWidth) * (maxValue - minValue);
        newValue = Math.max(minValue, Math.min(newValue, thumb2Value));
        setThumb1Value(newValue);
        setThumb1Left(moveX);
    };

    const handleMoveThumb2 = (gestureState) => {
        const { moveX } = gestureState;
        let newValue = (moveX / sliderWidth) * (maxValue - minValue);
        newValue = Math.max(thumb1Value, Math.min(newValue, maxValue));
        setThumb2Value(newValue);
        setThumb2Left(moveX);
    };

    const thumb1PanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            handleMoveThumb1(gestureState);
        },
    });

    const thumb2PanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            handleMoveThumb2(gestureState);
        },
    });

    return (
        <View style={[styles.container,
        {
            transform: [{ translateY: positionY }],
        }]}>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    width: '100%',
                    height: 'auto',
                    //   backgroundColor: 'blue',
                }}
            >
                {status === false ? <View style={status === false ? styles.header : styles.categoryx}>
                    <Text style={styles.headerText}>Categories</Text>
                    <TouchableOpacity onPress={closeFilter}>
                        <Image
                            source={require("../../../assets/FilterIcon/Close.png")}
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>
                </View> : ""}
                {status === false ? <View style={styles.categoriesContainer}>
                    {data.map((item) => (
                        <TouchableOpacity
                            key={item.Id}
                            style={[
                                styles.categoryItem,
                                selectedCategories.includes(item.Category) && {},
                            ]}
                            onPress={() => handleCategorySelect(item.Category)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategories.includes(item.Category) && { backgroundColor: 'white' },
                                ]}
                            >
                                {item.Category}
                            </Text>
                            <View
                                style={[
                                    styles.radioButton,
                                    selectedCategories.includes(item.Category) && { backgroundColor: 'white' },
                                ]}
                            >
                                {selectedCategories.includes(item.Category) && (
                                    <View style={styles.radioInnerCircle} />
                                )}
                            </View>

                        </TouchableOpacity>
                    ))}
                </View> : ""}
                <View style={styles.container2}>
                    {status ?
                        <View style={styles.headertrue}>
                            <Text style={styles.headerText}>Price Range </Text>
                            <TouchableOpacity onPress={closeFilter}>
                                <Image
                                    source={require("../../../assets/FilterIcon/Close.png")}
                                    style={styles.closeIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <Text style={styles.label}>Price Range</Text>}

                    <View style={styles.sliderContainer}>
                        <Text>{minArticleRate}</Text>
                        <View style={stylesslider.container}>
                            <View style={stylesslider.sliderTrack} />
                            <View
                                style={[stylesslider.thumb, { left: thumb1Left }]}
                                {...thumb1PanResponder.panHandlers}
                            >
                                <Text style={stylesslider.thumbText}>{thumb1Value}</Text>
                            </View>
                            <View
                                style={[stylesslider.thumb, { left: thumb2Left }]}
                                {...thumb2PanResponder.panHandlers}
                            >
                                <Text style={stylesslider.thumbText}>{thumb2Value}</Text>
                            </View>
                        </View>
                        <Text>{maxArticleRate}</Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.resetButton,
                            {
                                backgroundColor: selectedCategories.length > 0 ? "black" : "white",
                                color: selectedCategories.length > 0 ? "white" : "black",
                            },
                        ]}
                        onPress={resetFilters}
                    >
                        <Text
                            style={{
                                color: selectedCategories.length > 0 ? "white" : "black",
                                fontWeight: 'bold', fontSize: 18 // Add this line for bold text
                            }}
                        >
                            Reset
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}
const CustomMarker = ({ currentValue }) => {
    return (
        <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>{currentValue}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headertrue: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15
    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    closeIcon: {
        width: 35,
        height: 35,
    },
    categoriesContainer: {
        marginTop: 25,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        height: "auto",
    },
    categoryItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        width: "48%",
        height: 150,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: 8,
        padding: 5,
        height: "auto",
        maxHeight: "20%",
        justifyContent: "space-between",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 20, // For Android
    },
    // categoryx:{
    //     flex:1,
    //     display:'flex',
    //     flexDirection:'row',
    //     justifyContent:'flex-end',
    //     alignContent:'flex-end',
    //     width:'100%',
    // },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 3,
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "black",
    },
    categoryText: {
        fontSize: 12,
        marginLeft: 3,
        fontWeight: 500
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    button: {
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 8,
        width: 76,
        height: 38
    },
    container2: {
        marginTop: 5
    },
    label: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 700,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    resetButton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7.6,
        height: 38,
        fontSize: 24,
        fontWeight: 700,
        width: 76,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButton: {
        backgroundColor: 'black',
        borderRadius: 7.6,
        height: 38,
        width: 76,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: 600
    },
    tooltipContainer: {
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tooltipText: {
        position: 'absolute',
        top: 20,
        color: 'black',
        fontSize: 16,
    },
});

const stylesslider = StyleSheet.create({
    container: {
        width: 200,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    sliderTrack: {
        flex: 1,
        height: 5,
        backgroundColor: "lightgray",
    },
    thumb: {
        position: "absolute",
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
    thumbText: {
        color: "white",
        fontWeight: "bold",
    },
});
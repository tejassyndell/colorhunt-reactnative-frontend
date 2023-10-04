import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    PanResponder,
    Animated,
    Easing,
} from "react-native";
import { getCategories } from "../../api/api";
import { useRef } from "react";

export default function Filter({
    onFilterChange,
    onCloseFilter,
    Scategories,
    minArticleRate,
    maxArticleRate,
    status,
    spr,
}) {
    const [data, setData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(Scategories);
    const [selectedPriceRange, setSelectedPriceRange] = useState([
        minArticleRate,
        maxArticleRate,
    ]);
    const defaultPriceRange = [minArticleRate, maxArticleRate];
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [positionY, setPositionY] = useState(Dimensions.get("window").height);

    const Screenwidth = Dimensions.get("window").width;
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
        onCloseFilter(false);
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedPriceRange(defaultPriceRange);
        onFilterChange([], [minArticleRate, maxArticleRate]);
        setLeftValue(minArticleRate);
        setRightValue(maxArticleRate);
    };
    const closeFilter = () => {
        onCloseFilter(false);
    };

    useEffect(() => {
        setSelectedCategories(Scategories);
    }, [Scategories]);

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
    // Initialize leftValue and rightValue based on selectedPriceRange or default to minArticleRate and maxArticleRate
    const [leftValue, setLeftValue] = useState(
        spr.length > 0 ? spr[0] : minArticleRate
    );

    const [rightValue, setRightValue] = useState(
        spr.length > 0 ? spr[1] : maxArticleRate
    );

    const step = 1; // Change the step value as desired
    const borderWidth = 2; // Change the border width as desired

    const handleLeftMove = (dx) => {
        const newLeftValue = Math.min(
            Math.max(leftValue + dx, minArticleRate),
            maxArticleRate - step
        );
        const newRightValue = Math.max(rightValue, newLeftValue + step);
        setLeftValue(Math.round(newLeftValue));
        setRightValue(Math.round(newRightValue));
    };

    const handleRightMove = (dx) => {
        const newRightValue = Math.max(
            Math.min(rightValue + dx, maxArticleRate),
            leftValue + step
        );
        setRightValue(Math.round(newRightValue));
    };

    const panResponderLeft = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => handleLeftMove(gestureState.dx),
    });

    const panResponderRight = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => handleRightMove(gestureState.dx),
    });
    useEffect(() => {
        setSelectedPriceRange([leftValue, rightValue]);
    }, [leftValue, rightValue]);

    return (
        <View
            style={[
                styles.container,
                {
                    transform: [{ translateY: positionY }],
                },
            ]}
        >
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    width: "100%",
                    height: "auto",
                    //   backgroundColor: 'blue',
                }}
            >
                {status === false ? (
                    <View style={status === false ? styles.header : styles.categoryx}>
                        <Text style={styles.headerText}>Categories</Text>
                        <TouchableOpacity onPress={closeFilter}>
                            <Image
                                source={require("../../../assets/FilterIcon/Close.png")}
                                style={styles.closeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    ""
                )}
                {status === false ? (
                    <View style={styles.categoriesContainer}>
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
                                        selectedCategories.includes(item.Category) && {
                                            backgroundColor: "white",
                                        },
                                    ]}
                                >
                                    {item.Category}
                                </Text>
                                <View
                                    style={[
                                        styles.radioButton,
                                        selectedCategories.includes(item.Category) && {
                                            backgroundColor: "white",
                                        },
                                    ]}
                                >
                                    {selectedCategories.includes(item.Category) && (
                                        <View style={styles.radioInnerCircle} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    ""
                )}
                <View style={styles.container2}>
                    {status ? (
                        <View style={styles.headertrue}>
                            <Text style={styles.headerText}>Price Range </Text>
                            <TouchableOpacity onPress={closeFilter}>
                                <Image
                                    source={require("../../../assets/FilterIcon/Close.png")}
                                    style={styles.closeIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={styles.label}>Price Range</Text>
                    )}

                    <View style={styles.sliderContainer}>
                        <View style={{ width: "5%" }}>
                            <Text>{minArticleRate}</Text>
                        </View>
                        <View style={{ width: "80%" }}>
                            <View style={styles.sliderContainer}>
                                <View style={{ width: "100%" }}>
                                    <View style={styleslider.sliderContainer}>
                                        <View style={styleslider.slider}>
                                            <View style={styleslider.border} />
                                            <View
                                                style={[
                                                    styleslider.thumb,
                                                    {
                                                        left: `${(leftValue / maxArticleRate) * 100}%`,
                                                        borderColor: "black",
                                                    }, // Adjust the left handle's position here
                                                ]}
                                                {...panResponderLeft.panHandlers} // Attach the panResponderLeft here
                                            >
                                                <Text style={styleslider.thumbText}>{leftValue}</Text>
                                            </View>
                                            <View
                                                style={[
                                                    styleslider.thumb,
                                                    {
                                                        left: `${(rightValue / maxArticleRate) * 100}%`,
                                                        borderColor: "black",
                                                    },
                                                ]}
                                                {...panResponderRight.panHandlers}
                                            >
                                                <Text style={styleslider.thumbText}>{rightValue}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: "15%", zIndex: -5 }}>
                            <Text style={{ textAlign: "right" }}>{maxArticleRate}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.resetButton,
                            {
                                backgroundColor:
                                    selectedCategories.length > 0 ? "black" : "white",
                                color: selectedCategories.length > 0 ? "white" : "black",
                            },
                        ]}
                        onPress={resetFilters}
                    >
                        <Text
                            style={{
                                color: selectedCategories.length > 0 ? "white" : "black",
                                fontWeight: "bold",
                                fontSize: 18, // Add this line for bold text
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
        marginBottom: 15,
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
        fontWeight: "500",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    button: {
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        width: 76,
        height: 38,
    },
    container2: {
        marginTop: 5,
    },
    label: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "700",
    },
    sliderContainer: {
        flexDirection: "row",
        // alignItems: 'center',
        // justifyContent: 'space-between',
        width: "100%",
    },
    resetButton: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 7.6,
        height: 38,
        fontSize: 24,
        fontWeight: "700",
        width: 76,
        alignItems: "center",
        justifyContent: "center",
    },
    applyButton: {
        backgroundColor: "black",
        borderRadius: 7.6,
        height: 38,
        width: 76,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    tooltipContainer: {
        backgroundColor: "black",
        padding: 8,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    tooltipText: {
        position: "absolute",
        top: 20,
        color: "black",
        fontSize: 16,
    },
});

const styleslider = StyleSheet.create({
    // sliderContainer: {
    //     flex: 1,
    //     // justifyContent: 'center',
    //     // alignItems: 'center',
    //     paddingHorizontal: 10,
    // },
    slider: {
        flexDirection: "row",
        height: 20,
        // backgroundColor: 'lightgray',
        borderRadius: 10,
        position: "relative",
    },
    border: {
        position: "absolute",
        // height: '100%',
        width: "100%",
        top: 7.5,
        borderWidth: 1,
        borderColor: "black",
        zIndex: -1,
    },
    thumb: {
        width: 15,
        height: 15,
        backgroundColor: "black",
        borderRadius: 10,
        position: "absolute",
        borderWidth: 2,
        borderColor: "black",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    thumbText: {
        // marginTop:30,
        width: 30,
        textAlign: "center",
        position: "absolute",
        top: 15,
        color: "black",
        fontSize: 15,
        fontWeight: "500",
    },
});

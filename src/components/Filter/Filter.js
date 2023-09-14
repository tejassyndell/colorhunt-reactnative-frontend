import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { getCategories } from "../../api/api";
export default function Filter({ onFilterChange, onCloseFilter, Scategories,
    minArticleRate,
    maxArticleRate, }) {
    const [data, setData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(Scategories);
    const [selectedPriceRange, setSelectedPriceRange] = useState([minArticleRate,maxArticleRate]);
    const defaultPriceRange = [0, 700];
    
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
        // Check if the category is already selected
        if (selectedCategories.includes(category)) {
            // If selected, remove it from the array
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            // If not selected, add it to the array
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
    };
    useEffect(() => {
        setSelectedCategories(Scategories)
    }, [Scategories])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Categories</Text>
                <TouchableOpacity onPress={closeFilter}>
                    <Image
                        source={require("../../../assets/FilterIcon/Close.png")}
                        style={styles.closeIcon}
                    />
                </TouchableOpacity>
            </View>
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
                                selectedCategories.includes(item.Category) && {backgroundColor:'white'},
                            ]}
                        >
                            {item.Category}
                        </Text>
                        <View
                            style={[
                                styles.radioButton,
                                selectedCategories.includes(item.Category) && {backgroundColor:'white'},
                            ]}
                        >
                            {selectedCategories.includes(item.Category) && (
                                <View style={styles.radioInnerCircle} />
                            )}
                        </View>

                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.container2}>
                <Text style={styles.label}>Price Range: {selectedPriceRange[0]} - {selectedPriceRange[1]}</Text>
                <View style={styles.sliderContainer}>
                    <MultiSlider
                        values={selectedPriceRange}
                        sliderLength={320} // Customize the slider length as needed
                        onValuesChange={onValueChange}
                        min={minArticleRate}
                        max={maxArticleRate}
                        step={10}
                        allowOverlap={false} // Prevent thumbs from overlapping
                        snapped // Ensure values are snapped to step intervals
                        pressedMarkerStyle={{ backgroundColor: 'black' }}
                        customMarker={CustomMarker}
                        thumbTintColor="transparent"
                        selectedStyle={{
                            backgroundColor: 'black',
                        }}
                        unselectedStyle={{
                            backgroundColor: 'lightgray',
                        }}
                    />
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
                        }}
                    >
                        Reset
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                    <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const CustomMarker = () => (
    <View
        style={{
            width: 12, // Adjust the width of the thumb as needed
            height: 12, // Adjust the height of the thumb as needed
            borderRadius: 12, // Make it a circle
            backgroundColor: "black", // Set the color of the thumbs to black
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1, // Add zIndex to ensure it appears above the track
        }}
    >
    </View>
);


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
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    closeIcon: {
        width: 35,
        height: 35,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "gray",
        marginBottom: 20,
        marginTop: 20,
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
        borderColor: "rgba(0, 0, 0, 0.25)", // Border color
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
        marginTop: 10,
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
        marginTop: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    sliderContainer: {
        width: '100%',
    },
    resetButton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7.6,
        height: 38,
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
        fontSize:18,
        fontWeight:600
    }
});

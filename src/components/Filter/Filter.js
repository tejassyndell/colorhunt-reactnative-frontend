import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { getCategories } from "../../api/api";
export default function Filter({onFilterChange, onCloseFilter}) {
    const [data, setData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
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
                        key={item.Category}
                        style={[
                            styles.categoryItem,
                            selectedCategories.includes(item.Category) && {},
                        ]}
                        onPress={() => handleCategorySelect(item.Category)}
                    >
                        <View
                            style={[
                                styles.radioButton,
                                selectedCategories.includes(item.Category) && {},
                            ]}
                        >
                            {selectedCategories.includes(item.Category) && (
                                <View style={styles.radioInnerCircle} />
                            )}
                        </View>
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategories.includes(item.Category) && {},
                            ]}
                        >
                            {item.Category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={resetFilters}
                    style={[styles.button, { marginRight: 40 }]}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { marginLeft: 40 }]}
                    onPress={applyFilters}
                >
                    <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
            </View>
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
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        height: "auto",
        maxHeight: "20%",
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "black",
    },
    categoryText: {
        fontSize: 12,
        marginLeft: 5,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        backgroundColor: "black",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        flex: 1,
    },
    buttonText: {
        color: "white",
    },
});

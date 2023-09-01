import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function FilterComponent({ categoriesData, catagoryHandler, clearFilters, applyFilters }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterText, setFilterText] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    catagoryHandler(category);
  };

  return (
    <View>
      <TextInput
        placeholder="Filter by category..."
        value={filterText}
        onChangeText={(text) => setFilterText(text)}
        style={{
          borderBottomWidth: 1,
          borderColor: "gray",
          marginBottom: 10,
        }}
      />

      {categoriesData
        .filter((category) =>
          filterText ? category.Category.toLowerCase().includes(filterText.toLowerCase()) : true
        )
        .map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategorySelect(category.Category)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selectedCategory === category.Category ? "blue" : "gray",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              {selectedCategory === category.Category && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "blue",
                  }}
                />
              )}
            </View>
            <Text>{category.Category}</Text>
          </TouchableOpacity>
        ))}

      <TouchableOpacity onPress={() => setSelectedCategory(null)}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={applyFilters}>
        <Text>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Filter = ({
  categoriesData,
  selectedCategories,
  setCategories,
  clearFilters,
  applyFilters,
}) => {
  const catagoryHandler = (selectedCategory) => {
    if (selectedCategories.includes(selectedCategory)) {
      setCategories(
        selectedCategories.filter((cat) => cat !== selectedCategory)
      );
    } else {
      setCategories([...selectedCategories, selectedCategory]);
    }
  };

  return (
    <View>
      {categoriesData.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => catagoryHandler(category.Category)}
        >
          <Text>{category.Category}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={clearFilters}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={applyFilters}>
        <Text>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;

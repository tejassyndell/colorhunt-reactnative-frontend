import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,

} from "react-native";
// import RangeSlider from "react-native-range-slider-expo/src/RangeSlider";
export default function FilterComponent({
  categoriesData,
  selectedCategories, // Pass the selected categories as a prop
  setSelectedCategories, // Function to update selected categories
  clearFilters,
  applyFilters,
  setrateRange
}) {
  const [filterText, setFilterText] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);







  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  // close the filter
  const handleCloseFilter = () => {
    clearFilters();
  };

  // Reset the Filter

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0,1000]);
  };



  // Disable the button while not seletd the categarys
  let isApplyDisabled = selectedCategories.length === 0;
  
  // const handleApplyFilter = () => {
  //   // Your filter application logic here
  //   applyFilters();
  // };
  handleSliderChange = (e) => {
    // console.log(e);
    // e[0]!==0 || e[1]!==1000? isApplyDisabled = true :""
    setPriceRange([e[0],e[1]])
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
        <TouchableOpacity onPress={handleCloseFilter}>
          {/* Add this TouchableOpacity */}
          <Image
            source={require("../../../assets/FilterIcon/Close.png")}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* <TextInput
        placeholder="Filter by category..."
        value={filterText}
        onChangeText={(text) => setFilterText(text)}
        style={styles.input}
      /> */}

      <View style={styles.categoriesContainer}>
        {categoriesData
          .filter((category) =>
            filterText
              ? category.Category.toLowerCase().includes(
                filterText.toLowerCase()
              )
              : true
          )
          .map((category, index) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategorySelect(category.Category)}
              style={[
                styles.categoryItem,
                {
                  borderColor: selectedCategories.includes(category.Category)
                    ? "black"
                    : "gray",
                },
              ]}
            >
              <View
                style={[
                  styles.categoryIcon,
                  {
                    marginRight: 10,
                  },
                ]}
              >
                {selectedCategories.includes(category.Category) && (
                  <View style={styles.selectedIcon} />
                )}
              </View>
              <Text style={styles.categoryText}>{category.Category}</Text>
            </TouchableOpacity>
          ))}
      </View>


      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Price Range:</Text>
       
        <MultiSlider
          values={priceRange}
          // enableLabel // Enable labels below dots
          // sliderLength={300} // Adjust the length as needed
          onValuesChange={(e)=>{handleSliderChange(e)}}
          min={0}
          max={1000}
          step={1} // You can adjust the step size
          
          customMarkerLeft={(e) => (
            <CustomSliderMarker
              currentValue={priceRange[0]}
              isLeftMarker={true}
              labelStyle={styles.label}
              
            />
          )}
          customMarkerRight={(e) => (
            <CustomSliderMarker
              currentValue={priceRange[1]}
              isLeftMarker={false}
              labelStyle={styles.label}
            />
          )}
        />
        <Text style={styles.sliderValue}>

          Min: {priceRange[0]} - Max: {priceRange[1]}
        </Text>
      </View>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.button, { marginRight: 40 }]}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{setrateRange(priceRange);applyFilters()}}
          style={[styles.button, { marginLeft: 40 }, { backgroundColor: isApplyDisabled ? "gray" : "black" }, // Change button color based on disabled state
          ]}
          disabled={isApplyDisabled} // Set disabled attribute based on the condition
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// CSS of all Feild
const CustomSliderMarker = (props)=>{
 
    const { currentValue, isLeftMarker ,labelStyle } = props;
    console.log(currentValue);
    return (
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: 'black', // Set dot color to black
            borderBottomColor:"black",
            borderRadius: 10, // Make it round
            borderColor: 'black', // Border color
            borderWidth: 2, // Border width
          }}
        />
        <Text  style={labelStyle}>{currentValue}</Text>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: "auto"
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "48%", // Two items in a row with some spacing
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: "auto",
    maxHeight: "20%"
  },
  categoryIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "black",
  },
  categoryText: {
    fontSize: 12, // Adjust font size as needed
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
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: "100%",
  },
  label: {
    marginTop: 5, // Adjust label position
    fontSize: 14, // Customize label font size
    color: 'red', // Customize label color
  }
});

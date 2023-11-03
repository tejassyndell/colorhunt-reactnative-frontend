import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";
import RecipesListScreen from "../screens/RecipesList/RecipesListScreen";
// import DrawerContainer from "../../src/screens/DrawerContainer/DrawerContainer";
import IngredientScreen from "../screens/Ingredient/IngredientScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import AllArticleScreen from "../screens/AllArticle/AllArticle";
import IngredientsDetailsScreen from "../screens/IngredientsDetails/IngredientsDetailsScreen";
import Userprofile from "../screens/UserProfile/Userprofile";
import Contact from "../screens/Contact-Us/Contact";
import DetailsOfArticals from "../screens/Artical-details/DetailsOfArticals";
import AddToCart from "../screens/Cart/AddToCart";
import CategorisWiseArticle from "../screens/CategorisWiseArticle/CategorisWiseArticle";
import WishList from "../screens/WishList/wishlist";
import Orderlist from "../screens/OrderList/Orderlist";
import Notification from "../screens/Notification/Notification";
import Login from "../screens/Login/Login";
import OrderHistory from "../screens/OrderHistory/OrderHistory";
import SliderScreen from "../screens/SliderScreen/SliderScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import { useEffect } from "react";
import OrderDetails from "../screens/OrderHistory/OrderDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Aboutus from "../screens/AboutUs/Aboutus";

// @ts-ignore

const Stack = createStackNavigator();
let value = false;
let name = "";
function MainNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getstatus = (status, val) => {
    setIsLoggedIn(status);
    value = status;
    name = val;
  };
  return (
    <Stack.Navigator screenOptions={{ unmountInactiveRoutes: true }}>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
        initialParams={{ getstatus }}
      />
      <Stack.Screen
        name="Slider"
        component={SliderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="RecipesList" component={RecipesListScreen} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AllArticle" component={AllArticleScreen} />
      <Stack.Screen
        name="IngredientsDetails"
        component={IngredientsDetailsScreen}
      />
      <Stack.Screen name="Profile" component={Userprofile} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="DetailsOfArticals" component={DetailsOfArticals} />
      <Stack.Screen name="Wishlist" component={WishList} />
      <Stack.Screen
        name="CategorisWiseArticle"
        component={CategorisWiseArticle}
      />
      <Stack.Screen name="cart_list" component={AddToCart} />
      <Stack.Screen name="Orderlist" component={Orderlist} />

      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ordershistroy" component={OrderHistory} />
      <Stack.Screen name="DrawerContainer" component={DrawerContainer} />
      <Stack.Screen name="orderdetails" component={OrderDetails} />
      <Stack.Screen name="Aboutus" component={Aboutus} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function fetchData() {
    try {
      const userData = await AsyncStorage.getItem("UserData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.length > 0) {
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {
    // Fetch user data and update state variables accordingly
    fetchData();
  }, []);
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: false,
        swipeEnabled: false,
      }}
      drawerContent={({ navigation }) => (
        <DrawerContainer
          navigation={navigation}
          isLoggedIn={value}
          name={name}
        />
      )}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;

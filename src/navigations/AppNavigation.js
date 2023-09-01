import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' 
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import AllArticleScreen from '../screens/AllArticle/AllArticle';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import Userprofile from '../screens/UserProfile/Userprofile';
import Contact from '../screens/Contact-Us/Contact';
import DetailsOfArticals from '../screens/Artical-details/DetailsOfArticals';
import AddToCart from '../screens/Cart/AddToCart';
import CategorisWiseArticle from '../screens/CategorisWiseArticle/CategorisWiseArticle';
import WishList from '../screens/WishList/wishlist';
 const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen}/>
      <Stack.Screen name='Recipe' component={RecipeScreen}/>
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name="AllArticle" component={AllArticleScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
      <Stack.Screen name='Profile' component={Userprofile} />
      <Stack.Screen name='Contact' component={Contact} />
      <Stack.Screen name='DetailsOfArticals' component={DetailsOfArticals} />
      <Stack.Screen name='Wishlist' component={WishList} />
      <Stack.Screen name='CategorisWiseArticle' component={CategorisWiseArticle} />
      <Stack.Screen name='cart_list' component={AddToCart} />
    </Stack.Navigator>
  )
} 



 const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      drawerStyle={{
        width: 250
      }}
      screenOptions={{headerShown: false}}
      drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} 


 export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} 
 

console.disableYellowBox = true;
import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';
import * as Font from "expo-font";


const IngredientStyles = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadCustomFont = async () => {
      try {
        await Font.loadAsync({
          Glory: require("../../../assets/Fonts/Glory.ttf"),
        });
        setIsFontLoaded(true);
      } catch (error) {
        console.error("Error loading custom font:", error);
      }
    };

    loadCustomFont();
  }, []);


const styles = StyleSheet.create({
  titleIngredient: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: isFontLoaded ? 'Glory' : undefined,

  },
  photoIngredient: {
    width: '100%',
    height: 250,
    alignSelf: 'center'
  },
  ingredientInfo: {
    color: 'black',
    margin: 10,
    fontSize: 19,
    fontFamily: isFontLoaded ? 'Glory' : undefined,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category
});

  return styles;
};

export default IngredientStyles;

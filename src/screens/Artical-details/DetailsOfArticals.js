import { View, Text, Image } from "react-native"
import { ArticleDetails } from '../../api/api'
import Menubar from '../../../assets/Colorhuntimg/menu bar (1).svg'
import Carousel from "react-native-snap-carousel";
import axios from "axios"
import cart from '../../../assets/images/icon.png'
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"

const DetailsOfArticals = (props) => {
    const { navigation } = props;
    const route = useRoute();
    const { id } = route.params;

    const handleSizeClick = (size) => { }
    // const { id } = useParams()//Use this with navigate
    useEffect(() => {
      ArticleDetailsData()
    }, [])
    const [availableStock, setAvailableStock] = useState([])
    const [quantities, setQuantities] = useState({})
    const [articlePhotos, setArticlePhotos] = useState([])
    const [articleCategory, setArticleCategory] = useState()
    const [articleRatio, setArticleRatio] = useState()
    const [articleRate, setArticleRate] = useState()
    const [articleSizeData, setArticleSizeData] = useState()
    const [articleColorver, setArticleColorver] = useState([])
    const [articleNumber, setArticlenumber] = useState()
    const [salesnopacks, setSalesnopacks] = useState('')
    const [nopacks, setNopacks] = useState(0)
    const [combinedArray, setCombinedArray] = useState([])
    const [subcategory, setSubcategory] = useState()
    const [isZoomed, setIsZoomed] = useState(true);
    const ArticleDetailsData = async () => {
        let data = {
            ArticleId: 883,
            PartyId: 197,
        }
        try {
            const res = await ArticleDetails(data)
            console.log('dd', res.data)
            setArticlePhotos(res.data.photos)
            setArticleCategory(res.data.calculatedData[0].Category)
            setSubcategory(res.data.calculatedData[0].subcategory)
            setArticleRatio(res.data.calculatedData[0].ArticleRatio)
            setArticleRate(res.data.calculatedData[0].ArticleRate)
            setArticleSizeData(JSON.parse(res.data.calculatedData[0].ArticleSize))
            setArticleColorver(JSON.parse(res.data.calculatedData[0].ArticleColor))
            setArticlenumber(res.data.calculatedData[0].ArticleNumber)
            setSalesnopacks(res.data.calculatedData[0].SalesNoPacks)
            setNopacks(res.data.calculatedData[0].NoPacks)
            console.log(nopacks)
            // const salesnopackstoArray = res.data.calculatedData[0].SalesNoPacks.split(",");
            // const salesnopackstoArray = [1, 2, 3, 4]
            const salesnopackstoArray = [nopacks]
            setAvailableStock(salesnopackstoArray.map((stock) => parseInt(stock)))
            console.log(availableStock)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const colorwithindex = articleColorver.map((element, index) => ({
            ...element,
            index: index,
        }))
        const stockswithindex = availableStock.map((element, index) => ({
            value: element,
            index: index,
        }))
        const combinedArray = colorwithindex.map((coloritem) => {
            const stockitem = stockswithindex.find((stockitem) => stockitem.index === coloritem.index)
            return {
                ...coloritem,
                available: stockitem ? stockitem.value : 0,
                Rate: articleRate,
            }
        })
        setCombinedArray(combinedArray)
        const defaultQuantities = {}
        combinedArray.forEach((item) => {
            defaultQuantities[item.index] = 0
        })
        setQuantities(defaultQuantities)
    }, [articleColorver, availableStock, articleRate])

    const addtocart = async (PartyId, ArticleId) => {
        if (!combinedArray) {
            console.log('undefined')
            return
        }
        const colorwiseQuantities = combinedArray.map((coloritem) => quantities[coloritem.index])
        console.log('colorwise quantity :', colorwiseQuantities)
        const colorwiseQuantitiesTOstring = colorwiseQuantities.join(',')
        console.log('cqty to string ', colorwiseQuantitiesTOstring)
        console.log(totalPrice)
        const data = {
            party_id: PartyId,
            article_id: ArticleId,
            Quantity: colorwiseQuantitiesTOstring,
            rate: totalPrice,
        }
        try {
            const response =await addtocart(data);
            console.log('APi Response:', response.data)
        } catch (error) {
            console.log('Error Adding to Cart:', error)
        }
        // navigate('/cart_list', { state: { totalPrice } })
        navigation.navigate('cart_list', { totalPrice });
    }

    const totalPrice = Object.keys(quantities).reduce(
        (total, colorIndex) => total + quantities[colorIndex] * (combinedArray[colorIndex].Rate / 10),
        0,
    )
    const formatPrice = (value) => {
        return `₹${value.toFixed(2)}`
    }
    // uploard url image
    const baseImageUrl = 'https://colorhunt.in/colorHuntApi/public/uploads/';
    const imageElements = articlePhotos.map((fileName, index) => (
        <Image source={{ uri: baseImageUrl + fileName }} style={{ width: 100, height: 100 }} key={index} />
    ));
    const handleIncrease = (colorIndex) => {
        if (!combinedArray || !combinedArray[colorIndex]) {
            return
        }
        console.log(quantities[colorIndex])
        console.log(combinedArray[colorIndex].available)
        if (quantities[colorIndex] < nopacks) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [colorIndex]: prevQuantities[colorIndex] + 1,
            }))
        }
    }
    const handleDecrease = (colorIndex) => {
        if (!combinedArray || !combinedArray[colorIndex]) {
            return
        }
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [colorIndex]: Math.max(prevQuantities[colorIndex] - 1, 0),
        }))
    }
    const totalQuantity = Object.values(quantities).reduce((total, quantity) => total + quantity, 0);
    console.log(totalQuantity)

    const [magnifyStatus, setMagnifyStatus] = useState(false);
    const [prdImage, setPrdImage] = useState();
    return (
        <View>
            <Text>
                DetailsOfArticals {id}
            </Text>
        </View>
    )
}

export default DetailsOfArticals;
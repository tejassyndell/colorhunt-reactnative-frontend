import { View, Text, Image, TouchableHighlight, Dimensions, Pressable } from "react-native"
import { ArticleDetails } from '../../api/api'
import Menubar from '../../../assets/Colorhuntimg/menu bar (1).svg'
import Carousel from "react-native-snap-carousel";
import axios from "axios"
import cart from '../../../assets/images/icon.png'
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native";



const DetailsOfArticals = (props) => {
    const { navigation } = props;
    const { width: viewportWidth } = Dimensions.get("window");

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
            console.log('dd', res.data.photos)
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
            const response = await addtocart(data);
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
    const renderImage = ({ item }) => (
        <TouchableHighlight>
            <View style={{ height: "100%", width: "100%" }}>
                <Image style={{ height: 520, width: "100%" }} source={{ uri: baseImageUrl + item }} />
            </View>
        </TouchableHighlight>
    );
    return (
        <View style={styles.container}>
            <View >
                <ScrollView >
                    <View >
                        <View>
                            <Carousel
                                data={articlePhotos}
                                renderItem={renderImage}
                                sliderWidth={viewportWidth}
                                itemWidth={viewportWidth}
                                loop={true}
                                autoplay={true}
                                autoplayInterval={3000}
                            >
                            </Carousel>
                        </View>
                        <View style={{
                            width: "100%",
                            position: "absolute",
                            top: "70%",
                        }}>
                            <Text style={{
                                fontSize: 26,
                                textAlign: "center",
                                fontWeight: 600
                            }}>Artical No:{articleNumber}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.productDetails}>
                <ScrollView>
                    <View style={styles.product_detail} >
                        <View style={styles.product_detail_sec}>
                            <Text style={styles.size_label}>Size</Text>
                            <View style={styles.size_container1}>
                                {articleSizeData &&
                                    articleSizeData.map((item, index) => (
                                        <View style={styles.size_options} key={index}>
                                            <View style={styles.size}>
                                                <Text href="/" style={styles.size_a} onPress={() => handleSizeClick(item.Name)}>
                                                    {item.Name}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                            </View>
                        </View>
                        <View style={styles.product_detail_sec2}>
                            <Text style={styles.size_label1}>Category</Text>
                            <View style={styles.size_container2}>
                                <View style={styles.size_options}>
                                    {/* <p>{articleCategory}</p> */}
                                    <Text style={styles.size_p}>{subcategory}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.product_detail_sec3}>
                        <View style={styles.container_grid}>
                            <View style={styles.head_grid}>
                                <View style={styles.color_div}>
                                    <Text style={styles.color_title}>Color</Text>
                                </View>
                                <View style={styles.available_div}>
                                    <Text style={styles.available_title}>Available in Stock</Text>
                                </View>
                                <View style={styles.qty_div}>
                                    <Text style={styles.qty_title}>Add Qty.</Text>
                                </View>
                            </View>
                            <View style={styles.body_main_con}>
                                {combinedArray.map((item) => (
                                    <View key={item.Id}>
                                        <View style={styles.row} >
                                            <View style={styles.color_box_div}>
                                                <Text style={styles.color_box}>{item.Name}</Text>
                                            </View>
                                            <View style={styles.available_box_div}>
                                                <Text style={styles.available_box}>{nopacks}</Text>
                                            </View>

                                            <View style={styles.qty_box_div}>
                                                <View style={styles.qty_box}>
                                                    <View style={styles.top_row}>
                                                        <View style={styles.box1}>
                                                            <Pressable
                                                                style={styles.box1_butn}
                                                                onPress={() => handleDecrease(item.index)}
                                                                disabled={quantities[item.index] <= 0}
                                                            >
                                                                <Text>-</Text>
                                                            </Pressable>
                                                            

                                                        </View>
                                                        <View style={styles.box2}>
                                                            <Text style={{textAlign:"center"}}>{quantities[item.index]}</Text>
                                                        </View>
                                                        <View style={styles.box3}>
                                                            <Pressable
                                                            style={styles.box3_butn}
                                                                onPress={() => handleIncrease(item.index)}
                                                                 disabled={quantities[item.index] >= nopacks}
                                                            >
                                                                <Text>+</Text>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                    {/* <View style="article-ratio-Section">
             <View style="article-ratio-container">
                 <div style="articallabel">Artical Ratio</div>
                 <div style="article-ratio-content">{articleRatio}</div>
             </View>

             <View style="article-rate-container">
                 <div style="articallabel1">Artical Rate</div>
                 <div style="article-rate-content">{articleRate / 10}</div>
             </View>
         </View>
         <View style="total-price-container">
             <View style="main-total-div">
                 <span style="total-price-title">Total Price</span> <br />
                 <span style="total-price-dig">{formatPrice(totalPrice)}</span>
             </View>

             <View style="add-to-card-container">
                 <button style="add-to-cart-button" onClick={() => addtocart(197, id)}>
                     <img src={cart} alt="cart" /> Add To Cart
                 </button>
             </View>
         </View> */}
                </ScrollView>
            </View>
        </View>
    )
}

export default DetailsOfArticals;
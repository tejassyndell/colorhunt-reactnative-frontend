/* eslint-disable */
import React,{useState,useEffect,useRef } from 'react'
import {
  CForm,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormCheck,
  CFormSelect,
  CContainer,
  CRow,
  CCol
} from '@coreui/react'
import Select from 'react-select';
import './css/product.css'
import { fetchProductDetails, storeProdcutdata,ProductsDetails } from '../../api/api'
import Message_alert from "../../orders/orderComponents/Message_alert"
// import VariationList from '../components/variationList';
import { useNavigate } from 'react-router-dom';


const CreateProduct = ()=>{
  const intialProductValues = {
    Category : "1",
    Name : "",
    Code : "",
    Description : "",
    GroupName: "",
    GroupCode: "",
    group: [],
    MattressSizes : [],
    Springs : [],
    BaseSizes : [],
    BaseFabricColour : [],
    FeetOption : [],
    FootBoard : [],
    Drawers : [],
    HeadboardSizes : [],
    HeadboardColur : [],
    MattSizeCode : [],
    SpringCountCode : [],
    DrwCode : [],
    BaseCode : [],
    HeadCode : [],
    FootBoardCode : [],
    FeetCode : [] 
  }
  const saveBtnRef = useRef(null);
  const [selectedMattressSizes, setSelectedMattressSizes] = useState([]);
  const [selectedSprings, setSelectedSprings] = useState([]);
  const [selectedBaseSizes, setSelectedBaseSizes] = useState([]);
  const [selectedBaseFabricColour, setSelectedBaseFabricColour] = useState([]);
  const [selectedFeetOption, setSelectedFeetOption] = useState([]);
  const [selectedFootBoard, setSelectedFootBoard] = useState([]);
  const [selectedDrawers, setSelectedDrawers] = useState([]);
  const [selectedHeadboardSizes, setSelectedHeadboardSizes] = useState([]);
  const [selectedHeadboardFabricColour, setSelectedHeadboardFabricColour] = useState([]);
  const [selectedGroupCode, setSelectedGroupCode] = useState('');
  const [selectedProductCode, setSelectedProductCode] = useState('');
  const [productValues, setproductValues] = useState(intialProductValues);
  const [productvariation, setProductVariation] = useState([]);
  const [fetchedproductdata, setfetchedProductData] = useState([]);
  const [errorcode, seterrorcode] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [VariationData, setVariationData] = useState([]);
  const [showVariation , setShowVariation] = useState(false)
  const [desc,setDesc]=useState('')
  const [isdescvalid,setIsdescvalid]=useState("")
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertText, setAlertText] = useState("Failed to fetch data");
  const [isValid, setisValid] = useState({Name : false, Code : false, MattSize : false, Springs : false, BaseSize : false, BaseColour : true, Feet : false, FootBoard : false, Drawer : false, HeadboardSize : false, HeadColour : false,Description : ""})
  const [selectValues, setSelectValues] = useState({MattSize : [], Springs : [], BaseSize : [], BaseColour : [], Feet : [], FootBoard : [], Drawer : [], HeadboardSize : [], HeadColour : []})
  const navigate = useNavigate();

const handleChange = (e) => {
  if(e.target.value===''){
    setDesc(false)
  }
  else{
    setDesc(true)
    setIsdescvalid(false)
  }
  setproductValues({...productValues , [e.target.name] : e.target.value})
  console.log(productValues)
  setisValid({Name : false, Code : false});
  if (e.target.name === 'product_code') {
    isCodeExists();
    // console.log(isExists);

  }
  };
  const product_details = async () => {
    const response = await ProductsDetails()
    setProductsData(response.data)
  }
  console.log(productsData);
  productsData.map((item, i) => {
    console.log(item.product_code);
  });

  useEffect(() => {
    product_details()
  }, [])
  useEffect(() => {
    // This effect will run whenever productValues changes
    isCodeExists();
  }, [productValues]);
  useEffect(() => {
    if (productValues.Code) {
      // const productCode = productValues.Name.replace(/[\s,\., \', \", \`]/g, '').slice(0, 3).toUpperCase();
      // const productCode = productValues.Code.replace(/[^a-zA-Z0-9]/g, '').slice(0, 5).toUpperCase();
      const productCode = productValues.Code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      setproductValues({ ...productValues, Code: productCode });
    } else {
      setproductValues({ ...productValues, Code: '' });
    }
    const productsCode = selectedGroupCode + productValues.Code;
    setSelectedProductCode(productsCode)
  }, [productValues.Code]);

  useEffect(() => {
    const productsCode = selectedGroupCode + productValues.Code;
    setproductValues({...productValues , GroupCode : selectedGroupCode, group : productsCode})
  }, [selectedProductCode])

  const handleOptionChange = (selectedOptions, setSelectedOptions, propertyName) => {
    setSelectedOptions(selectedOptions);
    const selectedVal = Array.from(selectedOptions).map((option) => ({ value: option.value, id: option.id }));
    setproductValues((prevProductValues) => ({
      ...prevProductValues,
      [propertyName]: selectedVal,
    }));
    console.log(selectedOptions);
    // console.log(setSelectedOptions);
    console.log(propertyName);
    setisValid({MattSize : false, Springs : false, BaseSize : false, BaseColour : true, Feet : false, FootBoard : false, Drawer : false, HeadboardSize : false, HeadColour : false});
    const mattData = Array.from(selectedOptions).map((option) => option.matscode);
    const springData = Array.from(selectedOptions).map((option) => option.springcode);
    const drwData = Array.from(selectedOptions).map((option) => option.drwcode);
    const baseData = Array.from(selectedOptions).map((option) => option.basecode);
    const headData = Array.from(selectedOptions).map((option) => option.headcode);
    const footboardData = Array.from(selectedOptions).map((option) => option.footboardcode);
    const feetData = Array.from(selectedOptions).map((option) => option.feetcode);
    if (selectedOptions[0]) {
      if (selectedOptions[0].matscode) {
        setproductValues((prevProductValues) => ({
          ...prevProductValues,
          MattSizeCode: mattData,
        }));
      } else if (selectedOptions[0].springcode) {
        setproductValues((prevProductValues) => ({
          ...prevProductValues,
          SpringCountCode: springData,
        }));
      } else if (selectedOptions[0].drwcode) {
        setproductValues((prevProductValues) => ({
          ...prevProductValues,
          DrwCode: drwData,
        }));
      } else if (selectedOptions[0].basecode) {
        setproductValues((prevProductValues) => ({
          ...prevProductValues,
          BaseCode: baseData,
        }));
      } else if (selectedOptions[0].headcode) {
        setproductValues((prevProductValues) => ({
          ...prevProductValues,
          HeadCode: headData,
        }));
      } else if (selectedOptions[0].footboardcode) {
        setproductValues((prevProductValues) => ({
          ...prevProductValues,
          FootBoardCode: footboardData,
        }));
      } else if (selectedOptions[0].feetcode) {
        setproductValues((prevProductValues) => ({
          ...prevProductValues,
          FeetCode: feetData,
        }));
      }
    }
    setisValid({propertyName : false})
    console.log(productValues);
  };

   // Checking Code
   const isCodeExists = () => {
    console.log(productsData);
    console.log(productValues);
    console.log(".....................");
    const matchingProduct = productsData.find((item) => item.code.toUpperCase() === productValues.Code.toUpperCase());
    if (matchingProduct) {
      // Code exists, disable the button
      saveBtnRef.current.disabled = true;
      seterrorcode(true)
      console.log("btn call", saveBtnRef.current.disabled, "true");

    } else {
      // Code doesn't exist, enable the button
      seterrorcode(false)
      saveBtnRef.current.disabled = false;
      console.log("btn call", saveBtnRef.current.disabled, "false");
    }
  };


    //API call
    const submitdata = async(e)=>{
      console.log(e);
      const response = await storeProdcutdata(e);
      if(response.status === 200){
        console.log(response.data);
        setVariationData(response.data)
        // setShowVariation(true);
        navigate(`/product-variations/${response.data[0].group_id && response.data[0].group_id}`)
      }else{
        // alert("error in saving product")
        console.log("error in saving product");
        setAlertStatus(true)
        setAlertText("error in saving product")
      }
      }

  const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log("called...........");
  if(desc==false){
    setIsdescvalid(true)
  }
  else{
    setIsdescvalid(false)
  }

  if (productValues.Name.trim().length == 0) {
    console.log("product name is empty.........");
    setisValid({Name : true});
  } else if (productValues.Code.trim().length < 3) {
    console.log("product code is empty.........");
    setisValid({Code : true});
  } else {
    if (productValues.Category == "1") {
      console.log("it's Mattress");
      if (productValues.MattressSizes.length == 0) {
        console.log("mattress size is empty.........");
        setisValid({MattSize : true});
      } else if (productValues.Springs.length == 0) {
        console.log("spring value is empty.........");
        setisValid({Springs : true});
      } else {
        const variations = [];
        for (let i = 0; i < productValues.MattressSizes.map((mattress) => mattress.value).length; i++) {
          for (let j = 0; j < productValues.Springs.map((Springs) => Springs.value).length; j++) {
            const variation = {
              MattressSizeGroup: productValues.MattressSizes[i].value,
              SpringGroup: productValues.Springs[j].value,
              variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}`,
              variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size with ${productValues.Springs[j].value} Spring Count`,
              variationcode: `${productValues.Code}` + `${productValues.MattSizeCode[i]}` + `${productValues.SpringCountCode[j]}`
              // Add other properties from productValues if needed
            };
            variations.push(variation);
          }
        }
        variations.forEach((variation) => {
          const variationString = `Name: ${productValues.Name} - Size: ${variation.MattressSize} - Spring: ${variation.Spring}`;
          console.log(variationString);
          setProductVariation(variationString)
        });
        console.log("Mattress Submitted");
        console.log(variations);
        //API call function
        const formData = new FormData();
        formData.append('product', JSON.stringify(productValues));
        formData.append('product_group', JSON.stringify(variations));
        submitdata(formData); 
        // console.log(formData);
      }
    } else if (productValues.Category == "2") {
      console.log("it's Base");
      if (productValues.Springs.length == 0) {
        console.log("spring value is empty.........");
        setisValid({Springs : true});
      } else if (productValues.BaseSizes.length == 0) {
        console.log("Base size is empty.........");
        setisValid({BaseSize : true});
      } else if (productValues.FeetOption.length == 0) {
        console.log("Feet value is empty.........");
        setisValid({Feet : true});
      // } else if (productValues.FootBoard.length == 0) {
      //   console.log("Footboard value is empty.........");
      //   setisValid({FootBoard : true});
      } else if (productValues.Drawers.length == 0) {
        console.log("Drawer value is empty.........");
        setisValid({Drawer : true});
      } else {
        console.log("Base Submitted");

        const createVariations = () => {
          const variations = [];
              for (let i = 0; i < productValues.BaseSizes.map((BaseSizes) => BaseSizes.value).length; i++) {
              for (let j = 0; j < productValues.Springs.map((Springs) => Springs.value).length; j++) {
                for (let n = 0; n < productValues.FeetOption.map((FeetOption) => FeetOption.value).length; n++) {
                  // for (let m = 0; m < productValues.FootBoard.map((FootBoard) => FootBoard.value).length; m++) {
                    for (let k = 0; k < productValues.Drawers.map((Drawers) => Drawers.value).length; k++) {
                      console.log(productValues.BaseSizes[i]);
                      const mainFunc = ()=>{
                      const variation = {
                          BaseSizesGroup: productValues.BaseSizes[i].value,
                          SpringGroup: productValues.Springs[j].value,
                          FeetOptionGroup: productValues.FeetOption[n].value,
                          DrawersGroup: productValues.Drawers[k].value,
                          variationName: `${productValues.BaseSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.Drawers[k].value}`,
                          variationDescription: `${productValues.Name} ` + `${productValues.BaseSizes[i].value} Base Size With ${productValues.Springs[j].value} Spring Count ${productValues.FeetOption[n].value} Feet Type With ${productValues.Drawers[k].value} Drawer`,
                          variationcode: `${productValues.Code}` + `${productValues.BaseCode[i]}` + `${productValues.SpringCountCode[j]}` + `${productValues.FeetCode[n]}` + `${productValues.DrwCode[k]}`
                        };
                        variations.push(variation);
                      }
                      const withoutDrawer = () => {
                        const variation = {
                          BaseSizesGroup: productValues.BaseSizes[i].value,
                          SpringGroup: productValues.Springs[j].value,
                          FeetOptionGroup: productValues.FeetOption[n].value,
                          variationName: `${productValues.BaseSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.Drawers[k].value}`,
                          variationDescription: `${productValues.Name} ` + `${productValues.BaseSizes[i].value} Base Size With ${productValues.Springs[j].value} Spring Count ${productValues.FeetOption[n].value} Feet Type`,
                          variationcode: `${productValues.Code}` + `${productValues.BaseCode[i]}` + `${productValues.SpringCountCode[j]}` + `${productValues.FeetCode[n]}`
                        };
                        variations.push(variation);
                      }
                      mainFunc();
                      withoutDrawer()
                      }
                    }
                  }
              // }
          }
          return variations;
        };
         // Example usage
         const variations = createVariations();
        
         // Print variations with desired format
         variations.forEach((variation) => {
           const variationString = `Name: ${productValues.Name} - BaseSize: ${variation.BaseSizesGroup} - Base Fabric Colour: ${variation.BaseFabricColourGroup} - Feet Option: ${variation.FeetOptionGroup} - Foot Board: ${variation.FootBoardGroup} - Drawers: ${variation.DrawersGroup}`;
           console.log(variationString);
         });
      
        console.log(variations)
          const formData = new FormData();
          formData.append('product', JSON.stringify(productValues));
          formData.append('product_group', JSON.stringify(variations));

          // console.log(uniqueVariations);
          submitdata(formData);
          // submitdata(productAPIData);
      }
    } else if (productValues.Category == "3") {
      console.log("it's Headboard");
      if (productValues.HeadboardSizes.length == 0) {
        console.log("Headboard size is empty.........");
        setisValid({HeadboardSize : true});
      } else if (productValues.FootBoard.length == 0) {
        console.log("Head Board style value is empty.........");
        setisValid({HeadColour : true});
      } else {
        console.log("Headboard Submitted");

        const createVariations = () => {
          const variations = [];
          for (let l = 0; l < productValues.HeadboardSizes.map((HeadboardSizes) => HeadboardSizes.value).length; l++) {
          for (let m = 0; m < productValues.FootBoard.map((FootBoard) => FootBoard.value).length; m++) {
            const basewithFootboard = () => {
              const variation = {
                HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                FootBoardGroup: productValues.FootBoard[m].value,
                IsFootboard : "YES",
                variationName: `${productValues.HeadboardSizes[l].value} ` + `${productValues.Name}` + ` ${productValues.FootBoard[m].value}`,
                variationDescription: `${productValues.Name} ` + `${productValues.HeadboardSizes[l].value} Headboard Size of ${productValues.FootBoard[m].value} Design With Footboard`,
                variationcode: `${productValues.Code}F` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}`  
              };
              variations.push(variation);
            }
            const basewithoutFootboard = () => {
              const variation = {
                HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                FootBoardGroup: productValues.FootBoard[m].value,
                variationName: `${productValues.HeadboardSizes[l].value} ` + `${productValues.Name}` + ` ${productValues.FootBoard[m].value}`,
                variationDescription: `${productValues.Name} ` + `${productValues.HeadboardSizes[l].value} Headboard Size of ${productValues.FootBoard[m].value} Design`,
                variationcode: `${productValues.Code}` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}`  
              };
              variations.push(variation);
            }
            basewithFootboard();
            basewithoutFootboard();
          }
          }
          return variations;
        };
        // Example usage
        const variations = createVariations();
       
        // Print variations with desired format
        variations.forEach((variation) => {
          const variationString = `Name: ${productValues.Name} - headbooardSize: ${variation.HeadboardSizesGroup} - headboardColour: ${variation.HeadboardColurGroup}`;
          console.log(variationString);
        });
        //  API call function
        const formData = new FormData();
        formData.append('product', JSON.stringify(productValues));
        formData.append('product_group', JSON.stringify(variations));
         submitdata(formData);
      }
    } else if (productValues.Category == "4") {
      console.log("it's Fullset");
      if (productValues.MattressSizes.length == 0) {
        console.log("mattress size is empty.........");
        setisValid({MattSize : true});
      } else if (productValues.Springs.length == 0) {
        console.log("spring value is empty.........");
        setisValid({Springs : true});
      // } else if (productValues.BaseFabricColour.length == 0) {
      //   console.log("Base Fabric Colour value is empty.........");
        // setisValid({BaseColour : true});
      } else if (productValues.FeetOption.length == 0) {
        console.log("Feet value is empty.........");
        setisValid({Feet : true});
      } else if (productValues.FootBoard.length == 0) {
        console.log("Footboard value is empty.........");
        setisValid({FootBoard : true});
      } else if (productValues.Drawers.length == 0) {
        console.log("Drawer value is empty.........");
        setisValid({Drawer : true});
      } else if (productValues.HeadboardSizes.length == 0) {
        console.log("Headboard size is empty.........");
        setisValid({HeadboardSize : true});
      } else {
        console.log("fullset Submitted");
        console.log(productValues);
        const createVariations = () => {
          const variations = [];  
            for (let i = 0; i < productValues.MattressSizes.map((mattress) => mattress.value).length; i++) {
              for (let j = 0; j < productValues.Springs.map((Springs) => Springs.value).length; j++) {
              // for (const baseFabricColour of productValues.BaseFabricColour) {
                  for (let n = 0; n < productValues.FeetOption.map((FeetOption) => FeetOption.value).length; n++) {
                  for (let m = 0; m < productValues.FootBoard.map((FootBoard) => FootBoard.value).length; m++) {
                    for (let l = 0; l < productValues.HeadboardSizes.map((HeadboardSizes) => HeadboardSizes.value).length; l++) {
                        for (let k = 0; k < productValues.Drawers.map((Drawers) => Drawers.value).length; k++) {
                          const typeOne = () => {
                            const variation = {
                              MattressSizeGroup: productValues.MattressSizes[i].value,
                              SpringGroup: productValues.Springs[j].value,
                              FeetOptionGroup: productValues.FeetOption[n].value,
                              FootBoardGroup: productValues.FootBoard[m].value,
                              DrawersGroup: productValues.Drawers[k].value,
                              HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                              variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.Drawers[k].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.FootBoard[m].value}`,
                              variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size` + ` ${productValues.Springs[j].value} Spring Count` + ` ${productValues.Drawers[k].value} Drawer` + ` ${productValues.FeetOption[n].value} Feet Option` + ` ${productValues.FootBoard[m].value} Headboard Style`,
                              variationcode: `${productValues.Code}` + `${productValues.SpringCountCode[j]}` + `${productValues.MattSizeCode[i]}(S)` + "-" + `${productValues.Code}` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}(S)` + "-" + `${productValues.Code}` + `${productValues.SpringCountCode[j]}` + `${productValues.MattSizeCode[i]}` + `${productValues.FeetCode[n]}` + `${productValues.DrwCode[k]}` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}(S)`
                            };
                          variations.push(variation); 
                          }
                          const typeTwo = () => {
                            const variation = {
                              MattressSizeGroup: productValues.MattressSizes[i].value,
                              SpringGroup: productValues.Springs[j].value,
                              FeetOptionGroup: productValues.FeetOption[n].value,
                              FootBoardGroup: productValues.FootBoard[m].value,
                              HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                              variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.FootBoard[m].value}`,
                              variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size` + ` ${productValues.Springs[j].value} Spring Count` + ` ${productValues.FeetOption[n].value} Feet Option` + ` ${productValues.FootBoard[m].value} Headboard Style`,
                              variationcode: `${productValues.Code}` + `${productValues.SpringCountCode[j]}` + `${productValues.MattSizeCode[i]}(S)` + "-" + `${productValues.Code}` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}(S)` + "-" + `${productValues.Code}` + `${productValues.SpringCountCode[j]}` + `${productValues.MattSizeCode[i]}` + `${productValues.FeetCode[n]}` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}(S)`
                            };
                          variations.push(variation); 
                          }
                          const typeFive = () => {
                            const variation = {
                              MattressSizeGroup: productValues.MattressSizes[i].value,
                              SpringGroup: productValues.Springs[j].value,
                              FeetOptionGroup: productValues.FeetOption[n].value,
                              FootBoardGroup: productValues.FootBoard[m].value,
                              DrawersGroup: productValues.Drawers[k].value,
                              HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                              IsFootboard : "YES",
                              variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.Drawers[k].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.FootBoard[m].value} with Footboard`,
                              variationDescription:`${productValues.Name} ` +  `${productValues.MattressSizes[i].value} Mattress Size` + ` ${productValues.Springs[j].value} Spring Count` + ` ${productValues.FeetOption[n].value} Feet Option` + ` ${productValues.FootBoard[m].value} Headboard Style With Footboard`,
                              variationcode: `${productValues.Code}` + `${productValues.SpringCountCode[j]}` + `${productValues.MattSizeCode[i]}(S)` + "-" + `${productValues.Code}F` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}(S)` + "-" + `${productValues.Code}F` + `${productValues.SpringCountCode[j]}` + `${productValues.MattSizeCode[i]}` + `${productValues.FeetCode[n]}` + `${productValues.DrwCode[k]}` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}(S)`
                            };
                          variations.push(variation); 
                          }
                          const typeSix = () => {
                            const variation = {
                              MattressSizeGroup: productValues.MattressSizes[i].value,
                              SpringGroup: productValues.Springs[j].value,
                              FeetOptionGroup: productValues.FeetOption[n].value,
                              FootBoardGroup: productValues.FootBoard[m].value,
                              HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                              IsFootboard : "YES",
                              variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.FootBoard[m].value} with Footboard`,
                              variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size` + ` ${productValues.Springs[j].value} Spring Count` + ` ${productValues.FeetOption[n].value} Feet Option` + ` ${productValues.FootBoard[m].value} Headboard Style With Footboard`,
                              variationcode: `${productValues.Code}` + `${productValues.SpringCountCode[j]}` + `${productValues.MattSizeCode[i]}(S)` + "-" + `${productValues.Code}F` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}(S)` + "-" + `${productValues.Code}F` + `${productValues.SpringCountCode[j]}` + `${productValues.MattSizeCode[i]}` + `${productValues.FeetCode[n]}` + `${productValues.HeadCode[l]}` + `${productValues.FootBoardCode[m]}(S)`
                            };
                          variations.push(variation); 
                          }
                          typeOne();//to create variation with possible variable data
                          typeTwo(); //to create variation without drawer 
                          typeFive(); 
                          typeSix(); 
                      }
                    }
                  }
                // }
              }
            }
          }
          return variations;
        };
        
        // Example usage
        const variations = createVariations();
        
        // Print variations with desired format
        variations.forEach((variation) => {
          const variationString = `Name: ${productValues.Name} - Size: ${variation.MattressSize} - Spring: ${variation.Spring} - Base Fabric Colour: ${variation.BaseFabricColour} - Feet Option: ${variation.FeetOption} - Foot Board: ${variation.FootBoard} - Drawers: ${variation.Drawers}`;
          console.log(variationString);
        });

        const uniqueVariations = Array.from(new Set(variations.map(JSON.stringify)), JSON.parse);
        const formData = new FormData();
        console.log(uniqueVariations)
        formData.append('product', JSON.stringify(productValues));
        formData.append('product_group', JSON.stringify(uniqueVariations));
        // console.log(variations);
        // console.log(uniqueVariations);
        submitdata(formData);
      }
    }
  }
};

// const fetchDataofproducts = async(data)=>{
//   const response = await fetchProductDetails(data);
//   if(response.status === 200){
//     console.log(response.data);
//     setfetchedProductData(response.data)
//     console.log(fetchedproductdata);
//     if(fetchedproductdata != null){
//     const mattressSizes = fetchedproductdata.mat_size.map((item) => ({
//       value: item.value,
//       label: `${item.value} Sizes`
//     }));
//     setSelectValues({MattSize : mattressSizes});
//     console.log(selectValues.MattSize)   
//   }
//   }else{
//     alert("error")
//   }
// }

// useEffect(() => {
// //CREAfetchProductDataTE API TO FETCH PRODUCT DATA
//  fetchDataofproducts(productValues);
// }, [])
const fetchDataofproducts = async (data) => {
  try {
    const response = await fetchProductDetails(data);
    if (response.status === 200) {
      console.log(response.data);
      setfetchedProductData(response.data);
    } else {
      // alert("Error");
    }
  } catch (error) {
    // alert("Error");
    console.log("Error")
  }
};

useEffect(() => {
  // Function to fetch product data
  const fetchProductData = async () => {
    await fetchDataofproducts(productValues);
    console.log(productValues);
  };

  // Call the function to fetch product data
  fetchProductData();
}, []);

useEffect(() => {
  if (fetchedproductdata != null) {
    const group = fetchedproductdata.groups && fetchedproductdata.groups.map((item) => ({
      groupcode : item.code,
      id : item.id,
      value: item.value,
      label: `${item.value}`,
    }));
    const mattressSizes = fetchedproductdata.mat_size && fetchedproductdata.mat_size.map((item) => ({
      matscode : item.code,
      id : item.id,
      value: item.value,
      label: `${item.value} Size`,
    }));
    const springOptions = fetchedproductdata.springs && fetchedproductdata.springs.map((item) => ({
      springcode : item.code,
      id : item.id,
      value: item.value,
      label: `${item.value} Springs`,
    }));
    
    const baseSizes = fetchedproductdata.base_size && fetchedproductdata.base_size.map((item) => ({
      basecode : item.code,
      id : item.id,
      value: item.value,
      label: `${item.value}`,
    }));

    const headboardSizes = fetchedproductdata.headboard_size && fetchedproductdata.headboard_size.map((item) => ({
      headcode : item.code,
      id : item.id,
      value: item.value,
      label: `${item.value}`,
    }));

    const basefabColour = fetchedproductdata.base_fab_color && fetchedproductdata.base_fab_color.map((item) => ({
      value: item.value,
      id : item.id,
      label: `${item.value}`,
    }));

    const feetOptions = fetchedproductdata.product_feet && fetchedproductdata.product_feet.map((item) => ({
      feetcode : item.code,
      value: item.value,
      id : item.id,
      label: `${item.value}`,
    }));

    const headboardfabColour = fetchedproductdata.headboard_style && fetchedproductdata.headboard_style.map((item) => ({
      value: item.value,
      id : item.id,
      label: `${item.value}`,
    }));

    const DrawersOptions = fetchedproductdata.drawers && fetchedproductdata.drawers.map((item) => ({
      drwcode : item.code,
      value: item.value,
      id : item.id,
      label: `${item.value}`,
    }));
    const footBoardOptions = fetchedproductdata.footboards && fetchedproductdata.footboards.map((item) => ({
      footboardcode : item.code,
      value: item.value,
      label: `${item.value}`,
      id : item.id,
    }));


    setSelectValues((selectValues) => ({
      ...selectValues,
      MattSize: mattressSizes,
      Springs : springOptions,
      BaseSize : baseSizes,
      BaseColour : basefabColour,
      Feet : feetOptions,
      Drawer : DrawersOptions,
      HeadboardSize : headboardSizes,
      HeadColour : headboardfabColour,
      FootBoard : footBoardOptions
    }));
  }
}, [fetchedproductdata]);
console.log(selectValues);

  const handlegroupChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedCode = fetchedproductdata.groups[selectedIndex].code;
    const selectedValue = fetchedproductdata.groups[selectedIndex].value;
    const productsCode = selectedCode + productValues.Code;
    setSelectedGroupCode(selectedCode);
    setproductValues({...productValues ,GroupName: selectedValue, GroupCode : selectedCode, group : productsCode})
    setSelectedProductCode(productsCode)
    console.log(selectedCode);
    console.log(productValues);
  };
  // useEffect(() => {
  //   // Check if the fetchedproductdata.groups array has any elements
  //   if (fetchedproductdata.groups && fetchedproductdata.groups.length > 0) {
  //     const initialCode = fetchedproductdata.groups[0].code;
  //     const initialValue = fetchedproductdata.groups[0].value;
  //     const productsCode = initialCode + productValues.Code;
  //     setproductValues({...productValues ,GroupName: initialValue, GroupCode: initialCode, group : productsCode})
  //     setSelectedGroupCode(initialCode);
  //     setSelectedProductCode(productsCode)
  //     console.log(initialCode);
  //     console.log("...................");
  //   }
  //   // console.log("...................");
  // }, [fetchedproductdata.groups]);
  const disableAelrt = () => {
    setAlertStatus(false)
  }
  return(
    <>
      {!(showVariation) ? ( 
    <div className='add-product'>
    {fetchedproductdata != null ? (
      <CContainer>
      <CForm className='addproduct-form' onSubmit={handleFormSubmit}>
        <CRow>
        <CCol xm={6} lg={12}>
        <CFormSelect label="Category" name='Category' aria-label="Category" onChange={handleChange}>
        {fetchedproductdata.category && fetchedproductdata.category.map((value, index) => (
            <option value={value.id}>{value.category_name}</option> 
            ))}  
        </CFormSelect>
        </CCol>
        </CRow>
        <CRow>
        <CCol lg={6} xs={12}>
        <CFormInput type="text" id="product-name" label="Name" name='Name' onChange={handleChange}/>
        {isValid.Name && (<p style={{textAlign: "left",color: "#e55353"}}>Please enter product name</p>)}
        </CCol>
        <CCol lg={6} xs={12}>
        <CFormInput type="text" id="product-code" label="Code" name='Code' onChange={handleChange} value={productValues.Code}/>
        {isValid.Code && (<p style={{textAlign: "left",color: "#e55353"}}>Please enter 3 characters for the product code</p>)}
        {errorcode && (<p className='mt-2' style={{ textAlign: "left", color: "#e55353" }}>This code already exists please change code</p>)}
        </CCol>
        {/* <CCol lg={6} xs={12}>
        <CFormSelect label="Product Group" name='Group_Name' aria-label="Group" onChange={handlegroupChange}>
        {fetchedproductdata.groups && fetchedproductdata.groups.map((value, index) => (
            <option value={value.id}>{value.value}</option> 
            ))} 
         
        </CFormSelect>
        </CCol> */}
        {/* <CCol lg={6} xs={12}> */}
        {/* <CFormInput type="text" id="product-code" label="Product Group Code" name='Group_Code' value={selectedGroupCode} disabled/> */}
        {/* <CFormInput type="text" id="products-code" label="Product Item Group Code" name='Product_Code'  value={selectedProductCode} disabled/> */}
        {/* {errorcode && (<p className='mt-2' style={{ textAlign: "left", color: "#e55353" }}>This code already exists please change code</p>)} */}
                    {/* {isValid.productCode && (<p style={{ textAlign: "left", color: "#e55353" }}>Please enter product code</p>)} */}
                    {/* {productValues.productCode.length === 0 && (
                      <p style={{ textAlign: "left", color: "#e55353" }}>

                      </p>
                    )} */}
        {/* </CCol> */}
        <CCol xs={12}>
        <CFormTextarea id="product-description" label="Description" name='Description' onChange={handleChange} rows={1}/>
        {isdescvalid==true?<p className='text-danger'>Please add the description</p>:''}
        </CCol>
        {!(productValues.Category == "2" || productValues.Category == "3") ? 
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor={selectValues.MattSize}>Mattress Sizes</label>
             <Select isMulti id='mattressSizes' aria-labelledby='mattressSizes' options={selectValues.MattSize && selectValues.MattSize} className="basic-multi-select" classNamePrefix="select" value={selectedMattressSizes} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedMattressSizes, 'MattressSizes')}
            />
          </div>
          {isValid.MattSize && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one size</p>)}
          </CCol>
          ): null
        }
        {!(productValues.Category == "3") ? 
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor='Springs'>Springs</label>
              <Select isMulti id='Springs' aria-labelledby='Springs' name='Springs' options={selectValues.Springs && selectValues.Springs} className="basic-multi-select" classNamePrefix="select" value={selectedSprings} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedSprings, 'Springs')}/>
            </div>
            {isValid.Springs && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one spring type</p>)}
            </CCol>
          ): null
        }
        {!(productValues.Category == "1" || productValues.Category == "3" || productValues.Category == "4") ? 
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor='baseSizes'>Base Sizes</label>
              <Select isMulti id='baseSizes' aria-labelledby='baseSizes' name='baseSizes' options={selectValues.BaseSize && selectValues.BaseSize} className="basic-multi-select" classNamePrefix="select" value={selectedBaseSizes} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedBaseSizes, 'BaseSizes')}/>
            </div>
            {isValid.BaseSize && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one sase size</p>)}
            </CCol>
          ): null
        }
        {/* {!(productValues.Category == "1" || productValues.Category == "3") ? 
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor='basefabricColour'>Base Fabric Colour</label>
              <Select isMulti id='basefabricColour' aria-labelledby='basefabricColour' name='basefabricColour' options={selectValues.BaseColour && selectValues.BaseColour} className="basic-multi-select" classNamePrefix="select" value={selectedBaseFabricColour} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedBaseFabricColour, 'BaseFabricColour')}/>
            </div>
            {isValid.BaseColour && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one base fabric colour.</p>)}
            </CCol>
          ): null
        } */}
        {!(productValues.Category == "1" || productValues.Category == "3") ? 
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor='feetOption'>Feet Option</label>
              <Select isMulti id='feetOption' aria-labelledby='feetOption' name='feetOption' options={selectValues.Feet && selectValues.Feet} className="basic-multi-select" classNamePrefix="select" value={selectedFeetOption} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedFeetOption, 'FeetOption')}/>
            </div>
            {isValid.Feet && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one feet</p>)}
            </CCol>
          ): null
        }
        {!(productValues.Category == "1" || productValues.Category == "2" || productValues.Category == "3") ? 
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor='footBoard'>Head Board style</label>
              <Select isMulti id='footBoard' aria-labelledby='footBoard' name='footBoard' options={selectValues.FootBoard && selectValues.FootBoard} className="basic-multi-select" classNamePrefix="select" value={selectedFootBoard} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedFootBoard, 'FootBoard')}/>
            </div>
            {isValid.FootBoard && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one head board style</p>)}
            </CCol>
          ): null
        }
        {!(productValues.Category == "1" || productValues.Category == "3") ? 
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor='Drawers'>Drawers</label>
              <Select isMulti id='Drawers' aria-labelledby='Drawers' name='Drawers' options={selectValues.Drawer && selectValues.Drawer} className="basic-multi-select" classNamePrefix="select" value={selectedDrawers} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedDrawers, 'Drawers')}/>
            </div>
            {isValid.Drawer && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one drawer</p>)}
            </CCol>
          ): null
        }
        {!(productValues.Category == "1" || productValues.Category == "2" ) ? 
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor='headboardSizes'>Headboard Sizes</label>
              <Select isMulti id='headboardSizes' aria-labelledby='headboardSizes' name='headboardSizes' options={selectValues.HeadboardSize && selectValues.HeadboardSize} className="basic-multi-select" classNamePrefix="select" value={selectedHeadboardSizes} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedHeadboardSizes, 'HeadboardSizes')}/>
            </div>
            {isValid.HeadboardSize && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one headboard size</p>)}
            </CCol>
          ): null
        }
        {!(productValues.Category == "1" || productValues.Category == "2" ||productValues.Category == "4") ?
          (
            <CCol lg={6} xs={12}>
            <div>
              <label htmlFor='footBoard'>Head Board style</label>
              <Select isMulti id='footBoard' aria-labelledby='footBoard' name='footBoard' options={selectValues.FootBoard && selectValues.FootBoard} className="basic-multi-select" classNamePrefix="select" value={selectedFootBoard} onChange={(selectedOptions) => handleOptionChange(selectedOptions, setSelectedFootBoard, 'FootBoard')}/>
            </div>
            {isValid.FootBoard && (<p style={{textAlign: "left",color: "#e55353"}}>Please select at least one head board style</p>)}
            </CCol>
          ): null
        }
        {/* <div className='status-btn'>
          <CFormCheck button={{color: 'success',variant: 'outline'}} type='radio' name='status' id='active' autoComplete='off' label='Active' defaultChecked/>
          <CFormCheck button={{color: 'danger',variant: 'outline'}} type='radio' name='status' id='de-active' autoComplete='off' label='De-Active'/>
        </div> */}
        </CRow>
        <CRow className='mt-5'>
        <CCol>
        <button  style={{ padding:'8px 20px' , borderRadius:5 }} className={`save-pro m-auto d-block save-btn ${saveBtnRef.current && saveBtnRef.current.disabled ? 'disabledbuttons' : ''}`} type="submit" ref={saveBtnRef}>
                      Save Product
                    </button>
        </CCol>
        </CRow>
      </CForm>
      </CContainer>
      ) : "pls wait data is being fetch"}
      </div>
      ):(
        <VariationList data={VariationData}/>
  )}
   {
        alertStatus ?
          <Message_alert text={alertText} disableSuccsess={disableAelrt}></Message_alert> : ""
      }
      </>
    )
}

export default CreateProduct